"use client";

import { Moon, SunMedium } from "lucide-react";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const THEME_EVENT = "themechange";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, () => false);

  function toggle() {
    const next = !isDark;
    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {}
      window.dispatchEvent(new Event(THEME_EVENT));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduced) document.startViewTransition(apply);
    else apply();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-btn"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      {isDark ? <SunMedium className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
    </button>
  );
}
