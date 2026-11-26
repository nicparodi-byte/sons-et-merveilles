'use client'

import { useEffect, useRef, useState } from 'react'

// Vidéo verticale muette qui se lance quand elle entre à l'écran et se met en pause en sortant.
// Pas de lecture automatique si l'utilisateur a demandé moins d'animations : il clique pour lancer.
export default function TeaserVideo({ src, poster, label }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.5 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const toggleSound = () => {
    const video = ref.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
    if (video.paused) video.play().catch(() => {})
  }

  return (
    <div className="teaser-video">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggleSound}
      />
      <button type="button" className="teaser-sound" onClick={toggleSound}>
        {!playing ? 'Lancer la vidéo' : muted ? 'Activer le son' : 'Couper le son'}
      </button>
    </div>
  )
}
