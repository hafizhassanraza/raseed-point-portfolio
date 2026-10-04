import { Link } from "react-router-dom";
import { PageHero } from "../components/Layout.jsx";
import { fits, steps } from "../site.js";

export default function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Who it's for"
        title="Built for a shop that buys, stocks, and sells."
        lede="The example is an auto-parts house. The next one can be a workshop, a wholesaler, or a second branch."
      />
      <section className="section">
        <div className="fits">
          {fits.map((item) => (
            <article className="fit" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <h2>How a new shop goes live</h2>
        <ol className="steps">
          {steps.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <Link className="btn btn-solid" to="/contact">
          Book a walkthrough
        </Link>
      </section>
    </>
  );
}
