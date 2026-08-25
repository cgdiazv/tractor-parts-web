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
  description: "Direct import & export of heavy machinery replacement parts for construction and mining in Orlando, FL & USA to Latin America. Caterpillar, Cummins, Komatsu, Volvo, John Deere.",
  keywords: [
    "Heavy equipment parts Orlando",
    "Construction equipment parts Orlando FL",
    "Mining equipment spare parts Orlando",
    "Heavy machinery parts supplier Florida",
    "Diesel engine parts Orlando",
    "Excavator parts supplier Orlando",
    "Bulldozer parts Florida",
    "Heavy equipment parts USA",
    "Heavy equipment exporter from Orlando",
    "Construction equipment parts supplier USA",
    "Export heavy equipment parts from USA",
    "Mining equipment parts exporter",
    "Construction machinery parts export",
    "USA heavy equipment spare parts supplier",
    "Heavy equipment parts for Latin America",
    "CAT parts Orlando",
    "Komatsu spare parts Florida",
    "Cummins engine parts Orlando",
    "Caterpillar aftermarket parts USA",
    "Komatsu excavator parts supplier",
    "Cummins overhaul kits USA",
    "Turbochargers for CAT engines",
    "Cummins overhaul kits",
    "Komatsu undercarriage parts",
    "Link assy for excavators",
    "Heavy equipment crankshafts",
    "Camshafts for diesel engines",
    "Inframe kits for heavy equipment",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Tractor Parts Depot | Heavy Equipment Parts Supplier Orlando FL",
    description: "Direct sales & export of engine parts, undercarriage components, and final drives in Orlando, FL & USA.",
    images: [{ url: "/logo.webp" }],
  },
};

import { LanguageProvider } from "@/app/context/LanguageContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0d10] text-[#f3f4f6]" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
