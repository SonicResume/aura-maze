import React from "react";

export default function ContactPage() {
  // Obscured link tokens to protect against spam scrapers
  const tokenA = "YUhSMGNITTZMeTUzZDNjdWNpOXVhV055WlhOMWJXbHVMbU52YlM5amIyNTBZV05mTXpBeU5EWXhOWFU9"; // sonicresume contact
  const tokenB = "YUhSMGNITTZMeTUzZDNkeWRpNW1ZV05sWW05dmFzNWpiMjB2Y0hKdlptOXNaUzVvY0dndVkyZ3hOVEUxT0RVMU9URTJNRFl3"; // facebook profile

  const handleRedirection = (token) => {
    try {
      // Human-only decoding layers executed purely in active runtime memory
      const step1 = atob(token);
      const targetUrl = atob(step1);
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error("Authorization check failed.");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Contact Us</h1>
        <p style={subtitle}>Choose how you want to reach us</p>

        {/* Action Button 1 */}
        <button
          style={primaryButton}
          onClick={() => handleRedirection(tokenA)}
        >
          📩 SonicResume Contact
        </button>

        {/* Action Button 2 */}
        <button
          style={secondaryButton}
          onClick={() => handleRedirection(tokenB)}
        >
          📘 Facebook Profile
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES (PEARL + ORANGE) ---------------- */

const page = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#FFF8F0", // pearl
  fontFamily: "Arial, sans-serif",
};

const card = {
  width: "90%",
  maxWidth: "420px",
  padding: "40px",
  borderRadius: "20px",
  background: "#FFF8F0",
  border: "3px solid #3A241D",
  boxShadow: "6px 6px 0px #3A241D",
  textAlign: "center",
};

const title = {
  fontSize: "28px",
  fontWeight: "900",
  color: "#2B1B16",
  marginBottom: "8px",
};

const subtitle = {
  fontSize: "14px",
  color: "#7A5C55",
  marginBottom: "24px",
};

const primaryButton = {
  width: "100%",
  padding: "14px",
  marginBottom: "12px",
  background: "#FA5A15", // orange
  color: "#fff",
  fontWeight: "800",
  border: "2px solid #3A241D",
  borderRadius: "12px",
  cursor: "pointer",
};

const secondaryButton = {
  width: "100%",
  padding: "14px",
  background: "#1877F2", // facebook blue
  color: "#fff",
  fontWeight: "800",
  border: "2px solid #3A241D",
  borderRadius: "12px",
  cursor: "pointer",
};
