import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import Footer from "../../components/Footer/Footer";

const FORFAITS = [
  {
    id: "weekend",
    category: "WEEK-END",
    emoji: "🌊",
    name: "Week-end Cool",
    duration: "2 jours",
    price: "Sur demande",
    color: "#6B9E9E",
    description:
      "Échappée parfaite pour un week-end de détente absolue. Programme court mais intense pour se ressourcer rapidement et retrouver forme et vitalité.",
    includes: [
      "Soins marins exclusifs",
      "Bain d'eau de mer naturelle",
      "Hammam vapeur inclus",
      "Massage relaxant",
    ],
  },
  {
    id: "noStress",
    category: "ANTI-STRESS",
    emoji: "🧘",
    name: "Cure No Stress",
    duration: "6 jours",
    price: "1 018 TND / 308 €",
    color: "#9E7B6B",
    description:
      "Programme anti-stress complet pour retrouver sérénité et équilibre. Soins relaxants, techniques de relaxation et moments de méditation pour évacuer toutes les tensions.",
    includes: [
      "6 jours de soins intensifs",
      "Massages thérapeutiques",
      "Soins d'eau de mer",
      "Hammam vapeur inclus",
    ],
  },
  {
    id: "relaxation",
    category: "RELAXATION",
    emoji: "💆",
    name: "Escale Relaxation Marine",
    duration: "4 / 6 / 9 jours",
    price: "À partir de 1 018 TND",
    color: "#6B7E9E",
    description:
      "Échappez au stress avec nos soins relaxants inspirés de la mer. Massages apaisants, bains relaxants et moment de pure détente pour retrouver sérénité et équilibre.",
    includes: [
      "3h de soins par jour",
      "Enveloppements marins",
      "Bains d'algues",
      "Massages anti-stress",
    ],
  },
  {
    id: "detox",
    category: "MINCEUR",
    emoji: "✨",
    name: "Détox Silhouette",
    duration: "4 / 6 / 9 jours",
    price: "1 380 TND → 2 720 TND",
    color: "#7E9E6B",
    description:
      "Programme complet de détoxification pour sculpter votre silhouette. Soins drainants, massages minceur et enveloppements détox pour purifier votre organisme.",
    includes: [
      "Aquacycling inclus",
      "Massages drainants",
      "Enveloppements détox",
      "Suivi nutritionnel",
    ],
  },
  {
    id: "vitalite",
    category: "VITALITÉ",
    emoji: "⚡",
    name: "Vitalité Marine",
    duration: "4 / 6 / 9 jours",
    price: "À partir de 1 018 TND",
    color: "#9E9E6B",
    description:
      "Revitalisez votre corps et votre esprit avec nos soins marins exceptionnels. Cette cure énergisante combine massages tonifiants, bains d'eau de mer et enveloppements aux algues.",
    includes: [
      "Gommage tonique aux agrumes",
      "Bain revitalisant aux algues",
      "Massages énergisants",
      "Enveloppements marins",
    ],
  },
  {
    id: "men",
    category: "HOMMES",
    emoji: "💪",
    name: "Escale Men",
    duration: "4 / 6 jours",
    price: "Sur demande",
    color: "#6B6B9E",
    description:
      "Programme spécialement conçu pour le bien-être masculin. Soins adaptés aux besoins spécifiques des hommes avec des techniques revigorantes et des produits haute performance.",
    includes: [
      "Soins adaptés aux hommes",
      "Massages sportifs",
      "Soins du visage masculins",
      "Bains tonifiants",
    ],
  },
  {
    id: "golf",
    category: "SPORT",
    emoji: "⛳",
    name: "After Golf",
    duration: "2 / 4 jours",
    price: "Sur demande",
    color: "#6B9E7B",
    description:
      "Détendez-vous après votre partie de golf avec nos soins spécialisés. Massages récupérateurs et soins apaisants pour soulager les tensions musculaires après l'effort.",
    includes: [
      "Massages récupérateurs",
      "Bains relaxants",
      "Soins musculaires",
      "Accès piscine & hammam",
    ],
  },
  {
    id: "arbre",
    category: "HOLISTIQUE",
    emoji: "🌿",
    name: "Arbre de Vie",
    duration: "4 / 6 jours",
    price: "Sur demande",
    color: "#7B9E6B",
    description:
      "Reconnectez-vous avec votre essence profonde et votre vitalité naturelle. Soins holistiques et rituels bien-être pour harmoniser corps, esprit et émotions.",
    includes: [
      "Rituels bien-être exclusifs",
      "Soins holistiques",
      "Aromathérapie",
      "Méditation guidée",
    ],
  },
  {
    id: "oriental",
    category: "ORIENTAL",
    emoji: "🌙",
    name: "Cérémonie Orientale",
    duration: "4 jours",
    price: "Sur demande",
    color: "#9E6B7B",
    description:
      "Voyage sensoriel inspiré des rituels orientaux. Gommages au savon beldi, enveloppements au ghassoul et massages aux huiles précieuses pour une expérience de luxe.",
    includes: [
      "Hammam traditionnel",
      "Gommage beldi",
      "Enveloppement ghassoul",
      "Massages aux huiles rares",
    ],
  },
  {
    id: "nouvelAge",
    category: "PREMIUM",
    emoji: "💎",
    name: "Nouvel Age",
    duration: "6 / 9 jours",
    price: "Sur demande",
    color: "#9E8B6B",
    description:
      "Embrassez une nouvelle ère de bien-être avec nos soins innovants. Techniques avant-gardistes et produits dernière génération pour une expérience spa unique.",
    includes: [
      "Soins haute technologie",
      "Protocoles exclusifs",
      "Produits premium",
      "Programme personnalisé",
    ],
  },
];

const CATEGORIES = ["TOUS", ...new Set(FORFAITS.map((f) => f.category))];

const ForfaitCard = ({ forfait }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.14)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
    }}
  >
    {/* Color bar */}
    <div style={{ height: 6, background: forfait.color }} />

    <div style={{ padding: "24px 24px 20px" }}>
      {/* Category badge */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          color: forfait.color,
          textTransform: "uppercase",
        }}
      >
        {forfait.emoji} {forfait.category}
      </span>

      {/* Name */}
      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1a1a1a",
          margin: "8px 0 12px",
          fontFamily: "Georgia, serif",
        }}
      >
        {forfait.name}
      </h3>

      {/* Duration & Price */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        <span
          style={{
            fontSize: 13,
            background: "#f5f0ea",
            color: "#5a4a3a",
            padding: "4px 12px",
            borderRadius: 20,
            fontWeight: 600,
          }}
        >
          ⏱ {forfait.duration}
        </span>
        <span
          style={{
            fontSize: 13,
            background: forfait.color + "18",
            color: forfait.color,
            padding: "4px 12px",
            borderRadius: 20,
            fontWeight: 600,
          }}
        >
          {forfait.price}
        </span>
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
        {forfait.description}
      </p>

      {/* Includes list */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
        {forfait.includes.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: 13,
              color: "#444",
              padding: "5px 0",
              borderBottom: "1px solid #f0ebe4",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: forfait.color, fontWeight: 700 }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* CTA */}
    <div style={{ marginTop: "auto", padding: "0 24px 24px" }}>
      <Link
        to="/contact"
        style={{
          display: "block",
          textAlign: "center",
          background: forfait.color,
          color: "#fff",
          padding: "12px",
          borderRadius: 8,
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0.5,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        RÉSERVER CE FORFAIT
      </Link>
    </div>
  </div>
);

const ForfaitsPage = () => {
  const [activeCategory, setActiveCategory] = useState("TOUS");

  const filtered =
    activeCategory === "TOUS"
      ? FORFAITS
      : FORFAITS.filter((f) => f.category === activeCategory);

  return (
    <>
      <SEO
        title="Forfaits Thalasso & Spa | Royal Elyssa Monastir"
        description="Découvrez nos forfaits thalassothérapie à Monastir : Cure No Stress, Détox Silhouette, Relaxation Marine, Week-end Cool, Escale Men et bien plus. Prix et réservation."
        canonical="/forfaits"
      />

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a2a3a 0%, #2d4a5a 50%, #1a3040 100%)",
          color: "#fff",
          textAlign: "center",
          padding: "80px 20px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "url('https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_1400/v1759477822/thalion-royalelyssa.jpg__3876x1912_q85_crop_subsampling-2_upscale_qxd1c0.jpg') center/cover no-repeat",
            opacity: 0.25,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Link
            to="/"
            style={{
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontSize: 13,
              letterSpacing: 1,
              display: "inline-block",
              marginBottom: 24,
            }}
          >
            ← Retour à l'accueil
          </Link>
          <p
            style={{
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#c9a96e",
              marginBottom: 12,
            }}
          >
            Royal Elyssa Thalasso & Spa
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 300,
              fontFamily: "Georgia, serif",
              margin: "0 0 16px",
              letterSpacing: 2,
            }}
          >
            Nos Forfaits
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 560,
              margin: "0 auto 8px",
              lineHeight: 1.7,
            }}
          >
            Des programmes de bien-être soigneusement conçus pour répondre à chaque besoin.
            Chaque forfait comprend l'accès au parcours marin et au hammam vapeur.
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Monastir, Tunisie · Bord de mer
          </p>
        </div>
      </div>

      {/* Includes banner */}
      <div
        style={{
          background: "#c9a96e",
          color: "#fff",
          textAlign: "center",
          padding: "14px 20px",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 0.5,
        }}
      >
        Tous les forfaits comprennent : Parcours marin eau de mer naturelle · Hammam vapeur · Piscine
      </div>

      {/* Category tabs */}
      <div
        style={{
          background: "#f9f6f0",
          padding: "24px 20px 0",
          position: "sticky",
          top: 0,
          zIndex: 10,
          borderBottom: "1px solid #e8e0d5",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            maxWidth: 1200,
            margin: "0 auto",
            paddingBottom: 0,
            scrollbarWidth: "none",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px 8px 0 0",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1.5,
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                background: activeCategory === cat ? "#1a2a3a" : "transparent",
                color: activeCategory === cat ? "#fff" : "#888",
                borderBottom: activeCategory === cat ? "3px solid #c9a96e" : "3px solid transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ background: "#f9f6f0", padding: "40px 20px 60px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 28,
          }}
        >
          {filtered.map((forfait) => (
            <ForfaitCard key={forfait.id} forfait={forfait} />
          ))}
        </div>

        {/* Info note */}
        <p
          style={{
            textAlign: "center",
            color: "#999",
            fontSize: 13,
            maxWidth: 600,
            margin: "40px auto 0",
            lineHeight: 1.7,
          }}
        >
          Les tarifs en euros sont donnés à titre indicatif. Pour un devis personnalisé
          ou une réservation de groupe, contactez-nous directement.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default ForfaitsPage;
