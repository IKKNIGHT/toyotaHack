import React, { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { Heart, X, ArrowLeft } from "lucide-react";

export default function Results() {
  const { matchedCars, likedCars, setLikedCars, selectedForCompare, setSelectedForCompare } = useQuiz();
  const [index, setIndex] = useState(0);
  const nav = useNavigate();

  const carsToShow = matchedCars.length > 0 ? matchedCars : [
    {
      id: 1,
      name: "Toyota Corolla Hybrid",
      image: "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/corolla/1H0/1.png",
      description: "Fuel-efficient compact perfect for city driving",
      msrp: 24500,
      mpg: 52,
      leaseMonthly: 249
    }
  ];

  const current = carsToShow[index];

  const swipe = (direction) => {
    if (!current) return;
    
    // Add to favorites if swiping right
    if (direction === "right") {
      // Check if car is already in favorites to avoid duplicates
      if (!likedCars.find(car => car.id === current.id)) {
        setLikedCars(prev => [...prev, current]);
      }
    }
    
    // Move to next car if available
    if (index < carsToShow.length - 1) {
      setIndex(index + 1);
    } else {
      // If no more cars, show completion message but still allow actions
      console.log("🎉 All cars reviewed!");
    }
  };

  const toggleCompare = (car) => {
    if (selectedForCompare.find(c => c.id === car.id)) {
      setSelectedForCompare(selectedForCompare.filter(c => c.id !== car.id));
    } else if (selectedForCompare.length < 2) {
      setSelectedForCompare([...selectedForCompare, car]);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#06111c,#2b0f0f)", color: "white", padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: "20px auto" }}>
        <button onClick={() => nav("/")} style={{ background: "none", color: "#cbd5e1", border: "none", cursor: "pointer", marginBottom: 12 }}>
          <ArrowLeft style={{ verticalAlign: "middle" }} /> Back Home
        </button>

        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Swipe Matches</h1>
        
        {/* Progress indicator */}
        <div style={{ marginBottom: 20, color: "#cbd5e1" }}>
          Car {index + 1} of {carsToShow.length}
        </div>

        {current ? (
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", background: "#0f1724" }}>
                <img 
                  src={current.image} 
                  alt={current.name} 
                  style={{ width: "100%", height: 320, objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300/1f2937/9ca3af?text=Toyota+Vehicle";
                  }}
                />
                <div style={{ padding: 18 }}>
                  <h2 style={{ margin: 0 }}>{current.name}</h2>
                  <p style={{ color: "#cbd5e1" }}>{current.description}</p>
                  <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                    <div style={{ padding: 10, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>MSRP</div>
                      <div style={{ fontWeight: 700 }}>{current.msrp ? `$${current.msrp.toLocaleString()}` : 'N/A'}</div>
                    </div>
                    <div style={{ padding: 10, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>MPG</div>
                      <div style={{ fontWeight: 700 }}>{current.mpg} mpg</div>
                    </div>
                    <div style={{ padding: 10, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>Lease Est.</div>
                      <div style={{ fontWeight: 700 }}>${current.leaseMonthly}/mo</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: 16, justifyContent: "center" }}>
                <button 
                  onClick={() => swipe("left")} 
                  style={{ 
                    padding: 14, 
                    borderRadius: 999, 
                    background: "rgba(255,255,255,0.03)", 
                    border: "none", 
                    cursor: "pointer",
                    color: "white"
                  }}
                >
                  <X />
                </button>
                <button 
                  onClick={() => swipe("right")} 
                  style={{ 
                    padding: 14, 
                    borderRadius: 999, 
                    background: "#dc2626", 
                    border: "none", 
                    cursor: "pointer", 
                    color: "white" 
                  }}
                >
                  <Heart />
                </button>
              </div>
              
              {/* Completion message */}
              {index >= carsToShow.length - 1 && (
                <div style={{ 
                  marginTop: 16, 
                  padding: 12, 
                  background: "rgba(34, 197, 94, 0.1)", 
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  borderRadius: 8,
                  textAlign: "center",
                  color: "#bbf7d0"
                }}>
                  🎉 All cars reviewed! Check your favorites below.
                </div>
              )}
            </div>

            <div style={{ width: 360 }}>
              <h3 style={{ marginTop: 0 }}>Your Favorites ({likedCars.length})</h3>
              {likedCars.length === 0 && (
                <div style={{ color: "#9ca3af", textAlign: "center", padding: 20 }}>
                  No favorites yet — swipe right on cars you like! 💖
                </div>
              )}
              <div style={{ display: "grid", gap: 12, maxHeight: "60vh", overflowY: "auto" }}>
                {likedCars.map((car, i) => (
                  <div 
                    key={`${car.id}-${i}`} 
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: 10,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.02)",
                      alignItems: "center",
                      cursor: "pointer",
                      border: selectedForCompare.find(c => c.id === car.id) ? "2px solid #ef4444" : "1px solid rgba(255,255,255,0.04)"
                    }} 
                    onClick={() => toggleCompare(car)}
                  >
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      style={{ width: 80, height: 56, objectFit: "cover", borderRadius: 8 }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80x56/1f2937/9ca3af?text=Toyota";
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>{car.name}</div>
                      <div style={{ color: "#9ca3af", fontSize: 13 }}>{car.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedForCompare.length === 2 && (
                <div style={{ marginTop: 14 }}>
                  <button 
                    onClick={() => nav("/compare")} 
                    style={{ 
                      width: "100%",
                      padding: "12px 18px", 
                      background: "#ef4444", 
                      border: "none", 
                      borderRadius: 10, 
                      cursor: "pointer", 
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    Compare Selected ({selectedForCompare.length})
                  </button>
                </div>
              )}
              
              {likedCars.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <button 
                    onClick={() => {
                      // Reset to first car to review again
                      setIndex(0);
                    }}
                    style={{ 
                      width: "100%",
                      padding: "10px 16px", 
                      background: "rgba(255,255,255,0.05)", 
                      border: "1px solid rgba(255,255,255,0.1)", 
                      borderRadius: 10, 
                      cursor: "pointer", 
                      color: "white"
                    }}
                  >
                    Review Cars Again
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>
            No cars to show. Please try the quiz again.
          </div>
        )}
      </div>
    </div>
  );
}