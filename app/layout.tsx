import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description = "Modern, high-performance websites and custom web solutions for Australian small businesses.";
  return {
    metadataBase: new URL(origin),
    title: { default: "Launchpad Web Solutions", template: "%s | Launchpad Web Solutions" },
    description,
    openGraph: { title: "Launchpad Web Solutions", description, type: "website", url: origin, images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Launchpad Web Solutions — websites built to move business forward" }] },
    twitter: { card: "summary_large_image", title: "Launchpad Web Solutions", description, images: [`${origin}/og.png`] },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-AU"><body>{children}</body></html>;
}
