"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Star,
  Eye,
  GitFork,
  Egg,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomCursor } from "@/components/custom-cursor";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/contexts/global-context";
import { EGGS, PROJECTS } from "@/lib/constants";

export default function ProjectsPage() {
  const router = useRouter();
  const { addEasterEgg } = useGlobalState();

  const handleGetInTouch = () => {
    router.push("/contact");
  };

  const triggerProjectsEgg = () =>
    addEasterEgg(EGGS.PROJECTS_TITLE.id, EGGS.PROJECTS_TITLE.points);
  const onKeyActivate = (e: React.KeyboardEvent, fn: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  const featuredProjects = PROJECTS.filter((project) => project.featured);
  const otherProjects = PROJECTS.filter((project) => !project.featured);

  return (
    <>
      <CustomCursor />
      <div
        className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] py-20"
        style={{ fontFamily: "var(--font-family)" }}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1
              className="relative text-4xl lg:text-6xl font-bold text-[var(--text-color)] mb-4 cursor-pointer select-none inline-block outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 rounded-md"
              onClick={triggerProjectsEgg}
              onKeyDown={(e) => onKeyActivate(e, triggerProjectsEgg)}
              aria-label="Tap to discover a surprise"
              role="button"
              tabIndex={0}
            >
              {"> My Projects"}
              <Egg
                className="absolute -top-3 -right-4 h-4 w-4 opacity-40 animate-pulse"
                aria-hidden="true"
              />
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              A collection of projects I've built using various technologies.
              Each project represents a unique challenge and learning
              experience.
            </p>
          </motion.div>

          {/* Featured Projects */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-[var(--text-color)] mb-8 flex items-center gap-2">
              <Star
                className="h-8 w-8 text-[var(--primary-color)]"
                aria-hidden="true"
              />
              Featured Projects
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="cursor-pointer"
                >
                  <Card className="border-[var(--border-color)] bg-[var(--bg-color)] overflow-hidden hover:border-[var(--primary-color)] transition-colors h-full">
                    <div className="relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="default"
                          className="bg-[var(--primary-color)] text-white"
                        >
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-[var(--text-color)] text-xl">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          {project.date}
                        </div>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      {/* Technologies */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          className="bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-white border-0 flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveUrl, "_blank");
                          }}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white bg-transparent flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubUrl, "_blank");
                          }}
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Other Projects */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[var(--text-color)] mb-8 flex items-center gap-2">
              <Tag
                className="h-8 w-8 text-[var(--primary-color)]"
                aria-hidden="true"
              />
              Other Projects
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="cursor-pointer"
                >
                  <Card className="border-[var(--border-color)] bg-[var(--bg-color)] overflow-hidden hover:border-[var(--primary-color)] transition-colors h-full">
                    <div className="relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-[var(--text-color)] text-lg">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-[var(--text-secondary)] text-xs">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          {project.date}
                        </div>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-white border-0 flex-1 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveUrl, "_blank");
                          }}
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Demo
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white bg-transparent flex-1 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubUrl, "_blank");
                          }}
                        >
                          <Github className="mr-1 h-3 w-3" />
                          Code
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-16"
          >
            <Card className="border-[var(--border-color)] bg-[var(--primary-color)]/10 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-4">
                  Interested in working together?
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  I'm always open to discussing new opportunities and
                  interesting projects. Let's create something amazing!
                </p>
                <Button
                  size="lg"
                  className="bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-white border-0"
                  onClick={handleGetInTouch}
                >
                  Get In Touch
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
