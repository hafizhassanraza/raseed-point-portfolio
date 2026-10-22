import { useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo.jsx";
import { contactEmail } from "../site.js";

gsap.registerPlugin(ScrollTrigger);

const links = [
  ["Features", "/features"],
  ["Industries", "/industries"],
  ["Pricing", "/pricing"],
  ["Demo", "/demo"],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const landing = pathname === "/";

  useLayoutEffect(() => {
    setOpen(false);
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  useLayoutEffect(() => {
    if (landing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const root = document.getElementById("main");
    if (!root) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".page-hero, .section, .feature").forEach((node) => {
        gsap.from(node, {
          y: 28,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [pathname, landing]);

  useEffect(() => {
    document.documentElement.classList.toggle("landing", landing);
    return () => document.documentElement.classList.remove("landing");
  }, [landing]);

  useEffect(() => {
    if (landing) {
      setScrolled(false);
      return undefined;
    }
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [landing]);

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
      <header className={!landing && (scrolled || open) ? "nav scrolled" : "nav"}>
        <div className="nav-inner">
          <Link className="brand" to="/">
            <Logo />
          </Link>
          <nav className={open ? "links open" : "links"} aria-label="Site">
            {links.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => (isActive ? "on" : undefined)}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <NavLink className="nav-cta" to="/contact" onClick={() => setOpen(false)}>
              Contact Us
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
        <div key={pathname} className="page-in">
          <Outlet />
        </div>
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
          <Link to="/features">Features</Link>
          <Link to="/features#invoicing">Invoicing</Link>
          <Link to="/features#accounting">Accounting</Link>
          <Link to="/features#inventory">Inventory</Link>
          <Link to="/features#multi-user">Multi-user</Link>
          <Link to="/demo">Demo</Link>
        </div>
        <div className="footer-col">
          <p className="footer-label">The shop</p>
          <Link to="/industries">Industries</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/faq">Questions</Link>
        </div>
        <div className="footer-col">
          <p className="footer-label">Talk</p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <Link to="/contact">Contact Us</Link>
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
