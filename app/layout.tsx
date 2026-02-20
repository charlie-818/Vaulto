import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const dmMono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaulto — Tokenized Equity Infrastructure",
  description:
    "Vaulto provides SaaS and PaaS solutions for digitizing, managing, and maintaining equity ownership records and capitalization tables on blockchain. Institutional-grade infrastructure for tokenized equity.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href="/landing-video.mp4" as="video" type="video/mp4" />
      </head>
      <body
        className={`${dmSerif.variable} ${dmSans.variable} ${dmMono.variable} font-sans antialiased bg-vaulto-bg text-vaulto-fg min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
