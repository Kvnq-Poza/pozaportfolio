"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CustomCursor } from "@/components/custom-cursor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Mail,
  Github,
  Linkedin,
  Twitter,
  BookOpen,
  Eye,
  Egg,
} from "lucide-react";
import { useGlobalState } from "@/contexts/global-context";
import { EGGS, UI, SKILLS, POZA_DATA } from "@/lib/constants";

export default function HomePage() {
  const { addEasterEgg } = useGlobalState();

  const handleHeroImageClick = useCallback(() => {
    addEasterEgg(EGGS.HOME_HERO.id, EGGS.HOME_HERO.points);
  }, [addEasterEgg]);

  const handleTitleClick = useCallback(() => {
    addEasterEgg(EGGS.HOME_TITLE.id, EGGS.HOME_TITLE.points);
  }, [addEasterEgg]);

  const onKeyActivate = (e: React.KeyboardEvent, fn: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  return (
    <>
      <CustomCursor />
      <div
        className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] overflow-hidden"
        style={{ fontFamily: "var(--font-family)" }}
      >
        <main className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 lg:space-y-8"
            >
              <motion.div
                className="space-y-3 lg:space-y-6"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.h1
                  role="button"
                  tabIndex={0}
                  onClick={handleTitleClick}
                  onKeyDown={(e) => onKeyActivate(e, handleTitleClick)}
                  className="relative cursor-pointer select-none text-2xl md:text-4xl lg:text-7xl font-bold text-[var(--text-color)] outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  aria-label="Tap to discover a surprise"
                >
                  {"> Hello World! 👋"}
                  {/* Subtle egg hint for title */}
                  <span className="absolute -top-3 -right-3">
                    <Egg
                      className="h-4 w-4 opacity-40 animate-pulse"
                      aria-hidden="true"
                    />
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 lg:space-y-4"
                >
                  <h2 className="text-lg md:text-xl lg:text-4xl text-[var(--text-secondary)]">
                    $ whoami
                  </h2>
                  <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded p-3 lg:p-4">
                    <p className="text-[var(--text-color)] text-xs lg:text-base">
                      <span className="text-[var(--text-secondary)]">
                        Name:
                      </span>{" "}
                      {POZA_DATA.name}
                    </p>
                    <p className="text-[var(--text-color)] text-xs lg:text-base">
                      <span className="text-[var(--text-secondary)]">
                        Role:
                      </span>{" "}
                      {POZA_DATA.role}
                    </p>
                    <p className="text-[var(--text-color)] text-xs lg:text-base">
                      <span className="text-[var(--text-secondary)]">
                        Experience:
                      </span>{" "}
                      {POZA_DATA.experience}
                    </p>
                    <p className="text-[var(--text-color)] text-xs lg:text-base">
                      <span className="text-[var(--text-secondary)]">
                        Status:
                      </span>{" "}
                      {POZA_DATA.available
                        ? "Available for hire"
                        : "Not available for hire"}
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-3 lg:space-y-4"
              >
                <h3 className="text-sm lg:text-lg text-[var(--text-secondary)]">
                  $ ls ./skills
                </h3>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {SKILLS.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <Badge
                        variant="default"
                        className="text-xs lg:text-sm"
                        style={{
                          backgroundColor: "var(--badge-bg)",
                          color: "var(--badge-text)",
                        }}
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4"
              >
                <Link href="/resume">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-[var(--button-text)] border-0 text-xs lg:text-base"
                  >
                    <Download className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                    {"./resume"}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-[var(--button-text)] text-xs lg:text-base bg-transparent"
                  >
                    <Mail className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                    {"./contact"}
                  </Button>
                </Link>
                <a
                  href="https://medium.com/@kvnqpoza"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-[var(--button-text)] text-xs lg:text-base bg-transparent"
                  >
                    <BookOpen className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                    {"./blog"}
                  </Button>
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex space-x-4 lg:space-x-6 pt-4"
              >
                {[
                  {
                    icon: Github,
                    href: "https://github.com/Kvnq-Poza",
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/kvnqpoza02344/",
                    label: "LinkedIn",
                  },
                  {
                    icon: Twitter,
                    href: "https://x.com/KvnqPoza",
                    label: "Twitter",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-color)] transition-colors"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="h-4 w-4 lg:h-6 lg:w-6" />
                    <span className="sr-only">{label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image with hints */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative order-first lg:order-last"
            >
              <motion.div
                className="relative group cursor-pointer"
                transition={{ type: "spring", stiffness: 300 }}
                onClick={handleHeroImageClick}
                onKeyDown={(e) => onKeyActivate(e, handleHeroImageClick)}
                tabIndex={0}
                role="button"
                aria-label="Tap the image window"
              >
                <div className="relative w-full h-[250px] lg:h-[500px] bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-lg p-1">
                  <div className="w-full h-full bg-[var(--bg-color)] rounded overflow-hidden relative">
                    <div className="bg-[var(--primary-color)]/20 border-b border-[var(--border-color)] p-2 flex items-center space-x-2">
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full" />
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-yellow-500 rounded-full" />
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full" />
                      <span className="text-[var(--text-color)] text-xs ml-2">
                        poza.jpg
                      </span>
                    </div>

                    <img
                      src="/poza-moji-x.png"
                      alt="Poza - Fullstack Developer"
                      className="w-full h-[calc(100%-32px)] lg:h-[calc(100%-40px)] object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Subtle egg hints */}
                    <motion.div
                      className="absolute bottom-2 right-2 text-[var(--text-secondary)] text-xs opacity-50"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{
                        duration: UI.hintPulseDurationMs / 1000,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Eye
                        className="h-3 w-3 lg:h-4 lg:w-4"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Hint</span>
                    </motion.div>

                    <div className="absolute top-2 left-2">
                      <Egg
                        className="h-4 w-4 opacity-40 animate-pulse"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
