"use client";

import { motion } from "framer-motion";
import { Star, Tag, Egg } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CustomCursor } from "@/components/custom-cursor";
import { ProjectModal } from "@/components/project-modal";
import { ProjectCard } from "@/components/project-card";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/contexts/global-context";
import { EGGS, PROJECTS } from "@/lib/constants";
import { useState } from "react";

export default function ProjectsPage() {
  const router = useRouter();
  const { addEasterEgg } = useGlobalState();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
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
              experience. Click on any project to view more details.
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
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onProjectClick={handleProjectClick}
                  featured={true}
                />
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
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onProjectClick={handleProjectClick}
                  featured={false}
                />
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

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
}
