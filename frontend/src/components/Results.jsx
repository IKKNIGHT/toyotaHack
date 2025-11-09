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

  const TOYOTA_IMAGES = {
    // Corolla Models
    "corolla": "https://www.toyota.com/content/dam/toyota/jellies/max/2026/corolla/se/1864/3t3/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",
    "corolla hybrid": "https://www.toyota.com/content/dam/toyota/jellies/max/2025/corollacrosshybrid/hybridse/6314/d15/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",
    "corolla sedan": "https://images.dealer.com/ddc/vehicles/2026/Toyota/Corolla/Sedan/color/Blueprint-8X8-25,28,42-640-en_US.jpg",
    "corolla hatchback": "https://www.toyota.com/content/dam/toyota/jellies/max/2026/corollahatchback/fx/6277/4y8/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

    // Camry Models
    "camry": "https://www.toyota.com/rgct/sharpr/vcr/adobe/dynamicmedia/deliver/urn:aaid:aem:3d48bbba-e122-481a-b8e8-e2d5aac21c9d/image.png?format=auto&trim=alpha&maxWidth=800",
    "camry hybrid": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/dealsandincentives/series-jellies/CamryHybrid_XSE.png?fmt=png-alpha&wid=1350&fit=constrain",

    // Prius Models
    "prius": "https://www.toyota.com/content/dam/toyota/jellies/max/2026/prius/limited/1227/8q4/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",
    "prius prime": "https://file.kelleybluebookimages.com/kbb/base/evox/CP/15412/2021-Toyota-Prius%20Prime-front_15412_032_2400x1800_1F7.png",

    // RAV4 Models
    "rav4": "https://www.toyota.com/rgct/sharpr/vcr/adobe/dynamicmedia/deliver/urn:aaid:aem:c024a45e-6c57-446d-89d8-62ec0e89ecec/image.png?format=auto&trim=alpha&maxWidth=800",
    "rav4 hybrid": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2025/rav4hybrid/hybridxse/4530/2vv/18/3.png?fmt=png-alpha&wid=930&hei=328&qlt=90",
    "rav4 prime": "https://di-sitebuilder-assets.dealerinspire.com/Toyota/MLP/RAV4Prime/2024/Trims/SE.png",

    // Highlander Models
    "highlander": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2026/highlander/6959.png?wid=350",
    "highlander hybrid": "https://www.toyota.com/content/dam/toyota/jellies/max/2026/grandhighlander/le/6706/1j9/1.png?bg=fff&fmt=webp&qlt=90&wid=1764",

    // 4Runner
    "4runner": "https://img.sm360.ca/ir/w600h373c/images/newcar/ca/2025/toyota/4runner-hybride/trd-off-road-premium/suv/exteriorColors/2025_toyota_4runner-hybride_premium_032_0202.png",

    // Corolla Cross Models
    "corolla cross": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/dealsandincentives/series-jellies/CorollaCross_XLE.png?fmt=png-alpha&wid=1350&fit=constrain",
    "corolla cross hybrid": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/dealsandincentives/series-jellies/Seriesjellycorollacrosshybrid.png?fmt=png-alpha&wid=1350&fit=constrain",

    // Venza
    "venza": "https://di-uploads-pod3.s3.amazonaws.com/limbaughtoyota/uploads/2015/06/2014-venza-side-view-on-the-road.jpg",

    // Sequoia
    "sequoia": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2026/sequoia/limited/7948/6x3/36/5.png?fmt=png-alpha&wid=930&hei=328&qlt=90",

    // Tacoma
    "tacoma": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2025/tacoma/trdpro/7598/m16/36/5.png?fmt=png-alpha&wid=930&hei=328&qlt=90",

    // Tundra
    "tundra": "https://images.hgmsites.net/med/2025-toyota-tundra-limited-crewmax-5-5-bed-gs-angular-front-exterior-view_100960167_m.webp",

    // Sienna
    "sienna": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/dealsandincentives/series-jellies/2025/MY25_Sienna-Hybrid_US_LE-2WD_5402_01G3_003_DS-Profile_6K%20(original).png?fmt=png-alpha&wid=1350&fit=constrain",

    // Crown
    "crown": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2026/toyotacrown/nightshade/4025/1l6/36/5.png?fmt=png-alpha&wid=930&hei=328&qlt=90",

    // bZ4X
    "bz4x": "https://di-sitebuilder-assets.dealerinspire.com/Toyota/MLP/bZ4X/2025/color-metal.png",

    // GR86
    "gr86": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2026/gr86/gr86yuzuedition/6259/c2z/36/5.png?fmt=png-alpha&wid=930&hei=328&qlt=90",

    // Supra
    "supra": "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2026/grsupra/mkvfinaledition/2376/d12/36/5.png?fmt=png-alpha&wid=930&hei=328&qlt=90",

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
        <h1 style={{ fontSize: 28, margin: 0, color: "#1f2937" }}>Your Favorites ({likedCars.length})</h1>
        <button 
          onClick={() => setView("swipe")}
          style={{ 
            padding: "10px 16px", 
            background: "white", 
            border: "1px solid #d1d5db", 
            borderRadius: 10, 
            cursor: "pointer", 
            color: "#374151"
          }}
        >
          ← Back to Swiping
        </button>
      </div>

      {likedCars.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: 60, 
          color: "#6b7280",
          background: "#f9fafb",
          borderRadius: 12,
          border: "1px solid #e5e7eb"
        }}>
          <Star size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <h3 style={{ color: "#374151" }}>No favorites yet</h3>
          <p>Start swiping right on cars you like to add them here!</p>
          <button 
            onClick={() => setView("swipe")}
            style={{ 
              marginTop: 16,
              padding: "12px 24px", 
              background: "#dc2626", 
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
              background: "#f0fdf4", 
              border: "1px solid #bbf7d0",
              borderRadius: 10,
              textAlign: "center"
            }}>
              <p style={{ margin: "0 0 12px 0", color: "#166534" }}>
                🎉 Ready to compare {selectedForCompare.length} cars!
              </p>
              <button 
                onClick={() => nav("/compare")} 
                style={{ 
                  padding: "12px 24px", 
                  background: "#dc2626", 
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
                  background: "white",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: selectedForCompare.find(c => c.id === car.id) 
                    ? "2px solid #dc2626" 
                    : "1px solid #e5e7eb",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}
                onClick={() => toggleCompare(car)}
              >
                <div style={{ 
                  height: 200, 
                  background: "#f8fafc", 
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
                    <h3 style={{ margin: 0, fontSize: 18, color: "#1f2937" }}>{car.name}</h3>
                    <button
                      onClick={(e) => removeFromFavorites(car.id, e)}
                      style={{
                        background: "#fef2f2",
                        border: "none",
                        borderRadius: 6,
                        padding: "6px",
                        cursor: "pointer",
                        color: "#dc2626",
                        fontSize: 12
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <p style={{ 
                    color: "#6b7280", 
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
                    <div style={{ flex: 1, padding: 8, background: "#f8fafc", borderRadius: 6 }}>
                      <div style={{ color: "#6b7280" }}>MSRP</div>
                      <div style={{ fontWeight: 700, color: "#1f2937" }}>${car.msrp?.toLocaleString()}</div>
                    </div>
                    <div style={{ flex: 1, padding: 8, background: "#f8fafc", borderRadius: 6 }}>
                      <div style={{ color: "#6b7280" }}>MPG</div>
                      <div style={{ fontWeight: 700, color: "#1f2937" }}>{car.mpg} mpg</div>
                    </div>
                    <div style={{ flex: 1, padding: 8, background: "#f8fafc", borderRadius: 6 }}>
                      <div style={{ color: "#6b7280" }}>Lease</div>
                      <div style={{ fontWeight: 700, color: "#1f2937" }}>${car.leaseMonthly}/mo</div>
                    </div>
                  </div>
                  <div style={{ 
                    marginTop: 12, 
                    padding: 8, 
                    background: selectedForCompare.find(c => c.id === car.id) 
                      ? "#fef2f2" 
                      : "#f8fafc",
                    borderRadius: 6,
                    textAlign: "center",
                    fontSize: 12,
                    color: selectedForCompare.find(c => c.id === car.id) ? "#dc2626" : "#6b7280"
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
              background: "#f8fafc", 
              borderRadius: 10,
              textAlign: "center",
              color: "#6b7280",
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
        <h1 style={{ fontSize: 28, margin: 0, color: "#1f2937" }}>Swipe Matches</h1>
        {likedCars.length > 0 && (
          <button 
            onClick={() => setView("favorites")}
            style={{ 
              padding: "10px 16px", 
              background: "white", 
              border: "1px solid #d1d5db", 
              borderRadius: 10, 
              cursor: "pointer", 
              color: "#374151",
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
      <div style={{ marginBottom: 20, color: "#6b7280", textAlign: "center" }}>
        Car {index + 1} of {carsToShow.length}
      </div>

      {/* Main Card */}
      {current && (
        <div style={{ 
          width: "100%", 
          maxWidth: 500,
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          background: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          marginBottom: 30
        }}>
          {/* Car Image */}
          <div style={{ 
            width: "100%", 
            height: 300, 
            background: "#f8fafc", 
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
            <h2 style={{ margin: "0 0 12px 0", fontSize: 24, color: "#1f2937" }}>{current.name}</h2>
            <p style={{ color: "#6b7280", marginBottom: 20, fontSize: 16, lineHeight: 1.5 }}>
              {current.description}
            </p>
            
            {/* Specs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              <div style={{ textAlign: "center", padding: 12, background: "#f8fafc", borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>MSRP</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937" }}>
                  {current.msrp ? `$${current.msrp.toLocaleString()}` : 'N/A'}
                </div>
              </div>
              <div style={{ textAlign: "center", padding: 12, background: "#f8fafc", borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>MPG</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937" }}>{current.mpg} mpg</div>
              </div>
              <div style={{ textAlign: "center", padding: 12, background: "#f8fafc", borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Lease Est.</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937" }}>${current.leaseMonthly}/mo</div>
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
            background: "white", 
            border: "1px solid #d1d5db", 
            cursor: "pointer",
            color: "#374151",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#fef2f2";
            e.target.style.borderColor = "#dc2626";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "white";
            e.target.style.borderColor = "#d1d5db";
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
          background: "#f0fdf4", 
          border: "1px solid #bbf7d0",
          borderRadius: 12,
          textAlign: "center",
          color: "#166534",
          maxWidth: 500,
          width: "100%"
        }}>
          🎉 All cars reviewed! Check your favorites.
        </div>
      )}

      {/* Instructions */}
      <div style={{ 
        marginTop: 20, 
        color: "#6b7280", 
        textAlign: "center",
        fontSize: 14
      }}>
        💡 Click the buttons to like or pass on cars
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "white", color: "#1f2937", padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: "20px auto" }}>
        <button onClick={() => nav("/")} style={{ background: "none", color: "#6b7280", border: "none", cursor: "pointer", marginBottom: 12 }}>
          <ArrowLeft style={{ verticalAlign: "middle" }} /> Back Home
        </button>

        {view === "swipe" ? renderSwipeView() : renderFavoritesView()}
      </div>
    </div>
  );
}