import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export default function Quiz() {
  const nav = useNavigate();
  const { answers, setAnswers, setMatchedCars } = useQuiz();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch quiz questions from backend
    fetch("http://localhost:4000/api/questions")
      .then(r => {
        if (!r.ok) throw new Error("Failed to fetch questions");
        return r.json();
      })
      .then(setQuestions)
      .catch((err) => {
        console.error("Failed to load questions:", err);
        // Fallback questions
        setQuestions([
          { id: "location", question: "Where do you call home?", options: ["Urban Core","Suburban Life","Rural Freedom"] },
          { id: "commute", question: "What's your daily journey like?", options: ["Under 10 miles","10-30 miles","30-50 miles","50+ miles"] },
          { id: "future_family", question: "Do you plan to have kids or grow family in next 5 years?", options: ["Already have kids","Planning within 2 years","Maybe someday","No plans"] },
          { id: "adventure", question: "Are you a weekend road tripper / outdoor person?", options: ["Not at all","Occasional trips","Monthly adventures","Every weekend!"] },
          { id: "relocation", question: "Are you likely to move or commute more in future?", options:["I stay put","Might relocate","Often move for work","Always moving"] },
          { id: "lifestyle", question: "Which describes your vibe?", options:["Practical","Tech-forward","Performance-centric","Family-first"] },
          { id: "priorities", question: "Top priority for your new car?", options:["Fuel efficiency","Space & comfort","Tech & safety","Performance & style"] }
        ]);
      });
  }, []);

  const handlePick = (opt) => {
    const q = questions[index];
    const newAnswers = { ...answers, [q.id]: opt };
    setAnswers(newAnswers);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      // Submit to backend to get matched cars
      setLoading(true);
      fetch("http://localhost:4000/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: newAnswers })
      })
        .then(r => {
          if (!r.ok) throw new Error("Failed to match cars");
          return r.json();
        })
        .then(data => {
          console.log("Matched cars data:", data);
          setMatchedCars(data.results || []);
          setLoading(false);
          nav("/results");
        })
        .catch(err => {
          console.error("Match error:", err);
          setLoading(false);
          // Fallback with sample cars
          setMatchedCars([
            {
              id: 1,
              name: "Toyota Corolla Hybrid",
              image: "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/corolla/1H0/1.png",
              description: "Fuel-efficient compact perfect for city driving",
              msrp: 24500,
              mpg: 52,
              leaseMonthly: 249
            },
            {
              id: 2,
              name: "Toyota RAV4 Hybrid",
              image: "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/rav4/1H0/1.png",
              description: "Versatile SUV with great fuel economy",
              msrp: 31500,
              mpg: 40,
              leaseMonthly: 329
            }
          ]);
          nav("/results");
        });
    }
  };

  if (!questions.length) return <div style={{ padding: 40, color: "white" }}>Loading quiz...</div>;

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Inter, Arial, sans-serif", background: "linear-gradient(135deg,#071421,#2b0d0d)", color: "white", padding: 24 }}>
      <div style={{ maxWidth: 760, margin: "40px auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1", fontSize: 14 }}>
          <div>Question {index + 1} / {questions.length}</div>
          <div>{Math.round(((index + 1) / questions.length) * 100)}%</div>
        </div>

        <div style={{ marginTop: 16, height: 10, background: "#1f2937", borderRadius: 8 }}>
          <div style={{
            width: `${((index + 1) / questions.length) * 100}%`,
            height: "100%",
            borderRadius: 8,
            background: "linear-gradient(90deg,#ef4444,#b91c1c)"
          }} />
        </div>

        <div style={{ marginTop: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: 26, borderRadius: 18 }}>
          <h2 style={{ fontSize: 26, marginBottom: 14 }}>{questions[index].question}</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {questions[index].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handlePick(opt)}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: 16
                }}
                onMouseOver={(e)=> e.currentTarget.style.background = "rgba(220,38,38,0.12)"}
                onMouseOut={(e)=> e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {loading && <div style={{ marginTop: 18, color: "#cbd5e1" }}>Matching cars for you...</div>}
      </div>
    </div>
  );
}