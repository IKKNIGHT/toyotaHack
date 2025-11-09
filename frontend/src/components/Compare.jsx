import React, { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Check } from "lucide-react";

// Dropdown Section Component
const DropdownSection = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.1)",
      overflow: "hidden"
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 20px",
          color: "#cbd5e1",
          fontSize: 16,
          fontWeight: "600",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255,255,255,0.05)";
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
          borderTop: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.2)"
        }}>
          <div style={{ 
            color: "#cbd5e1", 
            lineHeight: 1.6,
            fontSize: 14
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
      const res = await fetch("http://localhost:4000/api/compare", {
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
      setComparison("Failed to generate comparison. Make sure the AI server is running on localhost:4000");
    } finally {
      setLoading(false);
    }
  };

  // If no cars available, show message
  if (carsToCompare.length < 2) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg,#06111c,#2b0f0f)", 
        color: "white", 
        padding: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <button 
          onClick={() => nav("/results")} 
          style={{ 
            background: "none", 
            color: "#cbd5e1", 
            border: "none", 
            cursor: "pointer", 
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}
        >
          <ArrowLeft /> Back to Results
        </button>
        <div style={{ textAlign: "center" }}>
          <Star size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <h2>Not enough cars to compare</h2>
          <p style={{ color: "#9ca3af", marginTop: 10, maxWidth: 400 }}>
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
      background: "linear-gradient(135deg,#06111c,#2b0f0f)", 
      color: "white", 
      padding: 24 
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <button 
            onClick={() => nav("/results")} 
            style={{ 
              background: "none", 
              color: "#cbd5e1", 
              border: "none", 
              cursor: "pointer", 
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14
            }}
          >
            <ArrowLeft size={18} /> Back to Results
          </button>
          
          <h1 style={{ 
            fontSize: 48, 
            fontWeight: "bold", 
            textAlign: "center",
            margin: "0 0 8px 0",
            background: "linear-gradient(135deg, #fff, #9ca3af)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}>
            Compare
          </h1>
          <p style={{ 
            color: "#9ca3af", 
            textAlign: "center",
            fontSize: 18,
            margin: 0
          }}>
            Which Toyota is right for you?
          </p>
        </div>

        {/* Main Comparison Section - Apple Style */}
        <div style={{ 
          background: "rgba(255,255,255,0.02)",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.05)",
          overflow: "hidden",
          marginBottom: 40
        }}>
          {/* Cars Header - No Lines */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            background: "rgba(255,255,255,0.01)",
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
                  src={car1.image} 
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
                fontWeight: "bold"
              }}>
                {car1.name}
              </h3>
              <p style={{ 
                color: "#ef4444", 
                fontSize: 18, 
                fontWeight: "bold",
                margin: "0 0 12px 0"
              }}>
                ${car1.msrp?.toLocaleString()}
              </p>
              <p style={{ 
                color: "#9ca3af", 
                fontSize: 14,
                lineHeight: 1.4,
                textAlign: "center"
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
                  src={car2.image} 
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
                fontWeight: "bold"
              }}>
                {car2.name}
              </h3>
              <p style={{ 
                color: "#ef4444", 
                fontSize: 18, 
                fontWeight: "bold",
                margin: "0 0 12px 0"
              }}>
                ${car2.msrp?.toLocaleString()}
              </p>
              <p style={{ 
                color: "#9ca3af", 
                fontSize: 14,
                lineHeight: 1.4,
                textAlign: "center"
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
                  background: index % 2 === 0 ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.02)",
                  alignItems: "center",
                  minHeight: 80
                }}
              >
                {/* Car 1 Value - Right Aligned */}
                <div style={{ 
                  padding: "20px 40px",
                  textAlign: "right",
                  fontSize: 16,
                  fontWeight: "500"
                }}>
                  {spec.value1}
                </div>
                
                {/* Spec Label - Centered with centered vertical lines */}
                <div style={{ 
                  padding: "20px 40px",
                  color: "#9ca3af",
                  fontWeight: "600",
                  fontSize: 14,
                  textAlign: "center",
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                  borderRight: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 20px"
                }}>
                  {spec.label}
                </div>
                
                {/* Car 2 Value - Left Aligned */}
                <div style={{ 
                  padding: "20px 40px",
                  textAlign: "left",
                  fontSize: 16,
                  fontWeight: "500"
                }}>
                  {spec.value2}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Comparison Section */}
        <div style={{ 
          background: "rgba(255,255,255,0.02)",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.05)",
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
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: "bold"
              }}>
                AI
              </div>
              <h3 style={{ 
                fontSize: 24, 
                margin: 0,
                fontWeight: "bold",
                background: "linear-gradient(135deg, #fff, #9ca3af)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}>
                Smart Comparison
              </h3>
            </div>
            <p style={{ 
              color: "#9ca3af", 
              marginBottom: 20,
              fontSize: 16,
              maxWidth: 500,
              margin: "0 auto 30px auto",
              lineHeight: 1.5
            }}>
              Get AI-powered insights to help you choose the perfect Toyota for your needs
            </p>
            
            <button
              onClick={handleCompare}
              disabled={loading}
              style={{
                background: loading ? "#9ca3af" : "linear-gradient(135deg, #ef4444, #dc2626)",
                border: "none",
                padding: "16px 40px",
                borderRadius: 12,
                cursor: loading ? "not-allowed" : "pointer",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                minWidth: 220,
                boxShadow: loading ? "none" : "0 4px 20px rgba(239, 68, 68, 0.3)",
                transition: "all 0.3s ease"
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
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(255,255,255,0.02))",
              padding: 30, 
              borderRadius: 16,
              border: "1px solid rgba(239, 68, 68, 0.1)"
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
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <h4 style={{ 
                  margin: 0, 
                  color: "#ef4444",
                  fontSize: 20,
                  fontWeight: "bold"
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
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            borderRadius: 12,
            padding: 20,
            textAlign: "center"
          }}>
            <Check size={24} style={{ color: "#22c55e", marginBottom: 8 }} />
            <div style={{ fontWeight: "bold", marginBottom: 4 }}>Choose {car1.name} if:</div>
            <div style={{ color: "#bbf7d0", fontSize: 14 }}>
              {getBestFor(car1.name)} • ${car1.leaseMonthly}/mo lease • {car1.mpg} MPG
            </div>
          </div>
          
          <div style={{ 
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            borderRadius: 12,
            padding: 20,
            textAlign: "center"
          }}>
            <Check size={24} style={{ color: "#22c55e", marginBottom: 8 }} />
            <div style={{ fontWeight: "bold", marginBottom: 4 }}>Choose {car2.name} if:</div>
            <div style={{ color: "#bbf7d0", fontSize: 14 }}>
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