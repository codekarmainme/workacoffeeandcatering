import React, { useState } from 'react'
import { Coffee, ArrowRight, MapPin, Quote } from 'lucide-react'
import BookingModal from '../../book_catering/BookCatering'
import './HeroSection.css'

// Cloudinary image URLs - Replace local imports with these
const IMAGES = {
  beyaynetu: 'https://res.cloudinary.com/mbeopgek/image/upload/v1788442241/IMG_1717.jpg',
  coffee: 'https://res.cloudinary.com/mbeopgek/image/upload/v1788442230/IMG_1716.jpg',
  kitfo: 'https://res.cloudinary.com/mbeopgek/image/upload/v1788442229/IMG_5708.jpg',
  banquet: 'https://res.cloudinary.com/mbeopgek/image/upload/v1788442231/photo_2026-09-03_10-33-18.jpg',
  shiro: 'https://res.cloudinary.com/mbeopgek/image/upload/v1788442225/IMG_1703.jpg',
  burger: 'https://res.cloudinary.com/mbeopgek/image/upload/v1788442229/IMG_1718.jpg'
}

// Six dishes placed evenly around the orbit (60° apart), starting at the top.
const ORBIT_NODES = [
  {
    img: IMAGES.beyaynetu,
    alt: 'Werka signature beyaynetu feast',
    am: 'በያይነቱ',
    en: 'Signature Feast',
    angle: -90,
    size: 140
  },
  {
    img: IMAGES.coffee,
    alt: 'Traditional Ethiopian coffee ceremony',
    am: 'ቡና',
    en: 'Coffee Ceremony',
    angle: -30,
    size: 110
  },
  {
    img: IMAGES.kitfo,
    alt: 'Kitfo, minced seasoned beef',
    am: 'ክትፎ',
    en: 'Kitfo',
    angle: 30,
    size: 132
  },
  {
    img: IMAGES.banquet,
    alt: 'Traditional morning banquet spread',
    am: 'የቁርስ ማዕድ',
    en: 'Morning Banquet',
    angle: 90,
    size: 116
  },
  {
    img: IMAGES.shiro,
    alt: 'Sizzling clay pot shiro',
    am: 'ሽሮ',
    en: 'Clay Pot Shiro',
    angle: 150,
    size: 128
  },
  {
    img: IMAGES.burger,
    alt: "Werka's house fusion burger",
    am: null,
    en: 'House Fusion',
    angle: 210,
    size: 104
  },
]

export default function HeroSection() {
  const [bookingOpen, setBookingOpen] = useState(false)

  const openBooking = (e) => {
    if (e) e.preventDefault()
    setBookingOpen(true)
  }

  const closeBooking = () => {
    setBookingOpen(false)
  }

  return (
    <>
      <section className="hero-orbit-section" id="hero">
        <div className="container hero-orbit-container">

        {/* Editorial Text Block */}
        <div className="hero-copy">
          <span className="hero-rule" aria-hidden="true" />

          <h1 className="hero-headline">
            Foods From
            <br />
            <span className="hero-headline-serif">All Over Ethiopia</span>
          </h1>

          <p className="hero-sub">
            Best Cultural Restaurant in Addis Ababa.
          </p>

          <div className="hero-cta-row">
            <button type="button" className="hero-cta-primary" onClick={openBooking}>
              <span>Book Catering</span>
              <ArrowRight size={16} strokeWidth={1.8} className="hero-cta-arrow" />
            </button>

            <a href="#branches" className="hero-cta-secondary">
              <MapPin size={15} strokeWidth={1.8} />
              <span>View Branches</span>
            </a>
          </div>

          <a href="#testimonials" className="hero-testimonial-teaser">
            <Quote size={18} strokeWidth={1.6} className="hero-testimonial-icon" />
            <div>
              <p className="hero-testimonial-quote">
                "The most honest Ethiopian kitchen in Addis — every plate tastes like home."
              </p>
              <span className="hero-testimonial-link">Read guest stories</span>
            </div>
          </a>
        </div>

        {/* Orbiting, wire-connected gallery */}
        <div className="hero-orbit-stage">
          <span className="orbit-guide-ring ring-outer" aria-hidden="true" />
          <span className="orbit-guide-ring ring-inner" aria-hidden="true" />

          <div className="orbit-hub">
            <Coffee size={20} strokeWidth={1.4} />
            <span className="orbit-hub-label">Werka</span>
          </div>

          <div className="orbit-ring">
            {ORBIT_NODES.map((node, i) => (
              <React.Fragment key={node.en}>
                <div
                  className="orbit-wire"
                  style={{ '--angle': `${node.angle}deg`, '--delay': `${i * 90}ms` }}
                  aria-hidden="true"
                />
                <div
                  className="orbit-node"
                  style={{ '--angle': `${node.angle}deg`, '--node-size': `${node.size}px` }}
                >
                  <div className="orbit-node-content" style={{ '--delay': `${i * 90}ms` }}>
                    <div className="orbit-node-inner">
                      <img
                        src={node.img}
                        alt={node.alt}
                        className="orbit-node-img"
                        loading={i < 2 ? 'eager' : 'lazy'}
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.target.onerror = null
                          e.target.src = 'https://via.placeholder.com/400x400/000000/ffffff?text=Werka'
                        }}
                      />
                    </div>
                    <div className="orbit-node-tag">
                      {node.am && <span className="cap-am">{node.am}</span>}
                      <span className="cap-en">{node.en}</span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={closeBooking} />
    </>
  )
}