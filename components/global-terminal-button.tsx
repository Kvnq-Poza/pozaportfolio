"use client"

import { motion } from "framer-motion"
import { Terminal } from 'lucide-react'
import { UI } from "@/lib/constants"

interface GlobalTerminalButtonProps {
  onClick: () => void
}

export function GlobalTerminalButton({ onClick }: GlobalTerminalButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed z-40 backdrop-blur-sm p-3 shadow-lg transition-all duration-200 border-2 flex items-center justify-center rounded-xl"
      style={{
        // Rounded square button aligned to constants
        width: UI.terminalBtnSize,
        height: UI.terminalBtnSize,
        bottom: UI.terminalBtnBottom,
        right: UI.terminalBtnRight,
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
        color: "var(--primary-color)",
        fontFamily: "var(--font-family)",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px var(--primary-color)",
        color: "var(--accent-color)",
        borderColor: "var(--accent-color)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      aria-label="Open terminal"
    >
      <Terminal className="h-5 w-5" />
      <span className="sr-only">Open Terminal</span>
    </motion.button>
  )
}
