import React, { useState } from "react";
import {
  ChevronDown,
  Clock,
  Waves,
  Droplets,
  Bath,
  Heart,
  Sparkles,
} from "lucide-react";

// Luxury Components
const GradientText = ({ children, className = "" }) => {
  return (
    <span
      className={`bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent font-bold ${className}`}
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
            ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-lg scale-105"
            : "bg-white/70 text-teal-800 hover:bg-teal-100/80 hover:scale-102"
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
            className="w-full h-full bg-gradient-to-br from-teal-300 to-cyan-400 flex items-center justify-center absolute top-0 left-0"
            style={{ display: "none" }}
          >
            <Waves className="w-12 h-12 text-white/70" />
          </div>
          {/* Duration Badge */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 backdrop-blur-sm">
            <Clock className="w-3 h-3" />
            {treatment.duration}
          </div>
          {/* Entry count for parcours */}
          {treatment.entries && (
            <div className="absolute top-4 left-4 bg-teal-500/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {treatment.entries}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-serif text-xl font-semibold text-teal-900 group-hover:text-teal-700 transition-colors">
              {treatment.name}
            </h4>
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-lg">
                {treatment.price}
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
            {treatment.description}
          </p>
          {treatment.benefits && (
            <div className="mb-4">
              <h5 className="font-semibold text-teal-800 mb-2">
                Vous aimerez :
              </h5>
              <p className="text-gray-600 italic">{treatment.benefits}</p>
            </div>
          )}
          {/* Reserve Button */}
          <button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 self-start">
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
              <Waves className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-left">
            <h3 className="font-serif text-2xl font-semibold text-teal-900">
              {service.category}
            </h3>
            <div className="text-teal-700 text-sm mt-1">
              {service.treatments.length} soins disponibles
            </div>
          </div>
        </div>
        <div
          className={`transform transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-6 h-6 text-teal-800" />
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
const CarteMarin = () => {
  const [activeCategory, setActiveCategory] = useState("parcours");
  const [expandedService, setExpandedService] = useState(null);

  const categories = {
    parcours: {
      title: "Parcours & Relaxation",
      icon: <Waves className="w-5 h-5" />,
      image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C0.webp",
      color: "bg-gradient-to-br from-teal-300 to-cyan-400",
      bgGradient: "from-teal-50 to-cyan-50",
      services: [
        {
          id: "parcours-marin",
          category: "Parcours Marin",
          image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C1.webp",
          treatments: [
            {
              name: "L'entrée",
              duration: "20'",
              price: "16 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C2.webp",
              description:
                "Dans une magnifique piscine d'eau de mer chauffée, profitez des bains à remous, des cascades, des jets sous-marins, des lits hydromassants, des aquabikes et du parcours de marche à contre-courant pour activer votre circulation sanguine et améliorer votre tonicité musculaire. Votre corps en redemandera !",
            },
            {
              name: "Le forfait de 5 entrées",
              duration: "20'",
              price: "49 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C3.webp",
              description:
                "Forfait économique pour profiter régulièrement des bienfaits du parcours marin. Activez votre circulation et renforcez votre tonicité musculaire.",
              entries: "5 entrées",
            },
            {
              name: "L'entrée parcours marin + hammam",
              duration: "20'",
              price: "19 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C4.webp",
              description:
                "Combinaison parfaite entre les bienfaits du parcours marin et la détente du hammam traditionnel.",
            },
            {
              name: "Le forfait de 5 entrées parcours + hammam",
              duration: "20'",
              price: "61 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C5.webp",
              description:
                "Forfait privilège alliant parcours marin et hammam pour une expérience complète de bien-être.",
              entries: "5 entrées",
            },
          ],
        },
        {
          id: "relaxation-marine",
          category: "Relaxation Marine",
          image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C8.webp",
          treatments: [
            {
              name: "Relaxation Marine",
              duration: "20'",
              price: "38 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C9.webp",
              description:
                "Ce massage réalisé dans notre piscine d'eau de mer chaude, vous invite à un véritable voyage à travers les sens. Pendant que vous flottez, le thérapeute effectue des mouvements fluides et des étirements légers qui détendent les muscles, soulagent les courbatures et relâchent les tissus ligamentaires.",
            },
          ],
        },
      ],
    },
    douches: {
      title: "Douches & Bains",
      icon: <Droplets className="w-5 h-5" />,
      image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C12.webp",
      color: "bg-gradient-to-br from-blue-300 to-indigo-400",
      bgGradient: "from-blue-50 to-indigo-50",
      services: [
        {
          id: "douches",
          category: "Douches",
          image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C13.webp",
          treatments: [
            {
              name: "Douche drainante sous marine",
              duration: "20'",
              price: "26 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C14.webp",
              description:
                "Ce soin est réalisé par un hydrothérapeute dans un bain de mer chauffée à 37 °C. L'ensemble du corps est massé et drainé grâce à un jet puissant favorisant ainsi la circulation.",
            },
            {
              name: "Grand jet tonique & douche à pomme",
              duration: "15'",
              price: "23 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C15.webp",
              description:
                "L'hydrothérapeute balaye tout le corps grâce à un puissant jet d'eau de mer. La pression réglable du jet améliore le tonus musculaire et décontracte le corps. La douche à pomme permet de réaliser le même soin tout en douceur.",
            },
          ],
        },
        {
          id: "bains",
          category: "Bains",
          image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C16.webp",
          treatments: [
            {
              name: "Bains",
              duration: "20'",
              price: "26 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C17.webp",
              description:
                "Il existe une affinité particulière entre nos cellules et le milieu marin originel. Au contact de la mer, on se ressource et sa force vitale stimule tout notre être. Plongez à la découverte des bains de mer, fantastiques réservoirs de santé qui nous offrent tout ce dont notre corps à besoin.",
              benefits:
                "La grande variété de bains aux vertus et aux parfums enchanteurs pour chaque jour vous faire vivre une nouvelle expérience sensorielle : Bain relaxant aux cristaux d'ajonc, Bain revitalisant à la crème d'algues, Bain aromatique relaxant, Bain aromatique amincissant.",
            },
          ],
        },
        {
          id: "la-sieste",
          category: "Le Siesté",
          image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C10.webp",
          treatments: [
            {
              name: "Le Siesté",
              duration: "80'",
              price: "94 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C11.webp",
              description:
                "Pour débuter ce rituel, vous plongez dans une vasque généreuse et sensuelle pour profiter d'un bain aromatique relaxant (20'). Vous laissez vos sens vagabonder, puis un massage complet du corps commence (60'). Un grand moment d'oubli de soi-même.",
              benefits:
                "L'éveil de tous vos sens grâce à l'alternance de parfums, de couleurs et d'une musique durant votre immersion. Un espace d'expériences sensorielles !",
            },
          ],
        },
      ],
    },
    massages: {
      title: "Massages & Affusions",
      icon: <Heart className="w-5 h-5" />,
      image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C18.webp",
      color: "bg-gradient-to-br from-emerald-300 to-teal-400",
      bgGradient: "from-emerald-50 to-teal-50",
      services: [
        {
          id: "massages-affusion",
          category: "Massages sous Affusion",
          image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C19.webp",
          treatments: [
            {
              name: "Massage bruine de mer à la criste marine Bio",
              duration: "25'",
              price: "34 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C20.webp",
              description:
                "Massage sous une fine bruine d'eau de mer enrichie à la criste marine biologique, pour une expérience de détente unique.",
            },
            {
              name: "Suprême massage bruine de mer à 4 mains & à la criste marine Bio",
              duration: "25'",
              price: "58€",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C21.webp",
              description:
                "Massage d'exception à quatre mains sous bruine de mer, enrichi à la criste marine biologique pour une relaxation suprême.",
            },
            {
              name: "La séance",
              duration: "25'",
              price: "46 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C23.webp",
              description:
                "Palper-rouler SLIM sous pluie de sea : massage amincissant avec technique de palper-rouler sous une pluie d'eau de mer.",
            },
            {
              name: "Les 5 séances",
              duration: "25'",
              price: "173 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C24.webp",
              description:
                "Forfait de 5 séances de palper-rouler SLIM pour des résultats optimaux et durables.",
              entries: "5 séances",
            },
          ],
        },
      ],
    },
    soins: {
      title: "Gommages & Enveloppements",
      icon: <Bath className="w-5 h-5" />,
      image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C25.webp",
      color: "bg-gradient-to-br from-rose-300 to-pink-400",
      bgGradient: "from-rose-50 to-pink-50",
      services: [
        {
          id: "gommages",
          category: "Gommages Corporels",
          image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C26.webp",
          treatments: [
            {
              name: "Gommage corps complet",
              duration: "20'",
              price: "29 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C27.webp",
              description:
                "Le gommage affine, adoucit l'épiderme et prépare la peau pour optimiser les soins suivants. Grâce à ce large choix d'ingrédients gourmands, variez les plaisirs pour le plus grand bonheur des sens.",
              benefits:
                "Découvrez notre sélection complète de gommages : Gommage tonique aux agrumes, Gommage silhouette aux 3 thés, Gommage douceur Bora Bora, Gommage revitalisant aux huiles essentielles.",
            },
          ],
        },
        {
          id: "enveloppements",
          category: "Enveloppements",
          image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C28.webp",
          treatments: [
            {
              name: "Enveloppement corps complet",
              duration: "20'",
              price: "34 €",
              image:
                "/src/pages/Thalion/BrochureSections/assets/alacarte/C29.webp",
              description:
                "Réalisés sur un lit d'eau chaude flottant offrant une variation de couleurs uniques, ces « Duo Enveloppements » associent l'application, sur tout le corps, d'enveloppements d'algues à un massage du cuir chevelu. En état de flottaison, vous vous laissez aller à un pur moment d'abandon, vous rechargez votre organisme en minéraux et oligo-éléments indispensables à son bien-être intérieur.",
              benefits:
                "Découvrez notre gamme complète d'enveloppements : Duo enveloppement douceur à la pulpe de coco, Duo enveloppement minceur aux 3 thés, Duo enveloppement sérénité « algues cacao », Duo enveloppement soyeux « poudre de coton », Duo enveloppement force marine, Duo enveloppement peau neuve aux enzymes de fruits, Duo Boue Marine bienfaisante.",
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
              className="text-6xl md:text-7xl font-serif font-light tracking-wider text-teal-800"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 300,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Carte Marine
            </h1>
            <p className="text-xl text-teal-600 mt-4 font-serif italic">
              Découvrez nos soins marins d'exception
            </p>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 mx-auto rounded-full mb-8"></div>
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
            <h3 className="text-3xl font-serif font-semibold text-teal-900 mb-4">
              <GradientText>L'Expérience Marine Complète</GradientText>
            </h3>
            <p className="text-teal-700 text-lg leading-relaxed max-w-4xl mx-auto">
              Plongez dans l'univers unique de la thalassothérapie où l'eau de
              mer, véritable concentré de vie, révèle tous ses bienfaits. Nos
              soins marins vous offrent une expérience sensorielle
              exceptionnelle alliant détente, bien-être et régénération.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="text-center p-6 bg-teal-50 rounded-2xl">
              <Waves className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-semibold text-teal-800 mb-2">
                Eau de Mer Pure
              </h4>
              <p className="text-teal-600 text-sm">
                Riche en minéraux et oligo-éléments essentiels
              </p>
            </div>
            <div className="text-center p-6 bg-cyan-50 rounded-2xl">
              <Heart className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-semibold text-cyan-800 mb-2">
                Bien-être Total
              </h4>
              <p className="text-cyan-600 text-sm">
                Relaxation profonde et régénération cellulaire
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-2xl">
              <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-semibold text-blue-800 mb-2">
                Soins Personnalisés
              </h4>
              <p className="text-blue-600 text-sm">
                Traitements adaptés à vos besoins spécifiques
              </p>
            </div>
            <div className="text-center p-6 bg-indigo-50 rounded-2xl">
              <Bath className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-semibold text-indigo-800 mb-2">
                Expertise Marine
              </h4>
              <p className="text-indigo-600 text-sm">
                Techniques ancestrales et innovations modernes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteMarin;
