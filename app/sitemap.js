import { client } from '@/sanity/lib/client'

const BASE = 'https://sonsetmerveilles.fr'

const STATIC_ROUTES = [
  { url: BASE, priority: 1.0, changeFrequency: 'monthly' },
  { url: `${BASE}/realisations`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${BASE}/pourquoi-le-podcast`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE}/equipe`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE}/mentions-legales`, priority: 0.3, changeFrequency: 'yearly' },
]

export default async function sitemap() {
  const slugs = await client.fetch(
    `*[_type == "realisation" && hasProjectPage == true]{ "slug": slug.current, _updatedAt }`,
    {},
    { next: { revalidate: 3600 } },
  )

  const dynamicRoutes = slugs.map(({ slug, _updatedAt }) => ({
    url: `${BASE}/realisations/${slug}`,
    lastModified: _updatedAt,
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  return [...STATIC_ROUTES, ...dynamicRoutes]
}
