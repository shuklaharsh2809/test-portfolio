"use client";

import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links, navItems, profile } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

/** Floating glass pill that tightens once the page scrolls and tracks the section in view. */
export default function Nav() {
  const onHome = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="nav-wrap">
      <nav className="nav" data-scrolled={scrolled} aria-label="Primary">
        <a href={onHome ? "#top" : "/"} className="flex items-center gap-2.5 pr-2" aria-label={onHome ? `${profile.name}, back to top` : `${profile.name}, home`}>
          <span className="relative size-8 overflow-hidden rounded-full ring-1 ring-border">
            <Image src="/profile-photo.png" alt="" fill sizes="32px" className="object-cover" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">{profile.name}</span>
        </a>

        <div className="hidden items-center md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={onHome ? `#${item.id}` : `/#${item.id}`}
              className="nav-link"
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
          <Link href="/blog" className="nav-link" aria-current={onHome ? undefined : "page"}>
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a href={links.resume} download="Harsh-Shukla-Resume.pdf" className="nav-cta">
            <ArrowDownToLine className="size-3.5" aria-hidden="true" />
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
