import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Clock, Star, ArrowLeft } from "lucide-react";

// Import placeholder images (you'll need to add actual images)
import visageImage from "../pages/Thalion/BrochureSections/assets/NN1.JPG";
import corpsImage from "../pages/Thalion/BrochureSections/assets/NN2.jpg";
import hommeImage from "../pages/Thalion/BrochureSections/assets/NN4.jpg";
import beauteImage from "../assets/Espace_THEMAE_9.jpg";
import specialDosImage from "../assets/Thalasso_14.jpg";
import detoxImage from "../assets/Thalasso_15.jpg";
import keepCoolImage from "../assets/Thalasso_7.jpg";

const CarteSection = () => {
  const [activeMainTab, setActiveMainTab] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Main categories data
  const mainCategories = [
    {
      id: "soins-carte",
      title: "Les soins à la carte",
      subtitle: "Soins personnalisés selon vos besoins",
    },
    {
      id: "carte-marine",
      title: "Carte Marine",
      subtitle: "Bienfaits de la thalassothérapie",
    },
    {
      id: "carte-massages",
      title: "Carte Massages",
      subtitle: "Détente et relaxation profonde",
    },
  ];

  // Subcategories for "Les soins à la carte"
  const soinsCarteCategories = [
    {
      id: "visage",
      title: "VISAGE",
      subtitle: "BEAUTÉ",
      description:
        "CURE QUI ASSOCIE LES BIENFAITS DE LA THALASSO À CEUX DE L'ESTHÉTIQUE",
      image: beauteImage,
      buttonText: "EN SAVOIR +",
      treatments: [
        { name: "Soin Hydratant Marine", duration: "50", price: "85€" },
        { name: "Peeling aux Algues", duration: "40", price: "75€" },
        { name: "Masque Reminéralisant", duration: "30", price: "65€" },
        { name: "Soin Anti-âge Thalasso", duration: "60", price: "95€" },
      ],
    },
    {
      id: "corps",
      title: "CORPS",
      subtitle: "SPÉCIAL DOS",
      description: "TRAITEMENTS CIBLÉS POUR LE BIEN-ÊTRE DU CORPS",
      image: specialDosImage,
      buttonText: "EN SAVOIR +",
      treatments: [
        { name: "Enveloppement Algues", duration: "45", price: "80€" },
        { name: "Gommage Corps Marin", duration: "35", price: "70€" },
        { name: "Massage Drainant", duration: "50", price: "85€" },
        { name: "Soin Cellulite Marine", duration: "55", price: "90€" },
      ],
    },
    {
      id: "homme",
      title: "HOMME",
      subtitle: "DÉTOX",
      description: "SOINS SPÉCIALEMENT CONÇUS POUR LES HOMMES",
      image: detoxImage,
      buttonText: "EN SAVOIR +",
      treatments: [
        { name: "Soin Visage Homme", duration: "45", price: "75€" },
        { name: "Massage Sportif", duration: "50", price: "80€" },
        { name: "Gommage Énergisant", duration: "30", price: "60€" },
        { name: "Soin Après-Rasage", duration: "25", price: "55€" },
      ],
    },
  ];

  const handleMainTabClick = (categoryId) => {
    if (activeMainTab === categoryId) {
      setActiveMainTab(null);
      setSelectedCategory(null);
    } else {
      setActiveMainTab(categoryId);
      if (categoryId === "soins-carte") {
        setSelectedCategory("soins-carte");
      }
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedSubCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedSubCategory(null);
  };

  const renderMainTabs = () => (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
        {mainCategories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => handleMainTabClick(category.id)}
            className={`relative px-6 py-4 text-center transition-all duration-300 ${
              activeMainTab === category.id
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-600 hover:text-amber-500"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-lg md:text-xl font-medium">{category.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{category.subtitle}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderSoinsCarteGrid = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
    >
      {soinsCarteCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative group cursor-pointer"
          onClick={() => handleCategoryClick(category.id)}
        >
          <div className="relative h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <h4 className="text-2xl md:text-3xl font-bold mb-2">
                  {category.title}
                </h4>
                <p className="text-lg font-medium text-amber-300 mb-3">
                  {category.subtitle}
                </p>
                <p className="text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>

                <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/30 hover:border-white/50">
                  {category.buttonText}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderTreatmentDetails = () => {
    const category = soinsCarteCategories.find(
      (cat) => cat.id === selectedSubCategory
    );
    if (!category) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBackToCategories}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          <div className="h-6 w-px bg-gray-300" />
          <h2 className="text-2xl md:text-3xl font-light text-gray-800">
            {category.title}
          </h2>
        </div>

        {/* Category Hero */}
        <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-8">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-start p-8">
            <div className="text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                {category.title}
              </h3>
              <p className="text-xl text-amber-300">{category.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.treatments.map((treatment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-gray-800 flex-1">
                  {treatment.name}
                </h4>
                <div className="text-right">
                  <div className="text-xl font-bold text-amber-600">
                    {treatment.price}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{treatment.duration} minutes</span>
              </div>

              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105">
                Réserver
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-light text-gray-800 mb-4"
          >
            Nos Soins & Cartes
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"
          />
        </div>

        {/* Main Navigation Tabs */}
        {renderMainTabs()}

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeMainTab === "soins-carte" && !selectedSubCategory && (
            <div key="grid">{renderSoinsCarteGrid()}</div>
          )}

          {selectedSubCategory && (
            <div key="details">{renderTreatmentDetails()}</div>
          )}

          {activeMainTab === "carte-marine" && (
            <motion.div
              key="marine"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl text-gray-600">
                Carte Marine - En développement
              </h3>
            </motion.div>
          )}

          {activeMainTab === "carte-massages" && (
            <motion.div
              key="massages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl text-gray-600">
                Carte Massages - En développement
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CarteSection;
