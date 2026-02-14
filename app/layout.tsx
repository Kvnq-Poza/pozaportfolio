import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalStateProvider } from "@/contexts/global-context";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import { ThemeInitializer } from "@/components/theme-initializer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poza - Software Developer",
  description:
    "Portfolio of an engineer who helps SaaS startups ship production-ready, scalable backends",
  keywords: [
    "developer",
    "portfolio",
    "software developer",
    "react",
    "nextjs",
    "typescript",
  ],
  authors: [{ name: "Poza" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="theme-transition">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalStateProvider>
            <ThemeInitializer />
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </GlobalStateProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
