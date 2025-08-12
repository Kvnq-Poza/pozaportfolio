"use client";

import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Calendar,
  Award,
  Code,
  Users,
  Zap,
  Egg,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CustomCursor } from "@/components/custom-cursor";
import { useGlobalState } from "@/contexts/global-context";
import { EGGS, POZA_DATA } from "@/lib/constants";

export default function ResumePage() {
  const { addEasterEgg } = useGlobalState();

  const handleDownloadPDF = async () => {
    try {
      // Convert Google Docs sharing URL to export URL for PDF download
      const googleDocsUrl =
        "https://docs.google.com/document/d/1onrV-XzU3mq5vf3emlcNFa0HcLc6Xg0msIbdgNxIfGc/edit?usp=sharing";
      const docId = googleDocsUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];

      if (docId) {
        // Use the export URL for direct PDF download
        const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=pdf`;

        // Create a temporary link and trigger download
        const link = document.createElement("a");
        link.href = exportUrl;
        link.download = "Poza_Resume.pdf";
        link.target = "_blank"; // Open in new tab as fallback
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Fallback: open the original URL in new tab
        window.open(googleDocsUrl, "_blank");
      }

      addEasterEgg(EGGS.RESUME_DOWNLOAD.id, EGGS.RESUME_DOWNLOAD.points);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open the original URL
      window.open(
        "https://docs.google.com/document/d/1onrV-XzU3mq5vf3emlcNFa0HcLc6Xg0msIbdgNxIfGc/edit?usp=sharing",
        "_blank"
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Poza's Resume",
          text: "Check out my resume!",
          url: window.location.href,
        });
      } catch {
        // noop
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <CustomCursor />
      <div
        className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] py-20"
        style={{ fontFamily: "var(--font-family)" }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Actions */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative flex flex-wrap gap-4 mb-8 justify-center lg:justify-end print:hidden"
          >
            {/* Subtle egg hint near the download button */}
            <div className="absolute -top-3 right-0">
              <Egg
                className="h-4 w-4 opacity-40 animate-pulse"
                aria-hidden="true"
              />
            </div>

            <Button
              onClick={handleDownloadPDF}
              className="w-[150px] bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-white border-0 rounded-xl h-10"
              aria-label="Download resume PDF"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="h-10 rounded-xl border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white bg-transparent"
              aria-label="Print resume"
            >
              Print
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="h-10 rounded-xl border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white bg-transparent"
              aria-label="Share resume"
            >
              Share
            </Button>
          </motion.div>

          {/* Resume Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg p-8 shadow-lg print:shadow-none print:border-none"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                className="text-4xl lg:text-5xl font-bold text-[var(--text-color)] mb-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                Poza
              </motion.h1>
              <motion.p
                className="text-xl text-[var(--text-secondary)] mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Full Stack Developer
              </motion.p>

              {/* Contact Info */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 text-sm text-[var(--text-secondary)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>kpozadev@gmail.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>Lagos, NG</span>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex justify-center gap-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="#"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-color)] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-color)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </motion.div>
            </div>

            <Separator className="my-8 bg-[var(--border-color)]" />

            {/* Professional Summary */}
            <motion.section
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
                <Users
                  className="h-6 w-6 text-[var(--primary-color)]"
                  aria-hidden="true"
                />
                Professional Summary
              </h2>
              <p className="text-[var(--text-color)] leading-relaxed">
                {POZA_DATA.professional_summary}
              </p>
            </motion.section>

            {/* Technical Skills */}
            <motion.section
              className="mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
                <Code
                  className="h-6 w-6 text-[var(--primary-color)]"
                  aria-hidden="true"
                />
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {POZA_DATA.technical_skills.map((skillGroup) => (
                  <div key={skillGroup.skill}>
                    <h3 className="text-lg font-semibold text-[var(--text-color)] mb-3">
                      {skillGroup.skill}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skill_list.map((skill) => (
                        <Badge
                          key={skill}
                          variant="default"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Education */}
            <motion.section
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
                <Award
                  className="h-6 w-6 text-[var(--primary-color)]"
                  aria-hidden="true"
                />
                Education
              </h2>
              <Card className="border-[var(--border-color)] bg-transparent">
                <CardHeader>
                  <CardTitle className="text-[var(--text-color)]">
                    Bachelor of Science in Biology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-color)]">
                    Lagos State University, Lagos, Nigeria
                  </p>
                </CardContent>
              </Card>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </>
  );
}
