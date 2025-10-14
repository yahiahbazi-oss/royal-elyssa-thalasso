import React, { useEffect, useState, useCallback, useMemo } from "react";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import static images for Vitalité Marine - replaced with Cloudinary URLs
const jour1 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749905/3_rqwrmq.jpg";
const jour2 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749905/13304a729648d950fe3fdd55e651d332-d23_b6ylcw.jpg";
const jour3 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749906/Relaxant-detox-energisant-quel-bain-pour-quel-soin_eqyuye.jpg";
const jour4 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749906/news_image_55669_1_ii7px1.jpg";
const jour5 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749906/oneworld-spa-treatment-cream-bath-1_sbyvxw.jpg";
const jour6 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759749906/Linstant-Spa-Photo-4_bgcldn.jpg";

// Import Video - replaced with Cloudinary URL, optimized for 360p
const masseurVideo = "https://res.cloudinary.com/dxoje33mm/video/upload/q_auto,f_auto,w_640/v1759750090/Masseur_aitjwi.webm";

const NosSoins = React.memo(() => {
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
      6: jour6,
    }),
    []
  );

  const treatments = useMemo(
    () => ({
      [t("thalion.nosSoins.vitalityMarineTitle")]: {
        description: t("thalion.nosSoins.vitaliteMarine.description"),
        supplement: t("thalion.nosSoins.vitaliteMarine.supplement"),
        pricing: [
          { duration: `4 ${t("thalion.themeSection.days")}`, price: "1200 TND / 364 €" },
          { duration: `6 ${t("thalion.themeSection.days")}`, price: "1670 TND / 507 €" },
          { duration: `9 ${t("thalion.themeSection.days")}`, price: "2350 TND / 713 €" },
        ],
        days: {
          1: [
            t("thalion.nosSoins.vitaliteMarine.day1.treatment1"),
            t("thalion.nosSoins.vitaliteMarine.day1.treatment2"),
            t("thalion.nosSoins.vitaliteMarine.day1.treatment3"),
            t("thalion.nosSoins.vitaliteMarine.day1.treatment4"),
          ],
          2: [
            t("thalion.nosSoins.vitaliteMarine.day2.treatment1"),
            t("thalion.nosSoins.vitaliteMarine.day2.treatment2"),
            t("thalion.nosSoins.vitaliteMarine.day2.treatment3"),
            t("thalion.nosSoins.vitaliteMarine.day2.treatment4"),
          ],
          3: [
            t("thalion.nosSoins.vitaliteMarine.day3.treatment1"),
            t("thalion.nosSoins.vitaliteMarine.day3.treatment2"),
            t("thalion.nosSoins.vitaliteMarine.day3.treatment3"),
            t("thalion.nosSoins.vitaliteMarine.day3.treatment4"),
          ],
          4: [
            t("thalion.nosSoins.vitaliteMarine.day4.treatment1"),
            t("thalion.nosSoins.vitaliteMarine.day4.treatment2"),
            t("thalion.nosSoins.vitaliteMarine.day4.treatment3"),
            t("thalion.nosSoins.vitaliteMarine.day4.treatment4"),
          ],
          5: [
            t("thalion.nosSoins.vitaliteMarine.day5.treatment1"),
            t("thalion.nosSoins.vitaliteMarine.day5.treatment2"),
            t("thalion.nosSoins.vitaliteMarine.day5.treatment3"),
            t("thalion.nosSoins.vitaliteMarine.day5.treatment4"),
          ],
          6: [
            t("thalion.nosSoins.vitaliteMarine.day6.treatment1"),
            t("thalion.nosSoins.vitaliteMarine.day6.treatment2"),
            t("thalion.nosSoins.vitaliteMarine.day6.treatment3"),
            t("thalion.nosSoins.vitaliteMarine.day6.treatment4"),
          ],
        },
      },
    }),
    [t]
  );

  const handleVideoLoad = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
        setVideoError(true);
      });
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
      {/* Background Video Section */}
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
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-slate-100"></div>
        )}

        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-emerald-600 font-light">
                {t("thalion.nosSoins.loading")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Background Effects */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(52, 211, 153, 0.1) 0%, transparent 50%)
            `,
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-30">
        <SoinsDesign treatments={treatments} dayImages={dayImages} />
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

NosSoins.displayName = "NosSoins";

export default NosSoins;
