import { chromium } from "playwright";
const OUT = "e:/BBDV/research/preview";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BASE = process.env.BASE || "http://localhost:3210";

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 1100 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE + "/offers/rhinoplasty", { waitUntil: "networkidle", timeout: 30000 });
  await sleep(400);
  await page.getByRole("button", { name: /Continue/i }).click();
  await sleep(350);
  // Step 1 selects in DOM order: country(0), timeframe(1), budget(2)
  try { await page.locator("form select").nth(2).selectOption({ label: "$10,000 to $20,000" }); } catch (e) { console.log("budget", e.message); }
  await page.getByRole("button", { name: /Continue/i }).click();
  await sleep(350);
  await page.getByLabel("First name *").fill("Jessica");
  await page.getByLabel("Email *").fill("jessica@example.com");
  await page.getByLabel("Phone / WhatsApp").fill("+61 412 345 678");
  await page.getByRole("button", { name: /Request my free quote/i }).click();
  await sleep(1000);
  const card = page.locator("text=how the live system handles this lead").locator("xpath=ancestor::div[contains(@class,'rounded-[2rem]')][1]");
  try {
    await card.screenshot({ path: `${OUT}/lead-score-card.png` });
    console.log("shot lead-score-card (element)");
  } catch (e) {
    console.log("element shot failed, full viewport:", e.message);
    await page.screenshot({ path: `${OUT}/lead-score-card.png` });
  }
  await browser.close();
  console.log("DONE");
})();
