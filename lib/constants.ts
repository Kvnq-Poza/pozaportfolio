// Centralized app constants to avoid magic numbers and keep things consistent

// SEO: canonical origin, default metadata copy, and profiles used for JSON-LD `sameAs`
export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.kvnqpoza.dev").replace(
    /\/$/,
    ""
  ),
  name: "James Alaribe (Poza)",
  shortName: "Poza",
  title: "James Alaribe (Poza) | Full-Stack Software Developer, Lagos",
  description:
    "James Alaribe (Poza) is a Lagos-based full-stack software developer working remotely with clients worldwide. 4+ years building scalable SaaS platforms, APIs and real-time web apps with Next.js, React, TypeScript, Node.js and PostgreSQL. Available for hire.",
  location: {
    city: "Lagos",
    country: "Nigeria",
    countryCode: "NG",
  },
  keywords: [
    "James Alaribe",
    "Poza",
    "Kvnq Poza",
    "full-stack developer",
    "software developer",
    "software engineer",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "Node.js developer",
    "backend developer",
    "SaaS developer",
    "freelance developer",
    "remote developer",
    "software developer Lagos",
    "full-stack developer Lagos",
    "Next.js developer Nigeria",
    "React developer Nigeria",
    "hire a developer",
    "web developer portfolio",
  ],
  twitterHandle: "@KvnqPoza",
  image: "/poza-moji-x.png",
  socials: {
    github: "https://github.com/Kvnq-Poza",
    linkedin: "https://www.linkedin.com/in/kvnqpoza02344/",
    x: "https://x.com/KvnqPoza",
    instagram: "https://www.instagram.com/kvnq_poza/",
    medium: "https://medium.com/@kvnqpoza",
  },
};

export type NavItem = {
  href: string;
  label: string;
  // Opens in a new tab as a plain anchor instead of client-side navigation
  external?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export const EGGS = {
  HOME_HERO: {
    id: "home-hero-click",
    points: 15,
    label: "Home: Click hero image window",
  },
  HOME_TITLE: {
    id: "home-title-click",
    points: 15,
    label: "Home: Click main title",
  },
  ABOUT_HEADER: {
    id: "about-window-click",
    points: 15,
    label: "About: Click window header",
  },
  PROJECTS_TITLE: {
    id: "projects-title-click",
    points: 15,
    label: "Projects: Click page title",
  },
  RESUME_DOWNLOAD: {
    id: "resume-download",
    points: 10,
    label: "Resume: Download PDF",
  },
  CONTACT_SUBMIT: {
    id: "contact-form",
    points: 20,
    label: "Contact: Submit form",
  },
} as const;

export const ALL_EGGS = [
  EGGS.HOME_HERO,
  EGGS.HOME_TITLE,
  EGGS.ABOUT_HEADER,
  EGGS.PROJECTS_TITLE,
  EGGS.RESUME_DOWNLOAD,
  EGGS.CONTACT_SUBMIT,
];

export const UI = {
  // Floating button sizing/placement
  terminalBtnSize: 48, // px
  terminalBtnBottom: 24, // px (bottom-6)
  terminalBtnRight: 24, // px (right-6)
  floatingGap: 8, // px space between stacked floating buttons

  // Hints / motion
  hintPulseDurationMs: 2000,
};

export const SEARCH_TAGS = 5;

export const SCOREBOARD = {
  // Layout
  desktopOffsetX: 20, // px
  desktopOffsetY: 80, // px
  mobileOffsetY: 80, // px
  width: 200, // px for mobile slide-in target area
  marginRight: 16, // px inner margin from right on mobile

  // Behavior
  mobileAutoHideMs: 5000, // 5 seconds
  celebrationDurationMs: 2000,

  // Motion / drag spring
  springStiffness: 300,
  springDamping: 30,
};

export const SKILLS = [
  "React",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "Python",
  "Node.js",
  "Tailwind",
  "Supabase",
  "PHP",
  "SQL",
];

export const POZA_DATA = {
  name: "James Alaribe",
  alias: "Poza",
  role: "Software Developer",
  location: "Lagos, Nigeria",
  remote: "Remote, working worldwide",
  experience: "4+ years",
  available: true,
  professional_summary:
    "Software developer specializing in building scalable SaaS platforms, analytics dashboards, and real-time web applications. Experienced in designing, developing, and deploying modern Next.js and React systems with strong focus on performance, data visualization, authentication, accessibility compliance, and long-term maintainability.",
  technical_skills: [
    {
      skill: "Frontend",
      skill_list: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "Accessibility (WCAG)",
      ],
    },
    {
      skill: "Backend",
      skill_list: [
        "Node.js",
        "Next.js API Routes",
        "Python",
        "PHP",
        "REST APIs",
        "WebSockets",
        "Supabase",
        "Prisma",
      ],
    },
    {
      skill: "DevOps",
      skill_list: ["Docker", "Git", "CI/CD", "Vercel", "Docker Compose"],
    },
    {
      skill: "Database",
      skill_list: ["MySQL", "Supabase", "IndexedDB", "Prisma ORM"],
    },
    {
      skill: "Tools & Systems",
      skill_list: [
        "PWA Architecture",
        "Offline-First Systems",
        "Data Visualization",
        "Authentication (NextAuth)",
        "Real-Time DOM Monitoring",
        "Custom Rules Engines",
      ],
    },
  ],
};

export const ABOUT_SKILLS = [
  {
    name: "JavaScript",
    icon: "/assets/javascript-icon.svg",
  },
  {
    name: "Typescript",
    icon: "/assets/Typescript-icon.png",
  },
  {
    name: "React",
    icon: "/assets/react-icon.png",
  },
  {
    name: "Next.js",
    icon: "/assets/nextjs-icon.png",
  },
  {
    name: "Python",
    icon: "/assets/python-icon.png",
  },
  {
    name: "Node.js",
    icon: "/assets/node-js-icon.png",
  },
  {
    name: "SQL",
    icon: "/assets/sql-icon.png",
  },
  {
    name: "Tailwind",
    icon: "/assets/tailwind-icon.png",
  },
  {
    name: "Supabase",
    icon: "/assets/supabase-icon.png",
  },
  {
    name: "PHP",
    icon: "/assets/php-icon.png",
  },
];

export const EXPERIENCES = [
  {
    title: "Freelance Developer",
    company: "Freelancer",
    period: "2023 - Present",
    description:
      "Work with local and international businesses to bring their ideas to life",
  },
  {
    title: "Developer & Team Lead",
    company: "DevCareer Web5 TBD",
    period: "2023",
    description:
      "Led a team of four developers to build PeerVault using Web5 technology.",
  },
  {
    title: "IT Support Specialist",
    company: "EfficientLinks Ltd., Lagos",
    period: "2017 - 2022",
    description:
      "Managed setup and maintenance of enterprise IT infrastructure.",
  },
];

export const STORY = {
  heading: "> My Journey",
  paragraphs: [
    "My coding journey began in 2019 with Java and Python tutorials on YouTube. I was fascinated by how simple logic could produce desired results. Taking a very long break, I continued my journey in 2022 and continued learning Python through YouTube and FreeCodeCamp and discovered Django's power to build web apps. This caught my attention, as someone with a background in graphic design, this was a way to create modern designs and have it be functions, turning creative ideas into an interactive digital experience.",
    "I expanded into JavaScript with a focus on fullstack development. Over the years, I've developed expertise in React ecosystems, backend, system and database design. I thrive on building scalable, performant applications from concept to deployment.",
    "When not coding, I explore new technologies, read a book, or drive.",
  ],
};

export const PROJECTS = [
  {
    id: 17,
    title: "PressFeed",
    role: "Software Developer",
    description:
      "A press release distribution platform built as four independently deployable apps over one Postgres database. Operators curate RSS feeds; releases are imported, cleaned and re-encoded, then published on each publisher's own site through CNAME hosting, a WordPress plugin, or a direct API build. Every release carries a beacon, so readership is measured in the visitor's browser rather than self-reported by the publisher.",
    features: [
      "Four isolated surfaces: publisher console, operator console, public API, marketing site",
      "Database-enforced tenant isolation via Postgres row-level security (fails closed)",
      "Revocable JTI-backed sessions with per-surface lifetimes and per-app cookie binding",
      "Three integration paths: CNAME hosting, WordPress plugin, or direct API",
      "Independently measured impressions/clicks via an SPA-aware browser beacon",
      "Canary checks that fetch published pages back to confirm the beacon is intact",
      "Signed-challenge and CNAME domain verification on a randomized re-check schedule",
      "Email OTP verification, optional TOTP 2FA, and disposable-address rejection at signup",
      "Redis-backed sliding-window rate limiting across every surface, failing open",
      "RSS importer with content cleaning and a responsive image ladder",
    ],
    architecture: [
      "Monorepo: npm workspaces, 4 Next.js 16 apps + shared ui/core/auth/db/mail packages",
      "Database: PostgreSQL via Prisma with FORCE ROW LEVEL SECURITY and least-privilege roles",
      "Auth: Auth.js (NextAuth v5) factory with per-app sessions backed by a sessions table",
      "Caching/Limits: Redis for atomic sliding-window rate limiting across replicas",
      "Email: nodemailer with one branded transport and dedupe via notification logs",
      "Infrastructure: fully containerised with Docker + Compose, Next.js standalone output",
    ],
    image: "/assets/pressfeed-screen.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Auth.js",
      "Tailwind CSS",
      "Docker",
    ],
    liveUrl: "https://pressfeed.io",
    featured: true,
    year: "2026",
  },
  {
    id: 16,
    title: "ChainPayments",
    role: "Software Developer",
    description:
      "A powerful, self-custodial cryptocurrency payment infrastructure designed for modern internet businesses. It allows merchants to accept crypto payments directly into their own wallets without third-party custodial risk, high fees, or intrusive KYC requirements.",
    features: [
      "Non-Custodial Multi-Chain Support (Ethereum, Bitcoin, Solana, XRP)",
      "Smart Payment Attribution via proximity-scoring algorithm",
      "Adaptive Polling Engine for real-time blockchain monitoring",
      "Interactive API Playground and Hosted Checkout",
      "Resilient Proxy Rotation and Orphan Transaction Recovery",
      "Developer-First API with Webhook notifications",
    ],
    architecture: [
      "Frontend/Backend: Next.js 15+ (App Router)",
      "Database: PostgreSQL with Prisma ORM",
      "Authentication: NextAuth.js & Cloudflare Turnstile",
      "Blockchain SDKs: ethers.js, @solana/web3.js, xrpl",
      "Background Tasks: Node-cron",
    ],
    image: "/assets/chainpayments-screen.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Framer Motion",
      "Docker",
      "Web3",
    ],
    liveUrl: "https://chainpayments.io",
    featured: true,
    year: "2026",
  },
  {
    id: 15,
    title: "TeleDesk",
    role: "Software Developer",
    description:
      "A multi-tenant SaaS platform for Telegram support operations. Organizations sign up, add their own bots, invite their own staff, and operate in complete isolation from one another, all hosted on a single infrastructure managed by a platform superadmin.",
    features: [
      "Full multi-tenant architecture",
      "JWT + DB session revocation auth",
      "Granular staff roles and permissions",
      "Plans and quota enforcement",
      "AES-256-GCM bot token encryption",
      "Real-time Socket.io notifications",
      "Comprehensive admin dashboard",
      "Automated system health monitoring",
    ],
    architecture: [
      "Frontend: Next.js 15 dashboard",
      "Backend: Webhook & Socket.io server (Express/grammy)",
      "Database: MongoDB with Mongoose",
      "Infrastructure: Docker, Nginx, Turbo Monorepo",
    ],
    image: "/assets/teledesk-screen.jpg",
    technologies: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "Docker",
      "Nginx",
      "Tailwind CSS",
    ],
    liveUrl: "https://web.teledesk.net",
    featured: true,
    year: "2026",
  },
  {
    id: 1,
    title: "Ogrite",
    role: "Software Developer",
    description:
      "A deterministic visual artifact compiler for Open Graph images. Ogrite converts application routes into static, optimized OG images at build time, treating visuals as assets in the build pipeline.",
    features: [
      "Route Discovery: Manual, Sitemap, and Filesystem strategies",
      "Programmatic API: Full build control for automation",
      "CLI Tools: Generate, watch, check, and clean commands",
      "High Performance: Parallel rendering using Playwright",
      "Post-render Optimization: Automatic compression and format conversion (WebP/PNG)",
    ],
    architecture: [
      "Rendering Engine: Playwright (Chromium)",
      "Image Processing: Sharp",
      "Discovery Logic: Sitemap parser and Filesystem scanner",
      "CLI: Custom CLI built with TypeScript",
    ],
    image: "/assets/ogrite-screen.webp",
    technologies: [
      "TypeScript",
      "Node.js",
      "Playwright",
      "Sharp",
      "CLI",
      "Open Graph",
    ],
    liveUrl: "https://ogrite.vercel.app/",
    featured: true,
    year: "2026",
  },
  {
    id: 2,
    title: "Freelikes App",
    role: "Software Developer",
    description:
      "FreeLikes is a modern web application that helps users increase their social media engagement through authentic interactions. Built with Next.js, Prisma, and MySQL, it provides a seamless experience for managing social media growth services.",
    features: [
      "Authentication System: Secure social login",
      "Service Dashboard: Intuitive interface to manage social media growth services",
      "Engagement Analytics: Track your growth and engagement metrics",
      "Responsive Design: Optimized for both desktop and mobile devices",
      "Dark/Light Mode: Choose your preferred visual theme",
    ],
    architecture: [
      "Frontend: Next.js 15 with React and TypeScript",
      "Backend: Next.js API routes with server components",
      "Database: MySQL with Prisma ORM",
      "Authentication: NextAuth.js with JWT",
      "Styling: Tailwind CSS with shadcn/ui components",
      "Deployment: Docker containerization",
    ],
    image: "/assets/freelikes-screen.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "MariaDB",
      "Prisma",
      "MySQL",
      "Tailwind CSS",
      "Docker",
      "NextAuth.js",
    ],
    liveUrl: "https://freelikes.org/",
    featured: false,
    year: "2025",
  },
  {
    id: 3,
    title: "Trakka App",
    role: "Developer",
    description:
      "A privacy-first, local-first Progressive Web App (PWA) for tracking expenses, income, and budgets. Built with Next.js, TypeScript, and Tailwind CSS, Trakka provides a secure, offline-first experience with a variety of financial management tools.",
    features: [
      "PWA - Installable on mobile and desktop",
      "Privacy-first - All data stays on your device",
      "Local storage - Uses IndexedDB for persistence",
      "Budget checklists - Interactive budget management",
      "Charts & insights - Visual spending analysis",
      "Export/Import - JSON and CSV backup support",
      "Responsive design - Works on all screen sizes",
      "Accessible - WCAG 2.1 AA compliant",
    ],
    architecture: [
      "Framework: Next.js 14 (App Router)",
      "Language: TypeScript",
      "Styling: Tailwind CSS",
      "State Management: Zustand",
      "Storage: IndexedDB via localstorage",
      "Charts: Recharts (dynamically imported)",
      "Animations: Framer Motion",
      "Icons: Heroicons",
    ],
    image: "/assets/trakka-screen.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "IndexedDB",
      "Recharts",
      "Framer Motion",
      "Heroicons",
    ],
    liveUrl: "https://trakka-seven.vercel.app/",
    featured: true,
    year: "2025",
  },
  {
    id: 4,
    title: "A11y Live",
    role: "Developer",
    description:
      "A comprehensive, real-time accessibility testing tool that monitors DOM changes and provides instant feedback on WCAG compliance violations. Built with JavaScript, this tool helps developers identify and fix accessibility issues during development.",
    features: [
      "Real-time Monitoring",
      "WCAG Compliance",
      "Performance Optimized",
      "Severity Classification",
      "Element Highlighting",
      "Detailed Reporting",
      "Keyboard Accessible UI",
      "Export Options",
    ],
    architecture: [
      "Frontend: JavaScript",
      "Real-time Monitoring: MutationObserver",
      "Analysis: Custom WCAG 2.1 Rules Engine",
      "UI: Interactive, Searchable, Filterable",
      "Export: JSON, CSV, HTML formats",
    ],
    image: "/assets/a11y-live-screen.png",
    technologies: ["JavaScript", "WCAG", "MutationObserver", "HTML", "CSS"],
    liveUrl: "https://a11y-live.js.org/",
    featured: false,
    year: "2025",
  },
  {
    id: 5,
    title: "YouTube Downloader API",
    role: "Backend Developer",
    description:
      "A Restful API for downloading YouTube video and audio. \n Supports real-time progress via websocket, redis caching, Multi-format downloads, & Auto-scaling",
    features: [
      "Websocket Progress tracking",
      "Multi-format downloads",
      "Auto-scaling",
      "Containerization",
      "Redis caching",
    ],
    image: "/assets/yt-downloader-screen.jpg",
    technologies: ["Node.js", "Redis", "Docker", "Socker.io", "RESTful API"],
    liveUrl: "https://rapidapi.com/KvnqPoza/api/yt-video-audio-downloader-api",
    featured: false,
    year: "2025",
  },
  {
    id: 6,
    title: "Freetools App",
    role: "Software Developer",
    description:
      "A free tool library with over 160+ tools, ranging from 12 categories, a wide range of online tools aimed at boosting productivity and simplifing tasks",
    features: ["Over 160+ tools", "12 categories"],
    architecture: [
      "Frontend: Next.js with React and TypeScript",
      "Backend: Next.js API routes with server components",
      "Database: Postgres",
      "Styling: Tailwind CSS",
    ],
    image: "/assets/freetools-screen.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Postgres",
      "Tailwind CSS",
      "Node.JS",
      "Python",
      "Contentful",
    ],
    liveUrl: "https://freetools.org",
    featured: true,
    year: "2024",
  },
  {
    id: 7,
    title: "TubeStats",
    role: "Software Developer",
    description:
      "A comprehensive Next.js analytics platform for YouTube creators that tracks channel performance, engagement metrics, and growth trends. Contributed from where the previous developer stopped, implementing advanced tracking features and optimizing the architecture for performance.",
    features: [
      "Real-time YouTube Data Tracking",
      "Interactive Analytics Dashboard",
      "Growth Forecasting & Predictions",
      "Automated Scheduled Reporting",
      "Admin API Key & User Management",
    ],
    architecture: [
      "Framework: Next.js 15 (App Router)",
      "Database: MySQL with Prisma ORM",
      "State Management: Redux & Redux Saga",
      "Styling: Tailwind CSS & Ant Design",
      "Monitoring: Custom Cron System",
    ],
    image: "/assets/tubestats-screen.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "MySQL",
      "Prisma",
      "Tailwind CSS",
      "Ant Design",
      "Redux",
      "Docker",
      "YouTube API",
    ],
    liveUrl: "https://tubestats.io",
    featured: false,
    year: "2025",
  },
  {
    id: 8,
    title: "Pathfinder",
    role: "Software Developer",
    description:
      "A zero-dependency, high-performance visual tool for mapping, querying, and generating access logic for deeply nested JSON structures. Optimized for massive datasets with a custom Virtual Scroll engine.",
    features: [
      "High Performance: 100,000+ nodes at 60fps",
      "Multi-format Path Generation: JSONPath, Optional Chaining, etc.",
      "TypeScript Schema Generation: Automatic interface inference",
      "Live Search: Instant filtering across keys and values",
      "Privacy First: 100% client-side processing",
    ],
    architecture: [
      "Frontend: Vanilla JavaScript (ES Modules)",
      "Engine: Custom Virtual Scroll & Tree Flattening logic",
      "Styling: Modular CSS system",
      "Persistence: SessionStorage for state persistence",
    ],
    image: "/assets/pathfinder-screen.png",
    technologies: ["JavaScript", "HTML5", "CSS3", "Virtual Scroll", "JSON"],
    liveUrl: "https://pathfinder.js.org/",
    featured: false,
    year: "2026",
  },
  {
    id: 9,
    title: "Lenostube YouTube Royalty-free music",
    role: "WordPress Developer",
    description:
      "A library of over 5,000 YouTube Royalty-free music, built to help creators easily access music for their content. Built using PHP, HTML, CSS, JavaScript, and MySQL on WordPress using a custom-built wordpress plugin.",
    features: [
      "Advanced sorting and filtering",
      "Video suggestions",
      "Genre and mood filtering",
      "15+ Genres and Moods",
      "Fast media fetching with DB indexing",
      "Save favourite videos",
      "Custom WordPress plugin",
    ],
    image: "/assets/lenostube-screen.png",
    technologies: ["Javascript", "PHP", "WordPress", "HTML5", "CSS3", "MySQL"],
    liveUrl:
      "https://www.lenostube.com/en/youtube-copyright-free-music-library/",
    featured: false,
    year: "2024",
  },
  {
    id: 12,
    title: "Guesser",
    role: "Front-end Developer",
    description: "A simple number guessing game",
    image: "/assets/guesser-screen.png",
    technologies: ["Javascript", "CSS3", "HTML5"],
    liveUrl: "https://topnum-guesser.netlify.app",
    featured: false,
    year: "2023",
  },
  {
    id: 13,
    title: "Weather-App",
    role: "Backend Developer",
    description:
      "Pulls request from the Open Weather API to give real-time weather information on any region",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Python", "HTML5"],
    githubUrl: "https://github.com/Kvnq-Poza/weatherapp",
    liveUrl: "https://github.com/Kvnq-Poza/weatherapp",
    featured: false,
    year: "2022",
  },
  {
    id: 14,
    title: "RexPayments",
    role: "Software Laravel Engineer",
    description:
      "A Stripe-powered payment processing platform that enables merchants to collect payments, issue branded receipts, generate shareable payment links, and monitor system health with automated email logging and delivery monitoring.",
    features: [
      "Branded Email Receipts with Merchant Co-Branding",
      "Email Logging and Delivery Health Monitoring",
      "Shareable Payment Links with Public Stripe Checkout",
      "SEO-Friendly Payment URLs with Expiration Controls",
      "Support Email Reply-To & CC Routing",
      "Email Failure Detection and Admin Alerting",
      "Payment Link Analytics via Order Attribution",
      "User-Friendly Stripe Error Mapping",
      "Queue-Ready Email Delivery",
      "Mobile-Responsive Checkout Experience",
    ],
    architecture: [
      "Framework: Laravel 8.x",
      "Database: MySQL with Eloquent ORM",
      "Payments: Stripe",
      "Email: Laravel Mail (SMTP / Log / Queue)",
      "Frontend: Blade Templates with Bootstrap 4",
      "Scheduling: Laravel Task Scheduler (Cron)",
      "Security: CSRF Protection, Input Validation, ORM-Based Queries",
    ],
    image: "/assets/rexpayments-screen.jpg",
    technologies: [
      "PHP",
      "Laravel",
      "Stripe API",
      "MySQL",
      "Blade",
      "Bootstrap 4",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
    liveUrl: "https://rexpayments.com/",
    featured: true,
    year: "2025",
  },
];
