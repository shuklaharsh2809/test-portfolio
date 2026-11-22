"use client";

import { useSyncExternalStore } from "react";

const ZONE = "Asia/Kolkata";
const timeFormat = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: ZONE });
const dayFormat = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "short", timeZone: ZONE });
const hourFormat = new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: ZONE });

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 15_000);
  return () => window.clearInterval(id);
}

// One joined string keeps the snapshot referentially stable between ticks.
function getSnapshot() {
  const now = new Date();
  return `${timeFormat.format(now)}|${dayFormat.format(now)}|${hourFormat.format(now)}`;
}

/** Current time and day in India, where Harsh works from. */
export default function IndiaTime() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "--:--||12");
  const [time, day, hour] = snapshot.split("|");
  const daytime = Number(hour) >= 7 && Number(hour) < 19;

  return (
    <div className="flex h-full flex-col" suppressHydrationWarning>
      <p className="stat-value tabular-nums" suppressHydrationWarning>
        {time}
      </p>
      <p className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground" suppressHydrationWarning>
        <span className={daytime ? "clock-dot is-day" : "clock-dot"} aria-hidden="true" />
        {day || "India"}
      </p>
      <p className="mt-1 pl-4 text-xs text-muted">IST · UTC+5:30</p>
    </div>
  );
}
