import React, { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Check } from "lucide-react";

// Toyota official image mapping
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

// Dropdown Section Component
const DropdownSection = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{
      background: "#f8fafc",
      borderRadius: 12,
      border: "1px solid #e5e7eb",
      overflow: "hidden"
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 20px",
          color: "#374151",
          fontSize: 16,
          fontWeight: "600",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "all 0.3s ease",
          fontFamily: "Inter, Arial, sans-serif"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#f3f4f6";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "none";
        }}
      >
        <span>{title}</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease"
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      
      {isOpen && (
        <div style={{
          padding: "20px",
          borderTop: "1px solid #e5e7eb",
          background: "white"
        }}>
          <div style={{ 
            color: "#6b7280", 
            lineHeight: 1.6,
            fontSize: 14,
            fontFamily: "Inter, Arial, sans-serif"
          }}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to extract sections from AI response
const extractSection = (text, sectionName) => {
  const sections = text.split("**");
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].includes(sectionName)) {
      // Get the content after the section name until the next section or end
      let content = sections[i + 1] || "";
      
      // Clean up the content - remove markdown and extra spaces
      content = content
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/#{1,6}\s?/g, '')
        .trim();
      
      // If content is too long, truncate and add ellipsis
      if (content.length > 500) {
        content = content.substring(0, 500) + '...';
      }
      
      return content || "No content available for this section.";
    }
  }
  return "Section not found in analysis.";
};

export default function Compare() {
  const { selectedForCompare, likedCars, matchedCars } = useQuiz();
  const [comparison, setComparison] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // Debug: Check what data we have
  useEffect(() => {
    console.log("🔍 COMPARE COMPONENT DATA:");
    console.log("selectedForCompare:", selectedForCompare);
    console.log("likedCars:", likedCars);
    console.log("matchedCars:", matchedCars);
  }, []);

  // Use selectedForCompare first, fallback to likedCars, then matchedCars
  const carsToCompare = selectedForCompare.length >= 2 
    ? selectedForCompare.slice(0, 2)
    : likedCars.length >= 2 
      ? likedCars.slice(0, 2)
      : matchedCars?.length >= 2 
        ? matchedCars.slice(0, 2)
        : [];

  const handleCompare = async () => {
    if (carsToCompare.length < 2) {
      alert("Please select at least 2 cars to compare");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://meaningful-danika-isaaqprox-294e4877.koyeb.app/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cars: carsToCompare }),
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      setComparison(data.comparison || "No comparison generated");
    } catch (error) {
      console.error("Comparison error:", error);
      setComparison("Failed to generate comparison. Make sure the AI server is running on https://meaningful-danika-isaaqprox-294e4877.koyeb.app/");
    } finally {
      setLoading(false);
    }
  };

  // If no cars available, show message
  if (carsToCompare.length < 2) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "white", 
        color: "#1f2937", 
        padding: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, Arial, sans-serif"
      }}>
        <button 
          onClick={() => nav("/results")} 
          style={{ 
            background: "none", 
            color: "#6b7280", 
            border: "none", 
            cursor: "pointer", 
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "Inter, Arial, sans-serif"
          }}
        >
          <ArrowLeft /> Back to Results
        </button>
        <div style={{ textAlign: "center" }}>
          <Star size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <h2 style={{ color: "#1f2937" }}>Not enough cars to compare</h2>
          <p style={{ color: "#6b7280", marginTop: 10, maxWidth: 400 }}>
            You need at least 2 cars to compare. Go back and add more cars to your favorites.
          </p>
        </div>
      </div>
    );
  }

  const [car1, car2] = carsToCompare;

  // Comparison specs data
  const comparisonSpecs = [
    { label: "Starting Price", value1: `$${car1.msrp?.toLocaleString()}`, value2: `$${car2.msrp?.toLocaleString()}` },
    { label: "Fuel Economy", value1: `${car1.mpg} MPG`, value2: `${car2.mpg} MPG` },
    { label: "Lease Estimate", value1: `$${car1.leaseMonthly}/mo`, value2: `$${car2.leaseMonthly}/mo` },
    { label: "Body Style", value1: getBodyStyle(car1.name), value2: getBodyStyle(car2.name) },
    { label: "Best For", value1: getBestFor(car1.name), value2: getBestFor(car2.name) },
  ];

  function getBodyStyle(carName) {
    const name = carName.toLowerCase();
    if (name.includes('rav4') || name.includes('highlander') || name.includes('4runner') || name.includes('venza')) return 'SUV';
    if (name.includes('camry') || name.includes('corolla') || name.includes('prius') || name.includes('crown')) return 'Sedan';
    if (name.includes('tacoma') || name.includes('tundra')) return 'Truck';
    if (name.includes('sienna')) return 'Minivan';
    return 'Passenger Vehicle';
  }

  function getBestFor(carName) {
    const name = carName.toLowerCase();
    if (name.includes('corolla') || name.includes('prius')) return 'City Driving';
    if (name.includes('camry') || name.includes('crown')) return 'Commuting';
    if (name.includes('rav4') || name.includes('venza')) return 'Family & Adventure';
    if (name.includes('highlander') || name.includes('sienna')) return 'Large Families';
    if (name.includes('4runner') || name.includes('tacoma')) return 'Off-road';
    return 'Daily Driving';
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "white", 
      color: "#1f2937", 
      padding: 24,
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <button 
            onClick={() => nav("/results")} 
            style={{ 
              background: "none", 
              color: "#6b7280", 
              border: "none", 
              cursor: "pointer", 
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontFamily: "Inter, Arial, sans-serif"
            }}
          >
            <ArrowLeft size={18} /> Back to Results
          </button>
          
          <h1 style={{ 
            fontSize: 48, 
            fontWeight: "bold", 
            textAlign: "center",
            margin: "0 0 8px 0",
            color: "#1f2937",
            fontFamily: "Inter, Arial, sans-serif"
          }}>
            Compare
          </h1>
          <p style={{ 
            color: "#6b7280", 
            textAlign: "center",
            fontSize: 18,
            margin: 0,
            fontFamily: "Inter, Arial, sans-serif"
          }}>
            Which Toyota is right for you?
          </p>
        </div>

        {/* Main Comparison Section - Apple Style */}
        <div style={{ 
          background: "#f8fafc",
          borderRadius: 20,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          marginBottom: 40
        }}>
          {/* Cars Header - No Lines */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            background: "white",
            padding: "40px 0"
          }}>
            {/* Car 1 Header */}
            <div style={{ 
              padding: "0 40px",
              textAlign: "center",
              borderRight: "none"
            }}>
              <div style={{ 
                height: 120, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                marginBottom: 20
              }}>
                <img 
                  src={getCarImage(car1)} 
                  alt={car1.name}
                  style={{ 
                    maxWidth: "100%", 
                    maxHeight: "100%", 
                    objectFit: "contain" 
                  }}
                />
              </div>
              <h3 style={{ 
                fontSize: 24, 
                margin: "0 0 8px 0",
                fontWeight: "bold",
                color: "#1f2937",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                {car1.name}
              </h3>
              <p style={{ 
                color: "#dc2626", 
                fontSize: 18, 
                fontWeight: "bold",
                margin: "0 0 12px 0",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                ${car1.msrp?.toLocaleString()}
              </p>
              <p style={{ 
                color: "#6b7280", 
                fontSize: 14,
                lineHeight: 1.4,
                textAlign: "center",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                {car1.description}
              </p>
            </div>

            {/* Car 2 Header */}
            <div style={{ 
              padding: "0 40px",
              textAlign: "center"
            }}>
              <div style={{ 
                height: 120, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                marginBottom: 20
              }}>
                <img 
                  src={getCarImage(car2)} 
                  alt={car2.name}
                  style={{ 
                    maxWidth: "100%", 
                    maxHeight: "100%", 
                    objectFit: "contain" 
                  }}
                />
              </div>
              <h3 style={{ 
                fontSize: 24, 
                margin: "0 0 8px 0",
                fontWeight: "bold",
                color: "#1f2937",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                {car2.name}
              </h3>
              <p style={{ 
                color: "#dc2626", 
                fontSize: 18, 
                fontWeight: "bold",
                margin: "0 0 12px 0",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                ${car2.msrp?.toLocaleString()}
              </p>
              <p style={{ 
                color: "#6b7280", 
                fontSize: 14,
                lineHeight: 1.4,
                textAlign: "center",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                {car2.description}
              </p>
            </div>
          </div>

          {/* Comparison Specs */}
          <div>
            {comparisonSpecs.map((spec, index) => (
              <div 
                key={spec.label}
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "1fr 1fr 1fr", 
                  gap: 1,
                  background: index % 2 === 0 ? "white" : "#f8fafc",
                  alignItems: "center",
                  minHeight: 80
                }}
              >
                {/* Car 1 Value - Right Aligned */}
                <div style={{ 
                  padding: "20px 40px",
                  textAlign: "right",
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#1f2937",
                  fontFamily: "Inter, Arial, sans-serif"
                }}>
                  {spec.value1}
                </div>
                
                {/* Spec Label - Centered with centered vertical lines */}
                <div style={{ 
                  padding: "20px 40px",
                  color: "#6b7280",
                  fontWeight: "600",
                  fontSize: 14,
                  textAlign: "center",
                  borderLeft: "1px solid #e5e7eb",
                  borderRight: "1px solid #e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 20px",
                  fontFamily: "Inter, Arial, sans-serif"
                }}>
                  {spec.label}
                </div>
                
                {/* Car 2 Value - Left Aligned */}
                <div style={{ 
                  padding: "20px 40px",
                  textAlign: "left",
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#1f2937",
                  fontFamily: "Inter, Arial, sans-serif"
                }}>
                  {spec.value2}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Comparison Section */}
        <div style={{ 
          background: "#f8fafc",
          borderRadius: 20,
          border: "1px solid #e5e7eb",
          padding: 40,
          marginBottom: 30
        }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 16
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                AI
              </div>
              <h3 style={{ 
                fontSize: 24, 
                margin: 0,
                fontWeight: "bold",
                color: "#1f2937",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                Smart Comparison
              </h3>
            </div>
            <p style={{ 
              color: "#6b7280", 
              marginBottom: 20,
              fontSize: 16,
              maxWidth: 500,
              margin: "0 auto 30px auto",
              lineHeight: 1.5,
              fontFamily: "Inter, Arial, sans-serif"
            }}>
              Get AI-powered insights to help you choose the perfect Toyota for your needs
            </p>
            
            <button
              onClick={handleCompare}
              disabled={loading}
              style={{
                background: loading ? "#9ca3af" : "linear-gradient(135deg, #dc2626, #b91c1c)",
                border: "none",
                padding: "16px 40px",
                borderRadius: 12,
                cursor: loading ? "not-allowed" : "pointer",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                minWidth: 220,
                boxShadow: loading ? "none" : "0 4px 20px rgba(220, 38, 38, 0.3)",
                transition: "all 0.3s ease",
                fontFamily: "Inter, Arial, sans-serif"
              }}
            >
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ 
                    width: 20, 
                    height: 20, 
                    border: "2px solid transparent", 
                    borderTop: "2px solid white", 
                    borderRadius: "50%", 
                    animation: "spin 1s linear infinite",
                    marginRight: 12
                  }} />
                  Analyzing Vehicles...
                </div>
              ) : (
                "Generate Smart Comparison"
              )}
            </button>
          </div>

          {comparison && (
            <div style={{ 
              background: "linear-gradient(135deg, rgba(220, 38, 38, 0.05), rgba(255,255,255,0.02))",
              padding: 30, 
              borderRadius: 16,
              border: "1px solid rgba(220, 38, 38, 0.1)"
            }}>
              <div style={{ 
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 25
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "white",
                  flexShrink: 0,
                  fontFamily: "Inter, Arial, sans-serif"
                }}>
                  ✓
                </div>
                <h4 style={{ 
                  margin: 0, 
                  color: "#dc2626",
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Inter, Arial, sans-serif"
                }}>
                  AI Analysis Complete
                </h4>
              </div>

              {/* Dropdown Sections */}
              <div style={{ display: "grid", gap: 12 }}>
                {/* Financial Analysis Dropdown */}
                <DropdownSection 
                  title="Financial Analysis" 
                  content={extractSection(comparison, "FINANCIAL ANALYSIS")}
                  defaultOpen={true}
                />
                
                {/* Insurance & Maintenance Dropdown */}
                <DropdownSection 
                  title="Insurance & Maintenance" 
                  content={extractSection(comparison, "INSURANCE & MAINTENANCE")}
                />
                
                {/* Lifestyle Fit Dropdown */}
                <DropdownSection 
                  title="Lifestyle Fit" 
                  content={extractSection(comparison, "LIFESTYLE FIT")}
                />
                
                {/* Recommendation Dropdown */}
                <DropdownSection 
                  title="Recommendation" 
                  content={extractSection(comparison, "RECOMMENDATION")}
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Decision Helper */}
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20
        }}>
          <div style={{ 
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 12,
            padding: 20,
            textAlign: "center"
          }}>
            <Check size={24} style={{ color: "#16a34a", marginBottom: 8 }} />
            <div style={{ fontWeight: "bold", marginBottom: 4, color: "#166534", fontFamily: "Inter, Arial, sans-serif" }}>Choose {car1.name} if:</div>
            <div style={{ color: "#166534", fontSize: 14, fontFamily: "Inter, Arial, sans-serif" }}>
              {getBestFor(car1.name)} • ${car1.leaseMonthly}/mo lease • {car1.mpg} MPG
            </div>
          </div>
          
          <div style={{ 
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 12,
            padding: 20,
            textAlign: "center"
          }}>
            <Check size={24} style={{ color: "#16a34a", marginBottom: 8 }} />
            <div style={{ fontWeight: "bold", marginBottom: 4, color: "#166534", fontFamily: "Inter, Arial, sans-serif" }}>Choose {car2.name} if:</div>
            <div style={{ color: "#166534", fontSize: 14, fontFamily: "Inter, Arial, sans-serif" }}>
              {getBestFor(car2.name)} • ${car2.leaseMonthly}/mo lease • {car2.mpg} MPG
            </div>
          </div>
        </div>

        {/* Add CSS for spinner animation */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
}
