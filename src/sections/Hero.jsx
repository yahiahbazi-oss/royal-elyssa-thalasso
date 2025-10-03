import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import your images
const Thalasso_Thalion_3 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759477821/Thalasso_Thal_ion_3_nfaihh.jpg";
const Espace_THEMAE_9 = "../assets/Espace_THEMAE_9.jpg";
const Thalion_RoyalElyssa = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759477822/thalion-royalelyssa.jpg__3876x1912_q85_crop_subsampling-2_upscale_qxd1c0.jpg";
const Photo_14_sur_56 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759477822/Photo___14_sur_56_dvdjlu.jpg";
const Suites_SPA_11 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759477815/Suites_SPA_11_wkegfc.jpg";

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Welcome overlay state
  const [showWelcome, setShowWelcome] = useState(true);

  // Auto-hide welcome text after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Your images with corresponding texts and navigation routes
  const images = [
    {
      src: Thalasso_Thalion_3,
      title: t("hero.slides.thalion.title"),
      subtitle: t("hero.slides.thalion.subtitle"),
      route: "/thalion",
    },

    {
      src: Thalion_RoyalElyssa,
      title: t("hero.slides.ericZemmour.title"),
      subtitle: t("hero.slides.ericZemmour.subtitle"),
      route: "/erich-zemmour", // This route matches your App.js
    },
    {
      src: Photo_14_sur_56,
      title: t("hero.slides.usine.title"),
      subtitle: t("hero.slides.usine.subtitle"),
      route: "/usine",
    },
    {
      src: Suites_SPA_11,
      title: t("hero.slides.carreVip.title"),
      subtitle: t("hero.slides.carreVip.subtitle"),
      route: "/Suite",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Auto-scroll functionality
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [images.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [images.length, isTransitioning]);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPlaying]);

  // Handle manual navigation
  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Navigate to specific page - This handles the "DÉCOUVRIR" button
  const handleDiscoverClick = () => {
    const currentImage = images[currentIndex];
    if (currentImage.route) {
      console.log("Navigating to:", currentImage.route); // Debug log
      navigate(currentImage.route);
    }
  };

  // Navigate when clicking on the title/subtitle area
  const handleTitleClick = () => {
    const currentImage = images[currentIndex];
    if (currentImage.route) {
      console.log("Title clicked, navigating to:", currentImage.route); // Debug log
      navigate(currentImage.route);
    }
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
    setIsPlaying(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    const maxOffset = window.innerWidth * 0.25;
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, diff));
    setDragOffset(limitedOffset);
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const swipeThreshold = 60;
    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      swipeDistance > 0 ? nextSlide() : prevSlide();
    }
    setDragOffset(0);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
    setIsDragging(true);
    setIsPlaying(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentTouch = e.clientX;
    const diff = touchStart - currentTouch;
    const maxOffset = window.innerWidth * 0.25;
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, diff));
    setDragOffset(limitedOffset);
    setTouchEnd(currentTouch);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const swipeThreshold = 60;
    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      swipeDistance > 0 ? nextSlide() : prevSlide();
    }
    setDragOffset(0);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Welcome Overlay - Appears on top of everything */}
      {showWelcome && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center welcome-overlay">
          <div className="text-center px-8 max-w-4xl mx-auto">
            {/* Main Welcome Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-amber-100 mb-6 tracking-wide">
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-2xl">
                Bienvenue à Royal Elyssa
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-stone-200 text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[0.3em] drop-shadow-lg mb-8">
              THALASSO & SPA
            </p>

            {/* Luxury decorative elements */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-24"></div>
              <div className="mx-6 flex space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-lg"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-lg mt-0.5"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-lg"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-24"></div>
            </div>

            {/* Location - MONASTIR */}
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-amber-100 tracking-wide">
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 drop-shadow-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFF700 25%, #FFED4E 50%, #FFF700 75%, #FFD700 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4)',
                        filter: 'drop-shadow(0 3px 6px rgba(255, 215, 0, 0.5))'
                      }}>
                  MONASTIR
                </span>
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* Premium luxury fonts and styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Upright:wght@500;600;700&family=Marcellus+SC&display=swap");

        .luxury-title {
          font-family: "Marcellus SC", serif;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #f5f5dc; /* Beige clair */
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.3),
            2px 2px 4px rgba(0, 0, 0, 0.3);
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .luxury-title:hover {
          color: #d4af37; /* Gold color on hover */
          text-shadow: 0 0 12px rgba(212, 175, 55, 0.5);
        }

        .luxury-subtitle {
          font-family: "Cormorant Upright", serif;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: rgba(
            245,
            245,
            220,
            0.9
          ); /* Beige clair with slight transparency */
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .luxury-subtitle:hover {
          color: rgba(212, 175, 55, 0.9); /* Gold color on hover */
        }

        .luxury-button-primary {
          background: linear-gradient(
            135deg,
            #d4af37 0%,
            #f4d03f 50%,
            #f7dc6f 100%
          );
          box-shadow: 0 8px 32px rgba(212, 175, 55, 0.4);
          border: 2px solid rgba(244, 220, 63, 0.6);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .luxury-button-primary:hover {
          background: linear-gradient(
            135deg,
            #f4d03f 0%,
            #d4af37 50%,
            #b8860b 100%
          );
          box-shadow: 0 12px 48px rgba(212, 175, 55, 0.6);
          transform: translateY(-2px) scale(1.02);
        }

        .luxury-button-secondary {
          background: rgba(248, 245, 240, 0.1);
          border: 2px solid rgba(248, 245, 240, 0.8);
          backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .luxury-button-secondary:hover {
          background: rgba(248, 245, 240, 0.95);
          color: #2c1810;
          box-shadow: 0 8px 32px rgba(248, 245, 240, 0.3);
          transform: translateY(-2px) scale(1.02);
        }

        /* Welcome Overlay Styles */
        .welcome-overlay {
          background: radial-gradient(circle at center, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%);
          backdrop-filter: blur(8px);
          animation: welcomeFadeIn 0.8s ease-out;
        }

        .welcome-text {
          font-family: 'Marcellus SC', serif;
          background: linear-gradient(45deg, #FFD700, #FFF700, #FFED4E, #FFD700);
          background-size: 300% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: welcomeGoldShimmer 3s ease-in-out infinite, welcomeFloat 2s ease-in-out infinite alternate;
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3);
        }

        .welcome-subtitle {
          font-family: 'Cormorant Upright', serif;
          color: #F5F5DC;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          animation: welcomeSubtitleFade 1s ease-out 0.5s both;
        }

        @keyframes welcomeFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes welcomeGoldShimmer {
          0% { background-position: -300% 0; }
          50% { background-position: 0% 0; }
          100% { background-position: 300% 0; }
        }

        @keyframes welcomeFloat {
          from { transform: translateY(0px); }
          to { transform: translateY(-10px); }
        }

        @keyframes welcomeSubtitleFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Image Container */}
      <div
        className="relative w-full h-full select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-x-0"
                : index < currentIndex
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
            style={{
              transform:
                isDragging && index === currentIndex
                  ? `translateX(${-dragOffset}px)`
                  : undefined,
              transition: isDragging ? "none" : undefined,
            }}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay - Made clickable for navigation */}
      <div
        className="absolute inset-0 flex items-center justify-start z-10 cursor-pointer"
        onClick={handleTitleClick}
      >
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-3xl">
            <h1 className="luxury-title text-4xl md:text-6xl lg:text-7xl mb-6">
              {images[currentIndex].title}
            </h1>
            <p className="luxury-subtitle text-xl md:text-2xl lg:text-3xl mb-10 max-w-2xl">
              {images[currentIndex].subtitle}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDiscoverClick}
                className="luxury-button-primary text-black px-8 py-3 font-semibold text-sm tracking-widest uppercase"
              >
                {t("hero.cta")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center z-20">
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="ml-6 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 disabled:opacity-30 border border-white/20 hover:border-white/40"
          aria-label={t("hero.navigation.previous")}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center z-20">
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="mr-6 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 disabled:opacity-30 border border-white/20 hover:border-white/40"
          aria-label={t("hero.navigation.next")}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-6 bg-black/15 backdrop-blur-xl rounded-full px-8 py-4 border border-white/10">
          <button
            onClick={togglePlayPause}
            className="text-white hover:text-amber-300 transition-colors"
            aria-label={
              isPlaying ? t("hero.navigation.pause") : t("hero.navigation.play")
            }
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          <div className="flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-amber-300 scale-150 shadow-md shadow-amber-300/50"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={t("hero.navigation.goToSlide", {
                  number: index + 1,
                })}
              />
            ))}
          </div>

          <div className="w-24 h-1 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / images.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Indicator */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 md:hidden">
        <div className="text-white/70 text-sm italic tracking-wide font-light">
          {t("hero.mobileSwipe")}
        </div>
      </div>
    </section>
  );
};

export default Hero;
