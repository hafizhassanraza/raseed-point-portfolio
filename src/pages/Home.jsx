import { Link } from "react-router-dom";
import { Laptop, Phone, WindowFrame } from "../components/Devices.jsx";
import FaqList from "../components/FaqList.jsx";
import FeatureIndex from "../components/FeatureIndex.jsx";
import Icon from "../components/Icons.jsx";
import Recording from "../components/Recording.jsx";
import Reveal from "../components/Reveal.jsx";
import { benefits, clients, compare, features, industries, packages, pains, promo, steps } from "../site.js";

const spots = ["billing", "catalog", "purchases", "money"]
  .map((slug) => features.find((item) => item.slug === slug))
  .filter(Boolean);

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Business Software
            <br />
            for <em>Small Businesses</em>
          </h1>
          <p className="lede">
            Raseed Point Solution – your trusted partner in simplifying <strong>invoicing, accounting, and inventory</strong> with easy-to-use business software for small businesses. Raseed Point helps you manage operations efficiently and grow with confidence.
          </p>
          <div className="actions">
            <Link className="btn btn-solid" to="/contact">
              Book a walkthrough
            </Link>
            <a className="btn btn-line" href="#promo">
              Watch it run
            </a>
          </div>
        </div>
        <div className="hero-stage">
          <div className="shot-frame">
            <img src="/screenshots/dashboard.png" alt="The day, at a glance" />
          </div>
        </div>
        <ul className="hero-points">
          <li>
            <span className="hero-point-icon">
              <Icon name="billing" />
            </span>
            <span>Invoicing</span>
          </li>
          <li>
            <span className="hero-point-icon">
              <Icon name="money" />
            </span>
            <span>Accounting</span>
          </li>
          <li>
            <span className="hero-point-icon">
              <Icon name="catalog" />
            </span>
            <span>Inventory</span>
          </li>
          <li>
            <span className="hero-point-icon">
              <Icon name="staff" />
            </span>
            <span>Multi-user</span>
          </li>
        </ul>
      </section>

      <Reveal>
        <section className="section" id="problems">
          <div className="section-head">
            <p className="eyebrow">The usual day</p>
            <h2>Still running the shop on Excel, <em>WhatsApp, and paper?</em></h2>
          </div>
          <ul className="problem-grid">
            {pains.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="suite">
          <div className="section-head">
            <p className="eyebrow">One login</p>
            <h2>Everything the shop <em>runs on.</em></h2>
            <p>
              Raseed Point starts at the counter and stays with the stock, the supplier, the customer, and the close. Open a part to see the screen and a short recording.
            </p>
          </div>
          <FeatureIndex />
        </section>
      </Reveal>

      {spots.map((feature, index) => (
        <Reveal key={feature.slug}>
          <section className={index % 2 ? "section band band-flip" : "section band"} id={feature.slug}>
            <div>
              <p className="eyebrow">{feature.name}</p>
              <h2>{feature.line}</h2>
              <p>{feature.plain}</p>
              <p className="why">{feature.why}</p>
              <Link to={`/features/${feature.slug}`}>See this screen</Link>
            </div>
            <WindowFrame src={feature.shot.src} alt={feature.shot.caption} />
          </section>
        </Reveal>
      ))}

      <Reveal>
        <section className="section summary" id="summary">
          <div className="summary-copy">
            <p className="eyebrow">Desk and phone</p>
            <h2>The same sale, <em>on both.</em></h2>
            <p>
              The owner reads the day on a laptop. The counter makes the bill on a phone. Stock, the customer balance, and the invoice stay in one system.
            </p>
            <ul className="points">
              {benefits.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
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
        <section className="section" id="benefits">
          <div className="section-head">
            <p className="eyebrow">What changes</p>
            <h2>What the shop <em>gets.</em></h2>
            <p>These are the jobs the running product already does. Not a list of promises.</p>
          </div>
          <ul className="benefit-grid">
            {benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="compare">
          <div className="section-head">
            <p className="eyebrow">A plain comparison</p>
            <h2>Against the way a shop <em>works today.</em></h2>
            <p>
              Not a score against another brand. The left column is what this product does. The other two are the usual alternatives.
            </p>
          </div>
          <div className="compare-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">What the shop needs</th>
                  <th scope="col">Raseed Point</th>
                  <th scope="col">Excel and paper</th>
                  <th scope="col">A billing-only app</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="industries">
          <div className="section-head">
            <p className="eyebrow">Industries</p>
            <h2>Counters that buy, <em>stock, and sell.</em></h2>
            <p>The same system. The catalog is the shop’s.</p>
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
        <section className="section" id="steps">
          <div className="section-head">
            <p className="eyebrow">How a shop gets on it</p>
            <h2>A walkthrough, <em>then the counter.</em></h2>
            <p>No invented trial length. You book a time, and we set the shop up on its own name.</p>
          </div>
          <ol className="steps">
            {steps.map((item) => (
              <li key={item.n}>
                <span>{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="packages">
          <div className="section-head">
            <p className="eyebrow">Packages</p>
            <h2>Three ways <em>to start.</em></h2>
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
        <section className="section" id="promo">
          <div className="section-head">
            <p className="eyebrow">A look through</p>
            <h2>Seven scenes <em>from the product.</em></h2>
            <p>Press play, or jump to a chapter. These are screens from the running system, not a filmed advert.</p>
          </div>
          <Recording frames={promo} />
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="clients">
          <div className="section-head">
            <p className="eyebrow">Who signs in</p>
            <h2>Three jobs, <em>one shop.</em></h2>
            <p>These are the roles the product ships with. Not quotes from people we invented.</p>
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
            <h2>Short answers, <em>in English and Urdu.</em></h2>
            <p>English on the left. Urdu on the right. They say the same thing.</p>
          </div>
          <FaqList />
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="start">
          <div className="close-cta">
            <p className="eyebrow">Next</p>
            <h2>See it on <em>your own catalog.</em></h2>
            <p>
              Book a walkthrough. Bring the kind of parts you sell. The price is quoted for that shop.
            </p>
            <Link className="btn btn-solid" to="/contact">
              Book a walkthrough
            </Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
