import React, { useState, useEffect } from 'react'
import { X, Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react'
import './Signin.css'

export default function SignInModal({ isOpen, onClose, initialMode = 'signup' }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [mode, setMode] = useState(initialMode) // 'signup' or 'signin'
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
      setMode(initialMode)
      setErrors({})
      setTouched({})
    }, 300)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched({
      ...touched,
      [name]: true
    })

    // Validate on blur
    if (name === 'email' && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setErrors({
          ...errors,
          email: 'Please enter a valid email address'
        })
      }
    }

    if (name === 'password' && formData.password && mode === 'signup') {
      if (formData.password.length < 6) {
        setErrors({
          ...errors,
          password: 'Password must be at least 6 characters'
        })
      }
    }

    if (name === 'confirmPassword' && formData.confirmPassword && mode === 'signup') {
      if (formData.confirmPassword !== formData.password) {
        setErrors({
          ...errors,
          confirmPassword: 'Passwords do not match'
        })
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (mode === 'signup' && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (mode === 'signup' && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (mode === 'signup' && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      // Focus the first field with error
      const firstError = Object.keys(errors)[0]
      if (firstError) {
        document.querySelector(`[name="${firstError}"]`)?.focus()
      }
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      console.log('Form submitted:', formData)
      // Show success or handle accordingly
      handleClose()
    }, 1500)
  }

  const toggleMode = () => {
    setMode(mode === 'signup' ? 'signin' : 'signup')
    setErrors({})
    setTouched({})
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  if (!isOpen && !isAnimating) return null

  return (
    <div
      className={`signin-overlay ${isOpen ? 'open' : 'closing'}`}
      onClick={handleBackdropClick}
    >
      <div className={`signin-modal ${isOpen ? 'open' : 'closing'}`}>
        {/* Close button - top right */}
        <button
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="signin-card">
          {/* Header */}
          <div className="signin-header">
            <div className="signin-icon">
              <User size={28} strokeWidth={1.5} />
            </div>
            <h2 className="signin-title">
              {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="signin-subtitle">
              {mode === 'signup' ? 'Join us and start your journey' : 'Sign in to your account'}
              <span className="signin-link" onClick={toggleMode}>
                {mode === 'signup' ? ' Sign in' : ' Sign up'}
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="signin-form">
            {/* Full Name - only on signup */}
            {mode === 'signup' && (
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    className={`form-input ${errors.fullName && touched.fullName ? 'error' : ''}`}
                  />
                </div>
                {errors.fullName && touched.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>
            )}

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                />
              </div>
              {errors.email && touched.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                  className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && touched.password ? (
                <span className="error-message">{errors.password}</span>
              ) : mode === 'signup' && (
                <span className="password-hint">
                  Must be at least 6 characters
                </span>
              )}
            </div>

            {/* Confirm Password - only on signup */}
            {mode === 'signup' && (
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Confirm your password"
                    className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
                  />
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  {mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                mode === 'signup' ? 'Create Account' : 'Sign In'
              )}
            </button>

            {/* Legal Line */}
            {mode === 'signup' && (
              <p className="legal-text">
                By creating an account, you agree to our{' '}
                <a href="#" className="legal-link">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="legal-link">Privacy Policy</a>
              </p>
            )}

            {/* Divider for signin */}
            {mode === 'signin' && (
              <div className="signin-divider">
                <span className="divider-line"></span>
                <span className="divider-text">or</span>
                <span className="divider-line"></span>
              </div>
            )}

            {/* Social sign in options - only for signin */}
            {mode === 'signin' && (
              <div className="social-options">
                <button type="button" className="social-btn google">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4" />
                    <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853" />
                    <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05" />
                    <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
                <button type="button" className="social-btn apple">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M14.7559 9.54708C14.7468 8.04342 15.5992 6.76623 17.0006 5.85574C16.1993 4.73974 14.9143 4.02516 13.4013 3.97389C11.7032 3.81761 10.1044 5.00973 9.19876 5.00973C8.25738 5.00973 6.94418 4.03924 5.54977 4.07327C3.74263 4.13948 2.07862 5.13025 1.14882 6.71808C-0.745453 9.91225 0.675238 14.6922 2.56726 17.2606C3.42491 18.4726 4.45363 19.8226 5.85952 19.7559C7.21509 19.6883 7.77041 18.9392 9.37683 18.9392C10.9485 18.9392 11.4651 19.7559 12.903 19.7171C14.4123 19.6883 15.3068 18.4927 16.1246 17.2676C16.8112 16.2591 17.2995 15.1183 17.5988 13.9135C15.907 13.238 14.7649 11.5277 14.7559 9.54708V9.54708Z" fill="#000000" />
                    <path d="M12.2889 3.19182C13.1112 2.21608 13.497 0.915912 13.3381 -0.355469C12.0665 -0.250613 10.8052 0.376326 10.0808 1.32918C9.35284 2.24116 8.98393 3.55423 9.09249 4.80681C10.2344 4.91723 11.4478 4.28185 12.2889 3.19182V3.19182Z" fill="#000000" />
                  </svg>
                  Continue with Apple
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}