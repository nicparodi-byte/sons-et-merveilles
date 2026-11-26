// Section « 4 formats pour chaque objectif » (page Pourquoi un podcast ?)
export default function FormatsSection() {
  return (
    <section className="formats reveal" id="formats" aria-labelledby="formats-heading">
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
          <h3 className="format-name">Documentaires</h3>
          <p className="format-desc">Micro embarqué au cœur de l&apos;action. Nous retranscrivons l&apos;ambiance d&apos;un lieu, d&apos;un événement, d&apos;une réalité, pour une expérience sonore mémorable.</p>
        </article>
        <article className="format-card">
          <div className="format-num" aria-hidden="true">04</div>
          <h3 className="format-name">Chroniques</h3>
          <p className="format-desc">Format court (3 min) pour la formation, la marque employeur ou la communication interne. Des messages précis, mémorables, accessibles à tous et partout.</p>
        </article>
      </div>
    </section>
  )
}
