"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface ProjectCardProps {
  project: any;
  index: number;
  onProjectClick: (project: any) => void;
  featured?: boolean;
}

interface UrlMetadata {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  url: string;
}

export function ProjectCard({
  project,
  index,
  onProjectClick,
  featured = false,
}: ProjectCardProps) {
  const [urlMetadata, setUrlMetadata] = useState<UrlMetadata | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Fetch URL metadata if no project image is provided and URL is valid
    if (
      (!project.image ||
        project.image === "/placeholder.svg?height=300&width=500") &&
      project.liveUrl &&
      project.liveUrl !== "https://#"
    ) {
      fetchUrlMetadata(project.liveUrl);
    }
  }, [project]);

  const fetchUrlMetadata = async (url: string) => {
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

  const getProjectImage = () => {
    // Use project image if available and not placeholder
    if (
      project.image &&
      project.image !== "/placeholder.svg?height=300&width=500" &&
      !imageError
    ) {
      return project.image;
    }

    // Use URL metadata image if available
    if (urlMetadata?.image) {
      return urlMetadata.image;
    }

    // Fallback to placeholder
    return "/placeholder.svg?height=300&width=500";
  };

  const handleCardClick = () => {
    onProjectClick(project);
  };

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.1 }}
        whileHover={{ y: -5 }}
        className="cursor-pointer"
        onClick={handleCardClick}
      >
        <Card className="border-[var(--border-color)] bg-[var(--bg-color)] overflow-hidden hover:border-[var(--primary-color)] transition-colors h-full">
          <div className="relative">
            <img
              src={getProjectImage()}
              alt={project.title}
              className="w-full h-48 object-cover"
              onError={() => setImageError(true)}
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge
                variant="default"
                className="bg-[var(--primary-color)] text-white"
              >
                Featured
              </Badge>
              {project.status && (
                <Badge
                  variant="outline"
                  className={`${getStatusBadgeColor(
                    project.status
                  )} flex items-center gap-1`}
                >
                  <Clock className="h-3 w-3" />
                  {project.status}
                </Badge>
              )}
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <CardTitle className="text-[var(--text-color)] text-xl">
                {project.title}
              </CardTitle>
              <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {project.year}
              </div>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {project.description}
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="sm"
                className="bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-white border-0 flex-1"
                onClick={(e) =>
                  handleButtonClick(e, () =>
                    window.open(project.liveUrl, "_blank")
                  )
                }
                disabled={
                  project.status === "Coming soon" ||
                  project.liveUrl === "https://#"
                }
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {project.status === "Coming soon" ? "Coming Soon" : "Live Demo"}
              </Button>
              {project.githubUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white bg-transparent flex-1"
                  onClick={(e) =>
                    handleButtonClick(e, () =>
                      window.open(project.githubUrl, "_blank")
                    )
                  }
                >
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Non-featured project card
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 + index * 0.1 }}
      whileHover={{ y: -3 }}
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <Card className="border-[var(--border-color)] bg-[var(--bg-color)] overflow-hidden hover:border-[var(--primary-color)] transition-colors h-full">
        <div className="relative">
          <img
            src={getProjectImage()}
            alt={project.title}
            className="w-full h-40 object-cover"
            onError={() => setImageError(true)}
          />
          {project.status && (
            <div className="absolute top-3 right-3">
              <Badge
                variant="outline"
                className={`${getStatusBadgeColor(
                  project.status
                )} text-xs flex items-center gap-1`}
              >
                <Clock className="h-2 w-2" />
                {project.status}
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-[var(--text-color)] text-lg">
              {project.title}
            </CardTitle>
            <div className="flex items-center gap-1 text-[var(--text-secondary)] text-xs">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {project.year}
            </div>
          </div>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech: string) => (
                <Badge key={tech} variant="secondary" className="text-xs">
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
              onClick={(e) =>
                handleButtonClick(e, () =>
                  window.open(project.liveUrl, "_blank")
                )
              }
              disabled={
                project.status === "Coming soon" ||
                project.liveUrl === "https://#"
              }
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              {project.status === "Coming soon" ? "Soon" : "Demo"}
            </Button>
            {project.githubUrl && (
              <Button
                size="sm"
                variant="outline"
                className="border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white bg-transparent flex-1 text-xs"
                onClick={(e) =>
                  handleButtonClick(e, () =>
                    window.open(project.githubUrl, "_blank")
                  )
                }
              >
                <Github className="mr-1 h-3 w-3" />
                Code
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
