import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Navigation, MapPin, Compass } from 'lucide-react'
import './BranchesSection.css'

// ── Replace with your own MapTiler API key: https://cloud.maptiler.com/account/keys/ ──
const MAPTILER_KEY = 'egOiZJUpRA3sNsKcxi0p'
const MAP_ID = 'streets-v4-dark'

// Recommended 512×512 raster tiles — tileSize:512 + zoomOffset:-1 is required
// whenever you request 512px tiles instead of Leaflet's 256px default.
const TILE_URL = `https://api.maptiler.com/maps/${MAP_ID}/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`
const TILE_ATTRIBUTION =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'

// Sample coordinates — replace with each branch's exact GPS pin before launch.
const BRANCHES = [
  {
    id: 'bole',
    name: 'Bole',
    am: 'ቦሌ',
    amAddress: 'ከቦሌ መድኀኔዓለም ወደ ሞኤንኮ በሚወስደው መንገድ',
    enHint: 'On the road from Bole Medhanealem towards Moenco',
    lat: 8.9930,
    lng: 38.7850,
  },
  {
    id: 'summit',
    name: 'Summit',
    am: 'ሰሚት',
    amAddress: 'ፍየል ቤት እናት ባንክ ፊትለፊት',
    enHint: 'Fiyel Bet, opposite Enat Bank',
    lat: 9.0210,
    lng: 38.8330,
  },
  {
    id: 'lebu',
    name: 'Lebu',
    am: 'ለቡ',
    amAddress: 'ሙዚቃ ሰፈር ለቡ ስታር ክሊኒክ ፊት ለ ፊት',
    enHint: 'Muziqa Sefer, opposite Lebu Star Clinic',
    lat: 8.9550,
    lng: 38.7300,
  },
]

function pinIcon(index, isActive) {
  return L.divIcon({
    className: 'branch-pin-icon',
    html: `
      <span class="branch-pin ${isActive ? 'is-active' : ''}">
        <span class="branch-pin-index">${String(index + 1).padStart(2, '0')}</span>
      </span>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  })
}

// Flies the map to the selected branch whenever the active tab changes.
function FlyToBranch({ position }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(position, 14, { duration: 1.1 })
  }, [position, map])
  return null
}

export default function BranchesSection() {
  const [activeId, setActiveId] = useState(BRANCHES[0].id)
  const active = BRANCHES.find((b) => b.id === activeId)
  const activeIndex = BRANCHES.findIndex((b) => b.id === activeId)

  return (
    <section className="branches-section" id="branches">
      <div className="container branches-container">

        <div className="branches-heading">
          <span className="branches-rule" aria-hidden="true" />
          <h2 className="branches-title">Wherever you are, we're near.</h2>
          <p className="branches-sub">
            Three Werka houses across Addis Ababa — the same beans, the same table, closer than you think.
          </p>
        </div>

        <div className="branches-layout">

          {/* Live map */}
          <div className="branches-map-wrap">
            <MapContainer
              center={[active.lat, active.lng]}
              zoom={13}
              scrollWheelZoom={false}
              className="branches-map"
            >
              <TileLayer
                url={TILE_URL}
                attribution={TILE_ATTRIBUTION}
                tileSize={512}
                zoomOffset={-1}
                crossOrigin
              />
              <FlyToBranch position={[active.lat, active.lng]} />
              {BRANCHES.map((b, i) => (
                <Marker
                  key={b.id}
                  position={[b.lat, b.lng]}
                  icon={pinIcon(i, activeId === b.id)}
                  eventHandlers={{ click: () => setActiveId(b.id) }}
                >
                  <Popup>
                    <strong>Worka Coffee & Catering {b.am}</strong>
                    <br />
                    {b.amAddress}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            <span className="branches-map-caption">
              Sample coordinates — swap in each branch's exact GPS pin
            </span>
          </div>

          {/* Detail panel - Luxury Redesign */}
          <div className="branches-panel">
            <div className="branches-tabs-wrapper">
              <div className="branches-tabs-header">
                <span className="tabs-label">Locations</span>
                <span className="tabs-count">{BRANCHES.length} Branches</span>
              </div>
              <div className="branches-tabs" role="tablist" aria-label="Select a branch">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    role="tab"
                    aria-selected={activeId === b.id}
                    className={`branches-tab ${activeId === b.id ? 'is-active' : ''}`}
                    onClick={() => setActiveId(b.id)}
                  >
                    <span className="tab-number">{String(BRANCHES.indexOf(b) + 1).padStart(2, '0')}</span>
                    <span className="tab-name">{b.name}</span>
                    <span className="tab-indicator" />
                  </button>
                ))}
              </div>
            </div>

            <div className="branches-card" key={active.id}>
              <div className="card-header">
                <div className="card-badge">
                  <MapPin size={12} />
                  <span>Location</span>
                </div>
                <span className="branches-card-index">{String(activeIndex + 1).padStart(2, '0')}</span>
              </div>

              <h3 className="branches-card-name">
                Worka Coffee & Catering
                <span className="name-am">{active.am}</span>
              </h3>

              <div className="card-divider" />

              <div className="card-address-section">
                <p className="branches-card-address">{active.enHint}</p>
                <p className="branches-card-hint">{active.amAddress}</p>
              </div>

              <div className="card-coordinates">
                <div className="coord-item">
                  <span className="coord-label">Latitude</span>
                  <span className="coord-value">{active.lat.toFixed(4)}° N</span>
                </div>
                <div className="coord-divider" />
                <div className="coord-item">
                  <span className="coord-label">Longitude</span>
                  <span className="coord-value">{active.lng.toFixed(4)}° E</span>
                </div>
              </div>

              <a
                className="branches-card-cta"
                href={`https://www.google.com/maps/search/?api=1&query=${active.lat},${active.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Compass size={16} strokeWidth={1.5} />
                <span>Get Directions</span>
                <span className="cta-arrow">→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}