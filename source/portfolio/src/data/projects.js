/**
 * Portfolio project data.
 *
 * SOURCE OF TRUTH
 *   Everything below comes from the PortfolioLLM knowledge tree
 *   (knowledge/projects/*.md and knowledge/profile/experience.md), not from
 *   this file. Where the knowledge base is thin, the copy stays thin — nothing
 *   here is invented, and no metric appears that the knowledge base does not
 *   state.
 *
 * PROVENANCE
 *   `org` is a first-class field, surfaced as a pill next to the year and type
 *   on every grid card, as a badge in the reel caption and fullscreen HUD, and
 *   on the reel's fixed progress rail. It is no longer used to group the grid:
 *   the distinction is carried by the pill itself.
 *
 *   simit    = work at SIM IT Sdn Bhd (Software Engineer, 2023-2026)
 *   personal = independent / open-source work
 *
 *   NOTE / OPEN QUESTION: LightweightPOS is credited to SIM IT Sdn Bhd by
 *   experience.md, but its own case study describes a personal freemium product
 *   hosted on pos.xxxterminal.com and open-sourced under Justin26l. It is filed
 *   under `personal` here. Changing that is a one-word edit.
 *
 * MEDIA
 *   Only assets that actually exist are listed. `media: []` means no real
 *   screenshot exists yet (for MCPLUS and E-Invoice, every asset on hand is a
 *   2000x2000 marketing illustration rather than product UI), so those projects
 *   render a typographic cover instead of a faked one.
 *
 * TITLE
 *   One `title` per project, always the short form. It carries the same weight
 *   in the reel caption, the fullscreen HUD, the progress rail and the grid
 *   card, so there is no second "full name" variant to keep in sync.
 *
 * COPY
 *   `description` says what the project does for the people using it, in plain
 *   language — not how it is built. Technology lives in the reel's own detail if
 *   it belongs anywhere; the grid stays readable to a non-engineer.
 */

const IMG = 'img/'

export const ORG = {
  simit: { short: 'SIM IT Sdn Bhd' },
  personal: { short: 'Personal' },
}

export const PROJECTS = [
  /* --------------------------------- TIER 1 · HIGHLIGHTS ------------------ */
  {
    key: 'mcplus',
    title: 'MCPlus Ecosystem',
    type: 'App & System Design',
    org: 'simit',
    year: '2026',
    role: 'Product design & user experience',
    description:
      'A digital tuition platform for students and parents — live classes, learning materials, subscriptions and a referral programme in one app.',
    links: [
      { label: 'Google Play ↗', href: 'https://play.google.com/store/apps/details?id=my.mcplus.mcplus_mobile_app' },
      { label: 'App Store ↗', href: 'https://apps.apple.com/my/app/mcplus/id6754678266' },
    ],
    highlight: true,
    media: [],
  },
  {
    key: 'einvoice',
    title: 'E-Invoice',
    type: 'Tax compliance',
    org: 'simit',
    year: '2024',
    role: 'Architect and implementer',
    description:
      'Issues LHDN-compliant e-invoices from inside the accounting software businesses already use, so they meet Malaysia’s mandate without a separate portal.',
    links: [{ label: 'Simbiz E-invoice', href: 'https://www.onlinesimbiz.com/#e-invoicing' }],
    highlight: true,
    media: [],
  },
  {
    key: 'digitalclone',
    title: 'Digital Clone AI',
    type: 'Conversational AI',
    org: 'personal',
    year: '2026',
    role: 'Sole author — product, front end, retrieval design',
    description:
      'An open-source AI that answers as me. Visitors ask about my work and get answers grounded in my real profile and projects — with sources, never invented experience.',
    links: [
      { label: 'Live site ↗', href: 'https://digiclone.xxxterminal.com/' },
      { label: 'GitHub ↗', href: 'https://github.com/Justin26l/DigitalCloneLLM' },
    ],
    highlight: true,
    media: [
      { src: IMG + 'digitalCloneAbout.jpg', alt: 'Digital Clone — about page' },
      { src: IMG + 'digitalCloneChat.jpg', alt: 'Digital Clone — chat page' },
    ],
  },
  {
    key: 'xxxterminal',
    title: 'xxxTerminal',
    type: 'Algorithmic trading SaaS',
    org: 'personal',
    year: '2022',
    role: 'Founder, product owner, engineer',
    description:
      'A trading-bot platform for people who don’t code. Traders describe a strategy, run it in the cloud, and share what works with the community.',
    links: [{ label: 'Product archive ↗', href: '/sites/xxxterminal/home.html' }],
    highlight: true,
    media: [{ src: IMG + 'xxxTerminal.png', alt: 'xxxTerminal trading dashboard' }],
  },

  /* --------------------------------- TIER 2 · GRID ------------------------ */
  {
    key: 'lightweightpos',
    title: 'LightweightPOS',
    type: 'POS & inventory',
    org: 'personal',
    year: '2026',
    role: 'Product owner, engineer, UI/UX designer',
    description:
      'A till and stock app for small shops that keeps working with no internet — and costs nothing to run, because there is no server behind it.',
    links: [
      { label: 'Live ↗', href: 'https://pos.xxxterminal.com/#/pos' },
      { label: 'GitHub ↗', href: 'https://github.com/Justin26l/LightweightPOS' },
    ],
    media: [{ src: IMG + 'lightweightPos.png', alt: 'LightweightPOS point of sale' }],
  },
  {
    key: 'veryexpress',
    title: 'VeryExpress',
    type: 'Developer tool',
    org: 'personal',
    year: '2024',
    role: 'Author and maintainer',
    description:
      'Generates a working backend API from a short schema description, instead of hand-writing the same routes, models and login for every new project.',
    links: [
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/very-express' },
      { label: 'GitHub ↗', href: 'https://github.com/Justin26l/VeryExpress' },
    ],
    media: [{ src: IMG + 'vex.png', alt: 'VeryExpress' }],
  },
  {
    key: 'spents',
    title: 'Spents mobile app',
    type: 'Personal ledger',
    org: 'personal',
    year: '2025',
    role: 'Design and full-stack prototype',
    description:
      'A personal spending tracker built to stay instant on a bad connection — entries save on the phone first and sync once the network comes back.',
    links: [{ label: 'Figma prototype ↗', href: 'https://www.figma.com/proto/10eFNWDmh8LXMNzGLG0DL2/Spents' }],
    media: [
      { src: IMG + 'spentsMobile.png', alt: 'Spents mobile ledger' },
      { src: IMG + 'spents.jpg', alt: 'Spents desktop ledger' },
    ],
    /* the grid thumbnail is landscape, and cover-cropping a 852x1704 phone
       screenshot there is ugly — so the grid borrows the desktop shot */
    thumb: IMG + 'spents.jpg',
  },
]

export const HIGHLIGHTS = PROJECTS.filter(p => p.highlight)
export const OTHERS = PROJECTS.filter(p => !p.highlight)
