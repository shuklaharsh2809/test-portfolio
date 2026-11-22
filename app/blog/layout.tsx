import Link from "next/link";
import Nav from "@/components/Nav";
import { links, profile } from "@/lib/data";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <Nav />
      <main className="shell pt-28 pb-20 sm:pt-36">{children}</main>
      <footer className="shell flex flex-col gap-2 pb-10 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p className="flex gap-4">
          <Link href="/" className="hover:text-foreground">
            Portfolio
          </Link>
          <a href="/blog/rss.xml" className="hover:text-foreground">
            RSS
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
        </p>
      </footer>
    </>
  );
}
