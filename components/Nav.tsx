"use client";

import { ArrowDownToLine, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { links, navItems, profile } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

/** Floating glass pill that tightens once the page scrolls and tracks the section in view. */
export default function Nav() {
  const onHome = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  // Mobile menu: focus the first link on open; close on Escape, outside tap, or growing to desktop width.
  useEffect(() => {
    if (!menuOpen) return;
    menuPanel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuPanel.current?.contains(target) && !menuButton.current?.contains(target)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

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
          <button
            ref={menuButton}
            type="button"
            className="icon-btn md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" ref={menuPanel} className="mobile-menu md:hidden" hidden={!menuOpen}>
        <ul className="grid gap-0.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={onHome ? `#${item.id}` : `/#${item.id}`}
                className="mobile-menu-link"
                aria-current={onHome && active === item.id ? "true" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/blog"
              className="mobile-menu-link"
              aria-current={onHome ? undefined : "true"}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
        </ul>
        <div className="mt-2 flex items-center gap-1 border-t border-border pt-2">
          <a href={links.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
            <GithubIcon className="size-4.5" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
            <LinkedinIcon className="size-4.5" />
          </a>
          <a href={links.email} className="ml-auto pr-3 text-sm text-muted hover:text-foreground">
            {profile.email}
          </a>
        </div>
      </div>
    </header>
  );
}
