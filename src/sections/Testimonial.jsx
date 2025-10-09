import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const thalion20 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759479075/Thalasso_Thal20_z1hdgo.jpg";
const thalion7 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759479076/Thalasso_7_b3qv13.jpg";
const thalion14 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759479075/Thalasso_14_xroo2d.jpg";
const royalElyssa =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759479075/royal_elyssa_thalas_jbqp8y.jpg";
const thalion =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759479076/Thalasso__yanho8.jpg";
const Salon_de_coiffure_Eric_Zemmour_1 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759478066/Salon_de_coiffure_Eric_Zemmour_1_hhyomz.jpg";
const Salon_de_coiffure_Eric_Zemmour_2 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759478065/Salon_de_coiffure_Eric_Zemmour_2_ukur02.jpg";
const Salon_de_coiffure_Eric_Zemmour_3 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759478065/Salon_de_coiffure_Eric_Zemmour_3_re4ih0.jpg";
import Club_de_sport_lusine_2 from "../assets/club_de_sport_lusine/Club_de_sport_lusine_2.jpg";
import Club_de_sport_lusine_6 from "../assets/club_de_sport_lusine/Club_de_sport_lusine_6.jpg";
const Photo_35_sur_56 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759478570/Photo___35_sur_56_em1rly.jpg";
const Photo_24_sur_56 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759478571/Photo___24_sur_56_vatjoc.jpg";
const Photo_1_sur_56 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759478570/Photo___1_sur_56_npr6ws.jpg";
const Photo_13_sur_56 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759478571/Photo___13_sur_56_cycwou.jpg";
const Suites_SPA_11 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447159/Suites_SPA_11_ovryar.jpg";
const Suites_SPA_10 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447120/Suites_SPA_10_dm4ufo.jpg";
const Suites_SPA_20 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447244/Suites_SPA_20_on55ap.jpg";
const Suites_SPA_14 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447220/Suites_SPA_14_guxjuq.jpg";
const carre_VIP_suite_spa_6 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447109/carre_VIP_suite_spa__6_viruqq.jpg";
const carre_VIP_suite_spa_7 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447109/carre_VIP_suite_spa__7_dzbbhq.jpg";

const Testimonial = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // THALION section state
  const [currentThalionIndex, setCurrentThalionIndex] = useState(0);
  const thalionImages = [thalion7, thalion14, royalElyssa, thalion, thalion20];

  // Eric Zemmour section state
  const [currentEricZemmourIndex, setCurrentEricZemmourIndex] = useState(0);
  const ericZemmourImages = [
    Salon_de_coiffure_Eric_Zemmour_1,
    Salon_de_coiffure_Eric_Zemmour_2,
    Salon_de_coiffure_Eric_Zemmour_3,
  ];

  // L'Usine section state
  const [currentUsineIndex, setCurrentUsineIndex] = useState(0);
  const usineImages = [
    Club_de_sport_lusine_2,
    Club_de_sport_lusine_6,
    Photo_35_sur_56,
    Photo_24_sur_56,
    Photo_1_sur_56,
    Photo_13_sur_56,
  ];

  // Carré VIP Suites Spa section state
  const [currentVipSuitesIndex, setCurrentVipSuitesIndex] = useState(0);
  const vipSuitesImages = [
    Suites_SPA_11,
    Suites_SPA_10,
    Suites_SPA_20,
    Suites_SPA_14,
    carre_VIP_suite_spa_6,
    carre_VIP_suite_spa_7,
  ];

  // Auto-change every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThalionIndex((prev) =>
        prev === thalionImages.length - 1 ? 0 : prev + 1
      );
      setCurrentEricZemmourIndex((prev) =>
        prev === ericZemmourImages.length - 1 ? 0 : prev + 1
      );
      setCurrentUsineIndex((prev) =>
        prev === usineImages.length - 1 ? 0 : prev + 1
      );
      setCurrentVipSuitesIndex((prev) =>
        prev === vipSuitesImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navigateCarousel = (section, direction) => {
    if (section === "thalion") {
      setCurrentThalionIndex((prev) =>
        direction === "next"
          ? prev === thalionImages.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? thalionImages.length - 1
          : prev - 1
      );
    } else if (section === "ericZemmour") {
      setCurrentEricZemmourIndex((prev) =>
        direction === "next"
          ? prev === ericZemmourImages.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? ericZemmourImages.length - 1
          : prev - 1
      );
    } else if (section === "usine") {
      setCurrentUsineIndex((prev) =>
        direction === "next"
          ? prev === usineImages.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? usineImages.length - 1
          : prev - 1
      );
    } else if (section === "vipSuites") {
      setCurrentVipSuitesIndex((prev) =>
        direction === "next"
          ? prev === vipSuitesImages.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? vipSuitesImages.length - 1
          : prev - 1
      );
    }
  };

  return (
    <section className="bg-gradient-to-b from-stone-50 to-stone-100">
      {/* THALION Section */}
      <div className="py-16">
        <div className="flex flex-col md:flex-row-reverse">
          {/* Image Carousel - Right Side */}
          <div className="relative w-full md:w-1/2">
            <div className="h-80 md:h-[500px] transition-all duration-1000 overflow-hidden shadow-xl">
              {thalionImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentThalionIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thalasso ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => {
                      navigate("/thalion");
                      window.scrollTo(0, 0);
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigateCarousel("thalion", "prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateCarousel("thalion", "next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
              {thalionImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentThalionIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentThalionIndex
                      ? "bg-amber-300 w-4"
                      : "bg-white/60"
                  } hover:bg-amber-200`}
                />
              ))}
            </div>
          </div>

          {/* Text Content - Left Side */}
          <div className="hidden md:flex flex-col justify-center px-10 lg:px-16 w-1/2">
            <h2
              className="text-3xl lg:text-4xl font-light text-stone-700 mb-8 animate-fadeIn cursor-pointer hover:text-amber-600 transition-colors duration-200"
              onClick={() => {
                navigate("/thalion");
                window.scrollTo(0, 0);
              }}
            >
              <span className="font-['Playfair_Display'] italic tracking-tight">
                {t("testimonial.thalion.title")}
              </span>
              <br />
              <span className="font-['Cormorant_Garamond'] font-medium tracking-wider text-stone-600">
                {t("testimonial.thalion.subtitle")}
              </span>
            </h2>

            <div className="space-y-5 text-stone-600 mb-10">
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.thalion.paragraphs.p1")}
              </p>
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.thalion.paragraphs.p2")}
              </p>
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.thalion.paragraphs.p3")}
              </p>
              <div className="flex justify-center">
                <button
                  className="mt-3 px-6 py-1.5 border-2 border-stone-700 rounded-full bg-transparent text-stone-700 hover:bg-stone-700 hover:text-white transition-all duration-200 font-['Playfair_Display'] flex items-center gap-1 shadow-none uppercase tracking-wide text-sm font-semibold"
                  style={{ letterSpacing: "0.04em", boxShadow: "none" }}
                  onClick={() => {
                    navigate("/thalion");
                    window.scrollTo(0, 0);
                  }}
                >
                  <span className="">{t('cta.access')}</span>
                  <span className="ml-1">{t("header.navigation.thalion.title")}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            {/* See More Icon for Desktop removed */}
          </div>
        </div>

        {/* Mobile text content */}
        <div className="md:hidden px-6 pt-10">
          <h2
            className="text-2xl font-light text-stone-700 mb-8 cursor-pointer hover:text-amber-600 transition-colors duration-200"
            onClick={() => {
              navigate("/thalion");
              window.scrollTo(0, 0);
            }}
          >
            <span className="font-['Playfair_Display'] italic">
              {t("testimonial.thalion.title")}
            </span>
            <br />
            <span className="font-['Cormorant_Garamond'] font-medium tracking-wider text-stone-600">
              {t("testimonial.thalion.subtitle")}
            </span>
          </h2>

          <div className="space-y-5 text-stone-600 mb-8">
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.thalion.paragraphs.p1")}
            </p>
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.thalion.paragraphs.p2")}
            </p>
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.thalion.paragraphs.p3")}
            </p>
            <div className="flex justify-center">
                <button
                className="mt-3 px-6 py-1.5 border-2 border-stone-700 rounded-full bg-transparent text-stone-700 hover:bg-stone-700 hover:text-white transition-all duration-200 font-['Playfair_Display'] flex items-center gap-1 shadow-none uppercase tracking-wide text-sm font-semibold"
                style={{ letterSpacing: "0.04em", boxShadow: "none" }}
                onClick={() => {
                  navigate("/thalion");
                  window.scrollTo(0, 0);
                }}
              >
                <span className="">{t('cta.access')}</span>
                <span className="ml-1">{t("header.navigation.thalion.title")}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Mobile see-more icon removed */}
        </div>
      </div>{" "}
      {/* ERIC ZEMMOUR Section */}
      <div className="py-16 border-t border-stone-200">
        <div className="flex">
          {/* Image Carousel - Left Side */}
          <div className="relative w-full md:w-1/2">
            <div className="h-80 md:h-[500px] transition-all duration-1000 overflow-hidden shadow-xl">
              {ericZemmourImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentEricZemmourIndex
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Salon Eric Zemmour ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => {
                      navigate("/erich-zemmour");
                      window.scrollTo(0, 0);
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigateCarousel("ericZemmour", "prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateCarousel("ericZemmour", "next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
              {ericZemmourImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEricZemmourIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentEricZemmourIndex
                      ? "bg-amber-300 w-4"
                      : "bg-white/60"
                  } hover:bg-amber-200`}
                />
              ))}
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="hidden md:flex flex-col justify-center px-10 lg:px-16 w-1/2">
            <h2
              className="text-3xl lg:text-4xl font-light text-stone-700 mb-8 animate-fadeIn cursor-pointer hover:text-amber-600 transition-colors duration-200"
              onClick={() => {
                navigate("/erich-zemmour");
                window.scrollTo(0, 0);
              }}
            >
              <span className="font-['Playfair_Display'] italic tracking-tight">
                {t("testimonial.ericZemmour.title")}
              </span>
              <br />
              <span className="font-['Cormorant_Garamond'] font-medium tracking-wider text-stone-600">
                {t("testimonial.ericZemmour.subtitle")}
              </span>
            </h2>

            <div className="space-y-5 text-stone-600 mb-10">
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.ericZemmour.paragraphs.p1")}
              </p>
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.ericZemmour.paragraphs.p2")}
              </p>
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.ericZemmour.paragraphs.p3")}
              </p>
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.ericZemmour.paragraphs.p4")}
                <br />
                {t("testimonial.ericZemmour.paragraphs.phone")}
              </p>
              <div className="flex justify-center">
                <button
                  className="mt-3 px-6 py-1.5 border-2 border-stone-700 rounded-full bg-transparent text-stone-700 hover:bg-stone-700 hover:text-white transition-all duration-200 font-['Playfair_Display'] flex items-center gap-1 shadow-none uppercase tracking-wide text-sm font-semibold"
                  style={{ letterSpacing: "0.04em", boxShadow: "none" }}
                  onClick={() => {
                    navigate("/erich-zemmour");
                    window.scrollTo(0, 0);
                  }}
                >
                  <span className="">{t('cta.access')}</span>
                  <span className="ml-1">{t("header.navigation.erichZemmour.title")}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            {/* See More Icon for Desktop removed */}
          </div>
        </div>

        {/* Mobile text content */}
        <div className="md:hidden px-6 pt-10">
          <h2
            className="text-2xl font-light text-stone-700 mb-8 cursor-pointer hover:text-amber-600 transition-colors duration-200"
            onClick={() => {
              navigate("/erich-zemmour");
              window.scrollTo(0, 0);
            }}
          >
            <span className="font-['Playfair_Display'] italic">
              {t("testimonial.ericZemmour.title")}
            </span>
            <br />
            <span className="font-['Cormorant_Garamond'] font-medium tracking-wider text-stone-600">
              {t("testimonial.ericZemmour.subtitle")}
            </span>
          </h2>

          <div className="space-y-5 text-stone-600 mb-8">
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.ericZemmour.paragraphs.p1Mobile")}
            </p>
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.ericZemmour.paragraphs.p2")}
            </p>
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.ericZemmour.paragraphs.p3")}
            </p>
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.ericZemmour.paragraphs.p4Mobile")}
              <br />
              {t("testimonial.ericZemmour.paragraphs.phoneMobile")}
            </p>
            <div className="flex justify-center">
              <button
                className="mt-3 px-6 py-1.5 border-2 border-stone-700 rounded-full bg-transparent text-stone-700 hover:bg-stone-700 hover:text-white transition-all duration-200 font-['Playfair_Display'] flex items-center gap-1 shadow-none uppercase tracking-wide text-sm font-semibold"
                style={{ letterSpacing: "0.04em", boxShadow: "none" }}
                onClick={() => {
                  navigate("/erich-zemmour");
                  window.scrollTo(0, 0);
                }}
              >
                <span className="">{t('cta.access')}</span>
                <span className="ml-1">{t("header.navigation.erichZemmour.title")}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Mobile see-more icon removed */}
        </div>
      </div>
      {/* L'USINE Section */}
      <div className="py-16 border-t border-stone-200">
        <div className="flex flex-col md:flex-row-reverse">
          {/* Image Carousel - Right Side */}
          <div className="relative w-full md:w-1/2">
            <div className="h-80 md:h-[500px] transition-all duration-1000 overflow-hidden shadow-xl">
              {usineImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentUsineIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image}
                    alt={`L'Usine ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => {
                      navigate("/usine");
                      window.scrollTo(0, 0);
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigateCarousel("usine", "prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateCarousel("usine", "next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
              {usineImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentUsineIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentUsineIndex
                      ? "bg-amber-300 w-4"
                      : "bg-white/60"
                  } hover:bg-amber-200`}
                />
              ))}
            </div>
          </div>

          {/* Text Content - Left Side */}
          <div className="hidden md:flex flex-col justify-center px-10 lg:px-16 w-1/2">
            <h2
              className="text-3xl lg:text-4xl font-light text-stone-700 mb-8 animate-fadeIn cursor-pointer hover:text-amber-600 transition-colors duration-200"
              onClick={() => {
                navigate("/usine");
                window.scrollTo(0, 0);
              }}
            >
              <span className="font-['Playfair_Display'] italic tracking-tight">
                {t("testimonial.usine.title")}
              </span>
              <br />
              <span className="font-['Cormorant_Garamond'] font-medium tracking-wider text-stone-600">
                {t("testimonial.usine.subtitle")}
              </span>
            </h2>

            <div className="space-y-5 text-stone-600 mb-10">
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.usine.paragraphs.p1")}
              </p>
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.usine.paragraphs.p2")}
              </p>
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.usine.paragraphs.p3")}
              </p>
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.usine.paragraphs.p4")}
              </p>
              <div className="flex justify-center">
                <button
                  className="mt-3 px-6 py-1.5 border-2 border-stone-700 rounded-full bg-transparent text-stone-700 hover:bg-stone-700 hover:text-white transition-all duration-200 font-['Playfair_Display'] flex items-center gap-1 shadow-none uppercase tracking-wide text-sm font-semibold"
                  style={{ letterSpacing: "0.04em", boxShadow: "none" }}
                  onClick={() => {
                    navigate("/usine");
                    window.scrollTo(0, 0);
                  }}
                >
                  <span className="">{t('cta.access')}</span>
                  <span className="ml-1">{t("header.navigation.usine.title")}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            {/* See More Icon for Desktop removed */}
          </div>
        </div>

        {/* Mobile text content */}
        <div className="md:hidden px-6 pt-10">
          <h2
            className="text-2xl font-light text-stone-700 mb-8 cursor-pointer hover:text-amber-600 transition-colors duration-200"
            onClick={() => {
              navigate("/usine");
              window.scrollTo(0, 0);
            }}
          >
            <span className="font-['Playfair_Display'] italic">
              {t("testimonial.usine.title")}
            </span>
            <br />
            <span className="font-['Cormorant_Garamond'] font-medium tracking-wider text-stone-600">
              {t("testimonial.usine.subtitle")}
            </span>
          </h2>

          <div className="space-y-5 text-stone-600 mb-8">
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.usine.paragraphs.p1")}
            </p>
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.usine.paragraphs.p2")}
            </p>
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.usine.paragraphs.p3")}
            </p>
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.usine.paragraphs.p4")}
            </p>
            <div className="flex justify-center">
              <button
                className="mt-3 px-6 py-1.5 border-2 border-stone-700 rounded-full bg-transparent text-stone-700 hover:bg-stone-700 hover:text-white transition-all duration-200 font-['Playfair_Display'] flex items-center gap-1 shadow-none uppercase tracking-wide text-sm font-semibold"
                style={{ letterSpacing: "0.04em", boxShadow: "none" }}
                onClick={() => {
                  navigate("/usine");
                  window.scrollTo(0, 0);
                }}
              >
                <span className="">{t('cta.access')}</span>
                <span className="ml-1">{t("header.navigation.usine.title")}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Mobile see-more icon removed */}
        </div>
      </div>
      {/* CARRÉ VIP SUITES SPA Section */}
      <div className="py-16 border-t border-stone-200">
        <div className="flex">
          {/* Image Carousel - Left Side */}
          <div className="relative w-full md:w-1/2">
            <div className="h-80 md:h-[500px] transition-all duration-1000 overflow-hidden shadow-xl">
              {vipSuitesImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentVipSuitesIndex
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Carré VIP Suites Spa ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => {
                      navigate("/suite");
                      window.scrollTo(0, 0);
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigateCarousel("vipSuites", "prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateCarousel("vipSuites", "next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
              {vipSuitesImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVipSuitesIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentVipSuitesIndex
                      ? "bg-amber-300 w-4"
                      : "bg-white/60"
                  } hover:bg-amber-200`}
                />
              ))}
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="hidden md:flex flex-col justify-center px-10 lg:px-16 w-1/2">
            <h2
              className="text-3xl lg:text-4xl font-light text-stone-700 mb-8 animate-fadeIn cursor-pointer hover:text-amber-600 transition-colors duration-200"
              onClick={() => {
                navigate("/suite");
                window.scrollTo(0, 0);
              }}
            >
              <span className="font-['Playfair_Display'] italic tracking-tight">
                {t("testimonial.carreVip.title")}
              </span>
              <br />
              <span className="font-['Cormorant_Garamond'] font-medium tracking-wider text-stone-600">
                {t("testimonial.carreVip.subtitle")}
              </span>
            </h2>

            <div className="space-y-5 text-stone-600 mb-10">
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.carreVip.paragraphs.p1")}
              </p>
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.carreVip.paragraphs.p2")}
              </p>
              <p className="font-['Cormorant_Garamond'] text-lg leading-relaxed transition-all duration-500 hover:text-stone-800 hover:pl-2">
                {t("testimonial.carreVip.paragraphs.p3")}
              </p>
              <div className="flex justify-center">
                <button
                  className="mt-3 px-6 py-1.5 border-2 border-stone-700 rounded-full bg-transparent text-stone-700 hover:bg-stone-700 hover:text-white transition-all duration-200 font-['Playfair_Display'] flex items-center gap-1 shadow-none uppercase tracking-wide text-sm font-semibold"
                  style={{ letterSpacing: "0.04em", boxShadow: "none" }}
                  onClick={() => {
                    navigate("/suite");
                    window.scrollTo(0, 0);
                  }}
                >
                  <span className="">{t('cta.access')}</span>
                  <span className="ml-1">{t("header.navigation.carreVip.title")}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            {/* See More Icon for Desktop removed */}
          </div>
        </div>

        {/* Mobile text content */}
        <div className="md:hidden px-6 pt-10">
          <h2
            className="text-2xl font-light text-stone-700 mb-8 cursor-pointer hover:text-amber-600 transition-colors duration-200"
            onClick={() => {
              navigate("/suite");
              window.scrollTo(0, 0);
            }}
          >
            <span className="font-['Playfair_Display'] italic">
              {t("testimonial.carreVip.title")}
            </span>
            <br />
            <span className="font-['Cormorant_Garamond'] font-medium tracking-wider text-stone-600">
              {t("testimonial.carreVip.subtitle")}
            </span>
          </h2>

          <div className="space-y-5 text-stone-600 mb-8">
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.carreVip.paragraphs.p1")}
            </p>
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.carreVip.paragraphs.p2")}
            </p>
            <p className="font-['Cormorant_Garamond'] leading-relaxed">
              {t("testimonial.carreVip.paragraphs.p3")}
            </p>
            <div className="flex justify-center">
              <button
                className="mt-3 px-6 py-1.5 border-2 border-stone-700 rounded-full bg-transparent text-stone-700 hover:bg-stone-700 hover:text-white transition-all duration-200 font-['Playfair_Display'] flex items-center gap-1 shadow-none uppercase tracking-wide text-sm font-semibold"
                style={{ letterSpacing: "0.04em", boxShadow: "none" }}
                onClick={() => {
                  navigate("/suite");
                  window.scrollTo(0, 0);
                }}
              >
                <span className="">{t('cta.access')}</span>
                <span className="ml-1">{t("header.navigation.carreVip.title")}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Mobile see-more icon removed */}
        </div>
      </div>
      {/* Global styles */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@400;500;700&display=swap");

        .animate-fadeIn {
          animation: fadeIn 1.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
