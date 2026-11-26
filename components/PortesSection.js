// Section « Un sujet. Plusieurs portes d'entrée. »
// Schéma en texte HTML (indexable) relié par des lignes courbes en SVG (décoratives, aria-hidden).
// Les lignes se tracent au défilement (classe .visible posée par RevealObserver).

const FORMATS = [
  { name: 'Podcasts', items: ['Interviews et témoignages', 'Documentaires'] },
  { name: 'Vidéo', items: ['Portraits', 'Coulisses'] },
  { name: 'Rencontres', items: ['Tables rondes', 'Conversations'] },
]

const AMPLIFY = [
  { name: 'Déclinaisons éditoriales', text: 'Extraits audio et vidéo, capsules, verbatims' },
  { name: 'Canaux de diffusion', text: 'Plateformes, réseaux sociaux, sites web, médias' },
]

// viewBox de 1200 de large : formats centrés à 200 / 600 / 1000, déclinaisons à 300 / 900.
const LINES = {
  branch: {
    h: 100,
    paths: ['M600 0 C600 55 200 35 200 100', 'M600 0 V100', 'M600 0 C600 55 1000 35 1000 100'],
  },
  cross: {
    h: 160,
    paths: [200, 600, 1000].flatMap((x1) =>
      [300, 900].map((x2) => `M${x1} 0 C${x1} 90 ${x2} 70 ${x2} 160`),
    ),
  },
  merge: {
    h: 120,
    paths: ['M300 0 C300 75 600 45 600 120', 'M900 0 C900 75 600 45 600 120'],
  },
}

function Lines({ variant }) {
  const { h, paths } = LINES[variant]
  return (
    <svg className={`portes-lines portes-lines--${variant}`} viewBox={`0 0 1200 ${h}`}
      preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {paths.map((d) => (
        <path key={d} d={d} pathLength="1" vectorEffect="non-scaling-stroke" />
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
          Les publics et la façon de les atteindre doivent être pensés dès la conception éditoriale.
          À partir d&apos;un même sujet, nous imaginons des formats et des dispositifs de diffusion
          complémentaires pour multiplier les points de contact, toucher de nouvelles audiences et
          amplifier la portée du récit.
        </p>
      </div>

      <div className="portes-diagram">
        <p className="portes-idea portes-step" style={{ '--s': 0 }}>Une idée éditoriale.</p>

        <Lines variant="branch" />

        <ul className="portes-row portes-row--3" aria-label="Les formats">
          {FORMATS.map((f) => (
            <li key={f.name} className="portes-step" style={{ '--s': 1 }}>
              <h3 className="portes-name">{f.name}</h3>
              <p className="portes-sub">
                {f.items.map((it, i) => (
                  <span key={it}>{i > 0 && <br />}{it}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <Lines variant="cross" />

        <ul className="portes-row portes-row--2" aria-label="Les dispositifs de diffusion">
          {AMPLIFY.map((a) => (
            <li key={a.name} className="portes-step" style={{ '--s': 2 }}>
              <h3 className="portes-name portes-name--accent">{a.name}</h3>
              <p className="portes-sub">{a.text}</p>
            </li>
          ))}
        </ul>

        <Lines variant="merge" />

        <div className="portes-end portes-step" style={{ '--s': 3 }}>
          <h3 className="portes-publics">Les publics.</h3>
          <p className="portes-tagline">Amplifier la portée du récit.</p>
        </div>
      </div>
    </section>
  )
}
