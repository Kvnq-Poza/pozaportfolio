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
      skill_list: ["VS Code", "Dockerization"],
    },
  ],
};

export const ABOUT_SKILLS = [
  {
    name: "JavaScript",
    icon: "/assets/Javascript-icon.png",
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
    description:
      "A social platform where creators can grow their Instagram accounts",
    image: "/assets/freelikes-screen.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "MariaDB",
      "Tailwind",
      "Prisma",
    ],
    githubUrl: "https://github.com/Kvnq-Poza",
    liveUrl: "https://freelikes.org/",
    featured: true,
    date: "2025",
  },
  {
    id: 2,
    title: "Trakka App",
    description:
      "A Progressive Web App (PWA) that lets users track incomes, expenses, and budgets, visualize their finances, mark budget checklist, and get insights on their income.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["TypeScript", "Next.js"],
    githubUrl: "https://github.com/Kvnq-Poza",
    liveUrl: "https://#",
    featured: true,
    date: "2025",
    status: "Coming soon",
  },
  {
    id: 3,
    title: "Freetools App",
    description:
      "A free tool library with a wide range of online tools aimed at boosting productivity and simplifing tasks",
    image: "/assets/freetools-screen.png",
    technologies: [
      "HTML5",
      "CSS3",
      "Javascript",
      "Node.JS",
      "Python",
      "Contentful",
    ],
    githubUrl: "https://github.com/Kvnq-Poza",
    liveUrl: "https://freetools.org",
    featured: false,
    date: "2024",
  },
  {
    id: 4,
    title: "Guesser",
    description: "A simple number guessing game",
    image: "/assets/guesser-screen.png",
    technologies: ["Javascript", "CSS3", "HTML5"],
    githubUrl: "https://github.com/Kvnq-Poza",
    liveUrl: "https://topnum-guesser.netlify.app",
    featured: false,
    date: "2023",
  },
  {
    id: 5,
    title: "Weather-App",
    description:
      "Pulls request from the Open Weather API to give real-time weather information on any region",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Python", "HTML5"],
    githubUrl: "https://github.com/Kvnq-Poza/weatherapp",
    liveUrl: "https://github.com/Kvnq-Poza/weatherapp",
    featured: false,
    date: "2022",
  },
  {
    id: 6,
    title: "SaveYT",
    description:
      "A downloader app which enables easy downloads of YouTube videos into mp3 and mp4 formats",
    image: "/assets/saveyt-screen.png",
    technologies: ["Python", "React", "Tailwind", "Node.JS", "Socket.io"],
    githubUrl: "https://github.com/Kvnq-Poza",
    liveUrl: "https://saveyt.co",
    featured: false,
    date: "2024",
  },
];
