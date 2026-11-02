'use client'

import { useState, useEffect, useRef } from 'react'

export default function ContactForm({ origin, formClass = 'contact-form', slim = false }) {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const loadedAt = useRef(Date.now())

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.target)

    // Honeypot check — bots fill this field, humans don't see it
    if (fd.get('_hp')) { setStatus('success'); return }
    // Time check — reject submissions faster than 4 seconds
    if (Date.now() - loadedAt.current < 4000) { setStatus('success'); return }

    const name = slim
      ? fd.get('nom')
      : `${fd.get('prenom')} ${fd.get('nom')}`.trim()

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: fd.get('email'),
          message: fd.get('message') || '',
          origin,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-feedback">
        <p>Merci pour votre message.</p>
        <p>Nous vous répondrons dans les plus brefs délais.</p>
      </div>
    )
  }

  return (
    <form className={formClass} aria-label="Formulaire de contact" onSubmit={handleSubmit}>
      {/* Honeypot — hidden from humans, filled by bots */}
      <div className="form-hp" aria-hidden="true">
        <input name="_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {slim ? (
        <>
          <div className="form-field">
            <label htmlFor="nom">Votre nom</label>
            <input id="nom" name="nom" type="text" placeholder="Jean Dupont" autoComplete="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Votre email</label>
            <input id="email" name="email" type="email" placeholder="jean@entreprise.fr" autoComplete="email" required />
          </div>
        </>
      ) : (
        <>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="prenom">Prénom</label>
              <input id="prenom" name="prenom" type="text" placeholder="Jean" autoComplete="given-name" required />
            </div>
            <div className="form-field">
              <label htmlFor="nom">Nom</label>
              <input id="nom" name="nom" type="text" placeholder="Dupont" autoComplete="family-name" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="jean@entreprise.fr" autoComplete="email" required />
            </div>
            <div className="form-field">
              <label htmlFor="tel">Téléphone</label>
              <input id="tel" name="tel" type="tel" placeholder="+33 6 00 00 00 00" autoComplete="tel" />
            </div>
          </div>
        </>
      )}

      <div className="form-field">
        <label htmlFor="message">
          {slim ? 'Un message si vous le souhaitez' : 'Votre projet'}
        </label>
        <textarea id="message" name="message" placeholder="Votre secteur, votre objectif, vos questions..." />
      </div>

      {status === 'error' && (
        <p className="form-error">
          Une erreur est survenue. Merci de réessayer ou d&apos;écrire directement à{' '}
          <a href="mailto:info@sonsetmerveilles.com">info@sonsetmerveilles.com</a>
        </p>
      )}

      <button className="btn-submit" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer'}
      </button>
    </form>
  )
}
