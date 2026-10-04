import { useState } from "react";
import { faqs } from "../site.js";

export default function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <article className={isOpen ? "faq on" : "faq"} key={item.q}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : index)}>
              <span>
                <strong>{item.q}</strong>
                <span className="ur" lang="ur" dir="rtl">
                  {item.qUr}
                </span>
              </span>
              <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
            </button>
            {isOpen ? (
              <div className="faq-body">
                <p>{item.a}</p>
                <p className="ur" lang="ur" dir="rtl">
                  {item.aUr}
                </p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
