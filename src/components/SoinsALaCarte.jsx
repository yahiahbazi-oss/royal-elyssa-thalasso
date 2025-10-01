import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Droplets,
  Waves,
  Sparkles,
  Heart,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

// Import images
import visageImage from "../assets/Espace_THEMAE_9.jpg";
import corpsImage from "../assets/Thalasso_14.jpg";
import hommeImage from "../assets/Thalasso_15.jpg";
import marineImage from "../assets/Thalasso_7.jpg";
import massageImage from "../assets/Thalasso_Thal'ion_17.jpg";

const SoinsALaCarte = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Main sections data
  const sections = [
    {
      id: "soins-carte",
      title: "Les soins à la carte",
      description: "Soins personnalisés selon vos besoins",
    },
    {
      id: "carte-marine",
      title: "Carte Marine",
      description: "Découvrez nos soins marins d'exception",
    },
    {
      id: "carte-massages",
      title: "Carte Massages",
      description: "Se sentir merveilleusement bien",
    },
  ];

  // Les soins à la carte categories
  const soinsCarteData = {
    categories: [
      {
        id: "visage",
        title: "Visage",
        image: visageImage,
        treatments: [
          {
            name: "Beauté Essentielle",
            count: "2 soins disponibles",
            durations: ["30'", "60'"],
            prices: ["65€", "85€"],
          },
          {
            name: "Beauté des Yeux",
            count: "1 soins disponibles",
            durations: ["30'"],
            prices: ["55€"],
          },
          {
            name: "Eternelle Jeunesse",
            count: "3 soins disponibles",
            durations: ["60'", "60'", "75'"],
            prices: ["95€", "105€", "125€"],
          },
        ],
      },
      {
        id: "corps",
        title: "Corps",
        image: corpsImage,
        treatments: [
          {
            name: "Gommage Marin",
            count: "2 soins disponibles",
            durations: ["40'", "50'"],
            prices: ["70€", "85€"],
          },
          {
            name: "Enveloppement Algues",
            count: "3 soins disponibles",
            durations: ["45'", "60'", "75'"],
            prices: ["80€", "95€", "110€"],
          },
          {
            name: "Modelage Corps",
            count: "2 soins disponibles",
            durations: ["50'", "75'"],
            prices: ["85€", "120€"],
          },
        ],
      },
      {
        id: "homme",
        title: "Homme",
        image: hommeImage,
        treatments: [
          {
            name: "Soin Visage Homme",
            count: "2 soins disponibles",
            durations: ["45'", "60'"],
            prices: ["75€", "90€"],
          },
          {
            name: "Massage Sportif",
            count: "2 soins disponibles",
            durations: ["50'", "75'"],
            prices: ["80€", "110€"],
          },
          {
            name: "Soin Corps Énergisant",
            count: "1 soins disponibles",
            durations: ["60'"],
            prices: ["95€"],
          },
        ],
      },
    ],
  };

  // Carte Marine data
  const carteMarineData = {
    categories: [
      {
        id: "parcours-relaxation",
        title: "Parcours & Relaxation",
        image: marineImage,
        treatments: [
          {
            name: "Parcours Marin",
            count: "4 soins disponibles",
            durations: ["20'", "20' 5 entrées", "20'", "20' 5 entrées"],
            prices: ["25€", "100€", "25€", "100€"],
          },
          {
            name: "Relaxation Marine",
            count: "1 soins disponibles",
            durations: ["20'"],
            prices: ["30€"],
          },
        ],
      },
      {
        id: "douches-bains",
        title: "Douches & Bains",
        image: marineImage,
        treatments: [
          {
            name: "Bain Hydromassant",
            count: "2 soins disponibles",
            durations: ["25'", "40'"],
            prices: ["45€", "65€"],
          },
          {
            name: "Douche à Affusion",
            count: "1 soins disponibles",
            durations: ["20'"],
            prices: ["35€"],
          },
        ],
      },
      {
        id: "massages-affusions",
        title: "Massages & Affusions",
        image: marineImage,
        treatments: [
          {
            name: "Massage Sous Affusion",
            count: "2 soins disponibles",
            durations: ["40'", "60'"],
            prices: ["70€", "95€"],
          },
        ],
      },
      {
        id: "gommages-enveloppements",
        title: "Gommages & Enveloppements",
        image: marineImage,
        treatments: [
          {
            name: "Gommage aux Algues",
            count: "2 soins disponibles",
            durations: ["35'", "50'"],
            prices: ["65€", "85€"],
          },
          {
            name: "Enveloppement Marin",
            count: "3 soins disponibles",
            durations: ["45'", "60'", "75'"],
            prices: ["75€", "95€", "120€"],
          },
        ],
      },
    ],
  };

  // Carte Massages data
  const carteMassagesData = {
    categories: [
      {
        id: "massages-bien-etre",
        title: "Massages & Bien-être",
        image: massageImage,
        treatments: [
          {
            name: "Massages Asiatiques",
            count: "3 soins disponibles",
            durations: ["60'", "60'", "60'"],
            prices: ["85€", "90€", "95€"],
          },
          {
            name: "Massage & Bien-être",
            count: "10 soins disponibles",
            durations: [
              "40'",
              "40'",
              "50'",
              "25'",
              "40'",
              "50'",
              "75'",
              "40'",
              "75'",
              "60'",
            ],
            prices: [
              "70€",
              "65€",
              "80€",
              "45€",
              "70€",
              "85€",
              "120€",
              "70€",
              "115€",
              "90€",
            ],
          },
        ],
      },
      {
        id: "soins-therapies",
        title: "Soins & Thérapies",
        image: massageImage,
        treatments: [
          {
            name: "Thérapie Manuelle",
            count: "3 soins disponibles",
            durations: ["45'", "60'", "75'"],
            prices: ["75€", "95€", "120€"],
          },
        ],
      },
      {
        id: "ceremonie-hammam",
        title: "Cérémonie du Hammam",
        image: massageImage,
        treatments: [
          {
            name: "Rituel Hammam",
            count: "2 soins disponibles",
            durations: ["60'", "90'"],
            prices: ["85€", "125€"],
          },
        ],
      },
    ],
  };

  const getCurrentData = () => {
    switch (activeSection) {
      case "soins-carte":
        return soinsCarteData;
      case "carte-marine":
        return carteMarineData;
      case "carte-massages":
        return carteMassagesData;
      default:
        return null;
    }
  };

  const getFeatureInfo = () => {
    switch (activeSection) {
      case "carte-marine":
        return {
          title: "L'Expérience Marine Complète",
          description:
            "Plongez dans l'univers unique de la thalassothérapie où l'eau de mer, véritable concentré de vie, révèle tous ses bienfaits. Nos soins marins vous offrent une expérience sensorielle exceptionnelle alliant détente, bien-être et régénération.",
          features: [
            {
              icon: Droplets,
              title: "Eau de Mer Pure",
              description: "Riche en minéraux et oligo-éléments essentiels",
            },
            {
              icon: Waves,
              title: "Bien-être Total",
              description: "Relaxation profonde et régénération cellulaire",
            },
            {
              icon: Sparkles,
              title: "Soins Personnalisés",
              description: "Traitements adaptés à vos besoins spécifiques",
            },
            {
              icon: Heart,
              title: "Expertise Marine",
              description: "Techniques ancestrales et innovations modernes",
            },
          ],
        };
      case "carte-massages":
        return {
          title: "L'Art du Massage Thérapeutique",
          description:
            "Telle est la promesse de ces massages réalisés par les mains expertes de nos thérapeutes. Détente, élimination des toxines, relâchement des muscles, amélioration de la circulation : des pieds à la tête, ils assurent une prise en charge complète pour le plus grand bonheur de votre corps.",
          features: [
            {
              icon: Heart,
              title: "Expertise Thérapeutique",
              description: "Massages réalisés par des thérapeutes experts",
            },
            {
              icon: Waves,
              title: "Détente Profonde",
              description: "Relâchement total des tensions corporelles",
            },
            {
              icon: Sparkles,
              title: "Soins Personnalisés",
              description: "Traitements adaptés à vos besoins spécifiques",
            },
            {
              icon: Droplets,
              title: "Revitalisation",
              description:
                "Amélioration de la circulation et élimination des toxines",
            },
          ],
        };
      default:
        return null;
    }
  };

  const renderIntroduction = () => (
    <div className="text-center mb-16 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-light text-gray-800 mb-8"
      >
        Les soins à la carte
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6 text-gray-700 text-lg leading-relaxed"
      >
        <p>
          La carte de soins{" "}
          <span className="font-semibold text-amber-600">THALION</span> vous
          emmène à la découverte des bienfaits de la mer, dans un univers de
          sensations inoubliables alliant des gestuelles exclusives à des
          équipements de pointe !
        </p>

        <p className="text-xl font-medium text-amber-700">
          Vivez une expérience inédite des soins marins.
        </p>

        <p className="text-sm italic">
          Envie de prolonger le voyage et de faire durer l'évasion jusque dans
          votre salle de bains ? Repartez avec des produits THALION. Pour le
          visage, le corps et l'homme, un large choix vous attend !
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-8"
      />
    </div>
  );

  const renderSectionTabs = () => (
    <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mb-16">
      {sections.map((section) => (
        <motion.button
          key={section.id}
          onClick={() => {
            setActiveSection(activeSection === section.id ? null : section.id);
            setActiveCategory(null);
          }}
          className={`text-center transition-all duration-300 p-6 rounded-xl ${
            activeSection === section.id
              ? "bg-amber-50 border-2 border-amber-300 text-amber-700"
              : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50 border-2 border-transparent"
          }`}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-xl md:text-2xl font-medium mb-2">
            {section.title}
          </h3>
          <p className="text-sm opacity-75">{section.description}</p>
        </motion.button>
      ))}
    </div>
  );

  const renderCategories = () => {
    const data = getCurrentData();
    if (!data) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {data.categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() =>
              setActiveCategory(
                activeCategory === category.id ? null : category.id
              )
            }
          >
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-xl font-bold mb-2">{category.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">
                    {category.treatments.length} catégories
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const renderTreatments = () => {
    const data = getCurrentData();
    const category = data?.categories.find((cat) => cat.id === activeCategory);
    if (!category) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-16"
      >
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          <div className="h-6 w-px bg-gray-300" />
          <h3 className="text-2xl font-light text-gray-800">
            {category.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.treatments.map((treatment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                {treatment.name}
              </h4>
              <p className="text-sm text-gray-600 mb-4">{treatment.count}</p>

              <div className="space-y-3">
                {treatment.durations.map((duration, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-gray-700">{duration}</span>
                    </div>
                    <span className="text-amber-600 font-semibold">
                      {treatment.prices[idx]}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300">
                Réserver
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderFeatureSection = () => {
    const featureInfo = getFeatureInfo();
    if (!featureInfo) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 mb-16"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-light text-gray-800 mb-4">
            {featureInfo.title}
          </h3>
          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {featureInfo.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureInfo.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderClosingMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-8 md:p-12"
    >
      <h3 className="text-2xl md:text-3xl font-light mb-4">Vous aimerez</h3>
      <p className="text-lg leading-relaxed max-w-3xl mx-auto">
        Vous détendre face à la mer, autour d'une variété de thés & d'infusions,
        pour achever chaque soin tout en douceur. Des sensations inoubliables à
        découvrir sans plus attendre !
      </p>
    </motion.div>
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {renderIntroduction()}
        {renderSectionTabs()}

        <AnimatePresence mode="wait">
          {activeSection && (
            <div key={activeSection}>
              {renderCategories()}
              {activeCategory && renderTreatments()}
              {renderFeatureSection()}
            </div>
          )}
        </AnimatePresence>

        {renderClosingMessage()}
      </div>
    </section>
  );
};

export default SoinsALaCarte;
