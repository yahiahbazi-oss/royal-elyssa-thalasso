import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const WhyChoose = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setTitleVisible(true), 300);
          setTimeout(() => setTextVisible(true), 800);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-800 to-amber-900 py-20 px-6 flex items-center justify-center relative overflow-hidden"
    >
      {/* Luxury background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-stone-300/10 to-slate-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-300/15 to-yellow-400/15 rounded-full blur-2xl animate-pulse delay-500"></div>

        {/* Luxury pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #F59E0B 1px, transparent 1px), 
                             radial-gradient(circle at 75% 75%, #FCD34D 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Animated Title - Starts immediately now without logo delay */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out ${
            titleVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-6"
          }`}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-amber-100 mb-6 tracking-wide text-center">
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-2xl">
              {t("whyChoose.title.name")}
            </span>
            <br />
            <span className="text-stone-200 text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.3em] drop-shadow-lg">
              {t("whyChoose.title.subtitle")}
            </span>
          </h2>

          {/* Luxury decorative elements */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-24"></div>
            <div className="mx-6 flex space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-lg"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-lg mt-0.5"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-lg"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-24"></div>
          </div>
        </div>

        {/* Animated Description Text */}
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${
            textVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-6"
          }`}
        >
          <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-12 md:p-16 shadow-2xl border border-amber-300/20 relative overflow-hidden">
            {/* Luxury inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-yellow-300/5 rounded-3xl"></div>

            <div className="relative z-10">
              <p className="text-amber-100 text-xl md:text-2xl leading-relaxed font-light max-w-4xl mx-auto text-center mb-8">
                {t("whyChoose.description.intro")
                  .split("Royal Elyssa Thalasso & Spa")
                  .map((part, index) =>
                    index === 0 ? (
                      <span key={index}>
                        {part}
                        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                          Royal Elyssa Thalasso & Spa
                        </span>
                      </span>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  )}
              </p>

              {/* Elegant separator */}
              <div className="flex items-center justify-center my-12">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent w-full max-w-md"></div>
              </div>

              <div className="bg-gradient-to-r from-amber-900/20 via-stone-800/20 to-amber-900/20 rounded-2xl p-8 md:p-10 border border-amber-300/10">
                <p className="text-stone-200 text-lg md:text-xl leading-relaxed font-light italic text-center">
                  {t("whyChoose.description.detail")
                    .split("Carré VIP Suites Spa")
                    .map((part, index) =>
                      index === 0 ? (
                        <span key={index}>
                          {part}
                          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                            Carré VIP Suites Spa
                          </span>
                        </span>
                      ) : (
                        <span key={index}>{part}</span>
                      )
                    )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Luxury Call-to-Action */}
        <div
          className={`mt-16 transition-all duration-1000 ease-out delay-500 ${
            textVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4"
          }`}
        ></div>
      </div>

      {/* Subtle floating animation for the entire section */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyChoose;
