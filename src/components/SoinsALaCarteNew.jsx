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
const V1 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481115/V1_grfp4h.jpg";
const V2 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481183/V2_w1qqhe.webp";
const V3 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481221/V3_jmbm7r.webp";
const V4 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481222/V4_ifb9kf.jpg";
const V5 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481222/V5_t1itcq.jpg";
const V6 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481270/V6_j0dlhf.webp";
const V7 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481271/V7_ybazby.jpg";
const V8 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481333/V8_lgt5jr.webp";
const V9 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481333/V9_fifmvg.webp";
const V10 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481116/V10_jquiha.jpg";
const V11 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481129/V11_fap5ud.jpg";
const V12 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481130/V12_hue9md.jpg";
const V13 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481138/V13_s1zqtx.jpg";
const V14 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481150/V14_fyypy0.webp";
const V15 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481151/V15_s2ae4j.jpg";
const V16 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481159/V16_hyxc3y.jpg";
const V17 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481159/V17_iwzdse.jpg";
const V18 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481171/V18_tohcko.jpg";
const V19 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481172/V19_cqkrxi.webp";
const V20 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481191/V20_eity2a.webp";
const V21 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481195/V21_pe0obj.webp";
const V22 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481196/V22_mw009q.jpg";
const V23 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481204/V23_saliuh.jpg";
const V24 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481205/V24_iug3la.jpg";
const C0 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481014/C0_backwb.webp";
const C1 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481015/C1_o7bilf.webp";
const C2 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481045/C2_v4j60b.webp";
const C3 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481082/C3_tso5tg.webp";
const C4 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481083/C4_lvryoc.webp";
const C5 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481084/C5_rrsz7i.webp";
const C6 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481094/C6_o3dinr.webp";
const C7 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481095/C7_jzlaij.webp";
const C8 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481095/C8_wjlmah.webp";
const C9 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481095/C9_zepanc.webp";
const C10 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481015/C10_xcoety.webp";
const C11 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481026/C11_yiozig.webp";
const C12 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481027/C12_dfdhg2.webp";
const C13 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481027/C13_f7hqwn.webp";
const C14 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481035/C14_xgbdw5.webp";
const C15 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481034/C15_rdvktp.webp";
const C16 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481036/C16_l1pade.webp";
const C17 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481045/C17_rgcgbb.webp";
const C18 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481045/C18_bswlh8.webp";
const C19 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481045/C19_xfbtjm.webp";
const C20 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481055/C20_oyx2qw.webp";
const C21 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481056/C21_ahjbxx.webp";
const C22 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481062/C22_irwwys.webp";
const C23 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481063/C23_hybgx7.webp";
const C24 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481070/C24_yuoipd.webp";
const C25 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481070/C25_b1nyub.webp";
const C26 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481071/C26_lfsiyf.webp";
const C27 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481071/C27_ghynvh.webp";
const C28 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481082/C28_uhnwwk.webp";
// Additional carte variations
const carte1 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481096/carte1_u3pafr.webp";
const carte2 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481096/carte2_ctjye3.jpg";
const carte2_alt = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481116/carte2_np5unx.webp";
// Additional V variations
const V1_alt = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481115/V1_dnfgx3.webp";
const V3_alt = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481208/V3_y4cter.jpg";
const V10_alt = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481116/V10_dcsouq.webp";
const V17_alt = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481160/V17_cq62qp.webp";
const V22_alt = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759481204/V22_d2sy20.webp"; 
import X1 from "../pages/Thalion/BrochureSections/assets/X1.JPG";
import X2 from "../pages/Thalion/BrochureSections/assets/X2.JPG";
import X3 from "../pages/Thalion/BrochureSections/assets/X3.JPG";
import X4 from "../pages/Thalion/BrochureSections/assets/X4.JPG";
import X5 from "../pages/Thalion/BrochureSections/assets/X5.JPG";
import X6 from "../pages/Thalion/BrochureSections/assets/X6.JPG";
import X7 from "../pages/Thalion/BrochureSections/assets/X7.JPG";
import X8 from "../pages/Thalion/BrochureSections/assets/X8.JPG";
import X9 from "../pages/Thalion/BrochureSections/assets/X9.JPG";
import X10 from "../pages/Thalion/BrochureSections/assets/X10.JPG";
import X11 from "../pages/Thalion/BrochureSections/assets/X11.JPG";
import X20 from "../pages/Thalion/BrochureSections/assets/X20.JPG";
import X21 from "../pages/Thalion/BrochureSections/assets/X21.JPG";
import X22 from "../pages/Thalion/BrochureSections/assets/X22.JPG";
import X23 from "../pages/Thalion/BrochureSections/assets/X23.JPG";
import X24 from "../pages/Thalion/BrochureSections/assets/X24.JPG";
import X30 from "../pages/Thalion/BrochureSections/assets/X30.JPG";
import X31 from "../pages/Thalion/BrochureSections/assets/X31.JPG";
import X32 from "../pages/Thalion/BrochureSections/assets/X32.JPG";
import X33 from "../pages/Thalion/BrochureSections/assets/X33.JPG";
import X34 from "../pages/Thalion/BrochureSections/assets/X34.JPG";
import X35 from "../pages/Thalion/BrochureSections/assets/X35.JPG";
import X36 from "../pages/Thalion/BrochureSections/assets/X36.JPG";
import X37 from "../pages/Thalion/BrochureSections/assets/X37.JPG";

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
  image: V1 ? V1.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V1,
        buttonText: t("soins.buttons.learnMore"),
        icon: <Sparkles className="w-5 h-5" />,
        services: [
          {
            id: "beaute-essentielle",
            category: t("soins.subcategories.essentialBeauty"),
            image: V2 ? V2.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V2,
            treatments: [
              {
                name: t("soins.treatments.beautyTreatment30"),
                duration: "30'",
                price: "100 TND / 31 €",
                image: V3 ? V3.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V3,
                description: t("soins.treatments.beautyTreatment30Desc"),
              },
              {
                name: t("soins.treatments.beautyTreatment60"),
                duration: "60'",
                price: "190 TND / 58 €",
                image: V4 ? V4.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V4,
                description: t("soins.treatments.beautyTreatment60Desc"),
              },
            ],
          },
          {
            id: "beaute-yeux",
            category: t("soins.subcategories.eyeBeauty"),
            image: V5 ? V5.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V5,
            treatments: [
              {
                name: t("soins.treatments.eyeLiftExpert"),
                duration: "30'",
                price: "100 TND / 31 €",
                image: V6 ? V6.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V6,
                description: t("soins.treatments.eyeLiftExpertDesc"),
              },
            ],
          },
          {
            id: "eternelle-jeunesse",
            category: t("soins.subcategories.eternalYouth"),
            image: V7 ? V7.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V7,
            treatments: [
              {
                name: t("soins.treatments.liftAbsolu"),
                duration: "60'",
                price: "200 TND / 61 €",
                image: V8 ? V8.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V8,
                description: t("soins.treatments.liftAbsoluDesc"),
              },
              {
                name: t("soins.treatments.eclatOriginel"),
                duration: "60'",
                price: "180 TND / 55 €",
                image: V9 ? V9.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V9,
                description: t("soins.treatments.eclatOriginelDesc"),
              },
              {
                name: t("soins.treatments.expertAntiAge"),
                duration: "75'",
                price: "200 TND / 61 €",
                image: V10 ? V10.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V10,
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
  image: V11 ? V11.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V11,
        buttonText: t("soins.buttons.learnMore"),
        icon: <Leaf className="w-5 h-5" />,
        services: [
          {
            id: "relaxation",
            category: t("soins.subcategories.relaxation"),
            image: V12 ? V12.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V12,
            treatments: [
              {
                name: t("soins.treatments.absoluteRelaxation"),
                duration: "60'",
                price: "180 TND / 55 €",
                image: V13 ? V13.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V13,
                description: t("soins.treatments.absoluteRelaxationDesc"),
              },
            ],
          },
          {
            id: "silhouette",
            category: t("soins.subcategories.silhouette"),
            image: V14 ? V14.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V14,
            treatments: [
              {
                name: t("soins.treatments.firmness"),
                duration: "45'",
                price: "150 TND / 46 €",
                image: V15 ? V15.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V15,
                description: t("soins.treatments.firmnessDesc"),
              },
              {
                name: t("soins.treatments.tonicLegs"),
                duration: "30'",
                price: "95 TND / 29 €",
                image: V16 ? V16.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V16,
                description: t("soins.treatments.tonicLegsDesc"),
              },
              {
                name: t("soins.treatments.silhouetteDrainage"),
                duration: "60'",
                price: "180 TND / 55 €",
                image: V17 ? V17.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V17,
                description: t("soins.treatments.silhouetteDrainageDesc"),
              },
              {
                name: t("soins.treatments.stretchMarks"),
                duration: "45'",
                price: "150 TND / 46 €",
                image: V18 ? V18.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V18,
                description: t("soins.treatments.stretchMarksDesc"),
              },
              {
                name: t("soins.treatments.celluContour"),
                duration: "60'",
                price: "200 TND / 61 €",
                image: V19 ? V19.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V19,
                description: t("soins.treatments.celluContourDesc"),
              },
              {
                name: t("soins.treatments.detoxRitual"),
                duration: "90'",
                price: "270 TND / 82 €",
                image: V20 ? V20.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V20,
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
  image: V21 ? V21.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V21,
        buttonText: t("soins.buttons.learnMore"),
        icon: <Heart className="w-5 h-5" />,
        services: [
          {
            id: "special-homme",
            category: t("soins.subcategories.specialMen"),
            image: V21 ? V21.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V21,
            treatments: [
              {
                name: t("soins.treatments.facialOxygen"),
                duration: "60'",
                price: "160 TND / 49 €",
                image: V22 ? V22.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V22,
                description: t("soins.treatments.facialOxygenDesc"),
              },
              {
                name: t("soins.treatments.goodLookExpress"),
                duration: "30'",
                price: "95 TND / 29 €",
                image: V23 ? V23.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V23,
                description: t("soins.treatments.goodLookExpressDesc"),
              },
              {
                name: t("soins.treatments.backRelaxation"),
                duration: "45'",
                price: "135 TND / 41 €",
                image: V24 ? V24.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : V24,
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
  image: C0 ? C0.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C0,
        buttonText: "EN SAVOIR +",
        icon: <Waves className="w-5 h-5" />,
        services: [
          {
            id: "parcours-marin",
            category: t("soins.subcategories.marineCourse"),
            image: C1 ? C1.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C1,
            treatments: [
              {
                name: t("soins.treatments.marineEntry"),
                duration: "20'",
                price: "50 TND / 16 €",
                image: C2 ? C2.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C2,
                description: t("soins.treatments.marineEntryDesc"),
              },
              {
                name: t("soins.treatments.marinePackage5"),
                duration: "20'",
                price: "160 TND / 49 €",
                image: C3 ? C3.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C3,
                description: t("soins.treatments.marinePackage5Desc"),
                entries: "5 entrées",
              },
              {
                name: t("soins.treatments.marineEntryHammam"),
                duration: "20'",
                price: "60 TND / 19 €",
                image: C4 ? C4.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C4,
                description: t("soins.treatments.marineEntryHammamDesc"),
              },
              {
                name: t("soins.treatments.marinePackage5Hammam"),
                duration: "20'",
                price: "200 TND / 61 €",
                image: C5 ? C5.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C5,
                description: t("soins.treatments.marinePackage5HammamDesc"),
                entries: "5 entrées",
              },
            ],
          },
          {
            id: "relaxation-marine",
            category: t("soins.subcategories.marineRelaxation"),
            image: C8 ? C8.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C8,
            treatments: [
              {
                name: t("soins.treatments.marineRelaxation"),
                duration: "20'",
                price: "125 TND / 38 €",
                image: C9 ? C9.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C9,
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
  image: C12 ? C12.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C12,
        buttonText: t("soins.buttons.learnMore"),
        icon: <Droplets className="w-5 h-5" />,
        services: [
          {
            id: "douches",
            category: t("soins.subcategories.showers"),
            image: C13 ? C13.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C13,
            treatments: [
              {
                name: t("soins.treatments.underwaterDrainageShower"),
                duration: "20'",
                price: "85 TND / 26 €",
                image: C14 ? C14.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C14,
                description: t("soins.treatments.underwaterDrainageShowerDesc"),
              },
              {
                name: t("soins.treatments.grandJetTonic"),
                duration: "15'",
                price: "75 TND / 23 €",
                image: C15 ? C15.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C15,
                description: t("soins.treatments.grandJetTonicDesc"),
              },
            ],
          },
          {
            id: "bains",
            category: t("soins.subcategories.baths"),
            image: C16 ? C16.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C16,
            treatments: [
              {
                name: t("soins.treatments.seaBaths"),
                duration: "20'",
                price: "85 TND / 26 €",
                image: C17 ? C17.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C17,
                description: t("soins.treatments.seaBathsDesc"),
              },
            ],
          },
          {
            id: "la-sieste",
            category: t("soins.subcategories.siesta"),
            image: C10 ? C10.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C10,
            treatments: [
              {
                name: t("soins.treatments.sieste"),
                duration: "80'",
                price: "310 TND / 94 €",
                image: C11 ? C11.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C11,
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
  image: C25 ? C25.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C25,
        buttonText: t("soins.buttons.learnMore"),
        icon: <Bath className="w-5 h-5" />,
        services: [
          {
            id: "gommages",
            category: t("soins.subcategories.bodyScrubs"),
            image: C26 ? C26.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C26,
            treatments: [
              {
                name: t("soins.treatments.fullBodyScrub"),
                duration: "20'",
                price: "95 TND / 29 €",
                image: C27 ? C27.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C27,
                description: t("soins.treatments.fullBodyScrubDesc"),
              },
            ],
          },
          {
            id: "enveloppements",
            category: t("soins.subcategories.wraps"),
            image: C28 ? C28.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C28,
            treatments: [
              {
                name: t("soins.treatments.fullBodyWrap"),
                duration: "20'",
                price: "110 TND / 34 €",
                image: C28 ? C28.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C28,
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
  image: C18 ? C18.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C18,
        buttonText: t("soins.buttons.learnMore"),
        icon: <Heart className="w-5 h-5" />,
        services: [
          {
            id: "massages-affusion",
            category: t("soins.subcategories.massagesUnderAffusion"),
            image: C19 ? C19.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C19,
            treatments: [
              {
                name: t("soins.treatments.seaMistMassage"),
                duration: "25'",
                price: "110 TND / 34 €",
                image: C20 ? C20.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C20,
                description: t("soins.treatments.seaMistMassageDesc"),
              },
              {
                name: t("soins.treatments.supremeSeaMist"),
                duration: "25'",
                price: "190 TND / 58 €",
                image: C21 ? C21.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C21,
                description: t("soins.treatments.supremeSeaMistDesc"),
              },
              {
                name: t("soins.treatments.palperRoulerSlim"),
                duration: "25'",
                price: "150 TND / 46 €",
                image: C23 ? C23.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C23,
                description: t("soins.treatments.palperRoulerSlimDesc"),
              },
              {
                name: t("soins.treatments.fiveSessionsPalperRouler"),
                duration: "25'",
                price: "570 TND / 173 €",
                image: C24 ? C24.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : C24,
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
  image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437494/X1_smmldj.jpg",
        buttonText: t("soins.buttons.learnMore"),
        icon: <HandHeart className="w-5 h-5" />,
        services: [
          {
            id: "massage-bien-etre",
            category: t("soins.subcategories.massageWellness"),
            image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437426/X5_snatq4.jpg",
            treatments: [
              {
                name: t("soins.treatments.awakeDream"),
                duration: "40'",
                price: "190 TND / 58 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437425/X6_dyhkem.jpg",
                description: t("soins.treatments.awakeDreamDesc"),
              },
              {
                name: t("soins.treatments.coconutBreezeGentleness"),
                duration: "40'",
                price: "130 TND / 40 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437425/X7_c2jsx7.jpg",
                description: t("soins.treatments.coconutBreezeGentlenessDesc"),
              },
              {
                name: t("soins.treatments.muscleBlissCamphor"),
                duration: "50'",
                price: "190 TND / 58 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437425/X8_gmnb32.jpg",
                description: t("soins.treatments.muscleBlissCamphorDesc"),
              },
              {
                name: t("soins.treatments.backMassage"),
                duration: "25'",
                price: "95 TND / 29 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437416/X9_kvgppr.jpg",
                description: t("soins.treatments.backMassageDesc"),
              },
              {
                name: t("soins.treatments.brazilianNutEnergyBreath"),
                duration: "40'",
                price: "130 TND / 40 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437416/X10_dkhqqs.jpg",
                description: t("soins.treatments.brazilianNutEnergyBreathDesc"),
              },
              {
                name: t("soins.treatments.enchantedSilhouetteSeawater"),
                duration: "50'",
                price: "200 TND / 61 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437416/X11_tvzihb.jpg",
                description: t("soins.treatments.enchantedSilhouetteSeawaterDesc"),
              },
              {
                name: t("soins.treatments.westernReflexology"),
                duration: "75'",
                price: "290 TND / 88 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437415/X20_shxchn.jpg",
                description: t("soins.treatments.westernReflexologyDesc"),
              },
              {
                name: t("soins.treatments.sensitiveFeet"),
                duration: "40'",
                price: "165 TND / 50 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437415/X21_ndfiay.jpg",
                description: t("soins.treatments.sensitiveFeetDesc"),
              },
              {
                name: t("soins.treatments.hotStonesAlgaePouches"),
                duration: "75'",
                price: "290 TND / 88 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437415/X22_fanxd0.jpg",
                description: t("soins.treatments.hotStonesAlgaePouchesDesc"),
              },
              {
                name: t("soins.treatments.lymphaticDrainage"),
                duration: "60'",
                price: "280 TND / 85 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437409/X23_bwmpkc.jpg",
                description: t("soins.treatments.lymphaticDrainageDesc"),
              },
            ],
          },
          {
            id: "massages-asiatiques",
            category: t("soins.subcategories.asianMassages"),
            image: X1 ? X1.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : X1,
            treatments: [
              {
                name: t("soins.treatments.balineseMassage"),
                duration: "60'",
                price: "270 TND / 82 €",
                image: X2 ? X2.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : X2,
                description: t("soins.treatments.balineseMassageDesc"),
              },
              {
                name: t("soins.treatments.abhyangaMassage"),
                duration: "60'",
                price: "270 TND / 82 €",
                image: X3 ? X3.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : X3,
                description: t("soins.treatments.abhyangaMassageDesc"),
              },
              {
                name: t("soins.treatments.thaiMassage"),
                duration: "60'",
                price: "300 TND / 91 €",
                image: X4 ? X4.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : X4,
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
  image: X23 ? X23.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : X23,
        buttonText: t("soins.buttons.learnMore"),
        icon: <Heart className="w-5 h-5" />,
        services: [
          {
            id: "soins-therapies",
            category: t("soins.subcategories.careTherapies"),
            image: X23 ? X23.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : X23,
            treatments: [
              {
                name: t("soins.treatments.pressotherapy"),
                duration: "20'",
                price: "95 TND / 29 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437408/X24_o6ewar.jpg",
                description: t("soins.treatments.pressotherapyDesc"),
              },
              {
                name: t("soins.treatments.heatExperience"),
                duration: "60'",
                price: "180 TND / 55 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437408/X30_gmwm0h.jpg",
                description: t("soins.treatments.heatExperienceDesc"),
              },
              {
                name: t("soins.treatments.sauna"),
                duration: "20'",
                price: "55 TND / 17 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437408/X31_psr7xf.jpg",
                description: t("soins.treatments.saunaDesc"),
              },
              {
                name: t("soins.treatments.algaeClayCeremony"),
                duration: "50'",
                price: "165 TND / 50 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437392/X32_alf90x.jpg",
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
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437392/X33_llszvo.jpg",
        buttonText: t("soins.buttons.learnMore"),
        icon: <Bath className="w-5 h-5" />,
        services: [
          {
            id: "hammam-experience",
            category: t("soins.subcategories.hammamExperience"),
            image: X33 ? X33.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : X33,
            treatments: [
              {
                name: t("soins.treatments.hammamComplete"),
                duration: "60'",
                price: "240 TND / 73 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437392/X34_fpxmcc.jpg",
                description: t("soins.treatments.hammamCompleteDesc"),
              },
              {
                name: t("soins.treatments.hammamMassage"),
                duration: "30'",
                price: "95 TND / 29 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437392/X35_ap08se.jpg",
                description: t("soins.treatments.hammamMassageDesc"),
              },
              {
                name: t("soins.treatments.hammamScrub"),
                duration: "30'",
                price: "90 TND / 28 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437393/X36_jh07tc.jpg",
                description: t("soins.treatments.hammamScrubDesc"),
              },
              {
                name: t("soins.treatments.hammamLatitudeIslands"),
                duration: "50'",
                price: "210 TND / 64 €",
                image: "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1760437392/X37_qglxip.jpg",
                description: t("soins.treatments.hammamLatitudeIslandsDesc"),
              },
              {
                name: t("soins.treatments.hammamLatitudeOasis"),
                duration: "50'",
                price: "210 TND / 64 €",
                image: X1 ? X1.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : X1,
                description: t("soins.treatments.hammamLatitudeOasisDesc"),
              },
              {
                name: t("soins.treatments.hammamLatitudeSunrise"),
                duration: "50'",
                price: "210 TND / 64 €",
                image: X2 ? X2.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : X2,
                description: t("soins.treatments.hammamLatitudeSunriseDesc"),
              },
              {
                name: t("soins.treatments.hammamLatitudeOceanic"),
                duration: "50'",
                price: "210 TND / 64 €",
                image: X3 ? X3.replace('/upload/', '/upload/q_auto,f_webp,w_800/') : X3,
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
