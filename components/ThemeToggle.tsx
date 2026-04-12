"use client";

import { Moon, SunMedium } from "lucide-react";
import { useReducer } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export default function ThemeToggle() {
  const [, rerender] = useReducer((value: number) => value + 1, 0);
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <button
      type="button"
      onClick={() => {
        const nextTheme: Theme = isDark ? "light" : "dark";
        applyTheme(nextTheme);
        rerender();
      }}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm text-muted"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      {isDark ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
