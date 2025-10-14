import React, { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import static images - replaced with Cloudinary URLs
const jour1 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759755552/wc1_uf26d2.jpg";
const jour2 =
  "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759755548/wc2_yivfmi.jpg";

// Import Video - replaced with Cloudinary URL, optimized for 480p
const weekendCoolVideo =
  "https://res.cloudinary.com/dxoje33mm/video/upload/q_auto,f_auto,w_854/v1759755668/wc_s1ovwb.webm";

// Memoized static data to prevent recreation on each render
const dayImages = {
  1: jour1,
  2: jour2,
};

const WeekendCool = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const weekendVideo =
    "https://res.cloudinary.com/dxoje33mm/video/upload/q_auto,f_auto,w_854/v1759755668/wc_s1ovwb.webm";

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    setVideoError(false);
  }, []);

  const treatments = {
    [t("thalion.nosSoins.weekendCool.title")]: {
      description: t("thalion.nosSoins.weekendCool.description"),
      supplement: t("thalion.nosSoins.weekendCool.supplement"),
      pricing: [
        {
          duration: t("thalion.themeSection.days", { count: 2 }),
          price: t("thalion.nosSoins.weekendCool.pricing.twoDays"),
        },
      ],
      days: {
        1: [
          t("thalion.nosSoins.weekendCool.day1.treatment1"),
          t("thalion.nosSoins.weekendCool.day1.treatment2"),
          t("thalion.nosSoins.weekendCool.day1.treatment3"),
          t("thalion.nosSoins.weekendCool.day1.treatment4"),
        ],
        2: [
          t("thalion.nosSoins.weekendCool.day2.treatment1"),
          t("thalion.nosSoins.weekendCool.day2.treatment2"),
          t("thalion.nosSoins.weekendCool.day2.treatment3"),
          t("thalion.nosSoins.weekendCool.day2.treatment4"),
        ],
      },
    },
  };

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          {/* Fallback image is shown until video is fully loaded or if error occurs */}
          {(!isVideoLoaded || videoError) && (
            <img
              src="https://res.cloudinary.com/dxoje33mm/image/upload/q_90,f_avif/v1760442382/10_yocqhl.jpg"
              alt="Weekend cool fallback background"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ zIndex: 1 }}
            />
          )}
          {/* Video is only visible when loaded and no error */}
          <video
            ref={videoRef}
            src={weekendVideo}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${isVideoLoaded && !videoError ? "opacity-50 scale-100" : "opacity-0 scale-105"}`}
            style={{
              zIndex: 2,
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              transform: "translate3d(0, 0, 0)"
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
            onContextMenu={e => e.preventDefault()}
          />
          {/* Overlays for gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
      </div>

      <div className="absolute inset-0 z-1 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(244, 114, 182, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(219, 39, 119, 0.1) 0%, transparent 50%)
            `,
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-30">
        <SoinsDesign
          treatments={treatments}
          dayImages={dayImages}
          colorTheme="pink"
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
// Removed duplicate/erroneous JSX blocks and ensured only one return statement
};

export default React.memo(WeekendCool);
