/** Change this to the inbox that should receive walkthrough requests. */
export const contactEmail = "hello@raseedpoint.com";

/**
 * WhatsApp number, country code, digits only.
 * Example: "923001234567"
 * Leave blank until the real number is ready.
 */
export const whatsappNumber = "";

export const features = [
  {
    slug: "billing",
    name: "Point of sale",
    line: "Make the bill at the counter.",
    plain: "Make the bill by name, item code, or barcode. Stock left, tax, discount, and payment stay on that screen.",
    why: "The counter does not switch apps to see if the part is still there, or to write the customer’s name.",
    detail:
      "The counter search finds a part by name, item code, or barcode. Quantity left is on the tile. Tax, discount, shipping, and payment stay on the same bill.",
    points: [
      "Search by name, item code, or barcode",
      "Live quantity on every product tile",
      "Tax, discount, shipping, and pay now",
      "Walk-in customer, or a named account",
    ],
    shot: {
      src: "/screenshots/pos.png",
      caption: "The billing screen: search, tiles, and the bill together.",
    },
    recording: [
      { src: "/screenshots/pos.png", title: "The bill", caption: "Search, stock left, tax, and payment on one screen." },
      { src: "/screenshots/sales.png", title: "After the sale", caption: "The invoice keeps its status, and what is still due." },
      { src: "/screenshots/payments-in.png", title: "Money in", caption: "A payment is recorded against the customer." },
    ],
  },
  {
    slug: "sales",
    name: "Sales and returns",
    line: "Follow a bill after it is made.",
    plain: "Follow each invoice after it is made: status, what is paid, and what is still due. An estimate and a return stay attached.",
    why: "A bill does not disappear into a drawer. A return stays on the customer as a credit note.",
    detail:
      "Each invoice shows where it stands: ordered, confirmed, processing, or delivered, and whether it is paid. A price can be written before the bill. A return stays on the customer as a credit note.",
    points: [
      "Ordered, confirmed, processing, and delivered",
      "Paid, unpaid, and the amount still due",
      "An estimate before the bill",
      "A return recorded as a credit note",
    ],
    shot: {
      src: "/screenshots/sales.png",
      caption: "Sales invoices, with status and what is still unpaid.",
    },
    recording: [
      { src: "/screenshots/sales.png", title: "Invoices", caption: "Status, paid amount, and amount due." },
      { src: "/screenshots/quotations.png", title: "Before the bill", caption: "A price can be written before anyone pays." },
      { src: "/screenshots/sales-returns.png", title: "A return", caption: "The return stays on the customer record." },
    ],
  },
  {
    slug: "purchases",
    name: "Purchases",
    line: "Supplier bills bring stock in.",
    plain: "A supplier bill brings stock in. Sending goods back stays on the record, with what is still owed.",
    why: "The order is not a WhatsApp message you have to scroll back to find.",
    detail:
      "A purchase bill receives goods into the warehouse. Sending stock back creates a debit note without losing the original bill. What is still owed to the supplier stays visible.",
    points: [
      "Purchase bills that receive stock",
      "Purchase returns as debit notes",
      "The amount still owed to the supplier",
      "Search by date, party, and document",
    ],
    shot: {
      src: "/screenshots/purchases.png",
      caption: "Purchase bills that add stock when goods arrive.",
    },
    recording: [
      { src: "/screenshots/purchases.png", title: "Buying", caption: "The supplier bill updates the warehouse." },
      { src: "/screenshots/purchase-returns.png", title: "Sending stock back", caption: "A return to the supplier keeps the old bill." },
      { src: "/screenshots/suppliers.png", title: "Suppliers", caption: "The other side of the ledger." },
    ],
  },
  {
    slug: "catalog",
    name: "Catalog",
    line: "Price and stock on one row.",
    plain: "Selling price, purchase price, and quantity sit on one row. Variants, a spreadsheet import, and shelf barcodes are included.",
    why: "The rate list and the stock list are the same list.",
    detail:
      "A part can be a single item, a set of variants, or a service. Brand, category, purchase price, selling price, and quantity sit on the row. A large list can be imported, and barcodes can be printed for the shelf.",
    points: [
      "Single products, variants, and services",
      "Brand, category, both prices, and stock",
      "Import from a spreadsheet",
      "Print barcodes for the shelf",
    ],
    shot: {
      src: "/screenshots/products.png",
      caption: "The catalog: prices and quantity on each row.",
    },
    recording: [
      { src: "/screenshots/products.png", title: "Products", caption: "One row for price and stock." },
      { src: "/screenshots/categories.png", title: "Categories", caption: "The same groups the counter uses." },
      { src: "/screenshots/brands.png", title: "Brands", caption: "Filter the list the way the counter talks." },
    ],
  },
  {
    slug: "warehouses",
    name: "Warehouses",
    line: "More than one godown, one system.",
    plain: "More than one godown, transfers between them, a count correction, and an alert before a part runs out.",
    why: "Two branches do not need two systems, or a phone call, to know what is left.",
    detail:
      "Stock can live in more than one warehouse. A transfer moves goods between them. When the shelf and the system disagree, the count can be corrected. A fast-moving part can raise an alert before it runs out.",
    points: [
      "More than one warehouse under the company",
      "Transfer stock between locations",
      "Correct a count that is wrong",
      "An alert before a part runs out",
    ],
    shot: {
      src: "/screenshots/stock-summary.png",
      caption: "What is on hand, ready to export.",
    },
    recording: [
      { src: "/screenshots/stock-summary.png", title: "On hand", caption: "The count, ready to take out of the system." },
      { src: "/screenshots/stock-transfers.png", title: "A transfer", caption: "Goods move from one warehouse to another." },
      { src: "/screenshots/adjustments.png", title: "A correction", caption: "Fix the count when the shelf disagrees." },
    ],
  },
  {
    slug: "balances",
    name: "Balances",
    line: "Who owes whom, in colour.",
    plain: "Customers, suppliers, and staff stay in separate lists, with To Collect and To Pay on the row.",
    why: "A regular is not anonymous. The balance is visible before anyone opens a calculator.",
    detail:
      "Customers, suppliers, and staff stay in separate lists. To Collect and To Pay are visible before anyone opens a calculator. A list that already lives in Excel can be imported.",
    points: [
      "Customers, suppliers, and staff in separate lists",
      "To Collect and To Pay, in colour",
      "Import a list from Excel",
      "A walk-in customer for the counter",
    ],
    shot: {
      src: "/screenshots/customers.png",
      caption: "Customer balances: to collect, and to pay.",
    },
    recording: [
      { src: "/screenshots/customers.png", title: "Customers", caption: "The balance is on the list, not only the name." },
      { src: "/screenshots/suppliers.png", title: "Suppliers", caption: "What the shop still has to pay." },
      { src: "/screenshots/payments-out.png", title: "Money out", caption: "A payment sent to a supplier." },
    ],
  },
  {
    slug: "money",
    name: "Cash, bank, and profit",
    line: "Close the day from one page.",
    plain: "Cash and bank are separate books. Expenses sit beside sales. Profit can be printed, saved as a PDF, or sent to Excel.",
    why: "The day closes from the system, not from a notebook added up at night.",
    detail:
      "Cash and bank are separate books. Shop expenses sit beside the sales they affect. Profit and loss can be read by order or by date, then printed, saved as a PDF, or sent to Excel.",
    points: [
      "Cash book and bank book, side by side",
      "Expenses recorded beside the sales",
      "Profit and loss by order or by date",
      "Print, PDF, or Excel from the report",
    ],
    shot: {
      src: "/screenshots/profit-loss.png",
      caption: "Profit and loss, with a way to print or export it.",
    },
    recording: [
      { src: "/screenshots/profit-loss.png", title: "Profit", caption: "Sales, purchases, returns, and expenses in one figure." },
      { src: "/screenshots/expenses.png", title: "Expenses", caption: "Shop costs written next to the sales." },
      { src: "/screenshots/cash-bank.png", title: "Cash and bank", caption: "Two books, not one mixed total." },
    ],
  },
  {
    slug: "store",
    name: "Online store",
    line: "The same catalog, on a phone.",
    plain: "The same catalog can open as a public store, with a cart. The order comes back into the admin.",
    why: "The online shop is not a second catalog you have to keep in step by hand.",
    detail:
      "Each warehouse can open a public store when that branch is ready. Customers see the selling price against the old price, add to a cart, and the order comes back into the admin.",
    points: [
      "A public store per warehouse",
      "Selling price shown against the old price",
      "A cart on the storefront",
      "Orders return to the admin",
    ],
    shot: {
      src: "/screenshots/store.png",
      caption: "The storefront: the shop’s catalog, with price and old price.",
    },
    recording: [
      { src: "/screenshots/store.png", title: "The store", caption: "Featured parts under the shop’s own name." },
      { src: "/screenshots/store-phone.png", title: "On a phone", caption: "The same store, in the hand." },
      { src: "/screenshots/website.png", title: "Setup", caption: "The storefront is configured in the same admin." },
    ],
  },
  {
    slug: "staff",
    name: "Staff and permissions",
    line: "The salesman does not see profit.",
    plain: "Admin, stock manager, and salesman come ready. A salesman can sell without opening profit. Attendance sits in the same system.",
    why: "The person at the counter does not need the owner’s books.",
    detail:
      "Three roles come ready: admin, stock manager, and salesman. A salesman can sell without opening the profit report. Attendance, leave, and payroll sit in the same system.",
    points: [
      "Admin, stock manager, and salesman",
      "A salesman can be kept out of profit",
      "Attendance, leave, and payroll",
      "Clock-in from the top bar",
    ],
    shot: {
      src: "/screenshots/roles.png",
      caption: "Roles decide who can sell, move stock, and see profit.",
    },
    recording: [
      { src: "/screenshots/roles.png", title: "Who can see what", caption: "Permissions follow the work, not a shared login." },
      { src: "/screenshots/staff.png", title: "Staff", caption: "The people who can sign in." },
      { src: "/screenshots/hrm.png", title: "Attendance", caption: "Who is in today, and what is still to approve." },
    ],
  },
];

export function featureBySlug(slug) {
  const index = features.findIndex((item) => item.slug === slug);
  if (index < 0) return null;
  return { feature: features[index], index };
}

export const fits = [
  {
    title: "Auto parts and workshops",
    text: "Filters, batteries, tyres, and rims, sold to named garages with balances that carry forward.",
  },
  {
    title: "Wholesale counters",
    text: "Large invoices, purchase returns, a rate list, and more than one warehouse.",
  },
  {
    title: "More than one branch",
    text: "Each warehouse keeps its own stock and can turn an online store on. Transfers move goods without a second system.",
  },
  {
    title: "Owner-operated shops",
    text: "One person can sell, record an expense, and read profit. Roles grow when the staff does.",
  },
];

export const pains = [
  {
    title: "Stock you cannot see",
    text: "If the shelf and the spreadsheet disagree, the counter sells what is already gone, or the shop buys what is already in the godown.",
  },
  {
    title: "Suppliers living in chat",
    text: "A purchase that lives in WhatsApp is easy to lose, and hard to match when the goods arrive.",
  },
  {
    title: "Branches that do not add up",
    text: "Two locations on two lists means nobody can see which godown is short without a manual count.",
  },
  {
    title: "Customers with no memory",
    text: "A named account in a notebook cannot show what they bought last time, or what they still owe.",
  },
];

export const benefits = [
  "The bill, the stock left, and the payment on one screen.",
  "Quantity updates when the bill is saved.",
  "Supplier bills bring stock in, and returns stay on the record.",
  "Customer and supplier balances, before anyone opens a calculator.",
  "Cash, bank, expenses, and profit from the same close.",
  "More than one warehouse, with transfers between them.",
  "A salesman can sell without opening the profit report.",
  "A public store from the same catalog, when a branch is ready.",
];

export const compare = [
  ["The bill at the counter", "Yes", "Written by hand", "Yes"],
  ["Stock moves with the bill", "Yes", "Updated later, if at all", "Often a separate list"],
  ["Supplier bills and returns", "Yes", "A chat and a notebook", "Usually outside the app"],
  ["More than one warehouse", "Yes", "A second file", "Uncommon"],
  ["Who owes whom", "On the customer list", "A notebook", "A name on the bill"],
  ["Cash, bank, and profit", "One close", "Added up at night", "Outside the app"],
  ["Salesman kept out of profit", "Yes, by role", "Whoever holds the book", "Uncommon"],
  ["Online store, same catalog", "Yes", "A different site", "A different subscription"],
  ["Price", "Quoted for the shop", "—", "Their own rate"],
];

export const industries = [
  { icon: "parts", name: "Auto parts", text: "Filters, batteries, tyres, and named garage accounts." },
  { icon: "wholesale", name: "Wholesale", text: "Large bills, purchase returns, and more than one godown." },
  { icon: "pharmacy", name: "Pharmacy", text: "Barcode at the counter, and stock that updates with the bill." },
  { icon: "electronics", name: "Electronics", text: "Variants, item codes, and a catalog the counter can search." },
  { icon: "grocery", name: "Grocery", text: "Fast billing, a walk-in customer, and a daily cash book." },
  { icon: "hardware", name: "Hardware", text: "Bulk purchases, a rate list, and stock that moves between branches." },
  { icon: "garments", name: "Garments", text: "Sizes and colours as variants, with a store on the phone." },
  { icon: "branches", name: "More than one branch", text: "Each warehouse keeps its own stock and can open a store." },
];

export const packages = [
  {
    id: "Counter",
    name: "Counter",
    line: "One shop. The bill, the customer, and the payment.",
    points: ["Point of sale", "Sales, estimates, and returns", "Customers and money in", "The shop’s name on the bill"],
  },
  {
    id: "Shop",
    name: "Shop",
    line: "The counter, the warehouse, and the books.",
    points: ["Everything in Counter", "Products, barcodes, and stock", "Purchases and suppliers", "Expenses, cash, bank, and profit"],
    featured: true,
  },
  {
    id: "Company",
    name: "Company",
    line: "More than one branch, and a store on the phone.",
    points: ["Everything in Shop", "Warehouses and transfers", "Staff roles and attendance", "An online store per warehouse"],
  },
];

export const clients = [
  {
    role: "The owner",
    text: "Starts on the dashboard. Closes the day on profit, cash, bank, and who still owes.",
  },
  {
    role: "The counter",
    text: "Makes the bill by name, item code, or barcode. That login can stay out of the profit report.",
  },
  {
    role: "The warehouse",
    text: "Sees what is left, moves stock between godowns, and gets an alert before a part runs out.",
  },
];

export const promo = [
  { src: "/screenshots/dashboard.png", title: "The day, at a glance", caption: "Sales, expenses, and payments on the opening screen." },
  { src: "/screenshots/pos.png", title: "The bill", caption: "Search, stock left, tax, and payment together." },
  { src: "/screenshots/products.png", title: "The catalog", caption: "Price and quantity on the same row." },
  { src: "/screenshots/sales.png", title: "After the sale", caption: "Status, paid, and what is still due." },
  { src: "/screenshots/customers.png", title: "Who owes whom", caption: "Customer balances, before anyone opens a calculator." },
  { src: "/screenshots/profit-loss.png", title: "The close", caption: "Profit, ready to print or send to Excel." },
  { src: "/screenshots/store.png", title: "The store", caption: "The same catalog, on a public page." },
];

export const steps = [
  { n: "01", title: "Put the shop’s name on it", text: "Company, warehouse, currency, tax, payment modes, and logo." },
  { n: "02", title: "Bring the catalog and the parties", text: "Add products, or import them. Add customers and suppliers the same way." },
  { n: "03", title: "Run the counter", text: "The bill saves, stock moves, and the customer balance updates." },
  { n: "04", title: "Close the day from the reports", text: "Cash versus bank, profit, what is running out, and who still owes." },
];

export const faqs = [
  {
    q: "Is this the real software?",
    qUr: "یہ اصلی سافٹ ویئر ہے؟",
    a: "Yes. Every screen was captured from a running Raseed Point install.",
    aUr: "ہاں۔ ہر تصویر چلتے ہوئے رسید پوائنٹ سے لی گئی ہے۔ ہندسے اسی مثال کے ہیں۔",
  },
  {
    q: "Will my shop’s name be on the bill?",
    qUr: "بل پر میری دکان کا نام آئے گا؟",
    a: "Yes. Name, logo, colour, address, phone, currency, and invoice terms are settings. The product is Raseed Point. The bill is the client’s.",
    aUr: "ہاں۔ نام، نشان، رنگ، پتہ، فون، اور روپے آپ سیٹ کرتے ہیں۔ سافٹ ویئر رسید پوائنٹ ہے، بل آپ کی دکان کا۔",
  },
  {
    q: "Do I need a separate app for billing?",
    qUr: "بل کے لیے الگ سافٹ ویئر چاہیے؟",
    a: "No. POS, invoices, estimates, returns, and payment-in live in the same system as stock and the customer ledger.",
    aUr: "نہیں۔ بل، بھاؤ، واپسی، اور گاہک کا کھاتہ اسی میں ہے۔ مال بھی اسی میں ہے۔",
  },
  {
    q: "What about a second warehouse?",
    qUr: "دوسرا گودام؟",
    a: "Warehouses are a setting, not a new installation. Stock can be transferred, and each warehouse can turn an online store on or off.",
    aUr: "ہاں۔ نیا سافٹ ویئر نہیں لگتا۔ مال ایک گودام سے دوسرے میں بھیجیں۔ آن لائن دکان ہر گودام پر الگ کھول سکتے ہیں۔",
  },
  {
    q: "Can staff be kept out of the accounts?",
    qUr: "ملازم نفع دیکھ لے گا؟",
    a: "Roles decide it. It ships with admin, stock manager, and salesman. A salesman can sell without opening the profit report.",
    aUr: "آپ طے کرتے ہیں۔ مثال میں تین جگہ ہیں: مالک، سٹور کیپر، سیلز مین۔ سیلز مین کو نفع سے روک سکتے ہیں۔",
  },
  {
    q: "How do reports leave the system?",
    qUr: "رپورٹ باہر کیسے نکالوں؟",
    a: "From the report screen: print, PDF, or Excel.",
    aUr: "اسی صفحے سے پرنٹ، پی ڈی ایف، یا ایکسل۔",
  },
  {
    q: "Is there an online shop?",
    qUr: "آن لائن دکان بھی ہے؟",
    a: "Yes. The storefront uses the same products. Customers see a selling price and an old price, and the order comes back into the admin.",
    aUr: "ہاں۔ وہی سامان۔ گاہک قیمت دیکھے، ٹوکری میں ڈالے، آرڈر آپ کے پاس آ جائے۔",
  },
  {
    q: "Can the counter use a phone?",
    qUr: "کاؤنٹر فون پر بل بنا سکتا ہے؟",
    a: "Yes. The same point of sale runs on a phone. The owner can still read the day on a larger screen.",
    aUr: "ہاں۔ وہی بل فون پر بنتا ہے۔ مالک دن بڑی سکرین پر دیکھ سکتا ہے۔",
  },
  {
    q: "How much does it cost?",
    qUr: "قیمت کتنی ہے؟",
    a: "The price is quoted for the shop on a walkthrough. This page does not print a rate.",
    aUr: "قیمت واک تھرو پر دکان کے حساب سے بتائی جاتی ہے۔ اس صفحے پر کوئی رقم نہیں لکھی۔",
  },
  {
    q: "What do you need to start?",
    qUr: "شروع کرنے کے لیے کیا چاہیے؟",
    a: "The business name, the city, how many counters or warehouses, and whether they want the storefront.",
    aUr: "دکان کا نام، شہر، کتنے کاؤنٹر یا گودام، اور آن لائن دکان چاہیے یا نہیں۔",
  },
];

export function whatsappHref(text) {
  const body = encodeURIComponent(text);
  if (whatsappNumber) return `https://wa.me/${whatsappNumber}?text=${body}`;
  return `https://api.whatsapp.com/send?text=${body}`;
}

export function briefMessage(brief) {
  return [
    "Hello, I want to see Raseed Point for my shop.",
    `Name: ${brief.name}`,
    `Business: ${brief.business}`,
    `City: ${brief.city || "—"}`,
    `Phone: ${brief.phone}`,
    `What they sell: ${brief.sells || "—"}`,
    brief.message || "",
  ]
    .filter(Boolean)
    .join("\n");
}
