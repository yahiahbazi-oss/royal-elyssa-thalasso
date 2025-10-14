import React from "react";
import { useTranslation } from "react-i18next";

// Cloudinary image URLs
const aq1 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1760435026/L2_awjhsd.avif";

const hydro1 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1760435026/L3_hjyhgp.avif";

const hammam1 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1760435026/L4_fikqn1.avif";

const serenite1 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/v1760435026/L5_lbvnqz.avif";

const LieuSoins = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* First Section - THALION Introduction */}
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-800 to-amber-900 py-10 px-2 sm:py-16 sm:px-6 flex flex-col items-center justify-center relative overflow-hidden">
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

        <div className="w-full max-w-5xl mx-auto text-center relative z-10">
          {/* Static Title - No Animation */}
          <div className="mb-10 sm:mb-16">
            {/* THALION Brand */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-amber-100 mb-2 sm:mb-4 tracking-wide">
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-2xl">
                  THALION
                </span>
              </h1>
              <p className="text-stone-200 text-lg xs:text-xl sm:text-2xl md:text-3xl font-extralight tracking-[0.1em] sm:tracking-[0.2em] italic">
                {t("thalion.lieuSoins.subtitle2")}
              </p>
            </div>

            {/* Main Title */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 xs:p-6 sm:p-8 md:p-12 border border-amber-300/20">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 mb-2 sm:mb-4">
                {t("thalion.lieuSoins.title")}
              </h2>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200">
                {t("thalion.lieuSoins.subtitle")}
              </h2>
            </div>

            {/* Luxury decorative elements */}
            <div className="flex flex-col xs:flex-row items-center justify-center mt-6 sm:mt-12 gap-3 xs:gap-0">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-20 sm:w-32"></div>
              <div className="mx-4 flex space-x-2 sm:space-x-3">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-lg"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-lg mt-0.5 sm:mt-1"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-lg"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-20 sm:w-32"></div>
            </div>
          </div>

          {/* Static Description Text - No Animation */}
          <div>
            <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-4 xs:p-6 sm:p-12 md:p-16 shadow-2xl border border-amber-300/20 relative overflow-hidden">
              {/* Luxury inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-yellow-300/5 rounded-3xl"></div>

              <div className="relative z-10">
                <p className="text-amber-100 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-light max-w-2xl sm:max-w-4xl mx-auto text-center">
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
      <section className="relative w-full min-h-[60vh] sm:min-h-screen bg-black overflow-hidden flex flex-col sm:flex-row items-center justify-center p-0">
        <img
          src={aq1}
          alt="Espace aquatique"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          loading="eager"
        />
        <div className="relative z-10 w-full flex justify-center items-center py-8 sm:py-0">
          <div className="w-full max-w-lg sm:max-w-2xl bg-black/60 rounded-2xl p-4 xs:p-6 sm:p-8 md:p-14 shadow-2xl border-l-4 border-amber-400/80 mx-2 sm:mx-0">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-200 mb-4 tracking-wide"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {" "}
              {t("thalion.lieuSoins.aquatique.title")}{" "}
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl text-amber-100 font-light leading-relaxed"
              style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
            >
              {" "}
              {t("thalion.lieuSoins.aquatique.description")}{" "}
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full min-h-[60vh] sm:min-h-screen bg-black overflow-hidden flex flex-col sm:flex-row items-center justify-center p-0">
        <img
          src={hydro1}
          alt="Espace hydrothérapie"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          loading="eager"
        />
        <div className="relative z-10 w-full flex justify-center items-center py-8 sm:py-0">
          <div className="w-full max-w-lg sm:max-w-2xl bg-black/60 rounded-2xl p-4 xs:p-6 sm:p-8 md:p-14 shadow-2xl border-l-4 border-amber-400/80 mx-2 sm:mx-0">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-200 mb-4 tracking-wide"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {" "}
              {t("thalion.lieuSoins.hydrotherapie.title")}{" "}
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl text-amber-100 font-light leading-relaxed"
              style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
            >
              {" "}
              {t("thalion.lieuSoins.hydrotherapie.description")}{" "}
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full min-h-[60vh] sm:min-h-screen bg-black overflow-hidden flex flex-col sm:flex-row items-center justify-center p-0">
        <img
          src={hammam1}
          alt="Espace hammam"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          loading="eager"
        />
        <div className="relative z-10 w-full flex justify-center items-center py-8 sm:py-0">
          <div className="w-full max-w-lg sm:max-w-2xl bg-black/60 rounded-2xl p-4 xs:p-6 sm:p-8 md:p-14 shadow-2xl border-l-4 border-amber-400/80 mx-2 sm:mx-0">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-200 mb-4 tracking-wide"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {" "}
              {t("thalion.lieuSoins.hammam.title")}{" "}
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl text-amber-100 font-light leading-relaxed"
              style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
            >
              {" "}
              {t("thalion.lieuSoins.hammam.description")}{" "}
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full min-h-[60vh] sm:min-h-screen bg-black overflow-hidden flex flex-col sm:flex-row items-center justify-center p-0">
        <img
          src={serenite1}
          alt="Espace sérénité"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          loading="eager"
        />
        <div className="relative z-10 w-full flex justify-center items-center py-8 sm:py-0">
          <div className="w-full max-w-lg sm:max-w-2xl bg-black/60 rounded-2xl p-4 xs:p-6 sm:p-8 md:p-14 shadow-2xl border-l-4 border-amber-400/80 mx-2 sm:mx-0">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-200 mb-4 tracking-wide"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {" "}
              {t("thalion.lieuSoins.serenite.title")}{" "}
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl text-amber-100 font-light leading-relaxed"
              style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
            >
              {" "}
              {t("thalion.lieuSoins.serenite.description")}{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LieuSoins;
