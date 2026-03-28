'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SiteNav from '@/components/SiteNav'
import Footer from '@/components/Footer'
import ProjectModal from '@/components/ProjectModal'
import { projects, threeDPieces, type Project, type ThreeDPiece } from '@/lib/data'
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
    <section id={id} className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24">
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


// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      className="group block text-left w-full cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: (index % 2) * 0.1 }}
    >
      {/* 16:9 image panel */}
      <div
        className="relative w-full overflow-hidden bg-[#141210]"
        style={{ aspectRatio: '16/9' }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e1c18] to-[#0d0b0a] flex items-end p-6 transition-all duration-500 group-hover:from-[#2a2520] group-hover:to-[#141210]">
            <span className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/15">
              {project.id} — Image placeholder
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent-pink/0 group-hover:bg-accent-pink/6 transition-colors duration-500" />

        {/* Handwritten hover label */}
        <div
          className="absolute bottom-3 left-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
          style={{ transform: 'rotate(-1.1deg)' }}
          aria-hidden="true"
        >
          <span className="font-accent text-3xl text-white/90 drop-shadow-sm">
            view.
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="pt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display font-extrabold text-xl md:text-2xl uppercase tracking-tight text-fg group-hover:text-accent-pink transition-colors duration-200">
            {project.title}
          </h3>
          <p className="font-ui text-[10px] tracking-[0.18em] uppercase text-fg/35 mt-1">
            {project.client}
          </p>
        </div>
        <span className="font-ui text-[10px] tracking-[0.18em] text-fg/25 mt-1 shrink-0">
          {project.year}
        </span>
      </div>
    </motion.button>
  )
}

// ─── 3D card ──────────────────────────────────────────────────────────────────
function ThreeDCard({ piece, index, onClick }: { piece: ThreeDPiece; index: number; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="group block text-left w-full cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: (index % 2) * 0.1 }}
    >
      {/* 16:9 image panel */}
      <div className="relative w-full overflow-hidden bg-[#141210]" style={{ aspectRatio: '16/9' }}>
        {piece.image ? (
          <Image src={piece.image} alt={piece.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e1c18] to-[#0d0b0a] flex items-end p-6">
            <span className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/15">
              {piece.id} — Render coming soon
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent-lavender/0 group-hover:bg-accent-lavender/6 transition-colors duration-500" />
        {/* Handwritten hover label */}
        <div
          className="absolute bottom-3 left-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
          style={{ transform: 'rotate(-1.1deg)' }}
          aria-hidden="true"
        >
          <span className="font-accent text-3xl text-white/90 drop-shadow-sm">explore.</span>
        </div>
      </div>

      {/* Caption */}
      <div className="pt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display font-extrabold text-xl md:text-2xl uppercase tracking-tight text-fg group-hover:text-accent-lavender transition-colors duration-200">
            {piece.title}
          </h3>
          <p className="font-ui text-[10px] tracking-[0.18em] uppercase text-fg/35 mt-1">
            {piece.software}
          </p>
        </div>
        <span className="font-ui text-[10px] tracking-[0.18em] text-fg/25 mt-1 shrink-0">
          {piece.year}
        </span>
      </div>
    </motion.button>
  )
}

// ─── Home (one-pager) ─────────────────────────────────────────────────────────
// Map ThreeDPiece → Project shape for ProjectModal reuse
const threeDAsProjects = threeDPieces.map((p) => ({
  id: p.id,
  title: p.title,
  client: p.software,
  type: '3D Exploration',
  year: p.year,
  image: p.image,
  video: p.video ?? '',
  description: p.description ?? '',
  tags: ['3D', 'Blender'],
  courseDisclaimer: p.courseDisclaimer,
}))

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [active3DIndex, setActive3DIndex] = useState<number | null>(null)
  const { lang } = useLang()

  return (
    <main>
      <SiteNav />

      {/* ── White editorial header ──────────────────────────────────────────── */}
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
          style={{ transform: 'rotate(1.1deg)', opacity: 0.9 }}
          aria-hidden="true"
        >
          daniel simmen.
        </span>

        <div className="py-20 md:py-28" />
      </header>

      {/* ── Torn edge ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#f0ede8]">
        <TornEdge />
      </div>

      {/* ── Dark sections ──────────────────────────────────────────────────────── */}
      <div className="bg-[#0a0a0a]">

        {/* 01 — Intro */}
        <Section id="intro" index="01">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-10 lg:gap-20 items-start">
            <Reveal delay={0.05} className="flex flex-col gap-2">
              <p
                className="font-accent text-5xl md:text-6xl text-accent-pink leading-none select-none"
                style={{ transform: 'rotate(-1.0deg)', display: 'inline-block', opacity: 0.93 }}
                aria-hidden="true"
              >
                {t.accentHello[lang]}
              </p>
              <span className="font-ui text-[10px] tracking-[0.28em] uppercase text-fg/20">{t.sectionIntro[lang]}</span>
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

        {/* 02 — Work */}
        <section id="work" className="border-t border-white/[0.07] pb-24 md:pb-32">
          <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24">

            {/* Section header */}
            <div className="flex items-end justify-between pt-20 md:pt-28 pb-10 md:pb-12">
              <Reveal className="flex items-center gap-4">
                <span className="font-ui text-[10px] tracking-[0.28em] uppercase text-fg/20">02</span>
                <span className="flex-1 h-px bg-white/[0.07]" aria-hidden="true" />
              </Reveal>
              <motion.div
                className="flex items-baseline gap-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-display font-extrabold text-xs md:text-sm uppercase tracking-[0.3em] text-fg/30">
                  {t.selectedWork[lang]}&nbsp;&nbsp;<span className="text-accent-pink">{projects.length} {t.projects[lang]}</span>
                </p>
                <span
                  className="font-accent text-3xl text-accent-blue select-none"
                  style={{ transform: 'rotate(0.9deg)', display: 'inline-block', opacity: 0.93 }}
                  aria-hidden="true"
                >
                  play.
                </span>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 03 — 3D */}
        <section id="3d" className="border-t border-white/[0.07] pb-24 md:pb-32">
          <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24">

            {/* Section header */}
            <div className="flex items-end justify-between pt-20 md:pt-28 pb-10 md:pb-12">
              <Reveal className="flex items-center gap-4">
                <span className="font-ui text-[10px] tracking-[0.28em] uppercase text-fg/20">03</span>
                <span className="flex-1 h-px bg-white/[0.07]" aria-hidden="true" />
              </Reveal>
              <motion.div
                className="flex items-baseline gap-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-display font-extrabold text-xs md:text-sm uppercase tracking-[0.3em] text-fg/30">
                  3D Explorations&nbsp;&nbsp;<span className="text-accent-lavender">{threeDPieces.length} Pieces</span>
                </p>
                <span
                  className="font-accent text-3xl text-accent-lavender select-none"
                  style={{ transform: 'rotate(-0.7deg)', display: 'inline-block', opacity: 0.93 }}
                  aria-hidden="true"
                >
                  explore.
                </span>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14">
              {threeDPieces.map((piece, i) => (
                <ThreeDCard key={piece.id} piece={piece} index={i} onClick={() => setActive3DIndex(i)} />
              ))}
            </div>
          </div>
        </section>

      </div>{/* end bg-[#0a0a0a] */}

      <Footer />

      {/* ── Project modal ───────────────────────────────────────────────────────── */}
      <ProjectModal
        projects={projects}
        currentIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={(i) => setActiveIndex(i)}
      />
      <ProjectModal
        projects={threeDAsProjects}
        currentIndex={active3DIndex}
        onClose={() => setActive3DIndex(null)}
        onNavigate={(i) => setActive3DIndex(i)}
      />
    </main>
  )
}
