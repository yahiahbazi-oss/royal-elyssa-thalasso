import React from "react";
import { MapPin, Navigation, Mail, Phone } from "lucide-react";
import OSMap from "../components/Map/OSMap";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();
  const handleGetDirections = () => {
    const destination = "QQ85+66 Monastir, Tunisia";
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      destination
    )}`;
    window.open(url, "_blank");
  };

  const contactInfo = [
    {
      title: t("contact.info.receptionRoyalElyssa"),
      phone: "+216 73 520 589",
      email: "dg.elyssa@thalassa-hotels.com",
      icon: <MapPin className="w-6 h-6 text-amber-600" />,
    },
    {
      title: t("contact.info.receptionUsine"),
      phone: "+216 73 524 468",
      email: "manager.lusine@thalassa-hotels.com",
      icon: <MapPin className="w-6 h-6 text-amber-600" />,
    },
    {
      title: t("contact.info.receptionEricZemmour"),
      phone: "+216 73 520 591",
      icon: <MapPin className="w-6 h-6 text-amber-600" />,
    },
  ];

  return (
    <div id="contact" className="min-h-screen flex flex-col bg-gradient-to-b from-stone-50 to-amber-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 px-6 bg-gradient-to-r from-amber-900/5 to-amber-900/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <MapPin className="mx-4 w-8 h-8 text-amber-600" />
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-light text-slate-800 mb-4 tracking-wide">
              {t("contact.hero.title")}
            </h1>
            <p className="text-xl font-serif text-slate-600 max-w-3xl mx-auto">
              {t("contact.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Contact Info & Map Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-amber-200/30">
                <h2 className="text-2xl font-serif font-semibold text-amber-800 mb-6">
                  {t("contact.info.title")}
                </h2>

                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-start space-x-3">
                        {item.icon}
                        <h3 className="text-xl font-serif font-medium text-slate-800">
                          {item.title}
                        </h3>
                      </div>

                      <div className="pl-9 space-y-2">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-amber-600" />
                          <a
                            href={`tel:${item.phone}`}
                            className="font-sans text-slate-700 hover:text-amber-600 transition-colors"
                          >
                            {item.phone}
                          </a>
                        </div>

                        {item.email && (
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-amber-600" />
                            <a
                              href={`mailto:${item.email}`}
                              className="font-sans text-slate-700 hover:text-amber-600 transition-colors"
                            >
                              {item.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-200/30 overflow-hidden h-full">
                <div className="p-6 h-full">
                  <div className="relative h-full">
                    <OSMap />

                    <div className="absolute bottom-6 right-6 z-[1000]">
                      <button
                        onClick={handleGetDirections}
                        className="group bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 
                                 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl 
                                 transition-all duration-300 transform hover:scale-105 
                                 flex items-center space-x-2 font-serif font-medium"
                      >
                        <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>{t("contact.map.directions")}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Address Section */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-amber-200/30 text-center">
            <div className="inline-flex items-center justify-center bg-amber-100/50 rounded-full p-4 mb-6">
              <MapPin className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              {t("contact.address.title")}
            </h2>
            <p className="text-lg font-serif text-slate-700 mb-6">
              {t("contact.address.address")}
            </p>
            <p className="text-lg font-serif text-slate-600 max-w-2xl mx-auto">
              {t("contact.address.description")}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
