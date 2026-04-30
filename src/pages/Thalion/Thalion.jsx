import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../../components/SEO";
import BrochureThalion from "./BrochureThalion";
import TarifsThalion from "./TarifsThalion";
import SoinsALaCarteNew from "../../components/SoinsALaCarteNew";
import Footer from "../../components/Footer/Footer";
import Contact from "../../sections/Contact";
import LieuSoins from "./BrochureSections/LieuSoins";
import CoverSection from "./BrochureSections/CoverSection";
import logoThalion from "../../assets/logo/logo-thalion.png__401x85_q85_crop_subject_location--87,731_subsampling-2_upscale.png";

// Import flag images
import francFlag from "../../assets/france.png";
import ukFlag from "../../assets/royaume-uni.png";
import russiaFlag from "../../assets/russie.png";

const Thalion = () => {
  // Handler for clicking the Thalion logo
  const handleLogoClick = () => {
    navigate("/");
  };
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState("cover");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Consolidated dropdown state
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("cover");
  const [selectedRituel, setSelectedRituel] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("fr"); // Default to French
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // Welcome overlay state
  const [royalElyssaDropdown, setRoyalElyssaDropdown] = useState(false); // Royal Elyssa dropdown state
  const navigate = useNavigate();

  // Auto-hide welcome text after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Language change function
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  // Royal Elyssa dropdown handlers
  const handleRoyalElyssaClick = () => {
    navigate("/");
  };

  const handleAccueilClick = () => {
    navigate("/");
  };

  const handleRoyalElyssaEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setRoyalElyssaDropdown(true);
  };

  const handleRoyalElyssaLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setRoyalElyssaDropdown(false);
    }, 150); // Small delay to prevent flickering
  };

  const handleEricZemmourClick = () => {
    navigate("/erich-zemmour");
  };

  const handleUsineClick = () => {
    navigate("/usine");
  };

  const handleCarreVipClick = () => {
    navigate("/suite");
  };
  const brochureRef = useRef(null);
  const tarifsRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const soinsRef = useRef(null);
  const lieuxRef = useRef(null);
  const coverRef = useRef(null);
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
    { id: "footer", name: "Footer", ref: footerRef, offset: 100 },
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

  // Use stable ids so navigation works regardless of translation text
  const escalesOptions = [
    { id: "vitalite-marine", name: t("thalion.escales.vitaliteMarine") },
    { id: "detox-silhouette", name: t("thalion.escales.detoxSilhouette") },
    { id: "relaxation-marine", name: t("thalion.escales.relaxationMarine") },
    { id: "for-men", name: t("thalion.escales.forMen") },
    { id: "after-golf", name: t("thalion.escales.afterGolf") },
    { id: "arbre-vie", name: t("thalion.escales.arbreDeVie") },
    { id: "nouvel-age", name: t("thalion.escales.nouvelAge") },
    { id: "ceremonie-spa", name: t("thalion.escales.ceremoniesSpa") },
    { id: "weekend-cool", name: t("thalion.escales.weekendCool") },
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
      label: t("thalion.navigation.brochure"),
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
        setRoyalElyssaDropdown(false); // Close Royal Elyssa dropdown too
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

  // Mobile scroll function that keeps the menu open for dropdowns
  const scrollToRefMobileDropdown = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      });
      // Don't close the mobile menu - keep it open for dropdown selection
    }
  };

  const scrollToSection = (sectionName) => {
    const brochureComponent = brochureRef.current;
    if (brochureComponent) {
      scrollToRef(brochureRef);

      setTimeout(() => {
        let targetElement = null;

        // If caller passed a stable id like 'ceremonie-spa', try to find it first
        if (typeof sectionName === "string") {
          const possibleId = sectionName;
          targetElement =
            document.querySelector(`[data-section="${possibleId}"]`) ||
            document.getElementById(possibleId) ||
            document.querySelector(`.${possibleId}-section`);
          if (targetElement) {
            console.log("Found target by id:", possibleId, targetElement);
          }
        }

        switch (sectionName) {
          case "Vitalité Marine":
          case "Marine Vitality":
          case "Морская жизненная сила":
            targetElement =
              document.querySelector('[data-section="vitalite-marine"]') ||
              document.querySelector(".vitalite-marine-section") ||
              document.getElementById("vitalite-marine");
            console.log("Looking for Vitalité Marine element:", targetElement);
            break;
          case "Week-end Cool":
          case "Cool Weekend":
          case "Прохладные выходные":
            targetElement =
              document.querySelector('[data-section="weekend-cool"]') ||
              document.querySelector(".weekend-cool-section") ||
              document.getElementById("weekend-cool");
            break;
          case "Détox Silhouette":
          case "Detox Silhouette":
          case "Детокс силуэт":
            targetElement =
              document.querySelector('[data-section="detox-silhouette"]') ||
              document.querySelector(".detox-silhouette-section");
            break;
          case "Relaxation Marine":
          case "Marine Relaxation":
          case "Морская релаксация":
            targetElement =
              document.querySelector('[data-section="relaxation-marine"]') ||
              document.querySelector(".relaxation-marine-section");
            break;
          case "For Men":
          case "Для мужчин":
            targetElement =
              document.querySelector('[data-section="for-men"]') ||
              document.querySelector(".for-men-section");
            break;
          case "After Golf":
          case "После гольфа":
            targetElement =
              document.querySelector('[data-section="after-golf"]') ||
              document.querySelector(".after-golf-section");
            break;
          case "Arbre de Vie":
          case "Tree of Life":
          case "Древо жизни":
            targetElement =
              document.querySelector('[data-section="arbre-vie"]') ||
              document.querySelector(".arbre-vie-section");
            break;
          case "Nouvel Age":
          case "New Age":
          case "Новый век":
            targetElement =
              document.querySelector('[data-section="nouvel-age"]') ||
              document.querySelector(".nouvel-age-section");
            break;
          case "Cérémonies du Spa & Soins de Thalasso":
          case "Spa Ceremonies & Thalasso Treatments":
          case "Церемонии СПА и процедуры талассо":
            targetElement =
              document.querySelector('[data-section="ceremonie-spa"]') ||
              document.querySelector(".ceremonie-spa-section");
            break;
          default:
            break;
        }

        if (targetElement) {
          console.log("Scrolling to:", targetElement);
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          console.log("Target element not found for:", sectionName);
        }
      }, 800);
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

  // Mobile-specific tab click handler that keeps menu open for dropdowns
  const handleMobileTabClick = (tab) => {
    setActiveTab(tab.id);
    setActiveSection(tab.id);
    if (!tab.hasDropdown) {
      scrollToRef(tab.ref); // Close menu for regular tabs
    } else {
      scrollToRefMobileDropdown(tab.ref); // Keep menu open for dropdown tabs
    }
  };

  const handleEscalesOptionClick = (optionId) => {
    // optionId is a stable id like 'ceremonie-spa'
    scrollToSection(optionId);
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
    <div className="min-h-screen overflow-x-hidden">
      <SEO
        title="Thal'ion - Thalassothérapie & Soins Marins"
        description="Thal'ion au Royal Elyssa, Monastir : thalassothérapie, cures bien-être, soins à la carte, anti-stress, détox silhouette et séjours remise en forme en Tunisie."
        canonical="/thalion"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "HealthClub",
          "name": "Thal'ion — Centre de Thalassothérapie",
          "description": "Centre de thalassothérapie au Royal Elyssa, Monastir. Cures bien-être, soins marins, rituels anti-stress et séjours remise en forme.",
          "url": "https://www.royalelyssa.com/thalion",
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
          "parentOrganization": {
            "@type": "Resort",
            "name": "Royal Elyssa Thalasso & Spa",
            "url": "https://www.royalelyssa.com"
          }
        }}
      />
      {/* Welcome Overlay - Appears on top of everything */}}
      {showWelcome && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="text-center px-8 max-w-4xl mx-auto">
            {/* Main Welcome Title */}
            <h1
              className={`${
                i18n.language === "ru"
                  ? "text-2xl md:text-4xl lg:text-5xl"
                  : "text-4xl md:text-6xl lg:text-7xl"
              } font-light text-amber-100 mb-6 tracking-wide`}
            >
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-2xl">
                Bienvenue à Thalion
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-stone-200 ${
                i18n.language === "ru"
                  ? "text-lg md:text-xl lg:text-2xl"
                  : "text-2xl md:text-3xl lg:text-4xl"
              } font-extralight tracking-[0.3em] drop-shadow-lg mb-8`}
            >
              CRÉATEUR DE COSMÉTIQUE MARINE
            </p>

            {/* Luxury decorative elements */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-24"></div>
              <div className="mx-6 flex space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-lg"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-lg mt-0.5"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-lg"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-24"></div>
            </div>

            {/* Location - MONASTIR */}
            <div className="relative z-10">
              <h2
                className={`${
                  i18n.language === "ru"
                    ? "text-2xl md:text-4xl lg:text-5xl"
                    : "text-4xl md:text-6xl lg:text-7xl"
                } font-light text-amber-100 tracking-wide`}
              >
                <span
                  className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 drop-shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFD700 0%, #FFF700 25%, #FFED4E 50%, #FFF700 75%, #FFD700 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow:
                      "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4)",
                    filter: "drop-shadow(0 3px 6px rgba(255, 215, 0, 0.5))",
                  }}
                >
                  MONASTIR
                </span>
              </h2>
            </div>
          </div>
        </div>
      )}



      <style>{`
        @keyframes goldShimmer {
          0% {
            background-position: -300% 0;
            filter: brightness(1) saturate(1.2);
          }
          25% {
            filter: brightness(1.3) saturate(1.5);
          }
          50% {
            background-position: 0% 0;
            filter: brightness(1.6) saturate(1.8);
          }
          75% {
            filter: brightness(1.3) saturate(1.5);
          }
          100% {
            background-position: 300% 0;
            filter: brightness(1) saturate(1.2);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          25% {
            opacity: 0.3;
            transform: scale(0.5) rotate(90deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
          75% {
            opacity: 0.7;
            transform: scale(0.8) rotate(270deg);
          }
        }

        @keyframes goldPulse {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.6),
              0 0 40px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.2);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 215, 0, 0.8),
              0 0 60px rgba(255, 215, 0, 0.6), 0 0 90px rgba(255, 215, 0, 0.4);
          }
        }

        .gold-text {
          font-weight: 500; /* Medium weight like WhyChoose */
          color: transparent;
          background: linear-gradient(
            135deg,
            #fcd34d 0%,
            #fef08a 50%,
            #fcd34d 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(252, 211, 77, 0.5);
          filter: drop-shadow(0 2px 4px rgba(252, 211, 77, 0.3));
        }

        .gold-text-active {
          font-weight: 500;
          color: transparent;
          background: linear-gradient(
            135deg,
            #fef08a 0%,
            #fcd34d 50%,
            #fef08a 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(252, 211, 77, 0.7);
          filter: drop-shadow(0 3px 6px rgba(252, 211, 77, 0.4));
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
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.4),
            0 0 60px rgba(255, 215, 0, 0.2), 0 0 90px rgba(255, 215, 0, 0.1);
          transform: translateY(-2px);
          border: 1px solid rgba(255, 215, 0, 0.3);
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
            {/* Logo and Flags */}
            {/* Logo and Flags (mobile: inline, desktop: logo only) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <img
                src={logoThalion}
                alt="Thalion Brand"
                className="h-10 xl:h-12 w-auto object-contain transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={handleLogoClick}
              />
              {/* Flags inline with logo on mobile only */}
              <div className="flex items-center space-x-1 md:space-x-2 ml-2 lg:hidden">
                <img
                  src={francFlag}
                  alt="France Flag"
                  className="h-4 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-lg border border-gold-200/30"
                  onClick={() => changeLanguage("fr")}
                  title="Français - Changer en français"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(255, 215, 0, 0.2))",
                  }}
                />
                <img
                  src={ukFlag}
                  alt="UK Flag"
                  className="h-4 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-lg border border-gold-200/30"
                  onClick={() => changeLanguage("en")}
                  title="English - Switch to English"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(255, 215, 0, 0.2))",
                  }}
                />
                <img
                  src={russiaFlag}
                  alt="Russia Flag"
                  className="h-4 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-lg border border-gold-200/30"
                  onClick={() => changeLanguage("ru")}
                  title="Русский - Переключить на русский"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(255, 215, 0, 0.2))",
                  }}
                />
              </div>
            </div>

            {/* Flags fixed top-right on desktop only */}
            <div className="hidden lg:flex fixed top-2 right-4 z-[9999] items-center space-x-2">
              <img
                src={francFlag}
                alt="France Flag"
                className="h-4 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-lg border border-gold-200/30"
                onClick={() => changeLanguage("fr")}
                title="Français - Changer en français"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(255, 215, 0, 0.2))",
                }}
              />
              <img
                src={ukFlag}
                alt="UK Flag"
                className="h-4 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-lg border border-gold-200/30"
                onClick={() => changeLanguage("en")}
                title="English - Switch to English"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(255, 215, 0, 0.2))",
                }}
              />
              <img
                src={russiaFlag}
                alt="Russia Flag"
                className="h-4 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-lg border border-gold-200/30"
                onClick={() => changeLanguage("ru")}
                title="Русский - Переключить на русский"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(255, 215, 0, 0.2))",
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="nav-tabs-container relative">
                <div className="flex items-center space-x-2">
                  {/* ROYAL ELYSSA Dropdown */}
                  <div className="relative" data-dropdown>
                    <button
                      onClick={handleRoyalElyssaClick}
                      onMouseEnter={handleRoyalElyssaEnter}
                      onMouseLeave={handleRoyalElyssaLeave}
                      className={`px-3 py-3 relative overflow-hidden group font-serif uppercase tracking-wider flex items-center gap-2 hover-glow nav-tab whitespace-nowrap ${
                        i18n.language === "en" || i18n.language === "ru"
                          ? "lg:text-xs text-sm"
                          : "text-sm"
                      }`}
                    >
                      <span className="nav-tab-underline relative gold-text group-hover:gold-text-active">
                        {t("header.navigation.royalElyssa.title")}
                      </span>
                      <svg
                        className={`w-4 h-4 ${
                          royalElyssaDropdown ? "rotate-180" : "rotate-0"
                        } flex-shrink-0`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: "#fcd34d",
                          filter:
                            "drop-shadow(0 0 6px rgba(252, 211, 77, 0.6)) drop-shadow(0 0 12px rgba(252, 211, 77, 0.4))",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Royal Elyssa Dropdown Menu */}
                    {royalElyssaDropdown && (
                      <div
                        className="absolute left-0 mt-2 w-72 rounded-lg shadow-2xl gold-border z-50"
                        onMouseEnter={handleRoyalElyssaEnter}
                        onMouseLeave={handleRoyalElyssaLeave}
                      >
                        <div className="py-2">
                          <button
                            onClick={handleAccueilClick}
                            className={`block w-full text-left px-6 py-3 font-serif uppercase tracking-wider transition-all duration-200 hover-glow border-b border-amber-500/10 ${
                              i18n.language === "en" || i18n.language === "ru"
                                ? "lg:text-xs text-sm"
                                : "text-sm"
                            }`}
                          >
                            <span className="gold-text hover:gold-text-active">
                              {t("header.navigation.royalElyssa.accueil")}
                            </span>
                          </button>
                          <button
                            onClick={handleEricZemmourClick}
                            className={`block w-full text-left px-6 py-3 font-serif uppercase tracking-wider transition-all duration-200 hover-glow border-b border-amber-500/10 ${
                              i18n.language === "en" || i18n.language === "ru"
                                ? "lg:text-xs text-sm"
                                : "text-sm"
                            }`}
                          >
                            <span className="gold-text hover:gold-text-active">
                              {t("header.navigation.royalElyssa.ericZemmour")}
                            </span>
                          </button>
                          <button
                            onClick={handleUsineClick}
                            className={`block w-full text-left px-6 py-3 font-serif uppercase tracking-wider transition-all duration-200 hover-glow border-b border-amber-500/10 ${
                              i18n.language === "en" || i18n.language === "ru"
                                ? "lg:text-xs text-sm"
                                : "text-sm"
                            }`}
                          >
                            <span className="gold-text hover:gold-text-active">
                              {t("header.navigation.royalElyssa.usine")}
                            </span>
                          </button>
                          <button
                            onClick={handleCarreVipClick}
                            className={`block w-full text-left px-6 py-3 font-serif uppercase tracking-wider transition-all duration-200 hover-glow ${
                              i18n.language === "en" || i18n.language === "ru"
                                ? "lg:text-xs text-sm"
                                : "text-sm"
                            }`}
                          >
                            <span className="gold-text hover:gold-text-active">
                              {t("header.navigation.royalElyssa.carreVip")}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

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
                        className={`px-3 py-3 relative overflow-hidden group font-serif ${
                          i18n.language === "en" || i18n.language === "ru"
                            ? "lg:text-xs text-sm"
                            : "text-sm"
                        } uppercase tracking-wider flex items-center gap-2 hover-glow nav-tab whitespace-nowrap ${
                          activeSection === tab.id ? "active" : ""
                        }`}
                      >
                        <span
                          className={`nav-tab-underline relative ${
                            activeSection === tab.id
                              ? "gold-text-active"
                              : "gold-text"
                          }`}
                        >
                          {tab.label}
                        </span>
                        {tab.hasDropdown && (
                          <svg
                            className={`w-4 h-4 ${
                              (
                                tab.isRituels
                                  ? activeDropdown === DROPDOWN_TYPES.RITUELS
                                  : tab.isSoins
                                  ? activeDropdown === DROPDOWN_TYPES.SOINS
                                  : activeDropdown === DROPDOWN_TYPES.ESCALES
                              )
                                ? "rotate-180"
                                : "rotate-0"
                            } flex-shrink-0`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{
                              color: "#ffd700",
                              filter:
                                "drop-shadow(0 0 6px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
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
                                    handleEscalesOptionClick(option.id)
                                  }
                                  className={`block w-full text-left px-6 py-3 ${
                                    i18n.language === "en" ||
                                    i18n.language === "ru"
                                      ? "lg:text-xs text-sm"
                                      : "text-sm"
                                  } font-serif uppercase tracking-wider transition-all duration-200 hover-glow border-b border-amber-500/10 last:border-b-0`}
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
                                  className={`block w-full text-left px-6 py-3 ${
                                    i18n.language === "en" ||
                                    i18n.language === "ru"
                                      ? "lg:text-xs text-sm"
                                      : "text-sm"
                                  } font-serif uppercase tracking-wider transition-all duration-200 hover-glow border-b border-amber-500/10 last:border-b-0`}
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
                                  className={`block w-full text-left px-6 py-3 ${
                                    i18n.language === "en" ||
                                    i18n.language === "ru"
                                      ? "lg:text-xs text-sm"
                                      : "text-sm"
                                  } font-serif uppercase tracking-wider transition-all duration-200 hover-glow border-b border-amber-500/10 last:border-b-0`}
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
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{
                    color: "#ffd700",
                    filter:
                      "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 215, 0, 0.4))",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter =
                      "drop-shadow(0 0 12px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 36px rgba(255, 215, 0, 0.4))";
                    e.currentTarget.style.color = "#fff700";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter =
                      "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 215, 0, 0.4))";
                    e.currentTarget.style.color = "#ffd700";
                  }}
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
                      strokeWidth={2.5}
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
                          className={`w-full text-left px-4 py-3 text-sm font-serif transition-all duration-200 hover-glow flex items-center gap-3 ${
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
                              className="w-4 h-4 ml-auto"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              style={{
                                color: "#ffd700",
                                filter:
                                  "drop-shadow(0 0 6px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
                              }}
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
              {/* ROYAL ELYSSA Mobile Menu Item */}
              <div className="border-b border-amber-500/20 pb-2 mb-4">
                <button
                  onClick={handleRoyalElyssaClick}
                  className="flex items-center justify-between w-full text-left py-4 px-4 font-serif text-sm uppercase tracking-wider transition-all duration-300 hover-glow rounded-lg"
                >
                  <span className="gold-text">
                    {t("header.navigation.royalElyssa.title")}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{
                      color: "#fcd34d",
                      filter: "drop-shadow(0 0 6px rgba(252, 211, 77, 0.6))",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Royal Elyssa submenu items */}
                <div className="ml-6 space-y-2">
                  <button
                    onClick={handleAccueilClick}
                    className="flex items-center w-full text-left py-3 px-4 text-sm font-serif transition-all duration-200 hover-glow rounded-lg"
                  >
                    <span className="gold-text hover:gold-text-active">
                      {t("header.navigation.royalElyssa.accueil")}
                    </span>
                  </button>
                  <button
                    onClick={handleEricZemmourClick}
                    className="flex items-center w-full text-left py-3 px-4 text-sm font-serif transition-all duration-200 hover-glow rounded-lg"
                  >
                    <span className="gold-text hover:gold-text-active">
                      {t("header.navigation.royalElyssa.ericZemmour")}
                    </span>
                  </button>
                  <button
                    onClick={handleUsineClick}
                    className="flex items-center w-full text-left py-3 px-4 text-sm font-serif transition-all duration-200 hover-glow rounded-lg"
                  >
                    <span className="gold-text hover:gold-text-active">
                      {t("header.navigation.royalElyssa.usine")}
                    </span>
                  </button>
                  <button
                    onClick={handleCarreVipClick}
                    className="flex items-center w-full text-left py-3 px-4 text-sm font-serif transition-all duration-200 hover-glow rounded-lg"
                  >
                    <span className="gold-text hover:gold-text-active">
                      {t("header.navigation.royalElyssa.carreVip")}
                    </span>
                  </button>
                </div>
              </div>

              {tabs.map((tab) => (
                <div key={tab.id}>
                  <button
                    onClick={() => {
                      // In mobile, just scroll to the section without showing dropdowns
                      handleTabClick(tab);
                    }}
                    className={`flex items-center justify-between w-full text-left py-4 px-4 font-serif text-sm uppercase tracking-wider transition-all duration-300 hover-glow rounded-lg ${
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
                    {/* Hide dropdown arrows in mobile */}
                  </button>
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
                      className={`w-full text-left py-3 px-4 text-sm font-serif transition-all duration-200 hover-glow rounded-lg flex items-center gap-3 ${
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
                          className="w-4 h-4 ml-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          style={{
                            color: "#ffd700",
                            filter:
                              "drop-shadow(0 0 6px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
                          }}
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
      <div className="pt-24 overflow-x-hidden">
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
          <Contact />
        </div>
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Thalion;
