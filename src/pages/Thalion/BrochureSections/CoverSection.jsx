import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import coverImage from "./assets/thaliion.jpg";
import logoThalion from "./assets/logo-thalion.png__401x85_q85_crop_subject_location--87,731_subsampling-2_upscale.png";
import logo3 from "./assets/logo3.png";

const CoverSection = ({ language = "fr" }) => {
  const { t } = useTranslation();

  const handleDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = '/ Thalion_Royal_Elyssa.pdf';
    link.download = 'Thalion_Royal_Elyssa.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTariffsDownload = () => {
    // Create a temporary link element to trigger tariffs download
    const link = document.createElement('a');
    link.href = '/Tarifs_monastir2025-3 volets  print_2.pdf';
    link.download = 'Tarifs_monastir2025-3_volets_print_2.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        {" "}
        {/* Changed from fixed to absolute */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dxoje33mm/image/upload/v1759448440/thaliion_uneryj.jpg)`,
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/80" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        {/* Royal Elyssa Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full mb-6 flex justify-center"
        >
          <motion.img
            src={logo3}
            alt="Royal Elyssa Logo"
            className="max-w-[260px] w-full h-auto object-contain drop-shadow-md"
            style={{ imageRendering: "crisp-edges" }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </motion.div>

        {/* Decorative separator */}
        <motion.div
          className="w-24 h-0.5 bg-amber-500/40 my-4 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Thalion Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-6 w-full max-w-[420px]"
        >
          <motion.img
            src={logoThalion}
            alt="Thalion Logo"
            className="mx-auto h-28 w-auto drop-shadow-md"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-3 text-sm tracking-[0.3em] text-amber-50/90 uppercase font-light"
          >
            {t("thalion.cover.subtitle")}
          </motion.p>
        </motion.div>

        {/* Descriptive text section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="max-w-2xl mx-auto px-4 mb-8"
        >
          <p className="text-sm sm:text-base text-amber-50/90 font-light leading-relaxed italic">
            {t("thalion.cover.description")}
          </p>
        </motion.div>

        {/* CTA Buttons Container */}
        <motion.div
          className="flex flex-col gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {/* Brochure Download Button */}
          <motion.button
            onClick={handleDownload}
            className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium tracking-widest text-xs sm:text-sm uppercase rounded-full relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              {t("thalion.cover.downloadBrochure")}
              <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* Tariffs Download Button */}
          <motion.button
            onClick={handleTariffsDownload}
            className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium tracking-widest text-xs sm:text-sm uppercase rounded-full relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              {t("thalion.cover.viewPricing")}
              <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>

        {/* Scroll indicator - mobile only */}
        <motion.div
          className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
        >
          <ChevronDown className="h-4 w-4 text-amber-50/70 animate-bounce" />
          <span className="text-[10px] tracking-widest text-amber-50/50 mt-0.5">
            {t("thalion.cover.scroll")}
          </span>
        </motion.div>

        {/* Year subtle line removed as requested */}
      </div>
    </div>
  );
};

export default CoverSection;
