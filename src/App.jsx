import React, { useState } from 'react'
import Navbar from './components/common/Navbar'
import HeroSection from './components/hero/HeroSection'

import ReviewsSection from './components/reviews/ReviewsSection'
import ContactSection from './components/contact/ContactSection'
import './App.css'
import BranchesSection from './components/branches/BranchesSection'
import Footer from './components/common/Footer'
function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false)

  const handleOpenReservation = () => setIsReservationOpen(true)
  const handleCloseReservation = () => setIsReservationOpen(false)

  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Navbar onOpenReservation={handleOpenReservation} />


      <main>
        <HeroSection onOpenReservation={handleOpenReservation} />
        <BranchesSection />

        <ReviewsSection />
        <ContactSection />
        <Footer />

      </main>



    </div>
  )
}

export default App
