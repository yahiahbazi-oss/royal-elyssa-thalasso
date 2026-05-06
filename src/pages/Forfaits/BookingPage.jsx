import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import SEO from "../../components/SEO";
import Footer from "../../components/Footer/Footer";

const GOVERNORATES = [
  "Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan",
  "Kasserine","Kébili","Le Kef","Mahdia","La Manouba","Médenine","Monastir",
  "Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan",
];

const TIME_SLOTS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];

const BookingPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const forfaitId = params.get("forfaitId");
  const personsParam = parseInt(params.get("persons") || "1");

  const [forfait, setForfait] = useState(null);
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    client_name: "", phone: "", booking_date: "", booking_time: "",
    address: "", governorate: "", persons: personsParam,
  });

  useEffect(() => {
    if (!forfaitId) { navigate("/forfaits"); return; }
    (async () => {
      const { data: f } = await supabase.from("forfaits").select("*").eq("id", forfaitId).single();
      if (!f) { navigate("/forfaits"); return; }
      setForfait(f);
      const { data: s } = await supabase.from("forfait_sections").select("name").eq("id", f.section_id).single();
      if (s) setSection(s);
      setLoading(false);
    })();
  }, [forfaitId, navigate]);

  const price = forfait ? (form.persons === 1 ? forfait.price_1 : forfait.price_2) : 0;
  const today = new Date().toISOString().split("T")[0];

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.client_name || !form.phone || !form.booking_date || !form.booking_time || !form.address || !form.governorate) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setSubmitting(true);
    const { error: err } = await supabase.from("reservations").insert({
      forfait_id: forfaitId,
      forfait_name: forfait.name,
      section_name: section?.name || "",
      persons: form.persons,
      price: price,
      client_name: form.client_name,
      phone: form.phone,
      booking_date: form.booking_date,
      booking_time: form.booking_time,
      address: form.address,
      governorate: form.governorate,
      status: "pending",
    });
    setSubmitting(false);
    if (err) { setError("Une erreur est survenue. Veuillez réessayer."); return; }
    setSuccess(true);
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 8,
    border: "1.5px solid #e0d8cc", fontSize: 15, boxSizing: "border-box",
    outline: "none", background: "#fff",
  };

  const labelStyle = {
    fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
    color: "#666", display: "block", marginBottom: 6, textTransform: "uppercase",
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f6f0" }}>
      <div style={{ color: "#999", fontSize: 16 }}>Chargement…</div>
    </div>
  );

  if (success) return (
    <>
      <div style={{ minHeight: "100vh", background: "#f9f6f0", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 48, maxWidth: 480, width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontSize: 26, color: "#1a2a3a", fontFamily: "Georgia, serif", margin: "0 0 12px" }}>
            Réservation envoyée !
          </h2>
          <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7, margin: "0 0 24px" }}>
            Votre réservation pour <strong>{forfait.name}</strong> a bien été reçue.
            Notre équipe vous contactera au <strong>{form.phone}</strong> pour confirmer.
          </p>
          <div style={{ background: "#f9f6f0", borderRadius: 12, padding: 20, marginBottom: 28, textAlign: "left" }}>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 2 }}>
              <div>📅 <strong>Date :</strong> {form.booking_date} à {form.booking_time}</div>
              <div>👤 <strong>Personnes :</strong> {form.persons}</div>
              <div>💰 <strong>Prix :</strong> {price} TND</div>
              <div>📍 <strong>Livraison :</strong> {form.governorate}</div>
            </div>
          </div>
          <a
            href={`https://wa.me/21673520589?text=Bonjour, j'ai réservé le forfait ${encodeURIComponent(forfait.name)} le ${form.booking_date}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", background: "#25D366", color: "#fff", padding: "14px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 15, marginBottom: 12 }}
          >
            📱 Confirmer via WhatsApp
          </a>
          <button onClick={() => navigate("/forfaits")}
            style={{ background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: 14 }}>
            ← Retour aux forfaits
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <SEO
        title={`Réserver — ${forfait?.name} | Royal Elyssa`}
        description="Réservez votre forfait thalasso à Royal Elyssa Monastir."
        canonical="/booking"
      />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a2a3a, #2d4a5a)",
        color: "#fff", padding: "40px 20px 32px", textAlign: "center",
      }}>
        <button onClick={() => navigate("/forfaits")}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13, marginBottom: 16, display: "block", margin: "0 auto 16px" }}>
          ← Retour aux forfaits
        </button>
        <p style={{ fontSize: 11, letterSpacing: 3, color: "#c9a96e", margin: "0 0 8px", textTransform: "uppercase" }}>
          {section?.name}
        </p>
        <h1 style={{ fontSize: "clamp(22px, 5vw, 36px)", fontFamily: "Georgia, serif", fontWeight: 300, margin: "0 0 8px" }}>
          {forfait.name}
        </h1>
      </div>

      {/* Price selector */}
      <div style={{ background: "#c9a96e", padding: "20px", display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        {[1, 2].map(n => (
          <label key={n} style={{
            display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
            background: form.persons === n ? "rgba(255,255,255,0.25)" : "transparent",
            padding: "10px 24px", borderRadius: 8, transition: "background 0.2s",
            border: form.persons === n ? "2px solid rgba(255,255,255,0.8)" : "2px solid transparent",
          }}>
            <input type="radio" name="persons" value={n}
              checked={form.persons === n}
              onChange={() => setForm(p => ({ ...p, persons: n }))}
              style={{ accentColor: "#fff", width: 18, height: 18 }} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
              {n} personne{n > 1 ? "s" : ""} —{" "}
              <span style={{ fontWeight: 800, fontSize: 18 }}>
                {n === 1 ? forfait.price_1 : forfait.price_2} TND
              </span>
            </span>
          </label>
        ))}
      </div>

      {/* Form */}
      <div style={{ background: "#f9f6f0", padding: "40px 20px 60px", minHeight: "60vh" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", background: "#fff", borderRadius: 20, padding: "40px 36px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: 22, color: "#1a2a3a", fontFamily: "Georgia, serif", margin: "0 0 8px" }}>
            Vos coordonnées
          </h2>
          <p style={{ color: "#999", fontSize: 13, margin: "0 0 28px" }}>
            Un bon cadeau vous sera envoyé à l'adresse indiquée.
          </p>

          {error && (
            <div style={{ background: "#fdecea", color: "#c0392b", padding: "12px 16px", borderRadius: 8, fontSize: 14, marginBottom: 20 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Nom complet *</label>
                <input style={inputStyle} placeholder="Votre nom et prénom" value={form.client_name} onChange={set("client_name")} required />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Numéro de téléphone *</label>
                <input style={inputStyle} placeholder="+216 XX XXX XXX" type="tel" value={form.phone} onChange={set("phone")} required />
              </div>
              <div>
                <label style={labelStyle}>Date souhaitée *</label>
                <input style={inputStyle} type="date" min={today} value={form.booking_date} onChange={set("booking_date")} required />
              </div>
              <div>
                <label style={labelStyle}>Heure souhaitée *</label>
                <select style={inputStyle} value={form.booking_time} onChange={set("booking_time")} required>
                  <option value="">— Choisir —</option>
                  {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Adresse de livraison *</label>
                <input style={inputStyle} placeholder="Rue, numéro, ville..." value={form.address} onChange={set("address")} required />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Gouvernorat *</label>
                <select style={inputStyle} value={form.governorate} onChange={set("governorate")} required>
                  <option value="">— Choisir votre gouvernorat —</option>
                  {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            {/* Summary */}
            <div style={{ background: "#f9f6f0", borderRadius: 12, padding: 20, margin: "28px 0", border: "1.5px solid #e8e0d5" }}>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Forfait</span>
                  <strong>{forfait.name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Personnes</span>
                  <strong>{form.persons}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid #e0d8cc", marginTop: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>Total</span>
                  <strong style={{ fontSize: 18, color: "#c9a96e" }}>{price} TND</strong>
                </div>
              </div>
            </div>

            <button type="submit" disabled={submitting}
              style={{
                width: "100%", padding: "16px", background: submitting ? "#ccc" : "#1a2a3a",
                color: "#fff", border: "none", borderRadius: 10, fontSize: 16,
                fontWeight: 700, cursor: submitting ? "default" : "pointer", letterSpacing: 1,
              }}>
              {submitting ? "Envoi en cours…" : "CONFIRMER MA RÉSERVATION →"}
            </button>

            <p style={{ textAlign: "center", color: "#bbb", fontSize: 12, marginTop: 14 }}>
              Vous recevrez une confirmation par téléphone dans les 24h.
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;
