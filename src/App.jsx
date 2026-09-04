import React from 'react'
import Navbar from './components/common/Navbar'
import HeroSection from './components/hero/HeroSection'

import ReviewsSection from './components/reviews/ReviewsSection'
import ContactSection from './components/contact/ContactSection'
import './App.css'
import BranchesSection from './components/branches/BranchesSection'
import BlogSection from './components/blog/BlogSection'
import Footer from './components/common/Footer'
function App() {
  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Navbar />


      <main>
        <HeroSection />
        <BranchesSection />
        <ReviewsSection />
        <BlogSection />
        <ContactSection />
        <Footer />

      </main>



    </div>
  )
}

export default App
