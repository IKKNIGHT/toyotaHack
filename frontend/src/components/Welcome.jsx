import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Welcome() {
  const nav = useNavigate();
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#071021 0%, #3b0f0f 50%, #071021 100%)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      <div style={{ textAlign: "center", maxWidth: 900 }}>
        <div style={{ color: "#ef4444", fontSize: 56, fontWeight: 800 }}>TOYOTA</div>
        <h1 style={{ fontSize: 44, margin: "10px 0", color: "#ffdede" }}>Pathfinder — Find Your Dream Car</h1>
        <p style={{ color: "#d1d5db", fontSize: 18, maxWidth: 700, margin: "10px auto" }}>
          A smarter way to choose vehicles — AI-driven lifestyle matching, instant finance, and side-by-side TCO comparison.
        </p>

        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => nav("/quiz")}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: 999,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(220,38,38,0.25)"
            }}
          >
            Start Quiz <ChevronRight style={{ verticalAlign: "middle" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
