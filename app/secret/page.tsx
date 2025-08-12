"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CustomCursor } from "@/components/custom-cursor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Shuffle, RotateCcw, Clock, Target, Crown, Sparkles, Eye, Download, Mail, Egg, Heading } from 'lucide-react'
import { useGlobalState } from "@/contexts/global-context"
import { ALL_EGGS } from "@/lib/constants"

interface MemoryCard {
  id: number
  icon: any
  isFlipped: boolean
  isMatched: boolean
  points: number
}

interface GameRecord {
  bestTime: number
  bestMoves: number
}

const SecretPage = () => {
  const { easterEggPoints, discoveredEggs, addEasterEgg } = useGlobalState()
  const [gameScore, setGameScore] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Memory Game State
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [moves, setMoves] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null)
  const [gameRecords, setGameRecords] = useState<GameRecord>({ bestTime: 0, bestMoves: 0 })
  const [newRecord, setNewRecord] = useState<{ time: boolean; moves: boolean }>({ time: false, moves: false })
  const [showRecordCelebration, setShowRecordCelebration] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Save game records to localStorage
  const saveGameRecords = useCallback(
    (records: GameRecord) => {
      if (!isClient) return
      localStorage.setItem("memory-game-records", JSON.stringify(records))
      setGameRecords(records)
    },
    [isClient],
  )

  const initializeMemoryGame = useCallback(() => {
    if (!isClient) return

    const icons = [Trophy, Star, Eye, Download, Mail, Sparkles, Crown, Target]
    const gameCards: MemoryCard[] = []

    icons.forEach((icon, index) => {
      gameCards.push(
        { id: index * 2, icon, isFlipped: false, isMatched: false, points: 5 },
        { id: index * 2 + 1, icon, isFlipped: false, isMatched: false, points: 5 },
      )
    })

    const shuffled = gameCards.sort(() => Math.random() - 0.5)
    setMemoryCards(shuffled)
    setFlippedCards([])
    setMoves(0)
    setTimeElapsed(0)
    setGameCompleted(false)
    setNewRecord({ time: false, moves: false })
    setShowRecordCelebration(false)
  }, [isClient])

  const startGameTimer = useCallback(() => {
    if (gameTimer) clearInterval(gameTimer)
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)
    setGameTimer(timer)
  }, [gameTimer])

  const checkForNewRecords = useCallback(
    (finalMoves: number, finalTime: number) => {
      const records = { ...gameRecords }
      let hasNewRecord = false
      const newRecordState = { time: false, moves: false }

      if (gameRecords.bestTime === 0 || finalTime < gameRecords.bestTime) {
        records.bestTime = finalTime
        newRecordState.time = true
        hasNewRecord = true
      }
      if (gameRecords.bestMoves === 0 || finalMoves < gameRecords.bestMoves) {
        records.bestMoves = finalMoves
        newRecordState.moves = true
        hasNewRecord = true
      }

      if (hasNewRecord) {
        setNewRecord(newRecordState)
        setShowRecordCelebration(true)
        saveGameRecords(records)

        const recordBonus = (newRecordState.time ? 25 : 0) + (newRecordState.moves ? 25 : 0)
        if (recordBonus > 0) {
          addEasterEgg(`record-${Date.now()}`, recordBonus)
          setGameScore((prev) => prev + recordBonus)
        }

        setTimeout(() => {
          setShowRecordCelebration(false)
        }, 4000)
      }
    },
    [gameRecords, saveGameRecords, addEasterEgg],
  )

  const handleMemoryCardClick = useCallback(
    (cardId: number) => {
      if (flippedCards.length >= 2) return
      if (flippedCards.includes(cardId)) return
      if (memoryCards.find((card) => card.id === cardId)?.isMatched) return

      if (!gameStarted) {
        setGameStarted(true)
        startGameTimer()
      }

      const newFlippedCards = [...flippedCards, cardId]
      setFlippedCards(newFlippedCards)

      setMemoryCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))

      if (newFlippedCards.length === 2) {
        setMoves((prev) => prev + 1)

        const [firstId, secondId] = newFlippedCards
        const firstCard = memoryCards.find((card) => card.id === firstId)
        const secondCard = memoryCards.find((card) => card.id === secondId)

        if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
          setTimeout(() => {
            setMemoryCards((prev) =>
              prev.map((card) => (card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card)),
            )
            setFlippedCards([])

            const matchPoints = 10
            setGameScore((prev) => prev + matchPoints)

            const updatedCards = memoryCards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card,
            )

            if (updatedCards.every((card) => card.isMatched)) {
              setGameCompleted(true)
              if (gameTimer) clearInterval(gameTimer)

              const finalMoves = moves + 1
              const finalTime = timeElapsed

              const bonusPoints = Math.max(50 - finalMoves * 2, 10)
              setGameScore((prev) => prev + bonusPoints)
              addEasterEgg(`game-completion-${Date.now()}`, bonusPoints)

              checkForNewRecords(finalMoves, finalTime)
            }
          }, 1000)
        } else {
          setTimeout(() => {
            setMemoryCards((prev) =>
              prev.map((card) => (card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card)),
            )
            setFlippedCards([])
          }, 1000)
        }
      }
    },
    [flippedCards, memoryCards, gameStarted, startGameTimer, moves, gameTimer, addEasterEgg, timeElapsed, checkForNewRecords],
  )

  const resetMemoryGame = () => {
    if (gameTimer) clearInterval(gameTimer)
    setGameStarted(false)
    setGameCompleted(false)
    initializeMemoryGame()
  }

  useEffect(() => {
    if (!isClient) return
    const savedRecords = localStorage.getItem("memory-game-records")
    if (savedRecords) setGameRecords(JSON.parse(savedRecords))
    initializeMemoryGame()
    return () => {
      if (gameTimer) clearInterval(gameTimer)
    }
  }, [initializeMemoryGame, isClient]) // eslint-disable-line react-hooks/exhaustive-deps

  const collectedIds = new Set(discoveredEggs.map((e) => e.id))
  const collectedCount = ALL_EGGS.filter((e) => collectedIds.has(e.id)).length

  if (!isClient) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg-color)" }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2" style={{ borderColor: "var(--primary-color)" }} />
            <p className="mt-4" style={{ color: "var(--text-color)" }}>
              Loading secret room...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen overflow-hidden transition-all duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)", fontFamily: "var(--font-family)" }}>
        <main className="container mx-auto px-4 py-20 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8 lg:space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <motion.h1 className="text-3xl md:text-5xl lg:text-7xl font-bold font-mono" style={{ color: "var(--primary-color)" }} initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
                {"> 🎉 Secret Gaming Room! 🎉"}
              </motion.h1>
              <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-mono px-4" style={{ color: "var(--text-secondary)" }}>
                Play the memory game and see your Easter Egg progress below. Eggs are collected on other pages.
              </p>
            </div>

            {/* Game Stats */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 max-w-6xl mx-auto">
              <Card className="text-center transition-all duration-300" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-color)" }}>
                <CardContent className="p-3 lg:p-4">
                  <Trophy className="h-5 w-5 lg:h-6 lg:w-6 mx-auto mb-2" style={{ color: "var(--primary-color)" }} />
                  <p className="text-base lg:text-lg font-bold font-mono">{easterEggPoints}</p>
                  <p className="text-xs lg:text-sm" style={{ color: "var(--text-secondary)" }}>
                    Total Points
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-all duration-300" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-color)" }}>
                <CardContent className="p-3 lg:p-4">
                  <Star className="h-5 w-5 lg:h-6 lg:w-6 mx-auto mb-2" style={{ color: "var(--primary-color)" }} />
                  <p className="text-base lg:text-lg font-bold font-mono">{collectedCount}/{ALL_EGGS.length}</p>
                  <p className="text-xs lg:text-sm" style={{ color: "var(--text-secondary)" }}>
                    Eggs Collected
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-all duration-300" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-color)" }}>
                <CardContent className="p-3 lg:p-4">
                  <Target className="h-5 w-5 lg:h-6 lg:w-6 mx-auto mb-2" style={{ color: "var(--primary-color)" }} />
                  <p className="text-base lg:text-lg font-bold font-mono">{moves}</p>
                  <p className="text-xs lg:text-sm" style={{ color: "var(--text-secondary)" }}>
                    Moves
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-all duration-300" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-color)" }}>
                <CardContent className="p-3 lg:p-4">
                  <Clock className="h-5 w-5 lg:h-6 lg:w-6 mx-auto mb-2" style={{ color: "var(--primary-color)" }} />
                  <p className="text-base lg:text-lg font-bold font-mono">
                    {`${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, "0")}`}
                  </p>
                  <p className="text-xs lg:text-sm" style={{ color: "var(--text-secondary)" }}>
                    Time
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-all duration-300 col-span-2 md:col-span-1" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-color)" }}>
                <CardContent className="p-3 lg:p-4">
                  <Crown className="h-5 w-5 lg:h-6 lg:w-6 mx-auto mb-2" style={{ color: "var(--primary-color)" }} />
                  <p className="text-base lg:text-lg font-bold font-mono">{gameScore}</p>
                  <p className="text-xs lg:text-sm" style={{ color: "var(--text-secondary)" }}>
                    Game Score
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Memory Game */}
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold font-mono" style={{ color: "var(--primary-color)" }}>
                  Memory Challenge
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4">
                  <Button onClick={resetMemoryGame} className="flex items-center justify-center space-x-2 w-full sm:w-auto" style={{ backgroundColor: "var(--primary-color)", color: "var(--button-text)", borderColor: "var(--primary-color)" }}>
                    <Shuffle className="h-4 w-4" />
                    <span>New Game</span>
                  </Button>
                  <Button onClick={resetMemoryGame} variant="outline" className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-transparent" style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}>
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 lg:gap-4 max-w-sm lg:max-w-2xl mx-auto">
                {memoryCards.map((card) => (
                  <motion.button
                    key={card.id}
                    className="aspect-square cursor-pointer outline-none focus:ring-2 focus:ring-[var(--primary-color)] rounded-md"
                    onClick={() => handleMemoryCardClick(card.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Memory card"
                  >
                    <div
                      className={`w-full h-full rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                        card.isFlipped || card.isMatched ? "rotate-0" : "rotate-180"
                      }`}
                      style={{
                        backgroundColor: card.isFlipped || card.isMatched ? "var(--card-bg)" : "var(--primary-color)",
                        borderColor: "var(--border-color)",
                        opacity: card.isMatched ? 0.6 : 1,
                      }}
                    >
                      {card.isFlipped || card.isMatched ? (
                        <card.icon className="h-6 w-6 lg:h-8 lg:w-8" style={{ color: "var(--primary-color)" }} />
                      ) : (
                        <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full" style={{ backgroundColor: "var(--button-text)" }} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Easter Egg Progress (reflect updated eggs) */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-bold text-center" style={{ color: "var(--primary-color)" }}>
                Easter Egg Progress
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {ALL_EGGS.map((egg) => {
                  const collected = collectedIds.has(egg.id)
                  return (
                    <Card key={egg.id} className={`transition-colors ${collected ? "border-[var(--primary-color)]" : "border-[var(--border-color)]"}`} style={{ backgroundColor: "var(--card-bg)" }} aria-disabled="true">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${collected ? "bg-[var(--primary-color)]/20" : "bg-transparent"}`}>
                          <Egg className="h-5 w-5" style={{ color: collected ? "var(--primary-color)" : "var(--text-secondary)" }} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold" style={{ color: "var(--text-color)" }}>
                            {egg.label}
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                            {collected ? "Collected" : "Not collected"}
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs"
                          style={{
                            backgroundColor: collected ? "var(--badge-bg)" : "transparent",
                            color: collected ? "var(--badge-text)" : "var(--text-secondary)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          {collected ? "✓" : "•"}
                        </Badge>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  )
}

export default SecretPage
