"use client";

import React from "react";
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>Full Catalog • Tractor Parts Depot</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Inventory of <span className="text-[#f87f21]">Diesel Engine & Undercarriage Parts</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-3xl">
              Filter by brand (CAT, Komatsu, Volvo, Cummins, Enerpac, Ford), search by SKU part number, or explore by category. Immediate quote response directly from our depot.
            </p>
          </div>
        </div>

        <InventorySection showTitle={false} />
      </main>

      <Footer />
    </div>
  );
}
