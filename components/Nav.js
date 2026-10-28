'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

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

  // Hide on studio routes and individual project pages
  if (pathname?.startsWith('/studio')) return null
  if (pathname?.startsWith('/realisations/')) return null

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`site-nav${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
        <Link href="/" className="nav-logo" onClick={close}>
          <span className="logo-dot" />
          Sons &amp; Merveilles
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/pourquoi-le-podcast" className={pathname === '/pourquoi-le-podcast' ? 'active' : ''}>
              Pourquoi un podcast&nbsp;?
            </Link>
          </li>
          <li>
            <Link href="/realisations" className={pathname?.startsWith('/realisations') ? 'active' : ''}>
              Réalisations
            </Link>
          </li>
          <li>
            <Link href="/podcasts-sante" className={pathname === '/podcasts-sante' ? 'active' : ''}>
              Podcasts santé
            </Link>
          </li>
          <li>
            <Link href="/equipe" className={pathname === '/equipe' ? 'active' : ''}>
              Équipe
            </Link>
          </li>
          <li>
            <a href="#contact" className="nav-cta">Contact</a>
          </li>
        </ul>
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
            <Link href="/pourquoi-le-podcast" onClick={close} className={pathname === '/pourquoi-le-podcast' ? 'active' : ''}>
              Pourquoi un podcast&nbsp;?
            </Link>
          </li>
          <li>
            <Link href="/realisations" onClick={close} className={pathname?.startsWith('/realisations') ? 'active' : ''}>
              Réalisations
            </Link>
          </li>
          <li>
            <Link href="/podcasts-sante" onClick={close} className={pathname === '/podcasts-sante' ? 'active' : ''}>
              Podcasts santé
            </Link>
          </li>
          <li>
            <Link href="/equipe" onClick={close} className={pathname === '/equipe' ? 'active' : ''}>
              Équipe
            </Link>
          </li>
          <li>
            <a href="#contact" onClick={close} className="mobile-cta">Contact</a>
          </li>
        </ul>
      </div>
    </>
  )
}
