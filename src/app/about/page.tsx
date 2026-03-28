'use client'

import { motion } from 'framer-motion'
import SiteNav from '@/components/SiteNav'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

// ─── Torn edge ────────────────────────────────────────────────────────────────
function TornEdge() {
  return (
    <div className="relative w-full overflow-hidden leading-[0]" aria-hidden="true">
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: '72px' }}
      >
        <path
          d="M0,72 L0,42 Q30,18 65,36 Q100,52 148,14 Q190,0 240,32 Q285,52 340,18 Q390,0 450,38 Q500,58 565,12 Q620,0 685,40 Q730,62 800,16 Q858,0 920,34 Q970,54 1040,12 Q1100,0 1160,36 Q1210,56 1275,14 Q1330,0 1390,30 L1440,38 L1440,72 Z"
          fill="#0a0a0a"
        />
      </svg>
    </div>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  id,
  index,
  children,
}: {
  id: string
  index: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="border-t border-white/[0.07] py-20 md:py-28"
    >
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24">
        {/* Index marker */}
        <Reveal className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-ui text-[10px] tracking-[0.28em] uppercase text-fg/20">
            {index}
          </span>
          <span className="flex-1 h-px bg-white/[0.07]" aria-hidden="true" />
        </Reveal>

        {children}
      </div>
    </section>
  )
}

// ─── Capabilities grid ────────────────────────────────────────────────────────
const capabilities = [
  {
    category: 'Design',
    items: ['Visual Design', 'UI Design', 'Layout & Branding'],
  },
  {
    category: 'Motion',
    items: ['Motion Design', 'Animation (After Effects)', 'Compositing (Fusion)', 'Storyboarding'],
  },
  {
    category: 'Development',
    items: ['HTML / CSS / JavaScript', 'Frontend basics (Next.js)', 'Interaction & animation'],
  },
  {
    category: '3D',
    items: ['Basic 3D (Blender)', 'Real-time workflows (Unreal Engine)'],
  },
  {
    category: 'Tools',
    items: [
      'After Effects',
      'DaVinci Resolve (Fusion)',
      'Premiere Pro',
      'Illustrator',
      'Photoshop',
      'Figma',
      'Blender',
      'Unreal Engine',
    ],
  },
]

// ─── About page ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { lang } = useLang()
  return (
    <main>
      <SiteNav />

      {/* ── White editorial header ─────────────────────────────────────────── */}
      <header
        className="pt-[76px] bg-[#f0ede8] relative overflow-hidden"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent, transparent 47px, rgba(0,0,0,0.18) 47px, rgba(0,0,0,0.18) 49px)',
        }}
      >
        {/* Large accent watermark */}
        <span
          className="absolute bottom-4 right-6 md:right-12 font-accent text-[88px] md:text-[128px] lg:text-[160px] text-black/[0.07] leading-none select-none pointer-events-none"
          style={{ transform: 'rotate(1.3deg)', opacity: 0.9 }}
          aria-hidden="true"
        >
          about.
        </span>

        <div className="py-20 md:py-28" />
      </header>

      {/* ── Torn edge ──────────────────────────────────────────────────────── */}
      <div className="bg-[#f0ede8]">
        <TornEdge />
      </div>

      {/* ── Dark content sections ──────────────────────────────────────────── */}
      <div className="bg-[#0a0a0a]">

        {/* ── 01 Intro ────────────────────────────────────────────────────── */}
        <Section id="intro" index="01">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-10 lg:gap-20 items-start">

            <Reveal delay={0.05} className="flex flex-col gap-2">
              <p className="font-accent text-5xl md:text-6xl text-accent-pink leading-none select-none" style={{ transform: 'rotate(-1.0deg)', display: 'inline-block', opacity: 0.93 }} aria-hidden="true">
                {t.accentHello[lang]}
              </p>
              <span className="font-ui text-[10px] tracking-[0.28em] uppercase text-fg/20">
                {t.sectionIntro[lang]}
              </span>
            </Reveal>

            <div className="space-y-6 md:space-y-8">
              <Reveal delay={0.1}>
                <p className="font-display font-bold text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight text-fg leading-[1.15]">
                  {t.introHeading[lang]}
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ── 02 Approach ─────────────────────────────────────────────────── */}
        <Section id="approach" index="02">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-10 lg:gap-20 items-start">

            <Reveal delay={0.05} className="flex flex-col gap-2">
              <p className="font-accent text-5xl md:text-6xl text-accent-blue leading-none select-none" style={{ transform: 'rotate(0.8deg)', display: 'inline-block', opacity: 0.93 }} aria-hidden="true">
                {t.accentMethod[lang]}
              </p>
              <span className="font-ui text-[10px] tracking-[0.28em] uppercase text-fg/20">
                {t.sectionApproach[lang]}
              </span>
            </Reveal>

            <div className="space-y-8 md:space-y-10">
              <Reveal delay={0.1}>
                <p className="font-display font-bold text-2xl md:text-3xl lg:text-[2rem] uppercase tracking-tight text-fg leading-[1.15]">
                  {t.approachHeading[lang]}
                </p>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={0.16}>
                  <p className="font-ui text-[15px] md:text-base text-fg/50 leading-relaxed max-w-[62ch]">
                    {t.approachBody1[lang]}
                  </p>
                </Reveal>
                <Reveal delay={0.22}>
                  <p className="font-ui text-[15px] md:text-base text-fg/50 leading-relaxed max-w-[62ch]">
                    {t.approachBody2[lang]}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 03 Background ───────────────────────────────────────────────── */}
        <Section id="background" index="03">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-10 lg:gap-20 items-start">

            <Reveal delay={0.05} className="flex flex-col gap-2">
              <p className="font-accent text-5xl md:text-6xl text-accent-lavender leading-none select-none" style={{ transform: 'rotate(-1.4deg)', display: 'inline-block', opacity: 0.92 }} aria-hidden="true">
                {t.accentContext[lang]}
              </p>
              <span className="font-ui text-[10px] tracking-[0.28em] uppercase text-fg/20">
                {t.sectionBackground[lang]}
              </span>
            </Reveal>

            <div className="space-y-5">
              <Reveal delay={0.1}>
                <p className="font-ui text-[15px] md:text-base text-fg/50 leading-relaxed max-w-[62ch]">
                  {t.backgroundBody1[lang]}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="font-ui text-[15px] md:text-base text-fg/50 leading-relaxed max-w-[62ch]">
                  {t.backgroundBody2[lang]}
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="font-ui text-[15px] md:text-base text-fg/50 leading-relaxed max-w-[62ch]">
                  {t.backgroundBody3[lang]}
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ── 04 Capabilities ─────────────────────────────────────────────── */}
        <Section id="capabilities" index="04">
          <Reveal delay={0.05} className="flex flex-col gap-2 mb-12 md:mb-16">
            <p className="font-accent text-5xl md:text-6xl text-accent-taupe leading-none select-none" style={{ transform: 'rotate(1.1deg)', display: 'inline-block', opacity: 0.93 }} aria-hidden="true">
              {t.accentSkills[lang]}
            </p>
            <span className="font-ui text-[10px] tracking-[0.28em] uppercase text-fg/20">
              {t.sectionCapabilities[lang]}
            </span>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
            {capabilities.map((group, i) => (
              <Reveal key={group.category} delay={0.05 + i * 0.07} className="flex flex-col gap-4">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-[0.18em] text-fg">
                  {group.category}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-ui text-[12px] md:text-[13px] text-fg/40 leading-snug"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

      </div>

      <Footer />
    </main>
  )
}
