"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PartsRequestModal from "@/app/components/PartsRequestModal";
import { heavyEquipmentListings, EquipmentItem } from "@/app/lib/inventory";
import { Truck, MapPin, Clock, ArrowRight, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function EquipmentPage() {
  const { t, translateCondition, translateSpecLabel } = useLanguage();
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<EquipmentItem | null>(null);

  const filteredEquipment = heavyEquipmentListings.filter(
    (item) => selectedBrandFilter === "All" || item.brand === selectedBrandFilter
  );

  const handleInquire = (item: EquipmentItem) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#f3f4f6] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pb-12 w-full -mt-[84px]">
        {/* Full Width Top Header Banner */}
        <div className="relative w-full pt-[110px] pb-12 sm:pb-16 bg-[#0b0d10] border-b border-gray-800 overflow-hidden mb-10">
          <Image
            src="/header.webp"
            alt="Equipment Header Background"
            fill
            priority
            quality={95}
            className="object-cover object-top opacity-55 pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10]/95 via-[#0b0d10]/80 to-[#0b0d10]/40 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>{t.equipment.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              {t.equipment.titlePrefix} <span className="text-[#f87f21]">{t.equipment.titleHighlight}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              {t.equipment.desc}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 w-full">

        {/* Filter Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#f87f21]" /> {t.equipment.brandFilter}
          </span>
          {["All", "CAT", "Volvo", "Atlas Copco"].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrandFilter(b)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedBrandFilter === b
                  ? "bg-[#f87f21] text-white border-[#f87f21]"
                  : "glass-panel text-gray-300 border-gray-800 hover:border-gray-700"
              }`}
            >
              {b === "All" ? t.equipment.allEquipment : b}
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="glass-panel glass-panel-hover rounded-3xl border border-gray-800 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full bg-black">
                  <Image
                    src={item.imageUrl || "/images/prado-placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target && !target.src.includes("prado-placeholder.jpg")) {
                        target.srcset = "";
                        target.src = "/images/prado-placeholder.jpg";
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-[#f87f21] text-white text-xs font-black uppercase px-3 py-1 rounded-lg shadow-lg">
                    {item.brand} • {item.year}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#f87f21]" /> {item.hours}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#f87f21]" /> San Pedro Sula / Orlando
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-black text-white">{item.title}</h2>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.description}</p>

                  {/* Specifications Table */}
                  <div className="border-t border-gray-800 pt-4 space-y-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {t.equipment.specs}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(item.specs).map(([key, val]) => (
                        <div key={key} className="p-2.5 rounded-xl bg-[#12151f] border border-gray-800/80">
                          <span className="text-[10px] text-gray-500 block uppercase font-bold">
                            {translateSpecLabel(key)}
                          </span>
                          <span className="font-bold text-gray-200">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-800 flex items-center justify-between bg-[#12151f]/50">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 block">{t.equipment.condition}</span>
                  <span className="text-base font-black text-[#f87f21]">{translateCondition(item.price)}</span>
                </div>
                <button
                  onClick={() => handleInquire(item)}
                  className="px-5 py-2.5 rounded-xl bg-[#f87f21] text-white text-xs font-bold hover:bg-[#df680d] transition-colors flex items-center gap-2 shadow-lg shadow-[#f87f21]/20 cursor-pointer"
                >
                  <span>{t.equipment.requestInfo}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </main>

      <Footer />

      {activeItem && (
        <PartsRequestModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setActiveItem(null);
          }}
          initialBrand={activeItem.brand}
          initialPartName={`Machinery Inquiry: ${activeItem.title}`}
        />
      )}
    </div>
  );
}
