import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactThalion = ({ language = "fr" }) => {
  // Translation object
  const translations = {
    fr: {
      contact: "CONTACT",
      phone: "+216 73 520 589",
      email: "dg.elyssa@thalassa-hotels.com",
      address: "Route Touristique Skanes, Monastir, Tunisie",
    },
    en: {
      contact: "CONTACT",
      phone: "+216 73 520 589",
      email: "dg.elyssa@thalassa-hotels.com",
      address: "Tourist Route Skanes, Monastir, Tunisia",
    },
  };

  // Get current translations
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-8xl md:text-9xl font-serif font-bold mb-8 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          {t.contact}
        </h1>

        <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto"></div>

        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-center text-slate-300">
            <Phone className="w-6 h-6 mr-4 text-teal-400" />
            <span className="text-lg">{t.phone}</span>
          </div>
          <div className="flex items-center justify-center text-slate-300">
            <Mail className="w-6 h-6 mr-4 text-teal-400" />
            <span className="text-lg">{t.email}</span>
          </div>
          <div className="flex items-center justify-center text-slate-300">
            <MapPin className="w-6 h-6 mr-4 text-teal-400" />
            <span className="text-lg">{t.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactThalion;
