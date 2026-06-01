"use client";

import { useTheme } from "@/app/providers";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="font-mono text-meta uppercase tracking-[0.08em] inline-flex items-center gap-1"
    >
      <span
        className={`px-1.5 py-0.5 ${
          theme === "dark"
            ? "bg-[var(--fg)] text-[var(--bg)]"
            : "opacity-50"
        }`}
      >
        dark
      </span>
      <span className="opacity-40">·</span>
      <span
        className={`px-1.5 py-0.5 ${
          theme === "light"
            ? "bg-[var(--fg)] text-[var(--bg)]"
            : "opacity-50"
        }`}
      >
        light
      </span>
    </button>
  );
}
