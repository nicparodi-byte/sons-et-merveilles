import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import TiltCard from '@/components/TiltCard'
import TeaserVideo from '@/components/TeaserVideo'

// Les 3 études de cas mises en avant sur l'accueil, dans l'ordre d'affichage.
// Le texte « enjeu » et le chiffre clé sont propres à l'accueil.
const FEATURED = [
  {
    slug: 'parasport-ils-ont-ose',
    tag: 'Reportage terrain + teaser vidéo',
    enjeu: 'Faire rayonner la marque employeur en allant à la rencontre de para-sportifs.',
    statValue: '2 millions',
    statLabel: 'de vues sur Instagram',
    video: { src: '/videos/parasport-teaser.mp4', poster: '/images/parasport-teaser-poster.jpg' },
    href: '/realisations?modal=parasport-ils-ont-ose',
    cta: 'Découvrir le projet →',
  },
  {
    slug: 'podcast-Apicil',
    enjeu: 'Incarner un engagement pour la santé des femmes à travers des parcours de soins.',
    statValue: '2',
    statLabel: 'documentaires immersifs tournés à Lyon et Marseille',
  },
  {
    slug: 'pierre-fabre-et-si-je-manquais-de-fer',
    enjeu: "Rendre une réalité médicale accessible en l'inscrivant dans le quotidien.",
    statValue: '19 000',
    statLabel: 'écoutes · récit en 4 épisodes',
  },
]

const QUERY = `*[_type == "realisation" && slug.current in $slugs]{
  _id, client, podcastName, format, cardImage, cardBackground, "slug": slug.current,
  "palette": cardImage.asset->metadata.palette {
    vibrant { background },
    darkVibrant { background },
    dominant { background }
  }
}`

// Même dégradé que sur les autres pages (Réalisations, Pourquoi un podcast ?)
function paletteGradient(palette) {
  const color = palette?.vibrant?.background     ||
                palette?.darkVibrant?.background ||
                palette?.dominant?.background    || '#1A1A1A'
  return `radial-gradient(ellipse at 65% 35%, ${color} 0%, #0A0A0A 100%)`
}

export default async function HomeCases() {
  const docs = await client.fetch(
    QUERY,
    { slugs: FEATURED.map((f) => f.slug) },
    { next: { revalidate: 60 } },
  )

  const cases = FEATURED
    .map((f) => {
      const doc = docs.find((d) => d.slug === f.slug)
      return doc ? { ...doc, ...f } : null
    })
    .filter(Boolean)

  if (cases.length === 0) return null

  return (
    <section className="home-cases reveal" id="recits" aria-labelledby="recits-heading">
      <div className="home-cases-head">
        <div>
          <h2 className="section-title" id="recits-heading">
            Les histoires <em>à l&apos;œuvre</em>
          </h2>
          <p className="home-cases-sub">Trois projets, trois enjeux de communication.</p>
        </div>
        <Link href="/realisations" className="home-cases-all">Toutes nos réalisations →</Link>
      </div>

      <div className="home-cases-grid">
        {cases.map((c) => (
          // Carte avec vidéo : pas de lien sur toute la carte (la vidéo a son propre bouton),
          // le lien est porté par « Découvrir le projet ».
          <TiltCard
            key={c._id}
            href={c.video ? undefined : `/realisations/${c.slug}`}
            className={`home-case${c.video ? ' home-case--video' : ''}`}
          >
            <div
              className="home-case-cover"
              style={{ background: c.cardBackground || paletteGradient(c.palette) }}
            >
              {c.video ? (
                <TeaserVideo
                  src={c.video.src}
                  poster={c.video.poster}
                  label={`Teaser vidéo du podcast ${c.podcastName} (sous-titré)`}
                />
              ) : c.cardImage && (
                <div
                  className="home-case-img"
                  style={{ backgroundImage: `url(${urlFor(c.cardImage).width(800).url()})` }}
                  role="img"
                  aria-label={`Visuel du podcast ${c.podcastName}`}
                />
              )}
              {(c.tag || c.format) && <span className="home-case-tag">{c.tag || c.format}</span>}
            </div>
            <div className="home-case-body">
              <div className="home-case-client">{c.client}</div>
              <h3 className="home-case-title">{c.podcastName}</h3>
              <p className="home-case-enjeu">{c.enjeu}</p>
              <div className="home-case-stat">
                <span className="home-case-stat-num">{c.statValue}</span>
                <span className="home-case-stat-label">{c.statLabel}</span>
              </div>
              {c.video ? (
                <Link href={c.href} className="home-case-cta">{c.cta}</Link>
              ) : (
                <span className="home-case-cta">Lire l&apos;étude de cas →</span>
              )}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}
