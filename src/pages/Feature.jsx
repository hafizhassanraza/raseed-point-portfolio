import { Link, useParams } from "react-router-dom";
import { WindowFrame } from "../components/Devices.jsx";
import Recording from "../components/Recording.jsx";
import NotFound from "./NotFound.jsx";
import { featureBySlug, features } from "../site.js";

export default function Feature() {
  const { slug } = useParams();
  const found = featureBySlug(slug);
  if (!found) return <NotFound />;

  const { feature, index } = found;
  const previous = features[(index - 1 + features.length) % features.length];
  const next = features[(index + 1) % features.length];

  return (
    <article className="feature">
      <Link className="back" to="/product">
        All features
      </Link>
      <p className="eyebrow">
        Feature {String(index + 1).padStart(2, "0")} of {String(features.length).padStart(2, "0")}
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

      <nav className="pager" aria-label="Other features">
        <Link to={`/features/${previous.slug}`}>
          <small>Previous</small>
          {previous.name}
        </Link>
        <Link to={`/features/${next.slug}`}>
          <small>Next</small>
          {next.name}
        </Link>
      </nav>
    </article>
  );
}
