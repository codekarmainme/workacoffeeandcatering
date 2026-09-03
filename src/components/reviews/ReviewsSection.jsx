import React, { useState, useRef } from 'react'
import { Star, CheckCircle, Sparkles, Award, Heart, Quote } from 'lucide-react'
import { REVIEWS } from '../../data/reviewsData'
import './ReviewsSection.css'

// Triple the reviews so the marquee loops seamlessly
const LOOPED = [...REVIEWS, ...REVIEWS, ...REVIEWS]

export default function ReviewsSection() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">

        {/* Decorative background */}
        <div className="reviews-bg-decoration" aria-hidden="true">
          <div className="decoration-circle circle-1" />
          <div className="decoration-circle circle-2" />
          <div className="decoration-circle circle-3" />
        </div>

        {/* Header */}
        <div className="section-header reviews-header">
          <div className="header-badge">
            <Sparkles size={14} />
            <span>Testimonials</span>
          </div>
          <h2 className="section-title">
            <span className="title-highlight">What people</span>
            <span className="title-rest">are saying</span>
          </h2>

        </div>

        {/* Rating summary */}
        <div className="rating-summary-modern">
          <div className="rating-stats">
            <div className="stat-item stat-score">
              <span className="stat-number">4.9</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">1,200+</span>
              <span className="stat-label">Verified Reviews</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item stat-badge">
              <div className="badge-icon">
                <Award size={20} />
              </div>
              <div>
                <span className="stat-label">Top 1%</span>
                <span className="stat-sub-label">Specialty Roaster</span>
              </div>
            </div>
          </div>
          <div className="rating-stars-large">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                fill="#000000"
                color="#000000"
                className="star-animated"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Continuous right-to-left marquee */}
        <div
          className="reviews-marquee-outer"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="marquee-fade-left" aria-hidden="true" />
          <div className="marquee-fade-right" aria-hidden="true" />

          <div className={`reviews-marquee-track${paused ? ' paused' : ''}`}>
            {LOOPED.map((rev, i) => (
              <ReviewCard key={`${rev.id}-${i}`} rev={rev} />
            ))}
          </div>
        </div>

        {/* Footer stats */}
        <div className="reviews-stats-footer">
          <div className="stat-floating">
            <Heart size={16} fill="#000" color="#000" />
            <span>98% would recommend</span>
          </div>
          <div className="stat-floating">
            <span className="stat-emoji">☕</span>
            <span>5,000+ cups served daily</span>
          </div>
          <div className="stat-floating">
            <span className="stat-emoji">⭐</span>
            <span>Featured in Addis Food Guide</span>
          </div>
        </div>

      </div>
    </section>
  )
}

function ReviewCard({ rev }) {
  return (
    <div className="rev-card">
      {/* macOS window chrome */}
      <div className="rev-card-chrome">
        <div className="chrome-dots">
          <span className="chrome-dot dot-red" title="Close" />
          <span className="chrome-dot dot-yellow" title="Minimise" />
          <span className="chrome-dot dot-green" title="Expand" />
        </div>
        <span className="chrome-title">Worka Coffee Review</span>
      </div>

      {/* Card body */}
      <div className="rev-card-body">
        <div className="rev-quote-icon" aria-hidden="true">
          <Quote size={26} />
        </div>

        <div className="rev-stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              fill={i < rev.rating ? '#000' : '#e0e0e0'}
              color={i < rev.rating ? '#000' : '#e0e0e0'}
            />
          ))}
        </div>

        <p className="rev-text">"{rev.text}"</p>

        <div className="rev-author">
          <div className="rev-avatar">
            <span className="rev-avatar-initial">{rev.author.charAt(0)}</span>
            <span className="rev-avatar-ring" aria-hidden="true" />
          </div>
          <div className="rev-author-info">
            <div className="rev-author-name">
              {rev.author}
              <span className="rev-verified" title="Verified">
                <CheckCircle size={13} />
              </span>
            </div>
            <span className="rev-author-role">{rev.role}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
