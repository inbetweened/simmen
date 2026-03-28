import type { Config } from 'tailwindcss'

// ─── Font families ────────────────────────────────────────────────────────────
// To swap fonts later, update the CSS variables in globals.css (@font-face /
// next/font) and these aliases will follow automatically.
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Bold condensed display — Barlow Condensed (swap via --font-display)
        display: ['var(--font-display)', 'sans-serif'],
        // Handwritten marker accent — Skribblugh (local OTF)
        accent: ['Skribblugh', 'cursive'],
        // Clean utility / body — Inter (swap via --font-ui)
        ui: ['var(--font-ui)', 'sans-serif'],
      },
      colors: {
        // Base — update in globals.css :root to change globally
        bg:       '#0a0a0a',
        fg:       '#f0ede8',
        muted:    '#6b6560',
        // Accent palette — prefixed to avoid conflict with Tailwind's built-in color scales
        'accent-pink':     'var(--color-pink)',
        'accent-blue':     'var(--color-blue)',
        'accent-taupe':    'var(--color-taupe)',
        'accent-lavender': 'var(--color-lavender)',
      },
      transitionTimingFunction: {
        // Premium cubic-bezier used for panel reveals
        'premium-in': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
}

export default config
