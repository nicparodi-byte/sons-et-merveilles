'use client'

import { useState } from 'react'

const faqs = [
  {
    q: "Qu'est-ce qu'un podcast de marque ?",
    a: "Un podcast de marque est un contenu audio produit par une entreprise ou une institution dans le cadre de sa stratégie de communication. Il sert notamment à faire connaître ses engagements et ses valeurs, à renforcer les liens d'une marque avec son audience, sans objectif publicitaire direct.",
  },
  {
    q: "Pourquoi utiliser un podcast dans sa stratégie de communication ?",
    a: "Le podcast est le seul média où l'auditeur vous accorde une attention active et choisie. Il permet d'atteindre une audience ciblée avec un niveau d'engagement que les autres formats n'atteignent pas. 76 % des auditeurs hebdomadaires estiment que c'est un bon moyen de communiquer pour une marque. Le podcast de marque renforce l'image, attire des talents, crée une affinité et fidélise une communauté sur la durée.",
  },
  {
    q: "Quel budget prévoir pour un podcast de marque ?",
    a: "Un podcast de marque se produit généralement entre 3 000 et 15 000 € selon le format, la durée et le nombre d'épisodes. Une chronique interne courte sera moins coûteuse qu'une série de témoignages immersifs multi-saisons. Chez Sons & Merveilles, chaque projet est devisé sur mesure après une première visio pour comprendre vos objectifs.",
  },
  {
    q: "Combien de temps faut-il pour produire un podcast de marque ?",
    a: "Comptez 4 à 6 semaines de la phase stratégique à la mise en ligne du premier épisode. La conception éditoriale prend 1 à 2 semaines, la production et le montage 2 à 3 semaines, puis la distribution est quasi-immédiate. Pour les séries récurrentes, le rythme de production s'accélère significativement dès la deuxième saison puisque la ligne éditoriale est déjà en place",
  },
  {
    q: "Quelles sont les étapes de réalisation d'un podcast de marque ?",
    a: "Trois étapes principales : d'abord la stratégie éditoriale (ligne éditoriale, format, positionnement, identité sonore), puis la production (enregistrement, montage, design sonore, musique), enfin la diffusion et la mesure d'impact (mise en ligne sur toutes les plateformes, suivi d'audience). Attention à ne pas oublier la promotion, une étape essentielle. Sons & Merveilles prend en charge l'intégralité du parcours, de l'idée à la publication et la promotion.",
  },
  {
    q: "Sur quelles plateformes diffusez-vous les podcasts ?",
    a: "Nous diffusons sur toutes les grandes plateformes : Spotify, Apple Podcasts, Deezer, Amazon Music et YouTube. Pour les podcasts internes (formation, communication interne, marque employeur), nous vous remettons les fichiers pour diffuser les épisodes sur intranet et plateformes LMS. Une seule production, tous les canaux couverts.",
  },
  {
    q: "Travaillez-vous avec des entreprises en dehors de Paris ?",
    a: "Nous produisons des podcasts de marque dans toute la France et à l'international. Les enregistrements se font en studio, sur site chez le client, ou à distance en session guidée. Notre équipe est répartie entre Paris, Toulouse et Lyon mais elle est mobile - nous avons produit des épisodes de Lille à Nice mais aussi à Londres et Dubaï.",
  },
  {
    q: "Quelle est la différence entre un podcast de marque et un podcast natif ?",
    a: "Un podcast natif est créé par un journaliste ou un créateur indépendant en son nom propre, pour une audience large. Un podcast de marque est produit par une entreprise pour une audience ciblée : clients, collaborateurs, partenaires ou prospects. L'objectif n'est pas l'audience maximale, mais l'impact maximal auprès des bonnes personnes.",
  },
  {
    q: "Le podcast de marque est-il adapté à la communication interne ?",
    a: "Oui, et c'est l'un de ses usages les plus efficaces. Le podcast interne (chronique, interview de dirigeants ou récit de projet) atteint les collaborateurs dans leurs moments de disponibilité réelle : transports, pauses, déplacements. Il renforce la culture d'entreprise et le sentiment d'appartenance mieux que la plupart des newsletters internes.",
  },
  {
    q: "Comment mesurer l'impact d'un podcast de marque ?",
    a: "Les indicateurs clés sont le nombre d'écoutes, le taux de complétion par épisode et la croissance d'audience entre saisons. Au-delà des chiffres, l'impact se mesure aussi qualitativement : demandes entrantes, mentions presse, retours clients, candidatures reçues. Nous vous aidons à définir les bons KPIs avant même le lancement.",
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="faq reveal" id="faq" aria-labelledby="faq-heading">
      <p className="section-tag">Questions fréquentes</p>
      <h2 className="faq-title" id="faq-heading">
        Tout savoir sur le<br />
        <span>podcast de marque</span>
      </h2>
      <div className="faq-grid" role="list">
        {faqs.map((item, i) => (
          <div
            key={i}
            className={`faq-item${openIndex === i ? ' open' : ''}`}
            role="listitem"
          >
            <div className="faq-q">
              <h3 className="faq-question">{item.q}</h3>
              <button
                className="faq-icon"
                aria-label="Voir la réponse"
                onClick={() => toggle(i)}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <p className="faq-answer">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
