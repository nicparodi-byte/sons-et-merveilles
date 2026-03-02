import Link from 'next/link'
import RevealObserver from '@/components/RevealObserver'

export const metadata = {
  title: 'Mentions légales | Sons & Merveilles',
  description: "Mentions légales du site sonsetmerveilles.fr — éditeur, hébergement, propriété intellectuelle et données personnelles.",
  robots: { index: false, follow: true },
}

export default function MentionsLegalesPage() {
  return (
    <main>
      <RevealObserver />

      {/* ── HEADER ── */}
      <header className="ml-header">
        <p className="page-eyebrow">Informations légales</p>
        <h1 className="page-title">Mentions<br /><em>légales</em></h1>
        <p className="page-subtitle">Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance en l&apos;économie numérique.</p>
      </header>

      {/* ── CONTENT ── */}
      <div className="mentions-content">

        {/* 01 — Éditeur */}
        <section className="mentions-section reveal" aria-labelledby="editeur">
          <p className="mentions-section-num">01</p>
          <h2 id="editeur">Éditeur du site</h2>
          <div className="mentions-block">
            <address>
              <strong>Sons &amp; Merveilles</strong><br />
              SASU au capital de 1 000 €<br />
              Centre Etic · 22 rue Mérigonde · 81100 Castres<br />
              France<br /><br />
              <strong>Directeur de la publication :</strong> Nicolas Parodi<br />
              <strong>Contact :</strong>{' '}
              <a href="mailto:info@sonsetmerveilles.com">info@sonsetmerveilles.com</a>
            </address>
          </div>
          <p className="mentions-note">Les sites sonsetmerveilles.fr et sonsetmerveilles.com sont édités par Sons &amp; Merveilles.</p>
        </section>

        <div className="mentions-divider" />

        {/* 02 — Hébergement */}
        <section className="mentions-section reveal" aria-labelledby="hebergement">
          <p className="mentions-section-num">02</p>
          <h2 id="hebergement">Hébergement</h2>
          <div className="mentions-block">
            <address>
              <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133<br />
              Covina, CA 91723<br />
              États-Unis<br /><br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
            </address>
          </div>
        </section>

        <div className="mentions-divider" />

        {/* 03 — Propriété intellectuelle */}
        <section className="mentions-section reveal" aria-labelledby="propriete">
          <p className="mentions-section-num">03</p>
          <h2 id="propriete">Propriété intellectuelle</h2>
          <div className="mentions-block">
            <p>L&apos;ensemble des contenus présents sur ce site — textes, visuels, photographies, illustrations, identité sonore, design et architecture — est la propriété exclusive de <strong>Sons &amp; Merveilles</strong> ou de ses clients, et est protégé par les lois françaises et internationales relatives au droit d&apos;auteur et à la propriété intellectuelle.</p>
            <br />
            <p>Les visuels, photographies et extraits audio publiés sur ce site sont soit la propriété de Sons &amp; Merveilles, soit utilisés avec l&apos;autorisation expresse des clients concernés. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, est strictement interdite sans accord préalable écrit.</p>
          </div>
        </section>

        <div className="mentions-divider" />

        {/* 04 — Données personnelles */}
        <section className="mentions-section reveal" aria-labelledby="donnees">
          <p className="mentions-section-num">04</p>
          <h2 id="donnees">Données personnelles</h2>
          <div className="mentions-block">
            <p>Les informations collectées via le formulaire de contact (nom, email, message) sont utilisées exclusivement pour répondre à vos demandes. Elles ne sont ni cédées, ni vendues à des tiers.</p>
            <br />
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à :{' '}
              <a href="mailto:info@sonsetmerveilles.com">info@sonsetmerveilles.com</a>
            </p>
          </div>
        </section>

        <div className="mentions-divider" />

        {/* 05 — Cookies */}
        <section className="mentions-section reveal" aria-labelledby="cookies">
          <p className="mentions-section-num">05</p>
          <h2 id="cookies">Cookies</h2>
          <div className="mentions-block">
            <p>Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de tracking tiers n&apos;est déposé sans votre consentement explicite.</p>
            <br />
            <p>Vous pouvez configurer votre navigateur pour refuser les cookies. Certaines fonctionnalités du site pourraient alors ne plus être disponibles.</p>
          </div>
        </section>

        <div className="mentions-divider" />

        {/* 06 — Liens hypertextes */}
        <section className="mentions-section reveal" aria-labelledby="liens">
          <p className="mentions-section-num">06</p>
          <h2 id="liens">Liens hypertextes</h2>
          <div className="mentions-block">
            <p>Les liens présents sur ce site pointent vers des ressources externes (Spotify, Apple Podcasts, LinkedIn). Sons &amp; Merveilles ne peut être tenue responsable du contenu de ces sites tiers ni de leur politique de confidentialité.</p>
          </div>
        </section>

      </div>

      {/* ── FOOTER ── */}
      <footer role="contentinfo">
        <div className="footer-logo">Sons &amp; Merveilles</div>
        <ul className="footer-links" aria-label="Liens du pied de page">
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/pourquoi-le-podcast">Pourquoi un podcast&nbsp;?</Link></li>
          <li><Link href="/realisations">Réalisations</Link></li>
          <li><Link href="/equipe">Équipe</Link></li>
          <li><Link href="/mentions-legales" aria-current="page">Mentions légales</Link></li>
        </ul>
        <div className="footer-copy">© 2025 Sons &amp; Merveilles · Agence Podcast de Marque</div>
      </footer>
    </main>
  )
}
