import FeatureIndex from "../components/FeatureIndex.jsx";
import { PageHero } from "../components/Layout.jsx";

export default function Product() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Open one. See that part."
        lede="The list is the map. A feature opens into its explanation, one screenshot, and a short recording from the live product."
      />
      <section className="section">
        <FeatureIndex />
      </section>
    </>
  );
}
