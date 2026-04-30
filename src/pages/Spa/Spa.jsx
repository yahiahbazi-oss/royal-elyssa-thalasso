import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo3 from "../../assets/logo3.png";
import SEO from "../../components/SEO";

const Spa = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const homeRef = useRef(null);

  const tabs = [
    {
      id: "home",
      label: "Accueil",
      ref: homeRef,
    },
    {
      id: "activities",
      label: "Activités",
      ref: useRef(null),
    },
    {
      id: "team",
      label: "Équipe",
      ref: useRef(null),
    },
    {
      id: "schedule",
      label: "Planning",
      ref: useRef(null),
    },
    {
      id: "info",
      label: "Infos Pratiques",
      ref: useRef(null),
    },
  ];

  // Scroll to home section on component mount
  useEffect(() => {
    if (homeRef.current) {
      window.scrollTo({
        top: homeRef.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    scrollToRef(tab.ref);
  };

  const renderNavButton = (tab) => (
    <div key={tab.id} className="relative">
      <button
        onClick={() => handleTabClick(tab)}
        className={`px-2 xl:px-3 py-3 relative overflow-hidden group font-serif text-xs xl:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-1 whitespace-nowrap ${
          activeTab === tab.id
            ? "text-amber-50 font-medium"
            : "text-amber-100/80 hover:text-amber-50"
        }`}
      >
        {tab.label}
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-500 ${
            activeTab === tab.id ? "w-full" : "w-0 group-hover:w-full"
          }`}
        ></span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <SEO
        title="Espace THEMAE - Spa"
        description="Découvrez l'Espace THEMAE, le spa luxueux du Royal Elyssa à Monastir. Soins corps, massages, bains thermaux et rituels bien-être sur la Méditerranée."
        canonical="/spa"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "DaySpa",
          "name": "Espace THEMAE — Spa",
          "description": "Spa de luxe au Royal Elyssa, Monastir. Soins corps, massages, bains thermaux et rituels bien-être sur la Méditerranée.",
          "url": "https://www.royalelyssa.com/spa",
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
          "parentOrganization": {
            "@type": "Resort",
            "name": "Royal Elyssa Thalasso & Spa",
            "url": "https://www.royalelyssa.com"
          }
        }}
      />
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-amber-500/20 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
          <div className="flex items-center justify-between h-full relative">
            {/* Left Logo */}
            <div
              className="flex items-center cursor-pointer hover:opacity-90 transition-opacity z-10 flex-shrink-0"
              onClick={() => navigate("/")}
            >
              <img
                src={logo3}
                alt="Royal Elyssa Logo"
                className="h-12 lg:h-14 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {tabs.map((tab) => renderNavButton(tab))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center z-10">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-amber-50 hover:text-amber-200 focus:outline-none"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-lg py-4 px-6 shadow-xl">
            {tabs.map((tab) => (
              <div key={tab.id}>
                <button
                  onClick={() => {
                    handleTabClick(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between w-full text-center py-3 px-4 font-serif text-amber-50 uppercase tracking-wider border-b border-amber-500/20 ${
                    activeTab === tab.id ? "font-medium" : ""
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <div className="pt-20">
        {/* Hero Section */}
        <div
          ref={homeRef}
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center px-8">
            <h1 className="text-6xl md:text-8xl font-bold text-amber-400 mb-8">
              HELLO USINE
            </h1>
            <p className="text-2xl md:text-3xl text-amber-100/90 font-light mb-12">
              CLUB DE SPORT PREMIUM
            </p>
            <p className="text-lg text-amber-50/70 max-w-2xl mx-auto mb-16">
              Bienvenue à L'USINE, votre destination pour le fitness et le
              bien-être.
            </p>
          </div>
        </div>

        {/* Additional Sections */}
        {tabs.slice(1).map((tab, index) => (
          <div
            key={tab.id}
            ref={tab.ref}
            className="min-h-screen flex items-center justify-center"
          >
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-bold text-amber-400 mb-8">
                {tab.label.toUpperCase()}
              </h2>
              <p className="text-xl text-amber-100/80">
                Content coming soon...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spa;
