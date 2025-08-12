"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      expand={true}
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--card-bg)",
          border: "2px solid var(--primary-color)",
          color: "var(--text-color)",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 5px 10px rgba(40, 39, 39, 0.15)",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--card-bg)] group-[.toaster]:text-[var(--text-color)] group-[.toaster]:border-[var(--primary-color)] group-[.toaster]:shadow-2xl animate-in slide-in-from-top-2 duration-300",
          description: "group-[.toast]:text-[var(--text-secondary)]",
          actionButton:
            "group-[.toast]:bg-[var(--primary-color)] group-[.toast]:text-[var(--button-text)]",
          cancelButton:
            "group-[.toast]:bg-[var(--bg-secondary)] group-[.toast]:text-[var(--text-secondary)]",
          closeButton:
            "group-[.toast]:bg-[var(--bg-secondary)] group-[.toast]:text-[var(--text-color)] group-[.toast]:border-[var(--border-color)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
