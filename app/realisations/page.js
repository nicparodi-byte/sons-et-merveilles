import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import RealisationsGrid from '@/components/RealisationsGrid'
import RevealObserver from '@/components/RevealObserver'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Réalisations — Sons & Merveilles',
  description: 'Découvrez les réalisations de Sons & Merveilles : podcasts de marque pour des entreprises dans la santé, la RSE, l\'innovation et la communication interne.',
}

const QUERY = `*[_type == "realisation"] | order(order asc, _createdAt asc) {
  _id,
  "podcastName": coalesce(podcastName, title),
  client,
  slug,
  sector,
  format,
  year,
  cardImage,
  cardBackground,
  "palette": cardImage.asset->metadata.palette {
    vibrant { background },
    darkVibrant { background },
    dominant { background }
  },
  cardDescription,
  modalDescription,
  audioEmbed,
  "videoFileUrl": videoFile.asset->url,
  videoEmbed,
  stat1Value,
  stat1Label,
  stat2Value,
  stat2Label,
  hasProjectPage
}`

export default async function RealisationsPage() {
  const realisations = await client.fetch(QUERY, {}, { next: { revalidate: 60 } })

  return (
    <main>
      <RevealObserver />

      {/* ── PAGE HEADER ── */}
      <header className="page-header" role="banner">
        <div className="header-left">
          <p className="header-eyebrow">Sons &amp; Merveilles · Réalisations</p>
          <h1 className="header-title">
            Nos<br /><span>Créa</span><br />tions
          </h1>
        </div>
        <div className="header-right">
          <p className="header-desc">Son, voix, image. Chaque projet a son format, chaque format a sa signature.</p>
          <div className="header-count">
            <div className="count-num" aria-label="Plus de 50 podcasts de marque produits">200+</div>
            <div className="count-label">Prises de parole<br />produites</div>
          </div>
        </div>
        <div className="header-bg-letter" aria-hidden="true">R</div>
      </header>

      {/* ── FILTER + GRID (client) ── */}
      <RealisationsGrid realisations={realisations} />

      {/* ── TICKER ── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-inner">
          {[
            'Témoignages', 'Interviews', 'Récits Immersifs', 'Chroniques',
            'Marque Employeur', 'RSE', 'Santé', 'Innovation', 'Formation',
            'Témoignages', 'Interviews', 'Récits Immersifs', 'Chroniques',
            'Marque Employeur', 'RSE', 'Santé', 'Innovation', 'Formation',
          ].map((item, i) => (
            <span key={i} className="ticker-item">
              {item} <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── CTA / CONTACT ── */}
      <section className="cta-section reveal" id="contact" aria-labelledby="cta-heading">
        <div>
          <h2 className="cta-title" id="cta-heading">
            Parlons de<br />votre <span>projet</span>
          </h2>
        </div>
        <ContactForm origin="Réalisations" formClass="cta-form" />
      </section>

      {/* ── FOOTER ── */}
      <footer role="contentinfo">
        <div className="footer-logo">Sons &amp; Merveilles</div>
        <ul className="footer-links" aria-label="Liens du pied de page">
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/pourquoi-le-podcast">Pourquoi un podcast&nbsp;?</Link></li>
          <li><Link href="/realisations">Réalisations</Link></li>
          <li><Link href="/equipe">Équipe</Link></li>
          <li><Link href="/mentions-legales">Mentions légales</Link></li>
        </ul>
        <div className="footer-copy">© 2025 Sons &amp; Merveilles · Agence Podcast de Marque</div>
      </footer>
    </main>
  )
}
