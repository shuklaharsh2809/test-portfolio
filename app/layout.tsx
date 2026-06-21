import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// TODO: set this to your real deployed domain — it's used to build
// absolute URLs for the social-share (OpenGraph/Twitter) preview cards.
const SITE_URL = "https://harshshukla.vercel.app";

const title = "Harsh Shukla | Software Developer";
const description =
  "Software developer building mobile apps, web applications, AI-powered features, Firebase-backed systems, and developer-productivity workflows.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  authors: [{ name: "Harsh Shukla" }],
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Harsh Shukla",
    "Software Developer",
    "React Native Developer",
    "Web Developer",
    "Next.js",
    "React",
    "Firebase",
    "OpenAI",
    "AI integrations",
    "Workflow automation",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Harsh Shukla",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <Script id="theme-script" strategy="beforeInteractive">
          {`try {
            var storedTheme = window.localStorage.getItem('theme');
            if (storedTheme === 'dark') {
              document.documentElement.classList.add('dark');
            }
          } catch (error) {}
          `}
        </Script>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
