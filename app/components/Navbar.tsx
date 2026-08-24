"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Search, ShieldCheck, Wrench, Menu, X, ChevronRight } from "lucide-react";
import { storeInfo } from "@/app/lib/inventory";
import PartsRequestModal from "./PartsRequestModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBrand, setModalBrand] = useState("");

  const handleOpenModal = (brand = "") => {
    setModalBrand(brand);
    setModalOpen(true);
  };

  return (
    <>
      {/* Top Bar with Store Details */}
      <div className="bg-[#08090c] text-xs text-gray-400 border-b border-gray-800/80 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#f87f21]" />
              <span className="hidden sm:inline font-medium">{storeInfo.location}</span>
              <span className="sm:hidden font-medium">Valle de Sula #2, SPS, HN</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-[#f87f21]" />
              <span>Lun - Vie: 08:00 AM - 05:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-5 ml-auto sm:ml-0">
            <a
              href={`tel:${storeInfo.phone.split("/")[0].trim()}`}
              className="flex items-center gap-1.5 text-gray-200 hover:text-[#f87f21] transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#f87f21]" />
              <span>{storeInfo.phone.split("/")[0].trim()}</span>
            </a>
            <span className="hidden lg:flex items-center gap-1.5 text-gray-300">
              <Mail className="w-3.5 h-3.5 text-[#f87f21]" />
              <span>{storeInfo.email}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <header className="sticky top-0 z-40 bg-[#0d0f14]/90 backdrop-blur-md border-b border-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f87f21] to-[#b34f00] flex items-center justify-center text-white shadow-lg shadow-[#f87f21]/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
                  TRACTOR <span className="text-[#f87f21]">PARTS</span> DEPOT
                </span>
              </div>
              <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase">
                Tracto Repuestos • Valle de Sula
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide text-gray-300">
            <Link href="/" className="hover:text-[#f87f21] transition-colors py-2">
              Inicio
            </Link>
            <Link href="/inventory" className="hover:text-[#f87f21] transition-colors py-2 flex items-center gap-1">
              Catálogo Repuestos
              <span className="bg-[#f87f21]/20 text-[#f87f21] text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                170+
              </span>
            </Link>
            <Link href="/equipment" className="hover:text-[#f87f21] transition-colors py-2">
              Maquinaria Pesada
            </Link>
            <Link href="/parts-request" className="hover:text-[#f87f21] transition-colors py-2">
              Solicitud por Marca
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => handleOpenModal()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#d9650b] text-white font-bold text-sm shadow-md shadow-[#f87f21]/20 hover:shadow-lg hover:shadow-[#f87f21]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Cotizar Repuestos</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-gray-800 text-gray-200 hover:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#12151c] border-b border-gray-800 px-6 py-5 space-y-4">
            <nav className="flex flex-col space-y-3 font-semibold text-gray-200">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gray-800/60"
              >
                <span>Inicio</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Link>
              <Link
                href="/inventory"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gray-800/60"
              >
                <span>Catálogo de Repuestos (170+)</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Link>
              <Link
                href="/equipment"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gray-800/60"
              >
                <span>Maquinaria Pesada</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Link>
              <Link
                href="/parts-request"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gray-800/60"
              >
                <span>Solicitud por Marca (CAT, Cummins, Komatsu, Volvo)</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Link>
            </nav>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenModal();
              }}
              className="w-full py-3 rounded-xl bg-[#f87f21] text-white font-bold text-sm text-center shadow-lg"
            >
              Solicitar Cotización Rápida
            </button>
          </div>
        )}
      </header>

      {/* Quote Request Modal */}
      <PartsRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialBrand={modalBrand} />
    </>
  );
}
