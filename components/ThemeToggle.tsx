"use client";

import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export default function ThemeToggle() {
  // Starts `false` on both server and first client render to avoid a
  // hydration mismatch; the effect then syncs to the real applied theme.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted transition-colors hover:text-foreground"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <SunMedium className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}
