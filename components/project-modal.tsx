"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Clock,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

interface UrlMetadata {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  url: string;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [urlMetadata, setUrlMetadata] = useState<UrlMetadata | null>(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  useEffect(() => {
    if (isOpen && project?.liveUrl && project.liveUrl !== "https://#") {
      fetchUrlMetadata(project.liveUrl);
    }
  }, [isOpen, project?.liveUrl]);

  const fetchUrlMetadata = async (url: string) => {
    setIsLoadingMetadata(true);
    try {
      const response = await fetch(
        `/api/url-metadata?url=${encodeURIComponent(url)}`
      );
      if (response.ok) {
        const metadata = await response.json();
        setUrlMetadata(metadata);
      }
    } catch (error) {
      console.error("Failed to fetch URL metadata:", error);
    } finally {
      setIsLoadingMetadata(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "coming soon":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "in progress":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "on hold":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      case "archived":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-7xl max-h-[90vh] bg-[var(--bg-color)] rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[var(--bg-color)]/95 backdrop-blur border-b border-[var(--border-color)] p-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[var(--text-color)] truncate pr-4">
                {project.title}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[var(--text-color)] hover:bg-[var(--border-color)]"
                  onClick={() => window.open(project.liveUrl, "_blank")}
                  disabled={
                    project.status === "Coming soon" ||
                    project.liveUrl === "https://#"
                  }
                >
                  <Link2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[var(--text-color)] hover:bg-[var(--border-color)]"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="grid xl:grid-cols-5 lg:grid-cols-3 gap-8 p-8">
                {/* Left Column - Project Details */}
                <div className="xl:col-span-3 lg:col-span-2 space-y-8">
                  {/* Basic Info */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-semibold text-[var(--text-color)]">
                        Role - {project.role}
                      </h3>
                      {project.status && (
                        <Badge
                          variant="outline"
                          className={`${getStatusBadgeColor(
                            project.status
                          )} flex items-center gap-1 px-3 py-1`}
                        >
                          <Clock className="h-3 w-3" />
                          {project.status}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <h4 className="text-base font-medium text-[var(--text-color)] mb-3">
                      Project Description
                    </h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                      {project.description}
                    </p>
                  </div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div>
                      <h4 className="text-base font-medium text-[var(--text-color)] mb-4">
                        Features
                      </h4>
                      <ul className="space-y-3">
                        {project.features.map(
                          (feature: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-center gap-3 text-[var(--text-secondary)]"
                            >
                              <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full flex-shrink-0" />
                              <span className="text-base">{feature}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Architecture */}
                  {project.architecture && project.architecture.length > 0 && (
                    <div>
                      <h4 className="text-base font-medium text-[var(--text-color)] mb-4">
                        Architecture & Implementation
                      </h4>
                      <ul className="space-y-3">
                        {project.architecture.map(
                          (item: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-center gap-3 text-[var(--text-secondary)]"
                            >
                              <div className="w-2 h-2 bg-[var(--accent-color)] rounded-full flex-shrink-0" />
                              <span className="text-base">{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Skills and Technologies */}
                  <div>
                    <h4 className="text-base font-medium text-[var(--text-color)] mb-4">
                      Skills and Technologies
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech: string) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-[var(--primary-color)]/10 text-[var(--primary-color)] border-[var(--primary-color)]/20 px-3 py-1 text-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <Button
                      size="lg"
                      className="bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-white border-0 flex-1 h-12"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                      disabled={
                        project.status === "Coming soon" ||
                        project.liveUrl === "https://#"
                      }
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      {project.status === "Coming soon"
                        ? "Coming Soon"
                        : "Live Demo"}
                    </Button>
                    {project.githubUrl && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white bg-transparent flex-1 h-12"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <Github className="mr-2 h-5 w-5" />
                        View Code
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right Column - Media and Metadata */}
                <div className="xl:col-span-2 lg:col-span-1 space-y-8">
                  {/* Project Year */}
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Calendar className="h-5 w-5" />
                    <span className="text-base">
                      Published on {project.year}
                    </span>
                  </div>

                  {/* Project Image */}
                  {project.image &&
                    project.image !==
                      "/placeholder.svg?height=300&width=500" && (
                      <div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 lg:h-80 xl:h-96 object-cover rounded-lg border border-[var(--border-color)] shadow-lg"
                        />
                      </div>
                    )}

                  {/* URL Preview Card */}
                  {project.liveUrl && project.liveUrl !== "https://#" && (
                    <Card className="border-[var(--border-color)] bg-[var(--bg-color)] overflow-hidden shadow-md">
                      <CardContent className="p-0">
                        {isLoadingMetadata ? (
                          <div className="p-6">
                            <div className="animate-pulse space-y-4">
                              <div className="h-40 bg-[var(--border-color)] rounded"></div>
                              <div className="h-5 bg-[var(--border-color)] rounded w-3/4"></div>
                              <div className="h-4 bg-[var(--border-color)] rounded w-1/2"></div>
                            </div>
                          </div>
                        ) : urlMetadata ? (
                          <div
                            className="cursor-pointer hover:bg-[var(--border-color)]/20 transition-colors"
                            onClick={() =>
                              window.open(project.liveUrl, "_blank")
                            }
                          >
                            {urlMetadata.image && (
                              <img
                                src={urlMetadata.image}
                                alt={urlMetadata.title || project.title}
                                className="w-full h-48 lg:h-56 object-cover"
                              />
                            )}
                            <div className="p-6">
                              <h5 className="font-medium text-[var(--text-color)] mb-2 line-clamp-1 text-lg">
                                {urlMetadata.title || project.title}
                              </h5>
                              {urlMetadata.description && (
                                <p className="text-base text-[var(--text-secondary)] line-clamp-3 mb-3">
                                  {urlMetadata.description}
                                </p>
                              )}
                              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                {urlMetadata.favicon && (
                                  <img
                                    src={urlMetadata.favicon}
                                    alt=""
                                    className="w-5 h-5"
                                  />
                                )}
                                <span className="truncate">
                                  {new URL(project.liveUrl).hostname}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="p-6 cursor-pointer hover:bg-[var(--border-color)]/20 transition-colors"
                            onClick={() =>
                              window.open(project.liveUrl, "_blank")
                            }
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-[var(--primary-color)]/20 rounded flex items-center justify-center">
                                <ExternalLink className="w-5 h-5 text-[var(--primary-color)]" />
                              </div>
                              <div>
                                <p className="font-medium text-[var(--text-color)] text-base">
                                  {project.title}
                                </p>
                                <p className="text-sm text-[var(--text-secondary)] truncate">
                                  {new URL(project.liveUrl).hostname}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
