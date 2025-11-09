import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [answers, setAnswers] = useState({});
  const [matchedCars, setMatchedCars] = useState([]);
  const [likedCars, setLikedCars] = useState([]);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const value = {
    answers,
    setAnswers,
    matchedCars,
    setMatchedCars,
    likedCars,
    setLikedCars,
    selectedForCompare,
    setSelectedForCompare
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  return useContext(QuizContext);
}