'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/lib/data'
import { useLang } from '@/context/LanguageContext'

interface ProjectModalProps {
  projects: Project[]
  currentIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.15 } },
}

const panelVariants = {
  hidden:   { opacity: 0, scale: 0.96 },
  visible:  { opacity: 1, scale: 1,    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:     { opacity: 0, scale: 0.96, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } },
}

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

// Parse bilingual disclaimer strings formatted as "de:...|en:..."
function parseDisclaimer(raw: string, lang: 'en' | 'de'): string {
  if (!raw.includes('|')) return raw
  const part = raw.split('|').find((s) => s.startsWith(`${lang}:`))
  return part ? part.slice(3) : raw
}

export default function ProjectModal({ projects, currentIndex, onClose, onNavigate }: ProjectModalProps) {
  const isOpen = currentIndex !== null
  const project = currentIndex !== null ? projects[currentIndex] : null
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const { lang } = useLang()

  // Reset video tab when project changes
  useEffect(() => {
    setActiveVideoIndex(0)
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [currentIndex])

  const videoList = project?.videos ?? (project?.video ? [{ label: 'Video', src: project.video }] : [])
  const activeVideoSrc = videoList[activeVideoIndex]?.src ?? ''

  // Convert youtu.be or youtube.com watch URLs to embed format
  function toEmbedUrl(url: string): string {
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
    const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
    if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`
    return url
  }
  const hasPrev = currentIndex !== null && currentIndex > 0
  const hasNext = currentIndex !== null && currentIndex < projects.length - 1

  // Esc + arrow key navigation + scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(currentIndex! - 1)
      if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex! + 1)
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, hasPrev, hasNext, currentIndex, onClose, onNavigate])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* ── Backdrop + centering wrapper ─────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          >
          {/* ── Panel ──────────────────────────────────────────────────── */}
          <motion.div
            className="relative w-full max-w-[1600px] h-[85vh]
                       bg-[#0d0d0d] rounded-2xl
                       overflow-hidden flex flex-col"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            {/* ── Top bar ─────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 md:px-10 py-4 shrink-0 border-b border-white/[0.06]">
              {/* Counter */}
              <span className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/25">
                {String(currentIndex! + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>

              {/* Prev / Next arrows */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => hasPrev && onNavigate(currentIndex! - 1)}
                  disabled={!hasPrev}
                  className="flex items-center gap-2 px-4 py-2 font-ui text-[10px] tracking-[0.22em] uppercase text-fg/40 hover:text-accent-blue disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200"
                  aria-label="Previous project"
                >
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <span className="w-px h-4 bg-white/10" aria-hidden="true" />

                <button
                  onClick={() => hasNext && onNavigate(currentIndex! + 1)}
                  disabled={!hasNext}
                  className="flex items-center gap-2 px-4 py-2 font-ui text-[10px] tracking-[0.22em] uppercase text-fg/40 hover:text-accent-blue disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200"
                  aria-label="Next project"
                >
                  <span className="hidden sm:inline">Next</span>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-fg/40 hover:text-accent-blue transition-colors duration-200"
                aria-label="Close project"
              >
                <span className="font-ui text-[10px] tracking-[0.22em] uppercase hidden sm:inline">Close</span>
                <span className="relative w-4 h-4 flex items-center justify-center" aria-hidden="true">
                  <span className="absolute w-3.5 h-px bg-current rotate-45" />
                  <span className="absolute w-3.5 h-px bg-current -rotate-45" />
                </span>
              </button>
            </div>

            {/* ── Scrollable body ─────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto">
              <motion.div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-0 h-full"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                {/* ── Left: video or image ─────────────────────────────── */}
                <motion.div
                  variants={itemVariants}
                  className="relative bg-[#0a0a0a] lg:h-full min-h-[240px] flex flex-col"
                >
                  {/* Video tabs — only shown when multiple videos */}
                  {videoList.length > 1 && (
                    <div className="shrink-0 flex gap-0 border-b border-white/[0.06] z-10">
                      {videoList.map((v, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveVideoIndex(i)
                            setTimeout(() => videoRef.current?.load(), 50)
                          }}
                          className={`px-5 py-3 font-ui text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 border-b-2 ${
                            i === activeVideoIndex
                              ? 'text-fg border-accent-blue'
                              : 'text-fg/30 border-transparent hover:text-fg/60'
                          }`}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Media */}
                  <div className="relative flex-1 flex items-center justify-center">
                    {project.youtubeUrl ? (
                      <iframe
                        key={project.youtubeUrl}
                        src={toEmbedUrl(project.youtubeUrl)}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={project.title}
                      />
                    ) : activeVideoSrc ? (
                      <video
                        ref={videoRef}
                        key={activeVideoSrc}
                        controls
                        controlsList="nodownload"
                        playsInline
                        className="absolute inset-0 w-full h-full object-contain"
                      >
                        <source src={activeVideoSrc} type="video/mp4" />
                      </video>
                    ) : project.image ? (
                      <div className="absolute inset-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-br from-[#1e1c18] to-[#0a0a0a]">
                        <span className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/15">
                          {project.id} — Coming soon
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* ── Right: details ──────────────────────────────────── */}
                <div className="flex flex-col px-8 md:px-10 py-10 gap-6 overflow-y-auto">
                  {/* Type + year */}
                  <motion.div variants={itemVariants} className="flex items-center gap-4">
                    <span className="font-ui text-[10px] tracking-[0.22em] uppercase text-accent-pink">
                      {project.type}
                    </span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/25">
                      {project.year}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    variants={itemVariants}
                    className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl uppercase tracking-tight text-fg leading-[0.9]"
                  >
                    {project.title}
                  </motion.h2>

                  {/* Client */}
                  <motion.div variants={itemVariants} className="border-t border-white/[0.06] pt-5">
                    <p className="font-ui text-[9px] tracking-[0.22em] uppercase text-fg/25 mb-1">Client</p>
                    <p className="font-ui text-sm text-fg/70">{project.client}</p>
                  </motion.div>

                  {/* Tags */}
                  {project.tags.length > 0 && (
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-ui text-[9px] tracking-[0.18em] uppercase text-fg/40 border border-white/[0.1] px-3 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  {/* Description */}
                  {project.description ? (
                    <motion.div variants={itemVariants} className="border-t border-white/[0.06] pt-5">
                      <p className="font-ui text-[9px] tracking-[0.22em] uppercase text-fg/25 mb-3">About</p>
                      <p className="font-ui text-sm text-fg/60 leading-relaxed">
                        {project.description}
                      </p>
                    </motion.div>
                  ) : null}

                  {/* Course disclaimer */}
                  {project.courseDisclaimer ? (
                    <motion.div
                      variants={itemVariants}
                      className="flex gap-3 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 mt-2"
                    >
                      <span className="text-fg/30 mt-[1px] shrink-0" aria-hidden="true">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1"/>
                          <path d="M6.5 5.5v4M6.5 3.5v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </span>
                      <p className="font-ui text-[11px] text-fg/35 leading-relaxed">
                        {parseDisclaimer(project.courseDisclaimer!, lang)}
                      </p>
                    </motion.div>
                  ) : null}
                </div>
              </motion.div>
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
