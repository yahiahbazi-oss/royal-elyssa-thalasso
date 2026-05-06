import { useEffect } from "react";
import { QR_REDIRECTS } from "../qr-redirects";

const QRRedirect = ({ qrKey }) => {
  useEffect(() => {
    const url = QR_REDIRECTS[qrKey];
    if (url) {
      window.location.replace(url);
    }
  }, [qrKey]);

  const url = QR_REDIRECTS[qrKey];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "sans-serif",
      background: "#f9f6f0",
      color: "#2d2d2d",
    }}>
      <img
        src="/logo.png"
        alt="Royal Elyssa"
        style={{ width: 120, marginBottom: 24, opacity: 0.8 }}
        onError={(e) => { e.target.style.display = "none"; }}
      />
      <p style={{ fontSize: 16, marginBottom: 8 }}>Redirection en cours...</p>
      {url && (
        <a href={url} style={{ fontSize: 13, color: "#8B7355" }}>
          Cliquez ici si la redirection ne fonctionne pas
        </a>
      )}
    </div>
  );
};

export default QRRedirect;
