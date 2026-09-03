import React, { useState } from 'react'
import { Sparkles, Eye, Award, Coffee, Utensils, Home, Flame } from 'lucide-react'
import './GallerySection.css'

const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Portfolio' },
  { id: 'coffee', label: 'Specialty Brews' },
  { id: 'culinary', label: 'Culinary Bistro' },
  { id: 'roastery', label: 'Roastery Architecture' },
  { id: 'craft', label: 'Roast & Harvest' }
]

const GALLERY_ITEMS = [
  {
    id: 1,
    category: 'coffee',
    title: 'Guji Highlands Grade 1 Natural Pour-Over',
    subtitle: 'V60 Extraction at 93°C',
    tag: 'Single-Origin',
    desc: 'Extracted using calibrated Japanese mineral water profiles, revealing uninhibited notes of ripe alpine strawberry and wild jasmine.',
    icon: Coffee,
    badge: '92.5 Cupping Score'
  },
  {
    id: 2,
    category: 'culinary',
    title: 'Truffled Forest Chanterelle Tartine',
    subtitle: 'Whipped House Ricotta on Artisan Levain',
    tag: 'Culinary Craft',
    desc: 'Locally foraged mushrooms pan-seared with French butter, thyme, and cold-pressed olive oil over 36-hour naturally fermented levain.',
    icon: Utensils,
    badge: "Chef's Signature"
  },
  {
    id: 3,
    category: 'roastery',
    title: 'The Sunlit Cupping Bar & Atrium',
    subtitle: 'Natural Timber & Warm Espresso Steel',
    tag: 'Interior Architecture',
    desc: 'An expansive open-concept roastery floor illuminated by northern skylights, designed for communal sensory coffee ceremonies.',
    icon: Home,
    badge: 'Architectural Feature'
  },
  {
    id: 4,
    category: 'craft',
    title: 'Cast-Iron Micro-Batch Roasting',
    subtitle: '48-Hour Nordic Profile Maturation',
    tag: 'Roastery Craft',
    desc: 'Hand-tended small batches roasted to order to preserve fragile volatile aromatics without char or astringency.',
    icon: Flame,
    badge: 'Fair Direct Trade'
  },
  {
    id: 5,
    category: 'coffee',
    title: 'Werka Cardamom Honey Cortado',
    subtitle: 'Raw Clover Honey & Steamed Farm Oat Milk',
    tag: 'Signature Drink',
    desc: 'Silky micro-foam marbled over concentrated ristretto, infused with crushed green cardamom pods from the Ethiopian highlands.',
    icon: Coffee,
    badge: 'House Favorite'
  },
  {
    id: 6,
    category: 'culinary',
    title: 'Valrhona Dark Chocolate Espresso Tart',
    subtitle: 'Maldon Flake Sea Salt & Edible Gold',
    tag: 'Artisan Pastry',
    desc: '70% dark chocolate ganache infused with our house espresso, cradled in a crisp cocoa sable crust.',
    icon: Utensils,
    badge: 'Fresh Daily'
  }
]

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  const filtered = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory)

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Visual Showcase</span>
          <h2 className="section-title">The Werka Portfolio</h2>
          <p className="section-desc">
            Explore the culinary craftsmanship, roasting rituals, and architectural spaces that define our sanctuary.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="gallery-filter-bar">
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`gallery-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filtered.map(item => {
            const IconComp = item.icon
            return (
              <div
                key={item.id}
                className="gallery-card glass-panel"
                onClick={() => setSelectedItem(item)}
              >
                <div className="gallery-card-art">
                  <div className="gallery-art-pattern" />
                  <div className="gallery-icon-center">
                    <IconComp size={42} className="gallery-art-icon" />
                  </div>
                  <div className="gallery-overlay-hover">
                    <span className="view-detail-btn">
                      <Eye size={16} /> Inspect Showcase
                    </span>
                  </div>
                  <span className="gallery-badge">{item.badge}</span>
                </div>

                <div className="gallery-card-body">
                  <span className="gallery-item-tag">{item.tag}</span>
                  <h3 className="gallery-item-title">{item.title}</h3>
                  <span className="gallery-item-sub">{item.subtitle}</span>
                  <p className="gallery-item-desc">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal Detail Lightbox */}
        {selectedItem && (
          <div className="gallery-modal-backdrop" onClick={() => setSelectedItem(null)}>
            <div className="gallery-modal-content glass-panel" onClick={e => e.stopPropagation()}>
              <div className="modal-art-banner">
                {React.createElement(selectedItem.icon, { size: 54, className: 'modal-icon' })}
                <span className="modal-badge-tag">{selectedItem.badge}</span>
              </div>
              <div className="modal-details">
                <span className="modal-category">{selectedItem.tag}</span>
                <h3 className="modal-title">{selectedItem.title}</h3>
                <span className="modal-subtitle">{selectedItem.subtitle}</span>
                <p className="modal-description">{selectedItem.desc}</p>

                <div className="modal-highlights">
                  <div className="highlight-box">
                    <strong>Direct Origin</strong>
                    <span>Ethical Sourcing</span>
                  </div>
                  <div className="highlight-box">
                    <strong>Artisan Handcraft</strong>
                    <span>Made in Small Batches</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-sm modal-close-action"
                  onClick={() => setSelectedItem(null)}
                >
                  Close Showcase
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
