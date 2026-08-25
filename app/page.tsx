"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  Search,
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
  const [heroSearch, setHeroSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      window.location.href = `/inventory?search=${encodeURIComponent(heroSearch.trim())}`;
    }
  };

  const handleOpenQuote = (brand = "") => {
    setSelectedBrand(brand);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#f3f4f6] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 space-y-16 sm:space-y-24">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-8 border-b border-gray-800/80">
          {/* Background Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#f87f21]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            {/* Main Hero Copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
                <span>Direct Import & Technical Support</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.1]">
                Replacement Parts for <br className="hidden sm:inline" />
                <span className="industrial-gradient-text">Tractors & Heavy Machinery</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We are a company with over 20 years of experience in the market, dedicated to the sale, repair, and service of construction and mining machinery. We value the opportunity to create a long-term relationship with our customers, and we do that by giving you the best customer service available.
              </p>

              {/* Live Search Bar */}
              <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto relative">
                <div className="glass-panel p-2 rounded-2xl border border-gray-700 flex items-center gap-2 shadow-2xl">
                  <div className="pl-3 text-gray-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search part (e.g. Fuel Injector, Final Drive, CAT 349D)..."
                    className="w-full py-2 bg-transparent text-white text-sm focus:outline-none placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#df680d] text-white font-bold text-xs uppercase tracking-wider shrink-0 hover:scale-[1.02] transition-transform"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/inventory"
                  className="px-6 py-3.5 rounded-xl bg-[#f87f21] text-white font-bold text-sm shadow-lg shadow-[#f87f21]/25 hover:bg-[#df680d] hover:scale-[1.02] transition-all flex items-center gap-2 uppercase tracking-wider text-xs"
                >
                  <Package className="w-4 h-4" />
                  <span>View Catalog (170+ Parts)</span>
                </Link>
                <button
                  onClick={() => handleOpenQuote()}
                  className="px-6 py-3.5 rounded-xl bg-[#181c26] border border-gray-700 text-gray-200 hover:text-white hover:border-[#f87f21] font-bold text-xs transition-all flex items-center gap-2 uppercase tracking-wider"
                >
                  <ShieldCheck className="w-4 h-4 text-[#f87f21]" />
                  <span>Request Quote</span>
                </button>
              </div>

              {/* Metrics Counter */}
              <div className="pt-6 border-t border-gray-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block">170+</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Parts in Stock</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#f87f21] block">6+</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">OEM Brands</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block">100%</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BRANDS GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Replacement Parts by <span className="text-[#f87f21]">Equipment Brand</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Select your tractor or heavy equipment brand to quote genuine or aftermarket parts.
              </p>
            </div>
            <Link
              href="/parts-request"
              className="text-xs font-bold text-[#f87f21] hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              View All Brands <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {allBrands.map((brand) => (
              <button
                key={brand.code}
                onClick={() => handleOpenQuote(brand.code)}
                className="glass-panel glass-panel-hover p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-800/80 group-hover:bg-[#f87f21]/20 flex items-center justify-center text-gray-300 group-hover:text-[#f87f21] transition-colors mb-2">
                  <Wrench className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-[#f87f21] transition-colors">
                  {brand.name}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider font-semibold">Quote Part</span>
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
              Your reliable partner for keeping your heavy machinery fleet running at peak performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Guaranteed Quality</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Top-tier OEM and aftermarket parts tested for demanding construction and mining applications.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Fast Shipping</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Immediate local delivery at Valle de Sula #2 and fast regional & international shipping.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Technical Assistance</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We help you verify exact part numbers and compatibility using your machine&apos;s serial number.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Personalized Support</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Immediate response via phone or email for urgent quotes on diesel engine and undercarriage parts.
              </p>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#f87f21]/40 bg-gradient-to-r from-[#181c26] via-[#141720] to-[#1f1712] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-xs font-black uppercase text-[#f87f21] tracking-wider">
                Can&apos;t find the exact part number?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                We import any machinery part on demand
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Send us the details of your Caterpillar, Komatsu, Volvo, Cummins, John Deere, or Case IH machine for a no-obligation import quote.
              </p>
            </div>

            <button
              onClick={() => handleOpenQuote()}
              className="px-8 py-4 rounded-xl bg-[#f87f21] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-[#f87f21]/30 hover:bg-[#df680d] hover:scale-105 transition-all shrink-0"
            >
              Speak with an Advisor
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
