import React, { useState, useEffect } from "react";
import { ChevronDown, Clock, Sparkles, Leaf, Star, MapPin } from "lucide-react";
// In SoinsLaCarte.jsx
import { forwardRef } from "react";

const SoinsLaCarte = forwardRef((props, ref) => {
  return (
    <div>
      {/* Your WelcSoinsLaCarte component content */}
      <WelcSoinsLaCarte />

      {/* Pass the ref to VisageCorpsHomme */}
      <div ref={ref}>
        <VisageCorpsHomme />
      </div>
    </div>
  );
});
// Luxury Components
const GradientText = ({ children, className = "" }) => {
  return (
    <span
      className={`bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent font-bold ${className}`}
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
            ? "bg-gradient-to-r from-amber-300 to-amber-400 text-white shadow-lg scale-105"
            : "bg-white/70 text-amber-800 hover:bg-amber-100/80 hover:scale-102"
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
            src={`/src/pages/Thalion/BrochureSections/assets/alacarte/${treatment.image}`}
            alt={treatment.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image doesn't load
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback placeholder */}
          <div
            className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center absolute top-0 left-0"
            style={{ display: "none" }}
          >
            <Sparkles className="w-12 h-12 text-white/70" />
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
            <h4 className="font-serif text-xl font-semibold text-amber-900 group-hover:text-amber-700 transition-colors">
              {treatment.name}
            </h4>
            <div className="text-2xl font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">
              {treatment.price}
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
            {treatment.description}
          </p>
          {/* Reserve Button */}
          <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 self-start">
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
              src={`/src/pages/Thalion/BrochureSections/assets/alacarte/${service.image}`}
              alt={service.category}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image doesn't load
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback placeholder */}
            <div
              className={`w-full h-full ${categoryColor} flex items-center justify-center absolute top-0 left-0`}
              style={{ display: "none" }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-left">
            <h3 className="font-serif text-2xl font-semibold text-amber-900">
              {service.category}
            </h3>
            <div className="text-amber-700 text-sm mt-1">
              {service.treatments.length} soins disponibles
            </div>
          </div>
        </div>
        <div
          className={`transform transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-6 h-6 text-amber-800" />
        </div>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
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
const VisageCorpsHomme = () => {
  const [activeCategory, setActiveCategory] = useState("visage");
  const [expandedService, setExpandedService] = useState(null);

  // Add event listener for navbar category changes
  useEffect(() => {
    const handleCategoryChange = (event) => {
      setActiveCategory(event.detail);
      setExpandedService(null); // Close any expanded services when changing category
    };

    document.addEventListener("changeSoinsCategory", handleCategoryChange);

    return () => {
      document.removeEventListener("changeSoinsCategory", handleCategoryChange);
    };
  }, []);

  const categories = {
    visage: {
      title: "Visage",
      icon: <Sparkles className="w-5 h-5" />,
      image: "V1.webp",
      color: "bg-gradient-to-br from-rose-300 to-rose-400",
      bgGradient: "from-rose-50 to-pink-50",
      services: [
        {
          id: "beaute-essentielle",
          category: "Beauté Essentielle",
          image: "V2.webp",
          treatments: [
            {
              name: "Mise en beauté",
              duration: "30'",
              price: "31 € / 100 TND",
              image: "V3.webp",
              description:
                "Besoin d'hydratation, de nutrition, de douceur ou de pureté ? Après un diagnostic professionnel de votre peau, l'esthéticienne vous conseillera votre soin personnalisé.",
            },
            {
              name: "Mise en beauté",
              duration: "60'",
              price: "58 €",
              image: "V4.webp",
              description:
                "Gommage, masque et massage se succèdent pour sublimer votre peau. Elle est radieuse de fraîcheur.",
            },
          ],
        },
        {
          id: "beaute-yeux",
          category: "Beauté des Yeux",
          image: "V5.webp",
          treatments: [
            {
              name: "Lift expert regard",
              duration: "30'",
              price: "31 €",
              image: "V6.webp",
              description:
                "Ultra-ciblé, ce soin repulpe intensément le contour des yeux et le protège du vieillissement prématuré. Sa gestuelle haute précision lifte les traits et redonne fermeté aux paupières.",
            },
          ],
        },
        {
          id: "eternelle-jeunesse",
          category: "Eternelle Jeunesse",
          image: "V7.webp",
          treatments: [
            {
              name: "Lift absolu",
              duration: "60'",
              price: "61 €",
              image: "V8.webp",
              description:
                "Son action repulpante et défroissante atténue visiblement les marques du temps. Sous l'action du modelage restructurant personnalisé, les traits sont reposés.",
            },
            {
              name: "Eclat originel",
              duration: "60'",
              price: "55 €",
              image: "V9.webp",
              description:
                "Véritable innovation alliant bienfaits marins aux enzymes de fruits et à la vitamine C pour stimuler le renouvellement cellulaire des peaux ternes.",
            },
            {
              name: "Expert anti-âge",
              duration: "75'",
              price: "61 €",
              image: "V10.webp",
              description:
                "Réponse ciblée contre les effets du temps pour restaurer votre capital jeunesse. Ce soin sur-mesure haute précision comble rides et ridules.",
            },
          ],
        },
      ],
    },
    corps: {
      title: "Corps",
      icon: <Leaf className="w-5 h-5" />,
      image: "V11.webp",
      color: "bg-gradient-to-br from-emerald-300 to-emerald-400",
      bgGradient: "from-emerald-50 to-green-50",
      services: [
        {
          id: "relaxation",
          category: "Relaxation",
          image: "V12.webp",
          treatments: [
            {
              name: "Détente absolue",
              duration: "60'",
              price: "55 €",
              image: "V13.webp",
              description:
                "Le Modelage Énergétique Relaxant (M.E.R.) rééquilibre et harmonise les énergies corporelles. Une évasion profondément relaxante et régénérante.",
            },
          ],
        },
        {
          id: "silhouette",
          category: "Silhouette",
          image: "V14.webp",
          treatments: [
            {
              name: "Performance fermeté",
              duration: "45'",
              price: "46 €",
              image: "V15.webp",
              description:
                "Masque corporel anti-âge tonifiant, idéal pour préserve la tonicité de la peau. Objectif : remodeler la silhouette, raffermir et densifier la peau.",
            },
            {
              name: "Jambes toniques",
              duration: "30'",
              price: "29 €",
              image: "V16.webp",
              description:
                "Allié des jambes lourdes, ce soin décongestionnant soulage instantanément. Les jambes retrouvent galbe, légèreté et vitalité.",
            },
            {
              name: "Drainage silhouette",
              duration: "60'",
              price: "55 €",
              image: "V17.webp",
              description:
                "Lutte contre les troubles circulatoires des membres inférieurs en associant les vertus de la mer à des manœuvres manuelles drainantes.",
            },
            {
              name: "Action vergetures",
              duration: "45'",
              price: "46 €",
              image: "V18.webp",
              description:
                "Effet préventif et réducteur qui restaure l'élasticité de la peau et restructure les tissus.",
            },
            {
              name: "Cellu'contour",
              duration: "60'",
              price: "61 €",
              image: "V19.webp",
              description:
                "Traitement anti-cellulite intensif sur-mesure. Ses actifs concentrés en extraits marins et végétaux associés aux techniques de modelage novatrices.",
            },
            {
              name: "Rituel détox corps",
              duration: "90'",
              price: "82 €",
              image: "V20.webp",
              description:
                "Après un gommage tonique, un concentré d'actifs marins est frictionné avec une gestuelle spécifique détox.",
            },
          ],
        },
      ],
    },
    homme: {
      title: "Homme",
      icon: <Star className="w-5 h-5" />,
      image: "V21.webp",
      color: "bg-gradient-to-br from-slate-400 to-slate-500",
      bgGradient: "from-slate-50 to-gray-50",
      services: [
        {
          id: "special-homme",
          category: "Spécial Homme",
          image: "V21.webp",
          treatments: [
            {
              name: "Facial oxygen booster",
              duration: "60'",
              price: "49 €",
              image: "V22.webp",
              description:
                "Objectif : redonner tonus et fermeté, grâce à des modelages profonds du cuir chevelu, du visage, des trapèzes et de la nuque.",
            },
            {
              name: "Bonne mine express",
              duration: "30'",
              price: "29 €",
              image: "V23.webp",
              description:
                "Ce soin express comble la peau d'actifs ultra concentrés pour un résultat immédiat.",
            },
            {
              name: "Décontraction dos",
              duration: "45'",
              price: "41 €",
              image: "V24.webp",
              description:
                "Son action sur la masse musculaire fait de ce soin un moment d'extrême relaxation.",
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
      id="soins-a-la-carte"
      data-section="soins-a-la-carte"
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section - Updated with section-specific IDs */}
        <div
          className="text-center py-16"
          id={`${activeCategory}-section`}
          data-section={`soins-${activeCategory}`}
        >
          <div className="mb-6">
            <h1
              className="text-6xl md:text-7xl font-serif font-light tracking-wider text-amber-800"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 300,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Les soins à la carte
            </h1>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-300 to-amber-400 mx-auto rounded-full mb-8"></div>
        </div>

        {/* Category Navigation - add section markers */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, category]) => (
            <div key={key} id={`${key}-tab`} data-section={`soins-${key}-tab`}>
              <CategoryTab
                active={activeCategory === key}
                onClick={() => setActiveCategory(key)}
                icon={category.icon}
                title={category.title}
              />
            </div>
          ))}
        </div>

        {/* Category Hero - add specific section ID */}
        <div
          className="mb-12 relative"
          id={`${activeCategory}-hero`}
          data-section={`soins-${activeCategory}-hero`}
        >
          <div className="h-80 rounded-3xl overflow-hidden shadow-2xl relative">
            <img
              src={`/src/pages/Thalion/BrochureSections/assets/alacarte/${currentCategory.image}`}
              alt={currentCategory.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image doesn't load
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
              </div>
            </div>
          </div>
        </div>

        {/* Services Section - add category-specific section markers */}
        <div
          className="space-y-6"
          id={`${activeCategory}-services`}
          data-section={`soins-${activeCategory}-services`}
        >
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
      </div>
    </div>
  );
};

export default VisageCorpsHomme;
