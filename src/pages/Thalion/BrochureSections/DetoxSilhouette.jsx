import React, { useEffect, useState, useCallback, useMemo } from "react";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import static images for DetoxSilhouette - replaced with Cloudinary URLs
const jour1 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759750211/SI1_vzwfzr.jpg";
const jour2 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759750212/SI2_hj1tki.jpg";
const jour3 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759750212/SI3_ebcyzc.jpg";
const jour4 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759750214/SI4_hnmoxb.jpg";
const jour5 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759750221/SI5_arzdiw.jpg";
const jour6 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759750222/SI6_yqz5jf.jpg";

// Import Video - replaced with Cloudinary URL, optimized for 480p
const aquaVideo = "https://res.cloudinary.com/dxoje33mm/video/upload/q_auto,f_auto,w_854/v1759751775/Aquacycling_compressed_gbugma.mp4";

const DetoxSilhouette = React.memo(() => {
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
      [t("thalion.nosSoins.detoxSilhouetteTitle")]: {
        description: t("thalion.nosSoins.detoxSilhouette.description"),
        supplement: t("thalion.nosSoins.detoxSilhouette.supplement"),
        pricing: [
          { duration: `4 ${t("thalion.themeSection.days")}`, price: "1380 TND / 419 €" },
          { duration: `6 ${t("thalion.themeSection.days")}`, price: "1920 TND / 582 €" },
          { duration: `9 ${t("thalion.themeSection.days")}`, price: "2720 TND / 825 €" },
        ],
        days: {
          1: [
            t("thalion.nosSoins.detoxSilhouette.day1.treatment1"),
            t("thalion.nosSoins.detoxSilhouette.day1.treatment2"),
            t("thalion.nosSoins.detoxSilhouette.day1.treatment3"),
            t("thalion.nosSoins.detoxSilhouette.day1.treatment4"),
          ],
          2: [
            t("thalion.nosSoins.detoxSilhouette.day2.treatment1"),
            t("thalion.nosSoins.detoxSilhouette.day2.treatment2"),
            t("thalion.nosSoins.detoxSilhouette.day2.treatment3"),
            t("thalion.nosSoins.detoxSilhouette.day2.treatment4"),
          ],
          3: [
            t("thalion.nosSoins.detoxSilhouette.day3.treatment1"),
            t("thalion.nosSoins.detoxSilhouette.day3.treatment2"),
            t("thalion.nosSoins.detoxSilhouette.day3.treatment3"),
            t("thalion.nosSoins.detoxSilhouette.day3.treatment4"),
          ],
          4: [
            t("thalion.nosSoins.detoxSilhouette.day4.treatment1"),
            t("thalion.nosSoins.detoxSilhouette.day4.treatment2"),
            t("thalion.nosSoins.detoxSilhouette.day4.treatment3"),
            t("thalion.nosSoins.detoxSilhouette.day4.treatment4"),
          ],
          5: [
            t("thalion.nosSoins.detoxSilhouette.day5.treatment1"),
            t("thalion.nosSoins.detoxSilhouette.day5.treatment2"),
            t("thalion.nosSoins.detoxSilhouette.day5.treatment3"),
            t("thalion.nosSoins.detoxSilhouette.day5.treatment4"),
          ],
          6: [
            t("thalion.nosSoins.detoxSilhouette.day6.treatment1"),
            t("thalion.nosSoins.detoxSilhouette.day6.treatment2"),
            t("thalion.nosSoins.detoxSilhouette.day6.treatment3"),
            t("thalion.nosSoins.detoxSilhouette.day6.treatment4"),
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
        {!videoError && (
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              src={aquaVideo}
              alt="Detox silhouette aqua therapy background"
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-slate-100"></div>
        )}

        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
              <p className="text-purple-600 font-light">
                {t("thalion.nosSoins.detoxLoading")}
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
              radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
            `,
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

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

DetoxSilhouette.displayName = "DetoxSilhouette";

export default DetoxSilhouette;
