import React, { useState, useEffect } from 'react'
import { Coffee, Calendar, Menu as MenuIcon, X, LogIn } from 'lucide-react'
import BookingModal from '../../book_catering/BookCatering'  // Import the modal
import './Navbar.css'
import SignInModal from '../../authentication/Signin'

export default function Navbar({ onOpenReservation }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)  // New state
  const [isSignInOpen, setIsSignInOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = () => setMobileMenuOpen(false)
  const handleSignIn = () => {
    setIsSignInOpen(true)
    closeMobile()
  }

  const handleCloseSignIn = () => {
    setIsSignInOpen(false)
  }

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true)
    closeMobile()
  }

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false)
  }

  return (
    <>
      <header className={`navbar-minimal-header ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="navbar-minimal container" aria-label="Main Navigation">
          {/* Brand Logo */}
          <a href="#" className="brand-minimal-logo" onClick={closeMobile}>
            <div className="logo-square">
              <Coffee size={20} className="logo-icon-svg" />
            </div>
            <div className="logo-brand-text">
              <span className="brand-title-main">WERKA</span>
              <span className="brand-title-sub">BOLE • SUMMIT • LEBU</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-minimal-links">
            <li><a href="#hero" className="nav-item-link">Home</a></li>
            <li><a href="#branches" className="nav-item-link">Where are Branches</a></li>
            <li><a href="#reviews" className="nav-item-link">Reviews</a></li>
            <li><a href="#contact" className="nav-item-link">Contact</a></li>
          </ul>

          {/* Minimalist CTA */}
          <div className="nav-actions-minimal">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleOpenBooking}  // Updated to open modal
            >
              <Calendar size={14} />
              <span>Book Catering</span>
            </button>

            {/* Sign In Button */}
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleSignIn}
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <div className={`mobile-drawer-minimal ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-drawer-links">
            <li><a href="#hero" onClick={closeMobile}>Home</a></li>
            <li><a href="#branches" onClick={closeMobile}>Where are Branches</a></li>
            <li><a href="#reviews" onClick={closeMobile}>Reviews</a></li>

            <li><a href="#contact" onClick={closeMobile}>Contact</a></li>
          </ul>
          <div className="mobile-drawer-buttons">
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleOpenBooking}  // Updated to open modal
            >
              <Calendar size={15} />
              <span>Book Catering</span>
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ width: '100%' }}
              onClick={() => {
                closeMobile()
                handleSignIn()
              }}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </header>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
      />
      {isSignInOpen && (
        <SignInModal
          isOpen={isSignInOpen}
          onClose={handleCloseSignIn}
          initialMode="signin" // or "signup" for sign-up mode
        />
      )}

    </>
  )
}