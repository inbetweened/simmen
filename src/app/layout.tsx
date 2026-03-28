import type { Metadata } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import ScrollIndicator from '@/components/ScrollIndicator'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

// ─── Display Font ─────────────────────────────────────────────────────────────
// Bold condensed — inspired by Neue Machina Inktrap, editorial/industrial feel.
// To swap: replace with any next/font/google or next/font/local import and
// keep the `variable: '--font-display'` option. Zero component changes needed.
// ─────────────────────────────────────────────────────────────────────────────
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

// ─── UI / Body Font ───────────────────────────────────────────────────────────
// Clean modern sans-serif for utility text, labels, and supporting copy.
// Swap: same approach — replace import, keep `variable: '--font-ui'`.
// ─────────────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
})

// ─── Accent Font (Skribblugh) is loaded via @font-face in globals.css ─────────

export const metadata: Metadata = {
  title: 'Daniel Simmen — simmen.co',
  description: 'Motion design and creative development portfolio.',
  metadataBase: new URL('https://simmen.co'),
  icons: {
    icon: '/icons/favicon.svg',
    shortcut: '/icons/favicon.svg',
  },
  openGraph: {
    title: 'Daniel Simmen',
    description: 'Motion design and creative development portfolio.',
    url: 'https://simmen.co',
    siteName: 'simmen.co',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable}`}
    >
      <body>
        <LanguageProvider>
          <SmoothScroll />
          {children}
          <ScrollIndicator />
          <CustomCursor />
        </LanguageProvider>
      </body>
    </html>
  )
}
