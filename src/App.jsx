import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Feature from "./pages/Feature.jsx";
import Solutions from "./pages/Solutions.jsx";
import Faq from "./pages/Faq.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import { featureBySlug } from "./site.js";

const titles = {
  "/": "Raseed Point — Business Software for Small Businesses",
  "/product": "Features — Raseed Point",
  "/solutions": "Who it's for — Raseed Point",
  "/faq": "Questions — Raseed Point",
  "/contact": "Book a walkthrough — Raseed Point",
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
        <Route path="product" element={<Product />} />
        <Route path="features/:slug" element={<Feature />} />
        <Route path="tour" element={<Navigate to="/product" replace />} />
        <Route path="screens" element={<Navigate to="/product" replace />} />
        <Route path="showcase" element={<Navigate to="/product" replace />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
