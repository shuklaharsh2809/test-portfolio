"use client";

import Image from "next/image";
import { useState } from "react";

type Shot = { src: string; label: string };

/** Browser-window frame that flips between a project's screenshots via small tabs. */
export default function BuildShots({ name, host, shots }: { name: string; host: string; shots: readonly Shot[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="browser">
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="browser-url">{host}</span>
        </div>
        <div className="browser-view">
          {shots.map((shot, index) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={`${name}: ${shot.label} screen`}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="browser-shot"
              data-active={index === active}
              aria-hidden={index !== active}
            />
          ))}
        </div>
      </div>

      {shots.length > 1 ? (
        <div className="shot-tabs" role="group" aria-label={`${name} screenshots`}>
          {shots.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              className="shot-tab"
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
            >
              {shot.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
