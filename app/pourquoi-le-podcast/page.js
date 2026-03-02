import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import RevealObserver from '@/components/RevealObserver'
import PourquoiAccordion from '@/components/PourquoiAccordion'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Pourquoi un Podcast de Marque ? | Sons & Merveilles | Agence Audio',
  description: "Découvrez pourquoi le podcast renforce l'image de marque : stats, cas clients, formats et conseils pour lancer votre stratégie audio d'entreprise.",
}

const HERO_BARS = [
  { d: '.9s',   dl: '0s',   h: '55%' },
  { d: '1.2s',  dl: '.1s',  h: '80%' },
  { d: '.8s',   dl: '.05s', h: '40%' },
  { d: '1.1s',  dl: '.2s',  h: '70%' },
  { d: '1.3s',  dl: '.08s', h: '90%' },
  { d: '.95s',  dl: '.15s', h: '50%' },
  { d: '1s',    dl: '.04s', h: '65%' },
  { d: '.85s',  dl: '.18s', h: '35%' },
  { d: '1.15s', dl: '.12s', h: '75%' },
  { d: '1s',    dl: '.07s', h: '60%' },
  { d: '.9s',   dl: '.22s', h: '45%' },
  { d: '1.2s',  dl: '.03s', h: '85%' },
]

const CLIENTS = [
  'Abbvie', 'Pierre Fabre', 'Philips', 'Université e-santé', 'GSK',
  'LauMa', 'Yoäg', 'AFU', 'Buzz eSanté', 'La Toile',
]

const CASE_STUDIES_QUERY = `*[_type == "pourquoiPage"][0] {
  featuredProjects[]-> {
    _id, client, slug,
    pourquoiTag,
    "projectTitle": coalesce(projectTitle, podcastName, title),
    "projectSummary": coalesce(projectSummary, cardDescription),
    featuredStatValue, featuredStatLabel,
    cardImage, cardBackground,
    "palette": cardImage.asset->metadata.palette {
      vibrant { background },
      darkVibrant { background },
      dominant { background }
    }
  }
}`

function paletteGradient(palette) {
  const color = palette?.vibrant?.background     ||
                palette?.darkVibrant?.background ||
                palette?.dominant?.background    || '#1A1A1A'
  return `radial-gradient(ellipse at 65% 35%, ${color} 0%, #0A0A0A 100%)`
}

export default async function PourquoiPage() {
  const data = await client.fetch(CASE_STUDIES_QUERY, {}, { next: { revalidate: 60 } })
  const cases = data?.featuredProjects ?? []

  return (
    <main>
      <RevealObserver />

      {/* ── HERO ── */}
      <section className="pourquoi-hero" aria-label="Introduction">
        <div className="pq-bars" aria-hidden="true">
          {HERO_BARS.map((b, i) => (
            <div key={i} className="pq-bar" style={{ '--d': b.d, '--dl': b.dl, '--h': b.h }} />
          ))}
        </div>
        <div className="pq-content">
          <h1 className="pq-title">
            Pourquoi<br />
            le <span>podcast</span><br />
            <em>renforce</em>-t-il<br />
            l&apos;image de marque&nbsp;?
          </h1>
          <div className="pq-bottom">
            <p className="pq-claim">Et surtout : comment s&apos;en servir&nbsp;?</p>
            <a href="#why" className="pq-cta">
              Découvrir pourquoi
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div className="stats-band reveal" aria-label="Statistiques podcasts">
        <div className="stats-band-grid">
          <div className="stat-band-block">
            <div className="stat-band-num">76<sup>%</sup></div>
            <div className="stat-band-desc">des auditeurs estiment que proposer des podcasts est un bon moyen de communiquer pour une marque</div>
          </div>
          <div className="stat-band-block">
            <div className="stat-band-num">17,6 M</div>
            <div className="stat-band-desc">auditeurs de podcasts / mois</div>
          </div>
          <div className="stat-band-block">
            <div className="stat-band-num">2/3</div>
            <div className="stat-band-desc">des auditeurs en consomment chaque semaine</div>
          </div>
        </div>
        <div className="stats-band-source">Source : CSA × APCM, nov. 2024</div>
      </div>

      {/* ── WHY SECTION ── */}
      <section className="why-section" id="why" aria-labelledby="why-heading">
        <div className="reveal">
          <p className="section-tag">Le pouvoir du son</p>
          <h2 className="why-title" id="why-heading">
            Le podcast,<br />c&apos;est le media<br />pour <span>tout ça</span>
          </h2>
          <p className="why-sub">
            Une voix laisse entendre ce qu&apos;on ne peut pas fabriquer : la personnalité, la conviction, l&apos;émotion sincère. Le podcast est le seul format qui donne le temps, pas quinze secondes de vidéo, mais le temps d&apos;une vraie conversation. Ce temps-là construit quelque chose que l&apos;image ne peut pas.
          </p>
        </div>
        <div className="reveal reveal-d1">
          <p className="why-epigraph">
            <em>Le storytelling audio fait la différence entre un contenu qu&apos;on subit et un contenu qu&apos;on choisit d&apos;écouter.</em>
          </p>
          <PourquoiAccordion />
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      {cases.length > 0 && (
        <section className="cases" aria-labelledby="cases-heading">
          <div className="cases-header reveal">
            <p className="section-tag">À quoi ça ressemble, concrètement</p>
            <h2 className="cases-title" id="cases-heading">
              Ils se sont lancés.<br /><span>Voici les résultats.</span>
            </h2>
          </div>

          {cases.map((c, i) => {
            const reverse = i % 2 === 1
            const gradient = c.cardBackground
              ? c.cardBackground
              : paletteGradient(c.palette)
            const coverUrl = c.cardImage ? urlFor(c.cardImage).width(600).url() : null

            return (
              <Link
                key={c._id}
                href={`/realisations/${c.slug.current}?from=pourquoi`}
                className={`case-block reveal${reverse ? ' reverse' : ''}`}
                aria-label={`Voir le projet ${c.client}`}
              >
                <div className="case-visual">
                  <div className="case-visual-bg" style={{ background: gradient }} />
                  {coverUrl && (
                    <div
                      className="case-cover"
                      style={{ backgroundImage: `url(${coverUrl})` }}
                    />
                  )}
                  <div className="case-cover-label" aria-hidden="true">{c.client}</div>
                  {c.pourquoiTag && <div className="case-tag-abs">{c.pourquoiTag}</div>}
                </div>

                <div className="case-content">
                  <div className="case-client-name">{c.client}</div>
                  {c.projectTitle && <h3 className="case-title-text">{c.projectTitle}</h3>}
                  {c.projectSummary && <p className="case-body-text">{c.projectSummary}</p>}
                  {c.featuredStatValue && (
                    <div className="case-result-box">
                      <div className="case-result-num-lg">{c.featuredStatValue}</div>
                      {c.featuredStatLabel && (
                        <div className="case-result-label">{c.featuredStatLabel}</div>
                      )}
                    </div>
                  )}
                  <div className="case-cta">
                    Voir le projet
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </section>
      )}

      {/* ── CLIENTS ── */}
      <section className="pq-clients reveal" aria-labelledby="clients-heading">
        <p className="section-tag">Ils nous font confiance</p>
        <h2 className="pq-clients-title" id="clients-heading">Nos <span>clients</span></h2>
        <div className="clients-grid" role="list">
          {CLIENTS.map(name => (
            <div key={name} className="client-tile" role="listitem">
              <div className="client-name-grid">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact reveal" id="contact" aria-labelledby="contact-heading">
        <div>
          <h2 className="contact-title" id="contact-heading">Parlons de votre projet</h2>
          <p className="contact-sub">Notre touche tient en deux mots : des rencontres et des beaux récits. Dites-nous ce que vous avez en tête.</p>
        </div>
        <ContactForm origin="Pourquoi un podcast" />
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
