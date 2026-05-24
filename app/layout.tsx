import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { ScrollProgress } from "@/components/marketing/scroll-progress";
import { CursorGlow } from "@/components/marketing/cursor-glow";
import { FilmGrain } from "@/components/marketing/film-grain";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Custom Software for Serious Businesses`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Custom Software for Serious Businesses`,
    description: SITE.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen overflow-x-hidden bg-bg text-text-primary">
        <JsonLd data={organizationJsonLd()} />
        <LenisProvider />
        <FilmGrain />
        <PostHogProvider>
          <ScrollProgress />
          <CursorGlow />
          <Nav />
          <main className="relative z-10 pt-20">{children}</main>
          <Footer />
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
