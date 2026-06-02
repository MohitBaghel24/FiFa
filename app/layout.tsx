import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "ULTRA_FAN | Where The World Watches Together",
  description: "The ultimate football fan community for FIFA World Cup 2026.",
};

import ErrorSuppressor from "@/components/ErrorSuppressor";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans pb-16 md:pb-0`}
        style={{ background: "var(--bg-primary)", margin: 0 }}>
        <ErrorSuppressor />
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
