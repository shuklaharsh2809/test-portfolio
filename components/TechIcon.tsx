import type { SimpleIcon } from "simple-icons";

/** Renders a Simple Icons brand mark in its brand colour (or the current colour for dark marks). */
export default function TechIcon({ icon, className, mono = false }: { icon: SimpleIcon; className?: string; mono?: boolean }) {
  // Near-black brand marks (Expo, Next.js…) would vanish on a dark UI, so they follow the text colour.
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(icon.hex.slice(i, i + 2), 16));
  const dark = 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={mono || dark ? "currentColor" : `#${icon.hex}`}
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}
