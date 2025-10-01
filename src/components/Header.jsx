import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  Cloud,
  Menu,
  X,
} from "lucide-react";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [weather, setWeather] = useState({ temp: "22°C", condition: "Sunny" });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  // Handle advanced scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 50);

      // Advanced visibility logic
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

  const dropdownMenus = {
    thalion: [
      { label: t("header.navigation.thalion.brochure"), link: "#" },
      { label: t("header.navigation.thalion.pricing"), link: "#" },
      { label: t("header.navigation.thalion.contact"), link: "#" },
    ],
    spa: [{ label: t("header.navigation.spa.contact"), link: "#" }],
    eric: [
      {
        label: t("header.navigation.erichZemmour.brochure"),
        link: "/ErichZemmour",
      },
      {
        label: t("header.navigation.erichZemmour.salon"),
        link: "/ErichZemmour",
      },
    ],
    usine: [
      {
        label: t("header.navigation.usine.activities"),
        link: "/usine#activites",
      },
      { label: t("header.navigation.usine.team"), link: "/usine#equipe" },
      { label: t("header.navigation.usine.schedule"), link: "/usine#planning" },
      { label: t("header.navigation.usine.info"), link: "/usine#infos" },
    ],
    caree: [
      { label: t("header.navigation.carreVip.presentation"), link: "/Suite" },
    ],
  };

  const handleMouseEnter = (menu) => {
    if (window.innerWidth >= 768) {
      setActiveDropdown(menu);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setActiveDropdown(null);
    }
  };

  const toggleMobileDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
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

          .dropdown-container {
            position: relative;
          }

          .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 8px;
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.90) 50%, rgba(51, 65, 85, 0.85) 100%);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 16px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            padding: 12px 0;
            min-width: 220px;
            z-index: 1000;
            backdrop-filter: blur(25px) saturate(180%);
            -webkit-backdrop-filter: blur(25px) saturate(180%);
            transform: translateY(-8px) scale(0.95);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .dropdown-container:hover .dropdown-menu,
          .dropdown-menu:hover {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
          }

          .dropdown-item {
            display: block;
            padding: 14px 24px;
            color: #e2e8f0;
            text-decoration: none;
            transition: all 0.3s ease;
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
            font-size: 14px;
            letter-spacing: 0.5px;
            border-left: 2px solid transparent;
            position: relative;
            overflow: hidden;
          }

          .dropdown-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .dropdown-item:hover::before {
            transform: translateX(0);
          }

          .dropdown-item:hover {
            color: #fbbf24;
            border-left-color: #f59e0b;
            transform: translateX(6px);
            background: rgba(251, 191, 36, 0.08);
            font-weight: 500;
          }

          /* Right-aligned dropdown for last item */
          .dropdown-right {
            right: 0;
            left: auto;
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
                    ? "text-blue-600 hover:text-blue-800"
                    : "text-white hover:text-blue-300 text-shadow-luxury"
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
                    ? "text-pink-600 hover:text-pink-800"
                    : "text-white hover:text-pink-300 text-shadow-luxury"
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
                <span
                  className={
                    isScrolled ? "text-gray-300" : "text-white opacity-60"
                  }
                >
                  |
                </span>
                <Link
                  to="/contact"
                  className="hover:text-amber-600 transition-all duration-300 hover:scale-105"
                >
                  {t("header.topNav.contact")}
                </Link>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguages(!showLanguages)}
                  className={`flex items-center space-x-1 md:space-x-2 transition-all duration-300 hover:scale-105 luxury-font-sans font-medium ${
                    isScrolled
                      ? "text-gray-700 hover:text-amber-600"
                      : "text-white hover:text-amber-300 text-shadow-luxury"
                  }`}
                >
                  <span className="hidden sm:inline">
                    {getCurrentLanguage().flag} {getCurrentLanguage().name}
                  </span>
                  <span className="sm:hidden">{getCurrentLanguage().flag}</span>
                  <ChevronDown
                    size={12}
                    className={`transform transition-transform md:w-4 md:h-4 ${
                      showLanguages ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showLanguages && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl py-2 min-w-32 z-50 backdrop-blur-luxury">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-amber-50 transition-all duration-300 text-sm luxury-font-sans"
                        onClick={() => changeLanguage(lang.code)}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
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
                  src="/src/assets/logo3.png"
                  alt="Royal Elyssa Logo"
                  className="h-24 md:h-20 lg:h-24 w-auto transition-all duration-300 hover:scale-105"
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-amber-300 transition-all duration-300 hover:scale-110"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {/* THALION */}
              <div className="dropdown-container">
                <Link
                  to="/thalion"
                  className="flex items-center space-x-1 text-white hover:text-amber-300 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex flex-col items-center">
                    <span className="luxury-font-serif font-semibold text-sm lg:text-lg tracking-wide text-shadow-luxury">
                      {t("header.navigation.thalion.title")}
                    </span>
                    <span className="text-xs text-amber-200 hidden lg:block luxury-font-sans font-light italic tracking-wider">
                      {t("header.navigation.thalion.subtitle")}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-amber-200 group-hover:text-amber-300 transition-colors"
                  />
                </Link>

                <div className="dropdown-menu">
                  {dropdownMenus.thalion.map((item, index) => (
                    <Link key={index} to={item.link} className="dropdown-item">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* SPA */}

              {/* ERIC ZEMMOUR - Made clickable */}
              <div className="dropdown-container">
                <div
                  onClick={handleEricZemmourClick}
                  className="flex items-center space-x-1 text-white hover:text-amber-300 transition-all duration-300 hover:scale-105 group cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    <span className="luxury-font-serif font-semibold text-sm lg:text-lg tracking-wide text-shadow-luxury">
                      {t("header.navigation.erichZemmour.title")}
                    </span>
                    <span className="text-xs text-amber-200 hidden lg:block luxury-font-sans font-light italic tracking-wider">
                      {t("header.navigation.erichZemmour.subtitle")}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-amber-200 group-hover:text-amber-300 transition-colors"
                  />
                </div>

                <div className="dropdown-menu">
                  {dropdownMenus.eric.map((item, index) => (
                    <a key={index} href={item.link} className="dropdown-item">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* L'USINE - Made clickable */}
              <div className="dropdown-container">
                <div
                  onClick={handleUsineClick}
                  className="flex items-center space-x-1 text-white hover:text-amber-300 transition-all duration-300 hover:scale-105 group cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    <span className="luxury-font-serif font-semibold text-sm lg:text-lg tracking-wide text-shadow-luxury">
                      {t("header.navigation.usine.title")}
                    </span>
                    <span className="text-xs text-amber-200 hidden lg:block luxury-font-sans font-light italic tracking-wider">
                      {t("header.navigation.usine.subtitle")}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-amber-200 group-hover:text-amber-300 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Prevent dropdown from opening on chevron click
                    }}
                  />
                </div>

                <div className="dropdown-menu">
                  {dropdownMenus.usine.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (item.link.includes("#")) {
                          const section = item.link.split("#")[1];
                          handleUsineSectionClick(section);
                        } else {
                          navigate(item.link);
                        }
                      }}
                      className="dropdown-item cursor-pointer"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* CARRÉ VIP SPA */}
              <div className="dropdown-container">
                <button className="flex items-center space-x-1 text-white hover:text-amber-300 transition-all duration-300 hover:scale-105 group">
                  <div className="flex flex-col items-center">
                    <span className="luxury-font-serif font-semibold text-sm lg:text-lg tracking-wide text-shadow-luxury">
                      {t("header.navigation.carreVip.title")}
                    </span>
                    <span className="text-xs text-amber-200 hidden lg:block luxury-font-sans font-light italic tracking-wider">
                      {t("header.navigation.carreVip.subtitle")}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-amber-200 group-hover:text-amber-300 transition-colors"
                  />
                </button>

                <div className="dropdown-menu dropdown-right">
                  {dropdownMenus.caree.map((item, index) => (
                    <a key={index} href={item.link} className="dropdown-item">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div
              className="md:hidden mt-4 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(51, 65, 85, 0.90) 100%)",
                backdropFilter: "blur(25px) saturate(180%)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                boxShadow:
                  "0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="py-4">
                {/* Mobile Navigation Items */}
                <div className="px-6 py-3 border-b border-slate-600/30">
                  <button
                    onClick={() => toggleMobileDropdown("thalion")}
                    className="flex justify-between items-center w-full text-left text-slate-100 hover:text-amber-300 transition-all duration-300 luxury-font-serif"
                  >
                    <div>
                      <div className="font-semibold text-lg">
                        {t("header.navigation.thalion.title")}
                      </div>
                      <div className="text-xs text-amber-200 luxury-font-sans font-light italic">
                        {t("header.navigation.thalion.subtitle")}
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform text-amber-200 ${
                        activeDropdown === "thalion" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "thalion" && (
                    <div className="mt-3 pl-4 space-y-2">
                      {dropdownMenus.thalion.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          className="block text-slate-300 hover:text-amber-300 transition-all duration-300 luxury-font-sans py-2 px-3 rounded-lg hover:bg-amber-500/10 border-l-2 border-transparent hover:border-amber-400"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-6 py-3 border-b border-sale-600/30">
                  <button
                    onClick={() => toggleMobileDropdown("spa")}
                    className="flex justify-between items-center w-full text-left text-slate-100 hover:text-amber-300 transition-all duration-300 font-semibold luxury-font-serif text-lg"
                  >
                    {t("header.navigation.spa.title")}
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform text-amber-200 ${
                        activeDropdown === "spa" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "spa" && (
                    <div className="mt-3 pl-4 space-y-2">
                      {dropdownMenus.spa.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          className="block text-slate-300 hover:text-amber-300 transition-all duration-300 luxury-font-sans py-2 px-3 rounded-lg hover:bg-amber-500/10 border-l-2 border-transparent hover:border-amber-400"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-6 py-3 border-b border-slate-600/30">
                  <div
                    onClick={handleEricZemmourClick}
                    className="flex justify-between items-center w-full text-left text-slate-100 hover:text-amber-300 transition-all duration-300 luxury-font-serif cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-lg">
                        {t("header.navigation.erichZemmour.title")}
                      </div>
                      <div className="text-xs text-amber-200 luxury-font-sans font-light italic">
                        {t("header.navigation.erichZemmour.subtitle")}
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform text-amber-200 ${
                        activeDropdown === "eric" ? "rotate-180" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMobileDropdown("eric");
                      }}
                    />
                  </div>
                  {activeDropdown === "eric" && (
                    <div className="mt-3 pl-4 space-y-2">
                      {dropdownMenus.eric.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          className="block text-slate-300 hover:text-amber-300 transition-all duration-300 luxury-font-sans py-2 px-3 rounded-lg hover:bg-amber-500/10 border-l-2 border-transparent hover:border-amber-400"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-6 py-3 border-b border-slate-600/30">
                  <div
                    onClick={handleUsineClick}
                    className="flex justify-between items-center w-full text-left text-slate-100 hover:text-amber-300 transition-all duration-300 luxury-font-serif cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-lg">
                        {t("header.navigation.usine.title")}
                      </div>
                      <div className="text-xs text-amber-200 luxury-font-sans font-light italic">
                        {t("header.navigation.usine.subtitle")}
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform text-amber-200 ${
                        activeDropdown === "usine" ? "rotate-180" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMobileDropdown("usine");
                      }}
                    />
                  </div>
                  {activeDropdown === "usine" && (
                    <div className="mt-3 pl-4 space-y-2">
                      {dropdownMenus.usine.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            if (item.link.includes("#")) {
                              const section = item.link.split("#")[1];
                              handleUsineSectionClick(section);
                            } else {
                              navigate(item.link);
                            }
                          }}
                          className="block text-slate-300 hover:text-amber-300 transition-all duration-300 luxury-font-sans py-2 px-3 rounded-lg hover:bg-amber-500/10 border-l-2 border-transparent hover:border-amber-400 cursor-pointer"
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-6 py-3 border-b border-slate-600/30">
                  <button
                    onClick={() => toggleMobileDropdown("caree")}
                    className="flex justify-between items-center w-full text-left text-slate-100 hover:text-amber-300 transition-all duration-300 luxury-font-serif"
                  >
                    <div>
                      <div className="font-semibold text-lg">
                        {t("header.navigation.carreVip.title")}
                      </div>
                      <div className="text-xs text-amber-200 luxury-font-sans font-light italic">
                        {t("header.navigation.carreVip.subtitle")}
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform text-amber-200 ${
                        activeDropdown === "caree" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "caree" && (
                    <div className="mt-3 pl-4 space-y-2">
                      {dropdownMenus.caree.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          className="block text-slate-300 hover:text-amber-300 transition-all duration-300 luxury-font-sans py-2 px-3 rounded-lg hover:bg-amber-500/10 border-l-2 border-transparent hover:border-amber-400"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Top Nav Links */}
                <div className="mt-6 pt-4 px-6 space-y-3 border-t border-slate-600/30">
                  <a
                    href="#"
                    className="block text-slate-200 hover:text-amber-300 transition-all duration-300 luxury-font-sans font-medium text-lg py-2 px-3 rounded-lg hover:bg-amber-500/10"
                  >
                    {t("header.topNav.press")}
                  </a>
                  <a
                    href="#"
                    className="hover:text-amber-600 transition-all duration-300 hover:scale-105"
                  >
                    {t("header.topNav.offers")}
                  </a>
                  <span
                    className={
                      isScrolled ? "text-gray-300" : "text-white opacity-60"
                    }
                  >
                    |
                  </span>
                  <Link
                    to="/contact"
                    className="block text-slate-200 hover:text-amber-300 transition-all duration-300 luxury-font-sans font-medium text-lg py-2 px-3 rounded-lg hover:bg-amber-500/10"
                  >
                    {t("header.topNav.contact")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
