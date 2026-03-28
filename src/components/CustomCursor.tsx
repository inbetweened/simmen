'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

type CursorLabel = 'VIEW' | 'OPEN' | 'PLAY' | 'CLOSE' | null

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState<CursorLabel>(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Dot — snappy
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 45, mass: 0.1 })
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 45, mass: 0.1 })

  // Label — slight lag
  const labelX = useSpring(mouseX, { stiffness: 400, damping: 35, mass: 0.2 })
  const labelY = useSpring(mouseY, { stiffness: 400, damping: 35, mass: 0.2 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const getLabel = (el: HTMLElement): CursorLabel => {
      const interactive = el.closest('a, button, [role="button"]')
      if (!interactive) return null

      const override = (interactive as HTMLElement).dataset.cursor
      if (override !== undefined) return (override as CursorLabel) || null

      const tag = interactive.tagName.toLowerCase()
      const ariaLabel = (interactive as HTMLElement).getAttribute('aria-label') ?? ''

      if (/close|dismiss/i.test(ariaLabel)) return 'CLOSE'
      if (/play|pause/i.test(ariaLabel)) return 'PLAY'
      if (tag === 'a') return 'OPEN'
      if (tag === 'button') return 'VIEW'

      return null
    }

    const onOver = (e: MouseEvent) => setLabel(getLabel(e.target as HTMLElement))
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (!related?.closest('a, button, [role="button"]')) setLabel(null)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [mouseX, mouseY, visible])

  return (
    <>
      {/* Dot — isolated so mix-blend-mode works across all backgrounds */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white w-3 h-3"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />

      {/* Label pill */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: labelX, y: labelY, translateX: '10px', translateY: '-10px' }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <AnimatePresence>
          {label && (
            <motion.div
              key={label}
              className="bg-fg rounded-full px-3 py-1.5 whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8, x: -4 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -4 }}
              transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-bg font-semibold select-none">
                {label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
