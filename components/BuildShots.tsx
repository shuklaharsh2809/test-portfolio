"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Shot = { src: string; label: string };
type Video = { src: string; poster: string };

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

/**
 * Browser-window frame for a project. With a video, the first tab is a muted "Demo" loop that only
 * plays while the card is on screen (and never auto-plays for reduced-motion users); the rest are screenshots.
 */
export default function BuildShots({
  name,
  host,
  shots,
  video,
}: {
  name: string;
  host: string;
  shots: readonly Shot[];
  video?: Video;
}) {
  const tabs = video ? [{ label: "Demo" }, ...shots] : shots;
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const [userPicked, setUserPicked] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const demoActive = Boolean(video) && active === 0;

  // `near` loads the poster once the card is close to the screen; `inView` drives play/pause.
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el || !video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    nearObserver.observe(el);
    return () => {
      observer.disconnect();
      nearObserver.disconnect();
    };
  }, [video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (demoActive && inView && (!reducedMotion || userPicked)) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [demoActive, inView, reducedMotion, userPicked]);

  const shotOffset = video ? 1 : 0;

  return (
    <div>
      <div className="browser" ref={frameRef}>
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="browser-url">{host}</span>
        </div>
        <div className="browser-view">
          {video ? (
            <video
              ref={videoRef}
              className="browser-shot"
              data-active={demoActive}
              src={video.src}
              poster={near ? video.poster : undefined}
              muted
              loop
              playsInline
              preload="none"
              aria-label={`${name} demo recording`}
              aria-hidden={!demoActive}
            />
          ) : null}
          {shots.map((shot, index) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={`${name}: ${shot.label} screen`}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="browser-shot"
              data-active={index + shotOffset === active}
              aria-hidden={index + shotOffset !== active}
            />
          ))}
        </div>
      </div>

      {tabs.length > 1 ? (
        <div className="shot-tabs" role="group" aria-label={`${name} screenshots`}>
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              className="shot-tab"
              aria-pressed={index === active}
              onClick={() => {
                setActive(index);
                setUserPicked(true);
              }}
              onMouseEnter={() => setActive(index)}
            >
              {video && index === 0 ? <Play className="size-3 fill-current" aria-hidden="true" /> : null}
              {tab.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
