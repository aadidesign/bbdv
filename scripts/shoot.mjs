import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const OUT = "e:/BBDV/research/preview";
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BASE = process.env.BASE || "http://localhost:3210";

const shots = [
  { path: "/", name: "home2-desktop", w: 1440, h: 900, full: true },
  { path: "/patient-stories", name: "stories2", w: 1440, h: 900, full: true },
  { path: "/surgery-in-india", name: "surgery2", w: 1440, h: 900, full: false },
];

(async () => {
  const browser = await chromium.launch();
  for (const s of shots) {
    const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + s.path, { waitUntil: "networkidle", timeout: 30000 });
      // gentle scroll to trigger reveal animations, then back to top
      await page.evaluate(async () => {
        await new Promise((res) => { let y = 0; const t = setInterval(() => { window.scrollBy(0, 900); y += 900; if (y > document.body.scrollHeight) { clearInterval(t); res(); } }, 60); });
      });
      await sleep(700);
      if (!s.full) await page.evaluate(() => window.scrollTo(0, 0));
      await sleep(500);
      await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: s.full });
      console.log("shot", s.name);
    } catch (e) {
      console.log("FAIL", s.name, e.message);
    }
    await ctx.close();
  }
  await browser.close();
  console.log("DONE");
})();
