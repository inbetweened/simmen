'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true)

  // Hide once user has scrolled past the first viewport
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < window.innerHeight * 0.35)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleClick() {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-40 flex flex-col items-center gap-3 group cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 1.4 }}
          aria-label="Scroll to next section"
        >
          {/* Vertical label */}
          <span
            className="font-ui text-[9px] tracking-[0.28em] uppercase text-fg/30 group-hover:text-fg/60 transition-colors duration-300"
            style={{ writingMode: 'vertical-rl', letterSpacing: '0.28em' }}
          >
            Scroll
          </span>

          {/* Animated arrow */}
          <motion.span
            className="flex flex-col items-center gap-[3px]"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Vertical line */}
            <span className="w-px h-6 bg-fg/25 group-hover:bg-fg/50 transition-colors duration-300" />
            {/* Arrow head */}
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              className="text-fg/25 group-hover:text-fg/50 transition-colors duration-300"
            >
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
