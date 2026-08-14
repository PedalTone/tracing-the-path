import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "When Pepsi Cracked the Iron Curtain | Tracing The Path";
  const description = "An interactive visual listening experience revealing the people, products, and decisions connecting Pepsi to the Cold War.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [{ url: `${origin}/pepsi-episode-art.jpg`, width: 1200, height: 1200, alt: "When Pepsi Cracked the Iron Curtain — Tracing The Path" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/pepsi-episode-art.jpg`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}</body></html>;
}
