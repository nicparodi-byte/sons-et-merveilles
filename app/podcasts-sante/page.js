import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import RevealObserver from '@/components/RevealObserver'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Podcasts Santé — Sons & Merveilles',
  description: 'Au fil de nos productions pour des laboratoires pharmaceutiques, des institutions de santé et des associations de patients, Sons & Merveilles a développé une expertise éditoriale et technique dans la production de podcasts santé.',
}

const HEALTH_PROJECTS_QUERY = `*[_type == "realisation" && slug.current in ["podcast-Apicil", "cancers-du-sang-nos-vies", "pierre-fabre-et-si-je-manquais-de-fer"]] {
  _id, client, slug, cardDescription, cardImage
}`

const PROJECTS_ORDER = [
  'podcast-Apicil',
  'cancers-du-sang-nos-vies',
  'pierre-fabre-et-si-je-manquais-de-fer',
]

const PROJECT_EXTRA = {
  'podcast-Apicil': {
    angle: 'Le documentaire immersif',
    description: 'Enregistrer des consultations et des moments de vie pour raconter l\'endométriose et l\'accompagnement des femmes victimes de violences. Deux documentaires sur la santé des femmes, réalisés sur site à Lyon et à Marseille.',
    cta: 'Découvrir le projet Apicil',
    bg: '#1a1008',
  },
  'cancers-du-sang-nos-vies': {
    angle: 'La parole des patients',
    description: 'Recueillir des témoignages personnels et construire des récits qui laissent toute leur place aux personnes touchées par les cancers du sang. 41 épisodes, 4 saisons.',
    cta: 'Découvrir Cancers du Sang, Nos Vies',
    bg: '#1a0a06',
  },
  'pierre-fabre-et-si-je-manquais-de-fer': {
    angle: 'La santé racontée au quotidien',
    description: 'Faire comprendre la carence en fer en suivant une femme dans son quotidien, plutôt qu\'en déroulant une explication médicale. Un récit documentaire en quatre épisodes.',
    cta: 'Découvrir le projet Pierre Fabre',
    bg: '#081018',
  },
}

const POINTS = [
  {
    title: 'La rigueur, sans le jargon',
    body: 'Un podcast santé doit être rigoureux. Mais une information médicalement juste n\'est pas toujours facile à comprendre. Il faut la rendre accessible sans en trahir le sens ni effacer sa complexité. Nous travaillons la préparation des interviews, les relances et le montage pour rendre les propos accessibles, sans les dénaturer.',
  },
  {
    title: 'L\'attention, sans les effets de manche',
    body: 'On ne retient pas l\'attention d\'un auditeur en empilant les informations. Il faut un point de vue, une progression, des situations concrètes. Nous aimons dire que le podcast est l\'un des médias les plus visuels. En plaçant le micro au bon endroit et en donnant les bons repères sonores, nous aidons l\'auditeur à se représenter les situations. Parfois, une scène enregistrée sur le terrain en dit davantage qu\'une longue explication.',
  },
  {
    title: 'L\'émotion, sans en rajouter',
    body: 'Nous avons une conviction : ressentir une situation favorise sa compréhension. Mais la maladie, les douleurs, les parcours de soins ou les violences sont des sujets sensibles. Nous prenons le temps de préparer les rencontres, d\'écouter et de choisir ce qui mérite d\'être conservé au montage. L\'émotion vient de la parole et des situations, pas d\'une mise en scène destinée à la provoquer. Elle peut aussi passer par les silences.',
  },
  {
    title: 'L\'écoute, avant la parole',
    body: 'Recueillir le témoignage d\'un témoin sur son parcours ne consiste pas simplement à lui poser des questions. Il faut savoir écouter, laisser du temps, accueillir les hésitations et parfois renoncer à une question. Cette attention commence avant l\'enregistrement et se poursuit au montage. Elle permet de recueillir une parole personnelle sans la brusquer ni lui faire dire ce qu\'on voudrait entendre.',
  },
]

const FORMATS = [
  {
    title: 'Témoignages de patients',
    body: 'Pour certains projets, nous choisissons de ne conserver que la voix des témoins, sans les questions du journaliste. Ce format « voix nue » repose sur une technique d\'interview précise et un travail de construction du récit au montage.',
  },
  {
    title: 'Interviews de professionnels de santé',
    body: 'Médecins, soignants, chercheurs, associations : des conversations préparées pour partager une expertise sans perdre l\'auditeur dans le vocabulaire technique.',
  },
  {
    title: 'Documentaires immersifs',
    body: 'Dans un établissement de soins, au cours d\'un atelier ou dans le quotidien d\'une personne : nous nous concentrons sur les moments de vie, les échanges et les ambiances qui permettent de comprendre une réalité de l\'intérieur.',
  },
  {
    title: 'Séries de sensibilisation et de prévention',
    body: 'Des regards croisés à travers plusieurs épisodes et une progression éditoriale. Pour éclairer un sujet de santé sous plusieurs angles.',
  },
]

export default async function PodcastsSantePage() {
  const projects = await client.fetch(HEALTH_PROJECTS_QUERY, {}, { next: { revalidate: 60 } })
  const orderedProjects = PROJECTS_ORDER
    .map(slug => projects.find(p => p.slug?.current === slug))
    .filter(Boolean)

  return (
    <main className="podcasts-sante-page">
      <RevealObserver />

      {/* ── HERO ── */}
      <section className="hero" aria-label="Introduction podcasts santé">
        <div className="hero-left">
          <h1 className="hero-title">
            Des sujets<br />
            qui demandent<br />
            <span>de la justesse</span>
          </h1>
        </div>
        <div className="hero-right">
          <p className="hero-story">
            Amener un patient à partager son vécu avec la maladie, être présent lors d&apos;une consultation médicale, expliquer un parcours de soins&nbsp;: <strong>produire un podcast santé demande une expérience particulière.</strong>
          </p>
          <p className="hero-body">
            Chez Sons &amp; Merveilles, nous concevons et produisons des podcasts pour l&apos;ensemble des acteurs de la santé&nbsp;: institutions, mutuelles, laboratoires pharmaceutiques, établissements de soins, associations…
          </p>
        </div>
        <div className="hero-bg-letter" aria-hidden="true">S</div>
      </section>

      {/* ── INTRO ── */}
      <section className="ps-intro reveal">
        <div className="ps-intro-inner">
          <p className="ps-intro-text">
            Au fil de nos productions, nous avons développé une connaissance des pathologies, des parcours de soins et des enjeux de l&apos;innovation en santé. Elle nous aide à comprendre les sujets, à préparer les échanges avec les professionnels et à poser les bonnes questions.
          </p>
        </div>
      </section>

      {/* ── SECTION 01 — Raconter la santé ── */}
      <section className="ps-section reveal" aria-labelledby="ps-s1-heading">
        <div className="ps-section-head">
          <h2 className="ps-section-title" id="ps-s1-heading">
            Raconter la santé,<br />c&apos;est trouver<br /><span>le bon équilibre</span>
          </h2>
        </div>
        <div className="ps-points">
          {POINTS.map((pt, i) => (
            <div key={i} className="ps-point reveal reveal-d1">
              <h3 className="ps-point-title">{pt.title}</h3>
              <p className="ps-point-body">{pt.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <div className="ps-photo-strip" role="img" aria-label="Tournage d'un podcast santé" />

      {/* ── SECTION 02 — Les formats ── */}
      <section className="ps-section ps-section--dark reveal" aria-labelledby="ps-s2-heading">
        <div className="ps-section-head">
          <h2 className="ps-section-title" id="ps-s2-heading">
            Chaque sujet<br /><span>appelle son format</span>
          </h2>
        </div>
        <div className="ps-formats">
          {FORMATS.map((fmt, i) => (
            <div key={i} className="ps-format-card reveal reveal-d1">
              <div className="ps-format-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="ps-format-title">{fmt.title}</h3>
              <p className="ps-format-body">{fmt.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 03 — Réalisations ── */}
      <section className="ps-section reveal" aria-labelledby="ps-s3-heading">
        <div className="ps-section-head">
          <h2 className="ps-section-title" id="ps-s3-heading">
            L&apos;expérience<br /><span>parle d&apos;elle-même</span>
          </h2>
          <p className="ps-section-intro">Quelques exemples de nos podcasts santé</p>
        </div>
        <div className="ps-projects">
          {orderedProjects.map((p) => {
            const extra = PROJECT_EXTRA[p.slug.current]
            return (
              <Link
                key={p._id}
                href={`/realisations/${p.slug.current}`}
                className="ps-project-card reveal reveal-d1"
                style={extra?.bg ? { background: extra.bg } : undefined}
              >
                {p.cardImage && (
                  <div className="ps-project-thumb">
                    <img
                      src={urlFor(p.cardImage).width(400).height(400).url()}
                      alt={extra?.angle ?? p.client}
                      className="ps-project-img"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="ps-project-content">
                  <div className="ps-project-client">{p.client}</div>
                  {extra && <div className="ps-project-angle">{extra.angle}</div>}
                  {extra && <p className="ps-project-desc">{extra.description}</p>}
                  <div className="ps-project-cta">
                    {extra ? extra.cta : 'Découvrir le projet'}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="ps-section-footer">
          <Link href="/realisations" className="btn-outline">
            Découvrir nos autres réalisations
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="visio reveal" id="contact" aria-labelledby="ps-contact-heading">
        <div className="visio-left">
          <div className="visio-tag">Parlons de votre projet</div>
          <h2 className="visio-title" id="ps-contact-heading">
            Votre sujet<br />mérite <span>d&apos;être entendu</span>
          </h2>
          <p className="visio-body">
            Vous souhaitez faire entendre des témoignages de patients, donner la parole à des professionnels de santé ou raconter un engagement de terrain&nbsp;?<br /><br />
            <strong>Parlons du sujet, du public et de la meilleure manière de le traiter.</strong>
          </p>
        </div>
        <ContactForm origin="Podcasts santé" formClass="visio-form" slim />
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
        <div className="footer-copy">© 2025 Sons &amp; Merveilles · Agence Podcast de Marque</div>
      </footer>
    </main>
  )
}
