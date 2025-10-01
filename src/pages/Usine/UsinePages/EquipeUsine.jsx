import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Award, Star } from "lucide-react";

// Import the image directly
import teamImage from "../assets/16.JPG";

const EquipeUsine = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          {t("usine.equipe.header.title")}{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            {t("usine.equipe.header.titleHighlight")}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          {t("usine.equipe.header.subtitle")}
        </p>
      </motion.div>

      {/* Introduction Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-16 px-4"
      >
        <div className="bg-gradient-to-r from-amber-900/10 to-amber-800/5 p-8 rounded-2xl border border-amber-600/20 backdrop-blur-sm max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-amber-400 mb-6">
                {t("usine.equipe.team.title")}
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p className="text-justify">
                  {t("usine.equipe.team.description1")}
                </p>
                <p className="text-justify">
                  {t("usine.equipe.team.description2")}
                </p>
                <p className="text-justify">
                  {t("usine.equipe.team.description3")}
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={teamImage}
                  alt={t("usine.equipe.team.imageAlt")}
                  className="w-64 h-64 object-cover rounded-full shadow-lg"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center">
                  <Award className="w-12 h-12 text-black" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center">
                  <Star className="w-10 h-10 text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
    </div>
  );
};

export default EquipeUsine;
