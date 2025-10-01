import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BoxDesign from "../../../components/BoxDesign";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

// Import images directly
import VitaliteMarine from "./assets/vm.jpg";
import DetoxSilhouette from "./assets/dss.jpg";
import RelaxationMarine from "./assets/rm.jpg";
// import CureNoStress from "./assets/cns.jpg"; // Uncomment when you add the image file
import ForMen from "./assets/fm.jpg";
import AfterGolf from "./assets/ag.jpg";
import ArbreDeVie from "./assets/av.jpg";
import NouvelAge from "./assets/nag.jpg";
import CeremoniesSpa from "./assets/Cs.jpg";
import WeekendCool from "./assets/wco.jpg";
import BelleJournee from "./assets/xc.jpg";

// Temporary placeholder for Cure No Stress - replace when you add your actual image
const CureNoStress =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DdXJlIE5vIFN0cmVzczwvdGV4dD48L3N2Zz4=";

const ThemeSection = ({
  scrollToSoins,
  scrollToDetox,
  scrollToRelaxation,
  scrollToCureNoStress,
  scrollToMen,
  scrollToGolf,
  scrollToArbre,
  scrollToCeremonie,
  scrollToNouvelAge,
  scrollToWeekendCool,
}) => {
  const { t } = useTranslation();
  
  // Memoize the packages array with translations
  const PACKAGES = useMemo(() => [
    {
      id: 1,
      title: t("thalion.themeSection.packages.vitaliteMarine.title"),
      section: "vitalite-marine",
      image: VitaliteMarine,
      options: [
        { duration: `4 ${t("thalion.themeSection.days")}`, price: "1200 TND / 364 €" },
        { duration: `6 ${t("thalion.themeSection.days")}`, price: "1670 TND / 507 €" },
        { duration: `9 ${t("thalion.themeSection.days")}`, price: "2350 TND / 713 €" },
      ],
      description: t("thalion.themeSection.packages.vitaliteMarine.description"),
    },
    {
      id: 2,
      title: t("thalion.themeSection.packages.detoxSilhouette.title"),
      section: "detox-silhouette",
      image: DetoxSilhouette,
      options: [
        { duration: `4 ${t("thalion.themeSection.days")}`, price: "1380 TND / 419 €" },
        { duration: `6 ${t("thalion.themeSection.days")}`, price: "1920 TND / 582 €" },
        { duration: `9 ${t("thalion.themeSection.days")}`, price: "2720 TND / 825 €" },
      ],
      description: t("thalion.themeSection.packages.detoxSilhouette.description"),
    },
    {
      id: 3,
      title: t("thalion.themeSection.packages.relaxationMarine.title"),
      section: "relaxation-marine",
      image: RelaxationMarine,
      options: [{ duration: `5 ${t("thalion.themeSection.days")}`, price: "1500 TND / 455 €" }],
      description: t("thalion.themeSection.packages.relaxationMarine.description"),
    },
    {
      id: 4,
      title: t("thalion.themeSection.packages.noStress.title"),
      section: "cure-no-stress",
      image: WeekendCool,
      options: [{ duration: `6 ${t("thalion.themeSection.days")}`, price: "1018 TND / 308 €" }],
      description: t("thalion.themeSection.packages.noStress.description"),
    },
    {
      id: 5,
      title: t("thalion.themeSection.packages.forMen.title"),
      section: "for-men",
      image: ForMen,
      options: [
        { duration: `4 ${t("thalion.themeSection.days")}`, price: "850 TND / 258 €" },
        { duration: `6 ${t("thalion.themeSection.days")}`, price: "1330 TND / 404 €" },
      ],
      description: t("thalion.themeSection.packages.forMen.description"),
    },
    {
      id: 6,
      title: t("thalion.themeSection.packages.afterGolf.title"),
      section: "after-golf",
      image: AfterGolf,
      options: [{ duration: `5 ${t("thalion.themeSection.days")}`, price: "820 TND / 249 €" }],
      description: t("thalion.themeSection.packages.afterGolf.description"),
    },
    {
      id: 7,
      title: t("thalion.themeSection.packages.arbreVie.title"),
      section: "arbre-vie",
      image: ArbreDeVie,
      options: [{ duration: `6 ${t("thalion.themeSection.days")}`, price: "1580 TND / 479 €" }],
      description: t("thalion.themeSection.packages.arbreVie.description"),
    },
    {
      id: 8,
      title: t("thalion.themeSection.packages.nouvelAge.title"),
      section: "nouvel-age",
      image: NouvelAge,
      options: [
        { duration: `4 ${t("thalion.themeSection.days")}`, price: "900 TND / 273 €" },
        { duration: `6 ${t("thalion.themeSection.days")}`, price: "1450 TND / 440 €" },
      ],
      description: t("thalion.themeSection.packages.nouvelAge.description"),
    },
    {
      id: 9,
      title: t("thalion.themeSection.packages.ceremonieSpa.title"),
      section: "ceremonie-spa",
      image: CeremoniesSpa,
      options: [{ duration: `4 ${t("thalion.themeSection.days")}`, price: "840 TND / 255 €" }],
      description: t("thalion.themeSection.packages.ceremonieSpa.description"),
    },
    {
      id: 10,
      title: t("thalion.themeSection.packages.weekendCool.title"),
      section: "weekend-cool",
      image: WeekendCool,
      options: [{ duration: `2 ${t("thalion.themeSection.days")}`, price: "630 TND / 191 €" }],
      description: t("thalion.themeSection.packages.weekendCool.description"),
    },
  ], [t]);
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);

  // Create scroll handlers mapping
  const scrollHandlers = useMemo(
    () => ({
      "vitalite-marine": scrollToSoins,
      "detox-silhouette": scrollToDetox,
      "relaxation-marine": scrollToRelaxation,
      "cure-no-stress": scrollToCureNoStress,
      "for-men": scrollToMen,
      "after-golf": scrollToGolf,
      "arbre-vie": scrollToArbre,
      "ceremonie-spa": scrollToCeremonie,
      "nouvel-age": scrollToNouvelAge,
      "weekend-cool": scrollToWeekendCool,
    }),
    [
      scrollToSoins,
      scrollToDetox,
      scrollToRelaxation,
      scrollToCureNoStress,
      scrollToMen,
      scrollToGolf,
      scrollToArbre,
      scrollToCeremonie,
      scrollToNouvelAge,
      scrollToWeekendCool,
    ]
  );

  // Memoize duplicated packages
  const duplicatedPackages = useMemo(() => {
    return [...PACKAGES, ...PACKAGES, ...PACKAGES];
  }, []);

  // Memoize packages with scroll handlers
  const packagesWithHandlers = useMemo(() => {
    return PACKAGES.map((pkg) => ({
      ...pkg,
      scrollTo: scrollHandlers[pkg.section] || null,
    }));
  }, [scrollHandlers]);

  const handleSlideChange = useCallback((swiper) => {
    const realIndex = swiper.realIndex % PACKAGES.length;
    setActiveSlide(realIndex);

    if (swiper.activeIndex === 0) {
      setTimeout(() => swiper.slideTo(PACKAGES.length, 0), 0);
    } else if (swiper.activeIndex === PACKAGES.length * 2) {
      setTimeout(() => swiper.slideTo(PACKAGES.length, 0), 0);
    }
  }, []);

  const handlePackageClick = useCallback((pkg) => {
    if (pkg.scrollTo) {
      pkg.scrollTo();
    }
  }, []);

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-stone-800 mb-4 md:mb-6 tracking-[0.02em] font-serif">
            {t("thalion.navigation.escales")}
          </h2>
          <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-6 md:mb-8" />
        </div>

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            onSlideChange={handleSlideChange}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            initialSlide={PACKAGES.length}
            breakpoints={{
              320: { slidesPerView: 1.1, spaceBetween: 15 },
              480: { slidesPerView: 1.3, spaceBetween: 20 },
              640: { slidesPerView: 1.8, spaceBetween: 20 },
              768: { slidesPerView: 2.2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 35 },
              1536: { slidesPerView: 5, spaceBetween: 40 },
            }}
            className="!overflow-visible pb-12 md:pb-20"
          >
            {duplicatedPackages.map((pkg, index) => {
              const originalIndex = index % PACKAGES.length;
              const originalPkg = packagesWithHandlers[originalIndex];
              return (
                <SwiperSlide
                  key={`${pkg.id}-${index}`}
                  className="!w-[280px] sm:!w-[320px] md:!w-[350px] !h-auto"
                >
                  <BoxDesign
                    title={originalPkg.title}
                    description={originalPkg.description}
                    image={originalPkg.image}
                    options={originalPkg.options}
                    index={originalIndex}
                    onClickDetails={() => handlePackageClick(originalPkg)}
                    detailsAvailableText={t("thalion.themeSection.detailsAvailable")}
                    moreOptionsText={t("thalion.themeSection.moreOptions")}
                    bookText={t("thalion.themeSection.book")}
                    detailsText={t("thalion.themeSection.details")}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="swiper-button-prev absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 z-10 flex items-center justify-center cursor-pointer border border-stone-200/50">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-stone-600 hover:text-stone-800 transition-colors duration-300" />
          </div>
          <div className="swiper-button-next absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 z-10 flex items-center justify-center cursor-pointer border border-stone-200/50">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-stone-600 hover:text-stone-800 transition-colors duration-300" />
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-stone-600 text-base md:text-lg font-light mb-6 md:mb-8 tracking-wide">
            {t("thalion.themeSection.disclaimer")}
          </p>
          <button
            onClick={scrollToSoins}
            className="px-8 sm:px-10 py-3 sm:py-4 border border-stone-800 text-stone-800 font-light text-xs sm:text-sm tracking-[0.1em] uppercase hover:bg-stone-800 hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
          >
            {t("thalion.themeSection.viewAllPackages")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ThemeSection);
