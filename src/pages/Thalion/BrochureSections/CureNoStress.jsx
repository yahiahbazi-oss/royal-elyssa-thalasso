import React, { useEffect, useState, useCallback, useMemo } from "react";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import static images - replaced with Cloudinary URLs
const jour1 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759754067/NS1_utb40l.jpg";
const jour2 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759754066/NS2_ofgnej.jpg";
const jour3 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759754066/NS3_mobrkd.jpg";
const jour4 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759754067/NS4_lkwivr.jpg";
const jour5 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759754067/NS5_aeftbg.jpg";

// Import Video - replaced with Cloudinary URL, optimized for 480p
const masseurVideo = "https://res.cloudinary.com/dxoje33mm/video/upload/q_auto,f_auto,w_854/v1759754164/curenonstress_eqkuqt.webm";

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
        {/* Fallback image is shown until video is fully loaded or if error occurs */}
        {(!isVideoLoaded || videoError || !masseurVideo) && (
          <img
            src="https://res.cloudinary.com/dxoje33mm/image/upload/q_90,f_avif/v1760442375/4_wckhm6.jpg"
            alt="Cure no stress fallback background"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ zIndex: 1 }}
          />
        )}
        {/* Video is only visible when loaded and no error */}
        {masseurVideo && (
          <video
            ref={videoRef}
            src={masseurVideo}
            alt="Stress relief therapy background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded && !videoError ? "opacity-50" : "opacity-0"
            }`}
            style={{
              zIndex: 2,
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
        )}
        {/* Overlays for gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
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

  <style>{`
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
