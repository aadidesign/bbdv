import { chromium } from "playwright";
const OUT = "e:/BBDV/research/preview";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BASE = process.env.BASE || "http://localhost:3210";
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 820 }, deviceScaleFactor: 1.5 });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 30000 });
  // The magenta CTA card in the FAQ teaser contains this line:
  const card = page.getByText("Talk to a coordinator in Melbourne", { exact: false }).first();
  await card.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -90));
  await sleep(700);
  await page.screenshot({ path: `${OUT}/nav-over-magenta.png`, clip: { x: 0, y: 0, width: 1440, height: 230 } });
  console.log("shot nav-over-magenta");
  await browser.close();
})();
