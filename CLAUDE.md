# Sons & Merveilles

Podcast brand agency website. Next.js 16 + Sanity v4.

## Stack
- Framework: Next.js 16 (App Router, JS not TS)
- CMS: Sanity v4 — projectId: `0p7hme9w`, dataset: `production`
- Styling: Global CSS only (`app/globals.css`) — no CSS modules, no Tailwind
- Fonts: Bebas Neue, Playfair Display, DM Sans (Google Fonts via next/font)
- Deploy: Vercel (auto-deploy on push) → sons-et-merveilles.vercel.app
- Repo: nicparodi-byte/sons-et-merveilles

## Project structure
```
app/
  layout.js               # Nav + CustomCursor in root layout
  page.js                 # Homepage ✅
  globals.css             # All styles (tokens, components, pages)
  realisations/
    page.js               # Réalisations grid ✅
    [slug]/page.js        # Project detail page ⬜
  equipe/page.js          # Équipe page ✅
  pourquoi-le-podcast/
    page.js               # Static content page ⬜
  studio/[[...tool]]/     # Sanity Studio

components/
  Nav.js                  # Sticky nav, hides on /studio
  CustomCursor.js         # Yellow dot + ring cursor
  RevealObserver.js       # IntersectionObserver for .reveal → .visible
  FaqSection.js           # FAQ accordion (client)
  RealisationsGrid.js     # Filter bar + masonry grid + modal (client)

sanity/
  schemaTypes/
    realisation.js        # title, client, slug, sector, format, year,
                          # cardImage, cardVideo, cardDescription,
                          # modalDescription, audioEmbed, videoEmbed,
                          # stat1Value/Label, stat2Value/Label, hasProjectPage
    teamMember.js         # name, role, photo, bio (blocks), quote,
                          # linkedIn, order
  lib/client.js           # createClient (useCdn: true)
  lib/image.js            # urlFor() helper

_design-reference/        # HTML mockups for each page
  sonsetmerveilles-homepage-seo-v2.html
  sonsetmerveilles-portfolio.html
  sonsetmerveilles-equipe.html
  sonsetmerveilles-pourquoi.html
  sonsetmerveilles-projet.html
  sonsetmerveilles-modal.html
```

## Design system (CSS tokens)
- `--yellow: #F5C518` · `--red: #E8273A` · `--black: #0A0A0A`
- `--white: #F7F4EE` · `--gray: #1A1A1A` · `--mid: #242424`
- Bebas Neue → headings | Playfair Display → italic accents | DM Sans → body

## Pages status
| Page | Status | Notes |
|------|--------|-------|
| `/` | ✅ Built | Hero, ticker, about, formats, sectors, process, FAQ, contact, footer |
| `/realisations` | ✅ Built | Masonry grid from Sanity, filter bar, modal for cards without project page |
| `/realisations/[slug]` | ⬜ Todo | Dynamic page from Sanity `realisation` doc |
| `/equipe` | ✅ Built | First teamMember (order=1) → founder section; rest → team grid |
| `/pourquoi-le-podcast` | ⬜ Todo | Static content page |
| `/studio` | ✅ | Sanity Studio |

## Key patterns
- Pages are **server components** that fetch from Sanity; interactive parts are extracted into `'use client'` components
- Sanity fetch pattern: `client.fetch(QUERY, {}, { next: { revalidate: 60 } })`
- Image helper: `urlFor(source).width(n).url()`
- Reveal animation: add `className="reveal"` → RevealObserver adds `visible` class on scroll
- `cursor: none` on all interactive elements (custom cursor handles it)
- All pages include a shared footer with the same 4 nav links

## What still needs building
1. `/realisations/[slug]` — dynamic project page (ref: `sonsetmerveilles-projet.html`)
2. `/pourquoi-le-podcast` — static page (ref: `sonsetmerveilles-pourquoi.html`)
3. Enter real content in Sanity Studio (réalisations + team members)
