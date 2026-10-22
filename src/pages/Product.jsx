import { PageHero } from "../components/Layout.jsx";
import FeatureIndex from "../components/FeatureIndex.jsx";
import Icon from "../components/Icons.jsx";
import { benefits, clients } from "../site.js";

export default function Product() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={<>Four parts. <em>Every screen has a home.</em></>}
        lede="Invoicing, accounting, inventory, and multi-user. Open one for the explanation, the screenshot, and a short recording."
      />
      <section className="section">
        <FeatureIndex />
      </section>
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">What changes</p>
          <h2>What the shop gets.</h2>
          <p>These are the jobs the running product already does.</p>
        </div>
        <ul className="benefit-grid">
          {benefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Who signs in</p>
          <h2>Three jobs, one shop.</h2>
          <p>These are the roles the product ships with.</p>
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
    </>
  );
}
