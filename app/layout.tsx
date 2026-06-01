import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ULTRA_FAN | Where The World Watches Together",
  description: "The ultimate cyberpunk football fan community. Live scores, predictions, and real-time fan communities for FIFA World Cup 2026.",
  openGraph: {
    title: "ULTRA_FAN | Where The World Watches Together",
    description: "The ultimate cyberpunk football fan community. Live scores, predictions, and real-time fan communities for FIFA World Cup 2026.",
    url: "https://ultrafan.com",
    siteName: "ULTRA_FAN",
    images: [
      {
        url: "https://ultrafan.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ULTRA_FAN Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ULTRA_FAN | Where The World Watches Together",
    description: "The ultimate cyberpunk football fan community. Live scores, predictions, and real-time fan communities for FIFA World Cup 2026.",
    images: ["https://ultrafan.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
