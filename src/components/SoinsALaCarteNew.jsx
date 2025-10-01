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
  ChevronDown,
  Leaf,
  Bath,
  HandHeart,
  Flower2,
  X,
} from "lucide-react";

// Import images for fallback (Marine and Massages still need these)
import marineImage from "../assets/Thalasso_7.jpg";
import massageImage from "../assets/Thalasso_Thal'ion_17.jpg";

const SoinsALaCarteNew = ({ language = "fr" }) => {
  const [activeSection, setActiveSection] = useState("toutes-les-soins");
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Translation object
  const translations = {
    fr: {
      // Navigation sections
      allTreatments: "Toutes les soins",
      allTreatmentsDesc: "Tous nos traitements en un coup d'œil",
      treatmentsAlaCarte: "Les soins à la carte",
      treatmentsAlaCarteDesc: "Soins personnalisés selon vos besoins",
      marineCard: "Carte Marine",
      marineCardDesc: "Bienfaits de la thalassothérapie",
      massageCard: "Carte Massages",
      massageCardDesc: "Détente et relaxation profonde",

      // Category titles
      face: "VISAGE",
      faceSubtitle: "BEAUTÉ",
      faceDescription:
        "CURE QUI ASSOCIE LES BIENFAITS DE LA THALASSO À CEUX DE L'ESTHÉTIQUE",
      men: "HOMME",
      menSubtitle: "SPÉCIAL HOMME",
      menDescription: "SOINS SPÉCIALEMENT CONÇUS POUR LES HOMMES",
      body: "CORPS",
      bodySubtitle: "BIEN-ÊTRE",
      bodyDescription: "SOINS CORPORELS RELAXANTS ET REVITALISANTS",
      massagesAffusions: "MASSAGES SOUS AFFUSIONS",
      massagesAffusionsSubtitle: "BIEN-ÊTRE",
      massagesAffusionsDescription:
        "MASSAGES RELAXANTS SOUS BRUINE D'EAU DE MER",
      massagesWellbeing: "MASSAGES & BIEN-ÊTRE",
      massagesWellbeingSubtitle: "DÉTENTE",
      massagesWellbeingDescription:
        "MASSAGES RELAXANTS ET THÉRAPEUTIQUES POUR VOTRE BIEN-ÊTRE",

      // Button texts
      learnMore: "EN SAVOIR +",
      back: "Retour",
      close: "Fermer",
      duration: "Durée",
      price: "Prix",
      sessions: "séances",

      // Beauty categories
      essentialBeauty: "Beauté Essentielle",
      eyeBeauty: "Beauté des Yeux",
      relaxation: "Relaxation",
      silhouette: "Silhouette",

      // Men's category
      specialMen: "Spécial Homme",

      // Body categories
      bodyScrubs: "Gommages Corps",
      wraps: "Enveloppements",

      // Massage categories
      massagesUnderAffusion: "Massages sous Affusion",
      asianMassages: "Massages Asiatiques",
      therapeuticMassages: "Massages Thérapeutiques",
      wellnessMassages: "Massages Bien-être",

      // Pricing disclaimer
      pricingDisclaimer:
        "Les tarifs en euros sont donnés seulement à titre indicatif",

      // Introduction
      introTitle: "Nos Soins & Cartes",
      introText1: "La carte de soins",
      introText1After:
        "vous emmène à la découverte des bienfaits de la mer, dans un univers de sensations inoubliables alliant des gestuelles exclusives à des équipements de pointe !",
      introText2: "Les tarifs en euros sont donnés seulement à titre indicatif",

      // Treatment names and descriptions - Face
      beautyTreatment30: "Mise en beauté",
      beautyTreatment30Desc:
        "Besoin d'hydratation, de nutrition, de douceur ou de pureté ? Après un diagnostic professionnel de votre peau, l'esthéticienne vous conseillera votre soin personnalisé.",
      beautyTreatment60: "Mise en beauté",
      beautyTreatment60Desc:
        "Gommage, masque et massage se succèdent pour sublimer votre peau. Elle est radieuse de fraîcheur.",
      eyeLiftExpert: "Lift expert regard",
      eyeLiftExpertDesc:
        "Soin spécialisé pour le contour des yeux, réduisant les signes de fatigue et les premières rides.",
      absoluteRelaxation: "Détente absolue",
      absoluteRelaxationDesc:
        "Le Modelage Énergétique Relaxant (M.E.R.) rééquilibre et harmonise les énergies corporelles. Une évasion profondément relaxante et régénérante.",

      // Treatment names - Silhouette
      firmness: "Performance fermeté",
      firmnessDesc:
        "Masque corporel anti-âge tonifiant, idéal pour préserver la tonicité de la peau. Objectif : remodeler la silhouette, raffermir et densifier la peau.",
      tonicLegs: "Jambes toniques",
      tonicLegsDesc:
        "Allié des jambes lourdes, ce soin décongestionnant soulage instantanément. Les jambes retrouvent galbe, légèreté et vitalité.",
      silhouetteDrainage: "Drainage silhouette",
      silhouetteDrainageDesc:
        "Lutte contre les troubles circulatoires des membres inférieurs en associant les vertus de la mer à des manœuvres manuelles drainantes.",
      stretchMarks: "Action vergetures",
      stretchMarksDesc:
        "Effet préventif et réducteur qui restaure l'élasticité de la peau et restructure les tissus.",
      celluContour: "Cellu'contour",
      celluContourDesc:
        "Traitement anti-cellulite intensif sur-mesure. Ses actifs concentrés en extraits marins et végétaux associés aux techniques de modelage novatrices.",
      detoxRitual: "Rituel détox corps",
      detoxRitualDesc:
        "Après un gommage tonique, un concentré d'actifs marins est frictionné avec une gestuelle spécifique détox.",

      // Treatment names - Men
      facialOxygen: "Facial oxygen booster",
      facialOxygenDesc:
        "Soin revitalisant spécialement conçu pour la peau masculine, apportant fraîcheur et éclat.",

      // Treatment names - Body scrubs
      bodyScrubChoice: "Au choix parmi",
      bodyScrubChoiceDesc:
        "Le gommage affine, adoucit l'épiderme et prépare la peau pour optimiser les soins suivants. Grâce à ce large choix d'ingrédients gourmands, variez les plaisirs pour le plus grand bonheur des sens.",

      // Treatment names - Wraps
      fullBodyWrap: "Enveloppement corps complet",
      fullBodyWrapDesc:
        "Réalisés sur un lit d'eau chaude flottant offrant une variation de couleurs uniques, ces « Duo Enveloppements » associent l'application, sur tout le corps, d'enveloppements d'algues à un massage du cuir chevelu.",

      // Treatment names - Massages under affusion
      seaMistMassage: "Massage bruine de mer à la criste marine Bio",
      seaMistMassageDesc:
        "Massage sous une fine bruine d'eau de mer enrichie à la criste marine biologique, pour une expérience de détente unique.",
      supremeSeaMist: "Suprême massage bruine de mer à 4 mains",
      supremeSeaMistDesc:
        "Massage d'exception à quatre mains sous bruine de mer, enrichi à la criste marine biologique pour une relaxation suprême.",
      palperRoulerSlim: "La séance palper-rouler SLIM",
      palperRoulerSlimDesc:
        "Palper-rouler SLIM sous pluie de sea : massage amincissant avec technique de palper-rouler sous une pluie d'eau de mer.",
      palperRouler5Sessions: "Les 5 séances palper-rouler SLIM",
      palperRouler5SessionsDesc:
        "Forfait de 5 séances de palper-rouler SLIM pour des résultats optimaux et durables.",
    },
    en: {
      // Navigation sections
      allTreatments: "All Treatments",
      allTreatmentsDesc: "All our treatments at a glance",
      treatmentsAlaCarte: "À la Carte Treatments",
      treatmentsAlaCarteDesc: "Personalized treatments according to your needs",
      marineCard: "Marine Card",
      marineCardDesc: "Benefits of thalassotherapy",
      massageCard: "Massage Card",
      massageCardDesc: "Deep relaxation and wellness",

      // Category titles
      face: "FACE",
      faceSubtitle: "BEAUTY",
      faceDescription:
        "TREATMENT THAT COMBINES THE BENEFITS OF THALASSO WITH THOSE OF AESTHETICS",
      men: "MEN",
      menSubtitle: "FOR MEN",
      menDescription: "TREATMENTS SPECIALLY DESIGNED FOR MEN",
      body: "BODY",
      bodySubtitle: "WELLNESS",
      bodyDescription: "RELAXING AND REVITALIZING BODY TREATMENTS",
      massagesAffusions: "MASSAGES UNDER AFFUSIONS",
      massagesAffusionsSubtitle: "WELLNESS",
      massagesAffusionsDescription: "RELAXING MASSAGES UNDER SEAWATER MIST",
      massagesWellbeing: "MASSAGES & WELLNESS",
      massagesWellbeingSubtitle: "RELAXATION",
      massagesWellbeingDescription:
        "RELAXING AND THERAPEUTIC MASSAGES FOR YOUR WELLNESS",

      // Button texts
      learnMore: "LEARN MORE",
      back: "Back",
      close: "Close",
      duration: "Duration",
      price: "Price",
      sessions: "sessions",

      // Beauty categories
      essentialBeauty: "Essential Beauty",
      eyeBeauty: "Eye Beauty",
      relaxation: "Relaxation",
      silhouette: "Silhouette",

      // Men's category
      specialMen: "For Men",

      // Body categories
      bodyScrubs: "Body Scrubs",
      wraps: "Wraps",

      // Massage categories
      massagesUnderAffusion: "Massages under Affusion",
      asianMassages: "Asian Massages",
      therapeuticMassages: "Therapeutic Massages",
      wellnessMassages: "Wellness Massages",

      // Pricing disclaimer
      pricingDisclaimer:
        "Prices in euros are given for indicative purposes only",

      // Introduction
      introTitle: "Our Treatments & Cards",
      introText1: "The",
      introText1After:
        "treatment card takes you on a journey to discover the benefits of the sea, in a universe of unforgettable sensations combining exclusive gestures with cutting-edge equipment!",
      introText2: "Experience a unique marine treatment experience.",

      // Treatment names and descriptions - Face
      beautyTreatment30: "Beauty Treatment",
      beautyTreatment30Desc:
        "Need hydration, nutrition, softness or purity? After a professional diagnosis of your skin, the beautician will advise you on your personalized treatment.",
      beautyTreatment60: "Beauty Treatment",
      beautyTreatment60Desc:
        "Scrub, mask and massage follow one another to enhance your skin. It radiates freshness.",
      eyeLiftExpert: "Expert Eye Lift",
      eyeLiftExpertDesc:
        "Specialized eye contour treatment, reducing signs of fatigue and first wrinkles.",
      absoluteRelaxation: "Absolute Relaxation",
      absoluteRelaxationDesc:
        "The Relaxing Energy Modeling (M.E.R.) rebalances and harmonizes body energies. A deeply relaxing and regenerating escape.",

      // Treatment names - Silhouette
      firmness: "Firmness Performance",
      firmnessDesc:
        "Anti-aging toning body mask, ideal for preserving skin tone. Objective: reshape the silhouette, firm and densify the skin.",
      tonicLegs: "Tonic Legs",
      tonicLegsDesc:
        "Ally of heavy legs, this decongestant treatment provides instant relief. The legs regain shape, lightness and vitality.",
      silhouetteDrainage: "Silhouette Drainage",
      silhouetteDrainageDesc:
        "Fights against circulatory disorders of the lower limbs by combining the virtues of the sea with manual draining maneuvers.",
      stretchMarks: "Stretch Mark Action",
      stretchMarksDesc:
        "Preventive and reducing effect that restores skin elasticity and restructures tissues.",
      celluContour: "Cellu'contour",
      celluContourDesc:
        "Intensive tailor-made anti-cellulite treatment. Its active ingredients concentrated in marine and plant extracts combined with innovative modeling techniques.",
      detoxRitual: "Body Detox Ritual",
      detoxRitualDesc:
        "After a tonic scrub, a concentrate of marine active ingredients is rubbed with specific detox gestures.",

      // Treatment names - Men
      facialOxygen: "Facial Oxygen Booster",
      facialOxygenDesc:
        "Revitalizing treatment specially designed for masculine skin, bringing freshness and radiance.",

      // Treatment names - Body scrubs
      bodyScrubChoice: "Choose from",
      bodyScrubChoiceDesc:
        "The scrub refines, softens the epidermis and prepares the skin to optimize the following treatments. Thanks to this wide choice of delicious ingredients, vary the pleasures for the greatest happiness of the senses.",

      // Treatment names - Wraps
      fullBodyWrap: "Full Body Wrap",
      fullBodyWrapDesc:
        "Performed on a floating warm water bed offering unique color variations, these 'Duo Wraps' combine the application of algae wraps on the whole body with a scalp massage.",

      // Treatment names - Massages under affusion
      seaMistMassage: "Organic Sea Mist Massage with Sea Samphire",
      seaMistMassageDesc:
        "Massage under a fine mist of seawater enriched with organic sea samphire, for a unique relaxation experience.",
      supremeSeaMist: "Supreme 4-Hand Sea Mist Massage",
      supremeSeaMistDesc:
        "Exceptional four-hand massage under sea mist, enriched with organic sea samphire for supreme relaxation.",
      palperRoulerSlim: "SLIM Roll-Pinch Session",
      palperRoulerSlimDesc:
        "SLIM roll-pinch under sea rain: slimming massage with roll-pinch technique under seawater rain.",
      palperRouler5Sessions: "5 SLIM Roll-Pinch Sessions",
      palperRouler5SessionsDesc:
        "Package of 5 SLIM roll-pinch sessions for optimal and lasting results.",
    },
  };

  // Get current translations
  const t = translations[language];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle section change events from navbar
  useEffect(() => {
    const handleSectionChange = (event) => {
      const { sectionId } = event.detail;
      console.log("Received section change event:", sectionId); // Debug log
      setActiveSection(sectionId);
    };

    document.addEventListener("changeSoinsSection", handleSectionChange);
    return () => {
      document.removeEventListener("changeSoinsSection", handleSectionChange);
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedCategoryModal(null);
      }
    };

    if (selectedCategoryModal) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedCategoryModal]);

  // Main sections data
  const sections = [
    {
      id: "toutes-les-soins",
      title: t.allTreatments,
      description: t.allTreatmentsDesc,
    },
    {
      id: "soins-carte",
      title: t.treatmentsAlaCarte,
      description: t.treatmentsAlaCarteDesc,
    },
    {
      id: "carte-marine",
      title: t.marineCard,
      description: t.marineCardDesc,
    },
    {
      id: "carte-massages",
      title: t.massageCard,
      description: t.massageCardDesc,
    },
  ];

  // Les soins à la carte categories (from VisageCorpsHomme.jsx)
  const soinsCarteData = {
    categories: [
      {
        id: "visage",
        title: t.face,
        subtitle: t.faceSubtitle,
        description: t.faceDescription,
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/V1.webp",
        buttonText: t.learnMore,
        icon: <Sparkles className="w-5 h-5" />,
        services: [
          {
            id: "beaute-essentielle",
            category: t.essentialBeauty,
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V2.webp",
            treatments: [
              {
                name: t.beautyTreatment30,
                duration: "30'",
                price: "100 TND / 31 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V3.webp",
                description: t.beautyTreatment30Desc,
              },
              {
                name: t.beautyTreatment60,
                duration: "60'",
                price: "190 TND / 58 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V4.webp",
                description: t.beautyTreatment60Desc,
              },
            ],
          },
          {
            id: "beaute-yeux",
            category: t.eyeBeauty,
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V5.webp",
            treatments: [
              {
                name: t.eyeLiftExpert,
                duration: "30'",
                price: "100 TND / 31 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V6.webp",
                description: t.eyeLiftExpertDesc,
              },
            ],
          },
          {
            id: "eternelle-jeunesse",
            category: "Eternelle Jeunesse",
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V7.webp",
            treatments: [
              {
                name: "Lift absolu",
                duration: "60'",
                price: "200 TND / 61 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V8.webp",
                description:
                  "Son action repulpante et défroissante atténue visiblement les marques du temps. Sous l'action du modelage restructurant personnalisé, les traits sont reposés.",
              },
              {
                name: "Eclat originel",
                duration: "60'",
                price: "180 TND / 55 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V9.webp",
                description:
                  "Véritable innovation alliant bienfaits marins aux enzymes de fruits et à la vitamine C pour stimuler le renouvellement cellulaire des peaux ternes.",
              },
              {
                name: "Expert anti-âge",
                duration: "75'",
                price: "200 TND / 61 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V10.webp",
                description:
                  "Réponse ciblée contre les effets du temps pour restaurer votre capital jeunesse. Ce soin sur-mesure haute précision comble rides et ridules.",
              },
            ],
          },
        ],
      },
      {
        id: "corps",
        title: t.body,
        subtitle: t.bodySubtitle,
        description: t.bodyDescription,
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/V11.webp",
        buttonText: t.learnMore,
        icon: <Leaf className="w-5 h-5" />,
        services: [
          {
            id: "relaxation",
            category: t.relaxation,
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V12.webp",
            treatments: [
              {
                name: "Détente absolue",
                duration: "60'",
                price: "180 TND / 55 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V13.webp",
                description:
                  "Le Modelage Énergétique Relaxant (M.E.R.) rééquilibre et harmonise les énergies corporelles. Une évasion profondément relaxante et régénérante.",
              },
            ],
          },
          {
            id: "silhouette",
            category: "Silhouette",
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V14.webp",
            treatments: [
              {
                name: "Performance fermeté",
                duration: "45'",
                price: "150 TND / 46 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V15.webp",
                description:
                  "Masque corporel anti-âge tonifiant, idéal pour préserver la tonicité de la peau. Objectif : remodeler la silhouette, raffermir et densifier la peau.",
              },
              {
                name: "Jambes toniques",
                duration: "30'",
                price: "95 TND / 29 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V16.webp",
                description:
                  "Allié des jambes lourdes, ce soin décongestionnant soulage instantanément. Les jambes retrouvent galbe, légèreté et vitalité.",
              },
              {
                name: "Drainage silhouette",
                duration: "60'",
                price: "180 TND / 55 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V17.webp",
                description:
                  "Lutte contre les troubles circulatoires des membres inférieurs en associant les vertus de la mer à des manœuvres manuelles drainantes.",
              },
              {
                name: "Action vergetures",
                duration: "45'",
                price: "150 TND / 46 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V18.webp",
                description:
                  "Effet préventif et réducteur qui restaure l'élasticité de la peau et restructure les tissus.",
              },
              {
                name: "Cellu'contour",
                duration: "60'",
                price: "200 TND / 61 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V19.webp",
                description:
                  "Traitement anti-cellulite intensif sur-mesure. Ses actifs concentrés en extraits marins et végétaux associés aux techniques de modelage novatrices.",
              },
              {
                name: "Rituel détox corps",
                duration: "90'",
                price: "270 TND / 82 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V20.webp",
                description:
                  "Après un gommage tonique, un concentré d'actifs marins est frictionné avec une gestuelle spécifique détox.",
              },
            ],
          },
        ],
      },
      {
        id: "homme",
        title: t.men,
        subtitle: t.menSubtitle,
        description: t.menDescription,
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/V21.webp",
        buttonText: t.learnMore,
        icon: <Heart className="w-5 h-5" />,
        services: [
          {
            id: "special-homme",
            category: t.specialMen,
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V21.webp",
            treatments: [
              {
                name: "Facial oxygen booster",
                duration: "60'",
                price: "160 TND / 49 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V22.webp",
                description:
                  "Objectif : redonner tonus et fermeté, grâce à des modelages profonds du cuir chevelu, du visage, des trapèzes et de la nuque.",
              },
              {
                name: "Bonne mine express",
                duration: "30'",
                price: "95 TND / 29 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V23.webp",
                description:
                  "Ce soin express comble la peau d'actifs ultra concentrés pour un résultat immédiat.",
              },
              {
                name: "Décontraction dos",
                duration: "45'",
                price: "135 TND / 41 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V24.webp",
                description:
                  "Son action sur la masse musculaire fait de ce soin un moment d'extrême relaxation.",
              },
            ],
          },
        ],
      },
    ],
  };

  // Carte Marine data (from CarteMarin.jsx)
  const carteMarineData = {
    categories: [
      {
        id: "parcours-relaxation",
        title: "PARCOURS & RELAXATION",
        subtitle: "AQUATIQUE",
        description: "BAINS À REMOUS, CASCADES ET JETS SOUS-MARINS",
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C0.webp",
        buttonText: "EN SAVOIR +",
        icon: <Waves className="w-5 h-5" />,
        services: [
          {
            id: "parcours-marin",
            category: "Parcours Marin",
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C1.webp",
            treatments: [
              {
                name: "L'entrée",
                duration: "20'",
                price: "50 TND / 16 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C2.webp",
                description:
                  "Dans une magnifique piscine d'eau de mer chauffée, profitez des bains à remous, des cascades, des jets sous-marins, des lits hydromassants, des aquabikes et du parcours de marche à contre-courant pour activer votre circulation sanguine et améliorer votre tonicité musculaire.",
              },
              {
                name: "Le forfait de 5 entrées",
                duration: "20'",
                price: "160 TND / 49 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C3.webp",
                description:
                  "Forfait économique pour profiter régulièrement des bienfaits du parcours marin. Activez votre circulation et renforcez votre tonicité musculaire.",
                entries: "5 entrées",
              },
              {
                name: "L'entrée parcours marin + hammam",
                duration: "20'",
                price: "60 TND / 19 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C4.webp",
                description:
                  "Combinaison parfaite entre les bienfaits du parcours marin et la détente du hammam traditionnel.",
              },
              {
                name: "Le forfait de 5 entrées parcours + hammam",
                duration: "20'",
                price: "200 TND / 61 €",
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
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C8.webp",
            treatments: [
              {
                name: "Relaxation Marine",
                duration: "20'",
                price: "125 TND / 38 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C9.webp",
                description:
                  "Ce massage réalisé dans notre piscine d'eau de mer chaude, vous invite à un véritable voyage à travers les sens. Pendant que vous flottez, le thérapeute effectue des mouvements fluides et des étirements légers qui détendent les muscles.",
              },
            ],
          },
        ],
      },
      {
        id: "douches-bains",
        title: "DOUCHES & BAINS",
        subtitle: "HYDROTHÉRAPIE",
        description: "BIENFAITS DE L'EAU DE MER ET DE L'HYDROTHÉRAPIE",
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C12.webp",
        buttonText: "EN SAVOIR +",
        icon: <Droplets className="w-5 h-5" />,
        services: [
          {
            id: "douches",
            category: "Douches",
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C13.webp",
            treatments: [
              {
                name: "Douche drainante sous marine",
                duration: "20'",
                price: "85 TND / 26 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C14.webp",
                description:
                  "Ce soin est réalisé par un hydrothérapeute dans un bain de mer chauffée à 37 °C. L'ensemble du corps est massé et drainé grâce à un jet puissant favorisant ainsi la circulation.",
              },
              {
                name: "Grand jet tonique & douche à pomme",
                duration: "15'",
                price: "75 TND / 23 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C15.webp",
                description:
                  "L'hydrothérapeute balaye tout le corps grâce à un puissant jet d'eau de mer. La pression réglable du jet améliore le tonus musculaire et décontracte le corps.",
              },
            ],
          },
          {
            id: "bains",
            category: "Bains",
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C16.webp",
            treatments: [
              {
                name: "Bains",
                duration: "20'",
                price: "85 TND / 26 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C17.webp",
                description:
                  "Il existe une affinité particulière entre nos cellules et le milieu marin originel. Au contact de la mer, on se ressource et sa force vitale stimule tout notre être. Plongez à la découverte des bains de mer, fantastiques réservoirs de santé.",
              },
            ],
          },
          {
            id: "la-sieste",
            category: "Le Siesté",
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C10.webp",
            treatments: [
              {
                name: "Le Siesté",
                duration: "80'",
                price: "310 TND / 94 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C11.webp",
                description:
                  "Pour débuter ce rituel, vous plongez dans une vasque généreuse et sensuelle pour profiter d'un bain aromatique relaxant (20'). Vous laissez vos sens vagabonder, puis un massage complet du corps commence (60').",
              },
            ],
          },
        ],
      },
      {
        id: "gommages-enveloppements",
        title: "GOMMAGES & ENVELOPPEMENTS",
        subtitle: "RITUELS",
        description: "GOMMAGES EXFOLIANTS ET ENVELOPPEMENTS NOURRISSANTS",
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C25.webp",
        buttonText: "EN SAVOIR +",
        icon: <Bath className="w-5 h-5" />,
        services: [
          {
            id: "gommages",
            category: "Gommages Corporels",
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C26.webp",
            treatments: [
              {
                name: "Gommage corps complet",
                duration: "20'",
                price: "95 TND / 29 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C27.webp",
                description:
                  "Le gommage affine, adoucit l'épiderme et prépare la peau pour optimiser les soins suivants. Grâce à ce large choix d'ingrédients gourmands, variez les plaisirs pour le plus grand bonheur des sens.",
              },
            ],
          },
          {
            id: "enveloppements",
            category: "Enveloppements",
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C28.webp",
            treatments: [
              {
                name: "Enveloppement corps complet",
                duration: "20'",
                price: "110 TND / 34 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C29.webp",
                description:
                  "Réalisés sur un lit d'eau chaude flottant offrant une variation de couleurs uniques, ces « Duo Enveloppements » associent l'application, sur tout le corps, d'enveloppements d'algues à un massage du cuir chevelu.",
              },
            ],
          },
        ],
      },
      {
        id: "massages-affusions",
        title: "MASSAGES SOUS AFFUSIONS",
        subtitle: "BIEN-ÊTRE",
        description: "MASSAGES RELAXANTS SOUS BRUINE D'EAU DE MER",
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C18.webp",
        buttonText: "EN SAVOIR +",
        icon: <Heart className="w-5 h-5" />,
        services: [
          {
            id: "massages-affusion",
            category: "Massages sous Affusion",
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C19.webp",
            treatments: [
              {
                name: "Massage bruine de mer à la criste marine Bio",
                duration: "25'",
                price: "110 TND / 34 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C20.webp",
                description:
                  "Massage sous une fine bruine d'eau de mer enrichie à la criste marine biologique, pour une expérience de détente unique.",
              },
              {
                name: "Suprême massage bruine de mer à 4 mains",
                duration: "25'",
                price: "190 TND / 58 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C21.webp",
                description:
                  "Massage d'exception à quatre mains sous bruine de mer, enrichi à la criste marine biologique pour une relaxation suprême.",
              },
              {
                name: "La séance palper-rouler SLIM",
                duration: "25'",
                price: "150 TND / 46 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C23.webp",
                description:
                  "Palper-rouler SLIM sous pluie de sea : massage amincissant avec technique de palper-rouler sous une pluie d'eau de mer.",
              },
              {
                name: "Les 5 séances palper-rouler SLIM",
                duration: "25'",
                price: "570 TND / 173 €",
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
    ],
  };

  // Carte Massages data (from CarteMassage.jsx)
  const carteMassagesData = {
    categories: [
      {
        id: "massages-bien-etre",
        title: "MASSAGES & BIEN-ÊTRE",
        subtitle: "DÉTENTE",
        description:
          "MASSAGES RELAXANTS ET THÉRAPEUTIQUES POUR VOTRE BIEN-ÊTRE",
        image: "/src/pages/Thalion/BrochureSections/assets/X1.JPG",
        buttonText: "EN SAVOIR +",
        icon: <HandHeart className="w-5 h-5" />,
        services: [
          {
            id: "massage-bien-etre",
            category: "Massage & Bien-être",
            image: "/src/pages/Thalion/BrochureSections/assets/X5.JPG",
            treatments: [
              {
                name: "Rêve éveillé",
                duration: "40'",
                price: "190 TND / 58 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X6.JPG",
                description:
                  "Massage relaxant pour une détente profonde et un voyage sensoriel unique.",
              },
              {
                name: "Douceur de brise à l'huile de coco",
                duration: "40'",
                price: "130 TND / 40 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X7.JPG",
                description:
                  "Massage doux à l'huile de coco pour nourrir et hydrater la peau.",
              },
              {
                name: "Bonheur des muscles au baume camphré",
                duration: "50'",
                price: "190 TND / 58 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X8.JPG",
                description:
                  "Massage tonifiant au baume camphré pour soulager les tensions musculaires.",
              },
              {
                name: "Massage du dos",
                duration: "25'",
                price: "95 TND / 29 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X9.JPG",
                description:
                  "Massage ciblé du dos pour décontracter et relaxer la zone dorsale.",
              },
              {
                name: "Souffle d'énergie à l'huile de noix du Brésil",
                duration: "40'",
                price: "130 TND / 40 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X10.JPG",
                description:
                  "Massage énergisant à l'huile de noix du Brésil pour retrouver vitalité.",
              },
              {
                name: "Silhouette enchantée aux eaux-mères",
                duration: "50'",
                price: "200 TND / 61 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X11.JPG",
                description:
                  "Massage modelant aux eaux-mères pour affiner et tonifier la silhouette.",
              },
              {
                name: "Grande réflexologie plantaire de l'Occident",
                duration: "75'",
                price: "290 TND / 88 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X20.JPG",
                description:
                  "Séance complète de réflexologie plantaire pour rééquilibrer l'organisme.",
              },
              {
                name: "Pieds sensibles",
                duration: "40'",
                price: "165 TND / 50 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X21.JPG",
                description:
                  "Soin spécialisé pour les pieds sensibles et fatigués.",
              },
              {
                name: "Duo aux galets chauds & pochons d'algues",
                duration: "75'",
                price: "290 TND / 88 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X22.JPG",
                description:
                  "Massage aux galets chauds et pochons d'algues à l'huile de criste marine Bio.",
              },
              {
                name: "Drainage Lymphatique",
                duration: "60'",
                price: "280 TND / 85 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X23.JPG",
                description:
                  "Technique spécialisée de drainage lymphatique pour améliorer la circulation.",
              },
            ],
          },
          {
            id: "massages-asiatiques",
            category: "Massages Asiatiques",
            image: "/src/pages/Thalion/BrochureSections/assets/X1.JPG",
            treatments: [
              {
                name: "Massage Balinais",
                duration: "60'",
                price: "270 TND / 82 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X2.JPG",
                description:
                  "Massage traditionnel indonésien qui combine pétrissage, acupression et étirements pour harmoniser le corps et l'esprit.",
              },
              {
                name: "Massage Abyhanga",
                duration: "60'",
                price: "270 TND / 82 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X3.JPG",
                description:
                  "Massage ayurvédique traditionnel à l'huile chaude qui revitalise le corps et équilibre les énergies.",
              },
              {
                name: "Massage Thai",
                duration: "60'",
                price: "300 TND / 91 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X4.JPG",
                description:
                  "Massage traditionnel thaïlandais qui combine acupression, étirements et travail énergétique pour une relaxation profonde.",
              },
            ],
          },
        ],
      },
      {
        id: "soins-therapies",
        title: "SOINS & THÉRAPIES",
        subtitle: "THÉRAPEUTIQUE",
        description: "SOINS SPÉCIALISÉS ET THÉRAPIES MANUELLES",
        image: "/src/pages/Thalion/BrochureSections/assets/X23.JPG",
        buttonText: "EN SAVOIR +",
        icon: <Heart className="w-5 h-5" />,
        services: [
          {
            id: "soins-therapies",
            category: "Soins & Thérapies",
            image: "/src/pages/Thalion/BrochureSections/assets/X23.JPG",
            treatments: [
              {
                name: "Pressothérapie",
                duration: "20'",
                price: "95 TND / 29 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X24.JPG",
                description:
                  "Traitement de drainage lymphatique mécanique qui améliore la circulation sanguine et lymphatique, aide à éliminer les toxines et réduit la sensation de jambes lourdes.",
              },
              {
                name: "Heat Experience",
                duration: "60'",
                price: "180 TND / 55 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X30.JPG",
                description:
                  "Expérience thermale complète combinant différentes sources de chaleur pour une détoxification profonde et une relaxation intense.",
              },
              {
                name: "Sauna",
                duration: "20'",
                price: "55 TND / 17 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X31.JPG",
                description:
                  "Séance de sauna traditionnel pour éliminer les toxines, détendre les muscles et purifier la peau par la transpiration.",
              },
              {
                name: "Cérémonie Duo d'Algues & Argile",
                duration: "50'",
                price: "165 TND / 50 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X32.JPG",
                description:
                  "Rituel purifiant et revitalisant combinant les bienfaits des algues marines et de l'argile pour détoxifier, nourrir et régénérer la peau en profondeur.",
              },
            ],
          },
        ],
      },
      {
        id: "ceremonie-hammam",
        title: "HAMMAM  & MASSAGES",
        subtitle: "RITUEL",
        description: "EXPÉRIENCE AUTHENTIQUE DU HAMMAM TRADITIONNEL",
        image: "/src/pages/Thalion/BrochureSections/assets/X33.JPG",
        buttonText: "EN SAVOIR +",
        icon: <Bath className="w-5 h-5" />,
        services: [
          {
            id: "hammam-experience",
            category: "Hammam Experience",
            image: "/src/pages/Thalion/BrochureSections/assets/X33.JPG",
            treatments: [
              {
                name: "Hammam + gommage + enveloppement + massage",
                duration: "60'",
                price: "240 TND / 73 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X34.JPG",
                description:
                  "Rituel complet du hammam avec gommage au savon vert, application Terre et Mer (boue marine bienfaisante), suivi d'un massage relaxant. Une expérience authentique du « Pays des Mille et Une Nuits ».",
              },
              {
                name: "Hammam + massage",
                duration: "30'",
                price: "95 TND / 29 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X35.JPG",
                description:
                  "Séance de hammam suivie d'un massage relaxant pour prolonger les bienfaits de la chaleur humide.",
              },
              {
                name: "Hammam + gommage",
                duration: "30'",
                price: "90 TND / 28 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X36.JPG",
                description:
                  "Hammam traditionnel suivi d'un gommage au savon vert pour purifier et adoucir la peau.",
              },
              {
                name: "Hammam Latitude des îles",
                duration: "50'",
                price: "210 TND / 64 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X37.JPG",
                description:
                  "Hammam + Gommage douceur Bora Bora + Enveloppement douceur à la pulpe de coco. Voyage sensoriel aux parfums des îles paradisiaques.",
              },
              {
                name: "Hammam Latitude oasis",
                duration: "50'",
                price: "210 TND / 64 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X1.JPG",
                description:
                  "Hammam + Gommage tonique aux agrumes + Enveloppement soyeux « poudre de coton ». Évasion au cœur d'une oasis de bien-être.",
              },
              {
                name: "Hammam Latitude du soleil levant",
                duration: "50'",
                price: "210 TND / 64 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X2.JPG",
                description:
                  "Hammam + Gommage silhouette aux 3 thés + Enveloppement minceur aux 3 thés. Rituel énergisant inspiré des traditions orientales.",
              },
              {
                name: "Hammam Latitude océane",
                duration: "50'",
                price: "210 TND / 64 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X3.JPG",
                description:
                  "Hammam + Gommage revitalisant aux huiles essentielles + Enveloppement force marine. Plongée revitalisante dans les profondeurs océanes.",
              },
            ],
          },
        ],
      },
    ],
  };

  const getCurrentData = () => {
    switch (activeSection) {
      case "toutes-les-soins":
        // Combine all categories from all sections
        return {
          categories: [
            ...soinsCarteData.categories,
            ...carteMarineData.categories,
            ...carteMassagesData.categories,
          ],
        };
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

  const renderIntroduction = () => (
    <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl md:text-6xl font-light text-gray-800 mb-6 md:mb-8"
      >
        {t.introTitle}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 md:space-y-6 text-gray-700 text-base md:text-lg leading-relaxed"
      >
        <p className="px-2">
          {t.introText1}{" "}
          <span className="font-semibold text-amber-600">THALION</span>{" "}
          {t.introText1After}
        </p>

        <p className="text-lg md:text-xl font-medium text-amber-700 px-2">
          {t.introText2}
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
    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 md:gap-12 mb-12 md:mb-16">
      {sections.map((section) => (
        <motion.button
          key={section.id}
          onClick={() => {
            setActiveSection(activeSection === section.id ? null : section.id);
            setActiveCategory(null);
            setExpandedService(null);
          }}
          className={`text-center transition-all duration-300 p-4 md:p-6 rounded-xl ${
            activeSection === section.id
              ? "bg-amber-50 border-2 border-amber-300 text-amber-700"
              : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50 border-2 border-transparent"
          }`}
          whileHover={!isMobile ? { y: -4 } : {}}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium mb-1 md:mb-2">
            {section.title}
          </h3>
          <p className="text-xs sm:text-sm opacity-75 leading-tight">
            {section.description}
          </p>
        </motion.button>
      ))}
    </div>
  );

  const renderCategoryCards = () => {
    const data = getCurrentData();
    if (!data) return null;

    // Dynamic grid based on number of categories
    const categoryCount = data.categories.length;
    let gridCols = "grid-cols-1 md:grid-cols-2";
    let containerClass = "";

    if (categoryCount === 2) {
      gridCols = "grid-cols-1 md:grid-cols-2";
      containerClass = "max-w-4xl mx-auto"; // Center 2 items
    } else if (categoryCount === 3) {
      gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      containerClass = "max-w-5xl mx-auto"; // Center 3 items
    } else if (categoryCount === 4) {
      gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      containerClass = ""; // Full width for 4 items
    } else if (categoryCount >= 5) {
      // For "Toutes les soins" view with 8 categories
      gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      containerClass = ""; // Full width for many items
    } else {
      gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      containerClass = "max-w-5xl mx-auto";
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`grid ${gridCols} gap-3 sm:gap-4 md:gap-6 mb-12 md:mb-16 px-2 sm:px-0 ${containerClass}`}
      >
        {data.categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedCategoryModal(category)}
          >
            <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden rounded-lg shadow-lg">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <h4 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                    {category.title}
                  </h4>
                  {category.subtitle && (
                    <p className="text-xs sm:text-sm font-medium text-amber-300 mb-1 sm:mb-2">
                      {category.subtitle}
                    </p>
                  )}
                  {category.description && (
                    <p className="text-xs mb-2 sm:mb-3 leading-relaxed opacity-90 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-xs opacity-90 mb-2">
                    {category.icon}
                    <span className="text-xs">
                      {category.services?.length || 0} catégories disponibles
                    </span>
                  </div>

                  <button className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-medium transition-all duration-300 hover:bg-white/30 hover:border-white/50">
                    {category.buttonText || "EN SAVOIR +"}
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const renderCategoryServices = () => {
    const data = getCurrentData();
    const category = data?.categories.find((cat) => cat.id === activeCategory);
    if (!category || !category.services) return null;

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
            <span>{t.back}</span>
          </button>
          <div className="h-6 w-px bg-gray-300" />
          <h3 className="text-2xl font-light text-gray-800">
            {category.title}
          </h3>
        </div>

        <div className="space-y-8">
          {category.services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedService(
                    expandedService === service.id ? null : service.id
                  )
                }
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <h4 className="text-xl font-medium text-gray-800">
                      {service.category}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {service.treatments.length} soins disponibles
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    expandedService === service.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedService === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0">
                      {/* Treatment Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.treatments.map((treatment, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                          >
                            <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
                              {/* Treatment Image */}
                              <img
                                src={
                                  treatment.image ||
                                  service.image ||
                                  category.image
                                }
                                alt={treatment.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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

                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                              {/* Price Badge */}
                              <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-lg font-bold shadow-lg">
                                {treatment.price}
                              </div>

                              {/* Duration Badge */}
                              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 backdrop-blur-sm">
                                <Clock className="w-3 h-3" />
                                {treatment.duration}
                              </div>

                              {/* Content */}
                              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                                <h5 className="text-lg font-bold mb-2 group-hover:text-amber-300 transition-colors">
                                  {treatment.name}
                                </h5>
                                <p className="text-sm opacity-90 mb-4 line-clamp-3 leading-relaxed">
                                  {treatment.description}
                                </p>

                                {/* Reserve Button */}
                                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform group-hover:scale-105">
                                  Réserver
                                </button>

                                {treatment.entries && (
                                  <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full self-start">
                                    {treatment.entries}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Pricing Disclaimer */}
                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 italic">
                          {t.pricingDisclaimer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderOtherCategories = () => {
    const data = getCurrentData();
    if (!data || activeSection === "soins-carte") return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {data.categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-teal-50 to-cyan-50">
              {category.icon}
              <h3 className="text-2xl font-medium text-gray-800">
                {category.title}
              </h3>
            </div>

            <div className="p-6 space-y-6">
              {category.services.map((service) => (
                <div
                  key={service.id}
                  className="border-l-4 border-teal-300 pl-6"
                >
                  <h4 className="text-lg font-medium text-gray-800 mb-4">
                    {service.category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.treatments.map((treatment, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-800">
                            {treatment.name}
                          </h5>
                          <div className="text-right">
                            <div className="text-lg font-bold text-teal-600">
                              {treatment.price}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="w-3 h-3" />
                              <span>{treatment.duration}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {treatment.description}
                        </p>
                        {treatment.entries && (
                          <span className="inline-block px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full mb-3">
                            {treatment.entries}
                          </span>
                        )}
                        <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-2 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all duration-300">
                          Réserver
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Pricing Disclaimer */}
              <div className="mt-6 text-center border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 italic">
                  {t.pricingDisclaimer}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Modal component for category details
  const renderCategoryModal = () => {
    if (!selectedCategoryModal) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-20 md:pt-24 p-2 sm:p-4"
          onClick={() => setSelectedCategoryModal(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl max-w-6xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Close Button Container - Mobile positioned lower */}
            <div className="sticky top-8 sm:top-0 z-[10000] flex justify-end p-4 sm:p-4 bg-white/95 backdrop-blur-sm border-b border-gray-100">
              <button
                onClick={() => setSelectedCategoryModal(null)}
                className="w-12 h-12 sm:w-10 sm:h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-xl border-2 border-white"
              >
                <X className="w-6 h-6 sm:w-5 sm:h-5 font-bold" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-130px)] sm:max-h-[calc(90vh-80px)]">
              {/* Modal Header */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={selectedCategoryModal.image}
                  alt={selectedCategoryModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                    {selectedCategoryModal.title}
                  </h2>
                  {selectedCategoryModal.subtitle && (
                    <p className="text-lg sm:text-xl text-amber-300 mb-2">
                      {selectedCategoryModal.subtitle}
                    </p>
                  )}
                  {selectedCategoryModal.description && (
                    <p className="text-sm sm:text-base md:text-lg opacity-90 leading-tight">
                      {selectedCategoryModal.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6">
                {selectedCategoryModal.services?.map(
                  (service, serviceIndex) => (
                    <div key={service.id} className="mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 border-b border-amber-200 pb-2">
                        {service.category}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {service.treatments?.map(
                          (treatment, treatmentIndex) => (
                            <motion.div
                              key={treatmentIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: treatmentIndex * 0.1 }}
                              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                              <div className="relative h-40 sm:h-48 overflow-hidden">
                                <img
                                  src={treatment.image}
                                  alt={treatment.name}
                                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Price Badge */}
                                <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                                  {treatment.price}
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {treatment.duration}
                                </div>
                              </div>

                              <div className="p-3 sm:p-4">
                                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                                  {treatment.name}
                                </h4>
                                <p className="text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-tight">
                                  {treatment.description}
                                </p>

                                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-sm sm:text-base">
                                  Réserver
                                </button>

                                {treatment.entries && (
                                  <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                                    {treatment.entries}
                                  </span>
                                )}
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {renderIntroduction()}
        {renderSectionTabs()}

        <AnimatePresence mode="wait">
          {activeSection && (
            <div key={activeSection}>{renderCategoryCards()}</div>
          )}
        </AnimatePresence>
      </div>

      {/* Category Modal */}
      {renderCategoryModal()}
    </section>
  );
};

export default SoinsALaCarteNew;
