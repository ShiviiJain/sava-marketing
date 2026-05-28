import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { MarketingFooter } from "./_components/marketing-footer";
import { MarketingNav } from "./_components/marketing-nav";
import "./global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const charter = localFont({
  src: [
    {
      path: "../node_modules/charter-webfont/fonts/charter_regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/charter-webfont/fonts/charter_italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../node_modules/charter-webfont/fonts/charter_bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../node_modules/charter-webfont/fonts/charter_bold_italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-charter",
  display: "swap",
  fallback: ["Charter", "Georgia", "serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Sava Trust Company",
    template: "%s · Sava Trust Company",
  },
  description:
    "Sava is a Nevada-chartered trust company built for modern families and the attorneys who serve them.",
  metadataBase: new URL("https://savatrustcompany.com"),
  openGraph: {
    title: "Sava Trust Company",
    description:
      "Nevada-chartered trust administration built for modern families and the attorneys who serve them.",
    type: "website",
    url: "https://savatrustcompany.com",
    siteName: "Sava Trust Company",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sava Trust Company",
    description:
      "Nevada-chartered trust administration built for modern families and the attorneys who serve them.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${charter.variable} flex min-h-screen flex-col bg-background font-sans text-foreground antialiased`}
      >
        <MarketingNav />
        <div className="flex-1">{children}</div>
        <MarketingFooter />
      </body>
    </html>
  );
}
