import { Link, useParams } from "react-router-dom";
import { WindowFrame } from "../components/Devices.jsx";
import Recording from "../components/Recording.jsx";
import NotFound from "./NotFound.jsx";
import { featureBySlug } from "../site.js";

export default function Feature() {
  const { slug } = useParams();
  const found = featureBySlug(slug);
  if (!found) return <NotFound />;

  const { feature, pillar, siblings, within } = found;
  const previous = within > 0 ? siblings[within - 1] : null;
  const next = within >= 0 && within < siblings.length - 1 ? siblings[within + 1] : null;
  const others = siblings.filter((item) => item.slug !== feature.slug);

  return (
    <article className="feature">
      <Link className="back" to="/features">
        All features
      </Link>
      <p className="eyebrow">
        {pillar ? `${pillar.name} · ` : ""}
        {String(within + 1).padStart(2, "0")} of {String(siblings.length).padStart(2, "0")}
      </p>
      <h1>{feature.name}</h1>
      <div className="feature-grid">
        <div>
          <p className="lede">{feature.detail}</p>
          {feature.why ? <p className="why"><strong>Why it matters. </strong>{feature.why}</p> : null}
          <ul className="points">
            {feature.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <section className="stage stage-shot" aria-labelledby="shot-title">
          <h2 id="shot-title">Screenshot</h2>
          <figure>
            <WindowFrame src={feature.shot.src} alt={feature.shot.caption} />
            <figcaption>{feature.shot.caption}</figcaption>
          </figure>
        </section>
      </div>

      <section className="stage" aria-labelledby="rec-title">
        <h2 id="rec-title">Recording</h2>
        <p className="note">Three scenes from this part of the product. Press play, or step through them.</p>
        <Recording frames={feature.recording} />
      </section>

      {others.length ? (
        <section className="also" aria-label={`Also in ${pillar.name}`}>
          <h2>Also in {pillar.name}</h2>
          <ul className="pillar-parts">
            {others.map((item) => (
              <li key={item.slug}>
                <Link to={`/features/${item.slug}`}>
                  <strong>{item.name}</strong>
                  <span>{item.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {previous || next ? (
        <nav className="pager" aria-label={`Other parts of ${pillar.name}`}>
          {previous ? (
            <Link to={`/features/${previous.slug}`}>
              <small>Previous in {pillar.name}</small>
              {previous.name}
            </Link>
          ) : null}
          {next ? (
            <Link className="pager-next" to={`/features/${next.slug}`}>
              <small>Next in {pillar.name}</small>
              {next.name}
            </Link>
          ) : null}
        </nav>
      ) : null}
    </article>
  );
}
