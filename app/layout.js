import { Bebas_Neue, Playfair_Display, DM_Sans, Oswald } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import CustomCursor from '@/components/CustomCursor'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const oswald = Oswald({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

export const metadata = {
  title: 'Sons & Merveilles — Agence podcast de marque',
  description: 'Sons & Merveilles crée des podcasts de marque qui captivent, engagent et durent.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${bebasNeue.variable} ${playfairDisplay.variable} ${dmSans.variable} ${oswald.variable}`}>
      <body>
        <CustomCursor />
        <Nav />
        {children}
      </body>
    </html>
  )
}
