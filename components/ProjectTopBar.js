'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProjectTopBar() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from')
  const fromPourquoi = from === 'pourquoi'
  const backHref  = fromPourquoi ? '/pourquoi-le-podcast' : '/realisations'
  const backLabel = fromPourquoi ? 'Retour à Pourquoi un podcast' : 'Retour aux réalisations'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`proj-nav${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`} aria-label="Navigation projet">
        <Link href="/" className="nav-logo" onClick={close}>
          <span className="logo-dot" />
          Sons &amp; Merveilles
        </Link>
        <Link href={backHref} className="nav-back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {backLabel}
        </Link>
        <a href="#contact" className="nav-cta">Parlons projet</a>
        <button
          className={`hamburger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          <li>
            <Link href={backHref} onClick={close} className="mobile-back">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {backLabel}
            </Link>
          </li>
          <li>
            <Link href="/pourquoi-le-podcast" onClick={close}>
              Pourquoi un podcast&nbsp;?
            </Link>
          </li>
          <li>
            <Link href="/realisations" onClick={close}>
              Réalisations
            </Link>
          </li>
          <li>
            <Link href="/equipe" onClick={close}>
              Équipe
            </Link>
          </li>
          <li>
            <a href="#contact" onClick={close} className="mobile-cta">Parlons projet</a>
          </li>
        </ul>
      </div>
    </>
  )
}
