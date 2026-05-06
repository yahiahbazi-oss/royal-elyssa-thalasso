import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const AdminLogin = () => {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem("re_admin", "true");
      navigate("/admin");
    } else {
      setError("Mot de passe incorrect.");
      setPwd("");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f0ece4",
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: 48,
        boxShadow: "0 8px 40px rgba(0,0,0,0.12)", width: "100%", maxWidth: 380,
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "#1a2a3a", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 16px", fontSize: 24,
          }}>🏨</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a2a3a", margin: "0 0 4px" }}>
            Royal Elyssa
          </h1>
          <p style={{ color: "#999", fontSize: 13, margin: 0 }}>Administration</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setError(""); }}
            autoFocus
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 8,
              border: error ? "2px solid #e74c3c" : "2px solid #e0d8cc",
              fontSize: 16, boxSizing: "border-box", outline: "none",
              transition: "border 0.2s",
            }}
          />
          {error && (
            <p style={{ color: "#e74c3c", fontSize: 13, margin: "8px 0 0" }}>{error}</p>
          )}
          <button
            type="submit"
            style={{
              width: "100%", padding: "14px", background: "#1a2a3a",
              color: "#fff", border: "none", borderRadius: 8, fontSize: 15,
              fontWeight: 700, cursor: "pointer", marginTop: 20,
              letterSpacing: 1,
            }}
          >
            ACCÉDER AU DASHBOARD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
