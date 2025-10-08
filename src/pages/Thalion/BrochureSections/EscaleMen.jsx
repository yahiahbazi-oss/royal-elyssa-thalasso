import React, { useEffect, useState, useCallback, useMemo } from "react";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import static images - replaced with Cloudinary URLs
const jour1 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759754298/MM1_jv1dg5.jpg";
const jour2 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759754299/MM2_ddkczk.jpg";
const jour3 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759754299/MM3_mkjzfd.jpg";
const jour4 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759754299/MM4_ror2rf.jpg";
const jour5 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759754299/MM5_z6cj7v.jpg";
const jour6 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759754300/MM6_nenx5n.jpg";

// Import Video - replaced with Cloudinary URL
const masseurVideo = "https://res.cloudinary.com/dxoje33mm/video/upload/v1759754416/mv_lcwx2e.webm";

const EscaleMen = React.memo(() => {
  const { t } = useTranslation();
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
      [t("thalion.nosSoins.escaleMen.title")]: {
        description: t("thalion.nosSoins.escaleMen.description"),
        supplement: t("thalion.nosSoins.escaleMen.supplement"),
        pricing: [
          { duration: `4 ${t("thalion.themeSection.days")}`, price: "850 TND / 258 €" },
          { duration: `6 ${t("thalion.themeSection.days")}`, price: "1330 TND / 404 €" },
        ],
        days: {
          1: [
            t("thalion.nosSoins.escaleMen.day1.treatment1"),
            t("thalion.nosSoins.escaleMen.day1.treatment2"),
            t("thalion.nosSoins.escaleMen.day1.treatment3"),
          ],
          2: [
            t("thalion.nosSoins.escaleMen.day2.treatment1"),
            t("thalion.nosSoins.escaleMen.day2.treatment2"),
            t("thalion.nosSoins.escaleMen.day2.treatment3"),
          ],
          3: [
            t("thalion.nosSoins.escaleMen.day3.treatment1"),
            t("thalion.nosSoins.escaleMen.day3.treatment2"),
            t("thalion.nosSoins.escaleMen.day3.treatment3"),
          ],
          4: [
            t("thalion.nosSoins.escaleMen.day4.treatment1"),
            t("thalion.nosSoins.escaleMen.day4.treatment2"),
            t("thalion.nosSoins.escaleMen.day4.treatment3"),
          ],
          5: [
            t("thalion.nosSoins.escaleMen.day5.treatment1"),
            t("thalion.nosSoins.escaleMen.day5.treatment2"),
            t("thalion.nosSoins.escaleMen.day5.treatment3"),
          ],
          6: [
            t("thalion.nosSoins.escaleMen.day6.treatment1"),
            t("thalion.nosSoins.escaleMen.day6.treatment2"),
            t("thalion.nosSoins.escaleMen.day6.treatment3"),
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
                {t("thalion.nosSoins.escaleMen.loading")}
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

EscaleMen.displayName = "EscaleMen";

export default EscaleMen;
