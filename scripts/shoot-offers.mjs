import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const OUT = "e:/BBDV/research/preview";
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BASE = process.env.BASE || "http://localhost:3210";

(async () => {
  const browser = await chromium.launch();

  // 1. Landing page, desktop full page
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/offers/rhinoplasty", { waitUntil: "networkidle", timeout: 30000 });
    await page.evaluate(async () => {
      await new Promise((res) => { let y = 0; const t = setInterval(() => { window.scrollBy(0, 900); y += 900; if (y > document.body.scrollHeight) { clearInterval(t); res(); } }, 60); });
    });
    await sleep(700);
    await page.screenshot({ path: `${OUT}/offer-rhinoplasty-desktop.png`, fullPage: true });
    console.log("shot offer-rhinoplasty-desktop");
    await ctx.close();
  }

  // 2. Landing page hero, mobile
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(BASE + "/offers/breast-augmentation", { waitUntil: "networkidle", timeout: 30000 });
    await sleep(600);
    await page.screenshot({ path: `${OUT}/offer-mobile.png`, fullPage: false });
    console.log("shot offer-mobile");
    await ctx.close();
  }

  // 3. Drive the quote form to its lead-scored success state
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/offers/rhinoplasty", { waitUntil: "networkidle", timeout: 30000 });
    await sleep(400);
    // Step 0: rhinoplasty is preselected by the landing page. Continue.
    await page.getByRole("button", { name: /Continue/i }).click();
    await sleep(400);
    // Step 1: set a strong budget so the lead scores Hot, then continue.
    const budget = page.locator("select").nth(3); // country, state(input), timeframe, budget
    try { await budget.selectOption({ label: "$10,000 to $20,000" }); } catch {}
    await page.getByRole("button", { name: /Continue/i }).click();
    await sleep(400);
    // Step 2: contact details.
    await page.getByLabel("First name *").fill("Jessica");
    await page.getByLabel("Email *").fill("jessica@example.com");
    await page.getByLabel("Phone / WhatsApp").fill("+61 412 345 678");
    await page.getByRole("button", { name: /Request my free quote/i }).click();
    await sleep(900);
    // Screenshot just the success card region (scroll it into view).
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(400);
    await page.screenshot({ path: `${OUT}/offer-form-success.png`, fullPage: false });
    console.log("shot offer-form-success");
    await ctx.close();
  }

  await browser.close();
  console.log("DONE");
})();
