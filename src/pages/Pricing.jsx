import { Link } from "react-router-dom";
import { PageHero } from "../components/Layout.jsx";
import { compare, packages, steps } from "../site.js";

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Three ways <em>to start.</em></>}
        lede="The price is quoted for the shop. This page does not print a rate. Name the package when you get in touch."
      />
      <section className="section">
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
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">How a shop gets on it</p>
          <h2>A conversation, then the counter.</h2>
          <p>You contact us, and the shop is set up on its own name.</p>
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
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">A plain comparison</p>
          <h2>Against the way a shop works today.</h2>
          <p>Not a score against another brand. The left column is what this product does.</p>
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
                {row.map((cell, cellIndex) => (
                  <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                ))}
                </tr>
              ))}
            </tbody>
          </table>
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
