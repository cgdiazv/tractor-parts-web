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

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
                <span>Importación Directa & Soporte Técnico • Honduras</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.1]">
                Repuestos para <br className="hidden sm:inline" />
                <span className="industrial-gradient-text">Tractores y Maquinaria</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Ubicados en <strong className="text-white">Valle de Sula #2</strong>. Proveemos repuestos diésel, filtros, inyectores, mandos finales, turbocargadores y trenes de rodaje para las marcas líderes de construcción y minería.
              </p>

              {/* Live Search Bar */}
              <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto lg:mx-0 relative">
                <div className="glass-panel p-2 rounded-2xl border border-gray-700 flex items-center gap-2 shadow-2xl">
                  <div className="pl-3 text-gray-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Buscar repuesto (ej. Fuel Injector, Mando Final, CAT 349D)..."
                    className="w-full py-2 bg-transparent text-white text-sm focus:outline-none placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#df680d] text-white font-bold text-xs uppercase tracking-wider shrink-0 hover:scale-[1.02] transition-transform"
                  >
                    Buscar
                  </button>
                </div>
              </form>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/inventory"
                  className="px-6 py-3.5 rounded-xl bg-[#f87f21] text-white font-bold text-sm shadow-lg shadow-[#f87f21]/25 hover:bg-[#df680d] hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Ver Catálogo (170+ Repuestos)</span>
                </Link>
                <button
                  onClick={() => handleOpenQuote()}
                  className="px-6 py-3.5 rounded-xl bg-[#181c26] border border-gray-700 text-gray-200 hover:text-white hover:border-[#f87f21] font-bold text-sm transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#f87f21]" />
                  <span>Solicitar Cotización</span>
                </button>
              </div>

              {/* Metrics Counter */}
              <div className="pt-6 border-t border-gray-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block">170+</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Repuestos en Stock</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#f87f21] block">6+</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Marcas OEM</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block">100%</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Garantizados</span>
                </div>
              </div>
            </div>

            {/* Right Featured Card Graphic */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-3xl border border-gray-800 shadow-2xl relative space-y-6">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Despacho Activo • Valle de Sula #2
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#f87f21]">TRACTOREPUESTOS</span>
                </div>

                {/* Hero Showcase Item */}
                <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-[#0d0f14] aspect-video">
                  <Image
                    src="/cloned-site/images/2025-Volvo-show-wheel-loader-l350h-update-t4f.jpg"
                    alt="Maquinaria Pesada Caterpillar y Volvo Tractor Parts Depot"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f87f21] text-white uppercase">
                      Maquinaria y Piezas
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">
                      Cargadores y Excavadoras CAT / Volvo / Komatsu
                    </h3>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#12151d] border border-gray-800/80">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Ubicación Principal</span>
                    <span className="font-bold text-white">Valle de Sula #2, SPS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#12151d] border border-gray-800/80">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Línea Directa</span>
                    <span className="font-bold text-[#f87f21]">{storeInfo.phone.split("/")[0]}</span>
                  </div>
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
                Repuestos por <span className="text-[#f87f21]">Marca de Equipo</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Selecciona la marca de tu tractor o maquinaria pesada para cotizar repuestos originales o equivalentes.
              </p>
            </div>
            <Link
              href="/parts-request"
              className="text-xs font-bold text-[#f87f21] hover:underline flex items-center gap-1"
            >
              Ver Todas las Marcas <ArrowRight className="w-3.5 h-3.5" />
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
                <span className="text-[10px] text-gray-400 mt-0.5">Cotizar Pieza</span>
              </button>
            ))}
          </div>
        </section>

        {/* PRE-OWNED HEAVY EQUIPMENT SHOWCASE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f87f21] uppercase tracking-wider mb-1">
                <Truck className="w-4 h-4" /> Equipos Listos para Trabajar
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Maquinaria Pesada Usada e Inspeccionada
              </h2>
            </div>
            <Link
              href="/equipment"
              className="px-4 py-2 rounded-xl bg-gray-800 text-white text-xs font-bold hover:bg-gray-700 transition-colors"
            >
              Ver Equipos Disponibles
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
                        <span className="text-[10px] text-gray-400 block font-semibold">Horas de Uso</span>
                        <span className="font-bold">{item.hours}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#12151c] text-gray-300">
                        <span className="text-[10px] text-gray-400 block font-semibold">Ubicación</span>
                        <span className="font-bold truncate block">San Pedro Sula</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-800/80 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#f87f21]">{item.price}</span>
                  <button
                    onClick={() => handleOpenQuote(item.brand)}
                    className="px-4 py-2 rounded-xl bg-[#f87f21] text-white text-xs font-bold hover:bg-[#df680d] transition-colors"
                  >
                    Consultar Precio
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
              ¿Por qué elegir <span className="text-[#f87f21]">Tractor Parts Depot</span>?
            </h2>
            <p className="text-sm text-gray-400">
              Somos tu aliado confiable en San Pedro Sula y todo el Valle de Sula para mantener tu flota de maquinaria pesada en óptimas condiciones de trabajo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Calidad Garantizada</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Repuestos OEM y alternativos de primer nivel probados para alta exigencia en construcción y minería.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Envíos Rápidos</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Entregas inmediatas en Valle de Sula #2, Choloma, La Lima, Chamelecón y despachos a todo Honduras.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Asesoría Técnica</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Te ayudamos a verificar el número de parte y la compatibilidad con el número de serie de tu máquina.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Atención Personalizada</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Respuesta inmediata por teléfono o WhatsApp para cotizaciones urgentes de repuestos diésel y tren de rodaje.
              </p>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#f87f21]/40 bg-gradient-to-r from-[#181c26] via-[#141720] to-[#1f1712] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-xs font-black uppercase text-[#f87f21] tracking-wider">
                ¿No encuentras el número de parte exacto?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                Importamos cualquier repuesto de maquinaria a pedido
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Envíanos los datos de tu motor o máquina Caterpillar, Komatsu, Volvo, Cummins, John Deere o Case IH y te enviamos la cotización de importación sin compromiso.
              </p>
            </div>

            <button
              onClick={() => handleOpenQuote()}
              className="px-8 py-4 rounded-xl bg-[#f87f21] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-[#f87f21]/30 hover:bg-[#df680d] hover:scale-105 transition-all shrink-0"
            >
              Cotizar con un Asesor
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
