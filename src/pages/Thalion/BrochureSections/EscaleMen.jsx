import React, { useEffect, useState, useCallback, useMemo } from "react";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";

// Import static images
import jour1 from "./assets/MM1.jpg";
import jour2 from "./assets/MM2.jpg";
import jour3 from "./assets/MM3.jpg";
import jour4 from "./assets/MM4.jpg";
import jour5 from "./assets/MM5.jpg";
import jour6 from "./assets/MM6.jpg";

// Import Video
import masseurVideo from "./assets/mv.webm";

const EscaleMen = React.memo(() => {
  const location = useLocation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = React.useRef(null);

  // Memoize static data to prevent re-creation
  const dayImages = useMemo(
    () => ({
      1: jour1,
      2: jour2,
      3: jour3,
      4: jour4,
      5: jour5,
      6: jour6,
    }),
    []
  );

  const treatments = useMemo(
    () => ({
      "Escale For Men": {
        description: `Spécialement conçue pour vous les hommes, cette cure propose un programme complet
alliant soins du visage et du corps, dont des massages de 25 à 50', pour retrouver force et vitalité.
Notre promesse: En 4 ou 6 jours chrono pour rebooster votre capital énergétique!
Durée: 4 ou 6 jours* (durée moyenne des soins par jour: 2h30)`,
        supplement:
          "En complément de votre Escale Marine, le parcours marin « eau de mer naturelle  » ainsi que le hammam vapeur sont accessibles avant les soins.",
        pricing: [
          { duration: "4 jours", price: "850 TND / 258 €" },
          { duration: "6 jours", price: "1330 TND / 404 €" },
        ],
        days: {
          1: [
            "Gommage revitalisant aux huiles essentielles",
            "Bain revitalisant à la crème d'algues",
            "Massage souffle d'énergie à l'huile de noix du Brésil",
          ],
          2: [
            "Grand jet tonique",
            "Duo Boue Marine bienfaisante",
            "Massage du dos",
          ],
          3: [
            "Douche drainante sous marine",
            "Massage bruine de mer à la criste marine Bio",
            "Massage souffle d'énergie à l'huile de noix du Brésil",
          ],
          4: [
            "Grand jet tonique",
            "Duo Boue Marine bienfaisante",
            "Massage du dos",
          ],
          5: [
            "Bain revitalisant à la crème d'algues",
            "Massage bruine de mer à la criste marine Bio",
            "Massage pieds sensibles",
          ],
          6: [
            "Duo Boue Marine bienfaisante",
            "Massage bonheur des muscles au baume camphré",
            "Soin visage Facial Oxygen Booster",
          ],
        },
      },
    }),
    []
  );

  const handleVideoLoad = useCallback(() => {
    if (!videoRef.current) return;

    try {
      videoRef.current.play().catch((e) => {
        console.error("Autoplay prevented:", e);
        setVideoError(true);
      });
    } catch (e) {
      console.error("Video error:", e);
      setVideoError(true);
    }
  }, []);

  // Simplified useEffect - only handle essential setup
  useEffect(() => {
    const packageId = location.state?.packageId;
    if (packageId) {
      console.log("Package ID:", packageId);
    }
  }, [location.state?.packageId]);

  // Video cleanup only on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        {!videoError && (
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              src={masseurVideo}
              alt="Massage therapy background"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? "opacity-50" : "opacity-0"
              }`}
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
              loop
              muted
              playsInline
              autoPlay
              onCanPlay={() => {
                setIsVideoLoaded(true);
                setVideoError(false);
                handleVideoLoad();
              }}
              onError={() => setVideoError(true)}
              onPlaying={() => setIsVideoLoaded(true)}
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        )}

        {(videoError || !isVideoLoaded) && (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200"></div>
        )}

        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-400 rounded-full animate-spin"></div>
              <p className="text-stone-600 font-light">
                Préparation de l'expérience spa...
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-1 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(214, 211, 209, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(168, 162, 158, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(120, 113, 108, 0.1) 0%, transparent 50%)
            `,
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-30">
        <SoinsDesign
          treatments={treatments}
          dayImages={dayImages}
          colorTheme="beige"
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-10px, -10px) rotate(1deg);
          }
          66% {
            transform: translate(10px, -5px) rotate(-1deg);
          }
        }
      `}</style>
    </div>
  );
});

EscaleMen.displayName = "EscaleMen";

export default EscaleMen;
