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
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import InventorySection from "@/app/components/InventorySection";
import PartsRequestModal from "@/app/components/PartsRequestModal";
import { heavyEquipmentListings, allBrands } from "@/app/lib/inventory";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Home() {
  const { t, translateCondition } = useLanguage();
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
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#0b0d10]/40 to-[#0b0d10] pointer-events-none" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#f87f21]/20 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-amber-600/15 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* HERO SECTION */}
        <section className="relative z-10 pt-12 pb-24 sm:pt-20 sm:pb-32 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl text-left space-y-8">
            {/* Main Hero Copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.1]">
                {t.hero.titleLine1} <br className="hidden sm:inline" />
                <span className="industrial-gradient-text">{t.hero.titleLine2}</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {t.hero.desc}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full">
                <Link
                  href="/inventory"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#f87f21] text-white font-bold text-sm shadow-lg shadow-[#f87f21]/25 hover:bg-[#df680d] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs"
                >
                  <Package className="w-4 h-4" />
                  <span>{t.hero.viewCatalog}</span>
                </Link>
                <button
                  onClick={() => handleOpenQuote()}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#181c26] border border-gray-700 text-gray-200 hover:text-white hover:border-[#f87f21] font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#f87f21]" />
                  <span>{t.hero.requestQuote}</span>
                </button>
              </div>

              {/* Metrics Counter */}
              <div className="pt-6 border-t border-gray-800/80 grid grid-cols-3 gap-6 max-w-md text-left">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block">170+</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">{t.hero.statParts}</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#f87f21] block">6+</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">{t.hero.statBrands}</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block">USA &amp; FL</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">{t.hero.statExporter}</span>
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
                {t.homeBrands.titlePrefix} <span className="text-[#f87f21]">{t.homeBrands.titleHighlight}</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                {t.homeBrands.subtitle}
              </p>
            </div>
            <Link
              href="/parts-request"
              className="text-xs font-bold text-[#f87f21] hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              {t.homeBrands.viewAll} <ArrowRight className="w-3.5 h-3.5" />
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
                <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                  {t.homeBrands.quotePart}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* PRE-OWNED HEAVY EQUIPMENT SHOWCASE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f87f21] uppercase tracking-wider mb-1">
                <Truck className="w-4 h-4" /> {t.homeEquipment.badge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {t.homeEquipment.title}
              </h2>
            </div>
            <Link
              href="/equipment"
              className="px-4 py-2 rounded-xl bg-gray-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-700 transition-colors"
            >
              {t.homeEquipment.viewAvailable}
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
                      src={item.imageUrl || "/equipment/volvo-l350h.webp"}
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
                        <span className="text-[10px] text-gray-400 block font-semibold uppercase">{t.homeEquipment.hours}</span>
                        <span className="font-bold">{item.hours}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#12151c] text-gray-300">
                        <span className="text-[10px] text-gray-400 block font-semibold uppercase">{t.homeEquipment.location}</span>
                        <span className="font-bold truncate block">San Pedro Sula / Orlando</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-800/80 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#f87f21]">
                    {translateCondition(item.price)}
                  </span>
                  <button
                    onClick={() => handleOpenQuote(item.brand)}
                    className="px-4 py-2 rounded-xl bg-[#f87f21] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#df680d] transition-colors cursor-pointer"
                  >
                    {t.homeEquipment.inquirePrice}
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
              {t.whyChoose.titlePrefix} <span className="text-[#f87f21]">{t.whyChoose.titleHighlight}</span>?
            </h2>
            <p className="text-sm text-gray-400">
              {t.whyChoose.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">{t.whyChoose.card1Title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.whyChoose.card1Desc}
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">{t.whyChoose.card2Title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.whyChoose.card2Desc}
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">{t.whyChoose.card3Title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.whyChoose.card3Desc}
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">{t.whyChoose.card4Title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.whyChoose.card4Desc}
              </p>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#f87f21]/40 bg-gradient-to-r from-[#181c26] via-[#141720] to-[#1f1712] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-xs font-black uppercase text-[#f87f21] tracking-wider">
                {t.ctaBanner.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                {t.ctaBanner.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                {t.ctaBanner.desc}
              </p>
            </div>

            <button
              onClick={() => handleOpenQuote()}
              className="px-8 py-4 rounded-xl bg-[#f87f21] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-[#f87f21]/30 hover:bg-[#df680d] hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              {t.ctaBanner.button}
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
