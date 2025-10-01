import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize,
  Bed,
  Bath,
  Car,
  Wifi,
  Coffee,
  Users,
  Play,
  Pause,
  Menu,
  Home, // Added Home icon
} from "lucide-react";

// Import your local images - replace these mock imports with your actual ones
import SuiteImage from "./assets/Suites_SPA_11.jpg";
import CarreVIP4 from "./assets/carre_VIP_suite_spa_(4).JPG";
import CarreVIP5 from "./assets/carre_VIP_suite_spa_(5).JPG";
import CarreVIP6 from "./assets/carre_VIP_suite_spa_(6).JPG";
import CarreVIP7 from "./assets/carre_VIP_suite_spa_(7).JPG";
import SuitesSPA1 from "./assets/Suites_SPA_1.jpg";
import SuitesSPA2 from "./assets/Suites_SPA_2.jpg";
import SuitesSPA3 from "./assets/Suites_SPA_3.jpg";
import SuitesSPA4 from "./assets/Suites_SPA_4.jpg";
import SuitesSPA5 from "./assets/Suites_SPA_5.jpg";
import SuitesSPA8 from "./assets/Suites_SPA_8.jpg";
import SuitesSPA9 from "./assets/Suites_SPA_9.jpg";
import SuitesSPA11 from "./assets/Suites_SPA_11.jpg";
import SuitesSPA14 from "./assets/Suites_SPA_14.jpg";
import SuitesSPA15 from "./assets/Suites_SPA_15.jpg";
import SuitesSPA18 from "./assets/Suites_SPA_18.jpg";
import SuitesSPA19 from "./assets/Suites_SPA_19.jpg";
import SuitesSPA20 from "./assets/Suites_SPA_20.jpg";

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
    setCurrentImageIndex((prev) => (prev + 1) % suiteImages.length);
  }, [suiteImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + suiteImages.length) % suiteImages.length
    );
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
    { icon: <Bed className="w-5 h-5 md:w-6 md:h-6" />, text: "Lit King Size" },
    {
      icon: <Bath className="w-5 h-5 md:w-6 md:h-6" />,
      text: "Salle de Bain en Marbre",
    },
    {
      icon: <Car className="w-5 h-5 md:w-6 md:h-6" />,
      text: "Service de Voiturier",
    },
    {
      icon: <Wifi className="w-5 h-5 md:w-6 md:h-6" />,
      text: "WiFi Haut Débit",
    },
    {
      icon: <Coffee className="w-5 h-5 md:w-6 md:h-6" />,
      text: "Service en Chambre 24/7",
    },
    {
      icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
      text: "Service Concierge",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Home Button */}
      <button
        onClick={goToHomePage}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-beige-500 hover:bg-beige-600 rounded-full px-4 py-2 transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Retour à la page d'accueil"
        style={{ backgroundColor: "#d7ccc8", color: "#5d4037" }} // Couleur beige et texte marron
      >
        <Home className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-sm font-medium">Accueil</span>
      </button>

      {/* Hero Section with Enhanced Image Carousel */}
      <div
        className="relative h-screen overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10"></div>

        <LazyImage
          src={suiteImages[currentImageIndex]}
          alt="Carré VIP Spa"
          className="w-full h-full"
          loading="eager"
        />

        {/* Enhanced Navigation */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-20 flex justify-between px-4 md:px-6">
          <button
            onClick={prevImage}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-2 md:p-4 transition-all duration-300 border border-white/20 hover:scale-110"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-2 md:p-4 transition-all duration-300 border border-white/20 hover:scale-110"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-light mb-4 md:mb-6 tracking-wide drop-shadow-2xl">
              CARRÉ VIP SUITES SPA
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-light tracking-widest opacity-90 drop-shadow-lg">
              LE LUXE, TOUT SIMPLEMENT
            </p>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-2 md:p-3 transition-all duration-300 border border-white/20 hover:scale-110"
            aria-label={
              isAutoPlay
                ? "Arrêter le défilement automatique"
                : "Démarrer le défilement automatique"
            }
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-1 md:gap-2">
          {suiteImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 md:bottom-4">
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
              Un Sanctuaire Exquis
            </h2>
            <div className="space-y-4 md:space-y-6 text-stone-700 leading-relaxed">
              <p className="text-base md:text-lg lg:text-xl font-light">
                Vous avez le choix pour votre hébergement : soit vous pouvez
                résider au Royal Thalassa Monastir*****, directement relié au
                Royal Elyssa Thalasso & Spa, soit vous préférerez habiter au
                cœur de notre centre, au deuxième étage, dans le magnifique
                Carré VIP Suites Spa, composé de vingt suites, donnant à la fois
                sur de luxuriants jardins suspendus, la Méditerranée toute
                proche et une piscine privée, uniquement réservée aux résidents
                du Carré VIP.
              </p>
              <p className="text-sm md:text-base lg:text-lg font-light opacity-90">
                Les Suites Spa sont luxueusement décorées dans un style
                contemporain et épuré. Elles sont dotées de salles de bains
                spacieuses et certaines vous offrent même des jacuzzis sur leurs
                terrasses privatives.
              </p>
              <p className="text-sm md:text-base lg:text-lg font-light opacity-90">
                Si vous résidez dans notre carré VIP, vous pourrez en toute
                facilité accéder directement à tous nos espaces thalasso et spa
                en peignoir.
              </p>
            </div>
          </div>

          {/* Modern Masonry Grid Layout */}
          <div className="space-y-4 md:space-y-6">
            {/* Featured Large Image */}
            <div className="relative group overflow-hidden rounded-xl md:rounded-2xl">
              <LazyImage
                src={galleryImages[0]}
                alt="Suite principale"
                className="w-full h-60 md:h-80 group-hover:scale-110 transition-transform duration-700"
                onClick={() => openLightbox(suiteImages.length)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <button
                onClick={() => openLightbox(suiteImages.length)}
                className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/20 backdrop-blur-md rounded-full p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
                aria-label="Voir en grand"
              >
                <Maximize className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
              <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-sm md:text-lg font-light">
                  Suite Principale
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
                    alt={`Détail de la suite ${index + 2}`}
                    className="w-full h-40 md:h-48 group-hover:scale-110 transition-transform duration-500"
                    onClick={() => openLightbox(suiteImages.length + index + 1)}
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <button
                    onClick={() => openLightbox(suiteImages.length + index + 1)}
                    className="absolute top-1 right-1 md:top-2 md:right-2 bg-white/20 backdrop-blur-md rounded-full p-1 md:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
                    aria-label="Voir en grand"
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

      {/* Call to Action */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center px-4 md:px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-6 md:mb-8 tracking-wide">
            Réservez Votre Séjour
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-light mb-8 md:mb-12 opacity-90 leading-relaxed max-w-2xl mx-auto">
            Vivez l'apogée de l'hospitalité de luxe. Votre sanctuaire d'élégance
            vous attend dans un cadre d'exception au cœur de la Méditerranée.
          </p>
          <button
            onClick={handleBookNow}
            className="bg-white text-stone-800 px-8 py-3 md:px-12 md:py-4 rounded-full font-light tracking-wide hover:bg-stone-100 hover:scale-105 transition-all duration-300 text-base md:text-lg shadow-lg hover:shadow-xl"
          >
            RÉSERVER MAINTENANT
          </button>
        </div>
      </section>

      {/* Enhanced Contact Information */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-stone-800 text-center mb-10 md:mb-16 tracking-wide">
            Informations & Réservations
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 text-stone-700">
            <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-md space-y-4 md:space-y-6">
              <div className="pb-3 md:pb-4 border-b border-stone-200">
                <h3 className="font-light text-lg md:text-xl mb-2 md:mb-3 text-stone-800">
                  Réservation en ligne
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
                  Réservation par mail
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
                  Informations
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
