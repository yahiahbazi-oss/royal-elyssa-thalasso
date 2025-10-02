// C:\Users\pc\Desktop\Royal Thalassa\Royal Elyssa\royalelyssav1\src\components\Footer\Footer.jsx
import React from "react";
import { Facebook, Instagram, Youtube, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css"; // Import the CSS file from the same directory

import lusineLogo from "../../assets/logo/usinelogo.png";
import thalionLogo from "../../assets/logo/logo-thalion.png__401x85_q85_crop_subject_location--87,731_subsampling-2_upscale.png";
import royalThalassaLogo from "../../assets/logo/Royal_Thalassa_Monastir_5_-removebg-preview.png";
import tcLogo from "../../assets/logo/TC_inverted_standard logo_L_2024.png";
import royalElyssaLogo from "../../assets/logo/logo3.png";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Logo data for scrolling animation
  const partnerLogos = [
    {
      name: "Lusine",
      src: lusineLogo,
      size: "h-12",
    },
    {
      name: "Thalion",
      src: thalionLogo,
      size: "h-9",
    },
    {
      name: "Royal Thalassa",
      src: royalThalassaLogo,
      size: "h-35",
    },
    {
      name: "TC Logo",
      src: tcLogo,
      size: "h-25",
    },
  ];

  // Create 4 sets of logos for seamless infinite scrolling
  const allLogos = [
    ...partnerLogos,
    ...partnerLogos,
    ...partnerLogos,
    ...partnerLogos,
  ];

  const brands = [
    { name: t("footer.brands.thalion"), route: "/thalion" },
    { name: t("footer.brands.spa"), route: "/spa" },
    { name: t("footer.brands.ericZemmour"), route: "/erich-zemmour" }, // Changed to route navigation
    { name: t("footer.brands.usine"), route: "/usine" },
    { name: t("footer.brands.carreVip"), route: "/Suite" },
  ];

  const handleBrandClick = (route) => {
    navigate(route);
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      {/* Partner Logos Scrolling Section */}
      <div className="relative py-8 overflow-hidden border-b border-amber-400/20">
        <div className="flex">
          <div className="flex animate-scroll-left space-x-8">
            {allLogos.map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`${logo.size} w-auto object-contain filter brightness-90 hover:brightness-110 transition-all duration-300 hover:scale-105`}
                />
              </div>
            ))}
          </div>
          {/* Duplicate for seamless looping */}
          <div className="flex animate-scroll-left space-x-8 ml-8">
            {allLogos.map((logo, index) => (
              <div
                key={`logo-duplicate-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`${logo.size} w-auto object-contain filter brightness-90 hover:brightness-110 transition-all duration-300 hover:scale-105`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-start mb-8">
            {/* Left Column - Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <img
                  src={royalElyssaLogo}
                  alt="Royal Elyssa Spa Logo"
                  className="h-30 w-auto object-contain filter drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Middle Column - Title and Description */}
            <div className="text-center lg:text-left">
              <h2 className="text-xl md:text-2xl font-playfair font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mb-3 tracking-wide leading-tight">
                {t("footer.title")}
              </h2>
              <p className="text-xs md:text-sm leading-relaxed text-slate-300 font-light font-montserrat">
                {t("footer.description")}
              </p>
            </div>

            {/* Right Column - Brands */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg md:text-xl font-playfair font-bold text-amber-400 mb-3 tracking-wider">
                {t("footer.brands.title")}
              </h3>
              <div className="space-y-2">
                {brands.map((brand, index) => (
                  <div key={index}>
                    <button
                      onClick={() => handleBrandClick(brand.route)}
                      className="group relative inline-block text-sm md:text-base font-light text-slate-200 hover:text-amber-300 
                               transition-colors duration-300 tracking-wide font-playfair cursor-pointer"
                    >
                      {brand.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Media, Phone and Copyright Section */}
          <div className="border-t border-amber-400/20 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Left Side - Social Media and Phone */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                {/* Social Media Links */}
                <div className="flex space-x-2">
                  <a
                    href="https://www.facebook.com/ElyssaThalassoSpaMonastir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="border border-amber-400/30 hover:border-amber-400 p-2 rounded-full transition-all duration-300 hover:bg-amber-400/10">
                      <Facebook className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/thalassahotels"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="border border-amber-400/30 hover:border-amber-400 p-2 rounded-full transition-all duration-300 hover:bg-amber-400/10">
                      <Instagram className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                    </div>
                  </a>

                  <a
                    href="https://www.youtube.com/channel/UCRoyalThalassaMonastir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="border border-amber-400/30 hover:border-amber-400 p-2 rounded-full transition-all duration-300 hover:bg-amber-400/10">
                      <Youtube className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                    </div>
                  </a>
                </div>

                {/* Phone Number */}
                <div className="flex items-center space-x-2">
                  <div className="border border-amber-400/30 p-2 rounded-full">
                    <Phone className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-sm font-light text-amber-300 tracking-wide font-playfair">
                    73 520 520
                  </span>
                </div>
              </div>

              {/* Right Side - Copyright */}
              <div className="text-center md:text-right">
                <p className="text-slate-400 text-xs font-light tracking-wide font-playfair">
                  © 2025{" "}
                  <span className="text-amber-400 font-normal">
                    {t("footer.copyright.company")}
                  </span>
                </p>
                <p className="text-slate-500 text-xs font-light tracking-wide font-playfair mt-1">
                  {t("footer.copyright.allRightsReserved")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
