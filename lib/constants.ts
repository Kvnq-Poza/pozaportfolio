// Centralized app constants to avoid magic numbers and keep things consistent
export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
  { href: "https://medium.com/@kvnqpoza", label: "Blog", external: true },
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
  name: "Poza",
  role: "Fullstack Developer",
  experience: "3+ years",
  available: true,
  professional_summary:
    "Full-stack developer with expertise in Python, Django JavaScript, and React. Blending a background in graphic design with strong backend and database skills to build scalable, high-performance applications. Passionate about creating modern, interactive user experiences from concept to deployment.",
  technical_skills: [
    {
      skill: "Frontend",
      skill_list: [
        "HTML & CSS",
        "JavaScript",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Redux",
      ],
    },
    {
      skill: "Backend",
      skill_list: [
        "Python",
        "Node.js",
        "Express",
        "FastAPI",
        "Supabase",
        "PHP",
      ],
    },
    {
      skill: "DevOps",
      skill_list: ["Git", "Docker", "Vercel", "CI/CD", "Netlify"],
    },
    {
      skill: "Database",
      skill_list: ["MySQL", "MongoDB", "Redis"],
    },
    {
      skill: "Tools & Others",
      skill_list: ["VS Code", "Dockerization", "Contentful"],
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
    "I expanded into JavaScript with a focus on fullstack development. Over the years, I've developed expertise in React ecosystems, Python backends, and database design. I thrive on building scalable, performant applications from concept to deployment.",
    "When not coding, I explore new technologies, read a book, or drive.",
  ],
};

export const PROJECTS = [
  {
    id: 1,
    title: "Freelikes App",
    role: "Full-stack Developer",
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
    featured: true,
    year: "2025",
  },
  {
    id: 2,
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
    id: 3,
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
    featured: true,
    year: "2025",
  },
  {
    id: 4,
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
    id: 5,
    title: "Freetools App",
    role: "Full-stack Developer",
    description:
      "A free tool library with a wide range of online tools aimed at boosting productivity and simplifing tasks",
    image: "/assets/freetools-screen.png",
    technologies: [
      "Javascript",
      "Node.JS",
      "Python",
      "HTML5",
      "CSS3",
      "Contentful",
    ],
    liveUrl: "https://freetools.org",
    featured: false,
    year: "2024",
  },
  {
    id: 6,
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
    id: 7,
    title: "AdStage WordPress website tools",
    role: "WordPress Developer",
    description:
      "A custom plugin for with tools for creating and optimising ads across multiple platforms.",
    features: [
      "Ad Copy Generator",
      "Instagram Ad Generator",
      "Facebook Ad Copy Generator",
      "Google Ad Copy Generator",
      "Google Ads Keyword Generator (Integrated with Google Auto-suggestions API and ChatGPT)",
      "Keyword CPC Checker (Integrated with Keywords Everywhere API)",
      "Bulk Keyword Checker",
      "AI Ad Image Generator",
    ],
    image: "/assets/adstage-screen.png",
    technologies: ["Javascript", "PHP", "WordPress", "HTML5", "CSS3"],
    liveUrl: "https://adstage.io",
    featured: false,
    year: "2024",
  },
  {
    id: 8,
    title: "SaveYT",
    role: "Full-stack Developer",
    description:
      "A downloader app which enables easy downloads of YouTube videos into mp3 and mp4 formats",
    image: "/assets/saveyt-screen.png",
    technologies: ["Python", "React", "Tailwind", "Node.JS", "Socket.io"],
    liveUrl: "https://saveyt.co",
    featured: false,
    year: "2024",
  },
  {
    id: 9,
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
    id: 10,
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
    id: 11,
    title: "RexPayments",
    role: "Full-Stack Laravel Engineer",
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
