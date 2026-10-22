import { Link } from "react-router-dom";
import { PageHero } from "../components/Layout.jsx";
import Recording from "../components/Recording.jsx";
import { promo } from "../site.js";

export default function Demo() {
  return (
    <>
      <PageHero
        eyebrow="Demo"
        title={<>Seven scenes <em>from the product.</em></>}
        lede="Press play, or jump to a chapter. These are screens from the running system."
      />
      <section className="section">
        <Recording frames={promo} />
        <div className="actions">
          <Link className="btn btn-solid" to="/contact">
            Contact Us
          </Link>
          <Link className="btn btn-line" to="/features">
            Browse features
          </Link>
        </div>
      </section>
    </>
  );
}
