import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const OUT = path.resolve("public/screenshots");
fs.mkdirSync(OUT, { recursive: true });

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = "http://raseed-point.test";

const pages = [
  ["dashboard", "/admin/dashboard"],
  ["products", "/admin/products"],
  ["categories", "/admin/categories"],
  ["brands", "/admin/brands"],
  ["pos", "/admin/stock/pos"],
  ["sales", "/admin/stock/sales"],
  ["purchases", "/admin/stock/purchases"],
  ["quotations", "/admin/stock/quotations"],
  ["sales-returns", "/admin/stock/sales-returns"],
  ["purchase-returns", "/admin/stock/purchase-returns"],
  ["stock-transfers", "/admin/stock/stock-transfers"],
  ["adjustments", "/admin/stock/adjustments"],
  ["online-orders", "/admin/stock/online-orders"],
  ["customers", "/admin/customers"],
  ["suppliers", "/admin/suppliers"],
  ["staff", "/admin/users"],
  ["expenses", "/admin/expenses"],
  ["payments-in", "/admin/payment/in"],
  ["payments-out", "/admin/payment/out"],
  ["profit-loss", "/admin/reports/profit-loss"],
  ["sales-summary", "/admin/reports/sales-summary"],
  ["stock-summary", "/admin/reports/stock-summary"],
  ["stock-alert", "/admin/reports/stock-alert"],
  ["payments-report", "/admin/reports/payments"],
  ["cash-bank", "/admin/reports/cash-bank"],
  ["rate-list", "/admin/reports/rate-list"],
  ["hrm", "/admin/dashboards/dashboards"],
  ["attendance", "/admin/attendances/attendances"],
  ["payroll", "/admin/payrolls/payrolls"],
  ["leaves", "/admin/leaves/leaves"],
  ["company", "/admin/settings/company"],
  ["roles", "/admin/settings/roles"],
  ["warehouses", "/admin/settings/warehouses"],
  ["taxes", "/admin/settings/taxes"],
  ["payment-modes", "/admin/settings/payment-modes"],
  ["website", "/admin/website-setup/front-settings"],
  ["store", "/store/chaudhry-auto-parts"],
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,900"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
page.setDefaultNavigationTimeout(45000);

await page.goto(`${BASE}/admin/login`, { waitUntil: "networkidle2" });
await page.waitForSelector("input", { timeout: 20000 });
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: path.join(OUT, "login.png") });

const inputs = await page.$$("input");
await inputs[0].click({ clickCount: 3 });
await inputs[0].type("admin@example.com", { delay: 10 });
await inputs[1].click({ clickCount: 3 });
await inputs[1].type("12345678", { delay: 10 });
await Promise.all([
  page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {}),
  page.keyboard.press("Enter"),
]);
await new Promise((r) => setTimeout(r, 1800));

for (const [name, url] of pages) {
  try {
    await page.goto(`${BASE}${url}`, { waitUntil: "networkidle2" });
    await page
      .waitForFunction(() => !document.querySelector(".ant-spin-spinning"), {
        timeout: 12000,
      })
      .catch(() => {});
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: path.join(OUT, `${name}.png`) });
    console.log("ok", name, page.url());
  } catch (err) {
    console.log("fail", name, err.message);
  }
}

await browser.close();
console.log("done");
