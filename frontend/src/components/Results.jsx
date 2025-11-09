import React, { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { Heart, X, ArrowLeft, Star } from "lucide-react";

export default function Results() {
  const { matchedCars, likedCars, setLikedCars, selectedForCompare, setSelectedForCompare } = useQuiz();
  const [index, setIndex] = useState(0);
  const [view, setView] = useState("swipe"); // "swipe" or "favorites"
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

  const removeFromFavorites = (carId, e) => {
    e.stopPropagation(); // Prevent triggering compare selection
    setLikedCars(prev => prev.filter(car => car.id !== carId));
    // Also remove from compare selection if it was selected
    if (selectedForCompare.find(c => c.id === carId)) {
      setSelectedForCompare(selectedForCompare.filter(c => c.id !== carId));
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

  // Render Favorites View
  const renderFavoritesView = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>Your Favorites ({likedCars.length})</h1>
        <button 
          onClick={() => setView("swipe")}
          style={{ 
            padding: "10px 16px", 
            background: "rgba(255,255,255,0.05)", 
            border: "1px solid rgba(255,255,255,0.1)", 
            borderRadius: 10, 
            cursor: "pointer", 
            color: "white"
          }}
        >
          ← Back to Swiping
        </button>
      </div>

      {likedCars.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: 60, 
          color: "#9ca3af",
          background: "rgba(255,255,255,0.02)",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.05)"
        }}>
          <Star size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <h3>No favorites yet</h3>
          <p>Start swiping right on cars you like to add them here!</p>
          <button 
            onClick={() => setView("swipe")}
            style={{ 
              marginTop: 16,
              padding: "12px 24px", 
              background: "#ef4444", 
              border: "none", 
              borderRadius: 10, 
              cursor: "pointer", 
              color: "white",
              fontWeight: "bold"
            }}
          >
            Start Swiping
          </button>
        </div>
      ) : (
        <div>
          {/* Comparison Section */}
          {selectedForCompare.length === 2 && (
            <div style={{ 
              marginBottom: 20, 
              padding: 16, 
              background: "rgba(34, 197, 94, 0.1)", 
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: 10,
              textAlign: "center"
            }}>
              <p style={{ margin: "0 0 12px 0", color: "#bbf7d0" }}>
                🎉 Ready to compare {selectedForCompare.length} cars!
              </p>
              <button 
                onClick={() => nav("/compare")} 
                style={{ 
                  padding: "12px 24px", 
                  background: "#ef4444", 
                  border: "none", 
                  borderRadius: 10, 
                  cursor: "pointer", 
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                Compare Selected Cars
              </button>
            </div>
          )}

          {/* Favorites Grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
            gap: 20 
          }}>
            {likedCars.map((car) => (
              <div 
                key={car.id}
                style={{
                  background: "#0f1724",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: selectedForCompare.find(c => c.id === car.id) 
                    ? "2px solid #ef4444" 
                    : "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onClick={() => toggleCompare(car)}
              >
                <div style={{ 
                  height: 200, 
                  background: "#1e293b", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center" 
                }}>
                  <img 
                    src={getCarImage(car)} 
                    alt={car.name} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "contain",
                      padding: "20px"
                    }}
                  />
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 18 }}>{car.name}</h3>
                    <button
                      onClick={(e) => removeFromFavorites(car.id, e)}
                      style={{
                        background: "rgba(239, 68, 68, 0.2)",
                        border: "none",
                        borderRadius: 6,
                        padding: "6px",
                        cursor: "pointer",
                        color: "#ef4444",
                        fontSize: 12
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <p style={{ 
                    color: "#cbd5e1", 
                    fontSize: 14, 
                    marginBottom: 16,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {car.description}
                  </p>
                  <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
                    <div style={{ flex: 1, padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                      <div style={{ color: "#9ca3af" }}>MSRP</div>
                      <div style={{ fontWeight: 700 }}>${car.msrp?.toLocaleString()}</div>
                    </div>
                    <div style={{ flex: 1, padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                      <div style={{ color: "#9ca3af" }}>MPG</div>
                      <div style={{ fontWeight: 700 }}>{car.mpg} mpg</div>
                    </div>
                    <div style={{ flex: 1, padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                      <div style={{ color: "#9ca3af" }}>Lease</div>
                      <div style={{ fontWeight: 700 }}>${car.leaseMonthly}/mo</div>
                    </div>
                  </div>
                  <div style={{ 
                    marginTop: 12, 
                    padding: 8, 
                    background: selectedForCompare.find(c => c.id === car.id) 
                      ? "rgba(239, 68, 68, 0.1)" 
                      : "rgba(255,255,255,0.02)",
                    borderRadius: 6,
                    textAlign: "center",
                    fontSize: 12,
                    color: selectedForCompare.find(c => c.id === car.id) ? "#ef4444" : "#9ca3af"
                  }}>
                    {selectedForCompare.find(c => c.id === car.id) 
                      ? "✓ Selected for comparison" 
                      : "Click to select for comparison"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selection Instructions */}
          {likedCars.length > 0 && (
            <div style={{ 
              marginTop: 20, 
              padding: 16, 
              background: "rgba(255,255,255,0.02)", 
              borderRadius: 10,
              textAlign: "center",
              color: "#9ca3af",
              fontSize: 14
            }}>
              💡 Click on cars to select them for comparison (max 2)
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Render Swipe View
  const renderSwipeView = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: 500, marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>Swipe Matches</h1>
        {likedCars.length > 0 && (
          <button 
            onClick={() => setView("favorites")}
            style={{ 
              padding: "10px 16px", 
              background: "rgba(255,255,255,0.05)", 
              border: "1px solid rgba(255,255,255,0.1)", 
              borderRadius: 10, 
              cursor: "pointer", 
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <Star size={16} />
            View Favorites ({likedCars.length})
          </button>
        )}
      </div>

      {/* Progress indicator */}
      <div style={{ marginBottom: 20, color: "#cbd5e1", textAlign: "center" }}>
        Car {index + 1} of {carsToShow.length}
      </div>

      {/* Main Card */}
      {current && (
        <div style={{ 
          width: "100%", 
          maxWidth: 500,
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "#0f1724",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          marginBottom: 30
        }}>
          {/* Car Image */}
          <div style={{ 
            width: "100%", 
            height: 300, 
            background: "#1e293b", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center" 
          }}>
            <img 
              src={getCarImage(current)} 
              alt={current.name} 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "contain",
                padding: "20px"
              }}
            />
          </div>

          {/* Car Info */}
          <div style={{ padding: 24 }}>
            <h2 style={{ margin: "0 0 12px 0", fontSize: 24 }}>{current.name}</h2>
            <p style={{ color: "#cbd5e1", marginBottom: 20, fontSize: 16, lineHeight: 1.5 }}>
              {current.description}
            </p>
            
            {/* Specs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              <div style={{ textAlign: "center", padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>MSRP</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {current.msrp ? `$${current.msrp.toLocaleString()}` : 'N/A'}
                </div>
              </div>
              <div style={{ textAlign: "center", padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>MPG</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{current.mpg} mpg</div>
              </div>
              <div style={{ textAlign: "center", padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Lease Est.</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>${current.leaseMonthly}/mo</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <button 
          onClick={() => swipe("left")} 
          style={{ 
            padding: 16, 
            borderRadius: 999, 
            background: "rgba(255,255,255,0.03)", 
            border: "none", 
            cursor: "pointer",
            color: "white",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.2)";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255,255,255,0.03)";
            e.target.style.transform = "scale(1)";
          }}
        >
          <X size={24} />
        </button>
        <button 
          onClick={() => swipe("right")} 
          style={{ 
            padding: 16, 
            borderRadius: 999, 
            background: "#dc2626", 
            border: "none", 
            cursor: "pointer", 
            color: "white",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#ef4444";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#dc2626";
            e.target.style.transform = "scale(1)";
          }}
        >
          <Heart size={24} />
        </button>
      </div>
      
      {/* Completion message */}
      {index >= carsToShow.length - 1 && (
        <div style={{ 
          marginTop: 20, 
          padding: 16, 
          background: "rgba(34, 197, 94, 0.1)", 
          border: "1px solid rgba(34, 197, 94, 0.3)",
          borderRadius: 12,
          textAlign: "center",
          color: "#bbf7d0",
          maxWidth: 500,
          width: "100%"
        }}>
          🎉 All cars reviewed! Check your favorites.
        </div>
      )}

      {/* Instructions */}
      <div style={{ 
        marginTop: 20, 
        color: "#9ca3af", 
        textAlign: "center",
        fontSize: 14
      }}>
        💡 Click the buttons to like or pass on cars
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#06111c,#2b0f0f)", color: "white", padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: "20px auto" }}>
        <button onClick={() => nav("/")} style={{ background: "none", color: "#cbd5e1", border: "none", cursor: "pointer", marginBottom: 12 }}>
          <ArrowLeft style={{ verticalAlign: "middle" }} /> Back Home
        </button>

        {view === "swipe" ? renderSwipeView() : renderFavoritesView()}
      </div>
    </div>
  );
}