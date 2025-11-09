import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Compare() {
  const navigate = useNavigate()
  return (
    <div style={{padding:40}}>
      <h1>Compare</h1>
      <p>Compare selected cars side-by-side.</p>
      <button onClick={() => navigate('/results')}>Back to Results</button>
    </div>
  )
}
