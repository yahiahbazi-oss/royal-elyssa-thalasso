import React from "react";
import { motion } from "framer-motion";
import carteBg from "../assets/alacarte/carte2.jpg";

const WelcSoinsLaCarte = () => {
  return (
    <motion.div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={carteBg}
          alt="Thalion Spa Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl px-6 py-20 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Main Title */}
        <motion.div
          className="mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.2em] mb-4 font-serif text-amber-50">
            Les soins
          </h2>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium italic tracking-wider mb-8 font-serif text-white">
            à la carte
          </h1>
          <div className="w-24 h-[2px] bg-amber-200 mx-auto mb-12"></div>
        </motion.div>

        {/* Description Text */}
        <motion.div
          className="max-w-3xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {/* First Paragraph */}
          <p className="text-xl md:text-2xl font-light leading-relaxed tracking-wide text-amber-50 font-sans">
            La carte de soins THALION vous emmène
            <br />
            à la découverte des bienfaits de la mer, dans un
            <br />
            univers de sensations inoubliables alliant
            <br />
            des gestuelles exclusives à des équipements de pointe !
          </p>

          {/* Second Paragraph */}
          <p className="text-2xl md:text-3xl font-light leading-relaxed tracking-wider text-white italic font-serif">
            Vivez une expérience inédite des soins marins.
          </p>

          {/* Highlighted Paragraph */}
          <div className="pt-6">
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-amber-100 font-sans">
              <span className="block mb-4">
                Envie de prolonger le voyage et de faire durer l'évasion jusque
                dans votre salle de bains ?
              </span>
              <span className="block mb-4">
                Repartez avec des produits THALION. Pour le visage, le corps et
                l'homme, un large choix vous attend !
              </span>
            </p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="flex justify-center mt-16 space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="w-16 h-16 border-t border-l border-amber-200/60"></div>
          <div className="w-16 h-16 border-b border-r border-amber-200/60"></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcSoinsLaCarte;
