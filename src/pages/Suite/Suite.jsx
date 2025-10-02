import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize,
  Bed,
  Bath,
  Play,
  Pause,
  Menu,
  Home, // Added Home icon
  Waves, // Added for private pool
} from "lucide-react";

// Cloudinary images - optimized for web delivery (Updated URLs)
const SuiteImage = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447159/Suites_SPA_11_ovryar.jpg"; // Main suite image
const CarreVIP4 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447108/carre_VIP_suite_spa__4_u74ne3.jpg";
const CarreVIP5 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447109/carre_VIP_suite_spa__5_weh6ut.jpg";
const CarreVIP6 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447109/carre_VIP_suite_spa__6_viruqq.jpg";
const CarreVIP7 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447109/carre_VIP_suite_spa__7_dzbbhq.jpg";
const SuitesSPA1 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447110/Suites_SPA_1_jjuv1l.jpg";
const SuitesSPA2 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447238/Suites_SPA_2_ifiupl.jpg";
const SuitesSPA3 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447259/Suites_SPA_3_qu8rsv.jpg";
const SuitesSPA4 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447260/Suites_SPA_4_ztyewk.jpg";
const SuitesSPA5 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447261/Suites_SPA_5_zgdpmb.jpg";
const SuitesSPA8 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447284/Suites_SPA_8_etp2ck.jpg";
const SuitesSPA9 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447285/Suites_SPA_9_y66vyn.jpg";
const SuitesSPA11 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447159/Suites_SPA_11_ovryar.jpg";
const SuitesSPA14 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447220/Suites_SPA_14_guxjuq.jpg";
const SuitesSPA15 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447220/Suites_SPA_15_xpaavy.jpg";
const SuitesSPA18 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447232/Suites_SPA_18_ag3lo8.jpg";
const SuitesSPA19 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447237/Suites_SPA_19_zmvw3v.jpg";
const SuitesSPA20 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759447244/Suites_SPA_20_on55ap.jpg";

// Import flag images
import francFlag from "../../assets/france.png";
import ukFlag from "../../assets/royaume-uni.png";
import russiaFlag from "../../assets/russie.png";

// Lazy loading component for images
const LazyImage = ({ src, alt, className, onClick, loading = "lazy" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover transition-all duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${onClick ? "cursor-pointer hover:scale-105" : ""}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        onClick={onClick}
      />
      {imageError && (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Image non disponible</span>
        </div>
      )}
    </div>
  );
};

const Suite = () => {
  const { t, i18n } = useTranslation();

  // Language change function
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const galleryContainerRef = useRef(null);

  // Use your actual imported images
  const suiteImages = useMemo(
    () => [
      SuiteImage,
      CarreVIP4,
      CarreVIP5,
      CarreVIP6,
      CarreVIP7,
      SuitesSPA1,
      SuitesSPA2,
      SuitesSPA3,
      SuitesSPA4,
      SuitesSPA5,
      SuitesSPA8,
      SuitesSPA9,
      SuitesSPA11,
      SuitesSPA14,
      SuitesSPA15,
      SuitesSPA18,
      SuitesSPA19,
      SuitesSPA20,
    ],
    []
  );

  // Use your actual imported images
  const galleryImages = useMemo(
    () => [
      SuitesSPA20,
      SuitesSPA9,
      SuitesSPA8,
      SuitesSPA11,
      SuitesSPA2,
      SuitesSPA5,
      CarreVIP6,
      CarreVIP7,
      CarreVIP4,
      SuitesSPA1,
      SuitesSPA15,
      SuitesSPA14,
      SuitesSPA19,
      SuitesSPA18,
      SuitesSPA3,
      SuitesSPA4,
    ],
    []
  );

  const allImages = useMemo(
    () => [...suiteImages, ...galleryImages],
    [suiteImages, galleryImages]
  );

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const nextIndex = (prev + 1) % suiteImages.length;
      console.log("Next image:", nextIndex, "from", prev);
      return nextIndex;
    });
  }, [suiteImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const prevIndex = (prev - 1 + suiteImages.length) % suiteImages.length;
      console.log("Previous image:", prevIndex, "from", prev);
      return prevIndex;
    });
  }, [suiteImages.length]);

  const openLightbox = useCallback((index) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const nextLightboxImage = useCallback(() => {
    setLightboxImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevLightboxImage = useCallback(() => {
    setLightboxImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  }, [allImages.length]);

  // Handle touch events for mobile swipe
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

    if (isLeftSwipe) {
      if (isLightboxOpen) nextLightboxImage();
      else nextImage();
    }

    if (isRightSwipe) {
      if (isLightboxOpen) prevLightboxImage();
      else prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(nextImage, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, nextImage]);

  // Preload images for smoother transitions
  useEffect(() => {
    suiteImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [suiteImages]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prevLightboxImage();
        if (e.key === "ArrowRight") nextLightboxImage();
      } else {
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isLightboxOpen,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
    nextImage,
    prevImage,
  ]);

  const handleBookNow = () => {
    window.open("https://www.thalassa-hotels.com/", "_blank");
  };

  // Function to navigate to home page
  const goToHomePage = () => {
    window.location.href = "http://localhost:5173/";
  };

  const amenities = [
    { icon: <Bed className="w-5 h-5 md:w-6 md:h-6" />, text: t("suite.amenities.kingBed") },
    {
      icon: <Bath className="w-5 h-5 md:w-6 md:h-6" />,
      text: t("suite.amenities.marbleBathroom"),
    },
    {
      icon: <Waves className="w-5 h-5 md:w-6 md:h-6" />,
      text: t("suite.amenities.privatePool"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Top Navigation with Language Flags */}
      <div className="fixed top-4 right-4 z-50">
        {/* Language Flags */}
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-2 shadow-md">
          <img
            src={francFlag}
            alt="France Flag"
            className="h-5 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer border border-stone-300"
            onClick={() => changeLanguage('fr')}
            title="Français"
          />
          <img
            src={ukFlag}
            alt="UK Flag"
            className="h-5 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer border border-stone-300"
            onClick={() => changeLanguage('en')}
            title="English"
          />
          <img
            src={russiaFlag}
            alt="Russia Flag"
            className="h-5 w-6 object-cover rounded shadow-sm hover:scale-110 transition-all duration-300 cursor-pointer border border-stone-300"
            onClick={() => changeLanguage('ru')}
            title="Русский"
          />
        </div>
      </div>

      {/* Hero Section with Enhanced Image Carousel */}
      <div
        className="relative h-screen overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10"></div>

        {/* Image Container with smooth transitions */}
        <div className="relative w-full h-full">
          {suiteImages.map((image, index) => (
            <div
              key={`hero-image-${index}`}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentImageIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
              style={{
                zIndex: index === currentImageIndex ? 5 : 1,
              }}
            >
              <LazyImage
                src={image}
                alt={`Carré VIP Spa ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Navigation */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-30 flex justify-between px-4 md:px-8">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevImage();
            }}
            className="group bg-white/10 backdrop-blur-md hover:bg-white/25 rounded-full p-4 md:p-5 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110 shadow-xl hover:shadow-2xl"
            aria-label="Image précédente"
            type="button"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-white transition-colors duration-300" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextImage();
            }}
            className="group bg-white/10 backdrop-blur-md hover:bg-white/25 rounded-full p-4 md:p-5 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110 shadow-xl hover:shadow-2xl"
            aria-label="Image suivante"
            type="button"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-white transition-colors duration-300" />
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4 pointer-events-none">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-light mb-4 md:mb-6 tracking-wide drop-shadow-2xl">
              {t("header.navigation.carreVip.title")}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-light tracking-widest opacity-90 drop-shadow-lg">
              {t("header.navigation.carreVip.subtitle")}
            </p>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30 flex items-center gap-2 md:gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsAutoPlay(!isAutoPlay);
            }}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-2 md:p-3 transition-all duration-300 border border-white/20 hover:scale-110"
            aria-label={
              isAutoPlay
                ? "Arrêter le défilement automatique"
                : "Démarrer le défilement automatique"
            }
            type="button"
          >
            {isAutoPlay ? (
              <Pause className="w-4 h-4 md:w-5 md:h-5 text-white" />
            ) : (
              <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
            )}
          </button>
          <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1 md:px-4 md:py-2 border border-white/20">
            <span className="text-white font-light text-sm md:text-base">
              {currentImageIndex + 1} / {suiteImages.length}
            </span>
          </div>
        </div>

        {/* Image Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 md:gap-3">
          {suiteImages.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Dot clicked:", index);
                setCurrentImageIndex(index);
              }}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 border border-white/30 ${
                index === currentImageIndex
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/70 hover:scale-110"
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
              type="button"
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30 md:bottom-4">
          <div className="w-4 h-6 md:w-6 md:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 md:h-3 bg-white/50 rounded-full mt-1 md:mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Suite Description with Modern Grid */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-start">
          <div className="lg:sticky lg:top-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-stone-800 mb-6 md:mb-8 tracking-wide">
              {t("suite.description.title")}
            </h2>
            <div className="space-y-4 md:space-y-6 text-stone-700 leading-relaxed">
              <p className="text-base md:text-lg lg:text-xl font-light">
                {t("suite.description.paragraph1")}
              </p>
              <p className="text-sm md:text-base lg:text-lg font-light opacity-90">
                {t("suite.description.paragraph2")}
              </p>
              <p className="text-sm md:text-base lg:text-lg font-light opacity-90">
                {t("suite.description.paragraph3")}
              </p>
            </div>
          </div>

          {/* Modern Masonry Grid Layout */}
          <div className="space-y-4 md:space-y-6">
            {/* Featured Large Image */}
            <div className="relative group overflow-hidden rounded-xl md:rounded-2xl">
              <LazyImage
                src={galleryImages[0]}
                alt={t("suite.gallery.mainSuite")}
                className="w-full h-60 md:h-80 group-hover:scale-110 transition-transform duration-700"
                onClick={() => openLightbox(suiteImages.length)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <button
                onClick={() => openLightbox(suiteImages.length)}
                className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/20 backdrop-blur-md rounded-full p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
                aria-label={t("suite.gallery.viewLarge")}
              >
                <Maximize className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
              <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-sm md:text-lg font-light">
                  {t("suite.gallery.mainSuite")}
                </h3>
              </div>
            </div>

            {/* Grid of smaller images */}
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {galleryImages.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg md:rounded-xl"
                >
                  <LazyImage
                    src={image}
                    alt={`${t("suite.gallery.suiteDetail")} ${index + 2}`}
                    className="w-full h-40 md:h-48 group-hover:scale-110 transition-transform duration-500"
                    onClick={() => openLightbox(suiteImages.length + index + 1)}
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <button
                    onClick={() => openLightbox(suiteImages.length + index + 1)}
                    className="absolute top-1 right-1 md:top-2 md:right-2 bg-white/20 backdrop-blur-md rounded-full p-1 md:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
                    aria-label={t("suite.gallery.viewLarge")}
                  >
                    <Maximize className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal scrolling gallery */}
        <div className="mt-10 md:mt-16">
          <div className="relative">
            <h3 className="text-xl md:text-2xl font-light text-stone-800 mb-4 md:mb-6 tracking-wide">
              Galerie Complète
            </h3>

            {/* Navigation buttons */}
            <div className="absolute right-0 top-0 flex gap-2 z-10">
              <button
                onClick={() => {
                  const container = galleryContainerRef.current;
                  container.scrollBy({ left: -300, behavior: "smooth" });
                }}
                className="bg-white/80 backdrop-blur-sm rounded-full p-1 md:p-2 hover:bg-white transition-all duration-300 shadow-md"
                aria-label="Défiler vers la gauche"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-stone-700" />
              </button>
              <button
                onClick={() => {
                  const container = galleryContainerRef.current;
                  container.scrollBy({ left: 300, behavior: "smooth" });
                }}
                className="bg-white/80 backdrop-blur-sm rounded-full p-1 md:p-2 hover:bg-white transition-all duration-300 shadow-md"
                aria-label="Défiler vers la droite"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-stone-700" />
              </button>
            </div>

            <div
              ref={galleryContainerRef}
              className="gallery-container flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide pb-6 md:pb-8 snap-x snap-mandatory"
            >
              {galleryImages.slice(5).map((image, index) => (
                <div
                  key={index}
                  className="relative group flex-shrink-0 snap-start"
                >
                  <LazyImage
                    src={image}
                    alt={`Galerie ${index + 6}`}
                    className="w-64 h-48 md:w-96 md:h-72 rounded-lg md:rounded-xl group-hover:scale-105 transition-transform duration-300"
                    onClick={() => openLightbox(suiteImages.length + index + 5)}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg md:rounded-xl"></div>
                  <button
                    onClick={() => openLightbox(suiteImages.length + index + 5)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    aria-label="Voir en grand"
                  >
                    <Maximize className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Amenities Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-stone-100 via-white to-stone-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-stone-800 mb-4 md:mb-6 tracking-wide">
              {t("suite.amenities.title")}
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
              {t("suite.amenities.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 justify-items-center max-w-4xl mx-auto">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-stone-100 w-full max-w-xs"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon container with elegant design */}
                  <div className="mb-4 md:mb-6 flex justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-stone-600 to-stone-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <div className="text-white group-hover:scale-110 transition-transform duration-300">
                        {amenity.icon}
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-sm md:text-base font-light text-stone-800 tracking-wide leading-relaxed group-hover:text-stone-900 transition-colors duration-300 text-center">
                    {amenity.text}
                  </h3>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-16 h-16 border border-stone-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border border-stone-200 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center px-4 md:px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-6 md:mb-8 tracking-wide">
            {t("suite.booking.title")}
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-light mb-8 md:mb-12 opacity-90 leading-relaxed max-w-2xl mx-auto">
            {t("suite.booking.description")}
          </p>
          <button
            onClick={handleBookNow}
            className="bg-white text-stone-800 px-8 py-3 md:px-12 md:py-4 rounded-full font-light tracking-wide hover:bg-stone-100 hover:scale-105 transition-all duration-300 text-base md:text-lg shadow-lg hover:shadow-xl"
          >
            {t("suite.booking.bookNow")}
          </button>
        </div>
      </section>

      {/* Enhanced Contact Information */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-stone-800 text-center mb-10 md:mb-16 tracking-wide">
            {t("suite.contact.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 text-stone-700">
            <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-md space-y-4 md:space-y-6">
              <div className="pb-3 md:pb-4 border-b border-stone-200">
                <h3 className="font-light text-lg md:text-xl mb-2 md:mb-3 text-stone-800">
                  {t("suite.contact.onlineBooking")}
                </h3>
                <a
                  href="https://thalassa-hotels.com"
                  className="text-stone-600 hover:text-stone-800 underline text-base md:text-lg transition-colors duration-200 break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.thalassa-hotels.com
                </a>
              </div>
              <div>
                <h3 className="font-light text-lg md:text-xl mb-2 md:mb-3 text-stone-800">
                  {t("suite.contact.emailBooking")}
                </h3>
                <a
                  href="mailto:booking.monastir@thalassa-hotels.com"
                  className="text-stone-600 hover:text-stone-800 underline text-base md:text-lg transition-colors duration-200 break-all"
                >
                  booking.monastir@thalassa-hotels.com
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-md space-y-4 md:space-y-6">
              <div className="pb-3 md:pb-4 border-b border-stone-200">
                <h3 className="font-light text-lg md:text-xl mb-2 md:mb-3 text-stone-800">
                  {t("suite.contact.information")}
                </h3>
                <a
                  href="tel:+21693953465"
                  className="text-stone-600 hover:text-stone-800 text-base md:text-lg transition-colors duration-200 block"
                >
                  T. +216 73520520
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0" onClick={closeLightbox}></div>

          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-stone-300 transition-colors duration-300 z-10 bg-black/50 rounded-full p-1 md:p-2 hover:bg-black/70"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={prevLightboxImage}
            className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-stone-300 transition-colors duration-300 z-10 bg-black/50 rounded-full p-2 md:p-3 hover:bg-black/70"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div className="relative max-w-6xl max-h-[80vh] mx-2 md:mx-4 z-10">
            <LazyImage
              src={allImages[lightboxImageIndex]}
              alt="Suite lightbox"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              loading="eager"
            />
          </div>

          <button
            onClick={nextLightboxImage}
            className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-stone-300 transition-colors duration-300 z-10 bg-black/50 rounded-full p-2 md:p-3 hover:bg-black/70"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 text-white text-base md:text-lg bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 z-10">
            <span className="font-light">
              {lightboxImageIndex + 1} / {allImages.length}
            </span>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Suite;
