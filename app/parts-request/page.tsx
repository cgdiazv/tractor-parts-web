"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PartsRequestModal from "@/app/components/PartsRequestModal";
import { allBrands, storeInfo } from "@/app/lib/inventory";
import { Wrench, ShieldCheck, CheckCircle2, FileText, Send, PhoneCall, Building2 } from "lucide-react";

export default function PartsRequestPage() {
  const [selectedBrand, setSelectedBrand] = useState("CAT");
  const [modalOpen, setModalOpen] = useState(false);

  const brandGuides: Record<string, { title: string; desc: string; popularParts: string[] }> = {
    CAT: {
      title: "Caterpillar (CAT) Parts Quote",
      desc: "Genuine & OEM replacement parts for 988G, 966G, 966H wheel loaders, 349D excavators, D6G track-type tractors, and CAT diesel engines.",
      popularParts: ["DRIVE GP-SWING", "DRIVE GP-CIRCLE", "DIESEL INJECTORS", "FINAL DRIVE GP", "CAT FILTERS"],
    },
    Cummins: {
      title: "Cummins Engine Parts Quote",
      desc: "Genuine and aftermarket components for Cummins QSC, ISX, N14, 6BT, 4BT diesel engines and high-pressure fuel injectors.",
      popularParts: ["FUEL FILTER", "FUEL INJECTOR VALVE", "TURBOCHARGER ASSY", "PRESSURE SENSORS", "GASKET KIT"],
    },
    Komatsu: {
      title: "Komatsu Heavy Equipment Parts Quote",
      desc: "Undercarriage and engine parts for Komatsu excavators and dozers PC200, PC300, D65, D85, D155.",
      popularParts: ["IDLER AS", "TURBOCHARGER ASSEMBLY", "IDLER-TRACK", "PISTON ASS'Y", "TRACK LINK ASSEMBLY"],
    },
    Volvo: {
      title: "Volvo Construction Parts Quote",
      desc: "Parts for Volvo L220E, L350H wheel loaders, EC210, EC290 excavators, and Volvo D12 engines.",
      popularParts: ["SPARE PART PRESSURE SWITCH", "BALL BEARING CH A2EB", "SEAL KITS", "CONTROL VALVES"],
    },
    "John Deere": {
      title: "John Deere Heavy Equipment Parts Quote",
      desc: "Components for John Deere construction & agricultural machinery, transmissions, hydraulic pumps, and undercarriages.",
      popularParts: ["OIL & FUEL FILTERS", "HYDRAULIC PUMPS", "WATER PUMPS", "BEARINGS"],
    },
    "Case IH": {
      title: "Case IH & Construction Equipment Parts Quote",
      desc: "Components for Case 580 backhoes, Magnum tractors, excavators, and heavy machinery.",
      popularParts: ["SEALS & GASKETS", "DIESEL INJECTORS", "INJECTION PUMPS", "BRAKE DISCS"],
    },
  };

  const currentGuide = brandGuides[selectedBrand] || brandGuides["CAT"];

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#f3f4f6] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 w-full">
        {/* Header */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gray-800 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Official Quote Request Form</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Request Replacement Parts by <span className="text-[#f87f21]">Machinery Brand</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            Enter your equipment details (Caterpillar, Cummins, Komatsu, Volvo, John Deere, or Case IH) and our technical team will verify the exact part using OEM catalogs.
          </p>
        </div>

        {/* Brand Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {allBrands.map((b) => (
            <button
              key={b.code}
              onClick={() => setSelectedBrand(b.code)}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                selectedBrand === b.code
                  ? "bg-[#f87f21] text-white border-[#f87f21] font-bold shadow-lg shadow-[#f87f21]/20 scale-105"
                  : "glass-panel text-gray-300 border-gray-800 hover:border-gray-700"
              }`}
            >
              <div className="text-sm font-black uppercase">{b.name}</div>
              <div className="text-[10px] opacity-80 mt-0.5 uppercase tracking-wider font-semibold">Quote Parts</div>
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
                Popular Stocked Parts for {selectedBrand}:
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
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f87f21] to-[#df680d] text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-[#f87f21]/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Open Quote Request Form for {selectedBrand}</span>
              </button>
            </div>
          </div>

          {/* Side Info Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#f87f21]/20 text-[#f87f21] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">Why Request a Quote With Us?</h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Verification by chassis / engine serial number</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Immediate dispatch from our depot</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Weekly direct factory imports</span>
                </li>
              </ul>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f87f21] uppercase">
                <PhoneCall className="w-4 h-4" /> Phone Assistance
              </div>
              <p className="text-xs text-gray-400">
                If you prefer support via phone call or email, contact sales directly:
              </p>
              <a
                href={`tel:${storeInfo.phone.split("/")[0].trim()}`}
                className="block text-center py-2.5 rounded-xl bg-gray-800 text-white font-bold text-sm hover:bg-gray-700 transition-colors"
              >
                {storeInfo.phone.split("/")[0].trim()}
              </a>
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
