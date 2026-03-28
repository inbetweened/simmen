'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig, socialLinks, type SocialIconName } from '@/lib/data'
import { useLang } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

// ─── Social Icon SVGs ─────────────────────────────────────────────────────────
function SocialIcon({ name }: { name: SocialIconName }) {
  const icons: Record<SocialIconName, React.ReactNode> = {
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
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0a0a" />
      </svg>
    ),
  }

  return <span className="w-[18px] h-[18px] block">{icons[name]}</span>
}

// ─── Hamburger Icon ───────────────────────────────────────────────────────────
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative w-5 h-3.5 flex flex-col justify-between" aria-hidden="true">
      <motion.span
        className="block w-full h-px bg-current origin-center"
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.span
        className="block w-full h-px bg-current"
        animate={isOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block w-full h-px bg-current origin-center"
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
    </span>
  )
}

// ─── Language Toggle ──────────────────────────────────────────────────────────
function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center gap-1 font-ui text-[11px] tracking-[0.18em] uppercase">
      <button
        onClick={() => setLang('de')}
        className={`transition-colors duration-200 ${lang === 'de' ? 'text-fg' : 'text-fg/30 hover:text-fg/60'}`}
        aria-label="Deutsch"
        aria-pressed={lang === 'de'}
      >
        DE
      </button>
      <span className="text-fg/20 select-none">/</span>
      <button
        onClick={() => setLang('en')}
        className={`transition-colors duration-200 ${lang === 'en' ? 'text-fg' : 'text-fg/30 hover:text-fg/60'}`}
        aria-label="English"
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────
interface HeaderProps {
  isMenuOpen: boolean
  onMenuToggle: () => void
}

export default function Header({ isMenuOpen, onMenuToggle }: HeaderProps) {
  const { lang } = useLang()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-12 h-[76px] bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/[0.06]"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
    >
      {/* ── Left: Menu toggle ─────────────────────────────────────────── */}
      <button
        onClick={onMenuToggle}
        className="flex items-center gap-3 text-fg/70 hover:text-accent-blue transition-colors duration-300 group"
        aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isMenuOpen}
        aria-controls="nav-overlay"
      >
        <HamburgerIcon isOpen={isMenuOpen} />
        <span className="font-ui text-[12px] tracking-[0.25em] uppercase">
          {t.menu[lang]}
        </span>
      </button>

      {/* ── Center: Wordmark ─────────────────────────────────────────── */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/" className="font-display font-bold text-sm md:text-base tracking-[0.15em] uppercase text-fg hover:text-accent-blue transition-colors duration-300">
          {siteConfig.wordmark}
        </Link>
      </div>

      {/* ── Right: Social icons + language toggle ─────────────────────── */}
      <div className="flex items-center gap-4 lg:gap-5">
        <nav
          className="hidden md:flex items-center gap-4 lg:gap-5"
          aria-label="Social links"
        >
          {socialLinks.map(({ label, icon, href }) => (
            <a
              key={icon}
              href={href}
              aria-label={label}
              className="text-fg/40 hover:text-accent-blue transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon name={icon} />
            </a>
          ))}
        </nav>

        {/* Divider — only shown on desktop next to social icons */}
        <span className="hidden md:block w-px h-4 bg-white/10" aria-hidden="true" />

        <LangToggle />
      </div>
    </motion.header>
  )
}
