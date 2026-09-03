import React from 'react'
import { Coffee, ArrowRight } from 'lucide-react'
// Import social icons from react-icons
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      {/* CTA Card - Overlaps the top edge */}
      <div className="cta-card-container">
        <div className="cta-card">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Experience Werka?</h3>
            <p className="cta-description">
              Join thousands of coffee lovers who've made us their daily ritual.
            </p>
          </div>
          <div className="cta-actions">
            <button className="cta-primary-btn">
              Book a Table
              <ArrowRight size={18} />
            </button>
            <button className="cta-ghost-btn">
              Book a Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer Proper */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Top Section: Brand + Links */}
          <div className="footer-top">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="brand-logo">
                <div className="brand-icon-square">
                  <Coffee size={22} />
                </div>
                <span className="brand-name">Werka</span>
              </div>
              <p className="brand-description">
                Ethiopia's finest coffee, served with warmth and tradition since 2010.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Twitter">
                  <FaFacebook size={16} />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <FaInstagram size={16} />
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <FaYoutube size={16} />
                </a>
                <a href="#" className="social-link" aria-label="GitHub">
                  <FaTiktok size={16} />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            <div className="footer-links">
              <div className="link-column">
                <h4 className="link-column-title">Product</h4>
                <ul className="link-list">
                  <li><a href="#">Features</a></li>
                  <li><a href="#">Pricing</a></li>
                  <li><a href="#">Integrations</a></li>
                  <li><a href="#">Changelog</a></li>
                </ul>
              </div>

              <div className="link-column">
                <h4 className="link-column-title">Company</h4>
                <ul className="link-list">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>

              <div className="link-column">
                <h4 className="link-column-title">Resources</h4>
                <ul className="link-list">
                  <li><a href="#">Documentation</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">Community</a></li>
                  <li><a href="#">Status</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider"></div>

          {/* Bottom Row */}
          <div className="footer-bottom">
            <span className="copyright">
              &copy; {new Date().getFullYear()} Werka Coffee. All rights reserved.
            </span>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}