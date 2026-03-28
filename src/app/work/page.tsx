'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SiteNav from '@/components/SiteNav'
import Footer from '@/components/Footer'
import ProjectModal from '@/components/ProjectModal'
import { projects, type Project } from '@/lib/data'

// ─── Torn edge SVG divider ────────────────────────────────────────────────────
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

// ─── Work page ────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <main>
      <SiteNav />

      {/* ── White editorial header ────────────────────────────────────────── */}
      <section
        className="pt-[76px] bg-[#f0ede8] relative overflow-hidden"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent, transparent 47px, rgba(0,0,0,0.18) 47px, rgba(0,0,0,0.18) 49px)',
        }}
      >
        {/* Large accent watermark */}
        <span
          className="absolute bottom-4 right-6 md:right-12 font-accent text-[88px] md:text-[128px] lg:text-[160px] text-black/[0.07] leading-none select-none pointer-events-none"
          style={{ transform: 'rotate(-0.6deg)', opacity: 0.9 }}
          aria-hidden="true"
        >
          work.
        </span>

        <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 pt-16 md:pt-20 pb-20 md:pb-28 relative">
          {/* Term + annotation */}
          <motion.div
            className="flex items-baseline gap-4 md:gap-6 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-black leading-none">
              REFRAME
            </h1>
            <div className="flex flex-col">
              <span className="font-ui font-bold text-[11px] md:text-[13px] text-black/40 tracking-wide">[v]</span>
              <span className="font-ui font-bold text-[11px] md:text-[13px] text-black/40 tracking-wide">/riː·freɪm/</span>
            </div>
          </motion.div>

          {/* Definition */}
          <motion.div
            className="flex flex-col gap-1 md:gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <p className="font-display font-extrabold text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight text-black leading-tight">
              SELECTED WORK&nbsp;<span className="text-accent-pink">· PROJECTS</span>
            </p>
            <p className="font-display font-extrabold text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight text-black leading-tight">
              CRAFTED WITH PURPOSE AND PRECISION.
            </p>
          </motion.div>

          {/* Sub label */}
          <motion.div
            className="flex items-baseline gap-6 mt-6 md:mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="font-display font-bold text-base md:text-xl uppercase tracking-widest text-black/40">
              SIMMEN.CO&nbsp;&nbsp;&nbsp;
              <span className="text-accent-pink">{projects.length}&nbsp;PROJECTS</span>
            </p>
            <span className="font-accent text-3xl md:text-4xl text-accent-blue select-none" style={{ transform: 'rotate(0.9deg)', display: 'inline-block', opacity: 0.93 }} aria-hidden="true">
              play.
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Torn edge ─────────────────────────────────────────────────────── */}
      <div className="bg-[#f0ede8]">
        <TornEdge />
      </div>

      {/* ── Dark project grid ─────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] pb-24 md:pb-32">
        <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24">
          <motion.p
            className="font-display font-extrabold text-xs md:text-sm uppercase tracking-[0.3em] text-fg/30 pt-16 pb-10 md:pt-20 md:pb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Selected Work
          </motion.p>

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

      <Footer />

      {/* ── Project modal ─────────────────────────────────────────────────── */}
      <ProjectModal
        projects={projects}
        currentIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={(i) => setActiveIndex(i)}
      />
    </main>
  )
}
