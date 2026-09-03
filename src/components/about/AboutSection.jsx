import React from 'react'
import { Mountain, Compass, Flame } from 'lucide-react'
import './AboutSection.css'

export default function AboutSection() {
  const pillars = [
    {
      icon: Mountain,
      title: 'High-Altitude Terroir',
      desc: 'Micro-lots cultivated at 2,000m+ in Guji and Sidama, known for floral clarity and stone fruit aromatics.'
    },
    {
      icon: Compass,
      title: 'Direct Farmer Equity',
      desc: 'Bypassing intermediaries to support cooperative farming families across southern Ethiopian origins.'
    },
    {
      icon: Flame,
      title: 'Ceremonial Roasting',
      desc: 'Small batch cast-iron roasting tailored to preserve natural fruit notes without bitterness.'
    }
  ]

  return (
    <section className="section about-minimal-section" id="about">
      <div className="container">
        
        {/* Minimalist Lead */}
        <div className="about-minimal-lead">
          <span className="section-kicker">Origin & Philosophy</span>
          <h2 className="about-minimal-quote">
            "Coffee is not merely an everyday morning drink; it is Ethiopia's botanical gift and cultural ceremony."
          </h2>
        </div>

        {/* 3 Pillars Row */}
        <div className="about-minimal-pillars">
          {pillars.map((pillar, i) => {
            const IconComp = pillar.icon
            return (
              <div key={i} className="minimal-pillar-card clean-card">
                <div className="pillar-num">0{i + 1}</div>
                <div className="pillar-icon-wrap">
                  <IconComp size={20} />
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
