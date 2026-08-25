"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Truck,
  PhoneCall,
  ArrowRight,
  Package,
  Layers,
  CheckCircle2,
  Calendar,
  Building2,
  Clock,
  Compass,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import InventorySection from "@/app/components/InventorySection";
import PartsRequestModal from "@/app/components/PartsRequestModal";
import { heavyEquipmentListings, allBrands, storeInfo } from "@/app/lib/inventory";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleOpenQuote = (brand = "") => {
    setSelectedBrand(brand);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#f3f4f6] flex flex-col font-sans">
      <Navbar />

      {/* Top Hero Container (Background extends up behind Navbar) */}
      <div className="relative overflow-hidden border-b border-gray-800/80 -mt-[84px] pt-[84px]">
        {/* Background Hero Image extending to top */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/header.webp"
            alt="Tractor & Heavy Machinery Hero Background"
            fill
            priority
            quality={95}
            className="object-cover object-top opacity-75 pointer-events-none select-none"
          />
          {/* Subtle overlay gradient to keep text readable while keeping image vibrant */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#0b0d10]/40 to-[#0b0d10] pointer-events-none" />
        </div>

        {/* Background Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#f87f21]/20 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-amber-600/15 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* HERO SECTION */}
        <section className="relative z-10 pt-12 pb-24 sm:pt-20 sm:pb-32 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl text-left space-y-8">
            {/* Main Hero Copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
                <span>Orlando, FL & USA Heavy Equipment Exporter</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.1]">
                Heavy Machinery & <br className="hidden sm:inline" />
                <span className="industrial-gradient-text">Construction Equipment Parts Supplier</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Premier heavy machinery parts supplier in Florida with over 20 years of experience. We export genuine &amp; Caterpillar aftermarket parts, Komatsu spare parts, and Cummins engine parts from Orlando, USA to Latin America and worldwide. From excavator parts, bulldozer undercarriage components, and link assy for excavators to turbochargers for CAT engines, heavy equipment crankshafts, and inframe kits — we keep your fleet operating at peak performance.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full">
                <Link
                  href="/inventory"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#f87f21] text-white font-bold text-sm shadow-lg shadow-[#f87f21]/25 hover:bg-[#df680d] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs"
                >
                  <Package className="w-4 h-4" />
                  <span>View Parts Catalog (170+)</span>
                </Link>
                <button
                  onClick={() => handleOpenQuote()}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#181c26] border border-gray-700 text-gray-200 hover:text-white hover:border-[#f87f21] font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <ShieldCheck className="w-4 h-4 text-[#f87f21]" />
                  <span>Request Quote</span>
                </button>
              </div>

              {/* Metrics Counter */}
              <div className="pt-6 border-t border-gray-800/80 grid grid-cols-3 gap-6 max-w-md text-left">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block">170+</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Parts in Stock</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#f87f21] block">6+</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">OEM Brands</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block">USA & FL</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Direct Exporter</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <main className="flex-1 space-y-16 sm:space-y-24 pt-12 sm:pt-20">

        {/* BRANDS GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Replacement Parts by <span className="text-[#f87f21]">Equipment Brand</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Select your heavy equipment brand to quote genuine or aftermarket parts.
              </p>
            </div>
            <Link
              href="/parts-request"
              className="text-xs font-bold text-[#f87f21] hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              View All Brands <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {allBrands.map((brand) => (
              <button
                key={brand.code}
                onClick={() => handleOpenQuote(brand.code)}
                className="glass-panel glass-panel-hover p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-full h-20 sm:h-24 p-2 flex items-center justify-center group-hover:scale-110 transition-transform mb-1">
                  {brand.logoUrl ? (
                    <Image
                      src={brand.logoUrl}
                      alt={`${brand.name} logo`}
                      width={180}
                      height={100}
                      className="w-full h-full object-contain filter drop-shadow-md brightness-110"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center text-[#f87f21]">
                      <Wrench className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">Quote Part</span>
              </button>
            ))}
          </div>
        </section>

        {/* PRE-OWNED HEAVY EQUIPMENT SHOWCASE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f87f21] uppercase tracking-wider mb-1">
                <Truck className="w-4 h-4" /> Work-Ready Machinery
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Inspected Pre-Owned Heavy Equipment
              </h2>
            </div>
            <Link
              href="/equipment"
              className="px-4 py-2 rounded-xl bg-gray-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-700 transition-colors"
            >
              View Available Equipment
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heavyEquipmentListings.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="glass-panel glass-panel-hover rounded-2xl border border-gray-800 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-black">
                    <Image
                      src={item.imageUrl || "/cloned-site/images/2025-Volvo-show-wheel-loader-l350h-update-t4f.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#f87f21] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow">
                      {item.brand} • {item.year}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="p-2 rounded-lg bg-[#12151c] text-gray-300">
                        <span className="text-[10px] text-gray-400 block font-semibold uppercase">Hours of Use</span>
                        <span className="font-bold">{item.hours}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#12151c] text-gray-300">
                        <span className="text-[10px] text-gray-400 block font-semibold uppercase">Location</span>
                        <span className="font-bold truncate block">San Pedro Sula</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-800/80 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#f87f21]">{item.price}</span>
                  <button
                    onClick={() => handleOpenQuote(item.brand)}
                    className="px-4 py-2 rounded-xl bg-[#f87f21] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#df680d] transition-colors"
                  >
                    Inquire Price
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LIVE PARTS INVENTORY CATALOG SECTION */}
        <section className="bg-[#0e1117] py-16 border-y border-gray-800/80">
          <InventorySection limit={12} />
        </section>

        {/* WHY CHOOSE US */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Why Choose <span className="text-[#f87f21]">Tractor Parts Depot</span>?
            </h2>
            <p className="text-sm text-gray-400">
              Trusted USA heavy equipment spare parts supplier exporting top-brand components from Orlando, Florida to mining &amp; construction sites across USA and Latin America.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">CAT &amp; Komatsu Parts</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Premium CAT parts Orlando, Caterpillar aftermarket parts USA, Komatsu excavator parts, and Komatsu undercarriage parts tested for severe duty.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Orlando &amp; USA Export</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Direct export of heavy equipment parts from USA to Latin America and global destinations with fast air &amp; sea freight dispatch from Florida.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Engine Overhaul Kits</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Complete Cummins overhaul kits USA, inframe kits, heavy equipment crankshafts, camshafts for diesel engines, and turbochargers for CAT engines.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Dedicated Support</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Immediate response from technical specialists in diesel engine parts Orlando and link assy for excavators to confirm exact serial compatibility.
              </p>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#f87f21]/40 bg-gradient-to-r from-[#181c26] via-[#141720] to-[#1f1712] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-xs font-black uppercase text-[#f87f21] tracking-wider">
                Heavy Equipment Exporter from Orlando, FL
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                Exporting Construction &amp; Mining Spare Parts Worldwide
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Need Caterpillar aftermarket parts, Komatsu spare parts Florida, Cummins engine parts Orlando, or link assy for excavators? We supply and export any heavy machinery part on demand.
              </p>
            </div>

            <button
              onClick={() => handleOpenQuote()}
              className="px-8 py-4 rounded-xl bg-[#f87f21] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-[#f87f21]/30 hover:bg-[#df680d] hover:scale-105 transition-all shrink-0"
            >
              Request Export Quote
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Quote Request Modal */}
      <PartsRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialBrand={selectedBrand}
      />
    </div>
  );
}
