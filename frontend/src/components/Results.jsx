import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Results() {
  const navigate = useNavigate()
  return (
    <div style={{padding:40}}>
      <h1>Results</h1>
      <p>Your matched Toyotas will appear here.</p>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  )
}
