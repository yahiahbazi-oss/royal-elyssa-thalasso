import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Youtube, Cloud, Menu, X } from "lucide-react";

// Import flag images
import francFlag from "../assets/france.png";
import ukFlag from "../assets/royaume-uni.png";
import russiaFlag from "../assets/russie.png";

// Import logo
import royalElyssaLogo from "../assets/logo3.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [weather, setWeather] = useState({ temp: "22°C", condition: "Sunny" });
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  // Handle advanced scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 50);

      // Check if we're on mobile (768px and below)
      const isMobile = window.innerWidth <= 768;

      // Advanced visibility logic - only hide on desktop
      if (isMobile) {
        // On mobile, always keep header visible
        setIsVisible(true);
      } else {
        // Desktop behavior - hide/show based on scroll
        if (currentScrollY <= 50) {
          // At top of page - always show
          setIsVisible(true);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show navbar
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and past 100px - hide navbar
          setIsVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Mock weather data - in real app, fetch from weather API
  useEffect(() => {
    // Simulate weather fetch for Skanes Monastir
    const fetchWeather = () => {
      setWeather({ temp: "24°C", condition: "Sunny" });
    };
    fetchWeather();
  }, []);

  const languages = [
    { code: "fr", name: t("header.language.french"), flag: "🇫🇷" },
    { code: "en", name: t("header.language.english"), flag: "🇺🇸" },
    { code: "ru", name: t("header.language.russian"), flag: "🇷🇺" },
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setShowLanguages(false);
  };

  const getCurrentLanguage = () => {
    const currentLang = i18n.language;
    const language = languages.find((lang) => lang.code === currentLang);
    return language || languages[0]; // Default to French if not found
  };

  const socialLinks = {
    facebook: "https://www.facebook.com/ElyssaThalassoSpaMonastir",
    instagram: "https://www.instagram.com/thalassahotels/",
    youtube: "https://www.youtube.com/@ThalassaHotelsTunisie",
  };

  // Function to handle navigation to ERIC ZEMMOUR page
  const handleEricZemmourClick = () => {
    navigate("/erich-zemmour");
  };

  // Function to handle navigation to L'USINE page
  const handleUsineClick = () => {
    navigate("/usine");
  };

  // Function to handle navigation to specific USINE sections
  const handleUsineSectionClick = (section) => {
    navigate("/usine");

    // Petit délai pour s'assurer que la page est chargée avant de faire défiler
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      {/* Fixed Flag Container - Clean & Minimal Design */}
      <div className="fixed top-2 right-6 z-[9999] flex items-center space-x-1.5 transition-all duration-300">
        <img
          src={francFlag}
          alt="Français"
          className="h-4 w-5 object-cover rounded-sm hover:scale-110 transition-all duration-200 cursor-pointer opacity-80 hover:opacity-100 shadow-sm hover:shadow-md"
          onClick={() => changeLanguage("fr")}
          title="Français"
        />
        <img
          src={ukFlag}
          alt="English"
          className="h-4 w-5 object-cover rounded-sm hover:scale-110 transition-all duration-200 cursor-pointer opacity-80 hover:opacity-100 shadow-sm hover:shadow-md"
          onClick={() => changeLanguage("en")}
          title="English"
        />
        <img
          src={russiaFlag}
          alt="Русский"
          className="h-4 w-5 object-cover rounded-sm hover:scale-110 transition-all duration-200 cursor-pointer opacity-80 hover:opacity-100 shadow-sm hover:shadow-md"
          onClick={() => changeLanguage("ru")}
          title="Русский"
        />
      </div>

      {/* Luxury fonts styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.comcss2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');
          
          .luxury-font-serif {
            font-family: 'Playfair Display', serif;
          }
          
          .luxury-font-sans {
            font-family: 'Montserrat', sans-serif;
          }
          
          .text-shadow-luxury {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }
          
          .backdrop-blur-luxury {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }

          /* Gold Text Styling - Same as Royal Elyssa in WhyChoose */
          .gold-text-24k {
            font-weight: 500; /* Medium weight like WhyChoose */
            color: transparent;
            background: linear-gradient(135deg, #fcd34d 0%, #fef08a 50%, #fcd34d 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(252, 211, 77, 0.5);
            filter: drop-shadow(0 2px 4px rgba(252, 211, 77, 0.3));
            transition: all 0.3s ease;
          }

          .gold-text-24k:hover {
            background: linear-gradient(135deg, #fef08a 0%, #fcd34d 50%, #fef08a 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 40px rgba(252, 211, 77, 0.7);
            transform: scale(1.02);
          }

          .gold-text-active-24k {
            font-weight: 500;
            color: transparent;
            background: linear-gradient(135deg, #fcd34d 0%, #fef08a 50%, #fcd34d 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 35px rgba(252, 211, 77, 0.6);
            filter: drop-shadow(0 3px 6px rgba(252, 211, 77, 0.4));
          }

        `,
        }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Top Navbar - Fully transparent at top */}
        <div
          className="py-2 px-4 md:px-6 transition-all duration-500"
          style={{
            backgroundColor: isScrolled
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(255, 255, 255, 0)",
            backdropFilter: isScrolled ? "blur(12px)" : "none",
            boxShadow: isScrolled ? "0 2px 20px rgba(0, 0, 0, 0.1)" : "none",
          }}
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            {/* Left side - Social Media */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 hover:scale-110 ${
                  isScrolled
                    ? "text-blue-500 hover:text-blue-700"
                    : "text-gray-200 hover:text-blue-200 text-shadow-luxury"
                }`}
              >
                <Facebook size={18} className="md:w-5 md:h-5" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 hover:scale-110 ${
                  isScrolled
                    ? "text-pink-500 hover:text-pink-700"
                    : "text-gray-200 hover:text-pink-200 text-shadow-luxury"
                }`}
              >
                <Instagram size={18} className="md:w-5 md:h-5" />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 hover:scale-110 ${
                  isScrolled
                    ? "text-red-600 hover:text-red-800"
                    : "text-white hover:text-red-300 text-shadow-luxury"
                }`}
              >
                <Youtube size={18} className="md:w-5 md:h-5" />
              </a>
            </div>

            {/* Right side - Links, Language */}
            <div className="flex items-center space-x-2 md:space-x-6 text-xs md:text-sm">
              {/* Navigation Links - Hidden on small screens */}
              <div
                className={`hidden lg:flex items-center space-x-4 luxury-font-sans font-medium tracking-wide ${
                  isScrolled ? "text-gray-700" : "text-white text-shadow-luxury"
                }`}
              >
                <a
                  href="#"
                  className="hover:text-amber-600 transition-all duration-300 hover:scale-105"
                >
                  {t("header.topNav.press")}
                </a>
                <a
                  href="#"
                  className="hover:text-amber-600 transition-all duration-300 hover:scale-105"
                >
                  | {t("header.topNav.offers")}
                </a>
                {i18n.language !== "ru" && (
                  <>
                    <span
                      className={
                        isScrolled ? "text-gray-300" : "text-white opacity-60"
                      }
                    >
                      |
                    </span>
                    <Link
                      to="/"
                      onClick={(e) => {
                        e.preventDefault();
                        const contactSection = document.getElementById("contact");
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" });
                        } else {
                          // If not on home page, navigate to home then scroll
                          window.location.href = "/#contact";
                        }
                      }}
                      className="hover:text-amber-600 transition-all duration-300 hover:scale-105"
                    >
                      {t("header.topNav.contact")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar - Fully transparent at top */}
        <nav
          className="transition-all duration-500 py-3 md:py-4 px-4 md:px-6"
          style={{
            backgroundColor: isScrolled
              ? "rgba(0, 0, 0, 0.85)"
              : "rgba(0, 0, 0, 0)",
            backdropFilter: isScrolled ? "blur(15px)" : "none",
            boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.2)" : "none",
          }}
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            {/* Empty div for balance on mobile - keeps logo centered */}
            <div className="md:hidden w-6"></div>

            {/* Logo - Centered on mobile, original position on desktop */}
            <div className="flex items-center flex-grow justify-center md:flex-grow-0">
              <Link to="/">
                <img
                  src={royalElyssaLogo}
                  alt="Royal Elyssa Logo"
                  className="h-24 md:h-20 lg:h-24 w-auto transition-all duration-300 hover:scale-105"
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-3 rounded-xl transition-all duration-500 group overflow-hidden border border-amber-400/30"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)",
                  backdropFilter: "blur(10px)",
                  boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.3)";
                }}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-yellow-300/5 to-amber-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon with golden styling */}
                <div
                  className="relative z-10 transition-all duration-300"
                  style={{
                    color: "#ffd700",
                    filter:
                      "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 215, 0, 0.4))",
                  }}
                >
                  {isMobileMenuOpen ? (
                    <X
                      size={24}
                      className="transform rotate-0 group-hover:rotate-90 transition-transform duration-300"
                    />
                  ) : (
                    <Menu
                      size={24}
                      className="transform group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>

                {/* Sparkle effects */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-100"></div>
              </button>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {/* THALION */}
              <Link
                to="/thalion"
                className="flex items-center space-x-1 text-white hover:text-stone-300 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`luxury-font-serif font-semibold tracking-wide text-shadow-luxury gold-text-24k ${
                      i18n.language === "ru"
                        ? "text-xs lg:text-base"
                        : "text-sm lg:text-lg"
                    }`}
                  >
                    {t("header.navigation.thalion.title")}
                  </span>
                  <span
                    className={`text-stone-300 hidden lg:block luxury-font-sans font-light italic tracking-wider ${
                      i18n.language === "ru" ? "text-xs" : "text-xs"
                    }`}
                  >
                    {t("header.navigation.thalion.subtitle")}
                  </span>
                </div>
              </Link>

              {/* ERIC ZEMMOUR */}
              <div
                onClick={handleEricZemmourClick}
                className="flex items-center space-x-1 text-white hover:text-stone-300 transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`luxury-font-serif font-semibold tracking-wide text-shadow-luxury gold-text-24k ${
                      i18n.language === "ru"
                        ? "text-xs lg:text-base"
                        : "text-sm lg:text-lg"
                    }`}
                  >
                    {t("header.navigation.erichZemmour.title")}
                  </span>
                  <span
                    className={`text-stone-300 hidden lg:block luxury-font-sans font-light italic tracking-wider ${
                      i18n.language === "ru" ? "text-xs" : "text-xs"
                    }`}
                  >
                    {t("header.navigation.erichZemmour.subtitle")}
                  </span>
                </div>
              </div>

              {/* L'USINE */}
              <div
                onClick={handleUsineClick}
                className="flex items-center space-x-1 text-white hover:text-stone-300 transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`luxury-font-serif font-semibold tracking-wide text-shadow-luxury gold-text-24k ${
                      i18n.language === "ru"
                        ? "text-xs lg:text-base"
                        : "text-sm lg:text-lg"
                    }`}
                  >
                    {t("header.navigation.usine.title")}
                  </span>
                  <span
                    className={`text-stone-300 hidden lg:block luxury-font-sans font-light italic tracking-wider ${
                      i18n.language === "ru" ? "text-xs" : "text-xs"
                    }`}
                  >
                    {t("header.navigation.usine.subtitle")}
                  </span>
                </div>
              </div>

              {/* CARRÉ VIP SPA */}
              <Link
                to="/Suite"
                className="flex items-center space-x-1 text-white hover:text-stone-300 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`luxury-font-serif font-semibold tracking-wide text-shadow-luxury gold-text-24k ${
                      i18n.language === "ru"
                        ? "text-xs lg:text-base"
                        : "text-sm lg:text-lg"
                    }`}
                  >
                    {t("header.navigation.carreVip.title")}
                  </span>
                  <span
                    className={`text-stone-300 hidden lg:block luxury-font-sans font-light italic tracking-wider ${
                      i18n.language === "ru" ? "text-xs" : "text-xs"
                    }`}
                  >
                    {t("header.navigation.carreVip.subtitle")}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div
              className="md:hidden mt-6 mx-4 rounded-3xl shadow-2xl overflow-hidden border border-amber-300/20 relative"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 15, 15, 0.98) 50%, rgba(0, 0, 0, 0.95) 100%)",
                backdropFilter: "blur(30px) saturate(180%)",
                boxShadow: `
                  0 25px 50px rgba(0, 0, 0, 0.5),
                  0 0 30px rgba(255, 215, 0, 0.1),
                  inset 0 1px 0 rgba(255, 215, 0, 0.1),
                  inset 0 -1px 0 rgba(255, 215, 0, 0.05)
                `,
              }}
            >
              {/* Luxury background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #FFD700 1px, transparent 1px), 
                                   radial-gradient(circle at 75% 75%, #FFA500 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                ></div>
              </div>

              {/* Top golden border accent */}
              <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

              <div className="py-6 relative z-10">
                {/* Mobile Navigation Items */}
                <div className="px-8 py-4 border-b border-amber-500/20 hover:bg-amber-500/5 transition-all duration-300 group">
                  <Link
                    to="/thalion"
                    className="flex justify-between items-center w-full text-left transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div>
                      <div
                        className={`font-semibold luxury-font-serif text-amber-100 group-hover:text-amber-300 ${
                          i18n.language === "ru" ? "text-base" : "text-lg"
                        }`}
                      >
                        {t("header.navigation.thalion.title")}
                      </div>
                      <div
                        className={`text-amber-200/80 luxury-font-sans font-light italic mt-1 ${
                          i18n.language === "ru" ? "text-xs" : "text-sm"
                        }`}
                      >
                        {t("header.navigation.thalion.subtitle")}
                      </div>
                    </div>
                    <div className="ml-4 p-2 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>

                <div className="px-8 py-4 border-b border-amber-500/20 hover:bg-amber-500/5 transition-all duration-300 group">
                  <div
                    onClick={() => {
                      handleEricZemmourClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex justify-between items-center w-full text-left cursor-pointer transition-all duration-300"
                  >
                    <div>
                      <div
                        className={`font-semibold luxury-font-serif text-amber-100 group-hover:text-amber-300 ${
                          i18n.language === "ru" ? "text-base" : "text-lg"
                        }`}
                      >
                        {t("header.navigation.erichZemmour.title")}
                      </div>
                      <div
                        className={`text-amber-200/80 luxury-font-sans font-light italic mt-1 ${
                          i18n.language === "ru" ? "text-xs" : "text-sm"
                        }`}
                      >
                        {t("header.navigation.erichZemmour.subtitle")}
                      </div>
                    </div>
                    <div className="ml-4 p-2 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-4 border-b border-amber-500/20 hover:bg-amber-500/5 transition-all duration-300 group">
                  <div
                    onClick={() => {
                      handleUsineClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex justify-between items-center w-full text-left cursor-pointer transition-all duration-300"
                  >
                    <div>
                      <div
                        className={`font-semibold luxury-font-serif text-amber-100 group-hover:text-amber-300 ${
                          i18n.language === "ru" ? "text-base" : "text-lg"
                        }`}
                      >
                        {t("header.navigation.usine.title")}
                      </div>
                      <div
                        className={`text-amber-200/80 luxury-font-sans font-light italic mt-1 ${
                          i18n.language === "ru" ? "text-xs" : "text-sm"
                        }`}
                      >
                        {t("header.navigation.usine.subtitle")}
                      </div>
                    </div>
                    <div className="ml-4 p-2 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-4 border-b border-amber-500/20 hover:bg-amber-500/5 transition-all duration-300 group">
                  <Link
                    to="/Suite"
                    className="flex justify-between items-center w-full text-left transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div>
                      <div
                        className={`font-semibold luxury-font-serif text-amber-100 group-hover:text-amber-300 ${
                          i18n.language === "ru" ? "text-base" : "text-lg"
                        }`}
                      >
                        {t("header.navigation.carreVip.title")}
                      </div>
                      <div
                        className={`text-amber-200/80 luxury-font-sans font-light italic mt-1 ${
                          i18n.language === "ru" ? "text-xs" : "text-sm"
                        }`}
                      >
                        {t("header.navigation.carreVip.subtitle")}
                      </div>
                    </div>
                    <div className="ml-4 p-2 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>

                {/* Mobile Top Nav Links */}
                <div className="mt-8 pt-6 px-8 space-y-2 border-t border-amber-500/20">
                  <div className="text-xs uppercase tracking-wider text-amber-400/80 font-semibold mb-4 luxury-font-sans">
                    Services
                  </div>

                  <a
                    href="#"
                    className="flex items-center text-amber-100 hover:text-amber-300 transition-all duration-300 luxury-font-sans text-base py-3 px-4 rounded-xl hover:bg-amber-500/10 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="mr-3 p-1.5 rounded-lg bg-amber-400/10 group-hover:bg-amber-400/20 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                    {t("header.topNav.press")}
                  </a>

                  <a
                    href="#"
                    className="flex items-center text-amber-100 hover:text-amber-300 transition-all duration-300 luxury-font-sans text-base py-3 px-4 rounded-xl hover:bg-amber-500/10 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="mr-3 p-1.5 rounded-lg bg-amber-400/10 group-hover:bg-amber-400/20 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                        />
                      </svg>
                    </div>
                    {t("header.topNav.offers")}
                  </a>

                  {i18n.language !== "ru" && (
                    <Link
                      to="/"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        const contactSection = document.getElementById("contact");
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" });
                        } else {
                          // If not on home page, navigate to home then scroll
                          window.location.href = "/#contact";
                        }
                      }}
                      className="flex items-center text-amber-100 hover:text-amber-300 transition-all duration-300 luxury-font-sans text-base py-3 px-4 rounded-xl hover:bg-amber-500/10 group"
                    >
                      <div className="mr-3 p-1.5 rounded-lg bg-amber-400/10 group-hover:bg-amber-400/20 transition-all duration-300">
                        <svg
                          className="w-4 h-4 text-amber-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      {t("header.topNav.contact")}
                    </Link>
                  )}
                </div>

                {/* Bottom decorative border */}
                <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
