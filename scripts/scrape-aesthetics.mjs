// Phase 0 scraper: Aesthetics Plus (content + assets) + BBDV Facebook logo.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { createWriteStream } from "node:fs";
import path from "node:path";

const ROOT = "e:/BBDV/research/aesthetics-plus";
const ASSETS = path.join(ROOT, "assets");
const FBDIR = "e:/BBDV/research/facebook";
for (const d of [ROOT, ASSETS, FBDIR]) mkdirSync(d, { recursive: true });

const BASE = "https://aestheticsplus.in";
const MAX_PAGES = 30;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function safeName(u) {
  try {
    const url = new URL(u);
    let n = (url.pathname.split("/").pop() || "img").split("?")[0];
    if (!n || !n.includes(".")) n = "img_" + Math.abs(hash(u)) + ".jpg";
    return Math.abs(hash(u)).toString(36) + "_" + n;
  } catch {
    return "img_" + Math.abs(hash(u)).toString(36) + ".jpg";
  }
}
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; } return h; }

async function download(url, dir) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 600) return null; // skip tracking pixels
    const file = path.join(dir, safeName(url));
    writeFileSync(file, buf);
    return { url, file: path.basename(file), bytes: buf.length };
  } catch { return null; }
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();

  // ---- crawl aestheticsplus.in ----
  const toVisit = [BASE + "/"];
  const visited = new Set();
  const pages = [];
  const allImages = new Set();

  while (toVisit.length && visited.size < MAX_PAGES) {
    const url = toVisit.shift();
    const norm = url.replace(/#.*$/, "").replace(/\/$/, "");
    if (visited.has(norm)) continue;
    visited.add(norm);
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
      await sleep(600);

      const data = await page.evaluate(() => {
        const txt = (el) => (el ? el.innerText.trim() : "");
        const pick = (sel) => Array.from(document.querySelectorAll(sel)).map((e) => e.innerText.trim()).filter(Boolean);
        const imgs = Array.from(document.querySelectorAll("img"))
          .map((i) => ({ src: i.currentSrc || i.src, alt: i.alt || "", cls: i.className || "", w: i.naturalWidth, h: i.naturalHeight }))
          .filter((i) => i.src && i.src.startsWith("http"));
        const vids = Array.from(document.querySelectorAll("iframe,video,source"))
          .map((v) => v.src || v.getAttribute("data-src") || "")
          .filter((s) => s && s.startsWith("http"));
        const links = Array.from(document.querySelectorAll("a[href]")).map((a) => a.href);
        const socials = links.filter((h) => /facebook|instagram|youtube|linkedin|twitter|x\.com|wa\.me|whatsapp/i.test(h));
        const og = document.querySelector('meta[property="og:image"]')?.content || "";
        const favicon = document.querySelector('link[rel*="icon"]')?.href || "";
        return {
          title: document.title,
          metaDesc: document.querySelector('meta[name="description"]')?.content || "",
          h1: pick("h1"), h2: pick("h2"), h3: pick("h3"),
          bodyText: txt(document.body).slice(0, 9000),
          imgs, vids, links, socials, og, favicon,
        };
      });

      pages.push({ url, title: data.title, metaDesc: data.metaDesc, h1: data.h1, h2: data.h2, h3: data.h3, bodyText: data.bodyText, vids: data.vids, socials: [...new Set(data.socials)] });
      data.imgs.forEach((i) => allImages.add(JSON.stringify(i)));

      for (const l of data.links) {
        try {
          const lu = new URL(l);
          if (lu.hostname.endsWith("aestheticsplus.in") && !/\.(jpg|png|pdf|jpeg|webp|svg|zip)$/i.test(lu.pathname)) {
            const ln = l.replace(/#.*$/, "").replace(/\/$/, "");
            if (!visited.has(ln) && toVisit.length + visited.size < MAX_PAGES) toVisit.push(l);
          }
        } catch {}
      }
      console.log("OK", visited.size, url);
    } catch (e) {
      console.log("FAIL", url, e.message);
    }
  }

  // dedupe images, prefer larger; download top set
  const imgList = [...allImages].map((s) => JSON.parse(s));
  const seen = new Set();
  const unique = [];
  for (const im of imgList) {
    if (seen.has(im.src)) continue;
    seen.add(im.src);
    unique.push(im);
  }
  // logo candidates
  const logos = unique.filter((i) => /logo/i.test(i.src + i.alt + i.cls));
  const downloads = [];
  const targets = [...logos, ...unique].slice(0, 80);
  for (const im of targets) {
    const r = await download(im.src, ASSETS);
    if (r) downloads.push({ ...r, alt: im.alt, cls: im.cls, w: im.w, h: im.h, isLogo: /logo/i.test(im.src + im.alt + im.cls) });
  }

  writeFileSync(path.join(ROOT, "content.json"), JSON.stringify({ base: BASE, scrapedAt: new Date().toISOString(), pageCount: pages.length, pages }, null, 2));
  writeFileSync(path.join(ROOT, "images.json"), JSON.stringify({ unique: unique.length, downloaded: downloads.length, downloads }, null, 2));
  console.log(`\nAesthetics Plus: ${pages.length} pages, ${downloads.length}/${unique.length} images downloaded.`);

  // ---- Facebook: BBDV logo + page info ----
  const fbTargets = [
    { name: "logo-photo", url: "https://www.facebook.com/photo/?fbid=152024450811383&set=a.152024417478053" },
    { name: "share-1Emg", url: "https://www.facebook.com/share/1EmgNbjesm/" },
    { name: "share-1DsG", url: "https://www.facebook.com/share/1DsG854b3V/" },
  ];
  const fbResults = [];
  for (const t of fbTargets) {
    try {
      await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 35000 });
      await sleep(2500);
      const info = await page.evaluate(() => ({
        title: document.title,
        og: document.querySelector('meta[property="og:image"]')?.content || "",
        ogTitle: document.querySelector('meta[property="og:title"]')?.content || "",
        ogDesc: document.querySelector('meta[property="og:description"]')?.content || "",
        bigImgs: Array.from(document.querySelectorAll("img"))
          .map((i) => ({ src: i.src, w: i.naturalWidth, h: i.naturalHeight }))
          .filter((i) => i.src.startsWith("http") && i.w >= 120).slice(0, 12),
      }));
      const dl = [];
      if (info.og) { const r = await download(info.og, FBDIR); if (r) dl.push(r); }
      for (const bi of info.bigImgs) { const r = await download(bi.src, FBDIR); if (r) dl.push(r); }
      fbResults.push({ ...t, ...info, downloaded: dl });
      console.log("FB", t.name, "og:", !!info.og, "imgs:", dl.length);
    } catch (e) {
      fbResults.push({ ...t, error: e.message });
      console.log("FB FAIL", t.name, e.message);
    }
  }
  writeFileSync(path.join(FBDIR, "facebook.json"), JSON.stringify(fbResults, null, 2));

  await browser.close();
  console.log("DONE");
})();
