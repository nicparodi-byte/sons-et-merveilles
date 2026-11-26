import Image from 'next/image'
import Link from 'next/link'
import RevealObserver from '@/components/RevealObserver'
import HomeCases from '@/components/HomeCases'
import PortesSection from '@/components/PortesSection'
import ContactForm from '@/components/ContactForm'

export default function HomePage() {
  return (
    <main>
      <RevealObserver />

      {/* ── HERO ── */}
      <section className="hero hero--full" aria-label="Introduction">
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
              src="/images/hero-temoin.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="hero-overlay" />
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
            Pour faire comprendre un sujet, sensibiliser ou donner vie à un engagement, nous aimons partir de ce que les gens vivent, de ce qu&apos;ils ressentent, de ce qu&apos;ils ont à raconter.
          </p>
          <p className="about-body">
            À partir de ces expériences, nous construisons des récits et imaginons les formes qui leur permettront de toucher vos publics.
          </p>
        </div>
        <div className="about-promise">
          <p className="about-promise-label">Pour rendre vos sujets</p>
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
