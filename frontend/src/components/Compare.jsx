import React, { useState } from "react";
import { useQuiz } from "../context/QuizContext";

export default function Compare() {
  const { matchedCars } = useQuiz();
  const [selected, setSelected] = useState([]);
  const [comparison, setComparison] = useState("");

  const toggleCar = (car) => {
    setSelected(prev =>
      prev.includes(car) ? prev.filter(c => c !== car) : [...prev, car]
    );
  };

  const handleCompare = async () => {
    const res = await fetch("http://localhost:4000/api/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cars: selected }),
    });
    const data = await res.json();
    setComparison(data.comparison);
  };

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h2>Compare Your Top Picks</h2>
      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        {matchedCars.map((car, i) => (
          <button
            key={i}
            onClick={() => toggleCar(car.name)}
            style={{
              background: selected.includes(car.name)
                ? "rgba(239,68,68,0.2)"
                : "rgba(255,255,255,0.05)",
              padding: 12,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            {car.name}
          </button>
        ))}
      </div>

      {selected.length >= 2 && (
        <button
          onClick={handleCompare}
          style={{
            marginTop: 24,
            background: "#ef4444",
            border: "none",
            padding: "12px 18px",
            borderRadius: 8,
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Compare
        </button>
      )}

      {comparison && (
        <div style={{ marginTop: 24, background: "rgba(0,0,0,0.4)", padding: 20, borderRadius: 12 }}>
          <h3>AI Comparison:</h3>
          <p>{comparison}</p>
        </div>
      )}
    </div>
  );
}
