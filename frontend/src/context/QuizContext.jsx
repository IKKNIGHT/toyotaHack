// src/context/QuizContext.jsx
import React, { createContext, useState, useContext } from 'react'

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [answers, setAnswers] = useState({})
  const [selectedCars, setSelectedCars] = useState([])
  const [favorites, setFavorites] = useState([])

  return (
    <QuizContext.Provider
      value={{ answers, setAnswers, selectedCars, setSelectedCars, favorites, setFavorites }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizContext)
