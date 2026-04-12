import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsh Shukla | Product Developer",
  description:
    "Minimal portfolio for Harsh Shukla, a Product Developer building mobile apps, web applications, AI-powered features, Firebase-backed systems, and developer productivity workflows.",
  keywords: [
    "Harsh Shukla",
    "Product Developer",
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
