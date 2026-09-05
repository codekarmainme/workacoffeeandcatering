import React, { useState } from 'react'
import {
    ShoppingCart, Trash2, Minus, Plus, Check, ArrowRight,
    ArrowLeft, Coffee, Crown, Sparkles, Receipt
} from 'lucide-react'
import { CATERING_PLANS, formatPlanPrice } from '../../data/cateringPlans'
import { useCart } from '../../hooks/useCart'
import './CartPage.css'

const PLAN_ICONS = {
    basic: Coffee,
    pro: Crown,
    enterprise: Sparkles
}

const PLAN_TAGS = {
    basic: 'Small gatherings',
    pro: 'Most popular',
    enterprise: 'Large events'
}

export default function CartPage({ onClose }) {
    const { items, itemCount, cartTotal, removeItem, updateQuantity, clearCart } = useCart()
    const [isSubmitted, setIsSubmitted] = useState(false)

    if (isSubmitted) {
        return (
            <div className="cart-page">
                <div className="cart-confirmation">
                    <div className="cart-confirmation-icon">
                        <Check size={44} />
                    </div>
                    <h2 className="cart-confirmation-title">Booking Requested!</h2>
                    <p className="cart-confirmation-text">
                        Thank you for your interest in Werka Catering. Our team will reach
                        out shortly to finalize your event details.
                    </p>
                    <div className="cart-confirmation-actions">
                        <button className="btn btn-primary" onClick={() => { clearCart(); setIsSubmitted(false); onClose() }}>
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-empty">
                    <div className="cart-empty-icon">
                        <Coffee size={38} />
                    </div>
                    <h2 className="cart-empty-title">Your cart is empty</h2>
                    <p className="cart-empty-text">
                        You haven't booked any catering packages yet.
                        Choose a package to get started.
                    </p>
                    <button className="btn btn-primary" onClick={onClose}>
                        Browse Catering Packages
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="cart-page">
            {/* Header */}
            <div className="cart-header">
                <div className="badge cart-kicker">
                    <Receipt size={13} />
                    Booked Caterings
                </div>
                <h1 className="cart-title">Your Catering Cart</h1>
                <p className="cart-subtitle">
                    Review the catering packages you've selected for your event.
                </p>
            </div>

            <div className="cart-layout">
                {/* Items list */}
                <div className="cart-items">
                    {items.map((item) => {
                        const Icon = PLAN_ICONS[item.id] || Coffee
                        return (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-icon">
                                    <Icon size={22} />
                                </div>

                                <div className="cart-item-info">
                                    <span className="cart-item-tag">{PLAN_TAGS[item.id]}</span>
                                    <h3 className="cart-item-name">{item.name} Package</h3>
                                    <ul className="cart-item-features">
                                        {item.features.slice(0, 3).map((feature, i) => (
                                            <li key={i}>
                                                <Check size={12} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="cart-item-controls">
                                        <div className="qty-stepper">
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, -1)}
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, 1)}
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            className="cart-item-remove"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 size={15} />
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-price">
                                    <span className="cart-item-unit">{formatPlanPrice(item.price)}</span>
                                    <span className="cart-item-line">{formatPlanPrice(item.price * item.quantity)}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Order summary */}
                <div className="cart-summary">
                    <h3 className="cart-summary-title">Order Summary</h3>

                    <div className="cart-summary-row">
                        <span>Packages</span>
                        <span>{itemCount} {itemCount === 1 ? 'booking' : 'bookings'}</span>
                    </div>
                    <div className="cart-summary-row">
                        <span>Delivery &amp; Service</span>
                        <span>Included</span>
                    </div>

                    <div className="cart-summary-divider" />

                    <div className="cart-summary-total">
                        <span>Total</span>
                        <span className="cart-summary-amount">{formatPlanPrice(cartTotal)}</span>
                    </div>

                    <button className="cart-checkout-btn" onClick={() => setIsSubmitted(true)}>
                        Proceed to Checkout
                        <ArrowRight size={16} />
                    </button>
                    <button className="cart-continue-btn" onClick={onClose}>
                        <ArrowLeft size={15} />
                        Continue Browsing
                    </button>

                    <button className="cart-clear" onClick={clearCart}>
                        <Trash2 size={13} />
                        Clear cart
                    </button>
                </div>
            </div>
        </div>
    )
}