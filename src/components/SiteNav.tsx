'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import NavOverlay from '@/components/NavOverlay'

// Reusable wrapper — drop into any page to get the full header + nav overlay
export default function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Header
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
      />
      <NavOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  )
}
