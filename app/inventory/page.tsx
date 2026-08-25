"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import InventorySection from "@/app/components/InventorySection";
import { Wrench, ShieldCheck } from "lucide-react";

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#f3f4f6] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-10">
        {/* Top Header Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6">
          <div className="glass-panel p-8 rounded-3xl border border-gray-800 space-y-3 relative overflow-hidden">
            <Image
              src="/header.webp"
              alt="Inventory Header Background"
              fill
              priority
              className="object-cover object-center opacity-55 pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f14]/85 via-[#0d0f14]/60 to-[#0d0f14]/40 pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>Full Catalog • Tractor Parts Depot</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Inventory of <span className="text-[#f87f21]">Diesel Engine & Undercarriage Parts</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 max-w-4xl">
                Browse our USA heavy equipment spare parts inventory: CAT parts Orlando, Komatsu undercarriage parts, link assy for excavators, Cummins overhaul kits USA, turbochargers, heavy equipment crankshafts, camshafts for diesel engines, and inframe kits. Shipped directly from Orlando, FL for export to Latin America &amp; worldwide.
              </p>
            </div>
          </div>
        </div>

        <InventorySection showTitle={false} />
      </main>

      <Footer />
    </div>
  );
}
