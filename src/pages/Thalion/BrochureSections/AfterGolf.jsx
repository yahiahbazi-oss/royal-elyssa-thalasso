import React, { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import static images - replaced with Cloudinary URLs
const jour1 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759754796/A1_d52u1z.jpg";
const jour2 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759754796/A2_gg9nvz.jpg";
const jour3 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759754797/A3_pbeoej.jpg";
const jour4 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759754797/A4_ruabtz.jpg";
const jour5 = "https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_800/v1759754805/A5_d5zkgr.jpg";

// Import Video - replaced with Cloudinary URL, optimized for 480p
const golfVideo = "https://res.cloudinary.com/dxoje33mm/video/upload/q_auto,f_auto,w_854/v1759754939/golf_w6tg2n.webm";

// Memoized static data to prevent recreation on each render
const dayImages = {
  1: jour1,
  2: jour2,
  3: jour3,
  4: jour4,
  5: jour5,
};

const AfterGolf = () => {
  const { t } = useTranslation();
  
  // Memoized treatments data with translations
  const treatments = {
    [t('thalion.nosSoins.afterGolf.title')]: {
      description: t('thalion.nosSoins.afterGolf.description'),
      supplement: t('thalion.nosSoins.afterGolf.supplement'),
      pricing: [
        { 
          duration: `5 ${t('thalion.themeSection.days')}`, 
          price: t('thalion.nosSoins.afterGolf.pricing.fiveDays') 
        },
      ],
      days: {
        1: [
          t('thalion.nosSoins.afterGolf.day1.treatment1'),
          t('thalion.nosSoins.afterGolf.day1.treatment2'),
        ],
        2: [
          t('thalion.nosSoins.afterGolf.day2.treatment1'),
          t('thalion.nosSoins.afterGolf.day2.treatment2'),
        ],
        3: [
          t('thalion.nosSoins.afterGolf.day3.treatment1'),
          t('thalion.nosSoins.afterGolf.day3.treatment2'),
        ],
        4: [
          t('thalion.nosSoins.afterGolf.day4.treatment1'),
          t('thalion.nosSoins.afterGolf.day4.treatment2'),
        ],
        5: [
          t('thalion.nosSoins.afterGolf.day5.treatment1'),
          t('thalion.nosSoins.afterGolf.day5.treatment2'),
        ],
      },
    },
  };
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const location = useLocation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const hasInitialized = useRef(false);

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
    // Only run once on component mount
    if (!hasInitialized.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });

      const packageId = location.state?.packageId;
      if (packageId) {
        console.log("Package ID:", packageId);
      }

      hasInitialized.current = true;
    }

    // Cleanup function to handle video when component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Fallback image is shown until video is fully loaded or if error occurs */}
        {(!isVideoLoaded || videoError) && (
          <img
            src="https://res.cloudinary.com/dxoje33mm/image/upload/q_90,f_avif/v1760442375/6_qlypzm.jpg"
            alt="After golf fallback background"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ zIndex: 1 }}
          />
        )}
        {/* Video is only visible when loaded and no error */}
        <video
          ref={videoRef}
          src={golfVideo}
          alt="Golf therapy background"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
            isVideoLoaded && !videoError ? "opacity-50 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            zIndex: 2,
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
        {/* Overlays for gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      <div className="absolute inset-0 z-1 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(4, 120, 87, 0.1) 0%, transparent 50%)
            `,
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-30">
        <SoinsDesign
          treatments={treatments}
          dayImages={dayImages}
          colorTheme="green"
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
};

export default React.memo(AfterGolf);
