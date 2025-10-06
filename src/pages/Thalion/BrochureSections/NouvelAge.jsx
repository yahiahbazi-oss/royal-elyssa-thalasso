import React, { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import SoinsDesign from "../../../components/SoinsDesign";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import static images - replaced with Cloudinary URLs
const jour1 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759755356/na1_s1q2ln.jpg";
const jour2 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759755353/na2_oc54mt.jpg";
const jour3 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759755345/na3_gwn93p.jpg";
const jour4 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759755344/na4_bceumi.jpg";
const jour5 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759755343/na5_kzhqrg.jpg";
const jour6 = "https://res.cloudinary.com/dxoje33mm/image/upload/v1759755344/na6_mqyvy2.jpg";

// Import Video - replaced with Cloudinary URL
const nouvelAgeVideo = "https://res.cloudinary.com/dxoje33mm/video/upload/v1759755450/na_jdragh.webm";

const NouvelAge = () => {
  const { t } = useTranslation();
  
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

  // Memoized treatments data with translations
  const treatments = {
    [t('thalion.nosSoins.nouvelAge.title')]: {
      description: t('thalion.nosSoins.nouvelAge.description'),
      supplement: t('thalion.nosSoins.nouvelAge.supplement'),
      pricing: [
        { 
          duration: `4 ${t('thalion.themeSection.days')}`, 
          price: t('thalion.nosSoins.nouvelAge.pricing.fourDays') 
        },
        { 
          duration: `6 ${t('thalion.themeSection.days')}`, 
          price: t('thalion.nosSoins.nouvelAge.pricing.sixDays') 
        },
      ],
      days: {
        1: [
          t('thalion.nosSoins.nouvelAge.day1.treatment1'),
          t('thalion.nosSoins.nouvelAge.day1.treatment2'),
          t('thalion.nosSoins.nouvelAge.day1.treatment3'),
        ],
        2: [
          t('thalion.nosSoins.nouvelAge.day2.treatment1'),
          t('thalion.nosSoins.nouvelAge.day2.treatment2'),
          t('thalion.nosSoins.nouvelAge.day2.treatment3'),
        ],
        3: [
          t('thalion.nosSoins.nouvelAge.day3.treatment1'),
          t('thalion.nosSoins.nouvelAge.day3.treatment2'),
          t('thalion.nosSoins.nouvelAge.day3.treatment3'),
        ],
        4: [
          t('thalion.nosSoins.nouvelAge.day4.treatment1'),
          t('thalion.nosSoins.nouvelAge.day4.treatment2'),
          t('thalion.nosSoins.nouvelAge.day4.treatment3'),
        ],
        5: [
          t('thalion.nosSoins.nouvelAge.day5.treatment1'),
          t('thalion.nosSoins.nouvelAge.day5.treatment2'),
          t('thalion.nosSoins.nouvelAge.day5.treatment3'),
        ],
        6: [
          t('thalion.nosSoins.nouvelAge.day6.treatment1'),
          t('thalion.nosSoins.nouvelAge.day6.treatment2'),
          t('thalion.nosSoins.nouvelAge.day6.treatment3'),
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
                {t('thalion.nosSoins.nouvelAge.loading')}
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
