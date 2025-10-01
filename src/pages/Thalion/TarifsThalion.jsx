import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

// Import all images (you'll need to add these)
import orientalIcon from "./BrochureSections/assets/file (6).png";
import atlantiqueIcon from "./BrochureSections/assets/file (7).png";
import asiatiqueIcon from "./BrochureSections/assets/file (9).png";
import polynesienneIcon from "./BrochureSections/assets/file (10).png";
import amazonienneIcon from "./BrochureSections/assets/file (11).png";

import orientalImage from "./BrochureSections/assets/B1.JPG";
import atlantiqueImage from "./BrochureSections/assets/B2.JPG";
import asiatiqueImage from "./BrochureSections/assets/B3.JPG";
import polynesienneImage from "./BrochureSections/assets/B4.JPG";
import amazonienneImage from "./BrochureSections/assets/B5.JPG";

const TarifsThalion = ({ selectedRituel, language = "fr" }) => {
  const [activeRituel, setActiveRituel] = useState(
    selectedRituel || "oriental"
  );
  const [imageLoaded, setImageLoaded] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Translation object
  const translations = {
    fr: {
      // Ritual names
      orientalName: "Itinéraire Oriental Détoxifiant",
      orientalShort: "Oriental Détoxifiant",
      atlantiqueName: "Plongée Atlantique Revitalisante",
      atlantiqueShort: "Atlantique Revitalisante",
      asiatiqueName: "Échappée Asiatique Apaisante",
      asiatiqueShort: "Asiatique Apaisante",
      polynesienneName: "Évasion Polynésienne Relaxante",
      polynesienneShort: "Polynésienne Relaxante",
      amazonienneName: "Escapade Amazonienne Énergisante",
      amazonienneShort: "Amazonienne Énergisante",

      // Pricing disclaimer
      pricingDisclaimer:
        "Les tarifs en euros sont donnés seulement à titre indicatif",
    },
    en: {
      // Ritual names
      orientalName: "Oriental Detoxifying Journey",
      orientalShort: "Oriental Detox",
      atlantiqueName: "Atlantic Revitalizing Dive",
      atlantiqueShort: "Atlantic Revitalizing",
      asiatiqueName: "Asian Soothing Escape",
      asiatiqueShort: "Asian Soothing",
      polynesienneName: "Polynesian Relaxing Getaway",
      polynesienneShort: "Polynesian Relaxing",
      amazonienneName: "Amazonian Energizing Escapade",
      amazonienneShort: "Amazonian Energizing",

      // Pricing disclaimer
      pricingDisclaimer:
        "Prices in euros are given for indicative purposes only",
    },
  };

  // Get current translations
  const t = translations[language];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mise à jour quand selectedRituel change
  useEffect(() => {
    if (selectedRituel) {
      setActiveRituel(selectedRituel);
    }
  }, [selectedRituel]);

  // Preload images
  useEffect(() => {
    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setImageLoaded((prev) => ({ ...prev, [src]: true }));
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src;
      });
    };

    if (activeRituel && rituels[activeRituel]?.image) {
      preloadImage(rituels[activeRituel].image);
    }
  }, [activeRituel]);

  const rituels = {
    oriental: {
      name: t.orientalName,
      shortName: t.orientalShort,
      description:
        "Une douce exfoliation suivie d'un enveloppement pour purifier la peau en profondeur, drainer et libérer les toxines. L'itinéraire se poursuit par un massage d'une heure, ferme et rythmé qui améliore la circulation et procure une sensation de légèreté.",
      prix: "314 TND / 94 €",
      duree: "100 min",
      iconPath: orientalIcon,
      image: orientalImage,
      titleColor: "#F7C570",
      themeColor: "rgb(247, 197, 112)",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      treatments: [
        { name: "Gommage Exfoliant Vent de Sable", duration: "25mn" },
        { name: "Enveloppement Épices et Algues", duration: "25mn" },
        { name: "Modelage Océan de Soleil", duration: "50mn" },
      ],
    },
    atlantique: {
      name: t.atlantiqueName,
      shortName: t.atlantiqueShort,
      description:
        "Revitalisez votre corps avec les bienfaits de l'océan. Le rituel débute par un gommage aux paillettes d'algues, pour oxygéner et recharger le corps en minéraux.",
      prix: "314 TND / 94 €",
      duree: "100 min",
      iconPath: atlantiqueIcon,
      image: atlantiqueImage,
      titleColor: "#949508",
      themeColor: "rgb(148, 149, 8)",
      bgColor: "bg-gradient-to-br from-lime-50 to-yellow-50",
      treatments: [
        { name: "Gommage aux paillettes d'Algues", duration: "25mn" },
        { name: "Enveloppement Iodée", duration: "25mn" },
        { name: "Massage Revitalisant", duration: "50mn" },
      ],
    },
    asiatique: {
      name: t.asiatiqueName,
      shortName: t.asiatiqueShort,
      description:
        "Retrouvez la sérénité avec cette échappée apaisante. Association de riz et de fruits exotiques, le peeling lisse et adoucit la peau.",
      prix: "314 TND / 94 €",
      duree: "100 min",
      iconPath: asiatiqueIcon,
      image: asiatiqueImage,
      titleColor: "#B1DED2",
      themeColor: "rgb(177, 222, 210)",
      bgColor: "bg-gradient-to-br from-teal-50 to-green-50",
      treatments: [
        { name: "Gommage aux Riz et de Fruits Exotiques", duration: "25mn" },
        { name: "Enveloppement ou Bain", duration: "25mn" },
        { name: "Massage Harmonisant", duration: "50mn" },
      ],
    },
    polynesienne: {
      name: t.polynesienneName,
      shortName: t.polynesienneShort,
      description:
        "Évadez-vous vers les îles paradisiaques. Tout commence par une exfoliation à la pulpe de coco. Plongez ensuite au cœur du lagon pour un enveloppement cocon.",
      prix: "314 TND / 94 €",
      duree: "100 min",
      iconPath: polynesienneIcon,
      image: polynesienneImage,
      titleColor: "#45C1E0",
      themeColor: "rgb(69, 193, 224)",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
      treatments: [
        { name: "Gommage exfoliant Tentation Cristalline", duration: "25mn" },
        { name: "Enveloppement Transparence d'Attol", duration: "25mn" },
        { name: "Massage polynésienne", duration: "50mn" },
      ],
    },
    amazonienne: {
      name: t.amazonienneName,
      shortName: t.amazonienneShort,
      description:
        "Puisez dans l'énergie de la forêt amazonienne. L'exfoliation du corps est une invitation à changer de peau, à oxygéner votre corps.",
      prix: "314 TND / 94 €",
      duree: "100 min",
      iconPath: amazonienneIcon,
      image: amazonienneImage,
      titleColor: "#ED1A2F",
      themeColor: "rgb(237, 26, 47)",
      bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
      treatments: [
        { name: "Gommage Exfoliant Rouge Corail", duration: "25mn" },
        { name: "Enveloppement Profondeur des Terres", duration: "25mn" },
        { name: "Modelage Onde Boisée", duration: "50mn" },
      ],
    },
  };

  const currentRitual = rituels[activeRituel];

  // Handle image load
  const handleImageLoad = (imageSrc) => {
    setImageLoaded((prev) => ({ ...prev, [imageSrc]: true }));
  };

  if (!currentRitual) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 py-4 sm:py-8 px-3 sm:px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 mb-2 tracking-wide px-2">
            Rituels Thalion
          </h1>

          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mt-3 sm:mt-4"></div>
        </motion.div>

        {/* Ritual Selection */}
        {isMobile ? (
          <div className="mb-6">
            <div
              className="flex gap-3 overflow-x-auto pb-2 px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {Object.entries(rituels).map(([key, ritual]) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveRituel(key)}
                  className={`flex-shrink-0 p-3 rounded-xl border transition-all duration-300 min-w-[140px] ${
                    activeRituel === key
                      ? `${ritual.bgColor} border-stone-300 shadow-lg`
                      : "bg-white border-stone-200"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: ritual.titleColor }}
                  >
                    <img
                      src={ritual.iconPath}
                      alt={ritual.name}
                      className="w-4 h-4 object-contain filter brightness-0 invert"
                      loading="eager"
                    />
                  </div>
                  <h3
                    className="text-xs font-medium text-center leading-tight"
                    style={{ color: ritual.titleColor }}
                  >
                    {ritual.shortName}
                  </h3>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
            {Object.entries(rituels).map(([key, ritual]) => (
              <motion.button
                key={key}
                onClick={() => setActiveRituel(key)}
                className={`p-3 sm:p-4 rounded-2xl border transition-all duration-300 ${
                  activeRituel === key
                    ? `${ritual.bgColor} border-stone-300 shadow-lg scale-105`
                    : "bg-white border-stone-200 hover:border-stone-300 hover:shadow-md"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: ritual.titleColor }}
                >
                  <img
                    src={ritual.iconPath}
                    alt={ritual.name}
                    className="w-4 sm:w-6 h-4 sm:h-6 object-contain filter brightness-0 invert"
                    loading="eager"
                  />
                </div>
                <h3
                  className="text-xs font-medium text-center leading-tight mb-1"
                  style={{ color: ritual.titleColor }}
                >
                  {isMobile ? ritual.shortName : ritual.name}
                </h3>
              </motion.button>
            ))}
          </div>
        )}

        {/* Selected Ritual Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRituel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
          >
            {isMobile ? (
              <div className="flex flex-col">
                {/* Mobile Image Section */}
                <div className="relative h-72 sm:h-80 md:h-96">
                  {!imageLoaded[currentRitual.image] && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backgroundColor: `${currentRitual.titleColor}20`,
                      }}
                    >
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-600"></div>
                    </div>
                  )}
                  <img
                    src={currentRitual.image}
                    alt={currentRitual.name}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imageLoaded[currentRitual.image]
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(currentRitual.image)}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(to bottom right, ${currentRitual.themeColor}, transparent)`,
                    }}
                  ></div>
                  <div className="absolute top-3 left-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: currentRitual.titleColor }}
                    >
                      <img
                        src={currentRitual.iconPath}
                        alt={currentRitual.name}
                        className="w-5 h-5 object-contain filter brightness-0 invert"
                        loading="eager"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-stone-600" />
                      <span className="text-xs font-medium text-stone-800">
                        {currentRitual.duree}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Content Section */}
                <div className="p-4 sm:p-6">
                  <div className="mb-4">
                    <h2
                      className="text-xl sm:text-2xl font-light mb-1 leading-tight"
                      style={{ color: currentRitual.titleColor }}
                    >
                      {currentRitual.name}
                    </h2>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-stone-500" />
                        <span className="text-sm text-stone-600">
                          {currentRitual.duree}
                        </span>
                      </div>
                      <div
                        className="text-xl font-light"
                        style={{ color: currentRitual.titleColor }}
                      >
                        {currentRitual.prix}
                      </div>
                    </div>
                  </div>

                  <p className="text-stone-700 leading-relaxed mb-6 text-sm">
                    {currentRitual.description}
                  </p>

                  {/* Treatment Steps */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 text-stone-800">
                      Programme des soins
                    </h3>
                    <div className="space-y-3">
                      {currentRitual.treatments.map((treatment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg"
                          style={{
                            backgroundColor: `${currentRitual.titleColor}10`,
                            borderLeft: `3px solid ${currentRitual.titleColor}`,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                backgroundColor: currentRitual.titleColor,
                              }}
                            >
                              {index + 1}
                            </div>
                            <span className="text-sm font-medium text-stone-800">
                              {treatment.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-stone-600 font-medium">
                            <Clock className="w-3 h-3" />
                            <span>{treatment.duration.replace("mn", "")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    className="w-full text-white py-3 px-6 rounded-full font-medium shadow-lg transition-all duration-300 text-center text-sm"
                    style={{
                      background: `linear-gradient(to right, ${currentRitual.titleColor}, ${currentRitual.titleColor}dd)`,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = `linear-gradient(to right, ${currentRitual.titleColor}dd, ${currentRitual.titleColor}bb)`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `linear-gradient(to right, ${currentRitual.titleColor}, ${currentRitual.titleColor}dd)`;
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Réserver
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-0">
                {/* Desktop Image Section */}
                <div className="relative h-96 md:h-[600px] lg:h-[700px] xl:h-[800px]">
                  {!imageLoaded[currentRitual.image] && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backgroundColor: `${currentRitual.titleColor}20`,
                      }}
                    >
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-600"></div>
                    </div>
                  )}
                  <img
                    src={currentRitual.image}
                    alt={currentRitual.name}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imageLoaded[currentRitual.image]
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(currentRitual.image)}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(to bottom right, ${currentRitual.themeColor}, transparent)`,
                    }}
                  ></div>
                  <div className="absolute top-4 left-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: currentRitual.titleColor }}
                    >
                      <img
                        src={currentRitual.iconPath}
                        alt={currentRitual.name}
                        className="w-7 h-7 object-contain filter brightness-0 invert"
                        loading="eager"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-stone-600" />
                      <span className="text-sm font-medium text-stone-800">
                        {currentRitual.duree}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Content Section */}
                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <h2
                      className="text-2xl md:text-3xl font-light mb-2 leading-tight"
                      style={{ color: currentRitual.titleColor }}
                    >
                      {currentRitual.name}
                    </h2>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-stone-500" />
                        <span className="text-sm text-stone-600">
                          {currentRitual.duree}
                        </span>
                      </div>
                      <div
                        className="text-2xl font-light"
                        style={{ color: currentRitual.titleColor }}
                      >
                        {currentRitual.prix}
                      </div>
                    </div>
                  </div>

                  <p className="text-stone-700 leading-relaxed mb-8 text-sm md:text-base">
                    {currentRitual.description}
                  </p>

                  {/* Treatment Steps - Desktop */}
                  <div className="mb-8">
                    <h3 className="text-xl font-medium mb-6 text-stone-800">
                      Programme des soins
                    </h3>
                    <div className="space-y-4">
                      {currentRitual.treatments.map((treatment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-xl"
                          style={{
                            backgroundColor: `${currentRitual.titleColor}10`,
                            borderLeft: `4px solid ${currentRitual.titleColor}`,
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md"
                              style={{
                                backgroundColor: currentRitual.titleColor,
                              }}
                            >
                              {index + 1}
                            </div>
                            <span className="text-base font-medium text-stone-800">
                              {treatment.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-stone-600 font-medium">
                            <Clock className="w-4 h-4" />
                            <span>{treatment.duration.replace("mn", "")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    className="text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                    style={{
                      background: `linear-gradient(to right, ${currentRitual.titleColor}, ${currentRitual.titleColor}dd)`,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = `linear-gradient(to right, ${currentRitual.titleColor}dd, ${currentRitual.titleColor}bb)`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `linear-gradient(to right, ${currentRitual.titleColor}, ${currentRitual.titleColor}dd)`;
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Réserver
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <div className="text-center mt-8 mb-6">
        <p className="text-sm text-stone-500 italic">{t.pricingDisclaimer}</p>
      </div>

      {/* Hidden preload images for faster switching */}
      <div className="hidden">
        {Object.values(rituels).map((ritual) => (
          <img
            key={ritual.name}
            src={ritual.image}
            alt=""
            onLoad={() => handleImageLoad(ritual.image)}
          />
        ))}
      </div>
    </div>
  );
};

export default TarifsThalion;
