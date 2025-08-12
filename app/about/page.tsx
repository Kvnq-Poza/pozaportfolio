"use client";

import { motion } from "framer-motion";
import { CustomCursor } from "@/components/custom-cursor";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Globe, Server, Zap, Egg } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGlobalState } from "@/contexts/global-context";
import { EGGS, ABOUT_SKILLS, EXPERIENCES, STORY } from "@/lib/constants";
import Image from "next/image";

export default function AboutPage() {
  const { addEasterEgg } = useGlobalState();

  const triggerAboutEgg = () =>
    addEasterEgg(EGGS.ABOUT_HEADER.id, EGGS.ABOUT_HEADER.points);
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
        className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]"
        style={{ fontFamily: "var(--font-family)" }}
      >
        <main className="container mx-auto px-4 py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:space-y-16"
          >
            {/* Header */}
            <div className="text-center space-y-4">
              <motion.h1
                className="text-3xl md:text-5xl lg:text-7xl font-bold text-[var(--text-color)]"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {"> About Me"}
              </motion.h1>
              <p className="text-base lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto px-4">
                Fullstack dev with a focus on building scalable applications.
              </p>
            </div>

            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center"
            >
              <div className="space-y-4 lg:space-y-6 order-2 md:order-1">
                <h2 className="text-xl lg:text-3xl font-bold text-[var(--text-color)]">
                  {STORY.heading}
                </h2>
                <div className="space-y-3 lg:space-y-4 text-[var(--text-secondary)]">
                  {STORY.paragraphs.map((text, idx) => (
                    <p key={idx} className="text-sm lg:text-base">
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <motion.div
                className="relative order-1 md:order-2"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-[var(--bg-color)] border-2 border-[var(--border-color)] p-1 rounded-lg max-w-sm mx-auto">
                  <div className="bg-[var(--bg-color)] rounded overflow-hidden relative">
                    {/* Console header (click/tap to collect) */}
                    <div
                      className="relative bg-[var(--primary-color)]/20 border-b border-[var(--border-color)] p-2 flex items-center space-x-2 cursor-pointer select-none outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-transparent"
                      onClick={triggerAboutEgg}
                      onKeyDown={(e) => onKeyActivate(e, triggerAboutEgg)}
                      title="Window header"
                      aria-label="Tap window header"
                      tabIndex={0}
                      role="button"
                    >
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full" />
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-yellow-500 rounded-full" />
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full" />
                      <span className="text-[var(--text-color)] text-xs ml-2">
                        poza.jpg
                      </span>

                      {/* Subtle egg hint */}
                      <Egg
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40 animate-pulse"
                        aria-hidden="true"
                      />
                    </div>
                    <img
                      src="/poza-moji-x.png"
                      alt="Poza working illustration"
                      className="w-full h-64 md:h-80 lg:h-96 object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Skills Section - Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 lg:space-y-8"
            >
              <h2 className="text-xl lg:text-3xl font-bold text-center text-[var(--text-color)]">
                {"> Technical Skills"}
              </h2>
              <div className="relative">
                <Carousel className="w-full max-w-5xl mx-auto">
                  <CarouselContent>
                    {ABOUT_SKILLS.map((skill, index) => (
                      <CarouselItem
                        key={skill.name}
                        className="md:basis-1/3 lg:basis-1/4"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="p-1"
                        >
                          <Card className="bg-[var(--bg-color)] border-2 border-[var(--border-color)] h-full">
                            <CardContent className="flex flex-col items-center justify-center p-4 lg:p-6 space-y-3 lg:space-y-4">
                              <div className={`p-3 lg:p-4`}>
                                <div className="relative w-7 h-7 lg:w-10 lg:h-10">
                                  <Image
                                    src={skill.icon}
                                    alt={`${skill.name} icon`}
                                    fill
                                    sizes="(max-width: 768px) 20px, 32px"
                                    className="object-contain"
                                    priority={index < 4}
                                  />
                                </div>
                              </div>
                              <h3 className="text-sm lg:text-lg font-semibold text-[var(--text-color)]">
                                {skill.name}
                              </h3>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <div className="flex justify-center mt-4 space-x-4">
                    <CarouselPrevious
                      className="relative translate-y-0 left-0 border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--primary-color)]/20"
                      style={{ color: "var(--text-color)" }}
                    />
                    <CarouselNext
                      className="relative translate-y-0 right-0 border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--primary-color)]/20"
                      style={{ color: "var(--text-color)" }}
                    />
                  </div>
                </Carousel>
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="space-y-6 lg:space-y-8"
            >
              <h2 className="text-xl lg:text-3xl font-bold text-center text-[var(--text-color)]">
                {"> Experience"}
              </h2>
              <div className="space-y-4 lg:space-y-8">
                {EXPERIENCES.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.2 }}
                    className="relative"
                  >
                    <Card className="bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--primary-color)] transition-colors">
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-base lg:text-xl font-semibold text-[var(--text-color)]">
                              {exp.title}
                            </h3>
                            <p className="text-sm lg:text-base text-[var(--text-secondary)]">
                              {exp.company}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="mt-2 md:mt-0 text-xs lg:text-sm"
                            style={{
                              backgroundColor: "var(--badge-bg)",
                              color: "var(--badge-text)",
                            }}
                          >
                            {exp.period}
                          </Badge>
                        </div>
                        <p className="text-[var(--text-secondary)] text-sm lg:text-base">
                          {exp.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
