import { Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Details from './pages/Details'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/job/:id" element={<Details />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}