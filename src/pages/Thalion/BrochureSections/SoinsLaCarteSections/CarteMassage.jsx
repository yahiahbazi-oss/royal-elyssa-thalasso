import React, { useState } from "react";
import {
  ChevronDown,
  Clock,
  Heart,
  Sparkles,
  Zap,
  Flower2,
  HandHeart,
  Thermometer,
} from "lucide-react";
import X1 from "../assets/X1.JPG";
import X2 from "../assets/X2.JPG";
import X3 from "../assets/X3.JPG";
import X4 from "../assets/X4.JPG";
import X5 from "../assets/X5.JPG";
import X6 from "../assets/X6.JPG";
import X7 from "../assets/X7.JPG";
import X8 from "../assets/X8.JPG";
import X9 from "../assets/X9.JPG";
import X10 from "../assets/X10.JPG";
import X11 from "../assets/X11.JPG";
import X20 from "../assets/X20.JPG";
import X21 from "../assets/X21.JPG";
import X22 from "../assets/X22.JPG";
import X23 from "../assets/X23.JPG";
import X24 from "../assets/X24.JPG";
import X30 from "../assets/X30.JPG";
import X31 from "../assets/X31.JPG";
import X32 from "../assets/X32.JPG";
import X33 from "../assets/X33.JPG";
import X34 from "../assets/X34.JPG";
import X35 from "../assets/X35.JPG";
import X36 from "../assets/X36.JPG";
import X37 from "../assets/X37.JPG";

// Luxury Components
const GradientText = ({ children, className = "" }) => {
  return (
    <span
      className={`bg-gradient-to-r from-purple-200 via-pink-300 to-rose-400 bg-clip-text text-transparent font-bold ${className}`}
    >
      {children}
    </span>
  );
};

const CategoryTab = ({ active, onClick, icon, title }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2
        ${
          active
            ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg scale-105"
            : "bg-white/70 text-purple-800 hover:bg-purple-100/80 hover:scale-102"
        }
      `}
    >
      {icon}
      <span className="font-serif text-lg">{title}</span>
    </button>
  );
};

const TreatmentItem = ({ treatment, index }) => {
  return (
    <div className="bg-white/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mb-4 group">
      <div className="flex flex-col md:flex-row">
        {/* Treatment Image - Fixed size */}
        <div className="relative w-full md:w-80 h-64 md:h-64">
          <img
            src={treatment.image}
            alt={treatment.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback placeholder */}
          <div
            className="w-full h-full bg-gradient-to-br from-purple-300 to-pink-400 flex items-center justify-center absolute top-0 left-0"
            style={{ display: "none" }}
          >
            <HandHeart className="w-12 h-12 text-white/70" />
          </div>
          {/* Duration Badge */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 backdrop-blur-sm">
            <Clock className="w-3 h-3" />
            {treatment.duration}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-serif text-xl font-semibold text-purple-900 group-hover:text-purple-700 transition-colors">
              {treatment.name}
            </h4>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-800 bg-purple-100 px-4 py-2 rounded-lg">
                {treatment.priceEur}
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
            {treatment.description}
          </p>
          {treatment.benefits && (
            <div className="mb-4">
              <h5 className="font-semibold text-purple-800 mb-2">
                Vous aimerez :
              </h5>
              <p className="text-gray-600 italic">{treatment.benefits}</p>
            </div>
          )}
          {/* Reserve Button */}
          <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 self-start">
            RÉSERVER
          </button>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, isExpanded, onToggle, categoryColor }) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-white/20 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          {/* Service Image - Fixed size */}
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg relative">
            <img
              src={service.image}
              alt={service.category}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback placeholder */}
            <div
              className={`w-full h-full ${categoryColor} flex items-center justify-center absolute top-0 left-0`}
              style={{ display: "none" }}
            >
              <HandHeart className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-left">
            <h3 className="font-serif text-2xl font-semibold text-purple-900">
              {service.category}
            </h3>
            <div className="text-purple-700 text-sm mt-1">
              {service.treatments.length} soins disponibles
            </div>
          </div>
        </div>
        <div
          className={`transform transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-6 h-6 text-purple-800" />
        </div>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 bg-gradient-to-b from-transparent to-white/30">
          {service.treatments.map((treatment, index) => (
            <TreatmentItem key={index} treatment={treatment} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Component
const CarteMassage = () => {
  const [activeCategory, setActiveCategory] = useState("massages");
  const [expandedService, setExpandedService] = useState(null);

  const categories = {
    massages: {
      title: "Massages & Bien-être",
      icon: <HandHeart className="w-5 h-5" />,
      image: X1,
      color: "bg-gradient-to-br from-purple-300 to-pink-400",
      bgGradient: "from-purple-50 to-pink-50",
      services: [
        {
          id: "massages-asiatiques",
          category: "Massages Asiatiques",
          image: X1,
          treatments: [
            {
              name: "Massage Balinais",
              duration: "60'",
              priceEur: "82 €",
              image: X2,
              description:
                "Massage traditionnel indonésien qui combine pétrissage, acupression et étirements pour harmoniser le corps et l'esprit.",
            },
            {
              name: "Massage Abyhanga",
              duration: "60'",
              priceEur: "82 €",
              image: X3,
              description:
                "Massage ayurvédique traditionnel à l'huile chaude qui revitalise le corps et équilibre les énergies.",
            },
            {
              name: "Massage Thai",
              duration: "60'",
              priceEur: "91 €",
              image: X4,
              description:
                "Massage traditionnel thaïlandais qui combine acupression, étirements et travail énergétique pour une relaxation profonde.",
            },
          ],
        },
        {
          id: "massage-et-bien-etre",
          category: "Massage & Bien-être",
          image: X5,
          treatments: [
            {
              name: "Rêve éveillé",
              duration: "40'",
              priceEur: "58 €",
              image: X6,
              description: "...",
            },
            {
              name: "Douceur de brise à l'huile de coco",
              duration: "40'",
              priceEur: "40 €",
              image: X7,
              description: "...",
            },
            {
              name: "Bonheur des muscles au baume camphré",
              duration: "50'",
              priceEur: "58 €",
              image: X8,
              description: "...",
            },
            {
              name: "Massage du dos",
              duration: "25'",
              priceEur: "29 €",
              image: X9,
              description: "...",
            },
            {
              name: "Souffle d'énergie à l'huile de noix du Brésil",
              duration: "40'",
              priceEur: "40 €",
              image: X10,
              description: "...",
            },
            {
              name: "Silhouette enchantée aux eaux-mères",
              duration: "50'",
              priceEur: "61 €",
              image: X11,
              description: "...",
            },
            {
              name: "Grande réflexologie plantaire de l'Occident",
              duration: "75'",
              priceEur: "88 €",
              image: X20,
              description: "...",
            },
            {
              name: "Pieds sensibles",
              duration: "40'",
              priceEur: "50 €",
              image: X21,
              description: "...",
            },
            {
              name: "Duo aux galets chauds & pochons d'algues à l'huile de criste marine Bio",
              duration: "75'",
              priceEur: "88 €",
              image: X22,
              description: "...",
            },
            {
              name: "Drainage Lympathique",
              duration: "60'",
              priceEur: "85 €",
              image: X23,
              description: "...",
            },
          ],
        },
      ],
    },

    soins: {
      title: "Soins & Thérapies",
      icon: <Thermometer className="w-5 h-5" />,
      image: X23,
      color: "bg-gradient-to-br from-emerald-300 to-teal-400",
      bgGradient: "from-emerald-50 to-teal-50",
      services: [
        {
          id: "Soins & Thérapies",
          category: "Soins & Thérapies",
          image: X23,
          treatments: [
            {
              name: "Pressothérapie",
              duration: "20'",
              priceEur: "29 €",
              image: X24,
              description:
                "Traitement de drainage lymphatique mécanique qui améliore la circulation sanguine et lymphatique, aide à éliminer les toxines et réduit la sensation de jambes lourdes.",
            },
            {
              name: "Heat Experience",
              duration: "60'",
              priceEur: "55 €",
              image: X30,
              description:
                "Expérience thermale complète combinant différentes sources de chaleur pour une détoxification profonde et une relaxation intense.",
            },
            {
              name: "Sauna",
              duration: "20'",
              priceEur: "17 €",
              image: X31,
              description:
                "Séance de sauna traditionnel pour éliminer les toxines, détendre les muscles et purifier la peau par la transpiration.",
            },
            {
              name: "Cérémonie Duo d'Algues & Argile",
              duration: "50'",
              priceEur: "50 €",
              image: X32,
              description:
                "Rituel purifiant et revitalisant combinant les bienfaits des algues marines et de l'argile pour détoxifier, nourrir et régénérer la peau en profondeur.",
            },
          ],
        },
      ],
    },
    hammam: {
      title: "Cérémonie du Hammam",
      icon: <Flower2 className="w-5 h-5" />,
      image: X33,
      color: "bg-gradient-to-br from-amber-300 to-orange-400",
      bgGradient: "from-amber-50 to-orange-50",
      services: [
        {
          id: "hammam-experience",
          category: "Hammam Experience",
          image: X33,
          treatments: [
            {
              name: "Hammam + gommage + enveloppement + massage",
              duration: "60'",
              priceEur: "73 €",
              image: X34,
              description:
                "Rituel complet du hammam avec gommage au savon vert, application Terre et Mer (boue marine bienfaisante), suivi d'un massage relaxant. Une expérience authentique du « Pays des Mille et Une Nuits ».",
            },
            {
              name: "Hammam + massage",
              duration: "30'",
              priceEur: "29 €",
              image: X35,
              description:
                "Séance de hammam suivie d'un massage relaxant pour prolonger les bienfaits de la chaleur humide.",
            },
            {
              name: "Hammam + gommage",
              duration: "30'",
              priceEur: "28 €",
              image: X36,
              description:
                "Hammam traditionnel suivi d'un gommage au savon vert pour purifier et adoucir la peau.",
            },
            {
              name: "Hammam Latitude des îles",
              duration: "50'",
              priceEur: "64 €",
              image: X37,
              description:
                "Hammam + Gommage douceur Bora Bora + Enveloppement douceur à la pulpe de coco. Voyage sensoriel aux parfums des îles paradisiaques.",
            },
            {
              name: "Hammam Latitude oasis",
              duration: "50'",
              priceEur: "64 €",
              image: X1,
              description:
                "Hammam + Gommage tonique aux agrumes + Enveloppement soyeux « poudre de coton ». Évasion au cœur d'une oasis de bien-être.",
            },
            {
              name: "Hammam Latitude du soleil levant",
              duration: "50'",
              priceEur: "64 €",
              image: X2,
              description:
                "Hammam + Gommage silhouette aux 3 thés + Enveloppement minceur aux 3 thés. Rituel énergisant inspiré des traditions orientales.",
            },
            {
              name: "Hammam Latitude océane",
              duration: "50'",
              priceEur: "64 €",
              image: X3,
              description:
                "Hammam + Gommage revitalisant aux huiles essentielles + Enveloppement force marine. Plongée revitalisante dans les profondeurs océanes.",
              benefits:
                "Dans un décor où tout appelle à la sérénité, plongez à travers les mers et les océans du globe pour découvrir des sensations fabuleuses. Le mariage parfait des Traditions d'Orient, des arômes et des senteurs du Monde.",
            },
          ],
        },
      ],
    },
  };

  const currentCategory = categories[activeCategory];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentCategory.bgGradient} transition-all duration-700`}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-16">
          <div className="mb-6">
            <h1
              className="text-6xl md:text-7xl font-serif font-light tracking-wider text-purple-800"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 300,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Carte Massages
            </h1>
            <p className="text-xl text-purple-600 mt-4 font-serif italic">
              Se sentir merveilleusement bien
            </p>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full mb-8"></div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, category]) => (
            <CategoryTab
              key={key}
              active={activeCategory === key}
              onClick={() => setActiveCategory(key)}
              icon={category.icon}
              title={category.title}
            />
          ))}
        </div>

        {/* Category Hero */}
        <div className="mb-12 relative">
          <div className="h-80 rounded-3xl overflow-hidden shadow-2xl relative">
            <img
              src={currentCategory.image}
              alt={currentCategory.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback placeholder */}
            <div
              className={`h-80 ${currentCategory.color} flex items-center justify-center relative overflow-hidden top-0 left-0 w-full`}
              style={{ display: "none" }}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute border border-white/30 rounded-full"
                    style={{
                      width: `${60 + i * 40}px`,
                      height: `${60 + i * 40}px`,
                      top: `${Math.random() * 80}%`,
                      left: `${Math.random() * 80}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  ></div>
                ))}
              </div>
              <div className="text-center z-10">
                <div className="text-white mb-4">
                  {React.cloneElement(currentCategory.icon, {
                    className: "w-16 h-16 mx-auto mb-4",
                  })}
                </div>
                <h2 className="text-4xl font-serif font-bold text-white">
                  {currentCategory.title}
                </h2>
                {activeCategory === "hammam" && (
                  <p className="text-white/90 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                    Embarquez pour un voyage au cœur de la tradition orientale.
                    Le corps et l'esprit sont immergés dans une atmosphère douce
                    et sereine, propice à l'évasion.
                  </p>
                )}
              </div>
            </div>
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-white mb-4">
                  {React.cloneElement(currentCategory.icon, {
                    className: "w-16 h-16 mx-auto mb-4",
                  })}
                </div>
                <h2 className="text-4xl font-serif font-bold text-white">
                  {currentCategory.title}
                </h2>
                {activeCategory === "hammam" && (
                  <p className="text-white/90 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                    Embarquez pour un voyage au cœur de la tradition orientale.
                    Le corps et l'esprit sont immergés dans une atmosphère douce
                    et sereine, propice à l'évasion.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="space-y-6">
          {currentCategory.services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              isExpanded={expandedService === service.id}
              onToggle={() =>
                setExpandedService(
                  expandedService === service.id ? null : service.id
                )
              }
              categoryColor={currentCategory.color}
            />
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif font-semibold text-purple-900 mb-4">
              <GradientText>L'Art du Massage Thérapeutique</GradientText>
            </h3>
            <p className="text-purple-700 text-lg leading-relaxed max-w-4xl mx-auto">
              Telle est la promesse de ces massages réalisés par les mains
              expertes de nos thérapeutes. Détente, élimination des toxines,
              relâchement des muscles, amélioration de la circulation : des
              pieds à la tête, ils assurent une prise en charge complète pour le
              plus grand bonheur de votre corps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="text-center p-6 bg-purple-50 rounded-2xl">
              <HandHeart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-semibold text-purple-800 mb-2">
                Expertise Thérapeutique
              </h4>
              <p className="text-purple-600 text-sm">
                Massages réalisés par des thérapeutes experts
              </p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-2xl">
              <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-semibold text-pink-800 mb-2">
                Détente Profonde
              </h4>
              <p className="text-pink-600 text-sm">
                Relâchement total des tensions corporelles
              </p>
            </div>
            <div className="text-center p-6 bg-rose-50 rounded-2xl">
              <Sparkles className="w-12 h-12 text-rose-600 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-semibold text-rose-800 mb-2">
                Soins Personnalisés
              </h4>
              <p className="text-rose-600 text-sm">
                Traitements adaptés à vos besoins spécifiques
              </p>
            </div>
            <div className="text-center p-6 bg-indigo-50 rounded-2xl">
              <Zap className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-semibold text-indigo-800 mb-2">
                Revitalisation
              </h4>
              <p className="text-indigo-600 text-sm">
                Amélioration de la circulation et élimination des toxines
              </p>
            </div>
          </div>

          {/* Special Benefits Section */}
          <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
            <div className="flex items-center justify-center mb-4">
              <Flower2 className="w-8 h-8 text-purple-600 mr-3" />
              <h4 className="font-serif text-xl font-semibold text-purple-800">
                Vous aimerez
              </h4>
            </div>
            <p className="text-purple-700 text-center leading-relaxed">
              Vous détendre face à la mer, autour d'une variété de thés &
              d'infusions, pour achever chaque soin tout en douceur. Des
              sensations inoubliables à découvrir sans plus attendre !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteMassage;
