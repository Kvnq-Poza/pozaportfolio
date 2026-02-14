"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TerminalHistory {
  command: string;
  output: string[];
  timestamp: number;
}

interface TerminalProps {
  onClose: () => void;
  onEasterEgg: (eggId: string, points: number) => void;
  history: TerminalHistory[];
  onAddHistory: (command: string, output: string[]) => void;
  onNavigate: (path: string) => void;
}

const AVAILABLE_COMMANDS = [
  "help",
  "clear",
  "whoami",
  "ls",
  "pwd",
  "date",
  "echo",
  "cd",
  "cat",
  "readme",
  "history",
  "exit",
] as const;

const AVAILABLE_PATHS = [
  "/",
  "/about",
  "/projects",
  "/resume",
  "/contact",
  "/secret",
] as const;

const MAX_HISTORY_LINES = 600;
const MAX_OUTPUT_LINES_PER_CMD = 400;
const MAX_LINE_LENGTH = 2000;

function sanitizeLines(lines: string[]): string[] {
  return lines
    .map((l) => l.replace(/[\u0000-\u001F\u007F]/g, ""))
    .map((l) =>
      l.length > MAX_LINE_LENGTH ? l.slice(0, MAX_LINE_LENGTH) + "…" : l
    )
    .slice(0, MAX_OUTPUT_LINES_PER_CMD);
}

export function Terminal({
  onClose,
  onEasterEgg,
  history,
  onAddHistory,
  onNavigate,
}: TerminalProps) {
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState("/");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [displayHistory, setDisplayHistory] = useState<string[]>([
    "🚀 Welcome to Poza's Dev Console v1.0",
    'Type "help" to see available commands',
    "",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayHistory]);

  // Mount existing history
  useEffect(() => {
    const persistentHistory = history.flatMap((entry) => [
      `$ ${entry.command}`,
      ...entry.output,
      "",
    ]);
    if (persistentHistory.length > 0) {
      setDisplayHistory((prev) => {
        const next = [...prev, ...persistentHistory];
        return next.slice(-MAX_HISTORY_LINES);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close terminal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const getAutocompleteSuggestions = useCallback((inputValue: string) => {
    const parts = inputValue.trim().split(" ");
    const command = parts[0];
    const arg = parts[1] || "";

    if (parts.length === 1) {
      return AVAILABLE_COMMANDS.filter((cmd) => cmd.startsWith(command));
    }

    if (command === "cd" && parts.length === 2) {
      return AVAILABLE_PATHS.filter((path) => path.startsWith(arg));
    }

    return [];
  }, []);

  const handleTabComplete = useCallback(() => {
    const sgs = getAutocompleteSuggestions(input);
    if (sgs.length === 1) {
      const parts = input.trim().split(" ");
      if (parts.length === 1) {
        setInput(sgs[0] + " ");
      } else {
        parts[parts.length - 1] = sgs[0];
        setInput(parts.join(" "));
      }
    } else if (sgs.length > 1) {
      setSuggestions(sgs);
      setShowSuggestions(true);
    }
  }, [input, getAutocompleteSuggestions]);

  const showOutput = (commandStr: string, outputLines: string[]) => {
    const clean = sanitizeLines(outputLines);
    setDisplayHistory((prev) => {
      const next = [...prev, `$ ${commandStr}`, ...clean];
      return next.slice(-MAX_HISTORY_LINES);
    });
    onAddHistory(commandStr, clean);
  };

  const executeCommand = useCallback(
    async (commandStr: string) => {
      const parts = commandStr.trim().split(" ");
      const cmd = (parts[0] || "").toLowerCase();
      const args = parts.slice(1);

      switch (cmd) {
        case "help":
          showOutput(commandStr, [
            "Available commands:",
            "  help     - Show this help message",
            "  clear    - Clear the terminal",
            "  whoami   - Display user information",
            "  ls       - List directory contents",
            "  pwd      - Print working directory",
            "  date     - Show current date and time",
            "  echo     - Display a line of text",
            "  cd       - Change directory",
            "  cat      - Display file contents (readme only)",
            "  readme   - Show the project README",
            "  history  - Show command history",
            "  exit     - Close terminal",
            "",
            "Tip: Try 'readme' or 'cat README.md' for details.",
          ]);
          return;

        case "clear":
          setDisplayHistory([
            "🚀 Welcome to Poza's Dev Console v1.0",
            'Type "help" to see available commands',
            "",
          ]);
          return;

        case "whoami":
          showOutput(commandStr, [
            "poza",
            "Software Developer",
            "Available for hire",
          ]);
          return;

        case "ls":
          if (currentPath === "/") {
            showOutput(commandStr, [
              "about/",
              "projects/",
              "resume/",
              "contact/",
              "secret/",
              "README.md",
            ]);
          } else {
            showOutput(commandStr, ["../", "index.html", "style.css"]);
          }
          return;

        case "pwd":
          showOutput(commandStr, [currentPath]);
          return;

        case "date":
          showOutput(commandStr, [new Date().toString()]);
          return;

        case "echo": {
          const msg = args.join(" ");
          if (msg.toLowerCase().includes("easter")) {
            // small hidden egg
            // not included in the main secret page list
            // but still collectible once
            // worth 5 points
            showOutput(commandStr, [msg]);
            return;
          }
          showOutput(commandStr, [msg]);
          return;
        }

        case "cd": {
          const targetPath = args[0];
          if (!targetPath || targetPath === ".." || targetPath === "/") {
            setCurrentPath("/");
            showOutput(commandStr, ["Changed to root directory"]);
            return;
          }
          if ((AVAILABLE_PATHS as readonly string[]).includes(targetPath)) {
            onNavigate(targetPath);
            return;
          }
          if (targetPath.startsWith("/")) {
            if ((AVAILABLE_PATHS as readonly string[]).includes(targetPath)) {
              onNavigate(targetPath);
              return;
            } else {
              showOutput(commandStr, [
                `cd: ${targetPath}: No such file or directory`,
              ]);
              return;
            }
          }
          const fullPath = targetPath === "." ? currentPath : `/${targetPath}`;
          if ((AVAILABLE_PATHS as readonly string[]).includes(fullPath)) {
            onNavigate(fullPath);
            return;
          } else {
            showOutput(commandStr, [
              `cd: ${targetPath}: No such file or directory`,
            ]);
            return;
          }
        }

        case "cat": {
          const filename = (args[0] || "").toLowerCase();
          if (filename === "readme.md") {
            try {
              const res = await fetch("/api/readme", { cache: "no-store" });
              if (!res.ok) throw new Error("README not found");
              const text = await res.text();
              showOutput(commandStr, text.split("\n"));
            } catch (err: any) {
              showOutput(commandStr, [
                "Error loading README.md",
                String(err?.message || err),
              ]);
            }
          } else if (filename) {
            showOutput(commandStr, [
              `cat: ${filename}: No such file or directory`,
            ]);
          } else {
            showOutput(commandStr, ["cat: missing file operand"]);
          }
          return;
        }

        case "readme": {
          try {
            const res = await fetch("/api/readme", { cache: "no-store" });
            if (!res.ok) throw new Error("README not found");
            const text = await res.text();
            showOutput(commandStr, text.split("\n"));
          } catch (err: any) {
            showOutput(commandStr, [
              "Error loading README.md",
              String(err?.message || err),
            ]);
          }
          return;
        }

        case "history":
          showOutput(
            commandStr,
            history.map((entry, index) => `${index + 1}  ${entry.command}`)
          );
          return;

        case "exit":
          onClose();
          return;

        case "":
          showOutput(commandStr, []);
          return;

        default:
          showOutput(commandStr, [
            `Command not found: ${cmd}. Type 'help' for available commands.`,
          ]);
          return;
      }
    },
    [currentPath, history, onNavigate, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const cmd = input;
      setInput("");
      setHistoryIndex(-1);
      setShowSuggestions(false);
      void executeCommand(cmd);
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabComplete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex].command);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex].command);
        }
      }
    } else if (e.key === "Escape") {
      // keep closing behavior on overlay via window listener
      setShowSuggestions(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Terminal modal"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        className="w-full max-w-4xl h-[600px] bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <TerminalIcon
              className="w-4 h-4 text-gray-400 ml-2"
              aria-hidden="true"
            />
            <span className="text-gray-300 text-sm">Terminal</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-60px)]">
          <div
            ref={terminalRef}
            className="flex-1 p-4 overflow-y-auto font-mono text-sm"
          >
            {displayHistory.map((line, index) => (
              <div
                key={index}
                className="text-green-400 whitespace-pre-wrap mb-1"
              >
                {line}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center text-blue-400">
              <span className="text-green-400">poza@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">{currentPath}</span>
              <span className="text-white">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  const value = e.target.value;
                  setInput(value);
                  setHistoryIndex(-1);
                  if (value.trim()) {
                    const sgs = getAutocompleteSuggestions(value);
                    setSuggestions(sgs);
                    setShowSuggestions(sgs.length > 0);
                  } else {
                    setShowSuggestions(false);
                  }
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white ml-1"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>

            {/* Autocomplete Suggestions */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 p-2 bg-gray-800 rounded border border-gray-600"
                >
                  <div className="text-gray-400 text-xs mb-1">Suggestions:</div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const parts = input.trim().split(" ");
                          if (parts.length === 1) {
                            setInput(suggestion + " ");
                          } else {
                            parts[parts.length - 1] = suggestion;
                            setInput(parts.join(" "));
                          }
                          setShowSuggestions(false);
                          inputRef.current?.focus();
                        }}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
