import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const S = {
  page: { minHeight: "100vh", background: "#f0ece4", fontFamily: "system-ui, sans-serif" },
  header: {
    background: "#1a2a3a", color: "#fff", padding: "16px 32px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  tab: (active) => ({
    padding: "10px 22px", border: "none", cursor: "pointer", fontWeight: 700,
    fontSize: 13, letterSpacing: 1, borderBottom: active ? "3px solid #c9a96e" : "3px solid transparent",
    background: "none", color: active ? "#c9a96e" : "rgba(255,255,255,0.6)",
    transition: "all 0.2s",
  }),
  card: {
    background: "#fff", borderRadius: 12, padding: 24,
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 16,
  },
  input: {
    padding: "10px 14px", borderRadius: 8, border: "1.5px solid #e0d8cc",
    fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box",
  },
  btn: (color = "#1a2a3a") => ({
    padding: "9px 18px", background: color, color: "#fff", border: "none",
    borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 13,
  }),
  btnGhost: {
    padding: "9px 18px", background: "transparent", color: "#1a2a3a",
    border: "1.5px solid #ccc", borderRadius: 7, cursor: "pointer",
    fontWeight: 600, fontSize: 13,
  },
  badge: (status) => ({
    padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
    background: status === "confirmed" ? "#d4edda" : status === "cancelled" ? "#f8d7da" : "#fff3cd",
    color: status === "confirmed" ? "#155724" : status === "cancelled" ? "#721c24" : "#856404",
  }),
  row: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
};

const GOVERNORATES = [
  "Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan",
  "Kasserine","Kébili","Le Kef","Mahdia","La Manouba","Médenine","Monastir",
  "Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan",
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("reservations");
  const [msg, setMsg] = useState("");

  // Sections state
  const [sections, setSections] = useState([]);
  const [sForm, setSForm] = useState({ name: "", description: "" });
  const [editingSection, setEditingSection] = useState(null);

  // Forfaits state
  const [forfaits, setForfaits] = useState([]);
  const [selSectionId, setSelSectionId] = useState("");
  const [fForm, setFForm] = useState({ name: "", image_url: "", description: "", price_1: "", price_2: "" });
  const [editingForfait, setEditingForfait] = useState(null);

  // Reservations state
  const [reservations, setReservations] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  // Auth guard
  useEffect(() => {
    if (sessionStorage.getItem("re_admin") !== "true") navigate("/admin/login", { replace: true });
  }, [navigate]);

  const showMsg = (text) => { setMsg(text); setTimeout(() => setMsg(""), 3000); };

  // ── Load functions ──────────────────────────────────────
  const loadSections = useCallback(async () => {
    const { data } = await supabase.from("forfait_sections").select("*").order("order_index");
    if (data) setSections(data);
  }, []);

  const loadForfaits = useCallback(async (sid) => {
    if (!sid) { setForfaits([]); return; }
    const { data } = await supabase.from("forfaits").select("*").eq("section_id", sid).order("order_index");
    if (data) setForfaits(data);
  }, []);

  const loadReservations = useCallback(async () => {
    const { data } = await supabase.from("reservations").select("*").order("created_at", { ascending: false });
    if (data) setReservations(data);
  }, []);

  useEffect(() => { loadSections(); loadReservations(); }, [loadSections, loadReservations]);
  useEffect(() => { loadForfaits(selSectionId); }, [selSectionId, loadForfaits]);

  // ── Section CRUD ────────────────────────────────────────
  const addSection = async () => {
    if (!sForm.name.trim()) return;
    const order = sections.length;
    const { error } = await supabase.from("forfait_sections").insert({ ...sForm, order_index: order });
    if (!error) { setSForm({ name: "", description: "" }); await loadSections(); showMsg("✓ Section ajoutée"); }
  };

  const updateSection = async () => {
    await supabase.from("forfait_sections").update(sForm).eq("id", editingSection.id);
    setEditingSection(null); setSForm({ name: "", description: "" });
    await loadSections(); showMsg("✓ Section mise à jour");
  };

  const deleteSection = async (id) => {
    if (!window.confirm("Supprimer cette section et tous ses forfaits ?")) return;
    await supabase.from("forfait_sections").delete().eq("id", id);
    await loadSections(); showMsg("✓ Section supprimée");
  };

  const toggleSection = async (id, cur) => {
    await supabase.from("forfait_sections").update({ is_active: !cur }).eq("id", id);
    await loadSections();
  };

  const moveSection = async (id, dir) => {
    const idx = sections.findIndex(s => s.id === id);
    if (dir === "up" && idx === 0) return;
    if (dir === "down" && idx === sections.length - 1) return;
    const si = dir === "up" ? idx - 1 : idx + 1;
    const a = sections[idx], b = sections[si];
    await Promise.all([
      supabase.from("forfait_sections").update({ order_index: b.order_index }).eq("id", a.id),
      supabase.from("forfait_sections").update({ order_index: a.order_index }).eq("id", b.id),
    ]);
    await loadSections();
  };

  const startEditSection = (s) => {
    setEditingSection(s);
    setSForm({ name: s.name, description: s.description || "" });
  };

  // ── Forfait CRUD ────────────────────────────────────────
  const addForfait = async () => {
    if (!fForm.name.trim() || !selSectionId) return;
    const order = forfaits.length;
    await supabase.from("forfaits").insert({
      ...fForm, section_id: selSectionId, order_index: order,
      price_1: parseFloat(fForm.price_1) || 0,
      price_2: parseFloat(fForm.price_2) || 0,
    });
    setFForm({ name: "", image_url: "", description: "", price_1: "", price_2: "" });
    await loadForfaits(selSectionId); showMsg("✓ Forfait ajouté");
  };

  const updateForfait = async () => {
    await supabase.from("forfaits").update({
      ...fForm,
      price_1: parseFloat(fForm.price_1) || 0,
      price_2: parseFloat(fForm.price_2) || 0,
    }).eq("id", editingForfait.id);
    setEditingForfait(null);
    setFForm({ name: "", image_url: "", description: "", price_1: "", price_2: "" });
    await loadForfaits(selSectionId); showMsg("✓ Forfait mis à jour");
  };

  const deleteForfait = async (id) => {
    if (!window.confirm("Supprimer ce forfait ?")) return;
    await supabase.from("forfaits").delete().eq("id", id);
    await loadForfaits(selSectionId); showMsg("✓ Forfait supprimé");
  };

  const toggleForfait = async (id, cur) => {
    await supabase.from("forfaits").update({ is_active: !cur }).eq("id", id);
    await loadForfaits(selSectionId);
  };

  const moveForfait = async (id, dir) => {
    const idx = forfaits.findIndex(f => f.id === id);
    if (dir === "up" && idx === 0) return;
    if (dir === "down" && idx === forfaits.length - 1) return;
    const si = dir === "up" ? idx - 1 : idx + 1;
    const a = forfaits[idx], b = forfaits[si];
    await Promise.all([
      supabase.from("forfaits").update({ order_index: b.order_index }).eq("id", a.id),
      supabase.from("forfaits").update({ order_index: a.order_index }).eq("id", b.id),
    ]);
    await loadForfaits(selSectionId);
  };

  const startEditForfait = (f) => {
    setEditingForfait(f);
    setFForm({ name: f.name, image_url: f.image_url || "", description: f.description || "", price_1: String(f.price_1 || ""), price_2: String(f.price_2 || "") });
  };

  // ── Reservation status ──────────────────────────────────
  const updateStatus = async (id, status) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    await loadReservations();
  };

  const deleteReservation = async (id) => {
    if (!window.confirm("Supprimer cette réservation ?")) return;
    await supabase.from("reservations").delete().eq("id", id);
    await loadReservations();
  };

  const filtered = statusFilter === "all" ? reservations : reservations.filter(r => r.status === statusFilter);

  if (sessionStorage.getItem("re_admin") !== "true") return null;

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>🏨 Royal Elyssa</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>|</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Administration</span>
        </div>
        <div style={S.row}>
          <a href="/forfaits" target="_blank" style={{ color: "#c9a96e", fontSize: 13, textDecoration: "none" }}>
            Voir le site ↗
          </a>
          <button onClick={() => { sessionStorage.removeItem("re_admin"); navigate("/admin/login"); }}
            style={{ ...S.btn("#c0392b"), fontSize: 12 }}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#1a2a3a", display: "flex", paddingLeft: 24 }}>
        {[["reservations","📋 Réservations"], ["sections","📂 Sections"], ["forfaits","🎁 Forfaits"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={S.tab(tab === key)}>{label}</button>
        ))}
      </div>

      {/* Toast */}
      {msg && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          background: "#27ae60", color: "#fff", padding: "12px 24px",
          borderRadius: 8, fontWeight: 700, fontSize: 14,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>{msg}</div>
      )}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>

        {/* ═══════════════ RESERVATIONS TAB ═══════════════ */}
        {tab === "reservations" && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ margin: 0, color: "#1a2a3a", fontSize: 22 }}>
                Réservations <span style={{ color: "#999", fontWeight: 400, fontSize: 16 }}>({filtered.length})</span>
              </h2>
              <div style={S.row}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>Statut :</label>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                  style={{ ...S.input, width: "auto", padding: "8px 12px" }}>
                  <option value="all">Tous</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmé</option>
                  <option value="cancelled">Annulé</option>
                </select>
                <button onClick={loadReservations} style={S.btnGhost}>↻ Rafraîchir</button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ ...S.card, textAlign: "center", color: "#999", padding: 48 }}>
                Aucune réservation trouvée.
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                  <thead>
                    <tr style={{ background: "#f5f0ea" }}>
                      {["Date","Heure","Client","Tél","Forfait","Pers.","Prix","Gouvernorat","Adresse","Statut","Actions"].map(h => (
                        <th key={h} style={{ padding: "12px 14px", fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "#555", textAlign: "left", whiteSpace: "nowrap" }}>{h.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => (
                      <tr key={r.id} style={{ borderTop: "1px solid #f0ebe4", background: i % 2 === 0 ? "#fff" : "#faf8f5" }}>
                        <td style={{ padding: "12px 14px", fontSize: 13, whiteSpace: "nowrap" }}>{r.booking_date}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13 }}>{r.booking_time}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600 }}>{r.client_name}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13 }}>
                          <a href={`tel:${r.phone}`} style={{ color: "#1a2a3a", textDecoration: "none" }}>{r.phone}</a>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 13 }}>
                          <div style={{ fontWeight: 600 }}>{r.forfait_name}</div>
                          <div style={{ fontSize: 11, color: "#999" }}>{r.section_name}</div>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 13, textAlign: "center" }}>{r.persons}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{r.price ? `${r.price} TND` : "-"}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13 }}>{r.governorate}</td>
                        <td style={{ padding: "12px 14px", fontSize: 12, maxWidth: 160, color: "#555" }}>{r.address}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={S.badge(r.status)}>
                            {r.status === "confirmed" ? "Confirmé" : r.status === "cancelled" ? "Annulé" : "En attente"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ display: "flex", gap: 6, flexWrap: "nowrap" }}>
                            {r.status !== "confirmed" && (
                              <button onClick={() => updateStatus(r.id, "confirmed")} title="Confirmer"
                                style={{ ...S.btn("#27ae60"), padding: "5px 10px", fontSize: 12 }}>✓</button>
                            )}
                            {r.status !== "cancelled" && (
                              <button onClick={() => updateStatus(r.id, "cancelled")} title="Annuler"
                                style={{ ...S.btn("#e74c3c"), padding: "5px 10px", fontSize: 12 }}>✕</button>
                            )}
                            <button onClick={() => deleteReservation(r.id)} title="Supprimer"
                              style={{ ...S.btn("#999"), padding: "5px 10px", fontSize: 12 }}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ═══════════════ SECTIONS TAB ═══════════════ */}
        {tab === "sections" && (
          <>
            <h2 style={{ color: "#1a2a3a", marginBottom: 20 }}>Gestion des Sections</h2>

            {/* Add/Edit form */}
            <div style={S.card}>
              <h3 style={{ margin: "0 0 16px", color: "#1a2a3a", fontSize: 16 }}>
                {editingSection ? "✏ Modifier la section" : "＋ Nouvelle section"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto auto", gap: 12, alignItems: "end" }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 5 }}>NOM *</label>
                  <input style={S.input} placeholder="Ex: Fête des Mères" value={sForm.name}
                    onChange={e => setSForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 5 }}>DESCRIPTION</label>
                  <input style={S.input} placeholder="Description courte de la section"
                    value={sForm.description} onChange={e => setSForm(p => ({ ...p, description: e.target.value }))} />
                </div>
                <button onClick={editingSection ? updateSection : addSection}
                  style={S.btn(editingSection ? "#27ae60" : "#1a2a3a")}>
                  {editingSection ? "Mettre à jour" : "Ajouter"}
                </button>
                {editingSection && (
                  <button onClick={() => { setEditingSection(null); setSForm({ name: "", description: "" }); }}
                    style={S.btnGhost}>Annuler</button>
                )}
              </div>
            </div>

            {/* List */}
            {sections.length === 0 ? (
              <div style={{ ...S.card, textAlign: "center", color: "#999", padding: 40 }}>
                Aucune section. Ajoutez-en une ci-dessus.
              </div>
            ) : (
              sections.map((s, i) => (
                <div key={s.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <button onClick={() => moveSection(s.id, "up")} disabled={i === 0}
                      style={{ background: "none", border: "1px solid #ddd", borderRadius: 4, cursor: i === 0 ? "default" : "pointer", fontSize: 12, padding: "2px 6px", opacity: i === 0 ? 0.3 : 1 }}>▲</button>
                    <button onClick={() => moveSection(s.id, "down")} disabled={i === sections.length - 1}
                      style={{ background: "none", border: "1px solid #ddd", borderRadius: 4, cursor: i === sections.length - 1 ? "default" : "pointer", fontSize: 12, padding: "2px 6px", opacity: i === sections.length - 1 ? 0.3 : 1 }}>▼</button>
                  </div>
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <div style={{ fontWeight: 700, color: "#1a2a3a", fontSize: 16 }}>{s.name}</div>
                    {s.description && <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{s.description}</div>}
                  </div>
                  <div style={S.row}>
                    <button onClick={() => toggleSection(s.id, s.is_active)}
                      style={{ ...S.btn(s.is_active ? "#27ae60" : "#999"), padding: "7px 14px", fontSize: 12 }}>
                      {s.is_active ? "● Actif" : "○ Inactif"}
                    </button>
                    <button onClick={() => startEditSection(s)} style={S.btnGhost}>✏ Modifier</button>
                    <button onClick={() => deleteSection(s.id)} style={{ ...S.btn("#e74c3c"), padding: "7px 14px" }}>🗑</button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* ═══════════════ FORFAITS TAB ═══════════════ */}
        {tab === "forfaits" && (
          <>
            <h2 style={{ color: "#1a2a3a", marginBottom: 20 }}>Gestion des Forfaits</h2>

            {/* Section selector */}
            <div style={{ ...S.card, marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#555", display: "block", marginBottom: 8 }}>
                Choisir une section :
              </label>
              <select value={selSectionId} onChange={e => setSelSectionId(e.target.value)}
                style={{ ...S.input, maxWidth: 340 }}>
                <option value="">— Sélectionner —</option>
                {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            {selSectionId && (
              <>
                {/* Add/Edit form */}
                <div style={S.card}>
                  <h3 style={{ margin: "0 0 16px", color: "#1a2a3a", fontSize: 16 }}>
                    {editingForfait ? "✏ Modifier le forfait" : "＋ Nouveau forfait"}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 5 }}>NOM *</label>
                      <input style={S.input} placeholder="Nom du forfait" value={fForm.name}
                        onChange={e => setFForm(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 5 }}>URL IMAGE</label>
                      <input style={S.input} placeholder="https://... (URL Cloudinary ou autre)"
                        value={fForm.image_url} onChange={e => setFForm(p => ({ ...p, image_url: e.target.value }))} />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 5 }}>DESCRIPTION</label>
                      <textarea style={{ ...S.input, minHeight: 80, resize: "vertical" }}
                        placeholder="Description du forfait (inclus, détails...)"
                        value={fForm.description} onChange={e => setFForm(p => ({ ...p, description: e.target.value }))} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 5 }}>PRIX 1 PERSONNE (TND)</label>
                      <input type="number" style={S.input} placeholder="Ex: 350" value={fForm.price_1}
                        onChange={e => setFForm(p => ({ ...p, price_1: e.target.value }))} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 5 }}>PRIX 2 PERSONNES (TND)</label>
                      <input type="number" style={S.input} placeholder="Ex: 620" value={fForm.price_2}
                        onChange={e => setFForm(p => ({ ...p, price_2: e.target.value }))} />
                    </div>
                  </div>
                  {fForm.image_url && (
                    <div style={{ marginTop: 12 }}>
                      <img src={fForm.image_url} alt="Preview" style={{ height: 80, borderRadius: 8, objectFit: "cover" }}
                        onError={e => e.target.style.display = "none"} />
                    </div>
                  )}
                  <div style={{ ...S.row, marginTop: 16 }}>
                    <button onClick={editingForfait ? updateForfait : addForfait}
                      style={S.btn(editingForfait ? "#27ae60" : "#1a2a3a")}>
                      {editingForfait ? "Mettre à jour" : "Ajouter le forfait"}
                    </button>
                    {editingForfait && (
                      <button onClick={() => { setEditingForfait(null); setFForm({ name: "", image_url: "", description: "", price_1: "", price_2: "" }); }}
                        style={S.btnGhost}>Annuler</button>
                    )}
                  </div>
                </div>

                {/* Forfait list */}
                {forfaits.length === 0 ? (
                  <div style={{ ...S.card, textAlign: "center", color: "#999", padding: 40 }}>
                    Aucun forfait dans cette section.
                  </div>
                ) : (
                  forfaits.map((f, i) => (
                    <div key={f.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <button onClick={() => moveForfait(f.id, "up")} disabled={i === 0}
                          style={{ background: "none", border: "1px solid #ddd", borderRadius: 4, cursor: i === 0 ? "default" : "pointer", fontSize: 12, padding: "2px 6px", opacity: i === 0 ? 0.3 : 1 }}>▲</button>
                        <button onClick={() => moveForfait(f.id, "down")} disabled={i === forfaits.length - 1}
                          style={{ background: "none", border: "1px solid #ddd", borderRadius: 4, cursor: i === forfaits.length - 1 ? "default" : "pointer", fontSize: 12, padding: "2px 6px", opacity: i === forfaits.length - 1 ? 0.3 : 1 }}>▼</button>
                      </div>
                      {f.image_url && (
                        <img src={f.image_url} alt={f.name}
                          style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
                          onError={e => e.target.style.display = "none"} />
                      )}
                      <div style={{ flex: 1, minWidth: 160 }}>
                        <div style={{ fontWeight: 700, color: "#1a2a3a", fontSize: 16 }}>{f.name}</div>
                        {f.description && <div style={{ fontSize: 12, color: "#888", marginTop: 2, maxWidth: 400 }}>{f.description.slice(0, 80)}{f.description.length > 80 ? "…" : ""}</div>}
                        <div style={{ fontSize: 13, color: "#c9a96e", fontWeight: 700, marginTop: 4 }}>
                          1p: {f.price_1} TND &nbsp;·&nbsp; 2p: {f.price_2} TND
                        </div>
                      </div>
                      <div style={S.row}>
                        <button onClick={() => toggleForfait(f.id, f.is_active)}
                          style={{ ...S.btn(f.is_active ? "#27ae60" : "#999"), padding: "7px 14px", fontSize: 12 }}>
                          {f.is_active ? "● Actif" : "○ Inactif"}
                        </button>
                        <button onClick={() => startEditForfait(f)} style={S.btnGhost}>✏ Modifier</button>
                        <button onClick={() => deleteForfait(f.id)} style={{ ...S.btn("#e74c3c"), padding: "7px 14px" }}>🗑</button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
