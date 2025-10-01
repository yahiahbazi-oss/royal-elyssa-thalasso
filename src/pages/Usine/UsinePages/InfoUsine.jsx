import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Clock, Phone, Mail, MapPin } from "lucide-react";

// Import the local images
import image17 from "../assets/17.JPG";
import image18 from "../assets/18.JPG";
import image19 from "../assets/19.JPG";
import image20 from "../assets/20.JPG";
import image21 from "../assets/21.JPG";
import image22 from "../assets/22.JPG";

const InfoUsine = () => {
  const { t } = useTranslation();
  
  // Règlement intérieur data
  const regulations = [
    {
      id: 1,
      text: t("usine.info.regulations.rules.rule1"),
      image: image17,
    },
    {
      id: 2,
      text: t("usine.info.regulations.rules.rule2"),
      image: image18,
    },
    {
      id: 3,
      text: t("usine.info.regulations.rules.rule3"),
      image: image19,
    },
    {
      id: 4,
      text: t("usine.info.regulations.rules.rule4"),
      image: image20,
    },
    {
      id: 5,
      text: t("usine.info.regulations.rules.rule5"),
      image: image21,
    },
    {
      id: 6,
      text: t("usine.info.regulations.rules.rule6"),
      image: image22,
    },
  ];

  // Horaires data
  const schedule = [
    { day: t("usine.info.schedule.days.lundi"), hours: "07:00 - 22:00" },
    { day: t("usine.info.schedule.days.mardi"), hours: "07:00 - 22:00" },
    { day: t("usine.info.schedule.days.mercredi"), hours: "07:00 - 22:00" },
    { day: t("usine.info.schedule.days.jeudi"), hours: "07:00 - 22:00" },
    { day: t("usine.info.schedule.days.vendredi"), hours: "07:00 - 22:00" },
    { day: t("usine.info.schedule.days.samedi"), hours: "07:00 - 20:00" },
    { day: t("usine.info.schedule.days.dimanche"), hours: "07:00 - 20:00" },
  ];

  // Contact data
  const contactInfo = [
    {
      type: "phone",
      value: "73 524 468 ",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      type: "email",
      value: "manager.lusine@thalassa-hotels.com",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      type: "address",
      value: "Royal Elyssa, Monastir",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="container px-4 mx-auto">
        {/* Règlement Intérieur Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-12 text-4xl font-bold text-center text-amber-400 md:text-5xl">
            {t("usine.info.regulations.title")}
          </h2>

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {regulations.map((regulation) => (
              <motion.div
                key={regulation.id}
                className="overflow-hidden bg-black/50 rounded-xl backdrop-blur-md border border-amber-400/20"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={regulation.image}
                    alt={regulation.text}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <p className="text-lg text-amber-100">{regulation.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Horaires Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="mb-12 text-4xl font-bold text-center text-amber-400 md:text-5xl">
            {t("usine.info.schedule.title")}
          </h2>

          <div className="max-w-2xl mx-auto bg-black/50 backdrop-blur-md rounded-xl p-8 border border-amber-400/20">
            <div className="flex items-center justify-center mb-8">
              <Clock className="w-8 h-8 mr-3 text-amber-400" />
              <span className="text-2xl font-semibold text-amber-100"></span>
            </div>

            <div className="space-y-4">
              {schedule.map((day, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between py-3 border-b border-amber-400/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-lg font-medium capitalize text-amber-100">
                    {day.day}
                  </span>
                  <span className="text-lg text-amber-400">{day.hours}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="mb-12 text-4xl font-bold text-center text-amber-400 md:text-5xl">
            {t("usine.info.contact.title")}
          </h2>

          <div className="max-w-2xl mx-auto bg-black/50 backdrop-blur-md rounded-xl p-8 border border-amber-400/20">
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-amber-400/20">
                    {contact.icon}
                  </div>
                  <span className="text-lg text-amber-100">
                    {contact.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InfoUsine;
