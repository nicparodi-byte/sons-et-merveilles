import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import RevealObserver from '@/components/RevealObserver'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: "L'Équipe — Sons & Merveilles",
  description: "Rencontrez les artisans de Sons & Merveilles : fondateur, auteurs, réalisateurs, ingénieurs du son et compositeurs au service de vos podcasts de marque.",
}

const TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  expertise,
  photo,
  bio,
  quote,
  linkedIn,
  order
}`

const BTS_QUERY = `*[_type == "behindTheScenes" && _id == "behindTheScenes"][0] {
  title,
  items[] {
    _key,
    type,
    image,
    "videoUrl": videoFile.asset->url,
    caption,
    aspectRatio,
    order
  }
}`

// Gradient cycling for team cards
const CARD_GRADIENTS = [
  'linear-gradient(160deg,#1a0828 0%,#3d1060 40%,#6a208a 100%)',
  'linear-gradient(160deg,#0a1a10 0%,#1a4a2a 40%,#2a8050 100%)',
  'linear-gradient(160deg,#1a0a0a 0%,#4a1010 40%,#8a2828 100%)',
  'linear-gradient(160deg,#0a1828 0%,#103050 40%,#1a5888 100%)',
  'linear-gradient(160deg,#1a1000 0%,#483000 40%,#885010 100%)',
  'linear-gradient(160deg,#0a0a20 0%,#181850 40%,#282888 100%)',
  'linear-gradient(160deg,#1a0a10 0%,#4a1030 40%,#882058 100%)',
]

const BTS_WAVE_BARS = [
  { d: '.9s',  dl: '0s',   h: '28px' },
  { d: '1.1s', dl: '.1s',  h: '18px' },
  { d: '.8s',  dl: '.05s', h: '36px' },
  { d: '1.2s', dl: '.15s', h: '22px' },
  { d: '1s',   dl: '.2s',  h: '30px' },
  { d: '.95s', dl: '.08s', h: '16px' },
  { d: '1.1s', dl: '.12s', h: '40px' },
  { d: '.85s', dl: '.03s', h: '24px' },
]

const FOUNDER_WAVE = [
  { d: '.9s',   dl: '0s',   h: '28px' },
  { d: '1.1s',  dl: '.1s',  h: '44px' },
  { d: '.8s',   dl: '.05s', h: '20px' },
  { d: '1.2s',  dl: '.15s', h: '36px' },
  { d: '1s',    dl: '.08s', h: '50px' },
  { d: '.95s',  dl: '.12s', h: '24px' },
  { d: '1.1s',  dl: '.04s', h: '40px' },
  { d: '.85s',  dl: '.2s',  h: '16px' },
  { d: '1.15s', dl: '.09s', h: '32px' },
  { d: '1s',    dl: '.16s', h: '48px' },
]

const BIO_COMPONENTS = {
  block: { normal: ({ children }) => <p>{children}</p> },
}

const FALLBACK_TILES = [
  {caption: 'Enregistrement studio',          gradient: 'bts-g1'},
  {caption: 'Tournage COP Dubaï',             gradient: 'bts-g2'},
  {caption: 'Casque audio',                   gradient: 'bts-g3'},
  {caption: 'Autoroute A69',                  gradient: 'bts-g4'},
  {caption: 'Parasport : Ils se sont lancés !', gradient: 'bts-g5'},
  {caption: 'En séance',                      gradient: 'bts-g6'},
]

export default async function EquipePage() {
  const [members, bts] = await Promise.all([
    client.fetch(TEAM_QUERY, {}, {next: {revalidate: 60}}),
    client.fetch(BTS_QUERY,  {}, {next: {revalidate: 60}}),
  ])

  // First member (order=1) is the founder; the rest are the team
  const founder = members[0] ?? null
  const teamMembers = members.slice(1)

  // BTS: use Sanity items if available, otherwise static fallback
  const btsItems = bts?.items?.length
    ? [...bts.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : null
  const btsSectionTitle = bts?.title || 'Le son et la vidéo, ça se vit'

  return (
    <main className="equipe-page">
      <RevealObserver />

      {/* ── HERO ── */}
      <section className="hero" aria-label="Introduction équipe">
        <div className="hero-left">
          <div className="hero-eyebrow">Sons &amp; Merveilles · L&apos;équipe</div>
          <h1 className="hero-title">
            Sons &amp;<br />
            <span>Merveilles</span>
            c&apos;est qui&nbsp;?
          </h1>
        </div>
        <div className="hero-right">
          <p className="hero-story">
            Chez Sons &amp; Merveilles, nous aimons partir à la rencontre des autres, les écouter, et <strong>transmettre leur expérience.</strong>
          </p>
          <p className="hero-body">
            Une équipe de spécialistes passionnés — du son, de l&apos;image, de l&apos;écriture — qui met tout son savoir-faire au service de vos récits.
          </p>
        </div>
        <div className="hero-bg-letter" aria-hidden="true">É</div>
      </section>

      {/* ── FOUNDER ── */}
      {founder && (
        <section className="founder reveal" aria-labelledby="founder-name">
          <div className="founder-visual">
            <div className="founder-img-frame">
              <div
                className="founder-img-bg"
                style={founder.photo ? {
                  backgroundImage: `url(${urlFor(founder.photo).width(600).height(800).url()})`,
                } : undefined}
              />
              <div className="founder-wave" aria-hidden="true">
                {FOUNDER_WAVE.map((b, i) => (
                  <div key={i} className="fw-bar" style={{ '--d': b.d, '--dl': b.dl, '--h': b.h }} />
                ))}
              </div>
            </div>
            <div className="founder-badge" aria-hidden="true">
              <span className="badge-year">Paris</span>
              <span className="badge-label">Toulouse</span>
            </div>
          </div>

          <div className="founder-content reveal reveal-d1">
            <div className="eyebrow">Le fondateur</div>
            <h2 className="founder-name" id="founder-name">
              {founder.name.split(' ').map((word, i) => (
                <span key={i}>{word}<br /></span>
              ))}
            </h2>
            <div className="founder-role">{founder.role}</div>
            {founder.bio && (
              <div className="founder-bio">
                <PortableText value={founder.bio} components={BIO_COMPONENTS} />
              </div>
            )}
            {founder.quote && (
              <blockquote className="founder-quote">&ldquo;{founder.quote}&rdquo;</blockquote>
            )}
            {founder.linkedIn && (
              <a href={founder.linkedIn} target="_blank" rel="noopener noreferrer" className="about-link" style={{ marginTop: '28px' }}>
                LinkedIn
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </section>
      )}

      {/* ── TEAM GRID ── */}
      {teamMembers.length > 0 && (
        <section className="team reveal" aria-labelledby="team-heading">
          <div className="team-header">
            <div className="team-header-left">
              <div className="eyebrow">Les artisans du son</div>
              <h2 className="team-title" id="team-heading">
                Les voix<br />derrière<br /><span>les voix</span>
              </h2>
            </div>
            <p className="team-subtitle">
              Certain·e·s collaborent à nos projets récurrents depuis le début. D&apos;autres rejoignent l&apos;aventure selon les besoins. Tous apportent leur expertise de spécialistes.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, i) => {
              const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length]
              const bgStyle = member.photo
                ? {
                    backgroundImage: `url(${urlFor(member.photo).width(400).height(533).url()})`,
                    backgroundPosition: member.name === 'Aurélien Bony' ? 'left top' : 'center',
                  }
                : { background: gradient }

              // First paragraph of bio as hover description
              const hoverDesc = member.bio
                ? member.bio.find(b => b._type === 'block')?.children?.map(c => c.text).join('') ?? ''
                : ''

              return (
                <div key={member._id} className="team-card">
                  <div className="team-card-bg" style={bgStyle} />
                  <div className="team-info">
                    <div className="team-name">{member.name}</div>
                    <div className="team-role">{member.role}</div>
                  </div>
                  <div className="team-hover" aria-hidden="true">
                    <div className="hover-name">
                      {member.name.split(' ').map((w, j) => (
                        <span key={j}>{w}<br /></span>
                      ))}
                    </div>
                    <div className="hover-role">{member.role}</div>
                    {hoverDesc && <p className="hover-desc">{hoverDesc}</p>}
                    {member.expertise && <div className="hover-tag">{member.expertise}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── BEHIND THE SCENES ── */}
      <section className="bts reveal" aria-labelledby="bts-heading">
        <div className="bts-header">
          <div className="eyebrow">Dans les coulisses</div>
          <h2 className="bts-title" id="bts-heading">
            Le son et la vidéo,<br /><span>ça se vit</span>
          </h2>
        </div>
        <div className="bts-mosaic">
          {btsItems
            ? btsItems.map((item) => (
                <div key={item._key} className="bts-tile" style={item.aspectRatio ? { aspectRatio: item.aspectRatio } : undefined}>
                  {item.type === 'video' && item.videoUrl
                    ? <video className="bts-video" autoPlay muted loop playsInline src={item.videoUrl} />
                    : item.image
                      ? <div className="card-cover" style={{ backgroundImage: `url(${urlFor(item.image).width(900).url()})` }} />
                      : <div className="card-cover" style={{ background: 'var(--gray)' }} />
                  }
                  <div className="card-wave" aria-hidden="true">
                    {BTS_WAVE_BARS.map((b, i) => (
                      <div key={i} className="card-wave-bar" style={{ '--d': b.d, '--dl': b.dl, '--h': b.h }} />
                    ))}
                  </div>
                  {item.caption && (
                    <>
                      <div className="card-label">
                        <span className="label-client">{item.caption}</span>
                      </div>
                      <div className="card-overlay">
                        <div className="overlay-title">{item.caption}</div>
                      </div>
                    </>
                  )}
                </div>
              ))
            : FALLBACK_TILES.map((tile, i) => (
                <div key={i} className={`bts-tile bts-tile-${i + 1}`}>
                  <div className={`bts-tile-inner ${tile.gradient}`} />
                  <span className="bts-tile-label">{tile.caption}</span>
                </div>
              ))
          }
        </div>
      </section>

      {/* ── VISIO CTA ── */}
      <section className="visio reveal" id="contact" aria-labelledby="visio-heading">
        <div className="visio-left">
          <div className="visio-tag">On vous explique tout</div>
          <h2 className="visio-title" id="visio-heading">
            Tout savoir<br />en <span>20 min</span>
          </h2>
          <p className="visio-body">
            Comment utiliser un podcast ? Comment le promouvoir ? À quoi sert la vidéo&nbsp;?<br /><br />
            <strong>Laissez-nous vos coordonnées</strong>&nbsp;: nous organisons une visio de 20 minutes pour répondre à toutes vos questions, sans engagement.
          </p>
        </div>
        <ContactForm origin="Équipe" formClass="visio-form" slim />
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
