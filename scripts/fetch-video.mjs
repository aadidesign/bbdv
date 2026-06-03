import { chromium } from "playwright";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const OUT = "e:/BBDV/site/public/videos";
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const targets = [
  { q: "spa", file: "wellness.mp4" },
  { q: "luxury-hotel", file: "travel.mp4" },
  { q: "skin-care", file: "beauty.mp4" },
  { q: "massage", file: "massage.mp4" },
  { q: "facial", file: "facial.mp4" },
  { q: "wellness", file: "wellness2.mp4" },
];

async function dl(url, file) {
  const res = await fetch(url);
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 50000) return false;
  writeFileSync(file, buf);
  return Math.round(buf.length / 1024) + "KB";
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    viewport: { width: 1440, height: 1200 },
  });
  const page = await ctx.newPage();
  const results = [];
  const seen = new Set();

  for (const t of targets) {
    const out = path.join(OUT, t.file);
    if (existsSync(out)) { console.log("skip", t.file); continue; }
    try {
      await page.goto("https://mixkit.co/free-stock-video/" + t.q + "/", { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
      await page.evaluate(() => window.scrollBy(0, 1200));
      await sleep(1500);
      const urls = await page.evaluate(() =>
        Array.from(document.querySelectorAll("video"))
          .map((v) => v.getAttribute("src") || v.querySelector("source")?.getAttribute("src") || "")
          .filter((s) => s.includes("assets.mixkit.co") && s.includes(".mp4"))
      );
      const pick = urls.find((u) => !seen.has(u));
      if (pick) {
        seen.add(pick);
        const r = await dl(pick, out);
        if (r) { console.log("OK", t.file, r); results.push({ ...t, src: pick, size: r }); }
        else console.log("DLFAIL", t.q);
      } else {
        console.log("MISS", t.q, "found", urls.length);
      }
    } catch (e) {
      console.log("ERR", t.q, e.message);
    }
  }
  writeFileSync(path.join(OUT, "_sources.json"), JSON.stringify(results, null, 2));
  await browser.close();
  console.log("DONE");
})();
