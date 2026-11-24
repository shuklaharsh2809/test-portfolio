import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteAnalytics from "@/components/SiteAnalytics";
import { SITE_URL } from "@/lib/data";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const title = "Harsh Shukla — Software Engineer · React Native, React & TypeScript";
const description =
  "Software engineer with 2+ years building and shipping production web and mobile apps with React Native, React, and TypeScript. At Appeneure Technologies, works on OneKey Notes (1,500+ users) and GoodHuman.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  authors: [{ name: "Harsh Shukla" }],
  alternates: { canonical: "/" },
  keywords: [
    "Harsh Shukla",
    "Software Engineer",
    "React Native Developer",
    "React",
    "TypeScript",
    "Next.js",
    "Mobile App Developer",
    "Noida",
  ],
  openGraph: { type: "profile", url: SITE_URL, siteName: "Harsh Shukla", title, description },
  twitter: { card: "summary_large_image", title, description },
  // Google Search Console ownership check (renders <meta name="google-site-verification">).
  verification: { google: "qyGjAQ77U2A7WUzWGiOZz2nXynV_HWWd-alFcPcaYvU" },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f9",
};

// Light is the default; restores a saved dark choice (from the theme toggle) before first paint.
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        {/* Only on the live site: Vercel serves the analytics script there (enable Web Analytics in the project). */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? <SiteAnalytics /> : null}
      </body>
    </html>
  );
}
