/**
 * Single source of truth for every piece of copy and every visual asset.
 * Replace the placeholder values here; scenes read from this file only.
 */

export interface Asset {
  /** Describes the asset; used as alt text and as the placeholder label. */
  label: string
  /** Path to the final image (e.g. '/assets/hero-figure.png'). Empty = placeholder. */
  src?: string
}

export interface Project {
  title: string
  year: string
  stack: string[]
  blurb: string
  href?: string
  figure: Asset
}

export interface ExperienceItem {
  period: string
  role: string
  company: string
  /** Optional line items printed under the role on the receipt. */
  highlights?: string[]
}

export interface Link {
  label: string
  href: string
}

const projects: Project[] = [
  {
    title: 'MyManga',
    year: '2022',
    stack: ['React', 'Redux', 'Node', 'Sequelize', 'Stripe', 'Firebase'],
    blurb: 'Manga-themed e-commerce: accounts, cart, Stripe payments and email notifications. Built with SCRUM.',
    href: 'https://mymangastore.netlify.app',
    figure: { label: 'figure · mymanga' },
  },
  {
    title: 'Countries',
    year: '2022',
    stack: ['React', 'Redux', 'Node', 'PostgreSQL', 'Sequelize'],
    blurb: 'SPA to search countries by population, activity or continent, and plan activities. Google login via Firebase.',
    href: 'https://github.com/Merzelert/PI-COUNTRIES',
    figure: { label: 'figure · countries' },
  },
  {
    title: 'Portfolio v1',
    year: '2023',
    stack: ['React', 'Next.js', 'Tailwind'],
    blurb: 'My previous portfolio, built with Next.js and Tailwind.',
    href: 'https://github.com/Merzelert/Portfolio-Nextjs-Tailwind',
    figure: { label: 'figure · portfolio v1' },
  },
  {
    title: 'Batatabit',
    year: '2022',
    stack: ['HTML', 'CSS', 'Figma'],
    blurb: 'Mobile-first landing page from a Figma wireframe, with reusable pure CSS and media queries.',
    href: 'https://merzelert.github.io/batata-bit/',
    figure: { label: 'figure · batatabit' },
  },
]

export const site = {
  name: 'Erik Retana',
  wordmark: { main: 'ERIK', suffix: 'dev' },
  updated: 'Nov 18, 2026',
  email: 'erik.retana.lopez@gmail.com',

  introLines: [
    "let's build amazing things.",
    'react developer from mexico city.',
    'web, mobile & ai chat platforms.',
  ],

  /** Wrap a word in *asterisks* to emphasize it. */
  statement: "Hi, I'm Erik: a *full-stack* developer who loves to *build*.",
  statementKicker: "let's build amazing things",

  about: [
    '# about',
    '> react developer from mexico city.',
    '- react, react native & typescript',
    '- ai chat platforms, real-time flows',
    '- tanstack query, zustand, node, postgresql',
    '- former teaching assistant at henry',
  ],

  projects,

  skills: [
    'TypeScript',
    'React',
    'React Native',
    'Next.js',
    'TanStack Query',
    'Zustand',
    'Node',
    'PostgreSQL',
    'Tailwind',
    'JavaScript',
    'HTML',
    'CSS',
  ],

  experience: [
    {
      period: 'Feb 2023 — now',
      role: 'React Developer',
      company: 'Exagono Software · CDMX',
      highlights: [
        'AI chat platforms, end-to-end flows',
        'React Native + TypeScript apps',
        'TanStack Query migration: −50% complexity',
        'CRM evolution: data sync & reliability',
      ],
    },
    {
      period: 'Oct 2022 — Feb 2023',
      role: 'Freelance Web Developer',
      company: 'Papaya Design · remote',
      highlights: [
        'El Colegio de San Luis site: HTML, JS, PHP, Bootstrap',
        'Digital business cards: HTML, CSS, JS',
      ],
    },
    { period: '2022', role: 'Full-Stack Teaching Assistant', company: 'Henry' },
    { period: '2022', role: 'Full-Stack Development Bootcamp', company: 'Henry' },
  ] satisfies ExperienceItem[],
  experienceTotal: '4+ yrs',

  now: {
    kicker: 'now',
    caption: 'still learning, always',
    text: 'Leading AI chat platforms and React Native apps at Exagono Software.',
  },

  links: [
    { label: 'github', href: 'https://github.com/Merzelert' },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/erik-retana-webdev/' },
    { label: 'twitter', href: 'https://twitter.com/merzelert' },
  ] satisfies Link[],
}

export const assets = {
  logo: { label: 'mug' },
  introObject: { label: 'object · plant on stool' },
  introFigure: { label: 'figure · you' },
  introLamp: { label: 'floor lamp' },
  aboutPortrait: { label: 'portrait' },
  skillsObject: { label: 'object · tape measure' },
  nowBulb: { label: 'light bulb' },
  nowPhoto: { label: 'photo' },
  contactPencil: { label: 'pencil' },
} satisfies Record<string, Asset>
