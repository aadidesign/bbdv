import { chromium } from "playwright";
const OUT = "e:/BBDV/research/preview";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BASE = process.env.BASE || "http://localhost:3210";

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 30000 });
  await sleep(600);

  // open the chat
  await page.getByRole("button", { name: /Open chat assistant/i }).click();
  await sleep(700);

  // open the capture card via the suggestion chip (no API key needed)
  await page.getByRole("button", { name: /^Get a free quote$/i }).first().click();
  await sleep(600);
  await page.screenshot({ path: `${OUT}/chat-capture.png`, clip: { x: 1280 - 432, y: 900 - 660, width: 420, height: 650 } });
  console.log("shot chat-capture");

  // fill and submit
  await page.getByPlaceholder("First name").fill("Jessica");
  await page.getByPlaceholder("WhatsApp number or email").fill("+61 412 345 678");
  const selects = page.locator("form select");
  try { await selects.nth(0).selectOption({ label: "Tummy Tuck" }); } catch (e) { console.log("proc", e.message); }
  try { await selects.nth(1).selectOption({ label: "Within 3 months" }); } catch (e) { console.log("tf", e.message); }
  await sleep(200);
  await page.getByRole("button", { name: /Request my free quote/i }).click();
  await sleep(900);
  await page.screenshot({ path: `${OUT}/chat-lead-scored.png`, clip: { x: 1280 - 432, y: 900 - 660, width: 420, height: 650 } });
  console.log("shot chat-lead-scored");

  await browser.close();
  console.log("DONE");
})();
