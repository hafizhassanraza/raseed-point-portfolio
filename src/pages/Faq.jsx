import FaqList from "../components/FaqList.jsx";
import { PageHero } from "../components/Layout.jsx";

export default function Faq() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="Short answers, in English and Urdu."
        lede="English on the left. Urdu on the right. They say the same thing."
      />
      <section className="section">
        <FaqList />
      </section>
    </>
  );
}
