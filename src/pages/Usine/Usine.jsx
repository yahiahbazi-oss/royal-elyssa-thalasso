import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Info, Users, ChevronDown, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import AccueilUsine from "./UsinePages/AccueilUsine";
import ActiviteUsine from "./UsinePages/ActiviteUsine";
import InfoUsine from "./UsinePages/InfoUsine";
import EquipeUsine from "./UsinePages/EquipeUsine";

// Import du logo
import UsineLogo from "./assets/usinelogo.png";

const Usine = () => {
  const { t } = useTranslation();
  
  // Define all refsf
  const homeRef = useRef(null);
  const activiteRef = useRef(null);
  const equipeRef = useRef(null);
  const infoRef = useRef(null);

  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const tabs = [
    { id: "home", label: t("usine.navbar.home"), icon: Activity, ref: homeRef },
    { id: "activite", label: t("usine.navbar.activity"), icon: Activity, ref: activiteRef },
    { id: "equipe", label: t("usine.navbar.team"), icon: Users, ref: equipeRef },
    { id: "info", label: t("usine.navbar.info"), icon: Info, ref: infoRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleTabClick = (tabId, ref) => {
    setActiveTab(tabId);
    scrollToSection(ref);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <img
                src={UsineLogo}
                alt="L'Usine Logo"
                className="h-12 w-auto object-contain" // Taille ajustée pour une meilleure visibilité
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id, tab.ref)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-amber-400 text-black"
                      : "text-amber-100 hover:bg-amber-400/20 hover:text-amber-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-amber-400 hover:bg-amber-400/20 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 bg-black/80 backdrop-blur-md rounded-lg overflow-hidden"
              >
                <div className="py-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id, tab.ref)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors ${
                        activeTab === tab.id
                          ? "bg-amber-400 text-black"
                          : "text-amber-100 hover:bg-amber-400/20"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="pt-20">
        {/* Hero Section */}
        <div ref={homeRef}>
          <AccueilUsine />
        </div>

        {/* Activities Section */}
        <div ref={activiteRef}>
          <ActiviteUsine />
        </div>

        {/* Team Section */}
        <div ref={equipeRef}>
          <EquipeUsine />
        </div>

        {/* Info Section */}
        <div ref={infoRef}>
          <InfoUsine />
        </div>
      </div>
    </div>
  );
};

export default Usine;
