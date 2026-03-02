'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

// Card size pattern — repeats every 8 cards
const SIZE_PATTERN = [
  'card-wide', 'card-tall',
  'card-sq',   'card-sq',   'card-sq',
  'card-full',
  'card-med',  'card-med',
]

// Gradient fallbacks when no image is set in Sanity
const GRADIENTS = [
  'linear-gradient(135deg, #1a0a2e 0%, #3d1a6e 50%, #7b2d8b 100%)',
  'linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #0d5e8a 100%)',
  'linear-gradient(135deg, #1a2a0a 0%, #2d5c1a 50%, #4a8c2d 100%)',
  'linear-gradient(135deg, #2a0a0a 0%, #6e1a1a 50%, #c43030 100%)',
  'linear-gradient(135deg, #0a1a2a 0%, #1a4060 50%, #2d7a9e 100%)',
  'linear-gradient(135deg, #2a1a0a 0%, #6b3a10 50%, #c97020 100%)',
  'linear-gradient(135deg, #1a0a1a 0%, #4a1a5c 50%, #8b3d9e 100%)',
  'linear-gradient(135deg, #0a2a1a 0%, #1a6b3a 50%, #2daa62 100%)',
]

const WAVE_BARS = [
  { d: '.9s',  dl: '0s',   h: '28px' },
  { d: '1.1s', dl: '.1s',  h: '18px' },
  { d: '.8s',  dl: '.05s', h: '36px' },
  { d: '1.2s', dl: '.15s', h: '22px' },
  { d: '1s',   dl: '.2s',  h: '30px' },
  { d: '.95s', dl: '.08s', h: '16px' },
  { d: '1.1s', dl: '.12s', h: '40px' },
  { d: '.85s', dl: '.03s', h: '24px' },
]

const MODAL_WAVE_BARS = [
  { d: '.9s',   dl: '0s',   h: '24px' },
  { d: '1.1s',  dl: '.08s', h: '40px' },
  { d: '.8s',   dl: '.04s', h: '16px' },
  { d: '1.2s',  dl: '.14s', h: '32px' },
  { d: '1s',    dl: '.06s', h: '48px' },
  { d: '.95s',  dl: '.1s',  h: '20px' },
  { d: '1.1s',  dl: '.02s', h: '36px' },
  { d: '.85s',  dl: '.18s', h: '12px' },
  { d: '1.15s', dl: '.07s', h: '28px' },
  { d: '1s',    dl: '.13s', h: '44px' },
]

const FILTER_BUTTONS = [
  { key: 'all',        label: 'Tous' },
  { key: 'temoignage', label: 'Témoignages' },
  { key: 'interview',  label: 'Interviews' },
  { key: 'immersif',   label: 'Récits Immersifs' },
  { key: 'chronique',  label: 'Chroniques' },
  { key: 'sante',      label: 'Santé' },
  { key: 'rse',        label: 'RSE' },
  { key: 'innovation', label: 'Innovation' },
]

// Build a radial gradient from Sanity palette colours
function paletteGradient(palette) {
  const color = palette?.vibrant?.background     ||
                palette?.darkVibrant?.background ||
                palette?.dominant?.background    || '#1A1A1A'
  return `radial-gradient(ellipse at 65% 35%, ${color} 0%, #0A0A0A 100%)`
}

// Normalise a string to a simple lowercase ASCII slug (first word only)
function normalize(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[\s/·]/)[0]
}

function getCats(r) {
  const cats = new Set()
  if (r.format) cats.add(normalize(r.format))
  if (r.sector) cats.add(normalize(r.sector))
  return [...cats].join(' ')
}

// ── PROJECT MODAL ──────────────────────────────────
function ProjectModal({ r, gradient, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const artworkBg = r.cardBackground
    ? { background: r.cardBackground }
    : r.cardImage
      ? { background: paletteGradient(r.palette) }
      : { background: gradient }

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="modal">
        {/* LEFT — visual */}
        <div className="modal-visual">
          <div className="modal-artwork" style={artworkBg}>
            {r.cardImage && (
              <div className="modal-img" style={{ backgroundImage: `url(${urlFor(r.cardImage).width(600).url()})` }} />
            )}
          </div>
          <div className="modal-wave">
            {MODAL_WAVE_BARS.map((b, i) => (
              <div key={i} className="modal-wave-bar" style={{ '--d': b.d, '--dl': b.dl, '--h': b.h }} />
            ))}
          </div>
          <div className="modal-tags">
            <span className="modal-tag format">{r.format}</span>
            <span className="modal-tag sector">{r.sector}</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* RIGHT — content */}
        <div className="modal-content">
          <p className="modal-client">{r.client}</p>
          <h2 className="modal-title" id="modalTitle">{r.podcastName}</h2>
          <div className="modal-divider" />
          <p className="modal-desc">
            {r.hasProjectPage ? r.cardDescription : (r.modalDescription || r.cardDescription)}
          </p>

          {/* Stats (if present) */}
          {(r.stat1Value || r.stat2Value) && (
            <div className="modal-stats">
              {r.stat1Value && (
                <div>
                  <div className="modal-stat-num">{r.stat1Value}</div>
                  <div className="modal-stat-label">{r.stat1Label}</div>
                </div>
              )}
              {r.stat2Value && (
                <div>
                  <div className="modal-stat-num">{r.stat2Value}</div>
                  <div className="modal-stat-label">{r.stat2Label}</div>
                </div>
              )}
            </div>
          )}

          {/* Audio embed */}
          {r.audioEmbed && (
            <>
              <p className="modal-embed-label">Écouter un extrait</p>
              <div className="modal-embed-wrap">
                <iframe
                  src={r.audioEmbed}
                  height="80"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`Extrait audio — ${r.podcastName}`}
                />
              </div>
            </>
          )}

          {/* Video embed */}
          {r.videoEmbed && (
            <>
              <p className="modal-embed-label" style={{ '--yellow': 'rgba(247,244,238,.45)' }}>Voir la vidéo</p>
              <div className="modal-embed-wrap">
                <iframe
                  src={r.videoEmbed}
                  height="180"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title={`Vidéo — ${r.podcastName}`}
                />
              </div>
            </>
          )}

          <div className="modal-ctas">
            {r.hasProjectPage && r.slug?.current && (
              <Link href={`/realisations/${r.slug.current}?from=realisations`} className="btn-modal-primary">
                <span>En savoir plus sur le projet</span>
              </Link>
            )}
            <a href="/#contact" className="btn-modal-secondary">
              Démarrer un projet similaire
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MAIN GRID COMPONENT ────────────────────────────
export default function RealisationsGrid({ realisations }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [modalData, setModalData] = useState(null)
  const [modalGradient, setModalGradient] = useState('')

  const openModal = useCallback((r, gradient) => {
    setModalData(r)
    setModalGradient(gradient)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setModalData(null)
    document.body.style.overflow = ''
  }, [])

  return (
    <>
      {/* ── FILTER BAR ── */}
      <div className="filter-bar">
        {FILTER_BUTTONS.map((btn) => (
          <button
            key={btn.key}
            className={`filter-btn${activeFilter === btn.key ? ' active' : ''}`}
            onClick={() => setActiveFilter(btn.key)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ── GRID ── */}
      <div className="portfolio-grid">
        {realisations.length === 0 && (
          <div className="grid-empty">Aucune réalisation pour l&apos;instant</div>
        )}

        {realisations.map((r, i) => {
          const total = realisations.length
          const patternLen = SIZE_PATTERN.length
          const remainder = total % patternLen
          // When exactly 3 cards trail a full cycle, the pattern gives
          // card-wide(8) + card-tall(4) = full row, then card-sq(4) alone.
          // The card-tall drives row height far below card-wide, so the lone
          // card appears too low. Swapping card-tall → card-sq makes the row
          // height match card-wide, and the last card sits right below it.
          let size = SIZE_PATTERN[i % patternLen]
          if (remainder === 3 && i >= total - 3 && i - (total - 3) === 1) {
            size = 'card-sq'
          }
          const gradient = GRADIENTS[i % GRADIENTS.length]
          const cats = getCats(r)
          const isVisible = activeFilter === 'all' || cats.includes(activeFilter)

          const coverStyle = r.cardBackground
            ? { background: r.cardBackground }
            : r.cardImage
              ? { background: paletteGradient(r.palette) }
              : { background: gradient }

          const cardInner = (
            <>
              <div className="card-cover" style={coverStyle}>
                {r.cardImage && (
                  <div className="card-img" style={{ backgroundImage: `url(${urlFor(r.cardImage).width(800).url()})` }} />
                )}
              </div>
              <div className="card-wave">
                {WAVE_BARS.map((b, j) => (
                  <div key={j} className="card-wave-bar" style={{ '--d': b.d, '--dl': b.dl, '--h': b.h }} />
                ))}
              </div>
              <div className="card-label">
                <span className="label-tag">{r.format}</span>
                <span className="label-client">{r.client}</span>
              </div>
              <div className="card-overlay">
                <div className="overlay-tag">{r.sector} · {r.format}</div>
                <div className="overlay-title">{r.podcastName}</div>
                <div className="overlay-meta">
                  <span className="overlay-format">{r.client}</span>
                  <div className="overlay-arrow">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )

          const cardClass = `project-card ${size} ${isVisible ? 'visible' : 'hidden'}`

          return (
            <div
              key={r._id}
              className={cardClass}
              data-cats={cats}
              onClick={() => openModal(r, gradient)}
            >
              {cardInner}
            </div>
          )
        })}
      </div>

      {/* ── MODAL ── */}
      {modalData && (
        <ProjectModal r={modalData} gradient={modalGradient} onClose={closeModal} />
      )}
    </>
  )
}
