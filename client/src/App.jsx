import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './app.css'
import Register from './pages/Register'

function App() {

  return (
   <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Footer />
   </div>
  )
}

export default App
