import React, { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import static images - replaced with Cloudinary URLs
const jour1 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759755146/ce1_mikfnc.jpg";
const jour2 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759755140/ce2_z5osma.jpg";
const jour3 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759755140/ce3_y4xdgx.jpg";
const jour4 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759755140/ce4_kgk904.jpg";
// Import Video - replaced with Cloudinary URL
const ceremonieVideo = "https://res.cloudinary.com/dxoje33mm/video/upload/v1759755146/ce_tezowe.webm";

// Memoized static data to prevent recreation on each render
const dayImages = {
  1: jour1,
  2: jour2,
  3: jour3,
  4: jour4,
};

const CeremonieSpa = () => {
  const { t } = useTranslation();
  
  // Memoized treatments data with translations
  const treatments = {
    [t('thalion.nosSoins.ceremonieSpa.title')]: {
      description: t('thalion.nosSoins.ceremonieSpa.description'),
      supplement: t('thalion.nosSoins.ceremonieSpa.supplement'),
      pricing: [
        { 
          duration: `4 ${t('thalion.themeSection.days')}`, 
          price: t('thalion.nosSoins.ceremonieSpa.pricing.fourDays') 
        },
      ],
      days: {
        1: [
          t('thalion.nosSoins.ceremonieSpa.day1.treatment1'),
          t('thalion.nosSoins.ceremonieSpa.day1.treatment2'),
          t('thalion.nosSoins.ceremonieSpa.day1.treatment3'),
          t('thalion.nosSoins.ceremonieSpa.day1.treatment4'),
          t('thalion.nosSoins.ceremonieSpa.day1.treatment5'),
        ],
        2: [
          t('thalion.nosSoins.ceremonieSpa.day2.treatment1'),
          t('thalion.nosSoins.ceremonieSpa.day2.treatment2'),
          t('thalion.nosSoins.ceremonieSpa.day2.treatment3'),
          t('thalion.nosSoins.ceremonieSpa.day2.treatment4'),
        ],
        3: [
          t('thalion.nosSoins.ceremonieSpa.day3.treatment1'),
          t('thalion.nosSoins.ceremonieSpa.day3.treatment2'),
          t('thalion.nosSoins.ceremonieSpa.day3.treatment3'),
        ],
        4: [
          t('thalion.nosSoins.ceremonieSpa.day4.treatment1'),
          t('thalion.nosSoins.ceremonieSpa.day4.treatment2'),
          t('thalion.nosSoins.ceremonieSpa.day4.treatment3'),
          t('thalion.nosSoins.ceremonieSpa.day4.treatment4'),
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
        // Don't remove src to prevent reloading if component re-enters view
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        {!videoError && (
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              src={ceremonieVideo}
              alt="Cérémonies du Spa therapy background"
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"></div>
        )}

        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-400 rounded-full animate-spin"></div>
              <p className="text-blue-600 font-light">
                {t('thalion.nosSoins.ceremonieSpa.loading')}
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
              radial-gradient(circle at 20% 20%, rgba(191, 219, 254, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)
            `,
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-30">
        <SoinsDesign
          treatments={treatments}
          dayImages={dayImages}
          colorTheme="blue"
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

export default React.memo(CeremonieSpa);
