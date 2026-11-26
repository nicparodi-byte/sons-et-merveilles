import Image from 'next/image'
import Link from 'next/link'
import RevealObserver from '@/components/RevealObserver'
import HomeCases from '@/components/HomeCases'
import PortesSection from '@/components/PortesSection'
import ContactForm from '@/components/ContactForm'

const waveBars = [
  { dl: '65ms', h: '30px'  },
  { dl: '50ms', h: '55px'  },
  { dl: '35ms', h: '80px'  },
  { dl: '22ms', h: '110px' },
  { dl: '12ms', h: '130px' },
  { dl: '5ms',  h: '115px' },
  { dl: '2ms',  h: '140px' },
  { dl: '0ms',  h: '125px' },
  { dl: '2ms',  h: '100px' },
  { dl: '5ms',  h: '80px'  },
  { dl: '12ms', h: '60px'  },
  { dl: '22ms', h: '90px'  },
  { dl: '35ms', h: '120px' },
  { dl: '50ms', h: '70px'  },
  { dl: '65ms', h: '45px'  },
  { dl: '78ms', h: '95px'  },
  { dl: '90ms', h: '55px'  },
  { dl: '100ms',h: '75px'  },
]

export default function HomePage() {
  return (
    <main>
      <RevealObserver />

      {/* ── HERO ── */}
      <section className="hero" aria-label="Introduction">
        <div className="hero-left">
          <h1 className="hero-title">
            <span className="word-wrap"><span className="word-inner" style={{'--wd':'0s'}}>Faire entendre</span></span>
            <br />
            <span className="word-wrap"><span className="word-inner" style={{'--wd':'.25s'}}><span className="accent">l&apos;humain</span></span></span>
          </h1>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Démarrer un projet
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link href="/realisations" className="btn-secondary">Nos réalisations</Link>
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
                  style={{ '--dl': bar.dl, '--h': bar.h }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── L'ART DU RÉCIT ── */}
      <section className="about reveal" id="about" aria-labelledby="about-heading">
        <div>
          <h2 className="section-title" id="about-heading">
            L&apos;art du <em>récit.</em>
          </h2>
          <p className="about-body about-body--lead">
            Nous nous appuyons sur la force des histoires humaines pour répondre aux enjeux de communication des organisations&nbsp;: faire comprendre, sensibiliser, incarner un engagement ou renforcer la proximité avec leurs publics.
          </p>
          <p className="about-body">
            Nous partons de l&apos;expérience vécue, construisons le récit et imaginons les formes les plus pertinentes pour le transmettre et toucher les publics auxquels il s&apos;adresse.
          </p>
          <Link href="/pourquoi-le-podcast" className="about-link">
            Pourquoi le podcast&nbsp;?
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div className="about-promise">
          <p className="about-promise-label">Rendre vos sujets</p>
          <p className="about-promise-words">
            <span style={{ '--w': 0 }}>Concrets.</span>
            <span style={{ '--w': 1 }}>Sensibles.</span>
            <span style={{ '--w': 2 }}>Mémorables.</span>
          </p>
        </div>
      </section>

      {/* ── RÉCITS À L'ŒUVRE ── */}
      <HomeCases />

      {/* ── UN SUJET, PLUSIEURS PORTES D'ENTRÉE ── */}
      <PortesSection />

      {/* ── PROCESS ── */}
      <section className="process reveal" id="process" aria-labelledby="process-heading">
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
          <li><Link href="/podcasts-sante">Podcasts santé</Link></li>
          <li><Link href="/equipe">Équipe</Link></li>
          <li><Link href="/mentions-legales">Mentions légales</Link></li>
        </ul>
        <div className="footer-copy">© {new Date().getFullYear()} Sons &amp; Merveilles · Création de podcasts</div>
      </footer>
    </main>
  )
}
