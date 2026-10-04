import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section missing">
      <h1>This page is not here.</h1>
      <Link className="btn btn-solid" to="/">
        Back home
      </Link>
    </section>
  );
}
