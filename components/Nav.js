'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hide on studio routes
  if (pathname?.startsWith('/studio')) return null

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <Link href="/" className="nav-logo">
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
          <Link href="/equipe" className={pathname === '/equipe' ? 'active' : ''}>
            Équipe
          </Link>
        </li>
        <li>
          <a href="#contact" className="nav-cta">Contact</a>
        </li>
      </ul>
    </nav>
  )
}
