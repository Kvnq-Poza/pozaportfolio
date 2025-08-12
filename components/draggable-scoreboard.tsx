"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, GripHorizontal, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { SCOREBOARD, UI } from "@/lib/constants";

interface DraggableScoreboardProps {
  points: number;
}

export function DraggableScoreboard({ points }: DraggableScoreboardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [previousPoints, setPreviousPoints] = useState(points);
  const [isVisible, setIsVisible] = useState(true);
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 375
  );

  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isMobile = useIsMobile();

  // Track viewport width for mobile slide positions
  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize, {
      passive: true,
    } as AddEventListenerOptions);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Initialize audio context lazily
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
  }, []);

  const playSuccessSound = useCallback(() => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }, []);

  const scheduleAutoHide = useCallback(() => {
    if (!isMobile) return;
    if (autoHideTimer) clearTimeout(autoHideTimer);
    const timer = setTimeout(
      () => setIsVisible(false),
      SCOREBOARD.mobileAutoHideMs
    );
    setAutoHideTimer(timer);
  }, [isMobile, autoHideTimer]);

  // Show scoreboard on mobile when points change; slide in for 5s
  useEffect(() => {
    if (points > previousPoints) {
      setShowCelebration(true);
      playSuccessSound();

      if (isMobile) {
        setIsVisible(true);
        scheduleAutoHide();
      }

      const timer = setTimeout(
        () => setShowCelebration(false),
        SCOREBOARD.celebrationDurationMs
      );
      setPreviousPoints(points);
      return () => clearTimeout(timer);
    }
  }, [points, previousPoints, playSuccessSound, isMobile, scheduleAutoHide]);

  // Initial visibility depending on device
  useEffect(() => {
    if (isMobile) {
      setIsVisible(false); // hidden until points update
    } else {
      setIsVisible(true); // always visible on desktop
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
        setAutoHideTimer(null);
      }
    }
  }, [isMobile, autoHideTimer]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (autoHideTimer) clearTimeout(autoHideTimer);
    };
  }, [autoHideTimer]);

  const getRank = (p: number) => {
    if (p >= 100)
      return { rank: "Master", color: "from-yellow-400 to-orange-400" };
    if (p >= 50)
      return { rank: "Explorer", color: "from-purple-400 to-pink-400" };
    if (p >= 25)
      return { rank: "Discoverer", color: "from-blue-400 to-cyan-400" };
    if (p >= 10)
      return { rank: "Seeker", color: "from-green-400 to-emerald-400" };
    return { rank: "Newcomer", color: "from-gray-400 to-gray-500" };
  };
  const { rank, color } = getRank(points);

  const mobileVisibleX = Math.max(
    viewportWidth -
      SCOREBOARD.width -
      SCOREBOARD.marginRight -
      UI.terminalBtnRight,
    0
  );
  const mobileHiddenX = viewportWidth + 8; // a little off-screen

  return (
    <div
      ref={constraintsRef}
      className="fixed inset-0 pointer-events-none z-40"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            drag={!isMobile}
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            initial={
              isMobile
                ? { x: mobileHiddenX, y: SCOREBOARD.mobileOffsetY }
                : { x: SCOREBOARD.desktopOffsetX, y: SCOREBOARD.desktopOffsetY }
            }
            animate={
              isMobile
                ? { x: mobileVisibleX, y: SCOREBOARD.mobileOffsetY }
                : { x: SCOREBOARD.desktopOffsetX, y: SCOREBOARD.desktopOffsetY }
            }
            exit={isMobile ? { x: mobileHiddenX, opacity: 0 } : { opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: SCOREBOARD.springStiffness,
              damping: SCOREBOARD.springDamping,
            }}
            className="pointer-events-auto absolute"
            whileHover={{ scale: isMobile ? 1 : 1.05 }}
            whileDrag={{ scale: 1.05, rotate: 2 }}
            style={{
              cursor: isMobile ? "default" : "move",
              width: SCOREBOARD.width,
            }}
            aria-live="polite"
            aria-label="Easter egg score"
          >
            <motion.div
              animate={
                showCelebration
                  ? {
                      scale: [1, 1.15, 1],
                      rotate: [0, -3, 3, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`bg-[var(--card-bg)] backdrop-blur-sm rounded-lg border-2 border-[var(--border-color)] p-3 transition-all duration-300 ${
                isDragging
                  ? "shadow-2xl shadow-[var(--primary-color)]/20"
                  : "shadow-lg"
              } ${
                showCelebration
                  ? "shadow-2xl shadow-[var(--primary-color)]/40"
                  : ""
              }`}
              style={{ fontFamily: "var(--font-family)" }}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {!isMobile && (
                    <GripHorizontal
                      className="h-4 w-4 text-[var(--text-secondary)]"
                      aria-hidden="true"
                    />
                  )}
                  <motion.div
                    animate={{
                      rotate: showCelebration
                        ? [0, 360, 720]
                        : points > 0
                        ? 360
                        : 0,
                      scale: showCelebration ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: showCelebration ? 1 : 0.5 }}
                  >
                    <Trophy
                      className="h-5 w-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <motion.span
                      className="text-[var(--text-color)] font-mono text-sm font-semibold"
                      animate={showCelebration ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      Points: {points}
                    </motion.span>
                    <motion.div
                      animate={
                        showCelebration
                          ? { rotate: [0, 360], scale: [1, 1.3, 1] }
                          : {}
                      }
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Star
                        className="h-3 w-3 text-yellow-400"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    animate={showCelebration ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <Badge
                      className={`bg-gradient-to-r ${color} text-white text-xs mt-1`}
                    >
                      {rank}
                    </Badge>
                  </motion.div>
                </div>
              </div>

              {points === 0 && (
                <p className="text-[var(--text-secondary)] text-xs mt-2 font-mono">
                  &gt; Explore to find easter eggs!
                </p>
              )}

              {/* Celebration particles */}
              <AnimatePresence>
                {showCelebration &&
                  [...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute pointer-events-none"
                      initial={{ x: 20, y: 20, scale: 0, rotate: 0 }}
                      animate={{
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                        scale: [0, 1, 0],
                        rotate: 360,
                      }}
                      exit={{ scale: 0 }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.08,
                        ease: "easeOut",
                      }}
                    >
                      <Sparkles
                        className="h-4 w-4 text-yellow-400"
                        aria-hidden="true"
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
