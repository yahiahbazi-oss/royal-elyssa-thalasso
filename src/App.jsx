import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import SEO from "./components/SEO";
import Thalion from "./pages/Thalion/Thalion";
import ErichZemmour from "./pages/ErichZemmour/ErichZemmour";
import Usine from "./pages/Usine/Usine";
import Suite from "./pages/Suite/Suite";
import Spa from "./pages/Spa/Spa";

// Import all your sections
import Hero from "./sections/Hero";
import WhyChoose from "./sections/WhyChoose";
import Testimonial from "./sections/Testimonial";
import Services from "./sections/Services";
import Pricing from "./sections/Pricing";
import Gallery from "./sections/Gallery";
import Contact from "./sections/Contact";
import ContactPage from "./pages/ContactPage";

// Create a Home component that contains all your main sections
const Home = () => {
  return (
    <>
      <SEO
        title="Royal Elyssa Thalasso &amp; Spa — Monastir, Tunisie"
        description="Le Royal Elyssa Thalasso & Spa à Monastir, Tunisie. Thalassothérapie Thal'ion, Spa THEMAE, Eric Zemmour Coiffure, Club L'Usine et Suites VIP au bord de la Méditerranée."
        canonical="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Resort",
          "name": "Royal Elyssa Thalasso & Spa",
          "url": "https://www.royalelyssa.com",
          "telephone": "+21673520589",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "B.P 75 Route Touristique Skanes",
            "addressLocality": "Monastir",
            "postalCode": "5060",
            "addressCountry": "TN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.766667,
            "longitude": 10.759167
          },
          "image": "https://res.cloudinary.com/dxoje33mm/image/upload/f_avif/v1759477822/thalion-royalelyssa.jpg__3876x1912_q85_crop_subsampling-2_upscale_qxd1c0.jpg",
          "priceRange": "€€€"
        }}
      />
      <Hero />
      <WhyChoose />
      <Testimonial />
      <Services />
      <Contact />
      <Pricing />
      <Gallery />
    </>
  );
};

// Layout component that conditionally renders Header only on Home page
const Layout = ({ children }) => {
  const location = useLocation();
  const showHeader = location.pathname === "/"; // Only show Header on Home page

  return (
    <div className="font-sans">
      {showHeader && <Header />}
      {children}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Home route with Header */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          {/* Contact route without Header */}
          <Route
            path="/contact"
            element={
              <div className="font-sans">
                <ContactPage />
                <Footer />
              </div>
            }
          />

          {/* Thalion route without Header */}
          <Route path="/thalion" element={<Thalion />} />

          {/* ErichZemmour route without Header */}
          <Route path="/erich-zemmour" element={<ErichZemmour />} />

          {/* Usine route without Header */}
          <Route path="/usine" element={<Usine />} />

          {/* Suite route without Header */}
          <Route path="/suite" element={<Suite />} />

          {/* Spa route without Header */}
          <Route path="/spa" element={<Spa />} />

          {/* Catch all route - redirect to home */}
          <Route
            path="*"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
