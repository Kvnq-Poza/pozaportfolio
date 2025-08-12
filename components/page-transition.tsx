"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

const wittyPhrases = [
  "> Initializing awesome experience...",
  "> Loading digital magic...",
  "> Compiling creativity...",
  "> Booting up brilliance...",
  "> Executing excellence...",
  "> Processing portfolio data...",
  "> Rendering remarkable content...",
  "> Deploying developer dreams...",
  "> Launching legendary code...",
  "> Starting spectacular session...",
]

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [showInitialLoader, setShowInitialLoader] = useState(true)
  const [currentPhrase, setCurrentPhrase] = useState("")

  useEffect(() => {
    // Only show initial loader on first visit
    if (isInitialLoad) {
      const randomPhrase = wittyPhrases[Math.floor(Math.random() * wittyPhrases.length)]
      setCurrentPhrase(randomPhrase)

      const timer = setTimeout(() => {
        setShowInitialLoader(false)
        setIsInitialLoad(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isInitialLoad])

  // Don't show loader for navigation between pages
  if (!isInitialLoad) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 40,
            duration: 0.3,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {showInitialLoader ? (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <div className="text-center space-y-6">
            {/* Console-style loader */}
            <div className="bg-black border border-green-500 rounded-lg p-6 font-mono">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 text-sm ml-4">poza@portfolio:~</span>
              </div>

              <div className="text-green-400 space-y-2">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  {currentPhrase}
                </motion.div>

                <div className="flex items-center space-x-1">
                  <span>Loading</span>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1,
                        delay: i * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      .
                    </motion.span>
                  ))}
                  <motion.span
                    className="ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    █
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
