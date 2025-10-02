import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Info, Users, ChevronDown, X, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import AccueilUsine from "./UsinePages/AccueilUsine";
import ActiviteUsine from "./UsinePages/ActiviteUsine";
import InfoUsine from "./UsinePages/InfoUsine";
import EquipeUsine from "./UsinePages/EquipeUsine";

// Import du logo
import UsineLogo from "./assets/usinelogo.png";

// Import flag images
import francFlag from "../../assets/france.png";
import ukFlag from "../../assets/royaume-uni.png";
import russiaFlag from "../../assets/russie.png";

const Usine = () => {
  const { t, i18n } = useTranslation();

  // Language change function
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  // Define all refsf
  const homeRef = useRef(null);
  const activiteRef = useRef(null);
  const equipeRef = useRef(null);
  const infoRef = useRef(null);

  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const tabs = [
    { id: "home", label: t("usine.navbar.home"), icon: Home, ref: homeRef },
    {
      id: "activite",
      label: t("usine.navbar.activity"),
      icon: Activity,
      ref: activiteRef,
    },
    {
      id: "equipe",
      label: t("usine.navbar.team"),
      icon: Users,
      ref: equipeRef,
    },
    { id: "info", label: t("usine.navbar.info"), icon: Info, ref: infoRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy functionality
      const sections = [
        { id: "home", ref: homeRef },
        { id: "activite", ref: activiteRef },
        { id: "equipe", ref: equipeRef },
        { id: "info", ref: infoRef },
      ];

      const scrollPosition = window.scrollY + 100; // Offset for navbar

      for (const section of sections) {
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop;
          const sectionHeight = section.ref.current.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveTab(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      const navHeight = 80; // Height of fixed navbar
      const elementPosition = ref.current.offsetTop;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
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
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <img
                src={UsineLogo}
                alt="L'Usine Logo"
                className="h-10 w-auto object-contain"
              />
            </motion.div>

            {/* Language Flags - Centered (Mobile) */}
            <div className="md:hidden flex items-center space-x-2">
              <img
                src={francFlag}
                alt="France Flag"
                className="h-5 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer border border-amber-400/30"
                onClick={() => changeLanguage('fr')}
                title="Français"
              />
              <img
                src={ukFlag}
                alt="UK Flag"
                className="h-5 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer border border-amber-400/30"
                onClick={() => changeLanguage('en')}
                title="English"
              />
              <img
                src={russiaFlag}
                alt="Russia Flag"
                className="h-5 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer border border-amber-400/30"
                onClick={() => changeLanguage('ru')}
                title="Русский"
              />
            </div>

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
              
              {/* Language Flags - Right side (Desktop) */}
              <div className="flex items-center space-x-2 pl-4 border-l border-amber-400/30">
                <img
                  src={francFlag}
                  alt="France Flag"
                  className="h-6 w-8 object-cover rounded shadow-md hover:scale-110 transition-all duration-300 cursor-pointer border border-amber-400/30"
                  onClick={() => changeLanguage('fr')}
                  title="Français"
                />
                <img
                  src={ukFlag}
                  alt="UK Flag"
                  className="h-6 w-8 object-cover rounded shadow-md hover:scale-110 transition-all duration-300 cursor-pointer border border-amber-400/30"
                  onClick={() => changeLanguage('en')}
                  title="English"
                />
                <img
                  src={russiaFlag}
                  alt="Russia Flag"
                  className="h-6 w-8 object-cover rounded shadow-md hover:scale-110 transition-all duration-300 cursor-pointer border border-amber-400/30"
                  onClick={() => changeLanguage('ru')}
                  title="Русский"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 text-amber-400 hover:bg-amber-400/20 rounded-lg transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <div className="flex flex-col space-y-1">
                  <span className="block w-6 h-0.5 bg-current"></span>
                  <span className="block w-6 h-0.5 bg-current"></span>
                  <span className="block w-6 h-0.5 bg-current"></span>
                </div>
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
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden mt-4 bg-black/90 backdrop-blur-md rounded-lg overflow-hidden border border-amber-400/20"
              >
                <div className="py-2">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleTabClick(tab.id, tab.ref)}
                      className={`w-full flex items-center space-x-3 px-4 py-4 transition-all duration-200 border-b border-amber-400/10 last:border-b-0 ${
                        activeTab === tab.id
                          ? "bg-amber-400 text-black"
                          : "text-amber-100 hover:bg-amber-400/20 hover:text-amber-400"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium text-left">{tab.label}</span>
                    </motion.button>
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
        <section ref={homeRef} id="home" className="min-h-screen">
          <AccueilUsine />
        </section>

        {/* Activities Section */}
        <section ref={activiteRef} id="activite" className="min-h-screen">
          <ActiviteUsine />
        </section>

        {/* Team Section */}
        <section ref={equipeRef} id="equipe" className="min-h-screen">
          <EquipeUsine />
        </section>

        {/* Info Section */}
        <section ref={infoRef} id="info" className="min-h-screen">
          <InfoUsine />
        </section>
      </div>
    </div>
  );
};

export default Usine;
