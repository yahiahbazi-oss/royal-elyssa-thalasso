import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactThalion = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-8xl md:text-9xl font-serif font-bold mb-8 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          {t("contact.thalion.contact")}
        </h1>

        <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto"></div>

        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-center text-slate-300">
            <Phone className="w-6 h-6 mr-4 text-teal-400" />
            <span className="text-lg">{t("contact.thalion.phone")}</span>
          </div>
          <div className="flex items-center justify-center text-slate-300">
            <Mail className="w-6 h-6 mr-4 text-teal-400" />
            <span className="text-lg">{t("contact.thalion.email")}</span>
          </div>
          <div className="flex items-center justify-center text-slate-300">
            <MapPin className="w-6 h-6 mr-4 text-teal-400" />
            <span className="text-lg">{t("contact.thalion.address")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactThalion;
