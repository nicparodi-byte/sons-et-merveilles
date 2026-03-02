import Image from 'next/image'
import Link from 'next/link'
import RevealObserver from '@/components/RevealObserver'
import FaqSection from '@/components/FaqSection'
import ContactForm from '@/components/ContactForm'

const waveBars = [
  { d: '.9s',   delay: '0s',   h: '40px'  },
  { d: '1.1s',  delay: '.1s',  h: '80px'  },
  { d: '1.3s',  delay: '.05s', h: '55px'  },
  { d: '.8s',   delay: '.15s', h: '120px' },
  { d: '1s',    delay: '.2s',  h: '70px'  },
  { d: '1.2s',  delay: '.07s', h: '90px'  },
  { d: '.95s',  delay: '.12s', h: '140px' },
  { d: '1.1s',  delay: '.03s', h: '60px'  },
  { d: '.85s',  delay: '.18s', h: '100px' },
  { d: '1.3s',  delay: '.08s', h: '75px'  },
  { d: '1s',    delay: '.14s', h: '110px' },
  { d: '.9s',   delay: '.06s', h: '45px'  },
  { d: '1.15s', delay: '.22s', h: '95px'  },
  { d: '1s',    delay: '.1s',  h: '130px' },
  { d: '.8s',   delay: '.16s', h: '50px'  },
  { d: '1.2s',  delay: '.04s', h: '85px'  },
  { d: '.95s',  delay: '.2s',  h: '65px'  },
  { d: '1.05s', delay: '.09s', h: '115px' },
]

const tickerItems = [
  'Podcast de Marque', 'Storytelling Audio', 'Témoignages', 'Interviews',
  'Récits Immersifs', 'Communication Interne', 'Marque Employeur', 'RSE',
  'Santé', 'Innovation',
]

export default function HomePage() {
  return (
    <main>
      <RevealObserver />

      {/* ── HERO ── */}
      <section className="hero" aria-label="Introduction">
        <div className="hero-left">
          <p className="hero-tag">Agence Podcast de Marque · Son &amp; Image · France</p>
          <h1 className="hero-title">
            Faire entendre<br />
            <span>l&apos;humain</span>
          </h1>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Démarrer un projet
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link href="/pourquoi-le-podcast" className="btn-secondary">Pourquoi le podcast&nbsp;?</Link>
          </div>
        </div>
        <div className="hero-right" aria-hidden="true">
          <div className="hero-visual">
            <Image
              src="/images/Interview-esante.webp"
              alt=""
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
            <div className="hero-overlay" />
            <div className="waveform">
              {waveBars.map((bar, i) => (
                <div
                  key={i}
                  className="wave-bar"
                  style={{ '--d': bar.d, '--delay': bar.delay, '--h': bar.h }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="ticker-item">
              {item} <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="about reveal" id="about" aria-labelledby="about-heading">
        <div>
          <p className="section-tag">Notre approche</p>
          <h2 className="section-title" id="about-heading">
            Pour les marques<br />qui veulent être<br /><em>entendues.</em>
          </h2>
          <p className="about-body about-body--voice">
            La voix crée une intimité unique. Elle traverse les écrans, les embouteillages, les salles de sport. Elle reste.
          </p>
          <p className="about-body about-body--facts">
            Notre équipe rassemble des spécialistes du son, de l&apos;éditorial et de l&apos;image. Nous créons des podcasts de marque dans la santé, la RSE, la formation et l&apos;innovation. En studio, en entreprise ou en extérieur. Partout en France. Depuis 2020.
          </p>
          <Link href="/pourquoi-le-podcast" className="about-link">
            Pourquoi le podcast&nbsp;?
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div>
          <div className="about-card">
            <div className="about-stats">
              <div>
                <div className="stat-number">+20</div>
                <div className="stat-label">Podcasts de marque produits</div>
              </div>
              <div>
                <div className="stat-number">5</div>
                <div className="stat-label">Secteurs d&apos;expertise</div>
              </div>
              <div>
                <div className="stat-number">4</div>
                <div className="stat-label">Formats de production</div>
              </div>
              <div>
                <div className="stat-number">2730</div>
                <div className="stat-label">Minutes d&apos;audio depuis 2020</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMATS ── */}
      <section className="formats reveal" id="formats" aria-labelledby="formats-heading">
        <p className="section-tag">Nos formats</p>
        <h2 className="section-title" id="formats-heading">
          4 formats pour<br />chaque <em>objectif</em>
        </h2>
        <div className="formats-grid">
          <article className="format-card">
            <div className="format-num" aria-hidden="true">01</div>
            <h3 className="format-name">Témoignages</h3>
            <p className="format-desc">Des récits &quot;voix nue&quot; pour laisser toute la place à la parole d&apos;un témoin. Certaines histoires méritent d&apos;être racontées sans interruption.</p>
          </article>
          <article className="format-card">
            <div className="format-num" aria-hidden="true">02</div>
            <h3 className="format-name">Interviews</h3>
            <p className="format-desc">Une table, du temps, une vraie conversation. Aller chercher les moments d&apos;authenticité invisibles en surface, idéal pour partager l&apos;expertise de vos équipes ou partenaires.</p>
          </article>
          <article className="format-card">
            <div className="format-num" aria-hidden="true">03</div>
            <h3 className="format-name">Récits Immersifs</h3>
            <p className="format-desc">Micro embarqué au cœur de l&apos;action. Nous retranscrivons l&apos;ambiance d&apos;un lieu, d&apos;un événement, d&apos;une réalité, pour une expérience sonore mémorable.</p>
          </article>
          <article className="format-card">
            <div className="format-num" aria-hidden="true">04</div>
            <h3 className="format-name">Chroniques</h3>
            <p className="format-desc">Format court (3 min) pour la formation, la marque employeur ou la communication interne. Des messages précis, mémorables, accessibles à tous et partout.</p>
          </article>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <div className="sectors reveal" aria-labelledby="sectors-heading">
        <h2 className="sectors-title" id="sectors-heading">Là où la voix fait la différence.</h2>
        <div className="sectors-tags" role="list">
          {['Formation', 'RSE', 'Santé', 'Innovation', 'Marque Employeur', 'Communication Interne', 'Pharma', 'Well-being'].map((s) => (
            <span key={s} className="sector-tag" role="listitem">{s}</span>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <section className="process reveal" id="process" aria-labelledby="process-heading">
        <p className="section-tag">Notre processus</p>
        <h2 className="section-title" id="process-heading">
          Idée · Réalisation · <em>Diffusion</em>
        </h2>
        <div className="process-steps">
          <div className="step">
            <p className="step-num">Étape 01</p>
            <h3 className="step-name">Idée &amp; Stratégie éditoriale</h3>
            <p className="step-desc">Ligne éditoriale, formats, positionnement, identité sonore : nous définissons tout ensemble.</p>
          </div>
          <div className="step">
            <p className="step-num">Étape 02</p>
            <h3 className="step-name">Production</h3>
            <p className="step-desc">Enregistrement, montage, design sonore, création musicale. Tout est pris en charge.</p>
          </div>
          <div className="step">
            <p className="step-num">Étape 03</p>
            <h3 className="step-name">Diffusion &amp; Mesure</h3>
            <p className="step-desc">Mise en ligne sur toutes les plateformes. Suivi d&apos;audience et optimisation continue.</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── CONTACT ── */}
      <section className="contact reveal" id="contact" aria-labelledby="contact-heading">
        <div>
          <h2 className="contact-title" id="contact-heading">Parlons de votre projet</h2>
          <p className="contact-sub">Notre touche tient en deux mots : des rencontres et des beaux récits. Dites-nous ce que vous avez en tête.</p>
        </div>
        <ContactForm origin="Homepage" />
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
