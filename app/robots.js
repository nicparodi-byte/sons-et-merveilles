export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/studio', '/api'] },
    ],
    sitemap: 'https://sonsetmerveilles.fr/sitemap.xml',
  }
}
