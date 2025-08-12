"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (href: string) => {
    if (!href.startsWith("http")) {
      router.prefetch(href);
      router.push(href);
    }
    // Close mobile menu after navigation
    setIsOpen(false);
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      // Force re-render to apply new theme
      setIsOpen((prev) => prev);
    };

    window.addEventListener("themeChanged", handleThemeChange);
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm border-b border-[var(--border-color)]/30 transition-all duration-300"
      style={{
        backgroundColor: "var(--nav-bg)",
        fontFamily: "var(--font-family)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={handleCloseMenu}
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <TerminalIcon className="h-6 w-6 lg:h-8 lg:w-8 text-[var(--primary-color)]" />
            </motion.div>
            <span className="text-lg lg:text-xl font-bold font-mono text-[var(--primary-color)]">
              poza@dev:~$
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono transition-colors hover:text-[var(--primary-color)] text-[var(--text-secondary)]"
                >
                  ./{item.label.toLowerCase()}
                </a>
              ) : (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`relative text-sm font-mono transition-colors hover:text-[var(--primary-color)] ${
                    pathname === item.href
                      ? "text-[var(--primary-color)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  ./{item.label.toLowerCase()}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--primary-color)]"
                    />
                  )}
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 p-2"
            onClick={handleMenuToggle}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseMenu();
                  }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--border-color)]/30 overflow-hidden"
            style={{ backgroundColor: "var(--nav-bg)" }}
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {NAV_ITEMS.map((item, index) =>
                item.external ? (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-mono transition-colors hover:text-[var(--primary-color)] text-[var(--text-secondary)] py-2"
                    onClick={handleCloseMenu}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    ./{item.label.toLowerCase()}
                  </motion.a>
                ) : (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`block w-full text-left text-sm font-mono transition-colors hover:text-[var(--primary-color)] py-2 ${
                      pathname === item.href
                        ? "text-[var(--primary-color)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    ./{item.label.toLowerCase()}
                    {pathname === item.href && (
                      <motion.div
                        className="w-full h-0.5 bg-[var(--primary-color)] mt-1"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
