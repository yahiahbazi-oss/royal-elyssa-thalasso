import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

const VitaliteMarine =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749137/vm_cgxiex.jpg";
const DetoxSilhouette =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749136/dss_gbg5n1.jpg";
const RelaxationMarine =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749136/rm_luzn0u.jpg";
const ForMen =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749136/fm_wfvnwm.jpg";
const AfterGolf =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749136/ag_xdoimu.jpg";
const ArbreDeVie =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749391/av_tau9kw.jpg";
const NouvelAge =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749136/nag_uljrjc.jpg";
const CeremoniesSpa =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749136/cs_ixtr6q.jpg";
const WeekendCool =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749136/wco_clhqyl.jpg";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);

  const PACKAGES = useMemo(
    () => [
      {
        id: 1,
        title:
          t("thalion.themeSection.packages.vitaliteMarine.title") ||
          "Vitalité Marine",
        section: "vitalite-marine",
        image: VitaliteMarine,
        options: [
          { duration: "4 jours", price: "1200 TND / 364 €" },
          { duration: "6 jours", price: "1670 TND / 507 €" },
          { duration: "9 jours", price: "2350 TND / 713 €" },
        ],
        description:
          t("thalion.themeSection.packages.vitaliteMarine.description") ||
          "Description",
      },
      {
        id: 2,
        title:
          t("thalion.themeSection.packages.detoxSilhouette.title") ||
          "Détox Silhouette",
        section: "detox-silhouette",
        image: DetoxSilhouette,
        options: [
          { duration: "4 jours", price: "1380 TND / 419 €" },
          { duration: "6 jours", price: "1920 TND / 582 €" },
          { duration: "9 jours", price: "2720 TND / 825 €" },
        ],
        description:
          t("thalion.themeSection.packages.detoxSilhouette.description") ||
          "Description",
      },
      {
        id: 3,
        title:
          t("thalion.themeSection.packages.relaxationMarine.title") ||
          "Relaxation Marine",
        section: "relaxation-marine",
        image: RelaxationMarine,
        options: [{ duration: "5 jours", price: "1500 TND / 455 €" }],
        description:
          t("thalion.themeSection.packages.relaxationMarine.description") ||
          "Description",
      },
      {
        id: 4,
        title:
          t("thalion.themeSection.packages.noStress.title") || "Cure No Stress",
        section: "cure-no-stress",
        image: WeekendCool,
        options: [{ duration: "6 jours", price: "1018 TND / 308 €" }],
        description:
          t("thalion.themeSection.packages.noStress.description") ||
          "Description",
      },
      {
        id: 5,
        title: t("thalion.themeSection.packages.forMen.title") || "For Men",
        section: "for-men",
        image: ForMen,
        options: [
          { duration: "4 jours", price: "850 TND / 258 €" },
          { duration: "6 jours", price: "1330 TND / 404 €" },
        ],
        description:
          t("thalion.themeSection.packages.forMen.description") ||
          "Description",
      },
      {
        id: 6,
        title:
          t("thalion.themeSection.packages.afterGolf.title") || "After Golf",
        section: "after-golf",
        image: AfterGolf,
        options: [{ duration: "5 jours", price: "820 TND / 249 €" }],
        description:
          t("thalion.themeSection.packages.afterGolf.description") ||
          "Description",
      },
      {
        id: 7,
        title:
          t("thalion.themeSection.packages.arbreVie.title") || "Arbre de Vie",
        section: "arbre-vie",
        image: ArbreDeVie,
        options: [{ duration: "6 jours", price: "1580 TND / 479 €" }],
        description:
          t("thalion.themeSection.packages.arbreVie.description") ||
          "Description",
      },
      {
        id: 8,
        title:
          t("thalion.themeSection.packages.nouvelAge.title") || "Nouvel Age",
        section: "nouvel-age",
        image: NouvelAge,
        options: [
          { duration: "4 jours", price: "900 TND / 273 €" },
          { duration: "6 jours", price: "1450 TND / 440 €" },
        ],
        description:
          t("thalion.themeSection.packages.nouvelAge.description") ||
          "Description",
      },
      {
        id: 9,
        title:
          t("thalion.themeSection.packages.ceremonieSpa.title") ||
          "Cérémonie Spa",
        section: "ceremonie-spa",
        image: CeremoniesSpa,
        options: [{ duration: "4 jours", price: "840 TND / 255 €" }],
        description:
          t("thalion.themeSection.packages.ceremonieSpa.description") ||
          "Description",
      },
      {
        id: 10,
        title:
          t("thalion.themeSection.packages.weekendCool.title") ||
          "Weekend Cool",
        section: "weekend-cool",
        image: WeekendCool,
        options: [{ duration: "2 jours", price: "630 TND / 191 €" }],
        description:
          t("thalion.themeSection.packages.weekendCool.description") ||
          "Description",
      },
    ],
    [t]
  );

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

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % PACKAGES.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, PACKAGES.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + PACKAGES.length) % PACKAGES.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, PACKAGES.length]);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning, currentIndex]
  );

  // Handle package click to scroll to details
  const handlePackageClick = useCallback(
    (pkg) => {
      const scrollHandler = scrollHandlers[pkg.section];
      if (scrollHandler) {
        scrollHandler();
      }
    },
    [scrollHandlers]
  );

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, isAutoPlaying]);

  // Autoplay functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    } else {
      clearInterval(autoplayRef.current);
    }

    return () => clearInterval(autoplayRef.current);
  }, [isAutoPlaying, nextSlide]);

  // Get slide position and transform
  const getSlideTransform = (index) => {
    const diff = index - currentIndex;
    const absIndex = Math.abs(diff);

    if (absIndex === 0) {
      return {
        transform: "translateX(0%) scale(1) rotateY(0deg)",
        zIndex: 10,
        opacity: 1,
      };
    } else if (absIndex === 1) {
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 80}%) scale(0.85) rotateY(${
          -direction * 25
        }deg)`,
        zIndex: 5,
        opacity: 0.7,
      };
    } else if (absIndex === 2) {
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 140}%) scale(0.7) rotateY(${
          -direction * 45
        }deg)`,
        zIndex: 2,
        opacity: 0.4,
      };
    } else {
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 200}%) scale(0.5) rotateY(${
          -direction * 60
        }deg)`,
        zIndex: 1,
        opacity: 0.1,
      };
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg,#070503 0%, #1b1608 45%, #2b230f 100%)',
      }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{ background: 'rgba(230,192,122,0.06)' }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ background: 'rgba(212,160,23,0.05)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'rgba(212,160,23,0.03)' }}
        />
      </div>

      <div className="relative z-10 pt-20 pb-16 text-center">
  <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6" style={{fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif", letterSpacing: '-0.02em', color: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(90deg, #F3E8D9 0%, #E6C07A 45%, #D4A017 100%)'}}>
          {t("thalion.themeSection.title") || "Nos Escales Thémathiques"}
        </h2>
        <p className="text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto px-4" style={{fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"}}>
          {t("thalion.themeSection.subtitle") || "Découvrez nos forfaits"}
        </p>
        <p className="text-sm text-slate-400/80 max-w-3xl mx-auto px-4 mt-3 italic" style={{fontFamily: "Inter, system-ui, -apple-system"}}>
          {t("thalion.themeSection.disclaimer") ||
            "Les tarifs en euros sont donnés seulement à titre indicatif"}
        </p>
      </div>

      <div className="relative z-10 px-4 pb-20">
        <div
          className="relative w-full max-w-7xl mx-auto"
          style={{ perspective: "1000px", height: "650px" }}
        >
          <div
            ref={carouselRef}
            className="relative w-full h-full flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {PACKAGES.map((pkg, index) => {
              const slideStyle = getSlideTransform(index);
              const isActive = index === currentIndex;

              return (
                <div
                  key={pkg.id}
                  onClick={() => handlePackageClick(pkg)}
                  className="absolute w-80 md:w-80 lg:w-80 xl:w-96 h-[480px] md:h-[520px] lg:h-[540px] xl:h-[600px] transition-all duration-700 ease-out cursor-pointer"
                  style={{ ...slideStyle, transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                >
                  {/* outer gradient rim wrapper - padding creates the visible gold rim that follows rounded corners */}
                  <div className="relative w-full h-full rounded-2xl p-[2px]" style={{background: 'linear-gradient(90deg, #F6E7C2 0%, #D4A017 60%, #F9E7C0 100%)'}}>
                    {/* inner content box slightly smaller so the rim shows on edges */}
                    <div
                      className={`relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-[#FBF6EE] to-[#F7E8C9]`}
                      style={{backdropFilter: 'saturate(110%) blur(4px)', boxShadow: '0 18px 40px rgba(212,160,23,0.12), inset 0 0 24px rgba(255,255,240,0.06)'}}
                    >
                    <div className="relative h-36 md:h-40 lg:h-44 xl:h-52 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      {/* removed the active overlay gradient to prevent dark/halo effects at the card edges */}
                      <div className="absolute top-4 right-4 bg-[#FFF9EA] text-[#4F3510] px-3 py-1 rounded-full text-sm font-semibold shadow-md border border-[#E7CEA3]">
                        <span className="text-xs md:text-sm font-medium">{pkg.options[0].price}</span>
                      </div>
                      {/* Active badge removed per request */}
                    </div>

                    <div className="p-4 md:p-5 xl:p-6 text-white h-[260px] md:h-[300px] lg:h-[340px] xl:h-[352px] flex flex-col">
                      <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-3" style={{fontFamily: "'Playfair Display', Georgia, serif", color: '#2B230F'}}>
                        {pkg.title}
                      </h3>
                      <div className="space-y-1 md:space-y-2 mb-2 md:mb-4">
                        {(() => {
                          const daysWord =
                            t("thalion.themeSection.days") || "jours";
                          return pkg.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className="flex justify-between items-center text-xs md:text-sm"
                            >
                              <span className="text-[#4A412A] text-sm">
                                {option.duration
                                  ? option.duration.replace(
                                      /\bjours?\b/gi,
                                      daysWord
                                    )
                                  : option.name || daysWord}
                              </span>
                              <span className="font-semibold text-[#8A5E12] text-sm">
                                {option.price}
                              </span>
                            </div>
                          ));
                        })()}
                      </div>

                      <p className="text-[#4A412A] text-xs md:text-sm mb-2 md:mb-3 flex-grow overflow-y-auto">
                        {pkg.description}
                      </p>

                      <div className="space-y-2 md:space-y-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePackageClick(pkg);
                          }}
                          className="w-full bg-[#D4A017] text-[#1B1608] py-2 md:py-3 rounded-lg text-xs md:text-sm font-semibold hover:bg-[#C49313] transition-all duration-300 flex items-center justify-center gap-2"
                          style={{boxShadow: '0 6px 18px rgba(212,160,23,0.14)'}}
                        >
                          <Eye className="w-4 h-4" />
                          <span style={{fontFamily: "Inter, system-ui, -apple-system"}}>Détails</span>
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white p-2 md:p-3 rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white p-2 md:p-3 rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 mt-12">
          {/* Dots indicator */}
          <div className="flex gap-2">
            {PACKAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-[#F3E8D9] to-[#D4A017] shadow-lg"
                    : "bg-[#F6E7C2]/30 hover:bg-[#F6E7C2]/50"
                }`}
              />
            ))}
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                <span className="text-sm hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span className="text-sm hidden sm:inline">Play</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ThemeSection);
