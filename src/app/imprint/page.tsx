import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/data'

export const metadata: Metadata = {
  title: `Imprint — ${siteConfig.wordmark}`,
  description: 'Legal notice and imprint for simmen.co',
}

export default function ImprintPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-[76px]">
      {/* ── Header bar ─────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <Link
            href="/"
            className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/30 hover:text-fg/60 transition-colors duration-200 mb-8 inline-block"
          >
            ← Back
          </Link>
          <h1 className="font-display font-extrabold text-6xl md:text-8xl uppercase tracking-tight text-fg mt-4">
            Imprint
          </h1>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="max-w-2xl flex flex-col gap-12">

          {/* Legal notice */}
          <section>
            <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/30 mb-4">
              Legal Notice
            </p>
            <div className="font-ui text-sm text-fg/60 leading-relaxed flex flex-col gap-1">
                <p>Daniel Simmen</p>
              <p>Badhusweg 7</p>
              <p>6102 Malters, Luzern</p>
              <p>Switzerland</p>
              <p className="mt-3">
                <a
                  href="mailto:daniel@simmen.co"
                  className="text-fg/60 hover:text-fg transition-colors duration-200"
                >
                  daniel@simmen.co
                </a>
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section id="privacy">
            <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/30 mb-4">
              Privacy Policy
            </p>
            <div className="font-ui text-sm text-fg/60 leading-relaxed flex flex-col gap-3">
              <p>
                This website does not collect personal data. No cookies, no tracking,
                no analytics are used beyond what is strictly necessary to serve the page.
                I do not store or share any visitor information.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-fg/30 mb-4">
              Disclaimer
            </p>
            <p className="font-ui text-sm text-fg/60 leading-relaxed">
              Despite careful content control, I assume no liability for the content
              of external links. The operators of linked pages are solely responsible
              for their content.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
