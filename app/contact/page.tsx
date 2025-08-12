"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Clock,
  CheckCircle,
  Egg,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomCursor } from "@/components/custom-cursor";
import { useGlobalState } from "@/contexts/global-context";
import { toast } from "sonner";
import { EGGS, POZA_DATA } from "@/lib/constants";

export default function ContactPage() {
  const { addEasterEgg } = useGlobalState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setEmailError("");
      if (value && !isValidEmail(value)) {
        setEmailError("Please enter a valid email address");
      }
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before submitting
    if (!isValidEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.", {
          icon: <CheckCircle className="h-4 w-4" />,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        addEasterEgg(EGGS.CONTACT_SUBMIT.id, EGGS.CONTACT_SUBMIT.points);
      } else {
        const error = await response.json();
        toast.error(
          error.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "kpozadev@gmail.com",
      description: "Send me an email anytime",
      action: () => window.open("mailto:kpozadev@gmail.com"),
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Lagos, NG",
      action: () => {},
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/Kvnq-Poza",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kvnqpoza02344/",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://x.com/KvnqPoza",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/kvnq_poza/",
      color: "hover:text-blue-400",
    },
  ];

  return (
    <>
      <CustomCursor />
      <div
        className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] py-20"
        style={{ fontFamily: "var(--font-family)" }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-[var(--text-color)] mb-4">
              {"> Get In Touch"}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from
              you. Let's build something amazing together!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-[var(--border-color)] bg-[var(--bg-color)]">
                <CardHeader className="relative">
                  <CardTitle className="text-2xl text-[var(--text-color)] flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-[var(--primary-color)]" />
                    Send Message
                  </CardTitle>
                  {/* Subtle egg hint near the form title */}
                  <Egg
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40 animate-pulse"
                    aria-hidden="true"
                  />
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[var(--text-color)] mb-2"
                        >
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-[var(--bg-color)] border-[var(--border-color)] text-[var(--text-color)] focus:border-[var(--primary-color)]"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[var(--text-color)] mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`bg-[var(--bg-color)] border-[var(--border-color)] text-[var(--text-color)] focus:border-[var(--primary-color)] ${
                            emailError
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                          placeholder="your.email@example.com"
                        />
                        {emailError && (
                          <p className="text-red-500 text-sm mt-1">
                            {emailError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-[var(--text-color)] mb-2"
                      >
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-[var(--bg-color)] border-[var(--border-color)] text-[var(--text-color)] focus:border-[var(--primary-color)]"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[var(--text-color)] mb-2"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-[var(--bg-color)] border-[var(--border-color)] text-[var(--text-color)] focus:border-[var(--primary-color)] resize-none"
                        placeholder="Tell me about your project or just say hello!"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-white border-0"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Methods */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6">
                  Other Ways to Reach Me
                </h2>
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card
                      className="border-[var(--border-color)] bg-[var(--bg-color)] cursor-pointer hover:border-[var(--primary-color)] transition-colors"
                      onClick={method.action}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[var(--primary-color)]/20 rounded-lg">
                            <method.icon
                              className="h-6 w-6 text-[var(--primary-color)]"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[var(--text-color)] mb-1">
                              {method.title}
                            </h3>
                            <p className="text-[var(--primary-color)] font-medium mb-1">
                              {method.value}
                            </p>
                            <p className="text-sm text-[var(--text-secondary)]">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6">
                  Connect With Me
                </h2>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-4 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg text-[var(--text-secondary)] transition-colors ${social.color}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Card className="border-[var(--border-color)] bg-[var(--primary-color)]/10">
                  {POZA_DATA.available ? (
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h3 className="font-semibold text-[var(--text-color)]">
                          Currently Available
                        </h3>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm">
                        I'm currently available for new projects and
                        collaborations. I typically respond to messages within
                        24 hours.
                      </p>
                    </CardContent>
                  ) : (
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <h3 className="font-semibold text-[var(--text-color)]">
                          Currently Unavailable
                        </h3>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm">
                        I'm currently working on new projects and not available
                        for new opportunities. I'll be back soon!
                      </p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
