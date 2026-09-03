import React, { useState, useEffect } from 'react'
import { X, Check, Coffee, Users, Sparkles, Crown, Utensils, Clock } from 'lucide-react'
import './BookCatering.css'
import CheckoutModal from './Checkout'

export default function BookingModal({ isOpen, onClose }) {
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [selectedPlanId, setSelectedPlanId] = useState(null)
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
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
        setTimeout(onClose, 300)
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose()
        }
    }

    const plans = [
        {
            id: 'basic',
            name: 'Essential',
            price: '₿r 3,500',
            period: '/event',
            description: 'Perfect for small gatherings and intimate events',
            icon: Coffee,
            featured: false,
            features: [
                'Serves up to 25 guests',
                '3 coffee selections',
                'Pastry platter (12 pcs)',
                'Paper cups & napkins',
                '2-hour setup & service',
                'Standard table setup'
            ],
            cta: 'Choose Essential'
        },
        {
            id: 'pro',
            name: 'Premium',
            price: '₿r 7,500',
            period: '/event',
            description: 'Our most popular package for memorable occasions',
            icon: Crown,
            featured: true,
            features: [
                'Serves up to 60 guests',
                '5 coffee selections',
                'Gourmet pastry & dessert platter',
                'Ceramic cups & elegant service',
                '4-hour full service',
                'Premium table setup & decor',
                'Dedicated barista',
                'Custom coffee menu'
            ],
            cta: 'Choose Premium'
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: '₿r 12,500',
            period: '/event',
            description: 'The ultimate catering experience for large events',
            icon: Sparkles,
            featured: false,
            features: [
                'Serves up to 120 guests',
                '7 coffee selections',
                'Full catering menu',
                'Premium tableware & decor',
                '6-hour full service',
                '2 dedicated baristas',
                'Custom coffee & menu design',
                'Mobile espresso bar',
                'Event coordinator'
            ],
            cta: 'Choose Enterprise'
        }
    ]

    if (!isOpen && !isAnimating) return null

    return (
        <div
            className={`booking-overlay ${isOpen ? 'open' : 'closing'}`}
            onClick={handleBackdropClick}
        >
            <div className={`booking-modal ${isOpen ? 'open' : 'closing'}`}>
                {/* macOS-style header */}
                <div className="modal-header">
                    <div className="window-controls">
                        <button
                            className="window-control close"
                            onClick={handleClose}
                            aria-label="Close"
                        />
                        <button className="window-control minimize" />
                        <button className="window-control maximize" />
                    </div>
                    <h2 className="modal-title">Book Catering</h2>
                    <div className="header-spacer" />
                </div>

                <div className="modal-body">
                    {/* Header content */}
                    <div className="booking-header">
                        <div className="booking-icon">
                            <Utensils size={28} />
                        </div>
                        <div>
                            <h3 className="booking-title">Choose Your Catering Package</h3>
                            <p className="booking-subtitle">
                                Select the perfect package for your event. All packages include our signature coffee service.
                            </p>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="pricing-grid">
                        {plans.map((plan) => {
                            const Icon = plan.icon
                            return (
                                <div
                                    key={plan.id}
                                    className={`pricing-card ${plan.featured ? 'featured' : ''}`}
                                >
                                    {plan.featured && (
                                        <div className="popular-badge">
                                            <span>Most Popular</span>
                                        </div>
                                    )}

                                    <div className="plan-header">
                                        <div className={`plan-icon ${plan.featured ? 'featured-icon' : ''}`}>
                                            <Icon size={24} />
                                        </div>
                                        <h4 className="plan-name">{plan.name}</h4>
                                        <div className="plan-price">
                                            <span className="price-amount">{plan.price}</span>
                                            <span className="price-period">{plan.period}</span>
                                        </div>
                                        <p className="plan-description">{plan.description}</p>
                                    </div>

                                    <div className="plan-divider" />

                                    <ul className="plan-features">
                                        {plan.features.map((feature, index) => (
                                            <li key={index}>
                                                <Check size={16} className="feature-check" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className={`plan-cta ${plan.featured ? 'featured-cta' : ''}`}
                                        onClick={() => {
                                            setSelectedPlanId(plan.id)
                                            setIsCheckoutOpen(true)
                                        }}
                                    >
                                        {plan.cta}
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer note */}
                    <div className="booking-footer">
                        <p className="footer-note">
                            <Clock size={14} />
                            All packages include free consultation and tasting session
                        </p>
                        <p className="footer-note">
                            <Users size={14} />
                            Custom packages available for special requirements
                        </p>
                    </div>
                </div>
            </div>
            {isCheckoutOpen && (
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => {
                        setIsCheckoutOpen(false)
                        setSelectedPlanId(null)
                    }}
                    selectedPlan={selectedPlanId}
                />
            )}
        </div>

    )
}