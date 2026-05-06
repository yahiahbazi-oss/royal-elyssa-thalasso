import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../lib/supabase";

const ForfaitsPage = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [allForfaits, setAllForfaits] = useState([]);
  const [activeSection, setActiveSection] = useState("TOUS");
  const [activePersons, setActivePersons] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: secs }, { data: forfs }] = await Promise.all([
        supabase.from("forfait_sections").select("*").eq("is_active", true).order("order_index"),
        supabase.from("forfaits").select("*").eq("is_active", true).order("order_index"),
      ]);
      setSections(secs || []);
      setAllForfaits(forfs || []);
      setLoading(false);
    })();
  }, []);

  const filtered =
    activeSection === "TOUS"
      ? allForfaits
      : allForfaits.filter((f) => f.section_id === activeSection);

  const sectionById = Object.fromEntries(sections.map((s) => [s.id, s]));

  const handleBook = (f) => {
    const p = activePersons[f.id] || 1;
    navigate(`/booking?forfaitId=${f.id}&persons=${p}`);
  };

  return (
    <>
      <SEO
        title="Forfaits Thalasso & Spa | Royal Elyssa Monastir"
        description="Decouvrez nos forfaits thalassotherapie a Monastir : soins exclusifs, circuits marins, cures bien-etre. Reservation en ligne."
        canonical="/forfaits"
      />

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1a2a3a 0%, #2d4a5a 50%, #1a3040 100%)",
        color: "#fff", textAlign: "center", padding: "80px 20px 60px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.2,
          background: "url('https://res.cloudinary.com/dxoje33mm/image/upload/q_auto,f_webp,w_1400/v1759477822/thalion-royalelyssa.jpg__3876x1912_q85_crop_subsampling-2_upscale_qxd1c0.jpg') center/cover no-repeat",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Link to="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, display: "inline-block", marginBottom: 24 }}>
            &larr; Retour a l&apos;accueil
          </Link>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", marginBottom: 10 }}>
            Royal Elyssa Thalasso &amp; Spa
          </p>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 54px)", fontWeight: 300, fontFamily: "Georgia, serif", margin: "0 0 16px", letterSpacing: 2 }}>
            Nos Forfaits
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
            Des programmes de bien-etre soigneusement concus pour chaque besoin.
            Chaque forfait inclut l&apos;acces au parcours marin et au hammam vapeur.
          </p>
        </div>
      </div>

      {/* Category tabs */}
      {!loading && sections.length > 0 && (
        <div style={{
          background: "#1a2a3a", overflowX: "auto",
          display: "flex", gap: 0, scrollbarWidth: "none",
        }}>
          {[{ id: "TOUS", name: "TOUS" }, ...sections].map((s) => {
            const active = activeSection === s.id;
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                style={{
                  padding: "14px 22px", border: "none", cursor: "pointer", whiteSpace: "nowrap",
                  background: "none", fontWeight: 700, fontSize: 12, letterSpacing: 1.5,
                  color: active ? "#c9a96e" : "rgba(255,255,255,0.55)",
                  borderBottom: active ? "3px solid #c9a96e" : "3px solid transparent",
                  transition: "all 0.2s",
                }}>
                {s.name.toUpperCase()}
              </button>
            );
          })}
        </div>
      )}

      {/* Content */}
      <div style={{ background: "#f5f0ea", minHeight: "60vh", padding: "48px 20px 80px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>

          {loading && (
            <div style={{ textAlign: "center", padding: 80, color: "#bbb", fontSize: 16 }}>
              Chargement des forfaits...
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 80, color: "#aaa", fontSize: 16 }}>
              Aucun forfait disponible pour le moment.
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 28,
            }}>
              {filtered.map((f) => {
                const persons = activePersons[f.id] || 1;
                const price = persons === 1 ? f.price_1 : f.price_2;
                const sec = sectionById[f.section_id];

                return (
                  <div key={f.id} style={{
                    background: "#fff", borderRadius: 16, overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                    display: "flex", flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.13)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; }}>

                    {/* Image */}
                    {f.image_url ? (
                      <div style={{ height: 200, overflow: "hidden" }}>
                        <img src={f.image_url} alt={f.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          loading="lazy" />
                      </div>
                    ) : (
                      <div style={{ height: 8, background: "#c9a96e" }} />
                    )}

                    <div style={{ padding: "24px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                      {sec && (
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#c9a96e", textTransform: "uppercase", marginBottom: 6, display: "block" }}>
                          {sec.name}
                        </span>
                      )}

                      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: "0 0 10px", fontFamily: "Georgia, serif" }}>
                        {f.name}
                      </h3>

                      {f.description && (
                        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: "0 0 18px" }}>
                          {f.description}
                        </p>
                      )}

                      <div style={{ marginTop: "auto" }}>
                        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                          {[1, 2].map(n => (
                            <button key={n}
                              onClick={() => setActivePersons(p => ({ ...p, [f.id]: n }))}
                              style={{
                                flex: 1, padding: "8px", border: persons === n ? "2px solid #c9a96e" : "2px solid #e0d8cc",
                                borderRadius: 7, background: persons === n ? "#c9a96e" : "#fff",
                                color: persons === n ? "#fff" : "#888", cursor: "pointer",
                                fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                              }}>
                              {n} pers.
                            </button>
                          ))}
                        </div>

                        <div style={{ textAlign: "center", marginBottom: 16 }}>
                          <span style={{ fontSize: 28, fontWeight: 800, color: "#1a2a3a" }}>{price || "---"}</span>
                          {price ? <span style={{ fontSize: 14, color: "#999", marginLeft: 4 }}>TND</span> : null}
                          <div style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>
                            pour {persons} personne{persons > 1 ? "s" : ""}
                          </div>
                        </div>

                        <button onClick={() => handleBook(f)}
                          style={{
                            width: "100%", padding: "13px", background: "#1a2a3a",
                            color: "#fff", border: "none", borderRadius: 8,
                            fontSize: 13, fontWeight: 700, cursor: "pointer",
                            letterSpacing: 1, transition: "background 0.2s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "#c9a96e"}
                          onMouseLeave={e => e.currentTarget.style.background = "#1a2a3a"}>
                          RESERVER CE FORFAIT
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
