'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
  const pathname = usePathname()

  useEffect(() => {
    const cur  = document.getElementById('cur')
    const ring = document.getElementById('cur-ring')
    if (!cur || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cur.style.left = mx + 'px'
      cur.style.top  = my + 'px'
    }

    const loop = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    const rafId = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (pathname?.startsWith('/studio')) return null

  return (
    <>
      <div id="cur" aria-hidden="true" />
      <div id="cur-ring" aria-hidden="true" />
    </>
  )
}
