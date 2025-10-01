import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import thalion20 from "../assets/Thalasso_Thal20.jpg";
import thalion7 from "../assets/Thalasso_7.jpg";
import thalion14 from "../assets/Thalasso_14.jpg";
import royalElyssa from "../assets/royal_elyssa_thalas.JPG";
import thalion from "../assets/Thalasso_.jpg";
import Salon_de_coiffure_Eric_Zemmour_1 from "../assets/Salon_de_coiffure_Eric_Zemmour/Salon_de_coiffure_Eric_Zemmour_1.jpg";
import Salon_de_coiffure_Eric_Zemmour_2 from "../assets/Salon_de_coiffure_Eric_Zemmour/Salon_de_coiffure_Eric_Zemmour_2.jpg";
import Salon_de_coiffure_Eric_Zemmour_3 from "../assets/Salon_de_coiffure_Eric_Zemmour/Salon_de_coiffure_Eric_Zemmour_3.jpg";
import Club_de_sport_lusine_2 from "../assets/club_de_sport_lusine/Club_de_sport_lusine_2.jpg";
import Club_de_sport_lusine_6 from "../assets/club_de_sport_lusine/Club_de_sport_lusine_6.jpg";
import Photo_35_sur_56 from "../assets/club_de_sport_lusine/Photo__(35_sur_56).jpg";
import Photo_24_sur_56 from "../assets/club_de_sport_lusine/Photo__(24_sur_56).jpg";
import Photo_1_sur_56 from "../assets/club_de_sport_lusine/Photo__(1_sur_56).jpg";
import Photo_13_sur_56 from "../assets/club_de_sport_lusine/Photo__(13_sur_56).jpg";
import Suites_SPA_11 from "../assets/Suites_SPA/Suites_SPA_11.jpg";
import Suites_SPA_10 from "../assets/Suites_SPA/Suites_SPA_10.jpg";
import Suites_SPA_20 from "../assets/Suites_SPA/Suites_SPA_20.jpg";
import Suites_SPA_14 from "../assets/Suites_SPA/Suites_SPA_14.jpg";
import carre_VIP_suite_spa_6 from "../assets/Suites_SPA/carre_VIP_suite_spa_(6).JPG";
import carre_VIP_suite_spa_7 from "../assets/Suites_SPA/carre_VIP_suite_spa_(7).JPG";

const Testimonial = () => {
  const { t } = useTranslation();
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

  const navigate = (section, direction) => {
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
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("thalion", "prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate("thalion", "next")}
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
            <h2 className="text-3xl lg:text-4xl font-light text-stone-700 mb-8 animate-fadeIn">
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
            </div>
          </div>
        </div>

        {/* Mobile text content */}
        <div className="md:hidden px-6 pt-10">
          <h2 className="text-2xl font-light text-stone-700 mb-8">
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
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="group flex items-center px-6 py-3 bg-stone-700 text-amber-50 rounded-sm hover:bg-amber-700 transition-all duration-300 font-['Cormorant_Garamond']"
            >
              <span>{t("testimonial.thalion.buttons.learnMore")}</span>
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="group flex items-center px-6 py-3 border border-stone-400 text-stone-700 rounded-sm hover:bg-stone-700 hover:text-amber-50 transition-all duration-300 font-['Cormorant_Garamond']"
            >
              <span>{t("testimonial.thalion.buttons.bookNow")}</span>
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
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
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("ericZemmour", "prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate("ericZemmour", "next")}
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
            <h2 className="text-3xl lg:text-4xl font-light text-stone-700 mb-8 animate-fadeIn">
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
            </div>
          </div>
        </div>

        {/* Mobile text content */}
        <div className="md:hidden px-6 pt-10">
          <h2 className="text-2xl font-light text-stone-700 mb-8">
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
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="group flex items-center px-6 py-3 bg-stone-700 text-amber-50 rounded-sm hover:bg-amber-700 transition-all duration-300 font-['Cormorant_Garamond']"
            >
              <span>
                {t("testimonial.ericZemmour.buttons.discoverServices")}
              </span>
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="group flex items-center px-6 py-3 border border-stone-400 text-stone-700 rounded-sm hover:bg-stone-700 hover:text-amber-50 transition-all duration-300 font-['Cormorant_Garamond']"
            >
              <span>
                {t("testimonial.ericZemmour.buttons.bookAppointment")}
              </span>
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
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
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("usine", "prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate("usine", "next")}
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
            <h2 className="text-3xl lg:text-4xl font-light text-stone-700 mb-8 animate-fadeIn">
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
            </div>
          </div>
        </div>

        {/* Mobile text content */}
        <div className="md:hidden px-6 pt-10">
          <h2 className="text-2xl font-light text-stone-700 mb-8">
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
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="group flex items-center px-6 py-3 bg-stone-700 text-amber-50 rounded-sm hover:bg-amber-700 transition-all duration-300 font-['Cormorant_Garamond']"
            >
              <span>{t("testimonial.usine.buttons.discoverActivities")}</span>
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="group flex items-center px-6 py-3 border border-stone-400 text-stone-700 rounded-sm hover:bg-stone-700 hover:text-amber-50 transition-all duration-300 font-['Cormorant_Garamond']"
            >
              <span>{t("testimonial.usine.buttons.bookSession")}</span>
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
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
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("vipSuites", "prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-amber-100 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate("vipSuites", "next")}
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
            <h2 className="text-3xl lg:text-4xl font-light text-stone-700 mb-8 animate-fadeIn">
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
            </div>
          </div>
        </div>

        {/* Mobile text content */}
        <div className="md:hidden px-6 pt-10">
          <h2 className="text-2xl font-light text-stone-700 mb-8">
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
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="group flex items-center px-6 py-3 bg-stone-700 text-amber-50 rounded-sm hover:bg-amber-700 transition-all duration-300 font-['Cormorant_Garamond']"
            >
              <span>{t("testimonial.carreVip.buttons.discoverSuites")}</span>
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="group flex items-center px-6 py-3 border border-stone-400 text-stone-700 rounded-sm hover:bg-stone-700 hover:text-amber-50 transition-all duration-300 font-['Cormorant_Garamond']"
            >
              <span>{t("testimonial.carreVip.buttons.bookSuite")}</span>
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
      {/* Global styles */}
      <style jsx global>{`
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
