// src/components/Quiz.jsx
import React, { useState } from "react";
import { Heart, X, ChevronRight, ArrowLeft, Check } from "lucide-react";

export default function Quiz() {
  const [stage, setStage] = useState("welcome");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [cars, setCars] = useState([]);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [likedCars, setLikedCars] = useState([]);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const questions = [
    {
      id: "location",
      question: "Where do you call home?",
      options: ["Urban Core", "Suburban Life", "Rural Freedom"],
    },
    {
      id: "commute",
      question: "What's your daily journey like?",
      options: ["Under 10 miles", "10-30 miles", "30-50 miles", "50+ miles"],
    },
    {
      id: "future_family",
      question: "Do you envision little ones in your future?",
      options: [
        "Already have kids",
        "Planning within 2 years",
        "Maybe someday",
        "Just me & my ride",
      ],
    },
    {
      id: "adventure",
      question: "How far would you drive for an unforgettable experience?",
      options: [
        "30 minutes max",
        "1-2 hours",
        "3-5 hours",
        "Distance is just a number",
      ],
    },
    {
      id: "relocation",
      question: "What's your mobility horizon?",
      options: [
        "Settled & rooted",
        "Might relocate soon",
        "Always on the move",
        "Exploring options",
      ],
    },
    {
      id: "lifestyle",
      question: "Which describes your vibe?",
      options: [
        "Weekend warrior",
        "Daily adventurer",
        "City sophisticate",
        "Practical minimalist",
      ],
    },
    {
      id: "priorities",
      question: "What matters most in your future ride?",
      options: [
        "Fuel efficiency",
        "Space & comfort",
        "Tech & innovation",
        "Performance & style",
      ],
    },
  ];

  const mockCars = [
    {
      id: 1,
      name: "Toyota Camry",
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
      msrp: "$28,855",
      mpg: "32 combined",
      insurance: "$1,450/year",
      maintenance: "$450/year",
      description: "Elegant sedan perfect for daily sophistication",
    },
    {
      id: 2,
      name: "Toyota RAV4",
      image:
        "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
      msrp: "$32,475",
      mpg: "30 combined",
      insurance: "$1,680/year",
      maintenance: "$520/year",
      description: "Versatile SUV for every adventure",
    },
    {
      id: 3,
      name: "Toyota Corolla",
      image:
        "https://images.unsplash.com/photo-1627454820516-d8e5971fc4f5?w=800&q=80",
      msrp: "$22,050",
      mpg: "35 combined",
      insurance: "$1,250/year",
      maintenance: "$380/year",
      description: "Efficient companion for the practical minimalist",
    },
    {
      id: 4,
      name: "Toyota Highlander",
      image:
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80",
      msrp: "$42,370",
      mpg: "24 combined",
      insurance: "$1,890/year",
      maintenance: "$580/year",
      description: "Spacious sanctuary for growing families",
    },
    {
      id: 5,
      name: "Toyota Prius",
      image:
        "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80",
      msrp: "$28,545",
      mpg: "56 combined",
      insurance: "$1,320/year",
      maintenance: "$420/year",
      description: "Eco-conscious innovation for the future",
    },
  ];

  const handleQuizAnswer = (answer) => {
    const newAnswers = { ...quizAnswers, [questions[currentQuestion].id]: answer };
    setQuizAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage("loading");
      setTimeout(() => {
        setCars(mockCars);
        setStage("swipe");
      }, 1500);
    }
  };

  const handleSwipe = (direction) => {
    if (direction === "right") {
      setLikedCars([...likedCars, cars[currentCarIndex]]);
    }
    if (currentCarIndex < cars.length - 1) {
      setCurrentCarIndex(currentCarIndex + 1);
    } else {
      setStage("liked");
    }
  };

  const toggleCompareSelection = (car) => {
    if (selectedForCompare.find((c) => c.id === car.id)) {
      setSelectedForCompare(selectedForCompare.filter((c) => c.id !== car.id));
    } else if (selectedForCompare.length < 2) {
      setSelectedForCompare([...selectedForCompare, car]);
    }
  };

  const currentCar = cars[currentCarIndex];

  // -------- JSX UI Rendering ----------
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #450a0a 50%, #0f172a 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {/* Welcome Screen */}
      {stage === "welcome" && (
        <div
          style={{
            textAlign: "center",
            marginTop: "10vh",
          }}
        >
          <div style={{ color: "#ef4444", fontSize: "64px", fontWeight: "bold" }}>
            TOYOTA
          </div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#f87171",
              marginTop: "10px",
            }}
          >
            Find Your Dream Car
          </h1>
          <p style={{ color: "#d1d5db", fontSize: "18px", margin: "10px 0" }}>
            A journey into your automotive future.
          </p>
          <p
            style={{
              color: "#9ca3af",
              maxWidth: "500px",
              margin: "20px auto",
              lineHeight: "1.5",
            }}
          >
            Your perfect car isn’t just about today — it’s about where you’re going.
          </p>
          <button
            onClick={() => setStage("quiz")}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "9999px",
              padding: "15px 40px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Begin Your Journey <ChevronRight style={{ display: "inline" }} />
          </button>
        </div>
      )}

      {/* Quiz Screen */}
      {stage === "quiz" && (
        <div style={{ maxWidth: "600px", margin: "0 auto", marginTop: "10vh" }}>
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#9ca3af",
                fontSize: "14px",
              }}
            >
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div
              style={{
                backgroundColor: "#374151",
                borderRadius: "10px",
                height: "8px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  height: "8px",
                  borderRadius: "10px",
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  background: "linear-gradient(to right, #ef4444, #b91c1c)",
                  transition: "width 0.3s",
                }}
              ></div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(31, 41, 55, 0.7)",
              border: "1px solid #4b5563",
              borderRadius: "20px",
              padding: "30px",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {questions[currentQuestion].question}
            </h2>
            {questions[currentQuestion].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuizAnswer(opt)}
                style={{
                  width: "100%",
                  backgroundColor: "#374151",
                  border: "1px solid #4b5563",
                  borderRadius: "12px",
                  color: "white",
                  textAlign: "left",
                  padding: "15px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#7f1d1d")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading Screen */}
      {stage === "loading" && (
        <div style={{ textAlign: "center", marginTop: "25vh" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              border: "5px solid rgba(239, 68, 68, 0.3)",
              borderTop: "5px solid #ef4444",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "auto",
            }}
          />
          <h2 style={{ marginTop: "20px", fontSize: "24px", fontWeight: "bold" }}>
            Crafting Your Perfect Matches
          </h2>
          <p style={{ color: "#9ca3af" }}>Analyzing your preferences...</p>
        </div>
      )}

      {/* Swipe Screen */}
      {stage === "swipe" && currentCar && (
        <div style={{ textAlign: "center", marginTop: "5vh" }}>
          <button
            onClick={() => setStage("liked")}
            style={{
              color: "#9ca3af",
              border: "none",
              background: "none",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            <ArrowLeft style={{ display: "inline" }} /> View Liked ({likedCars.length})
          </button>

          <div
            style={{
              width: "90%",
              maxWidth: "400px",
              margin: "0 auto",
              backgroundColor: "#1f2937",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid #4b5563",
            }}
          >
            <img
              src={currentCar.image}
              alt={currentCar.name}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{currentCar.name}</h2>
              <p style={{ color: "#9ca3af", marginBottom: "10px" }}>
                {currentCar.description}
              </p>
              <div>
                <div>MSRP: {currentCar.msrp}</div>
                <div>MPG: {currentCar.mpg}</div>
                <div>Insurance: {currentCar.insurance}</div>
                <div>Maintenance: {currentCar.maintenance}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => handleSwipe("left")}
              style={{
                backgroundColor: "#374151",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                border: "none",
                marginRight: "20px",
                cursor: "pointer",
              }}
            >
              <X size={28} />
            </button>
            <button
              onClick={() => handleSwipe("right")}
              style={{
                backgroundColor: "#dc2626",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Heart size={28} />
            </button>
          </div>
        </div>
      )}

      {/* Favorites / Compare screens are similar—can include next */}
    </div>
  );
}
