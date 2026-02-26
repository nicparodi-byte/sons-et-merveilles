export default function ProjetPage({ params }) {
  return (
    <main>
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '4rem', color: 'var(--yellow)', letterSpacing: '.1em' }}>
          Projet : {params.slug}
        </p>
      </section>
    </main>
  )
}
