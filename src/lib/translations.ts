export type Lang = 'en' | 'de'

export const t = {
  // ── Header / Nav ──────────────────────────────────────────────────────────
  menu:             { en: 'Menu',                      de: 'Menü'                         },
  close:            { en: 'Close',                     de: 'Schließen'                    },
  portfolioFooter:  { en: 'Personal Portfolio — 2026', de: 'Persönliches Portfolio — 2026'},
  allRightsReserved:{ en: 'All rights reserved.',      de: 'Alle Rechte vorbehalten.'     },

  // ── Hero editorial ────────────────────────────────────────────────────────
  heroRows: {
    en: [
      {
        term: 'DANIEL SIMMEN',
        type: '[n]',
        phonetic: '/sɪ·mən/',
        definition: 'MOTION DESIGNER · SOMEONE WHO TURNS IDEAS INTO MOVING IMAGES',
      },
      {
        term: 'REFRAME',
        type: '[v]',
        phonetic: '/riː·freɪm/',
        definition: 'SELECTED WORK · PROJECTS CRAFTED WITH PURPOSE AND PRECISION',
      },
      {
        term: 'CONNECT',
        type: '[v]',
        phonetic: '/kə·nekt/',
        definition: "GET IN TOUCH · LET'S BUILD SOMETHING WORTH WATCHING",
      },
    ],
    de: [
      {
        term: 'DANIEL SIMMEN',
        type: '[n]',
        phonetic: '/sɪ·mən/',
        definition: 'MOTION DESIGNER · JEMAND DER IDEEN IN BEWEGENDE BILDER VERWANDELT',
      },
      {
        term: 'REFRAME',
        type: '[v]',
        phonetic: '/riː·freɪm/',
        definition: 'AUSGEWÄHLTE ARBEITEN · PROJEKTE MIT PRÄZISION UND ABSICHT UMGESETZT',
      },
      {
        term: 'VERBINDEN',
        type: '[v]',
        phonetic: '/fɛɐ·bɪn·dən/',
        definition: 'KONTAKT AUFNEHMEN · LASS UNS ETWAS SEHENSWERTES ERSCHAFFEN',
      },
    ],
  },

  // ── Hero row hrefs (same for both) ────────────────────────────────────────
  heroRowHrefs: ['#intro', '#work', 'mailto:daniel@simmen.co'],

  // ── Home / About header ───────────────────────────────────────────────────
  headerDef1: {
    en: 'MOTION DESIGNER\u00a0·\u00a0SOMEONE WHO',
    de: 'MOTION DESIGNER\u00a0·\u00a0JEMAND DER',
  },
  headerDef2: {
    en: 'TURNS IDEAS INTO MOVING IMAGES.',
    de: 'IDEEN IN BEWEGENDE BILDER VERWANDELT.',
  },
  headerSublabel: {
    en: 'SWITZERLAND',
    de: 'SWITZERLAND',
  },
  headerSublabelAccent: {
    en: 'BASED',
    de: 'BASED',
  },

  // ── Section labels ────────────────────────────────────────────────────────
  sectionIntro:        { en: 'Intro',        de: 'Intro'        },
  sectionApproach:     { en: 'Approach',     de: 'Ansatz'       },
  sectionBackground:   { en: 'Background',   de: 'Hintergrund'  },
  sectionCapabilities: { en: 'Capabilities', de: 'Fähigkeiten'  },

  // ── Accent / handwritten labels ───────────────────────────────────────────
  accentHello:   { en: 'Hello.',   de: 'Hallo.'   },
  accentMethod:  { en: 'Method.',  de: 'Methode.' },
  accentContext: { en: 'Context.', de: 'Kontext.' },
  accentSkills:  { en: 'Skills.',  de: 'Skills.'  },

  // ── Intro section ─────────────────────────────────────────────────────────
  introHeading: {
    en: 'Designer from Switzerland. I work in motion, visual design, and frontend.',
    de: 'Designer aus der Schweiz. Ich arbeite in Motion, Visual Design und Frontend.',
  },

  // ── Approach section ──────────────────────────────────────────────────────
  approachHeading: {
    en: "I don't separate design from motion.",
    de: 'Ich trenne Design nicht von Motion.',
  },
  approachBody1: {
    en: "I grew up between the technical and the visual — which means I can build what I design and design what I build. Motion is part of the process for me, not something added at the end.",
    de: 'Ich bin zwischen dem Technischen und dem Visuellen aufgewachsen — das heisst, ich kann bauen was ich gestalte und gestalten was ich baue. Motion ist für mich Teil des Prozesses, nichts das am Ende noch draufkommt.',
  },
  approachBody2: {
    en: "I'm drawn to work that has a point of view. Things that feel authored, not just assembled.",
    de: 'Ich arbeite lieber an Dingen, die eine Haltung haben. Etwas das sich bewusst anfühlt, nicht einfach zusammengebaut.',
  },

  // ── Background section ────────────────────────────────────────────────────
  backgroundBody1: {
    en: "I'm finishing my apprenticeship as a Mediamatiker EFZ at Messe Luzern AG. In practice that means working across IT, design, video production, and web — often in the same week.",
    de: 'Ich schliesse meine Lehre als Mediamatiker EFZ bei der Messe Luzern AG ab. In der Praxis bedeutet das: Arbeit in IT, Design, Videoproduktion und Web — oft alles in derselben Woche.',
  },
  backgroundBody2: {
    en: "Over the past few years I've built ticketing infrastructure, produced explainer videos, designed animations for live events, and shipped web projects. The range is intentional.",
    de: 'In den letzten Jahren habe ich Ticketing-Infrastruktur aufgebaut, Erklärvideos produziert, Animationen für Live-Events gestaltet und Webprojekte umgesetzt. Die Bandbreite ist gewollt.',
  },
  backgroundBody3: {
    en: "It's made me good at turning technical things into something people actually understand.",
    de: 'Das hat mich gut darin gemacht, technische Dinge in etwas zu übersetzen, das Menschen tatsächlich verstehen.',
  },

  // ── Work section ──────────────────────────────────────────────────────────
  selectedWork: { en: 'Selected Work', de: 'Ausgewählte Arbeiten' },
  projects:     { en: 'Projects',      de: 'Projekte'             },

  // ── Work page ─────────────────────────────────────────────────────────────
  workEditorialTerm:     { en: 'REFRAME',      de: 'REFRAME'                                      },
  workEditorialType:     { en: '[v]',           de: '[v]'                                          },
  workEditorialPhonetic: { en: '/riː·freɪm/',  de: '/riː·freɪm/'                                 },
  workEditorialDef: {
    en: 'SELECTED WORK · PROJECTS CRAFTED WITH PURPOSE AND PRECISION',
    de: 'AUSGEWÄHLTE ARBEITEN · PROJEKTE MIT PRÄZISION UND ABSICHT UMGESETZT',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  quickLinks:    { en: 'Quick Links',       de: 'Quicklinks'            },
  legal:         { en: 'Legal',             de: 'Rechtliches'           },
  imprint:       { en: 'Imprint',           de: 'Impressum'             },
  privacyPolicy: { en: 'Privacy Policy',    de: 'Datenschutzerklärung'  },
} as const
