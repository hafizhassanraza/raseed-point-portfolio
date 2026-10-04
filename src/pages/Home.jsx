import { Link } from "react-router-dom";
import { Laptop, Phone } from "../components/Devices.jsx";
import FaqList from "../components/FaqList.jsx";
import FeatureIndex from "../components/FeatureIndex.jsx";
import Icon from "../components/Icons.jsx";
import Recording from "../components/Recording.jsx";
import Reveal from "../components/Reveal.jsx";
import { clients, industries, packages, promo } from "../site.js";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Raseed Point</p>
          <h1>The shop, kept in one place.</h1>
          <p className="lede">
            Billing, stock, purchases, balances, staff, and an online store.
            One system, under the client’s own name.
          </p>
          <div className="actions">
            <a className="btn btn-solid" href="#features">
              See the features
            </a>
            <Link className="btn btn-line" to="/contact">
              Book a walkthrough
            </Link>
          </div>
        </div>
        <div className="hero-stage">
          <Laptop
            src="/screenshots/dashboard.png"
            alt="Dashboard with sales, expenses, payments, a top-selling chart, and sales against purchases."
          />
        </div>
      </section>

      <Reveal>
        <section className="section" id="industries">
          <div className="section-head">
            <p className="eyebrow">Industries</p>
            <h2>Where a shop can use it.</h2>
            <p>Any counter that buys, stocks, and sells. These are the usual ones.</p>
          </div>
          <ul className="industry-grid">
            {industries.map((item) => (
              <li key={item.name}>
                <span className="fcard-icon">
                  <Icon name={item.icon} />
                </span>
                <strong>{item.name}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="section summary" id="summary">
          <div className="summary-copy">
            <p className="eyebrow">Summary</p>
            <h2>Desk for the books. Phone for the bill.</h2>
            <p>
              The owner reads the day on a laptop. The counter makes the same sale
              on a phone. Stock, the customer balance, and the bill stay in one system.
            </p>
            <ul className="points">
              <li>Dashboard, profit, and who still owes</li>
              <li>The bill, with stock left on every tile</li>
              <li>A public store when a branch is ready</li>
            </ul>
          </div>
          <div className="devices">
            <Laptop
              src="/screenshots/pos.png"
              alt="Point of sale on a laptop: product search, tiles, and the bill."
            />
            <Phone src="/screenshots/pos-phone.png" alt="The same point of sale on a phone." />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="features">
          <div className="section-head">
            <h2>Features</h2>
            <p>Open one. The page shows what it does, the screen, and a short recording.</p>
          </div>
          <FeatureIndex />
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="promo">
          <div className="section-head">
            <p className="eyebrow">Promo</p>
            <h2>A short look through the product.</h2>
            <p>Seven scenes. Press play, or jump to a chapter.</p>
          </div>
          <Recording frames={promo} />
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="packages">
          <div className="section-head">
            <p className="eyebrow">Packages</p>
            <h2>Three ways to start.</h2>
            <p>The price is quoted for the shop. Name the package when you book.</p>
          </div>
          <div className="package-grid">
            {packages.map((item) => (
              <article className={item.featured ? "package featured" : "package"} key={item.id}>
                {item.featured ? <span className="package-tag">Most shops</span> : null}
                <h3>{item.name}</h3>
                <p>{item.line}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link className="btn btn-solid" to={`/contact?package=${item.id}`}>
                  Ask for {item.name}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="clients">
          <div className="section-head">
            <p className="eyebrow">Happy clients</p>
            <h2>Three people, one shop.</h2>
            <p>Each login sees the work it is meant to do.</p>
          </div>
          <ul className="client-grid">
            {clients.map((item) => (
              <li key={item.role}>
                <span className="fcard-icon">
                  <Icon name={item.role === "The owner" ? "owner" : item.role === "The counter" ? "counter" : "warehouse"} />
                </span>
                <h3>{item.role}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="faq">
          <div className="section-head">
            <p className="eyebrow">Questions</p>
            <h2>Short answers, in English and Urdu.</h2>
            <p>The question is in English. The Urdu line under it says the same thing.</p>
          </div>
          <FaqList />
        </section>
      </Reveal>
    </>
  );
}
