import { Link } from "react-router-dom";
import Icon from "./Icons.jsx";
import { features } from "../site.js";

export default function FeatureIndex() {
  return (
    <ol className="fcards">
      {features.map((feature) => (
        <li key={feature.slug}>
          <Link className="fcard" to={`/features/${feature.slug}`}>
            <span className="fcard-icon">
              <Icon name={feature.slug} />
            </span>
            <span className="fcard-name">{feature.name}</span>
            <span className="fcard-line">{feature.line}</span>
            <span className="fcard-go">Open</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
