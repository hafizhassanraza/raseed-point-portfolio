import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Feature from "./pages/Feature.jsx";
import Industries from "./pages/Industries.jsx";
import Pricing from "./pages/Pricing.jsx";
import Demo from "./pages/Demo.jsx";
import Faq from "./pages/Faq.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import { featureBySlug } from "./site.js";

const titles = {
  "/": "Raseed Point — Business Software for Small Businesses",
  "/features": "Features — Raseed Point",
  "/industries": "Industries — Raseed Point",
  "/pricing": "Pricing — Raseed Point",
  "/demo": "Demo — Raseed Point",
  "/faq": "Questions — Raseed Point",
  "/contact": "Contact us — Raseed Point",
};

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const slug = pathname.startsWith("/features/") ? pathname.slice("/features/".length) : "";
    const found = slug ? featureBySlug(slug) : null;
    document.title = found
      ? `${found.feature.name} — Raseed Point`
      : titles[pathname] ?? "Raseed Point";
  }, [pathname]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Product />} />
        <Route path="features/:slug" element={<Feature />} />
        <Route path="product" element={<Navigate to="/features" replace />} />
        <Route path="tour" element={<Navigate to="/features" replace />} />
        <Route path="screens" element={<Navigate to="/features" replace />} />
        <Route path="showcase" element={<Navigate to="/features" replace />} />
        <Route path="industries" element={<Industries />} />
        <Route path="solutions" element={<Navigate to="/industries" replace />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="demo" element={<Demo />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
