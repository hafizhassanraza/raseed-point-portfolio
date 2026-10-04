import puppeteer from "puppeteer-core";
import path from "path";

const OUT = path.resolve("public/screenshots");
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = "http://raseed-point.test";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(`${BASE}/store/chaudhry-auto-parts`, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: path.join(OUT, "store-phone.png") });

await page.goto(`${BASE}/admin/login`, { waitUntil: "networkidle2" });
await page.waitForSelector("input");
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: path.join(OUT, "login-phone.png") });

const inputs = await page.$$("input");
await inputs[0].type("admin@example.com");
await inputs[1].type("12345678");
await Promise.all([
  page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {}),
  page.keyboard.press("Enter"),
]);
await new Promise((r) => setTimeout(r, 1500));
await page.goto(`${BASE}/admin/stock/pos`, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: path.join(OUT, "pos-phone.png") });

await browser.close();
console.log("mobile done");
