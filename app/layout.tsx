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
  title: "Tractor Parts Depot | Repuestos de Maquinaria Pesada & Tractores",
  description: "Importación directa de repuestos y maquinaria pesada para construcción y minería en Valle de Sula #2, San Pedro Sula, Honduras. Caterpillar, Cummins, Komatsu, Volvo, John Deere.",
  keywords: ["Tractor Parts Depot", "Tracto Repuestos", "repuestos maquinaria pesada", "honduras", "san pedro sula", "valle de sula", "caterpillar", "cummins", "komatsu", "volvo", "john deere", "case ih", "inyectores", "filtros", "mandos finales", "rodaje"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0d10] text-[#f3f4f6]" suppressHydrationWarning>{children}</body>
    </html>
  );
}
