import FaqList from "../components/FaqList.jsx";
import { PageHero } from "../components/Layout.jsx";

export default function Faq() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="Short answers, in English and Urdu."
        lede="The question is in English. The Urdu line under it says the same thing."
      />
      <section className="section">
        <FaqList />
      </section>
    </>
  );
}
