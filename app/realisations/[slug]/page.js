import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import RevealObserver from '@/components/RevealObserver'
import ProjectTopBar from '@/components/ProjectTopBar'
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb'
import ContactForm from '@/components/ContactForm'

const OPTS = { next: { revalidate: 60 } }

const QUERY = `*[_type == "realisation" && slug.current == $slug][0] {
  _id, "podcastName": coalesce(podcastName, title), projectTitle, client, slug, sector, format, year, award,
  cardImage,
  "palette": cardImage.asset->metadata.palette {
    vibrant { background },
    darkVibrant { background },
    dominant { background }
  },
  cardDescription,
  projectSummary,
  projectIntro,
  modalDescription, challengeTitle,
  strategyPoints[] { title, body },
  solutionBody,
  specs[] { label, value, sub },
  audioEmbed,
  videoEmbed,
  stat1Value, stat1Label, stat1Context,
  stat2Value, stat2Label, stat2Context,
  stat3Value, stat3Label, stat3Context,
  stat4Value, stat4Label, stat4Context,
  clientQuote, clientQuoteName, clientQuoteRole,
  bridgeBody,
  bridgeSectors,
  hasProjectPage
}`

const RELATED_QUERY = `*[_type == "realisation" && slug.current != $slug && (sector == $sector || format == $format)] | order(_createdAt desc) [0...3] {
  _id, "podcastName": coalesce(podcastName, title), client, slug, sector, format,
  cardImage,
  "palette": cardImage.asset->metadata.palette {
    vibrant { background },
    darkVibrant { background },
    dominant { background }
  },
  cardDescription,
  hasProjectPage
}`

const ALL_SLUGS_QUERY = `*[_type == "realisation" && hasProjectPage == true]{ "slug": slug.current }`

function paletteGradient(palette) {
  const mid  = palette?.vibrant?.background    || palette?.dominant?.background || '#1A1A1A'
  const edge = palette?.darkVibrant?.background || palette?.dominant?.background || '#0A0A0A'
  return `radial-gradient(ellipse at center, ${mid} 0%, ${edge} 65%, #0A0A0A 100%)`
}

const WAVE_BARS = [
  { d: '.9s',   dl: '0s',   h: '28px' },
  { d: '1.1s',  dl: '.08s', h: '48px' },
  { d: '.8s',   dl: '.04s', h: '18px' },
  { d: '1.2s',  dl: '.14s', h: '38px' },
  { d: '1s',    dl: '.06s', h: '60px' },
  { d: '.95s',  dl: '.1s',  h: '24px' },
  { d: '1.1s',  dl: '.02s', h: '44px' },
  { d: '.85s',  dl: '.18s', h: '14px' },
  { d: '1.15s', dl: '.07s', h: '34px' },
  { d: '1s',    dl: '.13s', h: '52px' },
  { d: '.9s',   dl: '.09s', h: '22px' },
  { d: '1.2s',  dl: '.05s', h: '40px' },
]

export async function generateStaticParams() {
  const items = await client.fetch(ALL_SLUGS_QUERY)
  return items.map(item => ({ slug: item.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = await client.fetch(QUERY, { slug }, OPTS)
  if (!p) return {}
  return {
    title: `${p.projectTitle || p.podcastName} — ${p.client} | Sons & Merveilles`,
    description: p.cardDescription,
  }
}

export default async function ProjetPage({ params }) {
  const { slug } = await params
  const p = await client.fetch(QUERY, { slug }, OPTS)
  if (!p) notFound()

  const related = await client.fetch(
    RELATED_QUERY,
    { slug, sector: p.sector ?? '', format: p.format ?? '' },
    OPTS,
  )

  // Hero artwork: image as cover + palette gradient behind
  const heroArtworkStyle = p.cardImage
    ? {
        backgroundImage: `url(${urlFor(p.cardImage).width(1200).url()}), ${paletteGradient(p.palette)}`,
        backgroundSize: '75%, cover',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
      }
    : { background: paletteGradient(p.palette) }

  const intro        = p.projectIntro || p.cardDescription
  const hasStrategy  = p.strategyPoints?.length > 0
  const hasSolution  = p.solutionBody
  const hasSpecs     = p.specs?.length > 0
  const hasMedia     = p.audioEmbed || p.videoEmbed
  const stats        = [
    { v: p.stat1Value, l: p.stat1Label, c: p.stat1Context },
    { v: p.stat2Value, l: p.stat2Label, c: p.stat2Context },
    { v: p.stat3Value, l: p.stat3Label, c: p.stat3Context },
    { v: p.stat4Value, l: p.stat4Label, c: p.stat4Context },
  ].filter(s => s.v)
  const hasClientVoice = p.clientQuote
  const hasBridge      = p.bridgeBody
  const hasRelated     = related?.length > 0

  return (
    <main>
      <RevealObserver />
      <Suspense fallback={null}>
        <ProjectTopBar />
      </Suspense>

      {/* ── HERO ── */}
      <header className="prod-hero" role="banner">
        <div className="prod-hero-left">
          <Suspense fallback={null}>
            <ProjectBreadcrumb client={p.client} podcastName={p.podcastName} />
          </Suspense>

          <div className="prod-tags">
            {p.format && <span className="prod-tag format">{p.format}</span>}
            {p.sector && <span className="prod-tag sector">{p.sector}</span>}
            {p.award && <span className="prod-tag award">🏆 {p.award}</span>}
          </div>

          <h1 className="prod-title">{p.projectTitle || p.podcastName}</h1>

          <div className="prod-client-row">
            <span className="prod-client-name">{p.client}</span>
            {p.year && (
              <>
                <span className="prod-client-sep" aria-hidden="true" />
                <span className="prod-client-year">{p.year}</span>
              </>
            )}
          </div>

          {intro && <p className="prod-intro">{intro}</p>}
        </div>

        <div className="prod-hero-right" aria-hidden="true">
          <div className="prod-hero-artwork" style={heroArtworkStyle} />
          <div className="prod-hero-overlay" />
          <div className="prod-hero-wave">
            {WAVE_BARS.map((w, i) => (
              <div key={i} className="pwb" style={{ '--d': w.d, '--dl': w.dl, '--h': w.h }} />
            ))}
          </div>
        </div>
      </header>

      {/* ── CHALLENGE ── */}
      {p.modalDescription && (
        <section className="prod-section prod-challenge" aria-labelledby="challenge-heading">
          <div className="prod-two-col-wide reveal">
            <div>
              <p className="section-tag">Le défi</p>
              <h2 className="block-title" id="challenge-heading">
                {p.challengeTitle || <>Le contexte<br />du <span>projet</span></>}
              </h2>
            </div>
            <div className="block-body">
              {p.modalDescription.split('\n').filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STRATEGY ── */}
      {hasStrategy && (
        <section className="prod-section prod-strategy" aria-labelledby="strategy-heading">
          <div className="prod-two-col reveal">
            <div>
              <p className="section-tag">L'approche stratégique</p>
              <h2 className="block-title" id="strategy-heading">
                Pourquoi<br />le <span>podcast</span>
              </h2>
            </div>
            <div className="strategy-points">
              {p.strategyPoints.map((pt, i) => (
                <div key={i} className="strategy-point">
                  <div className="sp-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="sp-content">
                    <h3 className="sp-title">{pt.title}</h3>
                    {pt.body && <p className="sp-body">{pt.body}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SOLUTION ── */}
      {(hasSolution || hasSpecs) && (
        <section className="prod-section prod-solution" aria-labelledby="solution-heading">
          {hasSolution && (
            <div className="prod-two-col-wide reveal">
              <div>
                <p className="section-tag">La solution créative</p>
                <h2 className="block-title" id="solution-heading">
                  Ce que<br />nous avons <em>fait</em>
                </h2>
              </div>
              <div className="block-body">
                {p.solutionBody.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          )}
          {hasSpecs && (
            <div className="solution-specs reveal reveal-d1">
              {p.specs.map((spec, i) => (
                <div key={i} className="spec-block">
                  <div className="spec-label">{spec.label}</div>
                  <div className="spec-value">{spec.value}</div>
                  {spec.sub && <div className="spec-sub">{spec.sub}</div>}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── LISTEN / WATCH ── */}
      {hasMedia && (
        <section className="prod-section prod-listen" aria-labelledby="listen-heading">
          <div className="listen-inner">
            <h2 className="listen-title" id="listen-heading">
              Écouter &amp;<br /><span>Découvrir</span>
            </h2>
            {p.audioEmbed && (
              <>
                <p className="embed-audio-label">Écouter</p>
                <div className="embed-wrap">
                  <iframe
                    src={p.audioEmbed}
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Écouter : ${p.projectTitle || p.podcastName}`}
                  />
                </div>
              </>
            )}
            {p.videoEmbed && (
              <>
                <p className="embed-video-label">Voir</p>
                <div className="embed-video-wrap">
                  <iframe
                    src={p.videoEmbed}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    title={`Voir : ${p.projectTitle || p.podcastName}`}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      {stats.length > 0 && (
        <section className="prod-results" aria-labelledby="results-heading">
          <h2 className="results-title" id="results-heading">Les résultats</h2>
          <div className="results-grid reveal">
            {stats.map((s, i) => (
              <div key={i} className="result-block">
                <div className="result-num">{s.v}</div>
                {s.l && <div className="result-label">{s.l}</div>}
                {s.c && <div className="result-context">{s.c}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CLIENT VOICE ── */}
      {hasClientVoice && (
        <section className="client-voice reveal" aria-labelledby="quote-heading">
          <div className="quote-block">
            <span className="quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="quote-text" id="quote-heading">{p.clientQuote}</blockquote>
            <div className="quote-divider" />
            {(p.clientQuoteName || p.clientQuoteRole) && (
              <div className="quote-attribution">
                {p.clientQuoteName && <span className="quote-name">{p.clientQuoteName}</span>}
                {p.clientQuoteRole && <span className="quote-role">{p.clientQuoteRole}</span>}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── BRIDGE ── */}
      {hasBridge && (
        <section className="prod-section prod-bridge reveal" aria-labelledby="bridge-heading">
          <div className="bridge-inner">
            <p className="bridge-subtitle">Ce que ce projet nous a appris</p>
            <h2 className="bridge-title" id="bridge-heading">Et pour votre marque&nbsp;?</h2>
            <div className="bridge-body">
              {p.bridgeBody.split('\n').filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {p.bridgeSectors?.length > 0 && (
              <div className="bridge-sectors" role="list">
                {p.bridgeSectors.map((s, i) => (
                  <span key={i} className="bridge-sector" role="listitem">{s}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── RELATED ── */}
      {hasRelated && (
        <section className="related reveal" aria-labelledby="related-heading">
          <p className="section-tag">Dans le même univers</p>
          <h2 className="related-title" id="related-heading">Projets similaires</h2>
          <p className="related-sub">Même secteur ou même format — découvrez d'autres réalisations.</p>
          <div className="related-grid">
            {related.map((r) => {
              const bg = paletteGradient(r.palette)
              const bgStyle = r.cardImage
                ? {
                    backgroundImage: `url(${urlFor(r.cardImage).width(400).url()}), ${bg}`,
                    backgroundSize: 'contain, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                  }
                : { background: bg }

              const inner = (
                <>
                  <div className="related-bg" style={bgStyle} />
                  <div className="related-card-overlay">
                    {r.format && <span className="related-tag">{r.format}</span>}
                    {r.client && <span className="related-client">{r.client}</span>}
                  </div>
                  <div className="related-card-hover">
                    <span className="related-tag">{[r.format, r.sector].filter(Boolean).join(' · ')}</span>
                    <p className="related-title-text">{r.podcastName}</p>
                    <span className="related-open-btn">
                      {r.hasProjectPage ? 'Voir le projet' : 'Voir le portfolio'}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </>
              )

              const href = r.hasProjectPage && r.slug?.current
                ? `/realisations/${r.slug.current}`
                : '/realisations'

              return (
                <Link key={r._id} href={href} className="related-card">
                  {inner}
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      <section className="contact reveal" id="contact" aria-labelledby="contact-heading">
        <div>
          <h2 className="contact-title" id="contact-heading">Un projet similaire&nbsp;?</h2>
          <p className="contact-sub">Parlons de ce que vous voulez créer. Notre équipe vous répond sous 48h.</p>
        </div>
        <ContactForm origin={`Projet — ${p.podcastName} (${p.client})`} />
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
