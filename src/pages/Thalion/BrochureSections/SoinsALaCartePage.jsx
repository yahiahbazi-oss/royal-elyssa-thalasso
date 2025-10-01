import React, { useEffect, useState, useCallback } from "react";
import SoinsALaCarte from "../../../components/SoinsALaCarte";
import { useLocation } from "react-router-dom";

// Import Video
import soinsVideo from "./assets/Masseur.webm";

const SoinsALaCartePage = React.memo(() => {
  const location = useLocation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = React.useRef(null);

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
    <div className="relative min-h-screen">
      {/* Background Video Section */}
      <div className="absolute inset-0 z-0">
        {!videoError && (
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              src={soinsVideo}
              alt="Spa treatments background"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? "opacity-20" : "opacity-0"
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
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"></div>
          </div>
        )}

        {(videoError || !isVideoLoaded) && (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50"></div>
        )}

        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
              <p className="text-amber-600 font-light">
                Préparation de votre expérience soins...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Background Effects */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)
            `,
            animation: "float 25s ease-in-out infinite",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-30">
        <SoinsALaCarte />
      </div>
    </div>
  );
});

export default SoinsALaCartePage;
