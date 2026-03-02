'use client'

import { useState } from 'react'

const WHY_ITEMS = [
  {
    num: '01',
    text: 'Communiquer votre vision',
    expand: "Un podcast de marque est l'espace idéal pour exprimer ce en quoi vous croyez, au-delà du produit ou du service. Votre dirigeant, vos experts, vos équipes : autant de voix qui donnent corps à votre projet d'entreprise.",
  },
  {
    num: '02',
    text: 'Porter vos valeurs',
    expand: "RSE, inclusion, innovation responsable : le format audio permet d'incarner vos engagements sans les survendre. Une conversation sincère vaut mieux qu'un discours institutionnel.",
  },
  {
    num: '03',
    text: 'Faire connaître vos engagements',
    expand: "Une campagne de sensibilisation prend une autre dimension quand elle donne la parole à ceux qui la vivent de l'intérieur. Patients, collaborateurs, partenaires : leurs voix font plus que n'importe quel communiqué.",
  },
  {
    num: '04',
    text: 'Attirer des talents',
    expand: "Un podcast de marque employeur donne à entendre ce que c'est que de travailler chez vous. Concret, humain, sans filtre RH : il attire les bons profils avant même le premier entretien.",
  },
  {
    num: '05',
    text: 'Partager votre expertise',
    expand: "Vos équipes savent des choses que vos clients veulent entendre. Un podcast de thought leadership installe votre marque comme référence dans son secteur, épisode après épisode.",
  },
  {
    num: '06',
    text: 'Créer du lien avec votre communauté',
    expand: "Le trajet, la cuisine, la salle de sport : des moments que la marque n'atteint pas autrement. Le podcast s'y glisse naturellement, créant une proximité que les autres formats ne peuvent pas offrir.",
  },
  {
    num: '07',
    text: 'Donner confiance',
    expand: "La voix ne triche pas. Quand un expert parle avec conviction, quand un patient raconte sa réalité, l'auditeur le sent. Le podcast humanise votre marque et renforce sa crédibilité de façon durable.",
  },
  {
    num: '08',
    text: 'Susciter la curiosité',
    expand: "Un bon podcast donne envie d'en savoir plus : sur votre produit, votre métier, vos gens. C'est un outil d'éveil à votre univers, qui transforme un inconnu en prospect curieux et un prospect curieux en client fidèle.",
  },
]

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 9h12M11 5l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function PourquoiAccordion() {
  const [open, setOpen] = useState(null)

  return (
    <div className="why-list">
      {WHY_ITEMS.map((item, i) => (
        <div
          key={i}
          className={`why-item${open === i ? ' open' : ''}`}
          onClick={() => setOpen(open === i ? null : i)}
          role="button"
          aria-expanded={open === i}
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(open === i ? null : i)}
        >
          <span className="why-num">{item.num}</span>
          <span className="why-text">{item.text}</span>
          <span className="why-arrow"><ArrowIcon /></span>
          <div className="why-expand">{item.expand}</div>
        </div>
      ))}
    </div>
  )
}
