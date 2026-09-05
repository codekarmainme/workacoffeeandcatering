import React, { useState } from 'react'
import Navbar from './components/common/Navbar'
import HeroSection from './components/hero/HeroSection'
import CartPage from './components/cart/CartPage'

import ReviewsSection from './components/reviews/ReviewsSection'
import ContactSection from './components/contact/ContactSection'
import './App.css'
import BranchesSection from './components/branches/BranchesSection'
import BlogSection from './components/blog/BlogSection'
import Footer from './components/common/Footer'

function App() {
  const [showCart, setShowCart] = useState(false)

  const openCart = () => {
    setShowCart(true)
    window.scrollTo(0, 0)
  }

  const closeCart = () => {
    setShowCart(false)
    window.scrollTo(0, 0)
  }

  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Navbar onOpenCart={openCart} onNavigateHome={closeCart} />

      <main>
        {showCart ? (
          <CartPage onClose={closeCart} />
        ) : (
          <>
            <HeroSection />
            <BranchesSection />
            <ReviewsSection />
            <BlogSection />
            <ContactSection />
            <Footer />
          </>
        )}
      </main>
    </div>
  )
}

export default App