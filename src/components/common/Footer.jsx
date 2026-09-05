import React from 'react'
import { Coffee, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-main">
        <div className="footer-container">

          {/* Top: Brand + Restaurants links */}
          <div className="footer-top">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="brand-logo">
                <div className="brand-icon-square">
                  <Coffee size={18} />
                </div>
                <span className="brand-name">Werka</span>
              </div>
              <p className="brand-description">
                Ethiopian coffee &amp; kitchen, served warm in Addis Ababa.
              </p>
              <div className="social-links">
                <a
                  href="https://www.instagram.com/werka.coffee/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  <FaInstagram size={15} />
                </a>
                <a
                  href="https://web.facebook.com/profile.php?id=61577292957118&locale=mt_MT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  <FaFacebook size={15} />
                </a>
                <a
                  href="https://www.tiktok.com/@werkacoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="TikTok"
                >
                  <FaTiktok size={15} />
                </a>
              </div>
            </div>

            {/* Visit us column */}
            <div className="footer-info">
              <h4 className="link-column-title">Visit us</h4>
              <ul className="link-list">
                <li>
                  <a href="#branches">
                    <MapPin size={14} />
                    <span>Bole • Summit • Lebu</span>
                  </a>
                </li>
                <li>
                  <a href="#branches">
                    <Clock size={14} />
                    <span>Open daily, 6 AM – 11 PM</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact column */}
            <div className="footer-info">
              <h4 className="link-column-title">Get in touch</h4>
              <ul className="link-list">
                <li>
                  <a href="#contact">
                    <Phone size={14} />
                    <span>+251 911 234 567</span>
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    <Mail size={14} />
                    <span>hello@werkacoffee.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider"></div>

          {/* Bottom Row */}
          <div className="footer-bottom">
            <span className="copyright">
              &copy; {new Date().getFullYear()} Werka Coffee. Made in Addis Ababa.
            </span>
            <div className="footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
