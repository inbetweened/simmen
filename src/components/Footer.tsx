'use client'

import Link from 'next/link'
import { siteConfig, socialLinks, navItems } from '@/lib/data'
import { motion } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

// ─── Inline social icons (reused from Header) ─────────────────────────────────
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    linkedin: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4V9h4v1.5" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    x: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 5.978 5.45-5.978zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.27 6.27 0 00-6.27 6.27 6.27 6.27 0 006.27 6.27 6.27 6.27 0 006.27-6.27V8.77a8.2 8.2 0 004.83 1.55V6.88a4.85 4.85 0 01-1-.19z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0a0a" />
      </svg>
    ),
  }
  return <span className="w-[18px] h-[18px] block">{icons[name]}</span>
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const { lang } = useLang()

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
      {/* ── Main footer body ─────────────────────────────────────────────── */}
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* ── Col 1: Logo + social ───────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            {/* Logo placeholder */}
            <div>
              <span className="font-display font-extrabold text-2xl md:text-3xl uppercase tracking-[0.12em] text-fg">
                {siteConfig.wordmark}
              </span>
              <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-fg/30 mt-1">
                {siteConfig.domain}
              </p>
            </div>

            {/* Social icons */}
            <nav aria-label="Social links" className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
              {socialLinks.map(({ label, icon, href }) => (
                <a
                  key={icon}
                  href={href}
                  aria-label={label}
                  className="text-fg/35 hover:text-accent-blue transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon name={icon} />
                </a>
              ))}
              </div>
              <span className="font-accent text-4xl text-accent-pink select-none" style={{ transform: 'rotate(0.9deg)', display: 'inline-block', opacity: 0.93 }} aria-hidden="true">
                let's talk.
              </span>
            </nav>
          </div>

          {/* ── Col 2: Quick links ─────────────────────────────────────── */}
          <div>
            <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/25 mb-5">
              {t.quickLinks[lang]}
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    {item.href.startsWith('/') ? (
                      <Link
                        href={item.href}
                        className="font-display font-bold text-lg uppercase tracking-wide text-fg/60 hover:text-accent-pink transition-colors duration-200"
                      >
                        {item.heading}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="font-display font-bold text-lg uppercase tracking-wide text-fg/60 hover:text-accent-pink transition-colors duration-200"
                      >
                        {item.heading}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Col 3: Legal ──────────────────────────────────────────── */}
          <div>
            <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/25 mb-5">
              {t.legal[lang]}
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="/imprint"
                  className="font-ui text-[12px] tracking-[0.15em] uppercase text-fg/45 hover:text-fg transition-colors duration-200"
                >
                  {t.imprint[lang]}
                </a>
              </li>
              <li>
                <a
                  href="/imprint#privacy"
                  className="font-ui text-[12px] tracking-[0.15em] uppercase text-fg/45 hover:text-fg transition-colors duration-200"
                >
                  {t.privacyPolicy[lang]}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="font-ui text-[10px] tracking-[0.18em] uppercase text-fg/20">
            © {new Date().getFullYear()} {siteConfig.wordmark}. {t.allRightsReserved[lang]}
          </p>
          <p className="font-ui text-[10px] tracking-[0.18em] uppercase text-fg/20">
            {t.portfolioFooter[lang]}
          </p>
        </div>
      </div>
    </footer>
  )
}
