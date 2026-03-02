import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  const { name, email, message, origin } = await request.json()

  const { error } = await resend.emails.send({
    from: 'Sons & Merveilles <contact@sonsetmerveilles.com>',
    to: 'info@sonsetmerveilles.com',
    subject: `Nouveau message — ${origin}`,
    text: `Nom : ${name}\nEmail : ${email}\nPage d'origine : ${origin}\n\nMessage :\n${message}`,
  })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
