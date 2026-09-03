import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import './ContactSection.css'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1500)
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@werkacoffee.com',
      href: 'mailto:hello@werkacoffee.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+251 911 234 567',
      href: 'tel:+251911234567'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Bole, Addis Ababa, Ethiopia',
      href: 'https://maps.google.com'
    }
  ]

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <span className="contact-badge">Get in Touch</span>
          <h2 className="contact-title">Let's Connect</h2>
          <p className="contact-description">
            Have a question, want to book an event, or just want to say hello?
            We'd love to hear from you.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="contact-grid">

          {/* Left Column - Contact Info */}
          <div className="contact-info">
            {/* Heading */}
            <div className="info-heading">
              <h3 className="info-title">Visit Our Café</h3>
              <p className="info-text">
                Stop by for a cup of Ethiopia's finest coffee. Our doors are open
                from early morning until late evening, seven days a week.
              </p>
            </div>

            {/* Opening Hours */}
            <div className="hours-card">
              <h4 className="hours-title">Opening Hours</h4>
              <div className="hours-list">
                <div className="hours-item">
                  <span>Monday - Friday</span>
                  <span className="hours-time">7:00 AM - 10:00 PM</span>
                </div>
                <div className="hours-item">
                  <span>Saturday - Sunday</span>
                  <span className="hours-time">8:00 AM - 11:00 PM</span>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="contact-methods">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <a
                    key={index}
                    href={method.href}
                    target={method.label === 'Address' ? '_blank' : undefined}
                    rel={method.label === 'Address' ? 'noopener noreferrer' : undefined}
                    className="contact-method"
                  >
                    {/* Icon Square */}
                    <div className="method-icon">
                      <Icon size={20} />
                    </div>

                    {/* Text */}
                    <div className="method-text">
                      <p className="method-label">{method.label}</p>
                      <p className="method-value">{method.value}</p>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Trust Badge */}
            <div className="trust-badge">
              <div className="trust-avatars">
                <span className="avatar">⭐</span>
                <span className="avatar">☕</span>
                <span className="avatar">❤️</span>
                <span className="avatar">✨</span>
              </div>
              <div className="trust-text">
                <p className="trust-main">Join 5,000+ Happy Guests</p>
                <p className="trust-sub">Rated 4.9/5 on Google</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="contact-form-card">
            <div className="form-header">
              <h3 className="form-title">Send a Message</h3>
              <p className="form-subtitle">We'll get back to you within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name & Email */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="form-textarea"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isSubmitted}
                className={`submit-btn ${isLoading ? 'loading' : ''} ${isSubmitted ? 'success' : ''}`}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Sending...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={18} />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Success Message */}
              {isSubmitted && (
                <div className="success-message">
                  ✓ Thank you! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}