'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ProjectBreadcrumb({ client, podcastName }) {
  const searchParams = useSearchParams()
  const from = searchParams.get('from')
  const fromPourquoi = from === 'pourquoi'
  const backHref  = fromPourquoi ? '/pourquoi-le-podcast' : '/realisations'
  const backLabel = fromPourquoi ? 'Pourquoi un podcast' : 'Réalisations'

  return (
    <nav className="prod-breadcrumb" aria-label="Fil d'Ariane">
      <Link href="/">Accueil</Link>
      <span aria-hidden="true">›</span>
      <Link href={backHref}>{backLabel}</Link>
      <span aria-hidden="true">›</span>
      <span aria-current="page">{client} — {podcastName}</span>
    </nav>
  )
}
