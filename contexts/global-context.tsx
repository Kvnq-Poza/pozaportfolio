"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { DraggableScoreboard } from "@/components/draggable-scoreboard"
import { GlobalTerminalButton } from "@/components/global-terminal-button"
import { Terminal } from "@/components/terminal"
import { ThemeCustomizer } from "@/components/theme-customizer"

interface EasterEgg {
  id: string
  points: number
  timestamp: number
}

interface TerminalHistory {
  command: string
  output: string[]
  timestamp: number
}

interface GlobalState {
  // Easter Eggs
  easterEggPoints: number
  discoveredEggs: EasterEgg[]
  addEasterEgg: (eggId: string, points: number) => void
  resetEasterEggs: () => void

  // Terminal
  showTerminal: boolean
  terminalHistory: TerminalHistory[]
  setShowTerminal: (show: boolean) => void
  addToTerminalHistory: (command: string, output: string[]) => void
  clearTerminalHistory: () => void

  // Navigation
  navigateFromTerminal: (path: string) => void
}

const GlobalContext = createContext<GlobalState | null>(null)

export function useGlobalState() {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error("useGlobalState must be used within GlobalStateProvider")
  }
  return context
}

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [easterEggPoints, setEasterEggPoints] = useState(0)
  const [discoveredEggs, setDiscoveredEggs] = useState<EasterEgg[]>([])
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistory[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  const router = useRouter()

  // Initialize state from localStorage
  useEffect(() => {
    if (typeof window === "undefined" || isInitialized) return

    try {
      // Load easter eggs
      const savedEggs = localStorage.getItem("portfolio-easter-eggs")
      if (savedEggs) {
        const eggs = JSON.parse(savedEggs) as EasterEgg[]
        setDiscoveredEggs(eggs)
        const totalPoints = eggs.reduce((sum, egg) => sum + egg.points, 0)
        setEasterEggPoints(totalPoints)
      }

      // Load terminal history
      const savedHistory = localStorage.getItem("portfolio-terminal-history")
      if (savedHistory) {
        const history = JSON.parse(savedHistory) as TerminalHistory[]
        setTerminalHistory(history)
      }

      setIsInitialized(true)
    } catch (error) {
      console.error("Failed to load saved state:", error)
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Save easter eggs to localStorage
  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem("portfolio-easter-eggs", JSON.stringify(discoveredEggs))
  }, [discoveredEggs, isInitialized])

  // Save terminal history to localStorage
  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem("portfolio-terminal-history", JSON.stringify(terminalHistory))
  }, [terminalHistory, isInitialized])

  const addEasterEgg = useCallback((eggId: string, points: number) => {
    setDiscoveredEggs((prev) => {
      const exists = prev.find((egg) => egg.id === eggId)
      if (exists) return prev

      const newEgg: EasterEgg = {
        id: eggId,
        points,
        timestamp: Date.now(),
      }

      setEasterEggPoints((prevPoints) => prevPoints + points)
      return [...prev, newEgg]
    })
  }, [])

  const resetEasterEggs = useCallback(() => {
    setEasterEggPoints(0)
    setDiscoveredEggs([])
    localStorage.removeItem("portfolio-easter-eggs")
  }, [])

  const addToTerminalHistory = useCallback((command: string, output: string[]) => {
    const newEntry: TerminalHistory = {
      command,
      output,
      timestamp: Date.now(),
    }
    setTerminalHistory((prev) => [...prev, newEntry])
  }, [])

  const clearTerminalHistory = useCallback(() => {
    setTerminalHistory([])
    localStorage.removeItem("portfolio-terminal-history")
  }, [])

  const navigateFromTerminal = useCallback(
    (path: string) => {
      setShowTerminal(false)
      router.push(path)
    },
    [router],
  )

  const contextValue: GlobalState = {
    easterEggPoints,
    discoveredEggs,
    addEasterEgg,
    resetEasterEggs,
    showTerminal,
    terminalHistory,
    setShowTerminal,
    addToTerminalHistory,
    clearTerminalHistory,
    navigateFromTerminal,
  }

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}

      {/* Global UI Elements - only render after initialization */}
      {isInitialized && (
        <>
          <DraggableScoreboard points={easterEggPoints} />
          <GlobalTerminalButton onClick={() => setShowTerminal(true)} />
          <ThemeCustomizer />

          <AnimatePresence>
            {showTerminal && (
              <Terminal
                onClose={() => setShowTerminal(false)}
                onEasterEgg={addEasterEgg}
                history={terminalHistory}
                onAddHistory={addToTerminalHistory}
                onNavigate={navigateFromTerminal}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </GlobalContext.Provider>
  )
}
