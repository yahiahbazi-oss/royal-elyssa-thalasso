import { Clock } from "lucide-react";
import { useMemo, memo } from "react";

const BoxDesign = memo(
  ({
    title,
    description,
    image,
    options = [],
    className = "",
    index = 0,
    onClickDetails,
    maxOptions = 4,
    isActive = false,
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

    // Translation helpers (replace with i18n or props)
    const joursText =
      typeof options[0]?.duration === "string" &&
      options[0].duration.includes("jour") &&
      typeof window !== "undefined" &&
      window.i18n
        ? window.i18n.t("thalion.themeSection.days")
        : "jours";
    const detailsLabel = detailsText || "Détails";
    const lesEscalesLabel =
      moreOptionsText === "autres soins disponibles"
        ? "Les Escales"
        : moreOptionsText;

    const handleDetailsClick = (e) => {
      e?.stopPropagation();
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
      <div
        onClick={handleCardClick}
        className={`group bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden h-full min-h-[420px] sm:min-h-[480px] max-h-[520px] sm:max-h-[580px] flex flex-col font-sans cursor-pointer rounded-lg ${
          isActive
            ? "border-2 border-amber-300 shadow-amber-200/60 bg-gradient-to-b from-white to-amber-50/30"
            : "border border-gray-100"
        } ${className}`}
      >
        {/* Image */}
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
          {/* Title and Description */}
          <div className="mb-2 sm:mb-3 flex-shrink-0">
            <h3 className="text-sm sm:text-base md:text-lg font-serif font-medium text-slate-800 mb-1 sm:mb-2 leading-tight">
              {title}
            </h3>
            <div className="w-10 sm:w-12 h-[1px] bg-gradient-to-r from-slate-800 to-slate-400 mb-1 sm:mb-2" />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light tracking-wide line-clamp-2">
              {description}
            </p>
          </div>

          {/* Options - Mobile Optimized */}
          <div className="flex-grow flex flex-col min-h-0">
            <div className="h-20 sm:h-24 overflow-hidden">
              <div className="space-y-1 sm:space-y-1.5 h-full">
                {displayOptions.length > 0 ? (
                  displayOptions.slice(0, 2).map((option, optIndex) => (
                    <div
                      key={`${title}-${optIndex}`}
                      className="flex items-center justify-between px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-50 hover:bg-slate-100/80 transition-colors duration-200 rounded text-center border-l-2 border-slate-200"
                    >
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 flex-shrink-0" />
                        <span className="text-slate-700 text-xs font-medium">
                          {option.duration
                            ? option.duration.replace(/\bjours?\b/, joursText)
                            : option.name || joursText}
                        </span>
                      </div>
                      <div className="text-slate-800 text-xs font-semibold">
                        {option.price ? `${option.price}` : "Sur devis"}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                    {detailsAvailableText}
                  </div>
                )}
              </div>
            </div>

            {/* Show more indicator */}
            {options.length > 2 && (
              <div className="mt-1 text-center">
                <span className="text-slate-500 text-xs">
                  +{options.length - 2} {lesEscalesLabel}
                </span>
              </div>
            )}

            {/* Action Buttons - Mobile Optimized */}
            <div className="mt-2 sm:mt-3 pt-2 border-t border-slate-100 flex-shrink-0">
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <button className="w-full py-1.5 sm:py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-xs font-medium tracking-wider transition-all duration-200 rounded hover:from-slate-700 hover:to-slate-600 shadow-sm">
                  {bookText}
                </button>
                <button
                  className="w-full py-1.5 sm:py-2 bg-white text-slate-800 text-xs font-medium tracking-wider border border-slate-300 transition-all duration-200 rounded hover:bg-slate-50 hover:border-slate-400 shadow-sm"
                  onClick={handleDetailsClick}
                >
                  {detailsLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Disclaimer */}
        <div className="px-3 pb-2 pt-1 text-[11px] text-slate-400 italic text-center select-none">
          Les tarifs en euros sont donnés seulement à titre indicatif
        </div>
      </div>
    );
  }
);

BoxDesign.displayName = "BoxDesign";

export default BoxDesign;
