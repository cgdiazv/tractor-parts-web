"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PartsRequestModal from "@/app/components/PartsRequestModal";
import { heavyEquipmentListings, EquipmentItem } from "@/app/lib/inventory";
import { Truck, ShieldCheck, MapPin, Clock, ArrowRight, CheckCircle2, SlidersHorizontal } from "lucide-react";

export default function EquipmentPage() {
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

      <main className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 w-full">
        {/* Header */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gray-800 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>Maquinaria Pesada Usada e Inspeccionada</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Cargadores, Excavadoras y <span className="text-[#f87f21]">Tractores</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            Equipos listos para trabajar en minería, construcción y movimiento de tierras. Todos los equipos han sido inspeccionados técnicamente por nuestros especialistas en Valle de Sula.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#f87f21]" /> Marca:
          </span>
          {["All", "CAT", "Volvo", "Atlas Copco"].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrandFilter(b)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedBrandFilter === b
                  ? "bg-[#f87f21] text-white border-[#f87f21]"
                  : "glass-panel text-gray-300 border-gray-800 hover:border-gray-700"
              }`}
            >
              {b === "All" ? "Todos los Equipos" : b}
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
                    src={item.imageUrl || "/cloned-site/images/2025-Volvo-show-wheel-loader-l350h-update-t4f.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#f87f21] text-white text-xs font-black uppercase px-3 py-1 rounded-lg shadow-lg">
                    {item.brand} • {item.year}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#f87f21]" /> {item.hours}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#f87f21]" /> {item.location.split("/")[0]}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-black text-white">{item.title}</h2>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.description}</p>

                  {/* Specifications Table */}
                  <div className="border-t border-gray-800 pt-4 space-y-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Especificaciones Técnicas:
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(item.specs).map(([key, val]) => (
                        <div key={key} className="p-2.5 rounded-xl bg-[#12151f] border border-gray-800/80">
                          <span className="text-[10px] text-gray-500 block uppercase font-bold">{key}</span>
                          <span className="font-bold text-gray-200">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-800 flex items-center justify-between bg-[#12151f]/50">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 block">Precio Estimado</span>
                  <span className="text-base font-black text-[#f87f21]">{item.price}</span>
                </div>
                <button
                  onClick={() => handleInquire(item)}
                  className="px-5 py-2.5 rounded-xl bg-[#f87f21] text-white text-xs font-bold hover:bg-[#df680d] transition-colors flex items-center gap-2 shadow-lg shadow-[#f87f21]/20"
                >
                  <span>Solicitar Información</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
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
          initialPartName={`Cotización de Maquinaria: ${activeItem.title}`}
        />
      )}
    </div>
  );
}
