"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PartsRequestModal from "@/app/components/PartsRequestModal";
import { allBrands } from "@/app/lib/inventory";
import { ShieldCheck, CheckCircle2, FileText, Send, PhoneCall } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function PartsRequestPage() {
  const { t, language } = useLanguage();
  const [selectedBrand, setSelectedBrand] = useState("CAT");
  const [modalOpen, setModalOpen] = useState(false);

  const brandGuides: Record<string, { title: string; desc: string; popularParts: string[] }> = {
    CAT: {
      title: language === "es" ? "Cotización de Repuestos Caterpillar (CAT)" : "Caterpillar (CAT) Parts Quote",
      desc: language === "es" ? "Repuestos originales y OEM para cargadores 988G, 966G, 966H, excavadoras 349D, tractores D6G y motores diésel CAT." : "Genuine & OEM replacement parts for 988G, 966G, 966H wheel loaders, 349D excavators, D6G track-type tractors, and CAT diesel engines.",
      popularParts: ["DRIVE GP-SWING", "DRIVE GP-CIRCLE", "DIESEL INJECTORS", "FINAL DRIVE GP", "CAT FILTERS"],
    },
    Cummins: {
      title: language === "es" ? "Cotización de Repuestos para Motores Cummins" : "Cummins Engine Parts Quote",
      desc: language === "es" ? "Componentes originales y alternativos para motores diésel Cummins QSC, ISX, N14, 6BT, 4BT e inyectores de alta presión." : "Genuine and aftermarket components for Cummins QSC, ISX, N14, 6BT, 4BT diesel engines and high-pressure fuel injectors.",
      popularParts: ["FUEL FILTER", "FUEL INJECTOR VALVE", "TURBOCHARGER ASSY", "PRESSURE SENSORS", "GASKET KIT"],
    },
    Komatsu: {
      title: language === "es" ? "Cotización de Repuestos Komatsu para Maquinaria Pesada" : "Komatsu Heavy Equipment Parts Quote",
      desc: language === "es" ? "Piezas de tren de rodaje y motor para excavadoras y tractores Komatsu PC200, PC300, D65, D85, D155." : "Undercarriage and engine parts for Komatsu excavators and dozers PC200, PC300, D65, D85, D155.",
      popularParts: ["IDLER AS", "TURBOCHARGER ASSEMBLY", "IDLER-TRACK", "PISTON ASS'Y", "TRACK LINK ASSEMBLY"],
    },
    Volvo: {
      title: language === "es" ? "Cotización de Repuestos de Construcción Volvo" : "Volvo Construction Parts Quote",
      desc: language === "es" ? "Repuestos para cargadores Volvo L220E, L350H, excavadoras EC210, EC290 y motores Volvo D12." : "Parts for Volvo L220E, L350H wheel loaders, EC210, EC290 excavators, and Volvo D12 engines.",
      popularParts: ["SPARE PART PRESSURE SWITCH", "BALL BEARING CH A2EB", "SEAL KITS", "CONTROL VALVES"],
    },
    "John Deere": {
      title: language === "es" ? "Cotización de Repuestos John Deere para Maquinaria Pesada" : "John Deere Heavy Equipment Parts Quote",
      desc: language === "es" ? "Componentes para maquinaria de construcción y agrícola John Deere, transmisiones, bombas hidráulicas y trenes de rodaje." : "Components for John Deere construction & agricultural machinery, transmissions, hydraulic pumps, and undercarriages.",
      popularParts: ["OIL & FUEL FILTERS", "HYDRAULIC Pumps", "WATER PUMPS", "BEARINGS"],
    },
    "Case IH": {
      title: language === "es" ? "Cotización de Repuestos Case IH y Equipos de Construcción" : "Case IH & Construction Equipment Parts Quote",
      desc: language === "es" ? "Componentes para retroexcavadoras Case 580, tractores Magnum, excavadoras y maquinaria pesada." : "Components for Case 580 backhoes, Magnum tractors, excavators, and heavy machinery.",
      popularParts: ["SEALS & GASKETS", "DIESEL INJECTORS", "INJECTION PUMPS", "BRAKE DISCS"],
    },
  };

  const currentGuide = brandGuides[selectedBrand] || brandGuides["CAT"];

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#f3f4f6] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pb-12 w-full -mt-[84px]">
        {/* Full Width Top Header Banner */}
        <div className="relative w-full pt-[110px] pb-12 sm:pb-16 bg-[#0b0d10] border-b border-gray-800 overflow-hidden mb-10">
          <Image
            src="/header.webp"
            alt="Parts Request Background"
            fill
            priority
            quality={95}
            className="object-cover object-top opacity-55 pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10]/95 via-[#0b0d10]/80 to-[#0b0d10]/40 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>{t.partsRequest.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              {t.partsRequest.titlePrefix} <span className="text-[#f87f21]">{t.partsRequest.titleHighlight}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              {t.partsRequest.desc}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 w-full">

        {/* Brand Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {allBrands.map((b) => (
            <button
              key={b.code}
              onClick={() => setSelectedBrand(b.code)}
              className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                selectedBrand === b.code
                  ? "bg-[#f87f21] text-white border-[#f87f21] font-bold shadow-lg shadow-[#f87f21]/20 scale-105"
                  : "glass-panel text-gray-300 border-gray-800 hover:border-gray-700"
              }`}
            >
              <div className="w-full h-16 sm:h-20 p-2 flex items-center justify-center">
                {b.logoUrl ? (
                  <Image
                    src={b.logoUrl}
                    alt={`${b.name} logo`}
                    width={160}
                    height={90}
                    className="w-full h-full object-contain filter drop-shadow-md brightness-110"
                  />
                ) : (
                  <span className="text-[10px] font-black">{b.code}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Brand Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 glass-panel p-8 rounded-3xl border border-gray-800 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#f87f21] uppercase tracking-wider block mb-1">
                Technical Specialty - {selectedBrand}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{currentGuide.title}</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">{currentGuide.desc}</p>
            </div>

            <div className="border-t border-gray-800 pt-5 space-y-3">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                {t.partsRequest.popularParts}
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentGuide.popularParts.map((part, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-[#12151f] border border-gray-800 text-xs font-bold text-gray-200"
                  >
                    {part}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f87f21] to-[#df680d] text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-[#f87f21]/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.partsRequest.ctaButton}</span>
              </button>
            </div>
          </div>

          {/* Side Info Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">
                {language === "es" ? "¿Por qué cotizar con nosotros?" : "Why Request a Quote With Us?"}
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === "es" ? "Verificación por número de serie / chasis" : "Verification by chassis / engine serial number"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === "es" ? "Despacho inmediato desde nuestro almacén" : "Immediate dispatch from our depot"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === "es" ? "Importaciones semanales directas de fábrica" : "Weekly direct factory imports"}</span>
                </li>
              </ul>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f87f21] uppercase">
                <PhoneCall className="w-4 h-4" /> {language === "es" ? "Atención Telefónica" : "Phone Assistance"}
              </div>
              <p className="text-xs text-gray-400">
                {t.partsRequest.ctaDesc}
              </p>
              <a
                href="tel:+13466257229"
                className="block text-center py-3 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#d9650b] text-white font-extrabold text-sm tracking-wider hover:opacity-95 transition-opacity shadow-lg shadow-[#f87f21]/20 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>+1 346.625.7229</span>
              </a>
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />

      <PartsRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialBrand={selectedBrand}
      />
    </div>
  );
}
