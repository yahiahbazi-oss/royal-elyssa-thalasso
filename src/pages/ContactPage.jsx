import React from "react";
import { MapPin, Navigation, Mail, Phone, Clock } from "lucide-react";
import Header from "../components/Header";
import OSMap from "../components/Map/OSMap";

const ContactPage = () => {
  const handleGetDirections = () => {
    const destination = "QQ85+66 Monastir, Tunisia";
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      destination
    )}`;
    window.open(url, "_blank");
  };

  const contactInfo = [
    {
      title: "Réception du Royal Elyssa Thalasso & Spa",
      hours: "De 9h à 13h – De 14h30 à 19h30",
      phone: "+216 73 520 589",
      email: "dg.elyssa@thalassa-hotels.com",
      icon: <MapPin className="w-5 h-5" style={{ color: "#ffc107" }} />,
    },
    {
      title: "Réception du Club de Sports L'Usine",
      hours: "De 9h à 18h",
      phone: "+216 73 524 468",
      email: "manager.lusine@thalassa-hotels.com",
      icon: <MapPin className="w-5 h-5" style={{ color: "#ffc107" }} />,
    },
    {
      title: "Réception du Salon de Coiffure Eric Zemmour",
      hours: "Du vendredi au mercredi, de 10h à 18h",
      phone: "+216 73 520 591",
      icon: <MapPin className="w-5 h-5" style={{ color: "#ffc107" }} />,
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#05082b" }}
    >
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative py-20 px-6"
          style={{
            background: "linear-gradient(to bottom, #1a237e, #05082b)",
          }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-8">
              <div
                className="w-24 h-px"
                style={{
                  background: "linear-gradient(to right, transparent, #ffc107)",
                }}
              ></div>
              <MapPin className="mx-4 w-8 h-8" style={{ color: "#ffc107" }} />
              <div
                className="w-24 h-px"
                style={{
                  background: "linear-gradient(to left, transparent, #ffc107)",
                }}
              ></div>
            </div>

            <h1
              className="text-4xl md:text-5xl font-serif font-light mb-4 tracking-wide"
              style={{ color: "white" }}
            >
              Contactez le Royal Elyssa
            </h1>
            <p
              className="text-xl font-serif max-w-3xl mx-auto"
              style={{ color: "#ffd966" }}
            >
              Notre équipe est à votre disposition pour répondre à toutes vos
              questions
            </p>
          </div>
        </section>

        {/* Contact Info & Map Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              <div
                className="rounded-xl shadow-xl p-8"
                style={{
                  backgroundColor: "rgba(26, 35, 126, 0.9)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(26, 35, 126, 0.7)",
                }}
              >
                <h2
                  className="text-2xl font-serif font-semibold mb-6"
                  style={{ color: "#ffc107" }}
                >
                  Pour nous contacter, rien de plus facile :
                </h2>

                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-start space-x-3">
                        {item.icon}
                        <h3
                          className="text-xl font-serif font-medium"
                          style={{ color: "white" }}
                        >
                          {item.title}
                        </h3>
                      </div>

                      <div className="pl-8 space-y-3">
                        <div className="flex items-center space-x-3">
                          <Clock
                            className="w-5 h-5"
                            style={{ color: "#ffc107" }}
                          />
                          <p className="font-sans" style={{ color: "#ffd966" }}>
                            {item.hours}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Phone
                            className="w-5 h-5"
                            style={{ color: "#ffc107" }}
                          />
                          <a
                            href={`tel:${item.phone}`}
                            className="font-sans hover:underline"
                            style={{ color: "#ffd966" }}
                          >
                            {item.phone}
                          </a>
                        </div>

                        {item.email && (
                          <div className="flex items-center space-x-3">
                            <Mail
                              className="w-5 h-5"
                              style={{ color: "#ffc107" }}
                            />
                            <a
                              href={`mailto:${item.email}`}
                              className="font-sans hover:underline"
                              style={{ color: "#ffd966" }}
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
              <div
                className="rounded-xl shadow-2xl overflow-hidden h-full"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(255, 193, 7, 0.3)",
                }}
              >
                <div className="p-1 h-full">
                  <div className="relative h-full rounded-lg overflow-hidden">
                    <OSMap />

                    <div className="absolute bottom-6 right-6 z-[1000]">
                      <button
                        onClick={handleGetDirections}
                        className="group px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 font-serif font-medium"
                        style={{
                          background:
                            "linear-gradient(to right, #ffc107, #e6a800)",
                          color: "#05082b",
                        }}
                      >
                        <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Itinéraire</span>
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
          <div
            className="max-w-4xl mx-auto rounded-xl shadow-lg p-8 text-center"
            style={{
              backgroundColor: "rgba(26, 35, 126, 0.9)",
              border: "1px solid rgba(26, 35, 126, 0.7)",
            }}
          >
            <div
              className="inline-flex items-center justify-center rounded-full p-4 mb-6"
              style={{
                backgroundColor: "rgba(26, 35, 126, 0.5)",
              }}
            >
              <MapPin className="w-8 h-8" style={{ color: "#ffc107" }} />
            </div>
            <h2
              className="text-2xl font-serif font-semibold mb-4"
              style={{ color: "white" }}
            >
              Notre adresse
            </h2>
            <p className="text-lg font-serif mb-6" style={{ color: "#ffd966" }}>
              B.P 75 Route Touristique Skanes, Monastir 5060
            </p>
            <p
              className="text-lg font-serif max-w-2xl mx-auto"
              style={{ color: "#ffd966" }}
            >
              Situé sur l'une des plus belles plages de la Tunisie, notre spa
              vous accueille dans un cadre exceptionnel alliant luxe, détente et
              bien-être.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
