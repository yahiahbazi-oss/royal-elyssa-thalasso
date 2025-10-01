import React, { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";

// Import static images
import jour1 from "./assets/na1.JPG";
import jour2 from "./assets/na2.JPG";
import jour3 from "./assets/na3.JPG";
import jour4 from "./assets/na4.JPG";
import jour5 from "./assets/na5.JPG";
import jour6 from "./assets/na6.JPG";

// Import Video
import nouvelAgeVideo from "./assets/na.webm";

const NouvelAge = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const location = useLocation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = React.useRef(null);

  const handleVideoLoad = useCallback(() => {
    try {
      const video = videoRef.current;
      if (video) {
        video.play().catch((e) => {
          console.error("Autoplay prevented:", e);
          setVideoError(true);
        });
      }
    } catch (e) {
      console.error("Video error:", e);
      setVideoError(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const packageId = location.state?.packageId;
    if (packageId) {
      console.log("Package ID:", packageId);
    }
  }, [location.pathname]);

  const dayImages = {
    1: jour1,
    2: jour2,
    3: jour3,
    4: jour4,
    5: jour5,
    6: jour6,
  };

  const treatments = {
    "Nouvel Age": {
      description: `Véritable cure de jouvence, l'Escale Nouvel Age vous apporte un incroyable sentiment de bien-être intérieur
en agissant sur le corps et l'esprit. Vous conjuguez des soins visage et corps pour redonner
à tout votre être, jeunesse et beauté.
Vous aimerez : Le programme de soins qui alterne soins esthétiques, massages (de 25' à 40')
et hydrothérapie pour renforcer l'efficacité anti-âge.
Durée: 4 ou 6 jours* (durée moyenne des soins par jour: 2h00)`,
      supplement:
        "En complément de votre Escale Marine, le parcours marin « eau de mer naturelle » ainsi que le hammam vapeur sont accessibles avant les soins.",
      pricing: [
        { duration: "4 jours", price: "900 TND / 273 €" },
        { duration: "6 jours", price: "1450 TND / 440 €" },
      ],
      days: {
        1: [
          "Gommage douceur Bora Bora",
          "Duo enveloppement douceur à la pulpe de coco",
          "Soin visage Beauté Essentielle personnalisé",
        ],
        2: [
          "Palper-rouler SLIM sous pluie de mer",
          "Soin corps Performance Fermeté",
          "Massage drainant du visage",
        ],
        3: [
          "Bain aromatique relaxant",
          "Duo enveloppement peau neuve aux enzymes de fruits",
          "Soin 4 doigts visage",
        ],
        4: [
          "Duo enveloppement soyeux poudre de coton",
          "Massage douceur de brise à l'huile de coco",
          "Soin yeux Lift Expert Regard",
        ],
        5: [
          "Bain aromatique amincissant",
          "Soin corps Cellu Contour",
          "Soin visage Beauté Essentielle personnalisé",
        ],
        6: [
          "Palper-rouler SLIM sous pluie de mer",
          "Duo enveloppement peau neuve aux enzymes de fruits",
          "Soin visage Lift Absolu",
        ],
      },
    },
  };

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        {!videoError && (
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              src={nouvelAgeVideo}
              alt="Nouvel Age therapy background"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                isVideoLoaded ? "opacity-50 scale-100" : "opacity-0 scale-105"
              }`}
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transform: "translate3d(0, 0, 0)",
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200"></div>
        )}

        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-400 rounded-full animate-spin"></div>
              <p className="text-purple-600 font-light">
                Préparation de votre programme Nouvel Age...
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
              radial-gradient(circle at 20% 20%, rgba(233, 213, 255, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(216, 180, 254, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(192, 132, 252, 0.1) 0%, transparent 50%)
            `,
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-30">
        <SoinsDesign
          treatments={treatments}
          dayImages={dayImages}
          colorTheme="purple"
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
};

export default NouvelAge;
