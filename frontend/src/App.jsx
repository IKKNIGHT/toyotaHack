// App.jsx — application routes
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext'

import Welcome from './components/Welcome'
import Quiz from './quiz'
import Results from './components/Results'
import Compare from './components/Compare'

export default function App() {
  return (
    <QuizProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </QuizProvider>
  )
}
