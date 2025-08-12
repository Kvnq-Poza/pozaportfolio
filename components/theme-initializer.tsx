"use client"

import { useEffect } from "react"

interface ThemeConfig {
  mode: "dark" | "light"
  primaryColor: string
  accentColor: string
  fontFamily: "mono" | "sans"
}

const colorMap = {
  green: { primary: "#22c55e", accent: "#16a34a" },
  blue: { primary: "#3b82f6", accent: "#2563eb" },
  purple: { primary: "#a855f7", accent: "#9333ea" },
  red: { primary: "#ef4444", accent: "#dc2626" },
  orange: { primary: "#f97316", accent: "#ea580c" },
  pink: { primary: "#ec4899", accent: "#db2777" },
  cyan: { primary: "#06b6d4", accent: "#0891b2" },
}

export function ThemeInitializer() {
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("portfolio-theme")
      if (savedTheme) {
        const theme = JSON.parse(savedTheme) as ThemeConfig
        const root = document.documentElement

        const colors = colorMap[theme.primaryColor as keyof typeof colorMap] || colorMap.green

        root.style.setProperty("--primary-color", colors.primary)
        root.style.setProperty("--accent-color", colors.accent)

        if (theme.mode === "light") {
          root.style.setProperty("--bg-color", "#ffffff")
          root.style.setProperty("--bg-secondary", "#f8fafc")
          root.style.setProperty("--text-color", "#1f2937")
          root.style.setProperty("--text-secondary", "#6b7280")
          root.style.setProperty("--card-bg", "rgba(255, 255, 255, 0.95)")
          root.style.setProperty("--nav-bg", "rgba(255, 255, 255, 0.95)")
          root.style.setProperty("--button-bg", colors.primary)
          root.style.setProperty("--button-text", "#ffffff")
          root.style.setProperty("--button-hover", colors.accent)
          root.style.setProperty("--badge-bg", colors.primary)
          root.style.setProperty("--badge-text", "#ffffff")
        } else {
          root.style.setProperty("--bg-color", "#000000")
          root.style.setProperty("--bg-secondary", "#0f0f0f")
          root.style.setProperty("--text-color", colors.primary)
          root.style.setProperty("--text-secondary", colors.accent)
          root.style.setProperty("--card-bg", "rgba(0, 0, 0, 0.9)")
          root.style.setProperty("--nav-bg", "rgba(0, 0, 0, 0.95)")
          root.style.setProperty("--button-bg", colors.primary)
          root.style.setProperty("--button-text", "#000000")
          root.style.setProperty("--button-hover", colors.accent)
          root.style.setProperty("--badge-bg", colors.primary)
          root.style.setProperty("--badge-text", "#000000")
        }

        root.style.setProperty("--border-color", colors.primary)
        root.style.setProperty(
          "--font-family",
          theme.fontFamily === "mono" ? "'JetBrains Mono', 'Courier New', monospace" : "'Inter', system-ui, sans-serif",
        )
      }
    } catch (e) {
      console.error("Failed to apply saved theme:", e)
    }
  }, [])

  return null
}
