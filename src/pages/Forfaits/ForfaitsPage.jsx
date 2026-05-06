import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../lib/supabase";

const ForfaitsPage = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [allForfaits, setAllForfaits] = useState([]);
  const [hero, setHero] = useState({ type: "image", url: "" });
  const [activeSection, setActiveSection] = useState("TOUS");
  const [activePersons, setActivePersons] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: secs }, { data: forfs }, { data: settings }] = await Promise.all([
        supabase.from("forfait_sections").select("*").eq("is_active", true).order("order_index"),
        supabase.from("forfaits").select("*").eq("is_active", true).order("order_index"),
        supabase.from("page_settings").select("*").in("key", ["forfaits_hero_type", "forfaits_hero_url"]),
      ]);
      setSections(secs || []);
      setAllForfaits(forfs || []);
      if (settings) {
        const t = settings.find(s => s.key === "forfaits_hero_type")?.value || "image";
        const u = settings.find(s => s.key === "forfaits_hero_url")?.value || "";
        setHero({ type: t, url: u });
      }
      setLoading(false);
    })();
  }, []);

  const currentSection = sections.find(s => s.id === activeSection);
  const filtered = activeSection === "TOUS" ? allForfaits : allForfaits.filter(f => f.section_id === activeSection);

  const handleBook = (f) => {
    const p = activePersons[f.id] || 1;
    navigate(`/booking?forfaitId=${f.id}&persons=${p}`);
  };

  const getBullets = (desc) => {
    if (!desc) return [];
    return desc.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  };

  return (
    <>
      <SEO
        title="Forfaits Thalasso & Spa | Royal Elyssa Monastir"
        description="Decouvrez nos forfaits thalassotherapie a Monastir : soins exclusifs, circuits marins, cures bien-etre. Reservation en ligne."
        canonical="/forfaits"
      />

      {/* HERO */}
      <div style={{ position: "relative", height: "100vh", minHeight: 500, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {hero.type === "video" && hero.url ? (
          <video autoPlay muted loop playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            src={hero.url} />
        ) : hero.url ? (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${hero.url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a2a3a, #2d4a5a)" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "#fff", padding: "0 20px" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 11, letterSpacing: 4, display: "block", marginBottom: 36, textTransform: "uppercase" }}>
            Retour a l&apos;accueil
          </Link>
          <p style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: "#c9a96e", margin: "0 0 18px" }}>
            Royal Elyssa Thalasso &amp; Spa
          </p>
          <h1 style={{ fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 300, fontFamily: "Georgia, serif", margin: "0 0 20px", letterSpacing: 10, textTransform: "uppercase" }}>
            Forfaits
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", maxWidth: 560, margin: "0 auto", lineHeight: 1.9, fontWeight: 300 }}>
            Parfaitement assembles, nos forfaits proposent un grand choix d&apos;experiences pour votre bien-etre.
          </p>
          <div style={{ width: 1, height: 64, background: "rgba(201,169,110,0.5)", margin: "48px auto 0" }} />
        </div>
      </div>

      {/* STICKY CATEGORY NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#111", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
          {[{ id: "TOUS", name: "Tous les forfaits" }, ...sections].map(s => {
            const active = activeSection === s.id;
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                style={{
                  padding: "18px 26px", border: "none", cursor: "pointer", whiteSpace: "nowrap",
                  background: "none", fontWeight: 600, fontSize: 12, letterSpacing: 2,
                  textTransform: "uppercase", flexShrink: 0,
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

      {/* SECTION HEADER */}
      {currentSection && (
        <div style={{ background: "#fff", borderBottom: "1px solid #ede7de", padding: "60px 20px 52px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontFamily: "Georgia, serif", fontWeight: 400, color: "#111", margin: "0 0 20px", letterSpacing: 1 }}>
              {currentSection.name}
            </h2>
            {currentSection.description && (
              <p style={{ fontSize: 16, color: "#666", lineHeight: 1.9, fontWeight: 300, maxWidth: 600, margin: "0 auto" }}>
                {currentSection.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* CARDS */}
      <div style={{ background: "#f5f2ee", minHeight: "60vh", padding: "56px 20px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 3 }}>
              {filtered.map(f => {
                const persons = activePersons[f.id] || 1;
                const bullets = getBullets(f.description);

                return (
                  <div key={f.id} style={{ background: "#fff", display: "flex", flexDirection: "column" }}>
                    {f.image_url && (
                      <div style={{ height: 220, overflow: "hidden" }}>
                        <img src={f.image_url} alt={f.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                          loading="lazy"
                          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
                      </div>
                    )}

                    <div style={{ padding: "32px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: 19, fontWeight: 700, color: "#111", margin: "0 0 20px", fontFamily: "Georgia, serif" }}>
                        {f.name}
                      </h3>

                      {bullets.length > 0 && (
                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
                          {bullets.map((b, i) => (
                            <li key={i} style={{
                              fontSize: 14, color: "#555", padding: "7px 0",
                              display: "flex", alignItems: "flex-start", gap: 10,
                              borderBottom: i < bullets.length - 1 ? "1px solid #f0ebe4" : "none",
                              lineHeight: 1.6,
                            }}>
                              <span style={{ color: "#c9a96e", flexShrink: 0, fontSize: 18, lineHeight: 1.2 }}>•</span>
                              <span>{b.replace(/^[•\-\*]\s*/, "")}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div style={{ marginTop: "auto" }}>
                        <div style={{ height: 1, background: "#ede7de", marginBottom: 20 }} />

                        {/* Person radio selector */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                          {[1, 2].map(n => {
                            const p = n === 1 ? f.price_1 : f.price_2;
                            const selected = persons === n;
                            return (
                              <div key={n} onClick={() => setActivePersons(prev => ({ ...prev, [f.id]: n }))}
                                style={{
                                  display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                                  padding: "11px 14px", borderRadius: 3,
                                  background: selected ? "#faf7f3" : "transparent",
                                  border: `1px solid ${selected ? "#c9a96e" : "#e8e2d9"}`,
                                  transition: "all 0.15s",
                                }}>
                                <div style={{
                                  width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                                  border: selected ? "5px solid #c9a96e" : "2px solid #ccc",
                                  transition: "all 0.15s",
                                }} />
                                <span style={{ fontSize: 14, color: "#444", flex: 1 }}>
                                  Pour {n} personne{n > 1 ? "s" : ""}
                                </span>
                                <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>
                                  {p ? `${p} TND` : "---"}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <button onClick={() => handleBook(f)}
                          style={{
                            width: "100%", padding: "15px", background: "#111",
                            color: "#fff", border: "none", cursor: "pointer",
                            fontSize: 12, fontWeight: 700, letterSpacing: 2,
                            textTransform: "uppercase", transition: "background 0.2s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "#c9a96e"}
                          onMouseLeave={e => e.currentTarget.style.background = "#111"}>
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
