"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Settings, X, Palette, Sun, Moon } from 'lucide-react'
import { UI } from "@/lib/constants"

interface ThemeConfig {
  mode: "dark" | "light"
  primaryColor: string
  accentColor: string
  fontFamily: "mono" | "sans"
}

const defaultTheme: ThemeConfig = {
  mode: "dark",
  primaryColor: "green",
  accentColor: "green",
  fontFamily: "mono",
}

const colorOptions = [
  { name: "Green", value: "green", colors: { primary: "#22c55e", accent: "#16a34a" } },
  { name: "Blue", value: "blue", colors: { primary: "#3b82f6", accent: "#2563eb" } },
  { name: "Purple", value: "purple", colors: { primary: "#a855f7", accent: "#9333ea" } },
  { name: "Red", value: "red", colors: { primary: "#ef4444", accent: "#dc2626" } },
  { name: "Orange", value: "orange", colors: { primary: "#f97316", accent: "#ea580c" } },
  { name: "Pink", value: "pink", colors: { primary: "#ec4899", accent: "#db2777" } },
  { name: "Cyan", value: "cyan", colors: { primary: "#06b6d4", accent: "#0891b2" } },
]

const applyThemeToDOM = (theme: ThemeConfig) => {
  const root = document.documentElement
  const selectedColor = colorOptions.find((c) => c.value === theme.primaryColor)

  if (selectedColor) {
    root.style.setProperty("--primary-color", selectedColor.colors.primary)
    root.style.setProperty("--accent-color", selectedColor.colors.accent)
  }

  if (theme.mode === "light") {
    root.style.setProperty("--bg-color", "#ffffff")
    root.style.setProperty("--bg-secondary", "#f8fafc")
    root.style.setProperty("--text-color", "#1f2937")
    root.style.setProperty("--text-secondary", "#6b7280")
    root.style.setProperty("--border-color", selectedColor?.colors.primary || "#22c55e")
    root.style.setProperty("--card-bg", "rgba(255, 255, 255, 0.95)")
    root.style.setProperty("--nav-bg", "rgba(255, 255, 255, 0.95)")
    root.style.setProperty("--button-bg", selectedColor?.colors.primary || "#22c55e")
    root.style.setProperty("--button-text", "#ffffff")
    root.style.setProperty("--button-hover", selectedColor?.colors.accent || "#16a34a")
    root.style.setProperty("--badge-bg", selectedColor?.colors.primary || "#22c55e")
    root.style.setProperty("--badge-text", "#ffffff")
  } else {
    root.style.setProperty("--bg-color", "#000000")
    root.style.setProperty("--bg-secondary", "#0f0f0f")
    root.style.setProperty("--text-color", selectedColor?.colors.primary || "#22c55e")
    root.style.setProperty("--text-secondary", selectedColor?.colors.accent || "#16a34a")
    root.style.setProperty("--border-color", selectedColor?.colors.primary || "#22c55e")
    root.style.setProperty("--card-bg", "rgba(0, 0, 0, 0.9)")
    root.style.setProperty("--nav-bg", "rgba(0, 0, 0, 0.95)")
    root.style.setProperty("--button-bg", selectedColor?.colors.primary || "#22c55e")
    root.style.setProperty("--button-text", "#000000")
    root.style.setProperty("--button-hover", selectedColor?.colors.accent || "#16a34a")
    root.style.setProperty("--badge-bg", selectedColor?.colors.primary || "#22c55e")
    root.style.setProperty("--badge-text", "#000000")
  }

  root.style.setProperty(
    "--font-family",
    theme.fontFamily === "mono" ? "'JetBrains Mono', 'Courier New', monospace" : "'Inter', system-ui, sans-serif",
  )

  localStorage.setItem("portfolio-theme", JSON.stringify(theme))
  window.dispatchEvent(new CustomEvent("themeChanged", { detail: theme }))
}

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)
  const [isInitialized, setIsInitialized] = useState(false)

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || isInitialized) return

    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        setTheme(parsedTheme)
        applyThemeToDOM(parsedTheme)
      } catch {
        applyThemeToDOM(defaultTheme)
      }
    } else {
      applyThemeToDOM(defaultTheme)
    }
    setIsInitialized(true)
  }, [isInitialized])

  const updateTheme = useCallback((updates: Partial<ThemeConfig>) => {
    setTheme((prev) => {
      const next = { ...prev, ...updates }
      applyThemeToDOM(next)
      return next
    })
  }, [])

  const resetTheme = useCallback(() => {
    setTheme(defaultTheme)
    applyThemeToDOM(defaultTheme)
  }, [])

  // Position the customizer directly above the terminal button with a gap, both rounded squares
  const customizerBottomPx = UI.terminalBtnBottom + UI.terminalBtnSize + UI.floatingGap

  return (
    <>
      {/* Floating Settings Button — rounded square aligned above terminal with a gap */}
      <motion.div
        className="fixed z-50"
        style={{
          bottom: customizerBottomPx,
          right: UI.terminalBtnRight,
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="backdrop-blur-sm p-3 shadow-lg transition-all duration-200 border-2 rounded-xl"
          style={{
            width: UI.terminalBtnSize,
            height: UI.terminalBtnSize,
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            color: "var(--accent-color)",
            fontFamily: "var(--font-family)",
          }}
          aria-label="Open theme customizer"
        >
          <motion.div aria-hidden="true" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <Settings className="h-5 w-5" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Theme customizer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-[var(--card-bg)] backdrop-blur-sm border-2 border-[var(--border-color)] rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ fontFamily: "var(--font-family)" }}
            >
              <Card className="border-0 bg-transparent">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-[var(--text-color)] text-lg lg:text-xl flex items-center gap-2">
                    <Palette className="h-5 w-5" aria-hidden="true" />
                    Theme Studio
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-[var(--text-color)] hover:bg-[var(--primary-color)]/20 rounded-full"
                    aria-label="Close theme customizer"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Appearance */}
                  <div className="space-y-4">
                    <Label className="text-[var(--text-color)] font-semibold text-sm lg:text-base">Appearance</Label>
                    <div className="relative bg-[var(--bg-secondary)] rounded-xl p-1 border border-[var(--border-color)]/30">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateTheme({ mode: "dark" })}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                            theme.mode === "dark"
                              ? "bg-[var(--primary-color)] text-[var(--button-text)] shadow-lg"
                              : "text-[var(--accent-color)] hover:text-[var(--primary-color)] hover:bg-[var(--accent-color)]/10"
                          }`}
                          aria-pressed={theme.mode === "dark"}
                        >
                          <Moon className="h-4 w-4" />
                          <span className="text-sm font-medium">Dark</span>
                        </button>
                        <button
                          onClick={() => updateTheme({ mode: "light" })}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                            theme.mode === "light"
                              ? "bg-[var(--primary-color)] text-[var(--button-text)] shadow-lg"
                              : "text-[var(--accent-color)] hover:text-[var(--primary-color)] hover:bg-[var(--accent-color)]/10"
                          }`}
                          aria-pressed={theme.mode === "light"}
                        >
                          <Sun className="h-4 w-4" />
                          <span className="text-sm font-medium">Light</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Color Theme */}
                  <div className="space-y-4">
                    <Label className="text-[var(--text-color)] font-semibold text-sm lg:text-base">Color Theme</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {colorOptions.map((color) => (
                        <motion.button
                          key={color.value}
                          onClick={() => updateTheme({ primaryColor: color.value, accentColor: color.value })}
                          className={`relative w-14 h-14 rounded-xl border-2 transition-all duration-300 ${
                            theme.primaryColor === color.value
                              ? "border-white scale-110 shadow-lg"
                              : "border-gray-600/50 hover:scale-105 hover:border-gray-400"
                          }`}
                          style={{
                            background: `linear-gradient(135deg, ${color.colors.primary}, ${color.colors.accent})`,
                          }}
                          title={color.name}
                          aria-label={`Use ${color.name} theme`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="space-y-4">
                    <Label className="text-[var(--text-color)] font-semibold text-sm lg:text-base">Typography</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={theme.fontFamily === "mono" ? "default" : "outline"}
                        onClick={() => updateTheme({ fontFamily: "mono" })}
                        className={`h-12 text-sm ${
                          theme.fontFamily === "mono"
                            ? "bg-[var(--primary-color)] text-[var(--button-text)] border-[var(--primary-color)]"
                            : "border-[var(--border-color)]/50 text-[var(--accent-color)] hover:border-[var(--border-color)] bg-transparent hover:bg-[var(--accent-color)]/10 hover:text-[var(--primary-color)]"
                        }`}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        aria-pressed={theme.fontFamily === "mono"}
                      >
                        <code>Mono</code>
                      </Button>
                      <Button
                        variant={theme.fontFamily === "sans" ? "default" : "outline"}
                        onClick={() => updateTheme({ fontFamily: "sans" })}
                        className={`h-12 text-sm ${
                          theme.fontFamily === "sans"
                            ? "bg-[var(--primary-color)] text-[var(--button-text)] border-[var(--primary-color)]"
                            : "border-[var(--border-color)]/50 text-[var(--accent-color)] hover:border-[var(--border-color)] bg-transparent hover:bg-[var(--accent-color)]/10 hover:text-[var(--primary-color)]"
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        aria-pressed={theme.fontFamily === "sans"}
                      >
                        Sans
                      </Button>
                    </div>
                  </div>

                  {/* Reset */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={resetTheme}
                      variant="outline"
                      className="w-full h-12 border-[var(--border-color)]/50 text-[var(--accent-color)] hover:bg-[var(--accent-color)]/10 hover:border-[var(--border-color)] bg-transparent text-sm hover:text-[var(--primary-color)]"
                    >
                      Reset to Default
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
