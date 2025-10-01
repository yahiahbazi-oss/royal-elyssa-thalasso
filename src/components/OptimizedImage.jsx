import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const OptimizedImage = ({ src, alt, className, onLoad, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Use Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "50px" }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Blurred placeholder */}
      {!isLoaded && !error && (
        <div
          className="absolute inset-0 blur-lg filter scale-105"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Crect width='20' height='20' fill='%23f3f4f6'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
          }}
        />
      )}

      {/* Actual image - only load when in view */}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          initial={false}
          onLoad={handleLoad}
          onError={() => setError(true)}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
