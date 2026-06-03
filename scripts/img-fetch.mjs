// BBDV — gather candidate stock photos per image slot from Pexels, then build a
// labeled montage per slot so a human can pick the best emotional/literal fit.
// Usage: node scripts/img-fetch.mjs            (all slots)
//        node scripts/img-fetch.mjs rhinoplasty facelift   (subset)
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const ROOT = "e:/BBDV/research/img-candidates";
mkdirSync(ROOT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// key, query, orientation (portrait|landscape), how many candidates to keep
export const SLOTS = [
  // FACE
  { key: "rhinoplasty", q: "woman face profile beauty", o: "portrait" },
  // CLINICAL/SURGICAL CONTEXT restyle (client direction 2026-06-03):
  // surgeon marking the treatment area, consultation, clinic/pre-op imagery.
  { key: "facelift", q: "facial plastic surgery marking face", o: "portrait" },
  { key: "eyelid-surgery", q: "eyelid surgery blepharoplasty marking", o: "portrait" },
  { key: "neck-lift", q: "elegant woman neck jawline portrait", o: "portrait" },
  { key: "chin-augmentation", q: "chin facial surgery marking jawline", o: "portrait" },
  { key: "otoplasty", q: "ear surgery doctor examination", o: "portrait" },
  // BREAST (clinical/surgical context, tasteful)
  { key: "breast-augmentation", q: "woman elegant decolletage neckline dress", o: "portrait" },
  { key: "breast-lift", q: "woman decolletage chest neckline beauty", o: "portrait" },
  { key: "breast-reduction", q: "woman sports bra athletic fitness", o: "portrait" },
  // BODY
  { key: "liposuction", q: "woman slim waist body", o: "portrait" },
  { key: "tummy-tuck", q: "woman flat stomach fitness abs", o: "portrait" },
  { key: "brazilian-butt-lift", q: "buttock lift surgery marking body", o: "portrait" },
  { key: "arm-lift", q: "arm liposuction surgery marking lines", o: "portrait" },
  { key: "mummy-makeover", q: "happy mother holding baby", o: "portrait" },
  // MEN
  { key: "fue-hair-transplant", q: "hair transplant procedure scalp clinic", o: "portrait" },
  { key: "gynecomastia", q: "fit man chest torso shirtless", o: "portrait" },
  { key: "hi-def-liposuction", q: "abdominal liposuction surgery marking torso", o: "portrait" },
  // NON-SURGICAL
  { key: "dermal-fillers", q: "woman lips beauty close up", o: "portrait" },
  { key: "anti-wrinkle", q: "woman face skincare beauty smooth", o: "portrait" },
  { key: "prp-treatment", q: "facial skincare treatment clinic", o: "portrait" },
  { key: "fat-transfer", q: "fat transfer grafting surgery syringe clinic", o: "portrait" },
  // SECTIONS
  { key: "recovery", q: "calm bright hotel bedroom rest", o: "landscape" },
  { key: "story", q: "surgeon patient consultation clinic care", o: "portrait" },
];

const want = process.argv.slice(2);
const slots = want.length ? SLOTS.filter((s) => want.includes(s.key)) : SLOTS;

function thumb(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=420`;
}

async function dl(url, file) {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 4000) return false;
    writeFileSync(file, buf);
    return true;
  } catch {
    return false;
  }
}

async function scrapeOnce(page, q, o) {
  const url = `https://www.pexels.com/search/${encodeURIComponent(q)}/?orientation=${o}`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollBy(0, 1300));
    await sleep(1100);
  }
  return page.evaluate(() => {
    const out = [];
    for (const img of Array.from(document.querySelectorAll("img"))) {
      const s = img.getAttribute("src") || img.getAttribute("data-src") || "";
      const m = s.match(/\/photos\/(\d+)\/pexels-photo-\1/);
      if (m) out.push(m[1]);
    }
    return out;
  });
}

async function collectIds(page, q, o, n = 12) {
  let ids = [];
  for (let attempt = 0; attempt < 3 && ids.length === 0; attempt++) {
    if (attempt) await sleep(6000 + attempt * 4000);
    ids = await scrapeOnce(page, q, o).catch(() => []);
  }
  const seen = new Set();
  const uniq = [];
  for (const id of ids) {
    if (!seen.has(id)) {
      seen.add(id);
      uniq.push(id);
    }
    if (uniq.length >= n) break;
  }
  return uniq;
}

async function montage(dir, slotKey) {
  const files = readdirSync(dir).filter((f) => /^\d+-\d+\.jpg$/.test(f)).sort((a, b) => +a.split("-")[0] - +b.split("-")[0]);
  if (!files.length) return;
  const CELL = 300, COLS = 4, PAD = 6, LABEL = 26;
  const ROWS = Math.ceil(files.length / COLS);
  const W = COLS * CELL, H = ROWS * (CELL + LABEL);
  const comps = [];
  for (let i = 0; i < files.length; i++) {
    const idx = files[i].split("-")[0];
    const tile = await sharp(path.join(dir, files[i]))
      .resize(CELL - PAD * 2, CELL - PAD * 2, { fit: "cover" })
      .toBuffer();
    const col = i % COLS, row = Math.floor(i / COLS);
    const left = col * CELL + PAD, top = row * (CELL + LABEL) + LABEL;
    comps.push({ input: tile, left, top });
    const label = await sharp({
      create: { width: CELL, height: LABEL, channels: 4, background: "#111" },
    })
      .composite([{ input: Buffer.from(`<svg width="${CELL}" height="${LABEL}"><text x="8" y="18" font-size="16" fill="#fff" font-family="sans-serif">#${idx}</text></svg>`), left: 0, top: 0 }])
      .png()
      .toBuffer();
    comps.push({ input: label, left: col * CELL, top: row * (CELL + LABEL) });
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: "#222" } })
    .composite(comps)
    .jpeg({ quality: 82 })
    .toFile(path.join(ROOT, `_montage-${slotKey}.jpg`));
}

const UAS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
];

(async () => {
  const browser = await chromium.launch();
  const index = {};
  let si = 0;
  for (const s of slots) {
    // Pexels escalates bot detection within a session, so use a fresh context
    // (cookies + UA) per slot. First request per session reliably succeeds.
    const ctx = await browser.newContext({
      userAgent: UAS[si % UAS.length],
      viewport: { width: 1440, height: 1400 },
      locale: "en-US",
    });
    si++;
    const page = await ctx.newPage();
    const dir = path.join(ROOT, s.key);
    mkdirSync(dir, { recursive: true });
    try {
      const ids = await collectIds(page, s.q, s.o, 12);
      let i = 0;
      const kept = [];
      for (const id of ids) {
        const ok = await dl(thumb(id), path.join(dir, `${i}-${id}.jpg`));
        if (ok) {
          kept.push({ i, id });
          i++;
        }
      }
      await montage(dir, s.key);
      index[s.key] = kept;
      console.log("OK", s.key, kept.length, "candidates");
    } catch (e) {
      console.log("ERR", s.key, e.message);
    }
    await ctx.close();
    await sleep(2500); // brief gap between fresh sessions
  }
  writeFileSync(path.join(ROOT, "_index.json"), JSON.stringify(index, null, 2));
  await browser.close();
  console.log("DONE");
})();
