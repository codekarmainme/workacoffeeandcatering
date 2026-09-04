import React, { useState, useEffect } from 'react'
import {
    X, ChevronLeft, Check, CreditCard, User, Calendar,
    Clock, Users, Coffee, Utensils, Sparkles, Crown,
    MapPin, Phone, Mail, MessageSquare, ArrowRight
} from 'lucide-react'
import { DatePicker, TimePicker } from './Pickers'
import './Checkout.css'

function formatTime(value) {
    if (!value) return ''
    const [h, m] = value.split(':').map(Number)
    const h12 = h % 12 === 0 ? 12 : h % 12
    const ampm = h < 12 ? 'AM' : 'PM'
    return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`
}

export default function CheckoutModal({ isOpen, onClose, selectedPlan }) {
    const [isAnimating, setIsAnimating] = useState(false)
    const [step, setStep] = useState(1) // 1: Details, 2: Review, 3: Confirmation
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        eventDate: '',
        eventTime: '',
        guestCount: '',
        eventType: 'private',
        specialRequests: '',
        address: '',
        city: '',
        paymentMethod: 'credit_card'
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPickerError, setShowPickerError] = useState(false)

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
            setStep(1)
        }, 300)
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose()
        }
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleNext = (e) => {
        e.preventDefault()

        if (!formData.eventDate || !formData.eventTime) {
            setShowPickerError(true)
            window.scrollTo(0, 0)
            return
        }
        setShowPickerError(false)
        setStep(2)
        window.scrollTo(0, 0)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setStep(3)
        }, 2000)
    }

    const handleBack = () => {
        setStep(1)
        window.scrollTo(0, 0)
    }

    const getPlanDetails = () => {
        const plans = {
            basic: {
                name: 'Essential',
                price: '₿r 3,500',
                icon: Coffee,
                features: ['Serves 25 guests', '3 coffee selections', 'Pastry platter']
            },
            pro: {
                name: 'Premium',
                price: '₿r 7,500',
                icon: Crown,
                features: ['Serves 60 guests', '5 coffee selections', 'Full catering']
            },
            enterprise: {
                name: 'Enterprise',
                price: '₿r 12,500',
                icon: Sparkles,
                features: ['Serves 120 guests', '7 coffee selections', 'Full catering menu']
            }
        }
        return plans[selectedPlan] || plans.basic
    }

    const plan = getPlanDetails()
    const PlanIcon = plan.icon

    if (!isOpen && !isAnimating) return null

    return (
        <div
            className={`checkout-overlay ${isOpen ? 'open' : 'closing'}`}
            onClick={handleBackdropClick}
        >
            <div className={`checkout-modal ${isOpen ? 'open' : 'closing'}`}>
                {/* macOS Header */}
                <div className="checkout-header">
                    <div className="window-controls">
                        <button className="window-control close" onClick={handleClose} />
                        <button className="window-control minimize" />
                        <button className="window-control maximize" />
                    </div>
                    <h2 className="checkout-title">Complete Your Booking</h2>
                    <div className="header-spacer" />
                </div>

                {/* Steps Progress */}
                <div className="checkout-steps">
                    <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                        <span className="step-number">1</span>
                        <span className="step-label">Details</span>
                    </div>
                    <div className={`step-line ${step >= 2 ? 'active' : ''}`} />
                    <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                        <span className="step-number">2</span>
                        <span className="step-label">Review</span>
                    </div>
                    <div className={`step-line ${step >= 3 ? 'active' : ''}`} />
                    <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
                        <span className="step-number">3</span>
                        <span className="step-label">Confirm</span>
                    </div>
                </div>

                <div className="checkout-body">
                    {/* Step 1: Details */}
                    {step === 1 && (
                        <form onSubmit={handleNext} className="checkout-form">
                            <div className="form-grid">
                                {/* Selected Plan Summary */}
                                <div className="plan-summary">
                                    <div className="plan-summary-icon">
                                        <PlanIcon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="plan-summary-name">{plan.name} Package</h4>
                                        <p className="plan-summary-price">{plan.price}</p>
                                        <ul className="plan-summary-features">
                                            {plan.features.map((feature, i) => (
                                                <li key={i}>
                                                    <Check size={14} />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="form-fields">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">
                                                <User size={16} />
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="John Doe"
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <Mail size={16} />
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="john@example.com"
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">
                                                <Phone size={16} />
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="+251 911 234 567"
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <Calendar size={16} />
                                                Event Date *
                                            </label>
                                            <DatePicker
                                                value={formData.eventDate}
                                                onChange={(val) => {
                                                    setShowPickerError(false)
                                                    setFormData({ ...formData, eventDate: val })
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">
                                                <Clock size={16} />
                                                Event Time *
                                            </label>
                                            <TimePicker
                                                value={formData.eventTime}
                                                onChange={(val) => {
                                                    setShowPickerError(false)
                                                    setFormData({ ...formData, eventTime: val })
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <Users size={16} />
                                                Number of Guests *
                                            </label>
                                            <input
                                                type="number"
                                                name="guestCount"
                                                value={formData.guestCount}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="25"
                                                min="1"
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Event Type</label>
                                        <select
                                            name="eventType"
                                            value={formData.eventType}
                                            onChange={handleInputChange}
                                            className="form-input form-select"
                                        >
                                            <option value="private">Private Event</option>
                                            <option value="corporate">Corporate Event</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="birthday">Birthday Party</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">
                                                <MapPin size={16} />
                                                Event Address
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="123 Main St"
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="Addis Ababa"
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <MessageSquare size={16} />
                                            Special Requests
                                        </label>
                                        <textarea
                                            name="specialRequests"
                                            value={formData.specialRequests}
                                            onChange={handleInputChange}
                                            placeholder="Any special requirements or dietary restrictions?"
                                            rows="3"
                                            className="form-textarea"
                                        />
                                    </div>

                                    {showPickerError && (
                                        <p className="picker-error">Please select both an event date and time.</p>
                                    )}

                                    <button type="submit" className="checkout-next-btn">
                                        Review Order
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Step 2: Review */}
                    {step === 2 && (
                        <div className="review-step">
                            <div className="review-grid">
                                {/* Order Summary */}
                                <div className="review-order">
                                    <h3 className="review-title">Order Summary</h3>
                                    <div className="review-plan">
                                        <div className="review-plan-header">
                                            <PlanIcon size={20} />
                                            <div>
                                                <span className="review-plan-name">{plan.name} Package</span>
                                                <span className="review-plan-price">{plan.price}</span>
                                            </div>
                                        </div>
                                        <ul className="review-plan-features">
                                            {plan.features.map((feature, i) => (
                                                <li key={i}>
                                                    <Check size={14} />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="review-details">
                                        <div className="review-detail-item">
                                            <span className="review-detail-label">Event Date</span>
                                            <span className="review-detail-value">
                                                {formData.eventDate
                                                    ? new Date(formData.eventDate + 'T00:00:00').toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })
                                                    : 'Not specified'}
                                            </span>
                                        </div>
                                        <div className="review-detail-item">
                                            <span className="review-detail-label">Event Time</span>
                                            <span className="review-detail-value">
                                                {formatTime(formData.eventTime) || 'Not specified'}
                                            </span>
                                        </div>
                                        <div className="review-detail-item">
                                            <span className="review-detail-label">Guests</span>
                                            <span className="review-detail-value">
                                                {formData.guestCount || 'Not specified'} people
                                            </span>
                                        </div>
                                        <div className="review-detail-item">
                                            <span className="review-detail-label">Event Type</span>
                                            <span className="review-detail-value">
                                                {formData.eventType || 'Not specified'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="review-total">
                                        <span className="review-total-label">Total</span>
                                        <span className="review-total-value">{plan.price}</span>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="review-customer">
                                    <h3 className="review-title">Customer Details</h3>
                                    <div className="review-customer-info">
                                        <div className="review-customer-item">
                                            <User size={16} />
                                            <div>
                                                <span className="review-label">Name</span>
                                                <span className="review-value">{formData.fullName || 'Not provided'}</span>
                                            </div>
                                        </div>
                                        <div className="review-customer-item">
                                            <Mail size={16} />
                                            <div>
                                                <span className="review-label">Email</span>
                                                <span className="review-value">{formData.email || 'Not provided'}</span>
                                            </div>
                                        </div>
                                        <div className="review-customer-item">
                                            <Phone size={16} />
                                            <div>
                                                <span className="review-label">Phone</span>
                                                <span className="review-value">{formData.phone || 'Not provided'}</span>
                                            </div>
                                        </div>
                                        {formData.address && (
                                            <div className="review-customer-item">
                                                <MapPin size={16} />
                                                <div>
                                                    <span className="review-label">Address</span>
                                                    <span className="review-value">{formData.address}</span>
                                                </div>
                                            </div>
                                        )}
                                        {formData.specialRequests && (
                                            <div className="review-customer-item review-special">
                                                <MessageSquare size={16} />
                                                <div>
                                                    <span className="review-label">Special Requests</span>
                                                    <span className="review-value">{formData.specialRequests}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="review-actions">
                                        <button className="review-back-btn" onClick={handleBack}>
                                            <ChevronLeft size={18} />
                                            Back
                                        </button>
                                        <button
                                            className="review-confirm-btn"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-small"></span>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Check size={18} />
                                                    Confirm Booking
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                        <div className="confirmation-step">
                            <div className="confirmation-icon">
                                <div className="confirmation-check">
                                    <Check size={48} />
                                </div>
                            </div>
                            <h3 className="confirmation-title">Booking Confirmed! 🎉</h3>
                            <p className="confirmation-text">
                                Thank you for choosing Werka Coffee & Catering. We've received your booking
                                and will send a confirmation email shortly.
                            </p>
                            <div className="confirmation-details">
                                <div className="confirmation-detail">
                                    <span className="detail-label">Package</span>
                                    <span className="detail-value">{plan.name}</span>
                                </div>
                                <div className="confirmation-detail">
                                    <span className="detail-label">Date</span>
                                    <span className="detail-value">
                                        {formData.eventDate
                                            ? new Date(formData.eventDate + 'T00:00:00').toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                            })
                                            : 'To be confirmed'}
                                    </span>
                                </div>
                                <div className="confirmation-detail">
                                    <span className="detail-label">Time</span>
                                    <span className="detail-value">
                                        {formatTime(formData.eventTime) || 'To be confirmed'}
                                    </span>
                                </div>
                                <div className="confirmation-detail">
                                    <span className="detail-label">Guests</span>
                                    <span className="detail-value">{formData.guestCount || 'To be confirmed'}</span>
                                </div>
                                <div className="confirmation-detail">
                                    <span className="detail-label">Total</span>
                                    <span className="detail-value highlight">{plan.price}</span>
                                </div>
                            </div>
                            <div className="confirmation-actions">
                                <button className="confirmation-done-btn" onClick={handleClose}>
                                    Done
                                </button>
                                <button className="confirmation-print-btn">
                                    Print Receipt
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}