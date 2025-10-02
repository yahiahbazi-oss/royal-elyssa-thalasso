import React, { useEffect, useState, useCallback, useMemo } from "react";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import static images
import jour1 from "./assets/NS1.JPG";
import jour2 from "./assets/NS2.JPG";
import jour3 from "./assets/NS3.JPG";
import jour4 from "./assets/NS4.JPG";
import jour5 from "./assets/NS5.JPG";

// Import Video
import masseurVideo from "./assets/curenonstress.webm";

const CureNoStress = React.memo(() => {
  const { t } = useTranslation();
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
      [t("thalion.nosSoins.cureNoStress.title")]: {
        description: t("thalion.nosSoins.cureNoStress.description"),
        supplement: t("thalion.nosSoins.cureNoStress.supplement"),
        pricing: [{ duration: `6 ${t("thalion.themeSection.days")}`, price: "1018 TND / 308 €" }],
        days: {
          1: [
            t("thalion.nosSoins.cureNoStress.day1.treatment1"),
            t("thalion.nosSoins.cureNoStress.day1.treatment2"),
            t("thalion.nosSoins.cureNoStress.day1.treatment3"),
          ],
          2: [
            t("thalion.nosSoins.cureNoStress.day2.treatment1"),
            t("thalion.nosSoins.cureNoStress.day2.treatment2"),
            t("thalion.nosSoins.cureNoStress.day2.treatment3"),
          ],
          3: [
            t("thalion.nosSoins.cureNoStress.day3.treatment1"),
            t("thalion.nosSoins.cureNoStress.day3.treatment2"),
            t("thalion.nosSoins.cureNoStress.day3.treatment3"),
          ],
          4: [
            t("thalion.nosSoins.cureNoStress.day4.treatment1"),
            t("thalion.nosSoins.cureNoStress.day4.treatment2"),
            t("thalion.nosSoins.cureNoStress.day4.treatment3"),
          ],
          5: [
            t("thalion.nosSoins.cureNoStress.day5.treatment1"),
            t("thalion.nosSoins.cureNoStress.day5.treatment2"),
            t("thalion.nosSoins.cureNoStress.day5.treatment3"),
          ],
        },
      },
    }),
    [t]
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
                {t("thalion.nosSoins.cureNoStress.loading")}
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
