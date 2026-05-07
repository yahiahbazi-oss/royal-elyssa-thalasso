import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../lib/supabase";
import royalLogo from "../../assets/logo3.png";

const SERIF = "'Cormorant Garamond', Georgia, serif";

/* ---------- responsive helper styles injected once ---------- */
const CSS = `
  .fp-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
  }
  .fp-sec-header {
    padding: 110px 64px 80px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .fp-sec-title {
    font-size: clamp(52px, 7vw, 92px);
  }
  .fp-sec-desc {
    font-size: 18px;
    max-width: 780px;
    line-height: 2;
    margin-top: 28px;
  }
  .fp-card-pad { padding: 32px; }
  .fp-hero-logo { height: 64px; }
  .fp-nav-btn { padding: 18px 26px; font-size: 12px; }
  @media (max-width: 900px) {
    .fp-cards-grid { grid-template-columns: repeat(2, 1fr); }
    .fp-sec-header { padding: 72px 28px 52px; }
    .fp-sec-title { font-size: clamp(36px, 8vw, 60px) !important; }
    .fp-sec-desc { font-size: 16px; }
  }
  @media (max-width: 580px) {
    .fp-cards-grid { grid-template-columns: 1fr; gap: 2px; }
    .fp-sec-header { padding: 52px 20px 36px; }
    .fp-sec-title { font-size: clamp(32px, 9vw, 48px) !important; }
    .fp-sec-desc { font-size: 15px; margin-top: 18px; }
    .fp-card-pad { padding: 22px; }
    .fp-hero-logo { height: 48px; }
    .fp-nav-btn { padding: 16px 16px; font-size: 11px; letter-spacing: 1px; }
  }
`;

const ForfaitsPage = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [allForfaits, setAllForfaits] = useState([]);
  const [hero, setHero] = useState({ type: "image", url: "", title: "Forfaits", subtitle: "" });
  const [activeSection, setActiveSection] = useState("TOUS");
  const [activePersons, setActivePersons] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const KEYS = ["forfaits_hero_type", "forfaits_hero_url", "forfaits_hero_title", "forfaits_hero_subtitle"];
      const [{ data: secs }, { data: forfs }, { data: settings }] = await Promise.all([
        supabase.from("forfait_sections").select("*").eq("is_active", true).order("order_index"),
        supabase.from("forfaits").select("*").eq("is_active", true).order("order_index"),
        supabase.from("page_settings").select("*").in("key", KEYS),
      ]);
      setSections(secs || []);
      setAllForfaits(forfs || []);
      if (settings && settings.length > 0) {
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
  const filtered = activeSection === "TOUS" ? allForfaits : allForfaits.filter((f) => f.section_id === activeSection);
  const sectionBg = currentSection?.bg_color || "#f0ece4";

  const getBullets = (desc) => {
    if (!desc) return [];
    return desc.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  };

  return (
    <>
      <style>{CSS}</style>
      <SEO
        title="Forfaits Thalasso & Spa | Royal Elyssa Monastir"
        description="Decouvrez nos forfaits thalassotherapie a Monastir : soins exclusifs, circuits marins, cures bien-etre. Reservation en ligne."
        canonical="/forfaits"
      />

      {/* ── HERO 55vh ─────────────────────────────────── */}
      <div style={{ position: "relative", height: "55vh", minHeight: 340, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Background — img tag (same pattern as video, reliable) */}
        {hero.type === "video" && hero.url ? (
          <video autoPlay muted loop playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            src={hero.url} />
        ) : (
          <>
            {/* Dark gradient fallback always rendered */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a2a3a, #2d4a5a)" }} />
            {/* Image on top if URL set */}
            {hero.url && (
              <img
                src={hero.url}
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </>
        )}

        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.46)" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "#fff", padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={royalLogo} alt="Royal Elyssa" className="fp-hero-logo"
            style={{ marginBottom: 18, filter: "brightness(0) invert(1)", objectFit: "contain" }} />
          <div style={{ width: 48, height: 1, background: "#c9a96e", marginBottom: 22 }} />
          <h1 style={{ fontSize: "clamp(32px, 6vw, 68px)", fontWeight: 400, fontFamily: SERIF, margin: "0 0 12px", letterSpacing: 8, textTransform: "uppercase" }}>
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p style={{ fontSize: "clamp(13px, 2vw, 16px)", color: "rgba(255,255,255,0.82)", maxWidth: 520, margin: 0, lineHeight: 1.85, fontWeight: 300, fontFamily: SERIF, fontStyle: "italic" }}>
              {hero.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── STICKY CATEGORY NAV ──────────────────────── */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#111", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {[{ id: "TOUS", name: "Tous les forfaits" }, ...sections].map((s) => {
            const active = activeSection === s.id;
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className="fp-nav-btn"
                style={{
                  border: "none", cursor: "pointer", whiteSpace: "nowrap", background: "none",
                  fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", flexShrink: 0,
                  fontFamily: "system-ui, sans-serif",
                  color: active ? "#fff" : "rgba(255,255,255,0.4)",
                  borderBottom: active ? "2px solid #c9a96e" : "2px solid transparent",
                  transition: "all 0.2s",
                }}>
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN AREA ────────────────────────────────── */}
      <div style={{ background: sectionBg, minHeight: "60vh" }}>

        {/* ── SECTION HEADER — BIG, Nordik-style ──── */}
        {currentSection && (
          <div style={{ background: sectionBg, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
            <div className="fp-sec-header">
              <h2 className="fp-sec-title"
                style={{ fontFamily: SERIF, fontWeight: 500, color: "#1a1a1a", margin: 0, lineHeight: 1.05, letterSpacing: "-0.5px" }}>
                {currentSection.name}
              </h2>
              {currentSection.description && (
                <p className="fp-sec-desc"
                  style={{ color: "#333", fontWeight: 400, margin: "28px 0 0", lineHeight: 2, fontFamily: "system-ui, sans-serif" }}>
                  {currentSection.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── CARDS ────────────────────────────────── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: currentSection ? "40px 20px 80px" : "60px 20px 80px" }}>

          {loading && (
            <div style={{ textAlign: "center", padding: 80, color: "#aaa", fontSize: 16 }}>
              Chargement des forfaits…
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 80, color: "#999", fontSize: 16 }}>
              Aucun forfait disponible pour le moment.
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="fp-cards-grid">
              {filtered.map((f) => {
                const persons = activePersons[f.id] || 1;
                const bullets = getBullets(f.description);
                const currentPrice = persons === 1 ? f.price_1 : f.price_2;
                const oldPrice = persons === 1 ? f.old_price_1 : f.old_price_2;
                const hasDiscount = oldPrice && parseFloat(oldPrice) > 0 && parseFloat(oldPrice) > parseFloat(currentPrice || 0);
                const discountPct = hasDiscount ? Math.round((1 - parseFloat(currentPrice) / parseFloat(oldPrice)) * 100) : 0;

                return (
                  <div key={f.id} style={{ background: "#fff", display: "flex", flexDirection: "column", position: "relative" }}>

                    {/* Discount ribbon */}
                    {hasDiscount && (
                      <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2, background: "linear-gradient(135deg, #c0392b, #e74c3c)", color: "#fff", padding: "5px 12px", borderRadius: 2, fontSize: 13, fontWeight: 800, letterSpacing: 1, boxShadow: "0 2px 10px rgba(192,57,43,0.4)" }}>
                        -{discountPct}%
                      </div>
                    )}

                    {/* Card image */}
                    {f.image_url && (
                      <div style={{ height: 230, overflow: "hidden" }}>
                        <img src={f.image_url} alt={f.name} loading="lazy"
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                      </div>
                    )}

                    <div className="fp-card-pad" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* Card title */}
                      <h3 style={{ fontSize: "clamp(19px,2.5vw,24px)", fontWeight: 500, color: "#111", margin: "0 0 18px", fontFamily: SERIF, lineHeight: 1.2 }}>
                        {f.name}
                      </h3>

                      {/* Bullet points */}
                      {bullets.length > 0 && (
                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", flex: 1 }}>
                          {bullets.map((b, i) => (
                            <li key={i} style={{ fontSize: 14, color: "#555", padding: "7px 0", display: "flex", alignItems: "flex-start", gap: 10, borderBottom: i < bullets.length - 1 ? "1px solid #f0ebe4" : "none", lineHeight: 1.6 }}>
                              <span style={{ color: "#c9a96e", flexShrink: 0, fontSize: 18, lineHeight: 1.2 }}>•</span>
                              <span>{b.replace(/^[•\-*]\s*/, "")}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div style={{ marginTop: "auto" }}>
                        <div style={{ height: 1, background: "#ede7de", marginBottom: 18 }} />

                        {/* Person selector */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                          {[1, 2].map((n) => {
                            const p = n === 1 ? f.price_1 : f.price_2;
                            const op = n === 1 ? f.old_price_1 : f.old_price_2;
                            const hasOld = op && parseFloat(op) > 0 && parseFloat(op) > parseFloat(p || 0);
                            const selected = persons === n;
                            return (
                              <div key={n}
                                onClick={() => setActivePersons((prev) => ({ ...prev, [f.id]: n }))}
                                style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: "10px 13px", borderRadius: 3, background: selected ? "#faf7f3" : "transparent", border: `1px solid ${selected ? "#c9a96e" : "#e8e2d9"}`, transition: "all 0.15s" }}>
                                <div style={{ width: 17, height: 17, borderRadius: "50%", flexShrink: 0, border: selected ? "5px solid #c9a96e" : "2px solid #ccc", transition: "all 0.15s" }} />
                                <span style={{ fontSize: 14, color: "#444", flex: 1 }}>
                                  Pour {n} personne{n > 1 ? "s" : ""}
                                </span>
                                <div style={{ textAlign: "right", lineHeight: 1.3 }}>
                                  {hasOld && (
                                    <div style={{ fontSize: 12, color: "#bbb", textDecoration: "line-through" }}>{op} TND</div>
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
                          onClick={() => navigate(`/booking?forfaitId=${f.id}&persons=${activePersons[f.id] || 1}`)}
                          style={{ width: "100%", padding: "14px", background: "#111", color: "#fff", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", transition: "background 0.2s", fontFamily: "system-ui, sans-serif" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#c9a96e")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}>
                          Réserver ce forfait
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