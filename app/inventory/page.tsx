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

      <main className="flex-1 pb-10 -mt-[84px]">
        {/* Full Width Top Header Banner */}
        <div className="relative w-full pt-[110px] pb-12 sm:pb-16 bg-[#0b0d10] border-b border-gray-800 overflow-hidden mb-8">
          <Image
            src="/header.webp"
            alt="Inventory Header Background"
            fill
            priority
            quality={95}
            className="object-cover object-top opacity-55 pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10]/95 via-[#0b0d10]/80 to-[#0b0d10]/40 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>Full Catalog • Tractor Parts Depot</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              Inventory of <span className="text-[#f87f21]">Diesel Engine & Undercarriage Parts</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-4xl leading-relaxed">
              Browse our USA heavy equipment spare parts inventory: CAT parts Orlando, Komatsu undercarriage parts, link assy for excavators, Cummins overhaul kits USA, turbochargers, heavy equipment crankshafts, camshafts for diesel engines, and inframe kits. Shipped directly from Orlando, FL for export to Latin America &amp; worldwide.
            </p>
          </div>
        </div>

        <InventorySection showTitle={false} />
      </main>

      <Footer />
    </div>
  );
}
