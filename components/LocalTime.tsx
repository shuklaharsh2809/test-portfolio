"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/lib/data";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: profile.timeZone,
});

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 1000 * 15);
  return () => window.clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
const getServerSnapshot = () => "--:--";

export default function LocalTime({ withZone = true }: { withZone?: boolean }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time}
      {withZone ? " IST" : null}
    </span>
  );
}
