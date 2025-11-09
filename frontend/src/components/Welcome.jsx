import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()
  return (
    <div style={{padding:40}}>
      <h1>Welcome</h1>
      <p>Welcome to the Toyota quiz — quick starter page.</p>
      <button onClick={() => navigate('/quiz')}>Start Quiz</button>
    </div>
  )
}
