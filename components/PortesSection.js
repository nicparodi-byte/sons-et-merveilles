// Section « Un sujet. Plusieurs portes d'entrée. »
// Schéma en HTML (texte indexable) + connecteurs SVG décoratifs (aria-hidden),
// révélés progressivement quand la section apparaît (classe .visible posée par RevealObserver).

const Icon = ({ children }) => (
  <svg className="portes-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const FORMATS = [
  {
    name: 'Podcasts',
    items: ['Interviews et témoignages', 'Documentaires'],
    icon: (
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    ),
  },
  {
    name: 'Vidéo',
    items: ['Portraits', 'Coulisses'],
    icon: (
      <>
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 10.5" />
      </>
    ),
  },
  {
    name: 'Rencontres',
    items: ['Tables rondes', 'Conversations'],
    icon: (
      <>
        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
      </>
    ),
  },
]

// Connecteur SVG. viewBox de 600 de large : les centres des 3 colonnes sont à 100, 300 et 500.
// Les segments « side » (vers les colonnes latérales) sont masqués sur mobile,
// où le schéma devient une seule colonne.
const CONNECTORS = {
  branch: [
    { d: 'M300 0 V30' }, { d: 'M300 30 H100', side: true }, { d: 'M300 30 H500', side: true },
    { d: 'M100 30 V60', side: true }, { d: 'M300 30 V60' }, { d: 'M500 30 V60', side: true },
  ],
  merge: [
    { d: 'M100 0 V30', side: true }, { d: 'M300 0 V30' }, { d: 'M500 0 V30', side: true },
    { d: 'M100 30 H300', side: true }, { d: 'M500 30 H300', side: true }, { d: 'M300 30 V60' },
  ],
  stem: [{ d: 'M300 0 V60' }],
}

function Connector({ variant }) {
  return (
    <svg className={`portes-connector portes-connector--${variant}`} viewBox="0 0 600 60"
      preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {CONNECTORS[variant].map(({ d, side }) => (
        <path key={d} d={d} vectorEffect="non-scaling-stroke" className={side ? 'portes-side' : undefined} />
      ))}
    </svg>
  )
}

export default function PortesSection() {
  return (
    <section className="portes reveal" id="portes" aria-labelledby="portes-heading">
      <div className="portes-head">
        <p className="portes-eyebrow">Nos savoir-faire</p>
        <h2 className="section-title" id="portes-heading">
          Un sujet. <em>Plusieurs portes d&apos;entrée.</em>
        </h2>
        <p className="portes-intro">
          À partir d&apos;un même sujet, nous imaginons des formats et des dispositifs de diffusion
          complémentaires pour multiplier les points de contact, toucher de nouvelles audiences et
          amplifier la portée du récit.
        </p>
      </div>

      <div className="portes-diagram">
        <div className="portes-node portes-node--key portes-step" style={{ '--s': 0 }}>
          <h3 className="portes-key">Une idée éditoriale</h3>
        </div>

        <Connector variant="branch" />

        <ul className="portes-formats" aria-label="Les formats">
          {FORMATS.map((f, i) => (
            <li key={f.name} className="portes-format portes-step" style={{ '--s': 1 + i * 0.15 }}>
              <div className="portes-node portes-card">
                <Icon>{f.icon}</Icon>
                <h3 className="portes-card-title">{f.name}</h3>
                <p className="portes-card-text">{f.items.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>

        <Connector variant="merge" />

        <div className="portes-node portes-amplify portes-step" style={{ '--s': 2 }}>
          <h3 className="portes-label">Amplifier la portée</h3>
          <div className="portes-amplify-grid">
            <div className="portes-amplify-item">
              <Icon>
                <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
              </Icon>
              <h4 className="portes-card-title">Déclinaisons éditoriales</h4>
              <p className="portes-card-text">Extraits audio et vidéo, capsules, verbatims</p>
            </div>
            <div className="portes-amplify-item">
              <Icon>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
              </Icon>
              <h4 className="portes-card-title">Canaux de diffusion</h4>
              <p className="portes-card-text">Plateformes, réseaux sociaux, sites web, médias</p>
            </div>
          </div>
        </div>

        <Connector variant="stem" />

        <div className="portes-node portes-node--key portes-step" style={{ '--s': 3 }}>
          <h3 className="portes-key">
            <Icon>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              <circle cx="9" cy="7" r="4" />
            </Icon>
            Les publics
          </h3>
        </div>
      </div>
    </section>
  )
}
