import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tractor Parts Depot | Heavy Machinery & Tractor Parts",
  description: "Direct import of heavy machinery replacement parts for construction and mining at Valle de Sula #2, San Pedro Sula. Caterpillar, Cummins, Komatsu, Volvo, John Deere.",
  keywords: ["Tractor Parts Depot", "tractor parts", "heavy equipment parts", "san pedro sula", "valle de sula", "caterpillar", "cummins", "komatsu", "volvo", "john deere", "case ih", "injectors", "filters", "final drives", "undercarriage"],
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
  openGraph: {
    title: "Tractor Parts Depot | Heavy Equipment Parts Supplier",
    description: "Direct sales & import of engine parts, undercarriage components, and final drives.",
    images: [{ url: "/logo.webp" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0d10] text-[#f3f4f6]" suppressHydrationWarning>{children}</body>
    </html>
  );
}
