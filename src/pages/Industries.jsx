import { Link } from "react-router-dom";
import { PageHero } from "../components/Layout.jsx";
import Icon from "../components/Icons.jsx";
import { fits, industries } from "../site.js";

export default function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for a shop that buys, stocks, and sells."
        lede="The same system. The catalog, the warehouses, and the names on the bills are the shop’s."
      />
      <section className="section">
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
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">How it sits</p>
          <h2>One system, different counters.</h2>
        </div>
        <div className="fits">
          {fits.map((item) => (
            <article className="fit" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="actions">
          <Link className="btn btn-solid" to="/contact">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
