import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Heart,
  Zap,
  Users,
  Clock,
  Target,
} from "lucide-react";

// Import all activity images
import AttackImage from "../assets/1.jpg";
import BoxeImage from "../assets/2.JPG";
import CombatImage from "../assets/3.webp";
import CrossTrainingImage from "../assets/4.JPG";
import StepImage from "../assets/5.JPG";
import PilatesImage from "../assets/6.JPG";
import PumpImage from "../assets/7.webp";
import SpinningImage from "../assets/8.JPG";
import TaeboImage from "../assets/9.jpg";
import TRXImage from "../assets/10.JPG";
import YogaImage from "../assets/11.JPG";
import DanseOrientaleImage from "../assets/12.JPG";
import BachataImage from "../assets/13.JPG";
import GroupTrainingImage from "../assets/14.JPG";
import PersonalTrainingImage from "../assets/15.JPG";

const ActiviteUsine = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const activities = [
    {
      id: 1,
      name: t("usine.activite.activities.attack.name"),
      description: t("usine.activite.activities.attack.description"),
      icon: <Zap className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.high"),
      duration: "45min",
      color: "from-red-500 to-orange-500",
      image: AttackImage,
    },
    {
      id: 2,
      name: t("usine.activite.activities.boxe.name"),
      description: t("usine.activite.activities.boxe.description"),
      icon: <Target className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.high"),
      duration: "50min",
      color: "from-purple-500 to-pink-500",
      image: BoxeImage,
    },
    {
      id: 3,
      name: t("usine.activite.activities.combat.name"),
      description: t("usine.activite.activities.combat.description"),
      icon: <Dumbbell className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.high"),
      duration: "45min",
      color: "from-blue-500 to-cyan-500",
      image: CombatImage,
    },
    {
      id: 4,
      name: t("usine.activite.activities.crossTraining.name"),
      description: t("usine.activite.activities.crossTraining.description"),
      icon: <Heart className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.high"),
      duration: "30min",
      color: "from-green-500 to-teal-500",
      image: CrossTrainingImage,
    },
    {
      id: 5,
      name: t("usine.activite.activities.step.name"),
      description: t("usine.activite.activities.step.description"),
      icon: <Users className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.moderate"),
      duration: "45min",
      color: "from-yellow-500 to-orange-500",
      image: StepImage,
    },
    {
      id: 6,
      name: t("usine.activite.activities.pilates.name"),
      description: t("usine.activite.activities.pilates.description"),
      icon: <Heart className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.moderate"),
      duration: "60min",
      color: "from-indigo-500 to-purple-500",
      image: PilatesImage,
    },
    {
      id: 7,
      name: t("usine.activite.activities.pump.name"),
      description: t("usine.activite.activities.pump.description"),
      icon: <Dumbbell className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.high"),
      duration: "45min",
      color: "from-red-500 to-pink-500",
      image: PumpImage,
    },
    {
      id: 8,
      name: t("usine.activite.activities.spinning.name"),
      description: t("usine.activite.activities.spinning.description"),
      icon: <Zap className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.high"),
      duration: "45min",
      color: "from-cyan-500 to-blue-500",
      image: SpinningImage,
    },
    {
      id: 9,
      name: t("usine.activite.activities.taebo.name"),
      description: t("usine.activite.activities.taebo.description"),
      icon: <Target className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.high"),
      duration: "50min",
      color: "from-orange-500 to-red-500",
      image: TaeboImage,
    },
    {
      id: 10,
      name: t("usine.activite.activities.trx.name"),
      description: t("usine.activite.activities.trx.description"),
      icon: <Users className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.high"),
      duration: "45min",
      color: "from-teal-500 to-green-500",
      image: TRXImage,
    },
    {
      id: 11,
      name: t("usine.activite.activities.yoga.name"),
      description: t("usine.activite.activities.yoga.description"),
      icon: <Heart className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.low"),
      duration: "60min",
      color: "from-purple-500 to-indigo-500",
      image: YogaImage,
    },
    {
      id: 12,
      name: t("usine.activite.activities.danseOrientale.name"),
      description: t("usine.activite.activities.danseOrientale.description"),
      icon: <Users className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.moderate"),
      duration: "60min",
      color: "from-pink-500 to-purple-500",
      image: DanseOrientaleImage,
    },
    {
      id: 13,
      name: t("usine.activite.activities.bachata.name"),
      description: t("usine.activite.activities.bachata.description"),
      icon: <Heart className="w-8 h-8" />,
      intensity: t("usine.activite.intensity.moderate"),
      duration: "60min",
      color: "from-rose-500 to-pink-500",
      image: BachataImage,
    },
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 320; // card width + gap
    const scrollAmount = cardWidth * 2; // scroll 2 cards at a time

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollButtons);
    // Initial check
    checkScrollButtons();

    return () => container.removeEventListener("scroll", checkScrollButtons);
  }, []);

  const getIntensityColor = (intensity) => {
    const highIntensity = t("usine.activite.intensity.high");
    const moderateIntensity = t("usine.activite.intensity.moderate");
    const lowIntensity = t("usine.activite.intensity.low");
    
    switch (intensity) {
      case highIntensity:
        return "text-red-400 bg-red-900/20";
      case moderateIntensity:
        return "text-yellow-400 bg-yellow-900/20";
      case lowIntensity:
        return "text-green-400 bg-green-900/20";
      default:
        return "text-gray-400 bg-gray-900/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {t("usine.activite.header.title")}{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {t("usine.activite.header.titleHighlight")}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("usine.activite.header.subtitle")}
          </p>
        </div>
      </div>

      {/* Activities Section */}
      <div className="container mx-auto px-4 py-12 relative">
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-3 rounded-full border-2 transition-all duration-300 ${
              canScrollLeft
                ? "bg-amber-500 border-amber-500 text-black hover:bg-amber-400 hover:scale-110 shadow-lg shadow-amber-500/25"
                : "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
            }`}
            aria-label={t("usine.activite.navigation.scrollLeft")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              {t("usine.activite.navigation.scrollHelper")}
            </p>
          </div>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-3 rounded-full border-2 transition-all duration-300 ${
              canScrollRight
                ? "bg-amber-500 border-amber-500 text-black hover:bg-amber-400 hover:scale-110 shadow-lg shadow-amber-500/25"
                : "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
            }`}
            aria-label={t("usine.activite.navigation.scrollRight")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex-none w-80 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10">
                {/* Image Header */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 text-white">
                    {activity.icon}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white tracking-wide">
                      {activity.name}
                    </h3>
                  </div>

                  {/* Intensity Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getIntensityColor(
                        activity.intensity
                      )}`}
                    >
                      {activity.intensity}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-300 leading-relaxed text-sm line-clamp-4 group-hover:text-gray-200 transition-colors">
                    {activity.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center pt-4 border-t border-gray-700/50">
                    <div className="flex items-center space-x-2 text-amber-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {activity.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[...Array(Math.ceil(activities.length / 3))].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gray-600 rounded-full transition-colors duration-300 hover:bg-amber-500"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Group Training Section with Image */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8 p-6">
          <div className="md:w-1/2">
            <img
              src={GroupTrainingImage}
              alt="Group Training"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-amber-400 mb-6">
              {t("usine.activite.groupTraining.title")}
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p className="text-justify">
                {t("usine.activite.groupTraining.description1")}
              </p>
              <p className="text-justify">
                {t("usine.activite.groupTraining.description2")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Training Section with Image */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 p-6">
          <div className="md:w-1/2">
            <img
              src={PersonalTrainingImage}
              alt="Personal Training"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-amber-400 mb-6">
              {t("usine.activite.personalTraining.title")}
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p className="text-justify">
                {t("usine.activite.personalTraining.description1")}
              </p>
              <p className="text-justify">
                {t("usine.activite.personalTraining.description2")}
              </p>
            </div>
          </div>
        </div>
      </div>

  <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ActiviteUsine;
