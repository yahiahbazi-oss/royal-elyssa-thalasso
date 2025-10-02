import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useMemo } from "react";

const BoxDesign = ({
  title,
  description,
  image,
  options = [],
  className = "",
  index = 0,
  onClickDetails,
  maxOptions = 4, // Add prop to control max options displayed
  // Translation props
  detailsAvailableText = "Détails disponibles sur demande",
  moreOptionsText = "autres soins disponibles",
  bookText = "RÉSERVER",
  detailsText = "DÉTAILS",
}) => {
  // Memoize displayed options to prevent unnecessary re-renders
  const displayOptions = useMemo(() => {
    if (!Array.isArray(options)) return [];
    return options.slice(0, maxOptions);
  }, [options, maxOptions]);

  const handleDetailsClick = (e) => {
    if (onClickDetails) {
      onClickDetails();
    }
  };

  const handleCardClick = () => {
    if (onClickDetails) {
      onClickDetails();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={handleCardClick}
      className={`group bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden h-full min-h-[520px] max-h-[620px] flex flex-col font-sans cursor-pointer ${className}`}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

        {/* Elegant overlay for ESCALES MARINES */}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Title and Description */}
        <div className="mb-4 flex-shrink-0">
          <h3 className="text-lg sm:text-xl font-serif font-medium text-slate-800 mb-2 leading-tight">
            {title}
          </h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-slate-800 to-slate-400 mb-3" />
          <p className="text-slate-600 text-sm leading-relaxed font-light tracking-wide line-clamp-3">
            {description}
          </p>
        </div>

        {/* Options - Fixed container */}
        <div className="flex-grow flex flex-col min-h-0">
          <div className="h-32 overflow-hidden">
            <div className="space-y-2 h-full">
              {displayOptions.length > 0 ? (
                displayOptions.map((option, optIndex) => (
                  <motion.div
                    key={`${title}-${optIndex}`} // Better key to prevent re-renders
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: optIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center px-3 py-2 bg-slate-50 hover:bg-slate-100/80 transition-colors duration-200 rounded border-l-2 border-slate-200 hover:border-slate-400 text-center"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-3 h-3 text-slate-500 flex-shrink-0" />
                      <span className="text-slate-700 text-xs font-medium tracking-wide">
                        {option.duration || option.name || "Soin disponible"}
                      </span>
                    </div>
                    <div className="text-slate-800 text-xs font-semibold">
                      {option.price ? `${option.price}` : "Sur devis"}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  {detailsAvailableText}
                </div>
              )}
            </div>
          </div>

          {/* Show more indicator if there are more options */}
          {options.length > maxOptions && (
            <div className="mt-2 text-center">
              <span className="text-slate-500 text-xs">
                +{options.length - maxOptions} {moreOptionsText}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex-shrink-0">
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-xs font-medium tracking-wider transition-all duration-200 rounded hover:from-slate-700 hover:to-slate-600 shadow-sm"
              >
                {bookText}
              </motion.button>

              <motion.button
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-white text-slate-800 text-xs font-medium tracking-wider border border-slate-300 transition-all duration-200 rounded hover:bg-slate-50 hover:border-slate-400 shadow-sm"
                onClick={handleDetailsClick}
              >
                {detailsText}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BoxDesign;
