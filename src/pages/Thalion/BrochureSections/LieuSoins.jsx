import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// Cloudinary image URLs
const aq1 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746493/aq1_qc3iqh.jpg";
const aq2 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746512/aq2_zpzx0i.jpg";
const aq3 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746607/aq3_jgjglc.jpg";

const hydro1 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746610/hydro1_mti38o.webp";
const hydro2 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746610/hydro2_bcpky3.webp";
const hydro3 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746610/hydro3_xphxey.webp";
const hydro4 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746612/hydro4_xp2byj.webp";

const hammam1 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746609/hammam1_asixfp.webp";
const hammam2 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746611/hammam2_mrefcz.webp";
const hammam3 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746608/hammam3_ffaavz.webp";
const hammam4 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746609/hammam4_xldjzk.webp";

const serenite1 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746640/serenite1_dgxkyc.webp";
const serenite2 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746657/serenite2_tamd0j.webp";
const serenite3 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1759746658/serenite3_yxyv75.webp";

const LieuSoins = () => {
  const { t } = useTranslation();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hydroImageIndex, setHydroImageIndex] = useState(0);
  const [hammamImageIndex, setHammamImageIndex] = useState(0);
  const [sereniteImageIndex, setSereniteImageIndex] = useState(0);

  // Aquatic space images
  const backgroundImages = [aq1, aq2, aq3];

  // Hydrothérapie images (updated with hydro4)
  const hydroImages = [hydro1, hydro2, hydro3, hydro4];

  // Hammam images (updated with hammam4)
  const hammamImages = [hammam1, hammam2, hammam3, hammam4];

  // Sérénité images
  const sereniteImages = [serenite1, serenite2, serenite3];

  // Background image rotation for second section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Navigation functions
  const nextImage = (section) => {
    switch (section) {
      case "aqua":
        setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        break;
      case "hydro":
        setHydroImageIndex((prev) => (prev + 1) % hydroImages.length);
        break;
      case "hammam":
        setHammamImageIndex((prev) => (prev + 1) % hammamImages.length);
        break;
      case "serenite":
        setSereniteImageIndex((prev) => (prev + 1) % sereniteImages.length);
        break;
    }
  };

  const prevImage = (section) => {
    switch (section) {
      case "aqua":
        setCurrentImageIndex(
          (prev) =>
            (prev - 1 + backgroundImages.length) % backgroundImages.length
        );
        break;
      case "hydro":
        setHydroImageIndex(
          (prev) => (prev - 1 + hydroImages.length) % hydroImages.length
        );
        break;
      case "hammam":
        setHammamImageIndex(
          (prev) => (prev - 1 + hammamImages.length) % hammamImages.length
        );
        break;
      case "serenite":
        setSereniteImageIndex(
          (prev) => (prev - 1 + sereniteImages.length) % sereniteImages.length
        );
        break;
    }
  };

  return (
    <div className="w-full">
      {/* First Section - THALION Introduction */}
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-800 to-amber-900 py-20 px-6 flex items-center justify-center relative overflow-hidden">
        {/* Luxury background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-stone-300/10 to-slate-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-300/15 to-yellow-400/15 rounded-full blur-2xl animate-pulse delay-500"></div>

          {/* Luxury pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #F59E0B 1px, transparent 1px), 
                               radial-gradient(circle at 75% 75%, #FCD34D 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Static Title - No Animation */}
          <div className="mb-16">
            {/* THALION Brand */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-amber-100 mb-4 tracking-wide">
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-2xl">
                  THALION
                </span>
              </h1>
              <p className="text-stone-200 text-2xl md:text-3xl font-extralight tracking-[0.2em] italic">
                {t("thalion.lieuSoins.subtitle2")}
              </p>
            </div>

            {/* Main Title */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-amber-300/20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 mb-4">
                {t("thalion.lieuSoins.title")}
              </h2>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200">
                {t("thalion.lieuSoins.subtitle")}
              </h2>
            </div>

            {/* Luxury decorative elements */}
            <div className="flex items-center justify-center mt-12">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-32"></div>
              <div className="mx-8 flex space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-lg"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-lg mt-1"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-lg"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-32"></div>
            </div>
          </div>

          {/* Static Description Text - No Animation */}
          <div>
            <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-12 md:p-16 shadow-2xl border border-amber-300/20 relative overflow-hidden">
              {/* Luxury inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-yellow-300/5 rounded-3xl"></div>

              <div className="relative z-10">
                <p className="text-amber-100 text-xl md:text-2xl lg:text-3xl leading-relaxed font-light max-w-4xl mx-auto text-center">
                  {t("thalion.lieuSoins.fourSpaces")}{" "}
                  <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                    THALION
                  </span>{" "}
                  {t("thalion.lieuSoins.description")}{" "}
                  <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                    !
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating animation styles */}
  <style>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Second Section - Espace Aquatique */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Premium luxury fonts and styles */}
  <style>{`
          @import url("https://fonts.googleapis.com/css2?family=Cormorant+Upright:wght@500;600;700&family=Marcellus+SC&display=swap");

          .luxury-title-aqua {
            font-family: "Marcellus SC", serif;
            font-weight: 600;
            letter-spacing: 0.15em;
            color: #f5f5dc; /* Beige clair */
            text-shadow: 0 0 8px rgba(0, 0, 0, 0.3),
              2px 2px 4px rgba(0, 0, 0, 0.3);
            text-transform: uppercase;
          }

          .luxury-subtitle-aqua {
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
          }

          .luxury-button-primary-aqua {
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

          .luxury-button-primary-aqua:hover {
            background: linear-gradient(
              135deg,
              #f4d03f 0%,
              #d4af37 50%,
              #b8860b 100%
            );
            box-shadow: 0 12px 48px rgba(212, 175, 55, 0.6);
            transform: translateY(-2px) scale(1.02);
          }

          .luxury-button-secondary-aqua {
            background: rgba(248, 245, 240, 0.1);
            border: 2px solid rgba(248, 245, 240, 0.8);
            backdrop-filter: blur(20px);
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .luxury-button-secondary-aqua:hover {
            background: rgba(248, 245, 240, 0.95);
            color: #2c1810;
            box-shadow: 0 8px 32px rgba(248, 245, 240, 0.3);
            transform: translateY(-2px) scale(1.02);
          }
        `}</style>

        {/* Image Container - 100% Clear Images */}
        <div className="relative w-full h-full select-none">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentImageIndex
                  ? "opacity-100 translate-x-0"
                  : index < currentImageIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <img
                src={image}
                alt={`Espace aquatique ${index + 1}`}
                className="w-full h-full object-cover object-center pointer-events-none"
                draggable={false}
              />
              {/* Exact same gradient overlays as Hero */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay - Static Text */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl text-center">
              <h1 className="luxury-title-aqua text-3xl md:text-4xl lg:text-5xl mb-6">
                {t("thalion.lieuSoins.aquatique.title")}
              </h1>
              <p className="luxury-subtitle-aqua text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
                {t("thalion.lieuSoins.aquatique.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Positioned lower to avoid text */}
        <div className="absolute bottom-10 left-0 flex items-center z-20">
          <button
            onClick={() => prevImage("aqua")}
            className="ml-6 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 border border-white/30 hover:border-white/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-10 right-0 flex items-center z-20">
          <button
            onClick={() => nextImage("aqua")}
            className="mr-6 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 border border-white/30 hover:border-white/50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Third Section - Espace Hydrothérapie */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Image Container - 100% Clear Images */}
        <div className="relative w-full h-full select-none">
          {hydroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === hydroImageIndex
                  ? "opacity-100 translate-x-0"
                  : index < hydroImageIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <img
                src={image}
                alt={`Espace hydrothérapie ${index + 1}`}
                className="w-full h-full object-cover object-center pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay - Static Text */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl text-center">
              <h1 className="luxury-title-aqua text-3xl md:text-4xl lg:text-5xl mb-6">
                {t("thalion.lieuSoins.hydrotherapie.title")}
              </h1>
              <p className="luxury-subtitle-aqua text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed">
                {t("thalion.lieuSoins.hydrotherapie.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Positioned lower to avoid text */}
        <div className="absolute bottom-10 left-0 flex items-center z-20">
          <button
            onClick={() => prevImage("hydro")}
            className="ml-6 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 border border-white/30 hover:border-white/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-10 right-0 flex items-center z-20">
          <button
            onClick={() => nextImage("hydro")}
            className="mr-6 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 border border-white/30 hover:border-white/50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Fourth Section - Espace Hammam */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Image Container - 100% Clear Images */}
        <div className="relative w-full h-full select-none">
          {hammamImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === hammamImageIndex
                  ? "opacity-100 translate-x-0"
                  : index < hammamImageIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <img
                src={image}
                alt={`Espace hammam ${index + 1}`}
                className="w-full h-full object-cover object-center pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay - Static Text */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl text-center">
              <h1 className="luxury-title-aqua text-3xl md:text-4xl lg:text-5xl mb-6">
                {t("thalion.lieuSoins.hammam.title")}
              </h1>
              <p className="luxury-subtitle-aqua text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed">
                {t("thalion.lieuSoins.hammam.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Positioned lower to avoid text */}
        <div className="absolute bottom-10 left-0 flex items-center z-20">
          <button
            onClick={() => prevImage("hammam")}
            className="ml-6 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 border border-white/30 hover:border-white/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-10 right-0 flex items-center z-20">
          <button
            onClick={() => nextImage("hammam")}
            className="mr-6 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 border border-white/30 hover:border-white/50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Fifth Section - Espace Sérénité */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Image Container - 100% Clear Images */}
        <div className="relative w-full h-full select-none">
          {sereniteImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === sereniteImageIndex
                  ? "opacity-100 translate-x-0"
                  : index < sereniteImageIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <img
                src={image}
                alt={`Espace sérénité ${index + 1}`}
                className="w-full h-full object-cover object-center pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay - Static Text */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl text-center">
              <h1 className="luxury-title-aqua text-3xl md:text-4xl lg:text-5xl mb-6">
                {t("thalion.lieuSoins.serenite.title")}
              </h1>
              <p className="luxury-subtitle-aqua text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed">
                {t("thalion.lieuSoins.serenite.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Positioned lower to avoid text */}
        <div className="absolute bottom-10 left-0 flex items-center z-20">
          <button
            onClick={() => prevImage("serenite")}
            className="ml-6 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 border border-white/30 hover:border-white/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-10 right-0 flex items-center z-20">
          <button
            onClick={() => nextImage("serenite")}
            className="mr-6 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 border border-white/30 hover:border-white/50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LieuSoins;
