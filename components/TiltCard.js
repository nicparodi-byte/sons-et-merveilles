'use client'

import { useRef } from 'react'
import Link from 'next/link'

// Carte qui s'incline légèrement vers la souris (desktop uniquement).
// Désactivé sur écran tactile et si l'utilisateur a demandé moins d'animations.
const MAX_TILT = 6 // degrés

export default function TiltCard({ href, className, children }) {
  const ref = useRef(null)

  const canTilt = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMove = (e) => {
    const el = ref.current
    if (!el || !canTilt()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${(x * MAX_TILT * 2).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(-y * MAX_TILT * 2).toFixed(2)}deg`)
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </Link>
  )
}
