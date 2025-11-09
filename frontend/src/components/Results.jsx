import React, { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { Heart, X, ArrowLeft } from "lucide-react";

export default function Results() {
  const { matchedCars, likedCars, setLikedCars, selectedForCompare, setSelectedForCompare } = useQuiz();
  const [index, setIndex] = useState(0);
  const nav = useNavigate();

  // Debug: Log matchedCars when component loads
  useEffect(() => {
    console.log("🔍 RESULTS COMPONENT MOUNTED");
    console.log("📦 matchedCars:", matchedCars);
    console.log("📦 matchedCars length:", matchedCars?.length);
    if (matchedCars && matchedCars.length > 0) {
      matchedCars.forEach((car, i) => {
        console.log(`🚗 Car ${i + 1}:`, {
          name: car.name,
          image: car.image,
          hasImage: !!car.image,
          imageStartsWithHttp: car.image?.startsWith('http'),
          description: car.description
        });
      });
    }
  }, [matchedCars]);

  // Toyota official image mapping
  
// DATA URL FALLBACK - NO EXTERNAL REQUESTS
// WORKING TOYOTA IMAGE URLS - YOUR FORMAT
const TOYOTA_IMAGES = {
  // Corolla Models
  "corolla": "https://www.toyota.com/rgct/sharpr/vcr/adobe/dynamicmedia/deliver/urn:aaid:aem:946c2f7a-a46e-47c7-adc9-1d23af0af68d/image.png?format=auto&trim=alpha&maxWidth=800",
  "corolla hybrid": "https://www.toyota.com/content/dam/toyota/jellies/max/2026/corolla/se/1864/3t3/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",
  "corolla sedan": "https://www.toyota.com/rgct/sharpr/vcr/adobe/dynamicmedia/deliver/urn:aaid:aem:946c2f7a-a46e-47c7-adc9-1d23af0af68d/image.png?format=auto&trim=alpha&maxWidth=800",
  "corolla hatchback": "https://www.toyota.com/content/dam/toyota/jellies/max/2026/corolla/se/1864/3t3/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Camry Models
  "camry": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/camry/se/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",
  "camry hybrid": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/camry/se/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Prius Models
  "prius": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/prius/le/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",
  "prius prime": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/prius/le/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // RAV4 Models
  "rav4": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/rav4/xle/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",
  "rav4 hybrid": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/rav4/xle/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",
  "rav4 prime": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/rav4/xle/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Highlander Models
  "highlander": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/highlander/xle/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",
  "highlander hybrid": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/highlander/xle/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // 4Runner
  "4runner": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/4runner/sr5/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Corolla Cross Models
  "corolla cross": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/corolla-cross/le/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",
  "corolla cross hybrid": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/corolla-cross/le/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Venza
  "venza": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/venza/xle/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Sequoia
  "sequoia": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/sequoia/sr5/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Tacoma
  "tacoma": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/tacoma/sr/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Tundra
  "tundra": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/tundra/sr/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Sienna
  "sienna": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/sienna/xle/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Crown
  "crown": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/crown/xle/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // bZ4X
  "bz4x": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/bz4x/xle/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // GR86
  "gr86": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/gr86/base/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Supra
  "supra": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/supra/30/1864/1h0/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

  // Default
  "default": "https://www.toyota.com/rgct/sharpr/vcr/adobe/dynamicmedia/deliver/urn:aaid:aem:946c2f7a-a46e-47c7-adc9-1d23af0af68d/image.png?format=auto&trim=alpha&maxWidth=800"
};
  const carsToShow = matchedCars.length > 0 ? matchedCars : [
    {
      id: 1,
      name: "Toyota Corolla Hybrid",
      image: TOYOTA_IMAGES.corolla,
      description: "Fuel-efficient compact perfect for city driving",
      msrp: 24500,
      mpg: 52,
      leaseMonthly: 249
    }
  ];

  const current = carsToShow[index];

  // Function to get the best image for a car
  const getCarImage = (car) => {
  const carName = car.name.toLowerCase();
  
  // Exact matches first
  if (carName.includes('corolla cross hybrid')) return TOYOTA_IMAGES['corolla cross hybrid'];
  if (carName.includes('corolla cross')) return TOYOTA_IMAGES['corolla cross'];
  if (carName.includes('corolla hatchback')) return TOYOTA_IMAGES['corolla hatchback'];
  if (carName.includes('corolla hybrid')) return TOYOTA_IMAGES['corolla hybrid'];
  if (carName.includes('corolla sedan')) return TOYOTA_IMAGES['corolla sedan'];
  if (carName.includes('corolla')) return TOYOTA_IMAGES['corolla'];
  
  if (carName.includes('camry hybrid')) return TOYOTA_IMAGES['camry hybrid'];
  if (carName.includes('camry')) return TOYOTA_IMAGES['camry'];
  
  if (carName.includes('rav4 prime')) return TOYOTA_IMAGES['rav4 prime'];
  if (carName.includes('rav4 hybrid')) return TOYOTA_IMAGES['rav4 hybrid'];
  if (carName.includes('rav4')) return TOYOTA_IMAGES['rav4'];
  
  if (carName.includes('prius prime')) return TOYOTA_IMAGES['prius prime'];
  if (carName.includes('prius')) return TOYOTA_IMAGES['prius'];
  
  if (carName.includes('highlander hybrid')) return TOYOTA_IMAGES['highlander hybrid'];
  if (carName.includes('highlander')) return TOYOTA_IMAGES['highlander'];
  
  if (carName.includes('4runner')) return TOYOTA_IMAGES['4runner'];
  if (carName.includes('venza')) return TOYOTA_IMAGES['venza'];
  if (carName.includes('sequoia')) return TOYOTA_IMAGES['sequoia'];
  if (carName.includes('tacoma')) return TOYOTA_IMAGES['tacoma'];
  if (carName.includes('tundra')) return TOYOTA_IMAGES['tundra'];
  if (carName.includes('sienna')) return TOYOTA_IMAGES['sienna'];
  if (carName.includes('crown')) return TOYOTA_IMAGES['crown'];
  if (carName.includes('bz4x')) return TOYOTA_IMAGES['bz4x'];
  if (carName.includes('gr86')) return TOYOTA_IMAGES['gr86'];
  if (carName.includes('supra')) return TOYOTA_IMAGES['supra'];
  
  return TOYOTA_IMAGES.default;
};

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

  // Debug current car
  useEffect(() => {
    if (current) {
      console.log(`🔄 Current car changed to index ${index}:`, {
        name: current.name,
        image: current.image,
        finalImage: getCarImage(current)
      });
    }
  }, [current, index]);

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
                <div style={{ width: "100%", height: 320, background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img 
                    src={getCarImage(current)} 
                    alt={current.name} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "contain",
                      padding: "20px"
                    }}
                    onLoad={(e) => {
                      console.log(`✅ Image loaded successfully: ${e.target.src}`);
                    }}
                    onError={(e) => {
                      console.log(`❌ Image failed to load: ${e.target.src}`);
                      console.log(`🔄 Setting fallback image for: ${current.name}`);
                      e.target.src = TOYOTA_IMAGES.default;
                    }}
                  />
                </div>
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
                    <div style={{ 
                      width: 80, 
                      height: 56, 
                      background: "#1e293b", 
                      borderRadius: 8,
                      overflow: "hidden",
                      flexShrink: 0
                    }}>
                      <img 
                        src={getCarImage(car)} 
                        alt={car.name} 
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover"
                        }}
                        onLoad={(e) => {
                          console.log(`✅ Favorite image loaded: ${car.name}`);
                        }}
                        onError={(e) => {
                          console.log(`❌ Favorite image failed: ${car.name} - ${e.target.src}`);
                          e.target.src = TOYOTA_IMAGES.default;
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {car.name}
                      </div>
                      <div style={{ color: "#9ca3af", fontSize: 12, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {car.description}
                      </div>
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