import React, { useEffect, useState, useCallback, useMemo } from "react";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";

// Import static images
import jour1 from "./assets/NS1.jpg";
import jour2 from "./assets/NS2.jpg";
import jour3 from "./assets/NS3.jpg";
import jour4 from "./assets/NS4.jpg";
import jour5 from "./assets/NS5.jpg";

// Import Video
import masseurVideo from "./assets/curenonstress.webm";

const CureNoStress = React.memo(() => {
  const location = useLocation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = React.useRef(null);

  // Memoize static data
  const dayImages = useMemo(
    () => ({
      1: jour1,
      2: jour2,
      3: jour3,
      4: jour4,
      5: jour5,
    }),
    []
  );

  const treatments = useMemo(
    () => ({
      "No Stress": {
        description:
          "Offrez-vous une parenthèse de bien-être pour évacuer le stress et retrouver votre équilibre intérieur. Cette cure spécialement conçue pour lutter contre les effets du stress quotidien combine les bienfaits du magnésium marin et des techniques de relaxation profondes.",
        supplement:
          "En complément de votre Escale Marine, le parcours marin « eau de mer naturelle  » ainsi que le hammam vapeur sont accessibles avant les soins.",
        pricing: [
          { duration: "6 jours", price: "1018 TND / 308 €" },
        ],
        days: {
          1: [
            "Gommage reminéralisant aux huiles essentielles",
            "Duo boue marine bienfaisante",
            "Modelage signature à l'huile de Magnésium marin",
          ],
          2: [
            "Modelage sous affusion à l'huile de Magnésium",
            "Duo boue marine bienfaisante",
            "Modelage signature à l'huile de Magnésium marin",
          ],
          3: [
            "Bain énergisant au magnésium marin",
            "Duo enveloppement marin oligo-minéral",
            "Modelage douceur à l'huile de magnésium marin",
          ],
          4: [
            "Modelage sous affusion à l'huile de Magnésium",
            "Duo enveloppement revitalisant",
            "Modelage signature",
          ],
          5: [
            "Bain détente au magnésium marin",
            "Duo boue marine bienfaisante",
            "Modelage douceur",
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

  useEffect(() => {
    const packageId = location.state?.packageId;
    if (packageId) {
      console.log("Package ID:", packageId);
    }
  }, [location.state?.packageId]);

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
        {!videoError && masseurVideo && (
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              src={masseurVideo}
              alt="Stress relief therapy background"
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

        {(videoError || !isVideoLoaded || !masseurVideo) && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-indigo-50 to-slate-100"></div>
        )}

        {!isVideoLoaded && !videoError && masseurVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
              <p className="text-purple-600 font-light">
                Préparation de l'expérience anti-stress...
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
              radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
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
});

CureNoStress.displayName = "CureNoStress";

export default CureNoStress;
