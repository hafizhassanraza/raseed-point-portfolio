import { Link } from "react-router-dom";
import Icon from "./Icons.jsx";
import { partsOf, pillars } from "../site.js";

export default function FeatureIndex() {
  return (
    <ol className="pillars">
      {pillars.map((pillar) => (
        <li className="pillar" id={pillar.id} key={pillar.id}>
          <span className="fcard-icon">
            <Icon name={pillar.icon} />
          </span>
          <h3>{pillar.name}</h3>
          <p>{pillar.line}</p>
          <ul className="pillar-parts">
            {partsOf(pillar).map((feature) => (
              <li key={feature.slug}>
                <Link to={`/features/${feature.slug}`}>
                  <strong>{feature.name}</strong>
                  <span>{feature.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
