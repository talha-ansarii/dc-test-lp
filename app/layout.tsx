// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Distance Connect InterAI — AI Interview Assistant | Mock Interviews with Instant Reports",
  description:
    "Crack interviews faster with an AI mentor that actually grills you. Role-aware mock interviews with instant, actionable reports.",
  openGraph: {
    title: "Distance Connect InterAI — AI Interview Assistant",
    description:
      "Role-aware mock interviews + instant, actionable reports. Start free in minutes.",
    url: "https://distanceconnect.in",
    siteName: "Distance Connect InterAI",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Distance Connect InterAI – AI Interview Assistant",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
