"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/data";

/** Cycles through each app's lead screenshot, like a live store listing. */
export default function AppCycler({ apps }: { apps: readonly Project[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % apps.length), 3200);
    return () => window.clearInterval(id);
  }, [paused, apps.length]);

  const app = apps[index];

  return (
    <div
      className="cycler"
      style={{ "--brand": app.brand } as React.CSSProperties}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="cycler-glow" aria-hidden="true" />
      <div className="cycler-stack">
        {apps.map((item, i) => (
          <div key={item.slug} className="cycler-shot" data-active={i === index} aria-hidden={i !== index}>
            <Image src={item.shots[0]} alt={`${item.name} on the App Store`} fill sizes="200px" className="object-cover object-top" />
          </div>
        ))}
      </div>
      <div className="relative mt-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image src={app.icon} alt="" width={28} height={28} className="rounded-[8px] ring-1 ring-border" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{app.name}</p>
            <p className="truncate text-xs text-muted">{app.facts[0]}</p>
          </div>
        </div>
        <div className="flex gap-1" role="tablist" aria-label="Choose app">
          {apps.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={item.name}
              onClick={() => setIndex(i)}
              className="cycler-dot"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
