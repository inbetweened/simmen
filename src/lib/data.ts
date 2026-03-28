// ─── Site Configuration ───────────────────────────────────────────────────────
// Central swap-zone for brand content, nav labels, and social links.
// Update this file to change wordmark, domain, nav items, or social handles.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  wordmark: 'Daniel Simmen',
  domain: 'simmen.co',
  tagline: 'Motion Design & Creative Development',
} as const

// ─── Social Links ─────────────────────────────────────────────────────────────
export const socialLinks = [
  { label: 'LinkedIn', icon: 'linkedin', href: '#' },
  { label: 'Instagram', icon: 'instagram', href: '#' },
  { label: 'YouTube', icon: 'youtube', href: '#' },
] as const

export type SocialIconName = (typeof socialLinks)[number]['icon']

// ─── Navigation Items ─────────────────────────────────────────────────────────
export const navItems = [
  {
    id: '01',
    heading: 'INTRO',
    sub: [],
    href: '#intro',
  },
  {
    id: '02',
    heading: 'WORK',
    sub: [],
    href: '#work',
  },
  {
    id: '03',
    heading: 'CONTACT',
    sub: [],
    href: 'mailto:daniel@simmen.co',
  },
] as const

// ─── Projects ─────────────────────────────────────────────────────────────────
// Add your own titles, types, years and image paths here.
// Replace `image` with an actual path once assets are ready, e.g. '/work/project-1.jpg'
export type Project = {
  id: string
  title: string
  client: string
  type: string
  year: string
  image: string        // thumbnail shown in grid card
  video: string        // primary video (single)
  videos?: { label: string; src: string }[]  // multiple videos with labels
  youtubeUrl?: string  // YouTube link — used instead of local video in modal
  description: string
  tags: string[]
  courseDisclaimer?: string
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Logo Animation',
    client: 'Zentralschweizer Bildungstreffpunkt',
    type: 'Motion Design',
    year: '2025',
    image: '/work/01-zebi/thumbnail.png',
    video: '/work/01-zebi/video.mp4',
    description: '',
    tags: ['Logo', 'Animation', 'Brand Identity'],
  },
  {
    id: '02',
    title: 'Promotion Post',
    client: 'Zentralschweizer Bildungstreffpunkt',
    type: 'Motion Design',
    year: '2025',
    image: '/work/02-project/thumbnail.png',
    video: '/work/02-project/Zebi_Halle4_V2.mp4',
    description: 'Zebi hat mich beauftragt, einen kurzen Promotions-Post für Social Media zu gestalten. Anlass war die erstmalige Erweiterung der Messe auf Halle 4, in der Berufe rund um Mobilität, Logistik und Transport vorgestellt werden. Ziel war es, junge Menschen anzusprechen und auf die Veranstaltung aufmerksam zu machen.',
    tags: ['Social Media', 'Motion Design', 'Promotion'],
  },
  {
    id: '03',
    title: 'Award Animations',
    client: 'Swiss Plastics Expo',
    type: 'Motion Design',
    year: '2026',
    image: '/work/03-project/Thumbnail.png',
    video: '/work/03-project/WINNER PRODUKTINNOVATION.mp4',
    video: '/work/03-project/WINNER PRODUKTINNOVATION.mp4',
    videos: [
      { label: 'Winner Produktinnovation', src: '/work/03-project/WINNER PRODUKTINNOVATION.mp4' },
      { label: 'Winner Publikumsliebling', src: '/work/03-project/WINNER Publikumsliebling.mp4' },
    ],
    description: 'Im Rahmen einer Preisverleihung verschiedener Kategorien an der Swiss Plastics Expo 2026 brauchte die Messe eine angemessene Präsentation. Ich habe verschiedene Animationen für die Nominierten und Gewinner erstellt.',
    tags: ['Motion Design', 'Animation', 'Event'],
  },
  {
    id: '04',
    title: 'IPA – Erklärvideo Ticketportal',
    client: 'Messe Luzern AG',
    type: 'Full Production',
    year: '2025',
    image: '/work/04-project/Thumbnail Video zum  TPA.png',
    video: '',
    youtubeUrl: 'https://youtu.be/wKoD7PpOio4',
    description: 'Konzeption, Produktion und Umsetzung eines Erklärvideos für das Ticketportal der Aussteller bei der Messe Luzern. Ziel war es, die Nutzung verständlich zu vermitteln und die Eigenständigkeit der Aussteller zu erhöhen. Umgesetzt durch die Kombination von Real Footage und animierten, vektorisierten Benutzeroberflächen, um komplexe Prozesse klar und visuell ansprechend darzustellen. Das finale Video wurde auf YouTube veröffentlicht und direkt im Ticketportal integriert.',
    tags: ['Erklärvideo', 'Full Production', 'Animation', 'Video'],
  },
]

// ─── 3D Explorations ──────────────────────────────────────────────────────────
export type ThreeDPiece = {
  id: string
  title: string
  software: string
  year: string
  image: string      // thumbnail — drop into /public/3d/XX/
  video?: string     // optional video — drop into /public/3d/XX/
  description?: string
  courseDisclaimer?: string  // shown when piece is based on a tutorial/course
}

export const threeDPieces: ThreeDPiece[] = [
  {
    id: '01',
    title: 'Geometry Node Course',
    software: 'Blender · CG Fast Track',
    year: '2025',
    image: '/3d/01/Thumbnail.png',
    video: '/3d/01/Dots_ting.0001.mp4',
    description: '',
    courseDisclaimer: 'de:Dieses Werk entstand im Rahmen eines Kurses von CG Fast Track. Die Umsetzung folgt weitgehend dem Kursmaterial — eigene Anpassungen beschränken sich auf die Farbgebung.|en:This piece was created as part of a course by CG Fast Track. The execution closely follows the course material — personal changes are limited to colour.',
  },
]
