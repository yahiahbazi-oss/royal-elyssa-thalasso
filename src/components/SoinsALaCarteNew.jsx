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
import { useTranslation } from "react-i18next";

// Import images for fallback (Marine and Massages still need these)
import marineImage from "../assets/Thalasso_7.jpg";
import massageImage from "../assets/Thalasso_Thal'ion_17.jpg";

const SoinsALaCarteNew = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("toutes-les-soins");
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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
      title: t("soins.sections.allTreatments"),
      description: t("soins.sections.allTreatmentsDesc"),
    },
    {
      id: "soins-carte",
      title: t("soins.sections.treatmentsAlaCarte"),
      description: t("soins.sections.treatmentsAlaCarteDesc"),
    },
    {
      id: "carte-marine",
      title: t("soins.sections.marineCard"),
      description: t("soins.sections.marineCardDesc"),
    },
    {
      id: "carte-massages",
      title: t("soins.sections.massageCard"),
      description: t("soins.sections.massageCardDesc"),
    },
  ];

  // Les soins à la carte categories (from VisageCorpsHomme.jsx)
  const soinsCarteData = {
    categories: [
      {
        id: "visage",
        title: t("soins.categories.face"),
        subtitle: t("soins.categories.faceSubtitle"),
        description: t("soins.categories.faceDescription"),
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/V1.webp",
        buttonText: t("soins.buttons.learnMore"),
        icon: <Sparkles className="w-5 h-5" />,
        services: [
          {
            id: "beaute-essentielle",
            category: t("soins.subcategories.essentialBeauty"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V2.webp",
            treatments: [
              {
                name: t("soins.treatments.beautyTreatment30"),
                duration: "30'",
                price: "100 TND / 31 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V3.webp",
                description: t("soins.treatments.beautyTreatment30Desc"),
              },
              {
                name: t("soins.treatments.beautyTreatment60"),
                duration: "60'",
                price: "190 TND / 58 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V4.webp",
                description: t("soins.treatments.beautyTreatment60Desc"),
              },
            ],
          },
          {
            id: "beaute-yeux",
            category: t("soins.subcategories.eyeBeauty"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V5.webp",
            treatments: [
              {
                name: t("soins.treatments.eyeLiftExpert"),
                duration: "30'",
                price: "100 TND / 31 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V6.webp",
                description: t("soins.treatments.eyeLiftExpertDesc"),
              },
            ],
          },
          {
            id: "eternelle-jeunesse",
            category: t("soins.subcategories.eternalYouth"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V7.webp",
            treatments: [
              {
                name: t("soins.treatments.liftAbsolu"),
                duration: "60'",
                price: "200 TND / 61 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V8.webp",
                description: t("soins.treatments.liftAbsoluDesc"),
              },
              {
                name: t("soins.treatments.eclatOriginel"),
                duration: "60'",
                price: "180 TND / 55 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V9.webp",
                description: t("soins.treatments.eclatOriginelDesc"),
              },
              {
                name: t("soins.treatments.expertAntiAge"),
                duration: "75'",
                price: "200 TND / 61 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V10.webp",
                description: t("soins.treatments.expertAntiAgeDesc"),
              },
            ],
          },
        ],
      },
      {
        id: "corps",
        title: t("soins.categories.body"),
        subtitle: t("soins.categories.bodySubtitle"),
        description: t("soins.categories.bodyDescription"),
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/V11.webp",
        buttonText: t("soins.buttons.learnMore"),
        icon: <Leaf className="w-5 h-5" />,
        services: [
          {
            id: "relaxation",
            category: t("soins.subcategories.relaxation"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V12.webp",
            treatments: [
              {
                name: t("soins.treatments.absoluteRelaxation"),
                duration: "60'",
                price: "180 TND / 55 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V13.webp",
                description: t("soins.treatments.absoluteRelaxationDesc"),
              },
            ],
          },
          {
            id: "silhouette",
            category: t("soins.subcategories.silhouette"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V14.webp",
            treatments: [
              {
                name: t("soins.treatments.firmness"),
                duration: "45'",
                price: "150 TND / 46 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V15.webp",
                description: t("soins.treatments.firmnessDesc"),
              },
              {
                name: t("soins.treatments.tonicLegs"),
                duration: "30'",
                price: "95 TND / 29 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V16.webp",
                description: t("soins.treatments.tonicLegsDesc"),
              },
              {
                name: t("soins.treatments.silhouetteDrainage"),
                duration: "60'",
                price: "180 TND / 55 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V17.webp",
                description: t("soins.treatments.silhouetteDrainageDesc"),
              },
              {
                name: t("soins.treatments.stretchMarks"),
                duration: "45'",
                price: "150 TND / 46 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V18.webp",
                description: t("soins.treatments.stretchMarksDesc"),
              },
              {
                name: t("soins.treatments.celluContour"),
                duration: "60'",
                price: "200 TND / 61 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V19.webp",
                description: t("soins.treatments.celluContourDesc"),
              },
              {
                name: t("soins.treatments.detoxRitual"),
                duration: "90'",
                price: "270 TND / 82 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V20.webp",
                description: t("soins.treatments.detoxRitualDesc"),
              },
            ],
          },
        ],
      },
      {
        id: "homme",
        title: t("soins.categories.men"),
        subtitle: t("soins.categories.menSubtitle"),
        description: t("soins.categories.menDescription"),
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/V21.webp",
        buttonText: t("soins.buttons.learnMore"),
        icon: <Heart className="w-5 h-5" />,
        services: [
          {
            id: "special-homme",
            category: t("soins.subcategories.specialMen"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/V21.webp",
            treatments: [
              {
                name: t("soins.treatments.facialOxygen"),
                duration: "60'",
                price: "160 TND / 49 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V22.webp",
                description: t("soins.treatments.facialOxygenDesc"),
              },
              {
                name: t("soins.treatments.goodLookExpress"),
                duration: "30'",
                price: "95 TND / 29 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V23.webp",
                description: t("soins.treatments.goodLookExpressDesc"),
              },
              {
                name: t("soins.treatments.backRelaxation"),
                duration: "45'",
                price: "135 TND / 41 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/V24.webp",
                description: t("soins.treatments.backRelaxationDesc"),
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
            category: t("soins.subcategories.marineCourse"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C1.webp",
            treatments: [
              {
                name: t("soins.treatments.marineEntry"),
                duration: "20'",
                price: "50 TND / 16 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C2.webp",
                description: t("soins.treatments.marineEntryDesc"),
              },
              {
                name: t("soins.treatments.marinePackage5"),
                duration: "20'",
                price: "160 TND / 49 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C3.webp",
                description: t("soins.treatments.marinePackage5Desc"),
                entries: "5 entrées",
              },
              {
                name: t("soins.treatments.marineEntryHammam"),
                duration: "20'",
                price: "60 TND / 19 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C4.webp",
                description: t("soins.treatments.marineEntryHammamDesc"),
              },
              {
                name: t("soins.treatments.marinePackage5Hammam"),
                duration: "20'",
                price: "200 TND / 61 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C5.webp",
                description: t("soins.treatments.marinePackage5HammamDesc"),
                entries: "5 entrées",
              },
            ],
          },
          {
            id: "relaxation-marine",
            category: t("soins.subcategories.marineRelaxation"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C8.webp",
            treatments: [
              {
                name: t("soins.treatments.marineRelaxation"),
                duration: "20'",
                price: "125 TND / 38 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C9.webp",
                description: t("soins.treatments.marineRelaxationDesc"),
              },
            ],
          },
        ],
      },
      {
        id: "douches-bains",
        title: t("soins.categories.showersBaths"),
        subtitle: t("soins.categories.showersBathsSubtitle"),
        description: t("soins.categories.showersBathsDescription"),
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C12.webp",
        buttonText: t("soins.buttons.learnMore"),
        icon: <Droplets className="w-5 h-5" />,
        services: [
          {
            id: "douches",
            category: t("soins.subcategories.showers"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C13.webp",
            treatments: [
              {
                name: t("soins.treatments.underwaterDrainageShower"),
                duration: "20'",
                price: "85 TND / 26 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C14.webp",
                description: t("soins.treatments.underwaterDrainageShowerDesc"),
              },
              {
                name: t("soins.treatments.grandJetTonic"),
                duration: "15'",
                price: "75 TND / 23 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C15.webp",
                description: t("soins.treatments.grandJetTonicDesc"),
              },
            ],
          },
          {
            id: "bains",
            category: t("soins.subcategories.baths"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C16.webp",
            treatments: [
              {
                name: t("soins.treatments.seaBaths"),
                duration: "20'",
                price: "85 TND / 26 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C17.webp",
                description: t("soins.treatments.seaBathsDesc"),
              },
            ],
          },
          {
            id: "la-sieste",
            category: t("soins.subcategories.siesta"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C10.webp",
            treatments: [
              {
                name: t("soins.treatments.sieste"),
                duration: "80'",
                price: "310 TND / 94 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C11.webp",
                description: t("soins.treatments.siesteDesc"),
              },
            ],
          },
        ],
      },
      {
        id: "gommages-enveloppements",
        title: t("soins.categories.scrubsWraps"),
        subtitle: t("soins.categories.scrubsWrapsSubtitle"),
        description: t("soins.categories.scrubsWrapsDescription"),
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C25.webp",
        buttonText: t("soins.buttons.learnMore"),
        icon: <Bath className="w-5 h-5" />,
        services: [
          {
            id: "gommages",
            category: t("soins.subcategories.bodyScrubs"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C26.webp",
            treatments: [
              {
                name: t("soins.treatments.fullBodyScrub"),
                duration: "20'",
                price: "95 TND / 29 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C27.webp",
                description: t("soins.treatments.fullBodyScrubDesc"),
              },
            ],
          },
          {
            id: "enveloppements",
            category: t("soins.subcategories.wraps"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C28.webp",
            treatments: [
              {
                name: t("soins.treatments.fullBodyWrap"),
                duration: "20'",
                price: "110 TND / 34 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C29.webp",
                description: t("soins.treatments.fullBodyWrapDesc"),
              },
            ],
          },
        ],
      },
      {
        id: "massages-affusions",
        title: t("soins.categories.massagesAffusions"),
        subtitle: t("soins.categories.massagesAffusionsSubtitle"),
        description: t("soins.categories.massagesAffusionsDescription"),
        image: "/src/pages/Thalion/BrochureSections/assets/alacarte/C18.webp",
        buttonText: t("soins.buttons.learnMore"),
        icon: <Heart className="w-5 h-5" />,
        services: [
          {
            id: "massages-affusion",
            category: t("soins.subcategories.massagesUnderAffusion"),
            image:
              "/src/pages/Thalion/BrochureSections/assets/alacarte/C19.webp",
            treatments: [
              {
                name: t("soins.treatments.seaMistMassage"),
                duration: "25'",
                price: "110 TND / 34 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C20.webp",
                description: t("soins.treatments.seaMistMassageDesc"),
              },
              {
                name: t("soins.treatments.supremeSeaMist"),
                duration: "25'",
                price: "190 TND / 58 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C21.webp",
                description: t("soins.treatments.supremeSeaMistDesc"),
              },
              {
                name: t("soins.treatments.palperRoulerSlim"),
                duration: "25'",
                price: "150 TND / 46 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C23.webp",
                description: t("soins.treatments.palperRoulerSlimDesc"),
              },
              {
                name: t("soins.treatments.fiveSessionsPalperRouler"),
                duration: "25'",
                price: "570 TND / 173 €",
                image:
                  "/src/pages/Thalion/BrochureSections/assets/alacarte/C24.webp",
                description: t("soins.treatments.fiveSessionsPalperRoulerDesc"),
                entries: `5 ${t("soins.buttons.sessions")}`,
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
        title: t("soins.categories.massagesWellbeing"),
        subtitle: t("soins.categories.massagesWellbeingSubtitle"),
        description: t("soins.categories.massagesWellbeingDescription"),
        image: "/src/pages/Thalion/BrochureSections/assets/X1.JPG",
        buttonText: t("soins.buttons.learnMore"),
        icon: <HandHeart className="w-5 h-5" />,
        services: [
          {
            id: "massage-bien-etre",
            category: t("soins.subcategories.massageWellness"),
            image: "/src/pages/Thalion/BrochureSections/assets/X5.JPG",
            treatments: [
              {
                name: t("soins.treatments.awakeDream"),
                duration: "40'",
                price: "190 TND / 58 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X6.JPG",
                description: t("soins.treatments.awakeDreamDesc"),
              },
              {
                name: t("soins.treatments.coconutBreezeGentleness"),
                duration: "40'",
                price: "130 TND / 40 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X7.JPG",
                description: t("soins.treatments.coconutBreezeGentlenessDesc"),
              },
              {
                name: t("soins.treatments.muscleBlissCamphor"),
                duration: "50'",
                price: "190 TND / 58 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X8.JPG",
                description: t("soins.treatments.muscleBlissCamphorDesc"),
              },
              {
                name: t("soins.treatments.backMassage"),
                duration: "25'",
                price: "95 TND / 29 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X9.JPG",
                description: t("soins.treatments.backMassageDesc"),
              },
              {
                name: t("soins.treatments.brazilianNutEnergyBreath"),
                duration: "40'",
                price: "130 TND / 40 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X10.JPG",
                description: t("soins.treatments.brazilianNutEnergyBreathDesc"),
              },
              {
                name: t("soins.treatments.enchantedSilhouetteSeawater"),
                duration: "50'",
                price: "200 TND / 61 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X11.JPG",
                description: t("soins.treatments.enchantedSilhouetteSeawaterDesc"),
              },
              {
                name: t("soins.treatments.westernReflexology"),
                duration: "75'",
                price: "290 TND / 88 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X20.JPG",
                description: t("soins.treatments.westernReflexologyDesc"),
              },
              {
                name: t("soins.treatments.sensitiveFeet"),
                duration: "40'",
                price: "165 TND / 50 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X21.JPG",
                description: t("soins.treatments.sensitiveFeetDesc"),
              },
              {
                name: t("soins.treatments.hotStonesAlgaePouches"),
                duration: "75'",
                price: "290 TND / 88 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X22.JPG",
                description: t("soins.treatments.hotStonesAlgaePouchesDesc"),
              },
              {
                name: t("soins.treatments.lymphaticDrainage"),
                duration: "60'",
                price: "280 TND / 85 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X23.JPG",
                description: t("soins.treatments.lymphaticDrainageDesc"),
              },
            ],
          },
          {
            id: "massages-asiatiques",
            category: t("soins.subcategories.asianMassages"),
            image: "/src/pages/Thalion/BrochureSections/assets/X1.JPG",
            treatments: [
              {
                name: t("soins.treatments.balineseMassage"),
                duration: "60'",
                price: "270 TND / 82 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X2.JPG",
                description: t("soins.treatments.balineseMassageDesc"),
              },
              {
                name: t("soins.treatments.abhyangaMassage"),
                duration: "60'",
                price: "270 TND / 82 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X3.JPG",
                description: t("soins.treatments.abhyangaMassageDesc"),
              },
              {
                name: t("soins.treatments.thaiMassage"),
                duration: "60'",
                price: "300 TND / 91 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X4.JPG",
                description: t("soins.treatments.thaiMassageDesc"),
              },
            ],
          },
        ],
      },
      {
        id: "soins-therapies",
        title: t("soins.categories.careTherapies"),
        subtitle: t("soins.categories.careTherapiesSubtitle"),
        description: t("soins.categories.careTherapiesDescription"),
        image: "/src/pages/Thalion/BrochureSections/assets/X23.JPG",
        buttonText: t("soins.buttons.learnMore"),
        icon: <Heart className="w-5 h-5" />,
        services: [
          {
            id: "soins-therapies",
            category: t("soins.subcategories.careTherapies"),
            image: "/src/pages/Thalion/BrochureSections/assets/X23.JPG",
            treatments: [
              {
                name: t("soins.treatments.pressotherapy"),
                duration: "20'",
                price: "95 TND / 29 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X24.JPG",
                description: t("soins.treatments.pressotherapyDesc"),
              },
              {
                name: t("soins.treatments.heatExperience"),
                duration: "60'",
                price: "180 TND / 55 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X30.JPG",
                description: t("soins.treatments.heatExperienceDesc"),
              },
              {
                name: t("soins.treatments.sauna"),
                duration: "20'",
                price: "55 TND / 17 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X31.JPG",
                description: t("soins.treatments.saunaDesc"),
              },
              {
                name: t("soins.treatments.algaeClayCeremony"),
                duration: "50'",
                price: "165 TND / 50 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X32.JPG",
                description: t("soins.treatments.algaeClayCeremonyDesc"),
              },
            ],
          },
        ],
      },
      {
        id: "ceremonie-hammam",
        title: t("soins.categories.hammamMassages"),
        subtitle: t("soins.categories.hammamMassagesSubtitle"),
        description: t("soins.categories.hammamMassagesDescription"),
        image: "/src/pages/Thalion/BrochureSections/assets/X33.JPG",
        buttonText: t("soins.buttons.learnMore"),
        icon: <Bath className="w-5 h-5" />,
        services: [
          {
            id: "hammam-experience",
            category: t("soins.subcategories.hammamExperience"),
            image: "/src/pages/Thalion/BrochureSections/assets/X33.JPG",
            treatments: [
              {
                name: t("soins.treatments.hammamComplete"),
                duration: "60'",
                price: "240 TND / 73 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X34.JPG",
                description: t("soins.treatments.hammamCompleteDesc"),
              },
              {
                name: t("soins.treatments.hammamMassage"),
                duration: "30'",
                price: "95 TND / 29 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X35.JPG",
                description: t("soins.treatments.hammamMassageDesc"),
              },
              {
                name: t("soins.treatments.hammamScrub"),
                duration: "30'",
                price: "90 TND / 28 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X36.JPG",
                description: t("soins.treatments.hammamScrubDesc"),
              },
              {
                name: t("soins.treatments.hammamLatitudeIslands"),
                duration: "50'",
                price: "210 TND / 64 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X37.JPG",
                description: t("soins.treatments.hammamLatitudeIslandsDesc"),
              },
              {
                name: t("soins.treatments.hammamLatitudeOasis"),
                duration: "50'",
                price: "210 TND / 64 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X1.JPG",
                description: t("soins.treatments.hammamLatitudeOasisDesc"),
              },
              {
                name: t("soins.treatments.hammamLatitudeSunrise"),
                duration: "50'",
                price: "210 TND / 64 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X2.JPG",
                description: t("soins.treatments.hammamLatitudeSunriseDesc"),
              },
              {
                name: t("soins.treatments.hammamLatitudeOceanic"),
                duration: "50'",
                price: "210 TND / 64 €",
                image: "/src/pages/Thalion/BrochureSections/assets/X3.JPG",
                description: t("soins.treatments.hammamLatitudeOceanicDesc"),
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
        {t("soins.introduction.title")}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 md:space-y-6 text-gray-700 text-base md:text-lg leading-relaxed"
      >
        <p className="px-2">
          {t("soins.introduction.text1")}{" "}
          <span className="font-semibold text-amber-600">THALION</span>{" "}
          {t("soins.introduction.text1After")}
        </p>

        <p className="text-lg md:text-xl font-medium text-amber-700 px-2">
          {t("soins.introduction.text2")}
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
                      {category.services?.length || 0} {t("soins.buttons.categoriesAvailable")}
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
            <span>{t("soins.buttons.back")}</span>
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
                      {service.treatments.length} {t("soins.buttons.treatmentsAvailable")}
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
                                  {t("soins.buttons.book")}
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
                          {t("soins.introduction.pricingDisclaimer")}
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
                          {t("soins.buttons.book")}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Pricing Disclaimer */}
              <div className="mt-6 text-center border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 italic">
                  {t("soins.introduction.pricingDisclaimer")}
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
                                  {t("soins.buttons.book")}
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
