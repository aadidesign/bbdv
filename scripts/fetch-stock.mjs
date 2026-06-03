// Phase 0.E: fetch real, theme-appropriate stock photos from Unsplash via
// Playwright (so URLs are guaranteed valid) and localise into site/public/images.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const PUB = "e:/BBDV/site/public/images";
for (const d of ["categories", "procedures", "surgeons", "hero", "site", "gallery"])
  mkdirSync(path.join(PUB, d), { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// file (relative to public/images) -> { q: query, i: which result index }
const TARGETS = [
  // hero + site
  { f: "hero/hero-1.jpg", q: "luxury spa wellness woman", i: 0 },
  { f: "hero/hero-2.jpg", q: "bangalore india city skyline", i: 0 },
  { f: "hero/hero-3.jpg", q: "confident woman portrait beauty", i: 1 },
  { f: "site/about.jpg", q: "medical team doctors hospital", i: 0 },
  { f: "site/bangalore.jpg", q: "bangalore india architecture", i: 1 },
  { f: "site/recovery.jpg", q: "luxury hotel resort room", i: 0 },
  { f: "site/consult.jpg", q: "doctor consultation patient", i: 0 },
  { f: "site/hospital.jpg", q: "modern hospital operating room", i: 0 },
  { f: "site/passport.jpg", q: "travel passport airplane window", i: 0 },
  { f: "site/quote.jpg", q: "woman smiling confident beauty", i: 2 },
  // categories
  { f: "categories/face.jpg", q: "woman face beauty portrait", i: 0 },
  { f: "categories/breast.jpg", q: "woman wellness spa robe", i: 0 },
  { f: "categories/body.jpg", q: "woman fitness body wellness", i: 0 },
  { f: "categories/men.jpg", q: "confident man portrait studio", i: 0 },
  { f: "categories/nonsurgical.jpg", q: "skincare facial treatment clinic", i: 0 },
  // procedures
  { f: "procedures/rhinoplasty.jpg", q: "woman face profile beauty", i: 0 },
  { f: "procedures/facelift.jpg", q: "mature woman beauty skin", i: 0 },
  { f: "procedures/eyelid-surgery.jpg", q: "close up woman eyes beauty", i: 0 },
  { f: "procedures/neck-lift.jpg", q: "woman neck beauty elegant", i: 0 },
  { f: "procedures/chin-augmentation.jpg", q: "woman jawline profile portrait", i: 1 },
  { f: "procedures/otoplasty.jpg", q: "woman hair beauty studio", i: 2 },
  { f: "procedures/breast-augmentation.jpg", q: "woman confidence elegant portrait", i: 3 },
  { f: "procedures/breast-lift.jpg", q: "woman wellness spa robe", i: 1 },
  { f: "procedures/breast-reduction.jpg", q: "woman fitness comfortable active", i: 1 },
  { f: "procedures/liposuction.jpg", q: "woman waist fitness body", i: 0 },
  { f: "procedures/tummy-tuck.jpg", q: "woman abdomen fitness toned", i: 1 },
  { f: "procedures/brazilian-butt-lift.jpg", q: "woman fitness curves active", i: 2 },
  { f: "procedures/arm-lift.jpg", q: "woman arms fitness toned", i: 3 },
  { f: "procedures/mummy-makeover.jpg", q: "happy mother fitness healthy", i: 0 },
  { f: "procedures/fue-hair-transplant.jpg", q: "man healthy hair portrait", i: 0 },
  { f: "procedures/gynecomastia.jpg", q: "man chest fitness athletic", i: 1 },
  { f: "procedures/hi-def-liposuction.jpg", q: "man abs fitness athletic", i: 2 },
  { f: "procedures/dermal-fillers.jpg", q: "woman lips beauty closeup", i: 0 },
  { f: "procedures/anti-wrinkle.jpg", q: "woman forehead skincare beauty", i: 1 },
  { f: "procedures/prp-treatment.jpg", q: "skincare treatment face clinic", i: 1 },
  { f: "procedures/fat-transfer.jpg", q: "woman natural beauty glowing", i: 4 },
  // surgeons (Indian doctor portraits)
  { f: "surgeons/dr-surindher.jpg", q: "indian male doctor portrait", i: 0 },
  { f: "surgeons/dr-madhusudhan.jpg", q: "indian doctor professional portrait", i: 1 },
  { f: "surgeons/dr-muddappa.jpg", q: "male surgeon portrait professional", i: 2 },
  // gallery
  { f: "gallery/g1.jpg", q: "beauty portrait woman glowing", i: 5 },
  { f: "gallery/g2.jpg", q: "spa wellness relaxation", i: 1 },
  { f: "gallery/g3.jpg", q: "confident woman smiling", i: 3 },
  { f: "gallery/g4.jpg", q: "luxury wellness retreat", i: 2 },
  { f: "gallery/g5.jpg", q: "man confident portrait", i: 3 },
  { f: "gallery/g6.jpg", q: "woman travel happy india", i: 0 },
];

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 3000) return false;
  writeFileSync(file, buf);
  return true;
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    viewport: { width: 1440, height: 1600 },
  });
  const page = await ctx.newPage();

  const cache = new Map(); // query -> [urls]
  async function getUrls(q) {
    if (cache.has(q)) return cache.get(q);
    const url = "https://unsplash.com/s/photos/" + encodeURIComponent(q);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
    await page.evaluate(() => window.scrollBy(0, 1400));
    await sleep(1200);
    let urls = await page.evaluate(() =>
      Array.from(document.querySelectorAll("figure img, a img"))
        .map((i) => i.currentSrc || i.src)
        .filter((s) => s && s.includes("images.unsplash.com/photo-"))
    );
    // normalise to a clean cropped url, dedupe by photo id
    const seen = new Set();
    urls = urls
      .map((u) => u.split("?")[0] + "?w=1500&h=1875&fit=crop&q=80")
      .filter((u) => {
        const id = u.split("photo-")[1]?.slice(0, 20);
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      });
    cache.set(q, urls);
    return urls;
  }

  const fails = [];
  for (const t of TARGETS) {
    const out = path.join(PUB, t.f);
    if (existsSync(out)) { console.log("skip", t.f); continue; }
    try {
      const urls = await getUrls(t.q);
      const candidate = urls[t.i] || urls[0];
      if (!candidate) { fails.push(t.f + " (no results)"); console.log("MISS", t.f, t.q); continue; }
      const ok = await download(candidate, out);
      if (ok) console.log("OK  ", t.f, "<-", t.q, "#" + t.i);
      else { fails.push(t.f + " (dl fail)"); console.log("FAIL", t.f); }
    } catch (e) {
      fails.push(t.f + " (" + e.message + ")");
      console.log("ERR ", t.f, e.message);
    }
    await sleep(400);
  }

  await browser.close();
  console.log("\nDONE. fails:", fails.length);
  if (fails.length) console.log(fails.join("\n"));
})();
