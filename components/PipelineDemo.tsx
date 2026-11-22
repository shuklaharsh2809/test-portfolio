"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CHUNKS = 6;

/**
 * Illustrates the OneKey audio pipeline change: the same recording processed
 * chunk-by-chunk versus split into chunks that run concurrently.
 */
export default function PipelineDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun((value) => (value === 0 ? 1 : value));
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const chunks = Array.from({ length: CHUNKS }, (_, index) => index);

  return (
    <div ref={ref} className="pipeline" data-run={run > 0 ? "true" : "false"}>
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">One 2-hour recording · 6 chunks</p>
        <button type="button" onClick={() => setRun((value) => value + 1)} className="pipeline-replay">
          <RotateCcw className="size-3.5" aria-hidden="true" />
          Replay
        </button>
      </div>

      {/* `key` restarts the CSS animations on replay. */}
      <div key={run} className="mt-5 grid gap-6">
        <div>
          <div className="mb-2 flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:justify-between">
            <span className="font-medium text-foreground">Before · sequential</span>
            <span className="text-muted">each chunk waits for the last</span>
          </div>
          <div className="pipeline-lane">
            {chunks.map((index) => (
              <span key={index} className="pipeline-chunk is-serial" style={{ "--i": index } as React.CSSProperties} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:justify-between">
            <span className="font-medium text-foreground">After · concurrent</span>
            <span className="text-accent">chunks processed in parallel</span>
          </div>
          <div className="grid gap-1.5">
            {chunks.map((index) => (
              <div key={index} className="pipeline-lane is-thin">
                <span className="pipeline-chunk is-parallel" style={{ "--i": index } as React.CSSProperties} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs text-muted">Illustrative timing, not to scale.</p>

      <dl className="pipeline-facts">
        {[
          ["Input", "30 min – 2 hr audio"],
          ["Strategy", "Concurrent chunks"],
          ["Output", "Stitched in order"],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-[11px] uppercase tracking-[0.1em] text-muted">{label}</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
