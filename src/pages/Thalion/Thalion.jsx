import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrochureThalion from "./BrochureThalion";
import TarifsThalion from "./TarifsThalion";
import SoinsALaCarteNew from "../../components/SoinsALaCarteNew";
import ContactThalion from "./ContactThalion";
import LieuSoins from "./BrochureSections/LieuSoins";
import CoverSection from "./BrochureSections/CoverSection";
import ThemeSection from "./BrochureSections/ThemeSection";
import logoThalion from "../../assets/logo/logo-thalion.png__401x85_q85_crop_subject_location--87,731_subsampling-2_upscale.png";

const Thalion = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("cover");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Consolidated dropdown state
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("cover");
  const [selectedRituel, setSelectedRituel] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("fr"); // Default to French
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const brochureRef = useRef(null);
  const tarifsRef = useRef(null);
  const contactRef = useRef(null);
  const soinsRef = useRef(null);
  const lieuxRef = useRef(null);
  const coverRef = useRef(null);
  const themeRef = useRef(null);
  const dropdownTimeoutRef = useRef(null); // For managing hover delays

  // Dropdown types
  const DROPDOWN_TYPES = {
    ESCALES: "escales",
    RITUELS: "rituels",
    SOINS: "soins",
  };

  // Sections configuration with their refs and offsets
  const sections = [
    { id: "cover", name: "Cover", ref: coverRef, offset: 0 },
    { id: "lieux", name: "Espaces de soins", ref: lieuxRef, offset: 100 },
    { id: "brochure", name: "Les Escales", ref: brochureRef, offset: 100 },
    { id: "tarifs", name: "Rituels Thali", ref: tarifsRef, offset: 100 },
    { id: "soins", name: "Soins à la carte", ref: soinsRef, offset: 100 },
    { id: "contact", name: "Contact", ref: contactRef, offset: 100 },
  ];

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (
          section.ref.current &&
          scrollPosition >= section.ref.current.offsetTop - section.offset
        ) {
          setActiveSection(section.id);
          setActiveTab(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Language options
  const languageOptions = [
    {
      code: "fr",
      name: "Français",
      flag: "🇫🇷",
    },
    {
      code: "en",
      name: "English",
      flag: "🇬🇧",
    },
  ];

  const escalesOptions = [
    { name: t("thalion.escales.vitaliteMarine") },
    { name: t("thalion.escales.detoxSilhouette") },
    { name: t("thalion.escales.relaxationMarine") },
    { name: t("thalion.escales.forMen") },
    { name: t("thalion.escales.afterGolf") },
    { name: t("thalion.escales.arbreDeVie") },
    { name: t("thalion.escales.nouvelAge") },
    { name: t("thalion.escales.ceremoniesSpa") },
    { name: t("thalion.escales.weekendCool") },
  ];

  const rituelsOptions = [
    { name: t("thalion.rituels.orientalDetox"), id: "oriental" },
    { name: t("thalion.rituels.atlantiqueRevitalisant"), id: "atlantique" },
    { name: t("thalion.rituels.asiatiqueApaisant"), id: "asiatique" },
    { name: t("thalion.rituels.polynesienneRelaxante"), id: "polynesienne" },
    { name: t("thalion.rituels.amazonienneEnergisante"), id: "amazonienne" },
  ];

  // Updated soinsOptions array
  const soinsOptions = [
    { name: t("thalion.soins.lesSoinsAlaCarte"), id: "soins-a-la-carte" },
    { name: t("thalion.soins.carteMarine"), id: "carte-marine" },
    { name: t("thalion.soins.carteMassages"), id: "carte-massages" },
  ];

  // Fixed tabs array - updated with rituels dropdown
  const tabs = [
    {
      id: "lieux",
      label: t("thalion.navigation.spacesOfCare"),
      ref: lieuxRef,
    },
    {
      id: "brochure",
      label: t("thalion.navigation.escales"),
      ref: brochureRef,
      hasDropdown: true,
    },
    {
      id: "tarifs",
      label: t("thalion.navigation.rituels"),
      ref: tarifsRef,
      hasDropdown: true,
      isRituels: true,
    },
    {
      id: "soins",
      label: t("thalion.navigation.soinsAlaCarte"),
      ref: soinsRef,
      hasDropdown: true,
      isSoins: true,
    },
    {
      id: "contact",
      label: t("thalion.navigation.contact"),
      ref: contactRef,
    },
  ];

  useEffect(() => {
    if (coverRef.current) {
      window.scrollTo({
        top: coverRef.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  }, []);

  // Optimized dropdown handlers
  const handleDropdownEnter = (dropdownType) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(dropdownType);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to prevent flickering
  };

  const handleDropdownClick = (dropdownType) => {
    setActiveDropdown(activeDropdown === dropdownType ? null : dropdownType);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any dropdown area
      const dropdownElements = document.querySelectorAll("[data-dropdown]");
      const languageDropdown = document.querySelector(
        "[data-language-dropdown]"
      );

      const isInsideDropdown = Array.from(dropdownElements).some((element) =>
        element.contains(event.target)
      );

      const isInsideLanguageDropdown =
        languageDropdown && languageDropdown.contains(event.target);

      if (!isInsideDropdown) {
        setActiveDropdown(null);
      }

      if (!isInsideLanguageDropdown) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
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

  const scrollToSection = (sectionName) => {
    const brochureComponent = brochureRef.current;
    if (brochureComponent) {
      scrollToRef(brochureRef);

      setTimeout(() => {
        let targetElement = null;

        switch (sectionName) {
          case "Vitalité Marine":
            targetElement =
              document.querySelector('[data-section="vitalite-marine"]') ||
              document.querySelector(".vitalite-marine-section") ||
              document.getElementById("vitalite-marine");
            break;
          case "Week-end Cool":
            targetElement =
              document.querySelector('[data-section="weekend-cool"]') ||
              document.querySelector(".weekend-cool-section") ||
              document.getElementById("weekend-cool");
            break;
          case "Détox Silhouette":
            targetElement =
              document.querySelector('[data-section="detox-silhouette"]') ||
              document.querySelector(".detox-silhouette-section");
            break;
          case "Relaxation Marine":
            targetElement =
              document.querySelector('[data-section="relaxation-marine"]') ||
              document.querySelector(".relaxation-marine-section");
            break;
          case "For Men":
            targetElement =
              document.querySelector('[data-section="for-men"]') ||
              document.querySelector(".for-men-section");
            break;
          case "After Golf":
            targetElement =
              document.querySelector('[data-section="after-golf"]') ||
              document.querySelector(".after-golf-section");
            break;
          case "Arbre de Vie":
            targetElement =
              document.querySelector('[data-section="arbre-vie"]') ||
              document.querySelector(".arbre-vie-section");
            break;
          case "Nouvel Age":
            targetElement =
              document.querySelector('[data-section="nouvel-age"]') ||
              document.querySelector(".nouvel-age-section");
            break;
          case "Cérémonies du Spa & Soins de Thalasso":
            targetElement =
              document.querySelector('[data-section="ceremonie-spa"]') ||
              document.querySelector(".ceremonie-spa-section");
            break;
          default:
            break;
        }

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500);
    }
  };

  // Updated scrollToSoinsSection function
  const scrollToSoinsSection = (sectionId) => {
    scrollToRef(soinsRef);

    setTimeout(() => {
      // Map the navbar options to the correct section IDs in SoinsALaCarteNew
      let targetSectionId = null;

      switch (sectionId) {
        case "soins-a-la-carte":
          targetSectionId = "soins-carte";
          break;
        case "carte-marine":
          targetSectionId = "carte-marine";
          break;
        case "carte-massages":
          targetSectionId = "carte-massages";
          break;
        default:
          targetSectionId = sectionId;
          break;
      }

      console.log("Dispatching section change:", targetSectionId); // Debug log

      // Trigger section change in SoinsALaCarteNew component
      const event = new CustomEvent("changeSoinsSection", {
        detail: { sectionId: targetSectionId },
      });
      document.dispatchEvent(event);

      // Also try to find the section element and scroll to it
      const targetElement =
        document.querySelector(`[data-section="${targetSectionId}"]`) ||
        document.getElementById(targetSectionId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    setActiveSection(tab.id);
    if (!tab.hasDropdown) {
      scrollToRef(tab.ref);
    } else {
      scrollToRef(tab.ref);
    }
  };

  const handleEscalesOptionClick = (option) => {
    scrollToSection(option);
    setActiveDropdown(null);
  };

  const handleRituelOptionClick = (rituel) => {
    setSelectedRituel(rituel.id);
    scrollToRef(tarifsRef);
    setActiveDropdown(null);
  };

  const handleSoinsOptionClick = (soin) => {
    scrollToSoinsSection(soin.id);
    setActiveDropdown(null);
  };

  const handleHomeClick = () => {
    window.location.href = "http://localhost:5173/";
  };

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setLanguageDropdownOpen(false);
    // Here you can add language switching logic
    console.log("Language changed to:", languageCode);
  };

  const handleLanguageDropdownToggle = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @keyframes goldShimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .gold-text {
          background: linear-gradient(
            135deg,
            #ffd700 0%,
            #ffed4e 25%,
            #fff5b7 50%,
            #ffed4e 75%,
            #ffd700 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmer 3s ease-in-out infinite;
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
        }

        .gold-text-active {
          background: linear-gradient(
            135deg,
            #fff5b7 0%,
            #ffd700 50%,
            #fff5b7 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmer 1.5s ease-in-out infinite;
          text-shadow: 0 0 40px rgba(255, 215, 0, 0.5);
        }

        .sparkle::before {
          content: "✨";
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 12px;
          animation: sparkle 2s infinite;
          animation-delay: 0s;
        }

        .sparkle::after {
          content: "✨";
          position: absolute;
          bottom: -10px;
          left: -10px;
          font-size: 10px;
          animation: sparkle 2s infinite;
          animation-delay: 1s;
        }

        .navbar-glass {
          backdrop-filter: blur(20px);
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(20, 20, 20, 0.95) 50%,
            rgba(0, 0, 0, 0.9) 100%
          );
          border-bottom: 1px solid rgba(255, 215, 0, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .navbar-scrolled {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.98) 0%,
            rgba(15, 15, 15, 0.99) 50%,
            rgba(0, 0, 0, 0.98) 100%
          );
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        }

        .gold-border {
          border: 1px solid transparent;
          background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))
              padding-box,
            linear-gradient(135deg, #ffd700, #ffed4e, #ffd700) border-box;
        }

        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
          transform: translateY(-1px);
        }

        .mobile-menu-gradient {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.98) 0%,
            rgba(15, 15, 15, 0.95) 100%
          );
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 215, 0, 0.2);
        }

        .nav-tabs-container {
          position: relative;
          display: flex;
        }

        .nav-tab {
          position: relative;
          padding: 1rem 1.25rem;
          transition: all 0.3s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .nav-tab-underline {
          position: relative;
          display: inline-block;
          white-space: nowrap;
        }

        .nav-tab-underline::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ffd700, #ffed4e, #ffd700);
          border-radius: 1px;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
        }

        .nav-tab.active .nav-tab-underline::after {
          width: 100%;
        }

        .golden-underline {
          display: none;
        }

        .moving-underline {
          display: none;
        }
      `}</style>

      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-24 ${
          scrolled ? "navbar-scrolled" : "navbar-glass"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={logoThalion}
                alt="Thalion Brand"
                className="h-10 xl:h-12 w-auto object-contain transition-all duration-300 hover:scale-105"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="nav-tabs-container relative">
                <div className="flex items-center space-x-2">
                  {/* Home Button */}
                  <button
                    onClick={handleHomeClick}
                    className="px-4 py-3 relative overflow-hidden group font-serif text-sm uppercase tracking-wider transition-all duration-300 hover-glow whitespace-nowrap"
                  >
                    <span className="gold-text group-hover:gold-text-active relative sparkle">
                      {t.home}
                    </span>
                  </button>

                  {tabs.map((tab, index) => (
                    <div key={tab.id} className="relative" data-dropdown>
                      <button
                        onClick={() => {
                          handleTabClick(tab);
                          if (tab.hasDropdown) {
                            const dropdownType = tab.isRituels
                              ? DROPDOWN_TYPES.RITUELS
                              : tab.isSoins
                              ? DROPDOWN_TYPES.SOINS
                              : DROPDOWN_TYPES.ESCALES;
                            handleDropdownClick(dropdownType);
                          }
                        }}
                        onMouseEnter={() => {
                          if (tab.hasDropdown) {
                            const dropdownType = tab.isRituels
                              ? DROPDOWN_TYPES.RITUELS
                              : tab.isSoins
                              ? DROPDOWN_TYPES.SOINS
                              : DROPDOWN_TYPES.ESCALES;
                            handleDropdownEnter(dropdownType);
                          }
                        }}
                        onMouseLeave={handleDropdownLeave}
                        className={`px-3 py-3 relative overflow-hidden group font-serif text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 hover-glow nav-tab whitespace-nowrap ${
                          activeSection === tab.id ? "active" : ""
                        }`}
                      >
                        <span
                          className={`nav-tab-underline relative ${
                            activeSection === tab.id
                              ? "gold-text-active sparkle"
                              : "gold-text group-hover:gold-text-active"
                          }`}
                        >
                          {tab.label}
                        </span>
                        {tab.hasDropdown && (
                          <svg
                            className={`w-4 h-4 transition-all duration-300 ${
                              (
                                tab.isRituels
                                  ? activeDropdown === DROPDOWN_TYPES.RITUELS
                                  : tab.isSoins
                                  ? activeDropdown === DROPDOWN_TYPES.SOINS
                                  : activeDropdown === DROPDOWN_TYPES.ESCALES
                              )
                                ? "rotate-180"
                                : "rotate-0"
                            } gold-text flex-shrink-0`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </button>

                      {/* Menu déroulant pour Les Escales */}
                      {tab.hasDropdown &&
                        !tab.isRituels &&
                        !tab.isSoins &&
                        activeDropdown === DROPDOWN_TYPES.ESCALES && (
                          <div
                            className="absolute left-0 mt-2 w-72 rounded-lg shadow-2xl gold-border z-50"
                            onMouseEnter={() =>
                              handleDropdownEnter(DROPDOWN_TYPES.ESCALES)
                            }
                            onMouseLeave={handleDropdownLeave}
                          >
                            <div className="py-2">
                              {escalesOptions.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() =>
                                    handleEscalesOptionClick(option.name)
                                  }
                                  className="block w-full text-left px-6 py-3 text-sm font-serif uppercase tracking-wider transition-all duration-200 hover-glow border-b border-amber-500/10 last:border-b-0"
                                >
                                  <span className="gold-text hover:gold-text-active">
                                    {option.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Menu déroulant pour Rituels Thali */}
                      {tab.isRituels &&
                        activeDropdown === DROPDOWN_TYPES.RITUELS && (
                          <div
                            className="absolute left-0 mt-2 w-72 rounded-lg shadow-2xl gold-border z-50"
                            onMouseEnter={() =>
                              handleDropdownEnter(DROPDOWN_TYPES.RITUELS)
                            }
                            onMouseLeave={handleDropdownLeave}
                          >
                            <div className="py-2">
                              {rituelsOptions.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() =>
                                    handleRituelOptionClick(option)
                                  }
                                  className="block w-full text-left px-6 py-3 text-sm font-serif uppercase tracking-wider transition-all duration-200 hover-glow border-b border-amber-500/10 last:border-b-0"
                                >
                                  <span className="gold-text hover:gold-text-active">
                                    {option.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Updated Menu déroulant pour Soins à la carte */}
                      {tab.isSoins &&
                        activeDropdown === DROPDOWN_TYPES.SOINS && (
                          <div
                            className="absolute left-0 mt-2 w-96 rounded-lg shadow-2xl gold-border z-50"
                            onMouseEnter={() =>
                              handleDropdownEnter(DROPDOWN_TYPES.SOINS)
                            }
                            onMouseLeave={handleDropdownLeave}
                          >
                            {/* Title section */}
                            <div className="px-6 py-4 border-b border-amber-500/20">
                              <h3 className="font-serif text-lg uppercase tracking-wider gold-text font-semibold">
                                {t.nosServicesTitle}
                              </h3>
                              <p className="text-sm text-amber-100/80 mt-2 leading-relaxed">
                                {t.nosServicesDesc}
                              </p>
                              <p className="text-sm text-amber-200/90 mt-2 font-medium italic">
                                {t.nosServicesTagline}
                              </p>
                            </div>

                            {/* Options section */}
                            <div className="py-2">
                              {soinsOptions.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSoinsOptionClick(option)}
                                  className="block w-full text-left px-6 py-3 text-sm font-serif uppercase tracking-wider transition-all duration-200 hover-glow border-b border-amber-500/10 last:border-b-0"
                                >
                                  <span className="gold-text hover:gold-text-active flex items-center">
                                    <span className="mr-2 text-amber-400">
                                      {index + 1}.
                                    </span>
                                    {option.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 transition-all duration-300 hover-glow"
              >
                <svg
                  className="h-8 w-8 gold-text"
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

            {/* Language Selector - Desktop & Mobile */}
            <div className="hidden items-center ml-4">
              <div className="relative" data-language-dropdown>
                <button
                  onClick={handleLanguageDropdownToggle}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/30 bg-black/20 hover:bg-amber-500/10 transition-all duration-300 hover-glow"
                >
                  <span className="text-lg">
                    {
                      languageOptions.find(
                        (lang) => lang.code === selectedLanguage
                      )?.flag
                    }
                  </span>
                  <span className="gold-text font-serif text-sm uppercase tracking-wider hidden sm:block">
                    {
                      languageOptions.find(
                        (lang) => lang.code === selectedLanguage
                      )?.name
                    }
                  </span>
                  <svg
                    className={`w-4 h-4 gold-text transition-transform duration-300 ${
                      languageDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Language Dropdown */}
                {languageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-2xl gold-border z-50 overflow-hidden">
                    <div className="py-2">
                      {languageOptions.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageSelect(language.code)}
                          className={`block w-full text-left px-4 py-3 text-sm font-serif transition-all duration-200 hover-glow flex items-center gap-3 ${
                            selectedLanguage === language.code
                              ? "bg-amber-500/20 gold-text-active"
                              : "gold-text hover:bg-amber-500/10"
                          }`}
                        >
                          <span className="text-lg">{language.flag}</span>
                          <span className="uppercase tracking-wider">
                            {language.name}
                          </span>
                          {selectedLanguage === language.code && (
                            <svg
                              className="w-4 h-4 ml-auto gold-text-active"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mobile-menu-gradient">
            <div className="px-6 py-4 space-y-2">
              {/* Home button in mobile menu */}
              <button
                onClick={handleHomeClick}
                className="block w-full text-left py-4 px-4 font-serif uppercase tracking-wider transition-all duration-300 hover-glow rounded-lg"
              >
                <span className="gold-text">{t.home}</span>
              </button>

              {tabs.map((tab) => (
                <div key={tab.id}>
                  <button
                    onClick={() => {
                      if (tab.id === "brochure") {
                        scrollToRef(brochureRef);
                        setMobileMenuOpen(false);
                      } else if (tab.isRituels) {
                        const newState =
                          activeDropdown === DROPDOWN_TYPES.RITUELS
                            ? null
                            : DROPDOWN_TYPES.RITUELS;
                        setActiveDropdown(newState);
                      } else if (tab.isSoins) {
                        const newState =
                          activeDropdown === DROPDOWN_TYPES.SOINS
                            ? null
                            : DROPDOWN_TYPES.SOINS;
                        setActiveDropdown(newState);
                      } else {
                        handleTabClick(tab);
                        if (tab.hasDropdown && !tab.isRituels && !tab.isSoins) {
                          const newState =
                            activeDropdown === DROPDOWN_TYPES.ESCALES
                              ? null
                              : DROPDOWN_TYPES.ESCALES;
                          setActiveDropdown(newState);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }
                    }}
                    className={`flex items-center justify-between w-full text-left py-4 px-4 font-serif uppercase tracking-wider transition-all duration-300 hover-glow rounded-lg ${
                      activeSection === tab.id ? "bg-amber-500/10" : ""
                    }`}
                  >
                    <span
                      className={`nav-tab-underline ${
                        activeSection === tab.id
                          ? "gold-text-active"
                          : "gold-text"
                      }`}
                    >
                      {tab.label}
                    </span>
                    {tab.hasDropdown && (
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 gold-text ${
                          (
                            tab.isRituels
                              ? activeDropdown === DROPDOWN_TYPES.RITUELS
                              : tab.isSoins
                              ? activeDropdown === DROPDOWN_TYPES.SOINS
                              : activeDropdown === DROPDOWN_TYPES.ESCALES
                          )
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Mobile Escales dropdown */}
                  {tab.hasDropdown &&
                    !tab.isRituels &&
                    !tab.isSoins &&
                    activeDropdown === DROPDOWN_TYPES.ESCALES && (
                      <div className="pl-6 py-2 space-y-1">
                        {escalesOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              handleEscalesOptionClick(option.name);
                              setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left py-3 px-4 text-sm font-serif uppercase tracking-wider transition-all duration-200 hover-glow rounded-lg"
                          >
                            <span className="gold-text hover:gold-text-active">
                              {option.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Mobile Rituels dropdown */}
                  {tab.isRituels &&
                    activeDropdown === DROPDOWN_TYPES.RITUELS && (
                      <div className="pl-6 py-2 space-y-1">
                        {rituelsOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              handleRituelOptionClick(option);
                              setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left py-3 px-4 text-sm font-serif uppercase tracking-wider transition-all duration-200 hover-glow rounded-lg"
                          >
                            <span className="gold-text hover:gold-text-active">
                              {option.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Updated Mobile Soins dropdown */}
                  {tab.isSoins && activeDropdown === DROPDOWN_TYPES.SOINS && (
                    <div className="pl-6 py-2 space-y-1">
                      {/* Title for mobile */}
                      <div className="px-4 py-2 text-sm font-serif uppercase tracking-wider gold-text font-semibold border-b border-amber-500/20 mb-2">
                        {t.nosServicesTitle}
                      </div>

                      {soinsOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleSoinsOptionClick(option);
                            setMobileMenuOpen(false);
                          }}
                          className="block w-full text-left py-3 px-4 text-sm font-serif uppercase tracking-wider transition-all duration-200 hover-glow rounded-lg"
                        >
                          <span className="gold-text hover:gold-text-active">
                            {option.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Language Selector in Mobile Menu */}
              <div className="hidden border-t border-amber-500/20 pt-4 mt-4">
                <div className="px-4 py-2 text-sm font-serif uppercase tracking-wider gold-text font-semibold mb-2">
                  {t.languageSection}
                </div>
                <div className="space-y-1">
                  {languageOptions.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        handleLanguageSelect(language.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left py-3 px-4 text-sm font-serif transition-all duration-200 hover-glow rounded-lg flex items-center gap-3 ${
                        selectedLanguage === language.code
                          ? "bg-amber-500/20 gold-text-active"
                          : "gold-text hover:gold-text-active"
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="uppercase tracking-wider">
                        {language.name}
                      </span>
                      {selectedLanguage === language.code && (
                        <svg
                          className="w-4 h-4 ml-auto gold-text-active"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Content Area */}
      <div className="pt-24">
        <div ref={coverRef}>
          <CoverSection language={selectedLanguage} />
        </div>
        <div ref={lieuxRef}>
          <LieuSoins language={selectedLanguage} />
        </div>
        <div ref={brochureRef}>
          <BrochureThalion
            scrollToSoins={() => scrollToRef(soinsRef)}
            language={selectedLanguage}
          />
        </div>
        <div ref={tarifsRef}>
          <TarifsThalion
            selectedRituel={selectedRituel}
            language={selectedLanguage}
          />
        </div>
        <div ref={soinsRef}>
          <SoinsALaCarteNew language={selectedLanguage} />
        </div>
        <div ref={contactRef}>
          <ContactThalion language={selectedLanguage} />
        </div>
      </div>
    </div>
  );
};

export default Thalion;
