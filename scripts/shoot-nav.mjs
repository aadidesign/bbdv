import { chromium } from "playwright";
const OUT = "e:/BBDV/research/preview";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BASE = process.env.BASE || "http://localhost:3210";

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 820 }, deviceScaleFactor: 1.5 });
  const page = await ctx.newPage();

  // 1) Scrolled navbar over the magenta FAQ band on the home page
  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 30000 });
  const faq = page.getByText("How much can I really save?", { exact: false }).first();
  await faq.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -120)); // bring the band up under the nav
  await sleep(700);
  await page.screenshot({ path: `${OUT}/nav-over-band.png`, clip: { x: 0, y: 0, width: 1440, height: 220 } });
  console.log("shot nav-over-band");

  // 2) Mega menu open on the How It Works page
  await page.goto(BASE + "/how-it-works", { waitUntil: "networkidle", timeout: 30000 });
  await sleep(400);
  await page.getByRole("link", { name: "Procedures" }).first().hover();
  await sleep(700);
  await page.screenshot({ path: `${OUT}/nav-mega.png`, clip: { x: 0, y: 0, width: 1440, height: 430 } });
  console.log("shot nav-mega");

  await browser.close();
  console.log("DONE");
})();
