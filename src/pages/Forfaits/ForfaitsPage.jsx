import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../lib/supabase";
import royalLogo from "../../assets/logo3.png";

const SERIF = "'Cormorant Garamond', Georgia, serif";

const ForfaitsPage = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [allForfaits, setAllForfaits] = useState([]);
  const [hero, setHero] = useState({
    type: "image",
    url: "",
    title: "Forfaits",
    subtitle: "",
  });
  const [activeSection, setActiveSection] = useState("TOUS");
  const [activePersons, setActivePersons] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const KEYS = [
        "forfaits_hero_type",
        "forfaits_hero_url",
        "forfaits_hero_title",
        "forfaits_hero_subtitle",
      ];
      const [{ data: secs }, { data: forfs }, { data: settings }] = await Promise.all([
        supabase.from("forfait_sections").select("*").eq("is_active", true).order("order_index"),
        supabase.from("forfaits").select("*").eq("is_active", true).order("order_index"),
        supabase.from("page_settings").select("*").in("key", KEYS),
      ]);
      setSections(secs || []);
      setAllForfaits(forfs || []);
      if (settings) {
        const get = (k) => settings.find((s) => s.key === k)?.value || "";
        setHero({
          type: get("forfaits_hero_type") || "image",
          url: get("forfaits_hero_url"),
          title: get("forfaits_hero_title") || "Forfaits",
          subtitle: get("forfaits_hero_subtitle"),
        });
      }
      setLoading(false);
    })();
  }, []);

  const currentSection = sections.find((s) => s.id === activeSection);
  const filtered =
    activeSection === "TOUS"
      ? allForfaits
      : allForfaits.filter((f) => f.section_id === activeSection);
  const sectionBg = currentSection?.bg_color || "#f5f2ee";

  const handleBook = (f) => {
    const p = activePersons[f.id] || 1;
    navigate(`/booking?forfaitId=${f.id}&persons=${p}`);
  };

  const getBullets = (desc) => {
    if (!desc) return [];
    return desc
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
  };

  return (
    <>
      <SEO
        title="Forfaits Thalasso & Spa | Royal Elyssa Monastir"
        description="Decouvrez nos forfaits thalassotherapie a Monastir : soins exclusifs, circuits marins, cures bien-etre. Reservation en ligne."
        canonical="/forfaits"
      />

      {/* HERO 55vh */}
      <div
        style={{
          position: "relative",
          height: "55vh",
          minHeight: 360,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hero.type === "video" && hero.url ? (
          <video
            autoPlay muted loop playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            src={hero.url}
          />
        ) : hero.url ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${hero.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a2a3a, #2d4a5a)" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)" }} />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "#fff",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={royalLogo}
            alt="Royal Elyssa"
            style={{
              height: 64,
              marginBottom: 18,
              filter: "brightness(0) invert(1)",
              objectFit: "contain",
            }}
          />
          <div style={{ width: 48, height: 1, background: "#c9a96e", marginBottom: 20 }} />
          <h1
            style={{
              fontSize: "clamp(36px, 7vw, 70px)",
              fontWeight: 400,
              fontFamily: SERIF,
              margin: "0 0 12px",
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p
              style={{
                fontSize: "clamp(14px, 2vw, 16px)",
                color: "rgba(255,255,255,0.82)",
                maxWidth: 540,
                margin: 0,
                lineHeight: 1.85,
                fontWeight: 300,
                fontFamily: SERIF,
                fontStyle: "italic",
              }}
            >
              {hero.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* STICKY CATEGORY NAV */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#111",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {[{ id: "TOUS", name: "Tous les forfaits" }, ...sections].map((s) => {
            const active = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  padding: "18px 26px",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  background: "none",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  flexShrink: 0,
                  fontFamily: "system-ui, sans-serif",
                  color: active ? "#fff" : "rgba(255,255,255,0.4)",
                  borderBottom: active ? "2px solid #c9a96e" : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN AREA with section background color */}
      <div style={{ background: sectionBg, minHeight: "60vh" }}>
        {/* Section header — left-aligned Nordik style */}
        {currentSection && (
          <div style={{ padding: "72px 40px 48px", maxWidth: 960, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(38px, 5.5vw, 62px)",
                fontFamily: SERIF,
                fontWeight: 500,
                color: "#1a1a1a",
                margin: "0 0 28px",
                lineHeight: 1.1,
              }}
            >
              {currentSection.name}
            </h2>
            {currentSection.description && (
              <p style={{ fontSize: 17, color: "#444", lineHeight: 1.9, fontWeight: 400, maxWidth: 860, margin: 0 }}>
                {currentSection.description}
              </p>
            )}
          </div>
        )}

        {/* Cards grid */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: currentSection ? "0 20px 80px" : "60px 20px 80px",
          }}
        >
          {loading && (
            <div style={{ textAlign: "center", padding: 80, color: "#aaa", fontSize: 16 }}>
              Chargement des forfaits...
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 80, color: "#aaa", fontSize: 16 }}>
              Aucun forfait disponible pour le moment.
            </div>
          )}
          {!loading && filtered.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 3,
              }}
            >
              {filtered.map((f) => {
                const persons = activePersons[f.id] || 1;
                const bullets = getBullets(f.description);
                const currentPrice = persons === 1 ? f.price_1 : f.price_2;
                const oldPrice = persons === 1 ? f.old_price_1 : f.old_price_2;
                const hasDiscount =
                  oldPrice &&
                  parseFloat(oldPrice) > 0 &&
                  parseFloat(oldPrice) > parseFloat(currentPrice || 0);
                const discountPct = hasDiscount
                  ? Math.round((1 - parseFloat(currentPrice) / parseFloat(oldPrice)) * 100)
                  : 0;

                return (
                  <div
                    key={f.id}
                    style={{ background: "#fff", display: "flex", flexDirection: "column", position: "relative" }}
                  >
                    {/* Discount ribbon */}
                    {hasDiscount && (
                      <div
                        style={{
                          position: "absolute",
                          top: 14,
                          right: 14,
                          zIndex: 2,
                          background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                          color: "#fff",
                          padding: "5px 12px",
                          borderRadius: 2,
                          fontSize: 13,
                          fontWeight: 800,
                          letterSpacing: 1,
                          boxShadow: "0 2px 10px rgba(192,57,43,0.4)",
                        }}
                      >
                        -{discountPct}%
                      </div>
                    )}

                    {/* Image */}
                    {f.image_url && (
                      <div style={{ height: 220, overflow: "hidden" }}>
                        <img
                          src={f.image_url}
                          alt={f.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                          loading="lazy"
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        />
                      </div>
                    )}

                    <div style={{ padding: "32px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3
                        style={{
                          fontSize: 22,
                          fontWeight: 500,
                          color: "#111",
                          margin: "0 0 20px",
                          fontFamily: SERIF,
                          lineHeight: 1.25,
                        }}
                      >
                        {f.name}
                      </h3>

                      {bullets.length > 0 && (
                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
                          {bullets.map((b, i) => (
                            <li
                              key={i}
                              style={{
                                fontSize: 14,
                                color: "#555",
                                padding: "7px 0",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 10,
                                borderBottom: i < bullets.length - 1 ? "1px solid #f0ebe4" : "none",
                                lineHeight: 1.6,
                              }}
                            >
                              <span style={{ color: "#c9a96e", flexShrink: 0, fontSize: 18, lineHeight: 1.2 }}>•</span>
                              <span>{b.replace(/^[•\-*]\s*/, "")}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div style={{ marginTop: "auto" }}>
                        <div style={{ height: 1, background: "#ede7de", marginBottom: 20 }} />

                        {/* Person selector */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                          {[1, 2].map((n) => {
                            const p = n === 1 ? f.price_1 : f.price_2;
                            const op = n === 1 ? f.old_price_1 : f.old_price_2;
                            const hasOld =
                              op && parseFloat(op) > 0 && parseFloat(op) > parseFloat(p || 0);
                            const selected = persons === n;
                            return (
                              <div
                                key={n}
                                onClick={() => setActivePersons((prev) => ({ ...prev, [f.id]: n }))}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 12,
                                  cursor: "pointer",
                                  padding: "11px 14px",
                                  borderRadius: 3,
                                  background: selected ? "#faf7f3" : "transparent",
                                  border: `1px solid ${selected ? "#c9a96e" : "#e8e2d9"}`,
                                  transition: "all 0.15s",
                                }}
                              >
                                <div
                                  style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    flexShrink: 0,
                                    border: selected ? "5px solid #c9a96e" : "2px solid #ccc",
                                    transition: "all 0.15s",
                                  }}
                                />
                                <span style={{ fontSize: 14, color: "#444", flex: 1 }}>
                                  Pour {n} personne{n > 1 ? "s" : ""}
                                </span>
                                <div style={{ textAlign: "right", lineHeight: 1.3 }}>
                                  {hasOld && (
                                    <div style={{ fontSize: 12, color: "#bbb", textDecoration: "line-through" }}>
                                      {op} TND
                                    </div>
                                  )}
                                  <span style={{ fontSize: 15, fontWeight: 700, color: hasOld ? "#c0392b" : "#111" }}>
                                    {p ? `${p} TND` : "—"}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Book button */}
                        <button
                          onClick={() => handleBook(f)}
                          style={{
                            width: "100%",
                            padding: "15px",
                            background: "#111",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            transition: "background 0.2s",
                            fontFamily: "system-ui, sans-serif",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#c9a96e")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
                        >
                          Reserver ce forfait
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ForfaitsPage;
