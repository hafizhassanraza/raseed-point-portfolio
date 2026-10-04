const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

function Svg({ children }) {
  return (
    <svg {...common} width="24" height="24">
      {children}
    </svg>
  );
}

const icons = {
  billing: (
    <Svg>
      <path d="M7 3.5h7.5L18 7v13.5H7z" />
      <path d="M14.5 3.5V7H18" />
      <path d="M9.5 12h5M9.5 15.5h3.5" />
    </Svg>
  ),
  sales: (
    <Svg>
      <path d="M7 7h11l-1.2 8.5H8.2z" />
      <path d="M7 7 5.5 4.5H3" />
      <circle cx="9" cy="19" r="1.2" />
      <circle cx="16" cy="19" r="1.2" />
    </Svg>
  ),
  purchases: (
    <Svg>
      <path d="M4 8h16v10H4z" />
      <path d="M8 8V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V8" />
      <path d="M12 11.5v4M10 13.5h4" />
    </Svg>
  ),
  catalog: (
    <Svg>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </Svg>
  ),
  warehouses: (
    <Svg>
      <path d="M4 10.5 12 5l8 5.5V20H4z" />
      <path d="M9 20v-6h6v6" />
    </Svg>
  ),
  balances: (
    <Svg>
      <path d="M12 4v16" />
      <path d="M12 7h6.5l-1.5 4.5H12" />
      <path d="M12 7H5.5L7 11.5H12" />
      <path d="M8 20h8" />
    </Svg>
  ),
  money: (
    <Svg>
      <path d="M4 16.5 9 11l3 3 7-7" />
      <path d="M15 7h4v4" />
    </Svg>
  ),
  store: (
    <Svg>
      <path d="M4 9.5 6 4.5h12L20 9.5" />
      <path d="M4 9.5h16V20H4z" />
      <path d="M9 20v-5h6v5" />
    </Svg>
  ),
  staff: (
    <Svg>
      <circle cx="9" cy="8" r="2.4" />
      <circle cx="16" cy="9" r="2" />
      <path d="M4.5 18.5c.6-2.6 2.6-4 4.5-4s3.9 1.4 4.5 4" />
      <path d="M14 14.6c1.2-.4 2.4-.5 3.4-.2 1.6.5 2.6 1.8 3.1 4.1" />
    </Svg>
  ),
  parts: (
    <Svg>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5M6 6l1.8 1.8M16.2 16.2 18 18M18 6l-1.8 1.8M7.8 16.2 6 18" />
    </Svg>
  ),
  wholesale: (
    <Svg>
      <path d="M3 8h11v9H3z" />
      <path d="M14 11h4l3 3v3h-7z" />
      <circle cx="7" cy="18.5" r="1.3" />
      <circle cx="17" cy="18.5" r="1.3" />
    </Svg>
  ),
  pharmacy: (
    <Svg>
      <rect x="5" y="4" width="14" height="16" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </Svg>
  ),
  electronics: (
    <Svg>
      <rect x="7" y="3.5" width="10" height="17" rx="2" />
      <path d="M11 18.5h2" />
    </Svg>
  ),
  grocery: (
    <Svg>
      <path d="M6 8h12l-1 11H7z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </Svg>
  ),
  hardware: (
    <Svg>
      <path d="M14.5 5.5 18 9l-2 2-6.5 6.5H6v-3.5z" />
      <path d="M13 7 16.5 10.5" />
    </Svg>
  ),
  garments: (
    <Svg>
      <path d="M9 5.5 12 8l3-2.5 4 2.5-2 3V20H7V11L5 8z" />
    </Svg>
  ),
  branches: (
    <Svg>
      <path d="M3 19.5h18" />
      <path d="M5 19.5V9l4-2.5V19.5" />
      <path d="M11 19.5V6l5-2.5v16" />
    </Svg>
  ),
  owner: (
    <Svg>
      <circle cx="12" cy="8" r="2.6" />
      <path d="M6.5 19c.8-3 2.8-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
    </Svg>
  ),
  counter: (
    <Svg>
      <rect x="4" y="5" width="16" height="11" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </Svg>
  ),
  warehouse: (
    <Svg>
      <path d="M4 10.5 12 5l8 5.5V20H4z" />
      <path d="M9 20v-6h6v6" />
    </Svg>
  ),
};

export default function Icon({ name }) {
  return icons[name] ?? icons.catalog;
}
