import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Clock,
  MapPin,
  Star,
  Scissors,
  Crown,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Import assets
import logo from "./assets/logo.png";
const ericImage = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481608/eric_hoysn6.jpg";
const sal1 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759478066/Salon_de_coiffure_Eric_Zemmour_1_hhyomz.jpg";
const sal2 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759478065/Salon_de_coiffure_Eric_Zemmour_2_ukur02.jpg";
const sal3 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759478065/Salon_de_coiffure_Eric_Zemmour_3_re4ih0.jpg";

// Import flag images
import francFlag from "../../assets/france.png";
import ukFlag from "../../assets/royaume-uni.png";
import russiaFlag from "../../assets/russie.png";

const ErichZemmour = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("coupe");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exchange rate TND to EUR (1 EUR = 3.3 TND)
  const exchangeRate = 1 / 3.3;

  // Language change function
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Convert TND to EUR with proper rounding
  const convertToEur = (tndPrice) => {
    const eurPrice = tndPrice * exchangeRate;
    return Math.round(eurPrice);
  };

  // Pricing data
  const pricingData = {
    coupe: {
      title: t("ericZemmour.services.categories.coupe"),
      icon: <Scissors className="w-6 h-6" />,
      items: [
        {
          category: t("ericZemmour.services.pricing.categories.women"),
          services: [
            {
              name: t("ericZemmour.services.pricing.services.shampoing"),
              tnd: 10,
            },
            {
              name: t(
                "ericZemmour.services.pricing.services.shampoingSoinCoupeCoiffageCourtMiLong"
              ),
              tnd: 65,
            },
            {
              name: t(
                "ericZemmour.services.pricing.services.shampoingSoinCoupeCoiffageLong"
              ),
              tnd: 75,
            },
          ],
        },
        {
          category: t("ericZemmour.services.pricing.categories.men"),
          services: [
            {
              name: t(
                "ericZemmour.services.pricing.services.shampoingCoupeCoiffage"
              ),
              tnd: 35,
            },
          ],
        },
        {
          category: t("ericZemmour.pricingData.children") + " (12 ans)",
          services: [
            { name: t("ericZemmour.pricingData.services.fillette"), tnd: 50 },
            { name: t("ericZemmour.pricingData.services.garcon"), tnd: 30 },
          ],
        },
      ],
    },
    coiffage: {
      title: t("ericZemmour.services.categories.coiffage"),
      icon: <Crown className="w-6 h-6" />,
      items: [
        {
          category: t("ericZemmour.pricingData.forfaitsCoiffage"),
          services: [
            {
              name: t("ericZemmour.pricingData.services.shampoingSoinsCoiffageCourt"),
              tnd: 30,
            },
            {
              name: t("ericZemmour.pricingData.services.shampoingSoinsCoiffageMiLong"),
              tnd: 35,
            },
            {
              name: t("ericZemmour.pricingData.services.shampoingSoinsCoiffageLong"),
              tnd: 40,
            },
          ],
        },
      ],
    },
    techniques: {
      title: t("ericZemmour.services.categories.techniques"),
      icon: <Sparkles className="w-6 h-6" />,
      items: [
        {
          category: t("ericZemmour.pricingData.techniquesCapillaires"),
          note: t("ericZemmour.pricingData.technicalNote"),
          services: [
            { name: t("ericZemmour.pricingData.services.racinesMajirelRichessePartir"), tnd: 60 },
            { name: t("ericZemmour.pricingData.services.racinesInoaPartir"), tnd: 80 },
            { name: t("ericZemmour.pricingData.services.doseSupplementairePartir"), tnd: 20 },
            { name: t("ericZemmour.pricingData.services.balayagePartir"), tnd: 60 },
            { name: t("ericZemmour.pricingData.services.mechesPartir"), tnd: 100 },
            { name: t("ericZemmour.pricingData.services.physioDose"), tnd: 55 },
          ],
        },
      ],
    },
    mains: {
      title: t("ericZemmour.services.categories.beauteMainsPieds"),
      icon: <Star className="w-6 h-6" />,
      items: [
        {
          category: t("ericZemmour.pricingData.nail"),
          services: [
            { name: t("ericZemmour.pricingData.services.poseVernis"), tnd: 15 },
            { name: t("ericZemmour.pricingData.services.poseFrench"), tnd: 25 },
            { name: t("ericZemmour.pricingData.services.fantaisie"), tnd: 10 },
          ],
        },
        {
          category: t("ericZemmour.pricingData.manicure"),
          services: [
            { name: t("ericZemmour.pricingData.services.manucureClassique"), tnd: 30 },
            { name: t("ericZemmour.pricingData.services.manucureSpa"), tnd: 45 },
            { name: t("ericZemmour.pricingData.services.soinsParaffine"), tnd: 40 },
          ],
        },
      ],
    },
    pieds: {
      title: t("ericZemmour.services.categories.beautePieds"),
      icon: <Star className="w-6 h-6" />,
      items: [
        {
          category: t("ericZemmour.pricingData.pedicure"),
          services: [
            { name: t("ericZemmour.pricingData.services.pedicureClassique"), tnd: 35 },
            { name: t("ericZemmour.pricingData.services.pedicureSpa"), tnd: 50 },
            { name: t("ericZemmour.pricingData.services.soinsParaffine"), tnd: 40 },
          ],
        },
      ],
    },
    onglerie: {
      title: t("ericZemmour.services.categories.onglerie"),
      icon: <Sparkles className="w-6 h-6" />,
      items: [
        {
          category: t("ericZemmour.pricingData.vernisExtensions"),
          services: [
            { name: t("ericZemmour.pricingData.services.vernisPermament"), tnd: 25 },
            { name: t("ericZemmour.pricingData.services.vernisPermamentGel"), tnd: 40 },
            { name: t("ericZemmour.pricingData.services.capsuleGelVernisPermament"), tnd: 80 },
            { name: t("ericZemmour.pricingData.services.extensionGelVernisPermament"), tnd: 50 },
            { name: t("ericZemmour.pricingData.services.gelPoudreCapsuleVernisPermament"), tnd: 90 },
            { name: t("ericZemmour.pricingData.services.gelPoudreVernisPermament"), tnd: 50 },
            { name: t("ericZemmour.pricingData.services.extensionGelPoudreVernisPermament"), tnd: 60 },
          ],
        },
      ],
    },
    cils: {
      title: t("ericZemmour.services.categories.extensionsCils"),
      icon: <Star className="w-6 h-6" />,
      items: [
        {
          category: t("ericZemmour.pricingData.cils"),
          services: [
            { name: t("ericZemmour.pricingData.services.cilACilPermament"), tnd: 120 },
            { name: t("ericZemmour.pricingData.services.cilACil"), tnd: 40 },
          ],
        },
      ],
    },
  };

  const categories = Object.keys(pricingData);

  const handleHomeClick = () => {
    window.location.href = "http://localhost:5173/";
  };

  const navigateTo = (path) => {
    // close mobile menu if open
    setMobileMenuOpen(false);
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={logo}
              alt="Eric Zemmour Logo"
              className="h-12 w-auto object-contain"
            />

            {/* Mobile-only small language flags placed to the right of the logo */}
            <div className="lg:hidden flex items-center ml-3 space-x-2">
              <img
                src={francFlag}
                alt="France Flag"
                className="h-5 w-6 object-cover rounded cursor-pointer border border-gray-200 shadow-sm"
                onClick={() => { changeLanguage('fr'); setMobileMenuOpen(false); }}
                title="Français"
              />
              <img
                src={ukFlag}
                alt="UK Flag"
                className="h-5 w-6 object-cover rounded cursor-pointer border border-gray-200 shadow-sm"
                onClick={() => { changeLanguage('en'); setMobileMenuOpen(false); }}
                title="English"
              />
              <img
                src={russiaFlag}
                alt="Russia Flag"
                className="h-5 w-6 object-cover rounded cursor-pointer border border-gray-200 shadow-sm"
                onClick={() => { changeLanguage('ru'); setMobileMenuOpen(false); }}
                title="Русский"
              />
            </div>

            {/* ...existing code... */}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between w-full">
              {/* Empty div for left spacing */}
              <div></div>
              
              {/* ...existing code... */}
              
              {/* Right side navigation links */}
              <div className="flex items-center space-x-8">
                {/* Royal Elyssa hover dropdown */}
                <div className="relative group">
                  <button
                    onClick={() => navigateTo('/')}
                    className="text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300 px-3 py-3"
                    aria-label={t("header.navigation.royalElyssa.title") || 'Royal Elyssa'}
                  >
                    {t("header.navigation.royalElyssa.title") || 'Royal Elyssa'}
                  </button>

                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <button
                      onClick={() => navigateTo('/')}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                    >
                      {t("header.navigation.royalElyssa.accueil") || 'Accueil'}
                    </button>
                    <button
                      onClick={() => navigateTo('/thalion')}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                    >
                      {t("header.navigation.thalion.title") || 'Thalion'}
                    </button>
                    <button
                      onClick={() => navigateTo('/usine')}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                    >
                      {t("header.navigation.usine.title") || "L'Usine"}
                    </button>
                    <button
                      onClick={() => navigateTo('/suite')}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      {t("header.navigation.carreVip.title") || 'Carré Vip Spa'}
                    </button>
                  </div>
                </div>
                <a
                  href="#about"
                  className="text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300"
                >
                  {t("ericZemmour.navigation.about")}
                </a>
                <a
                  href="#salon"
                  className="text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300"
                >
                  {t("ericZemmour.navigation.salon")}
                </a>
                <a
                  href="#services"
                  className="text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300"
                >
                  {t("ericZemmour.navigation.services")}
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300"
                >
                  {t("ericZemmour.navigation.contact")}
                </a>
                <div className="flex items-center space-x-4 pl-4 border-l border-gray-300">
                  <div className="flex items-center space-x-2">
                    <img
                      src={francFlag}
                      alt="France Flag"
                      className="h-6 w-8 object-cover rounded shadow-md hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-200"
                      onClick={() => changeLanguage('fr')}
                      title="Français"
                    />
                    <img
                      src={ukFlag}
                      alt="UK Flag"
                      className="h-6 w-8 object-cover rounded shadow-md hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-200"
                      onClick={() => changeLanguage('en')}
                      title="English"
                    />
                    <img
                      src={russiaFlag}
                      alt="Russia Flag"
                      className="h-6 w-8 object-cover rounded shadow-md hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-200"
                      onClick={() => changeLanguage('ru')}
                      title="Русский"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                className="p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
          
          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200"
            >
              <div className="px-4 py-2">
                  <div className="py-2 border-b border-gray-100">
                    <div className="pl-4">
                      <button onClick={() => navigateTo("/")} className="block w-full py-3 text-gray-700 hover:text-gray-900">{t("header.navigation.royalElyssa.title") || 'Royal Elyssa'}</button>
                      <button onClick={() => navigateTo("/erich-zemmour")} className="block w-full py-3 text-gray-700 hover:text-gray-900">{t("header.navigation.royalElyssa.ericZemmour") || 'Eric Zemmour'}</button>
                      <button onClick={() => navigateTo("/usine")} className="block w-full py-3 text-gray-700 hover:text-gray-900">{t("header.navigation.usine.title") || "L'Usine"}</button>
                      <button onClick={() => navigateTo("/suite")} className="block w-full py-3 text-gray-700 hover:text-gray-900">{t("header.navigation.carreVip.title") || 'CARRÉ VIP SPA'}</button>
                    </div>
                  </div>

                  

                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300 border-b border-gray-100"
                >
                  {t("ericZemmour.navigation.about")}
                </a>
                <a
                  href="#salon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300 border-b border-gray-100"
                >
                  {t("ericZemmour.navigation.salon")}
                </a>
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300 border-b border-gray-100"
                >
                  {t("ericZemmour.navigation.services")}
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300 border-b border-gray-100"
                >
                  {t("ericZemmour.navigation.contact")}
                </a>
                <div className="py-3 flex items-center justify-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+216 73 520 591</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
  <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://res.cloudinary.com/dxoje33mm/image/upload/v1759477822/thalion-royalelyssa.jpg__3876x1912_q85_crop_subsampling-2_upscale_qxd1c0.jpg)` }}
        />

        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src={logo}
              alt="Eric Zemmour"
              className="h-20 md:h-28 lg:h-40 w-auto mx-auto mb-8"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-6 leading-tight">
              {t("ericZemmour.hero.title")}
            </h1>
            <div className="text-3xl md:text-5xl lg:text-6xl font-medium mb-6">
              {t("ericZemmour.hero.location")}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl font-light mb-12 max-w-4xl mx-auto leading-relaxed opacity-90"
          >
            {t("ericZemmour.hero.subtitle")}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* About Eric Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                    <img
                      src={ericImage}
                      alt="Eric Zemmour"
                      className="w-full h-48 sm:h-64 md:h-[700px] lg:h-[800px] object-cover rounded-lg shadow-2xl"
                    />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4">
                  {t("ericZemmour.about.title")}
                </h2>
                <div className="w-20 h-1 bg-gray-400 mb-6" />
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  {t("ericZemmour.about.subtitle")}
                </p>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base">
                  {t("ericZemmour.about.biography.intro")}
                </p>

                <p className="text-base">
                  {t("ericZemmour.about.biography.journey")}
                </p>

                <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
                  <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3">
                    {t("ericZemmour.about.biography.successTitle")}
                  </h3>
                  <p className="text-base text-gray-700">
                    {t("ericZemmour.about.biography.success")}
                  </p>
                </div>

                <p className="text-base">
                  {t("ericZemmour.about.biography.recognition")}
                </p>

                <div className="bg-gray-800 text-white p-6 rounded-lg">
                  <p className="text-lg font-medium">
                    {t("ericZemmour.about.biography.tunisia")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Salon Gallery */}
      <section id="salon" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4">
              {t("ericZemmour.salon.title")}{" "}
              <span className="text-gray-900 font-medium">{t("ericZemmour.hero.location")}</span>
            </h2>
            <div className="w-20 h-1 bg-gray-400 mx-auto mb-6" />
            <div className="max-w-4xl mx-auto space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                {t("ericZemmour.salon.description")}{" "}
                <strong className="text-gray-900">{t("ericZemmour.hero.location")}</strong>, situé dans
                l'enceinte du Royal Elyssa Thalasso & Spa. Il vous offre tout un{" "}
                {t("ericZemmour.salon.servicesDescription")}{" "}
                brochure.
              </p>
              <p className="text-lg leading-relaxed">
                {t("ericZemmour.salon.vipSpace")}
              </p>
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-6">
                <p className="text-gray-800 font-semibold text-lg">
                  {t("ericZemmour.salon.uniqueness")}{" "}
                  <span className="text-gray-900 font-bold">{t("ericZemmour.hero.location")}</span>{" "}
                  {t("ericZemmour.salon.kerastase")}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <p className="text-gray-700 leading-relaxed">
                  {t("ericZemmour.salon.brochure")}{" "}
                  {t("ericZemmour.salon.brochureComplete")}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[sal1, sal2, sal3].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-lg shadow-xl group"
              >
                <img
                  src={image}
                  alt={`Salon ${index + 1}`}
                  className="w-full h-40 sm:h-56 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold">Salon Eric Zemmour</p>
                  <p className="text-sm opacity-90">Monastir - Royal Elyssa</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Info removed per request */}
        </div>
      </section>

      {/* Services Menu */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4">
              {t("ericZemmour.services.title")}
            </h2>
            <div className="w-20 h-1 bg-gray-400 mx-auto mb-6" />
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-3xl mx-auto">
              <p className="text-sm text-gray-800 font-medium leading-relaxed">
                {t("ericZemmour.services.pricing.notice")}
              </p>
            </div>
          </motion.div>

          {/* Mobile-Friendly Category Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 text-xs md:text-sm ${
                    activeCategory === category
                      ? "bg-gray-800 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="w-4 h-4 md:w-5 md:h-5">
                    {pricingData[category].icon}
                  </span>
                  <span className="hidden sm:inline">
                    {pricingData[category].title}
                  </span>
                  <span className="sm:hidden">
                    {pricingData[category].title.split(" ")[0]}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile-Optimized Services Content */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            {pricingData[activeCategory].items.map(
              (categoryItem, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-gray-800 mb-4 text-center">
                    {categoryItem.category}
                  </h3>

                  {categoryItem.note && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                      <p className="text-xs md:text-sm text-gray-800 font-medium text-center">
                        {categoryItem.note}
                      </p>
                    </div>
                  )}

                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    {categoryItem.services.map((service, serviceIndex) => (
                      <motion.div
                        key={serviceIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: serviceIndex * 0.1,
                        }}
                        className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="text-gray-800 font-medium flex-1 pr-2 mb-2 md:mb-0 text-sm md:text-base leading-tight">
                          {service.name}
                        </span>
                        <div className="text-right flex-shrink-0">
                          {service.tnd ? (
                            <div className="flex flex-col md:flex-row md:space-x-4">
                              <div className="text-gray-900 font-bold text-base md:text-lg">
                                {service.tnd} TND
                              </div>
                              <div className="text-gray-500 text-sm">
                                ~{convertToEur(service.tnd)} EUR
                              </div>
                            </div>
                          ) : (
                            <div className="text-gray-600 font-medium text-sm">
                              {t("ericZemmour.pricingData.onQuote")}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-6">
              {t("ericZemmour.finalContact.title")}
            </h2>
            <div className="text-2xl md:text-3xl font-medium mb-6">
              {t("ericZemmour.finalContact.location")}
            </div>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              {t("ericZemmour.contact.description")}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Phone className="w-6 h-6 text-gray-300" />
                  <span className="text-xl font-medium">{t("ericZemmour.salonInfo.phone")}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <MapPin className="w-6 h-6 text-gray-300" />
                  <span className="text-lg font-medium">
                    {t("ericZemmour.finalContact.address")}
                  </span>
                </div>
                <p className="text-gray-300 font-medium">{t("ericZemmour.finalContact.country")}</p>
              </div>
            </div>

            <motion.a
              href="tel:+21673520591"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-white text-gray-800 font-semibold text-lg tracking-wider rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl lg:hidden"
            >
              {t("ericZemmour.finalContact.callNow")}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ErichZemmour;
