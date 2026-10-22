import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHero } from "../components/Layout.jsx";
import { briefMessage, contactEmail, packages, whatsappHref } from "../site.js";

export default function Contact() {
  const [params] = useSearchParams();
  const requested = packages.find((item) => item.id === params.get("package"));
  const [sent, setSent] = useState(null);
  const [error, setError] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const brief = {
      name: String(data.get("name") || "").trim(),
      business: String(data.get("business") || "").trim(),
      city: String(data.get("city") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      sells: String(data.get("sells") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };
    if (!brief.name || !brief.business || !brief.phone) {
      setError("Name, business, and phone are required.");
      return;
    }
    setError("");
    const body = briefMessage(brief);
    setSent({
      ...brief,
      body,
      wa: whatsappHref(body),
      mail: `mailto:${contactEmail}?subject=${encodeURIComponent(
        `Raseed Point — ${brief.business}`
      )}&body=${encodeURIComponent(body)}`,
    });
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact us."
        lede="Tell us the business. We will walk through the software and map it to how you sell. A phone number is enough."
      />
      <section className="section contact">
        <ul className="contact-points">
          <li>A working auto-parts example, ready to click through</li>
          <li>Roles for owner, stock, and counter staff</li>
          <li>Company branding so the invoice carries their name</li>
        </ul>
        {sent ? (
          <div className="form success" role="status">
            <h2>The request is ready, {sent.name}.</h2>
            <p>Send it on WhatsApp or by email. Nothing is stored on this page.</p>
            <pre>{sent.body}</pre>
            <a className="btn btn-solid" href={sent.wa}>
              Send on WhatsApp
            </a>
            <a className="btn btn-line" href={sent.mail}>
              Open email
            </a>
            <button type="button" className="btn btn-line" onClick={() => setSent(null)}>
              Edit
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} key={requested?.id || "plain"}>
            <label>
              Your name
              <input name="name" autoComplete="name" required placeholder="Your name" />
            </label>
            <label>
              Business name
              <input name="business" required placeholder="Business name" />
            </label>
            <div className="split">
              <label>
                City
                <input name="city" placeholder="City" />
              </label>
              <label>
                Phone
                <input name="phone" required inputMode="tel" autoComplete="tel" placeholder="03xx xxxxxxx" />
              </label>
            </div>
            <label>
              What they sell
              <input name="sells" placeholder="Parts, wholesale, a workshop" />
            </label>
            <label>
              Notes
              <textarea
                name="message"
                rows="4"
                placeholder="Anything we should know"
                defaultValue={requested ? `Package: ${requested.name}` : ""}
              />
            </label>
            {error ? <p className="form-error">{error}</p> : null}
            <button className="btn btn-solid" type="submit">
              Prepare the message
            </button>
          </form>
        )}
      </section>
    </>
  );
}
