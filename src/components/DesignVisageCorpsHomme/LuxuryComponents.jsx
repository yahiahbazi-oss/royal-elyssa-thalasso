// LuxuryComponents.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const GradientText = ({ children, className }) => {
  return (
    <span className={`text-gradient-luxury ${className}`}>{children}</span>
  );
};

export const CategoryTab = ({ active, onClick, icon, title }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`category-tab ${active ? "active" : ""}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-luxury text-lg">{title}</span>
      </div>
    </motion.button>
  );
};

export const TreatmentItem = ({ treatment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="treatment-item glass-morphism"
    >
      <div className="treatment-content">
        <div className="treatment-image-container">
          <img
            src={`/src/pages/Thalion/BrochureSections/assets/alacarte/${treatment.image}`}
            alt={treatment.name}
            className="treatment-image"
          />
          <div className="duration-badge">
            <Clock className="w-4 h-4 mr-1" />
            {treatment.duration}
          </div>
        </div>
        <div className="treatment-details">
          <div className="treatment-header">
            <h4 className="font-luxury">{treatment.name}</h4>
            <div className="treatment-price">{treatment.price}</div>
          </div>
          <p className="treatment-description">{treatment.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const ServiceCard = ({ service, isExpanded, onToggle }) => {
  return (
    <motion.div
      layout
      className="service-card glass-morphism"
      whileHover={{ y: -2 }}
    >
      <motion.button onClick={onToggle} className="service-header">
        <div className="service-title-container">
          <div className="service-image-container">
            <img
              src={`/src/pages/Thalion/BrochureSections/assets/alacarte/${service.image}`}
              alt={service.category}
              className="service-image"
            />
          </div>
          <div>
            <h3 className="font-luxury">{service.category}</h3>
            <div className="service-count">
              {service.treatments.length} soins disponibles
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="service-treatments"
          >
            {service.treatments.map((treatment, index) => (
              <TreatmentItem key={index} treatment={treatment} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
