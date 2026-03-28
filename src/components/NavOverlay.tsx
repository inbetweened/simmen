'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems, siteConfig } from '@/lib/data'
import { useLang } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

const MotionLink = motion(Link)

// ─── Panel variants ────────────────────────────────────────────────────────────
const panelVariants = {
  closed: { x: '-100%', transition: { duration: 0.5,  ease: [0.76, 0, 0.24, 1] as const } },
  open:   { x: '0%',   transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const } },
}

const backdropVariants = {
  closed: { opacity: 0, transition: { duration: 0.35 } },
  open:   { opacity: 1, transition: { duration: 0.45, delay: 0.1 } },
}

const rowContainerVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
}

const rowVariants = {
  closed: { opacity: 0, y: 28 },
  open:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

// ─── Accent annotations ────────────────────────────────────────────────────────
const navAccents: Record<string, { word: string; color: string; hoverColor: string }> = {
  '01': { word: 'hello.', color: 'var(--color-pink)',     hoverColor: 'var(--color-pink)'     },
  '02': { word: 'craft.', color: 'var(--color-blue)',     hoverColor: 'var(--color-blue)'     },
  '03': { word: 'talk.',  color: 'var(--color-lavender)', hoverColor: 'var(--color-lavender)' },
}

// ─── Scribble annotation (accent word + arrow to heading) ────────────────────
function ScribbleAnnotation({ accent }: { accent: { word: string; color: string } }) {
  return (
    <>
      {/* Handwritten word */}
      <motion.span
        className="absolute font-accent text-4xl md:text-5xl leading-none pointer-events-none select-none"
        style={{ right: '140%', top: '10px', whiteSpace: 'nowrap', color: accent.color }}
        variants={{
          idle:    { opacity: 0, y: 4 },
          hovered: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
        }}
        aria-hidden="true"
      >
        {accent.word}
      </motion.span>

      {/* Arrow — spans from accent word all the way to the heading start */}
      <motion.svg
        viewBox="0 0 220 32"
        className="absolute pointer-events-none"
        style={{ width: 200, height: 28, right: '100%', top: '42%' }}
        aria-hidden="true"
        variants={{
          idle:    { opacity: 0 },
          hovered: { opacity: 1, transition: { delay: 0.18 } },
        }}
      >
        <motion.path
          d="M 4,24 C 60,20 130,10 214,6"
          stroke={accent.color}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          variants={{
            idle:    { pathLength: 0 },
            hovered: { pathLength: 1, transition: { duration: 0.38, delay: 0.2, ease: 'easeOut' } },
          }}
        />
        <motion.path
          d="M 214,6 L 202,2 M 214,6 L 206,14"
          stroke={accent.color}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          variants={{
            idle:    { pathLength: 0, opacity: 0 },
            hovered: { pathLength: 1, opacity: 1, transition: { duration: 0.18, delay: 0.56 } },
          }}
        />
      </motion.svg>
    </>
  )
}

// ─── NavOverlay ────────────────────────────────────────────────────────────────
interface NavOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
  const { lang } = useLang()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstFocusableRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="nav-overlay"
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          {/* ── Main panel — white ───────────────────────────────────────── */}
          <motion.div
            className="relative flex flex-col w-full md:w-[52%] lg:w-[44%] xl:w-[38%] h-full bg-[#f0ede8] overflow-y-auto"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-8 md:px-14 h-[76px] shrink-0 border-b border-black/30">
              <span className="font-ui text-[10px] tracking-[0.22em] uppercase text-black/30 select-none">
                {siteConfig.domain}
              </span>
              <button
                ref={firstFocusableRef}
                onClick={onClose}
                className="flex items-center gap-2.5 text-black/40 hover:text-black transition-colors duration-200"
                aria-label="Close navigation"
              >
                <span className="font-ui text-[10px] tracking-[0.22em] uppercase">
                  {t.close[lang]}
                </span>
                <span className="relative w-4 h-4 flex items-center justify-center" aria-hidden="true">
                  <span className="absolute w-3.5 h-px bg-current rotate-45" />
                  <span className="absolute w-3.5 h-px bg-current -rotate-45" />
                </span>
              </button>
            </div>

            {/* ── Nav rows ─────────────────────────────────────────────── */}
            <motion.nav
              className="flex-1 px-8 md:px-14 pt-2"
              variants={rowContainerVariants}
              initial="closed"
              animate="open"
              aria-label="Primary navigation"
            >
              {navItems.map((item) => {
                const accent = navAccents[item.id] as { word: string; color: string; hoverColor: string } | undefined
                return (
                  <motion.div
                    key={item.id}
                    variants={rowVariants}
                    className="border-b border-black/30 flex items-end justify-between gap-4 py-4 md:py-5"
                  >
                    {/* Large number */}
                    <span className="font-display font-extrabold text-[72px] md:text-[88px] lg:text-[100px] leading-none text-black/20 shrink-0 select-none">
                      {item.id}
                    </span>

                    {/* Heading — right-aligned, hover triggers annotation */}
                    <motion.div
                      className="relative"
                      initial="idle"
                      whileHover="hovered"
                    >
                      {/* Accent annotation — only on hover */}
                      {accent && <ScribbleAnnotation accent={accent} />}

                      {/* Main heading */}
                      {item.href.startsWith('/') ? (
                        <MotionLink
                          href={item.href}
                          onClick={onClose}
                          className="font-display font-extrabold text-[64px] md:text-[80px] lg:text-[92px] uppercase tracking-[-0.02em] text-black leading-none block transition-colors duration-200"
                          whileHover={{ x: -5, color: accent?.hoverColor ?? 'var(--color-pink)' }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                        >
                          {item.heading}
                        </MotionLink>
                      ) : (
                        <motion.a
                          href={item.href}
                          onClick={onClose}
                          className="font-display font-extrabold text-[64px] md:text-[80px] lg:text-[92px] uppercase tracking-[-0.02em] text-black leading-none block transition-colors duration-200"
                          whileHover={{ x: -5, color: accent?.hoverColor ?? 'var(--color-pink)' }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                        >
                          {item.heading}
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>
                )
              })}
            </motion.nav>

            {/* Panel footer */}
            <div className="px-8 md:px-14 py-6 shrink-0 border-t border-black/30 flex items-center justify-between">
              <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-black/25 select-none">
                {t.portfolioFooter[lang]}
              </p>
              <span
                className="font-accent text-2xl text-accent-taupe select-none"
                style={{ transform: 'rotate(-1.2deg)', display: 'inline-block', opacity: 0.92 }}
                aria-hidden="true"
              >
                explore.
              </span>
            </div>
          </motion.div>

          {/* ── Backdrop ─────────────────────────────────────────────────── */}
          <motion.div
            className="hidden md:block flex-1 cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }}
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            aria-label="Close navigation"
            tabIndex={-1}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
