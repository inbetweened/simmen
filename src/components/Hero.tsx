'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <>
    <section
      className="relative h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden pt-[76px] pb-12 md:pb-16"
      aria-label="Hero"
    >
      {/* ── SVG clip-path definition ─────────────────────────────────────── */}
      {/*
        Rough film-frame shape: cubic-bezier corners (slightly uneven) +
        irregular L segments along each edge to simulate a worn photograph /
        old film-frame border. Coordinates are in objectBoundingBox (0–1).
        Tweak the edge L-point y/x offsets (the small decimals near 0 or 1)
        to increase or decrease roughness.
      */}
      <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden="true">
        <defs>
          <clipPath id="rough-frame" clipPathUnits="objectBoundingBox">
            {/*
              Asymmetric distress: each edge has its own irregular rhythm.
              Deviations are small (0.001–0.007) and non-uniform — some
              segments barely move, a few have a larger bite. No alternating
              pattern; each side feels independently worn.
            */}
            <path d="
              M 0.030,0.007
              C 0.011,0.005 0.003,0.016 0.004,0.034
              L 0.003,0.092
              L 0.006,0.178
              L 0.002,0.248
              L 0.005,0.350
              L 0.001,0.420
              L 0.006,0.530
              L 0.002,0.618
              L 0.007,0.695
              L 0.003,0.724
              C 0.004,0.972 0.017,0.984 0.034,0.982
              L 0.096,0.986
              L 0.192,0.981
              L 0.310,0.985
              L 0.388,0.980
              L 0.502,0.984
              L 0.614,0.979
              L 0.695,0.983
              L 0.798,0.979
              L 0.878,0.983
              C 0.982,0.982 0.996,0.967 0.996,0.951
              L 0.998,0.882
              L 0.994,0.802
              L 0.997,0.714
              L 0.993,0.610
              L 0.997,0.540
              L 0.994,0.442
              L 0.998,0.358
              L 0.995,0.264
              L 0.997,0.192
              L 0.994,0.152
              C 0.995,0.014 0.981,0.004 0.964,0.005
              L 0.896,0.002
              L 0.814,0.006
              L 0.720,0.001
              L 0.648,0.005
              L 0.538,0.001
              L 0.444,0.004
              L 0.326,0.000
              L 0.218,0.004
              L 0.122,0.001
              L 0.066,0.005
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      {/* ── Ambient radial glow ──────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 58%, rgba(255,255,255,0.025) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* ── Cinematic frame container ────────────────────────────────────── */}
      <motion.div
        className="relative w-[90vw] md:w-[86vw] lg:w-[82vw]"
        style={{ aspectRatio: '16/6.75', clipPath: 'url(#rough-frame)' }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.4,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.4,
        }}
      >
        {/* Placeholder background — visible when no video is present */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1c1916] via-[#141210] to-[#0d0b0a]"
          aria-hidden="true"
        />

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
          aria-hidden="true"
        />

        {/* Video — overlays the placeholder when the file is present */}
        {/* ── VIDEO ASSET: place your file at /public/video/hero.mp4 ─────── */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-[5]"
          muted
          loop
          playsInline
          aria-label="Portfolio showreel"
        >
          <source src="/video/Hero_Video.mp4" type="video/mp4" />
        </video>

        {/* Subtle vignette over the frame */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── PLAY overlay ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <motion.button
            onClick={togglePlay}
            className="group flex flex-col items-center gap-0 cursor-pointer"
            animate={isPlaying ? { scale: 1 } : { scale: [1, 1.035, 1] }}
            transition={isPlaying ? {} : {
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.06 }}
            aria-label={isPlaying ? 'Pause showreel' : 'Play showreel'}
          >
            <div className="relative w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full border border-white/35 flex items-center justify-center group-hover:border-accent-blue transition-colors duration-500">
              <span
                className="font-accent text-xl md:text-2xl text-white/90 group-hover:text-accent-blue transition-colors duration-300 select-none"
                style={{ lineHeight: 1 }}
              >
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* ── Accent annotation ───────────────────────────────────────────── */}
      <motion.span
        className="absolute bottom-8 left-8 md:left-12 font-accent text-3xl text-accent-lavender select-none pointer-events-none"
        style={{ rotate: '-0.8deg', opacity: 0.92 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.92, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1.2 }}
        aria-hidden="true"
      >
        Showreel
      </motion.span>

    </section>
    </>
  )
}
