import React from "react";

const services = [
  {
    icon: "🌊",
    title: "Thalassothérapie",
    subtitle: "Monastir & Tunisie",
    description:
      "Cure de thalassothérapie à Monastir au cœur de la Méditerranée. Soins marins, balnéothérapie, enveloppements d'algues et bains d'eau de mer pour une remise en forme complète en Tunisie.",
    tags: ["Cure minceur Monastir", "Soins marins Tunisie", "Balnéothérapie Monastir"],
  },
  {
    icon: "💆",
    title: "Spa & Bien-être",
    subtitle: "Espace THEMAE",
    description:
      "Spa de luxe à Monastir avec massages relaxants, soins visage, rituels bien-être et relaxation marine. Le meilleur spa de Tunisie pour un séjour bien-être inoubliable.",
    tags: ["Massage relaxant Monastir", "Soin visage Tunisie", "Spa luxe Monastir"],
  },
  {
    icon: "✂️",
    title: "Haute Coiffure",
    subtitle: "Eric Zemmour",
    description:
      "Salon de coiffure haut de gamme à Monastir, signé Eric Zemmour, l'expert en haute coiffure. Coupes, colorations et soins capillaires pour hommes et femmes en Tunisie.",
    tags: ["Coiffure homme Monastir", "Salon coiffure luxe Tunisie", "Eric Zemmour Monastir"],
  },
  {
    icon: "💪",
    title: "Club de Sport",
    subtitle: "L'Usine",
    description:
      "Club de sport et salle de fitness à Monastir. Cours collectifs, musculation, natation et entraînement personnalisé. Le meilleur club de sport de Tunisie pour votre remise en forme.",
    tags: ["Fitness Monastir", "Cours collectifs Tunisie", "Salle de sport Monastir"],
  },
  {
    icon: "🛏️",
    title: "Suites VIP",
    subtitle: "Carré VIP Spa",
    description:
      "Suites spa de luxe à Monastir avec vue sur la Méditerranée, jardins suspendus et piscine privée. Un hébergement d'exception pour votre séjour thalasso en Tunisie.",
    tags: ["Suites luxe Monastir", "Jacuzzi suite Tunisie", "Hébergement thalasso Monastir"],
  },
  {
    icon: "🌿",
    title: "Cures & Forfaits",
    subtitle: "Séjours sur mesure",
    description:
      "Forfaits thalasso à Monastir : cure anti-stress, cure minceur, détox silhouette, week-end thalasso et séjours bien-être tout compris. Réservations depuis la France, la Suisse et la Tunisie.",
    tags: ["Forfait thalasso Tunisie", "Cure anti-stress Monastir", "Week-end thalasso Tunisie"],
  },
];

const Services = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Thalasso & Spa — Monastir, Tunisie
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-4">
            Nos <span className="italic text-amber-700">Services</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px bg-amber-300 w-16" />
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
            <div className="h-px bg-amber-300 w-16" />
          </div>
          <p className="text-stone-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Le Royal Elyssa Thalasso & Spa à Monastir regroupe cinq espaces de bien-être d'exception.
            Séjour thalasso en Tunisie, forfaits remise en forme, spa luxe et suites VIP
            au bord de la Méditerranée — réservations depuis la France et la Suisse.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <article
              key={index}
              className="group bg-stone-50 border border-stone-200 rounded-2xl p-8 hover:border-amber-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-stone-800 mb-1">{service.title}</h3>
              <p className="text-amber-600 text-sm font-medium tracking-wide uppercase mb-3">
                {service.subtitle}
              </p>
              <p className="text-stone-600 text-sm leading-relaxed mb-5">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* SEO footer text */}
        <div className="mt-16 text-center">
          <p className="text-stone-400 text-sm leading-relaxed max-w-3xl mx-auto">
            Royal Elyssa Thalasso & Spa — Centre de thalassothérapie et bien-être à Monastir, Tunisie.
            Cure minceur Monastir · Cure anti-stress Tunisie · Massage relaxant Monastir ·
            Spa luxe Tunisie · Forfait thalasso Monastir · Séjour bien-être Tunisie ·
            Suites spa Monastir · Fitness Tunisie · Coiffure Monastir
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;

