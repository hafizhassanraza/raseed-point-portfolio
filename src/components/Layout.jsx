import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";
import { contactEmail } from "../site.js";

const links = [
  ["The system", "/#suite"],
  ["Industries", "/#industries"],
  ["Packages", "/#packages"],
  ["Questions", "/faq"],
];

const sectionFor = {
  "The system": "suite",
  Industries: "industries",
  Packages: "packages",
};

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { pathname, hash } = useLocation();
  const featuresOn = pathname === "/product" || pathname.startsWith("/features");

  useEffect(() => {
    setOpen(false);
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      if (pathname !== "/") {
        setActive("");
        return;
      }
      const line = window.scrollY + 96;
      let current = "";
      for (const id of ["suite", "industries", "packages"]) {
        const node = document.getElementById(id);
        if (node && node.offsetTop <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={scrolled || open ? "nav scrolled" : "nav"}>
        <div className="nav-inner">
          <Link className="brand" to="/" onClick={() => setActive("")}>
            <Logo />
          </Link>
          <nav className={open ? "links open" : "links"} aria-label="Site">
            {links.map(([label, to]) => {
              if (to === "/faq") {
                return (
                  <NavLink key={to} to={to} onClick={() => setOpen(false)}>
                    {label}
                  </NavLink>
                );
              }
              const section = sectionFor[label];
              const marking = (label === "The system" && featuresOn) || active === section;
              return (
                <Link
                  key={to}
                  to={to}
                  className={marking ? "on" : undefined}
                  aria-current={marking ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
            <NavLink className="nav-cta" to="/contact" onClick={() => setOpen(false)}>
              Book a walkthrough
            </NavLink>
          </nav>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-brand">
          <Link className="brand" to="/">
            <Logo />
          </Link>
          <p>The bill, the stock, the supplier, the balance, and the books. Under the shop’s own name.</p>
        </div>
        <div className="footer-col">
          <p className="footer-label">Product</p>
          <Link to="/#suite">The system</Link>
          <Link to="/#promo">A look through</Link>
          <Link to="/#packages">Packages</Link>
          <Link to="/product">All features</Link>
        </div>
        <div className="footer-col">
          <p className="footer-label">The shop</p>
          <Link to="/#industries">Industries</Link>
          <Link to="/solutions">Who it's for</Link>
          <Link to="/#clients">Who signs in</Link>
          <Link to="/faq">Questions</Link>
        </div>
        <div className="footer-col">
          <p className="footer-label">Talk</p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <Link to="/contact">Book a walkthrough</Link>
        </div>
        <p className="fine">Screens are from the running product.</p>
      </footer>
    </>
  );
}

export function PageHero({ eyebrow, title, lede }) {
  return (
    <header className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  );
}
