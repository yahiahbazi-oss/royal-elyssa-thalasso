import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  ArrowRight,
  Sparkles,
  Waves,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const SoinsDesign = ({ treatments, dayImages, colorTheme = "pink" }) => {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedDays, setExpandedDays] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Color theme configuration

  const getColorClasses = (theme) => {
    const themes = {
      pink: {
        gradient: "from-rose-400 to-pink-500",
        gradientHover: "from-rose-500 to-pink-600",
        gradientOverlay: "from-rose-500/60 to-transparent",
        gradientCard: "from-rose-500/60 via-pink-500/40 to-purple-500/60",
        border: "border-rose-400",
        bg: "bg-rose-100",
        text: "text-rose-600",
        bgAccent: "bg-rose-500/90",
        shadow: "0 0 30px rgba(244, 63, 94, 0.6)",
        dot: "bg-rose-400",
        sparkle: "bg-rose-300/80",
      },
      gold: {
        gradient: "from-amber-400 to-yellow-500",
        gradientHover: "from-amber-500 to-yellow-600",
        gradientOverlay: "from-amber-500/60 to-transparent",
        gradientCard: "from-amber-500/60 via-yellow-500/40 to-orange-500/60",
        border: "border-amber-400",
        bg: "bg-amber-100",
        text: "text-amber-600",
        bgAccent: "bg-amber-500/90",
        shadow: "0 0 30px rgba(245, 158, 11, 0.6)",
        dot: "bg-amber-400",
        sparkle: "bg-amber-300/80",
      },
      beige: {
        gradient: "from-stone-400 to-stone-600",
        gradientHover: "from-stone-500 to-stone-700",
        gradientOverlay: "from-stone-500/60 to-transparent",
        gradientCard: "from-stone-400/60 via-stone-500/40 to-stone-600/60",
        border: "border-stone-400",
        bg: "bg-stone-100",
        text: "text-stone-600",
        bgAccent: "bg-stone-500/90",
        shadow: "0 0 30px rgba(168, 162, 158, 0.6)",
        dot: "bg-stone-500",
        sparkle: "bg-stone-400/80",
      },
      green: {
        gradient: "from-emerald-500 to-green-600",
        gradientHover: "from-emerald-600 to-green-700",
        gradientOverlay: "from-emerald-600/60 to-transparent",
        gradientCard: "from-emerald-500/60 via-green-500/40 to-teal-500/60",
        border: "border-emerald-500",
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        bgAccent: "bg-emerald-600/90",
        shadow: "0 0 30px rgba(16, 185, 129, 0.6)",
        dot: "bg-emerald-500",
        sparkle: "bg-emerald-400/80",
      },
      blue: {
        gradient: "from-blue-400 to-blue-600",
        gradientHover: "from-blue-500 to-blue-700",
        gradientOverlay: "from-blue-500/60 to-transparent",
        gradientCard: "from-blue-500/60 via-blue-600/40 to-indigo-500/60",
        border: "border-blue-400",
        bg: "bg-blue-100",
        text: "text-blue-600",
        bgAccent: "bg-blue-500/90",
        shadow: "0 0 30px rgba(59, 130, 246, 0.6)",
        dot: "bg-blue-400",
        sparkle: "bg-blue-300/80",
      },
      purple: {
        gradient: "from-purple-400 to-purple-600",
        gradientHover: "from-purple-500 to-purple-700",
        gradientOverlay: "from-purple-500/60 to-transparent",
        gradientCard: "from-purple-500/60 via-purple-600/40 to-indigo-500/60",
        border: "border-purple-400",
        bg: "bg-purple-100",
        text: "text-purple-600",
        bgAccent: "bg-purple-500/90",
        shadow: "0 0 30px rgba(147, 51, 234, 0.6)",
        dot: "bg-purple-400",
        sparkle: "bg-purple-300/80",
      },
      brown: {
        gradient: "from-amber-600 to-amber-800",
        gradientHover: "from-amber-700 to-amber-900",
        gradientOverlay: "from-amber-700/60 to-transparent",
        gradientCard: "from-amber-600/60 via-amber-700/40 to-amber-800/60",
        border: "border-amber-600",
        bg: "bg-amber-100",
        text: "text-amber-700",
        bgAccent: "bg-amber-700/90",
        shadow: "0 0 30px rgba(146, 64, 14, 0.6)",
        dot: "bg-amber-600",
        sparkle: "bg-amber-500/80",
      },
      turquoise: {
        gradient: "from-cyan-400 to-teal-500",
        gradientHover: "from-cyan-500 to-teal-600",
        gradientOverlay: "from-cyan-500/60 to-transparent",
        gradientCard: "from-cyan-500/60 via-teal-500/40 to-blue-500/60",
        border: "border-cyan-400",
        bg: "bg-cyan-100",
        text: "text-cyan-600",
        bgAccent: "bg-cyan-500/90",
        shadow: "0 0 30px rgba(34, 211, 238, 0.6)",
        dot: "bg-cyan-400",
        sparkle: "bg-cyan-300/80",
      },
    };
    return themes[theme] || themes.pink;
  };

  const colors = getColorClasses(colorTheme);

  const treatmentData = Object.entries(treatments)[0];
  const [treatmentTitle, treatment] = treatmentData || ["", {}];
  const dayCount = Object.keys(treatment.days || {}).length;

  const toggleDayExpansion = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const DayPopup = ({ day, activities, image, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl"
          style={{ perspective: "1000px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
            <div className="relative lg:w-1/2 h-64 lg:h-auto">
              <img
                src={image}
                alt={`Jour ${day} treatments`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-rose-900/40 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-4 left-4 lg:top-6 lg:left-6 lg:bottom-auto">
                <div
                  className={`bg-gradient-to-r ${colors.gradient} px-4 py-2 rounded-full shadow-lg`}
                >
                  <h3 className="text-white text-xl lg:text-2xl font-serif font-light">
                    {t("thalion.nosSoins.day")} {day}
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
              <div className="mb-6">
                <h4 className="text-2xl lg:text-3xl font-serif text-stone-800 mb-2">
                  {t("thalion.nosSoins.dayProgram")}
                </h4>
                <div className="flex items-center text-stone-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {t("thalion.nosSoins.approximateDuration")}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {activities?.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start p-4 bg-gradient-to-r from-rose-50 to-pink-50/50 rounded-xl border-l-4 ${colors.border} hover:shadow-sm transition-shadow`}
                  >
                    <div
                      className={`${colors.bg} p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5`}
                    >
                      <Sparkles className={`${colors.text} h-3.5 w-3.5`} />
                    </div>
                    <span className="text-stone-700 leading-relaxed text-sm lg:text-base">
                      {activity}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100">
                <button
                  onClick={onClose}
                  className={`w-full bg-gradient-to-r ${colors.gradient} text-white py-3 px-6 rounded-full hover:${colors.gradientHover} transition-all duration-200 flex items-center justify-center gap-2 font-medium`}
                >
                  {t("thalion.nosSoins.close")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen relative overflow-hidden" id="vitalite-marine" data-section="vitalite-marine">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('../pages/Thalion/BrochureSections/assets/Linstant-Spa-Photo-4.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div
        className="relative z-10 text-center pt-8 pb-4 px-4"
      >
        <h2 className="text-3xl lg:text-5xl font-serif font-light text-white mb-6 drop-shadow-lg">
          {treatmentTitle}
        </h2>
        <div
          className={`w-24 h-1 bg-gradient-to-r ${colors.gradient} mx-auto mb-6`}
        ></div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto shadow-lg border border-white/10">
          <p className="text-white text-base lg:text-lg leading-relaxed font-light drop-shadow-lg">
            {treatment.description}
          </p>
        </div>
      </div>

      {/* Desktop supplement text - between description and circles */}
      {treatment.supplement && (
        <div
          className="relative z-10 px-4 pb-2 hidden md:block"
        >
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-white/95 mb-2">
              <Waves className="h-4 w-4 text-teal-300" />
              <span className="text-sm font-medium tracking-wide uppercase drop-shadow-lg">
                {t("thalion.nosSoins.supplement")}
              </span>
              <Waves className="h-4 w-4 text-teal-300" />
            </div>
            <p className="text-white text-sm font-light leading-relaxed drop-shadow-lg">
              {treatment.supplement}
            </p>
          </div>
        </div>
      )}

      <div ref={containerRef} className="relative z-10 px-4 py-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout - Expanded Cards */}
          <div className="block md:hidden">
            <div className="space-y-6">
              {Object.entries(treatment.days || {}).map(
                ([day, activities], index) => (
                  <MobileDayCard
                    key={day}
                    day={day}
                    activities={activities}
                    image={dayImages[day]}
                    index={index}
                    expanded={expandedDays[day]}
                    onToggleExpand={() => toggleDayExpansion(day)}
                    colors={colors}
                    t={t}
                  />
                )
              )}
            </div>
          </div>

          {/* Desktop Layout - Circles */}
          <div className="hidden md:flex justify-center items-center space-x-8 lg:space-x-12">
            {Object.entries(treatment.days || {}).map(
              ([day, activities], index) => (
                <CircleItem
                  key={day}
                  day={day}
                  activities={activities}
                  image={dayImages[day]}
                  index={index}
                  onHover={() => setHoveredDay(day)}
                  onLeave={() => setHoveredDay(null)}
                  onClick={() =>
                    setSelectedDay({ day, activities, image: dayImages[day] })
                  }
                  isHovered={hoveredDay === day}
                  isMobile={false}
                  colors={colors}
                  t={t}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Mobile supplement text at bottom - same as before */}
      {treatment.supplement && (
        <div
          className="relative z-10 px-4 pb-8 block md:hidden"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 text-white/95 mb-3">
              <Waves className="h-5 w-5 text-teal-300" />
              <span className="text-base font-semibold tracking-wide uppercase drop-shadow-lg">
                {t("thalion.nosSoins.supplement")}
              </span>
              <Waves className="h-5 w-5 text-teal-300" />
            </div>
            <p className="text-white text-sm lg:text-base font-light leading-relaxed drop-shadow-lg px-4">
              {treatment.supplement}
            </p>
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {treatment.pricing && (
        <div
          className="relative z-0 px-4 pb-8 flex justify-center"
        >
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-white/95 mb-6">
              <Clock className="h-5 w-5 text-amber-300" />
              <span className="text-lg font-medium tracking-wide uppercase drop-shadow-lg">
                {t("thalion.nosSoins.pricing")}
              </span>
              <Clock className="h-5 w-5 text-amber-300" />
            </div>
            <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
              {treatment.pricing.map((option, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/30 hover:bg-white/25 transition-all duration-300 hover:scale-105 w-52 flex-shrink-0"
                >
                  <div className="text-white text-center flex flex-col items-center justify-center h-full min-h-[90px]">
                    <div className="text-lg font-medium mb-3 text-amber-200 text-center">
                      {option.duration}
                    </div>
                    <div className="text-lg font-semibold text-center leading-relaxed text-white drop-shadow-lg">
                      {option.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/80 text-sm mt-6 font-light italic">
              {t("thalion.nosSoins.pricingDisclaimer")}
            </p>
          </div>
        </div>
      )}

      {/* Desktop Popup */}
      {selectedDay && (
        <DayPopup
          day={selectedDay.day}
          activities={selectedDay.activities}
          image={selectedDay.image}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
};

// New Mobile Day Card Component
const MobileDayCard = ({
  day,
  activities,
  image,
  index,
  expanded,
  onToggleExpand,
  colors,
  t,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/30"
    >
      {/* Card Header */}
      <div className="relative">
        <div className="h-32 relative overflow-hidden">
          <img
            src={image}
            alt={`Jour ${day}`}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${colors.gradientCard}`}
          ></div>
        </div>

        {/* Day Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-stone-800 font-serif font-medium text-lg">
              {t("thalion.nosSoins.day")} {day}
            </span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggleExpand}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
        >
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5 text-stone-700" />
          </motion.div>
        </button>

        {/* Treatment Count */}
        <div
          className={`absolute bottom-4 left-4 ${colors.bgAccent} backdrop-blur-sm px-3 py-1 rounded-full`}
        >
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-white" />
            <span className="text-white text-xs font-medium">
              {activities?.length || 0} {t("thalion.nosSoins.treatments")} • 3h30
            </span>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6">
              <h4 className="text-xl font-serif text-stone-800 mb-4 text-center">
                {t("thalion.nosSoins.dayProgram")}
              </h4>

              <div className="space-y-3">
                {activities?.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start p-4 bg-gradient-to-r from-rose-50 to-pink-50/70 rounded-xl border-l-4 ${colors.border}`}
                  >
                    <div
                      className={`${colors.bg} p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5`}
                    >
                      <Sparkles className={`${colors.text} h-3.5 w-3.5`} />
                    </div>
                    <span className="text-stone-700 leading-relaxed text-sm font-light">
                      {activity}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 pt-4 border-t border-stone-200"
              >
                <div className="flex items-center justify-center gap-2 text-stone-500">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm italic">
                    {t("thalion.nosSoins.completeWellnessExperience")}
                  </span>
                  <Sparkles className="h-4 w-4" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview when collapsed */}
      {!expanded && (
        <div className="p-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <span className="text-stone-600 text-sm font-light">
              {t("thalion.nosSoins.discoverDetailedProgram")}
            </span>
            <div className="flex -space-x-1">
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className={`w-2 h-2 ${colors.dot} rounded-full animate-pulse`}
                  style={{ animationDelay: `${dot * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Keep the original CircleItem for desktop
// Replace your CircleItem component with this optimized version
// Memoized CircleItem component
const CircleItem = React.memo(
  ({
    day,
    activities,
    image,
    index,
    onHover,
    onLeave,
    onClick,
    isHovered,
    isMobile,
    colors,
    t,
  }) => {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={
          !isMobile
            ? {
                scale: 1.15,
                y: -10,
                transition: { duration: 0.3 },
              }
            : {}
        }
        className="cursor-pointer flex flex-col items-center relative"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        <div
          className="text-white font-medium mb-3 text-sm lg:text-base drop-shadow-lg text-center"
        >
          {t("thalion.nosSoins.day")} {day}
        </div>

        <div className="relative">
          {/* OPTIMIZED SECTION - Removed double animations */}
          <div
            className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-white/90 shadow-lg bg-white transition-transform duration-200 ease-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              willChange: "transform",
            }}
          >
            <img
              src={image}
              alt={`Jour ${day}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${colors.gradientOverlay}`}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg lg:text-xl drop-shadow-lg">
              {day}
            </div>
          </div>

          {/* Only show hover tooltip on desktop */}
          <AnimatePresence>
            {isHovered && !isMobile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-[50] w-64"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-3 border border-white/50">
                  <h4 className="text-xs font-semibold text-stone-800 mb-1">
                    {t("thalion.nosSoins.day")} {day}
                  </h4>
                  <div className="flex items-center text-stone-500 text-xs mb-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{activities?.length || 0} {t("thalion.nosSoins.treatments")} - 3h30</span>
                  </div>
                  <div className="space-y-0.5">
                    {activities?.slice(0, 3).map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-start text-xs text-stone-600"
                      >
                        <div
                          className={`w-1 h-1 ${colors.dot} rounded-full mr-1.5 mt-1 flex-shrink-0`}
                        ></div>
                        <span className="leading-tight text-xs">
                          {activity}
                        </span>
                      </div>
                    ))}
                    {activities?.length > 3 && (
                      <div className="text-xs text-stone-400 italic mt-1">
                        +{activities.length - 3} {t("thalion.nosSoins.otherTreatments")}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-stone-400 mt-1">
                    {t("thalion.nosSoins.clickForDetails")}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    // Enhanced memo comparison for better performance
    return (
      prevProps.day === nextProps.day &&
      prevProps.image === nextProps.image &&
      prevProps.isHovered === nextProps.isHovered &&
      prevProps.isMobile === nextProps.isMobile &&
      prevProps.index === nextProps.index &&
      prevProps.colors === nextProps.colors &&
      prevProps.activities?.length === nextProps.activities?.length &&
      prevProps.t === nextProps.t
    );
  }
);
export default SoinsDesign;
