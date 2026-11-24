"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { PostHeading } from "@/lib/blog";

/**
 * Post table of contents. `sidebar`: sticky list beside the article on wide screens, highlighting
 * the section being read. `inline`: a collapsible "On this page" box above the article on smaller screens.
 */
export default function TableOfContents({ headings, variant }: { headings: PostHeading[]; variant: "sidebar" | "inline" }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (variant !== "sidebar") return;
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    // A section counts as "being read" once its heading reaches the top of the screen (just under the nav).
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-64px 0px -70% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings, variant]);

  const list = (
    <ol className="toc-list">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`} className="toc-link" aria-current={active === heading.id ? "location" : undefined}>
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "inline") {
    return (
      <details className="toc-inline">
        <summary>
          On this page
          <span className="text-muted">· {headings.length} sections</span>
          <ChevronDown className="toc-chevron ml-auto size-4" aria-hidden="true" />
        </summary>
        <nav aria-label="Table of contents">{list}</nav>
      </details>
    );
  }

  return (
    <nav aria-label="Table of contents" className="toc-sidebar">
      <p className="toc-title">On this page</p>
      {list}
    </nav>
  );
}
