"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShieldCheck, Menu, X, ChevronRight } from "lucide-react";
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
      {/* Orange Top Divider Line (4px tall) */}
      <div className="h-[4px] bg-[#f87f21] w-full" />

      {/* Main Header Nav */}
      <header className="sticky top-0 z-40 bg-[#0d0f14]/90 backdrop-blur-md border-b border-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src="/logo.webp"
              alt="Tractor Parts Depot Logo"
              width={220}
              height={60}
              className="h-11 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs sm:text-sm font-bold tracking-wider text-gray-300 uppercase">
            <Link href="/" className="hover:text-[#f87f21] transition-colors py-2">
              Home
            </Link>
            <Link href="/inventory" className="hover:text-[#f87f21] transition-colors py-2 flex items-center gap-1.5">
              Parts Catalog
              <span className="bg-[#f87f21]/20 text-[#f87f21] text-[10px] px-1.5 py-0.5 rounded font-mono font-bold lowercase">
                170+
              </span>
            </Link>
            <Link href="/equipment" className="hover:text-[#f87f21] transition-colors py-2">
              Heavy Equipment
            </Link>
            <Link href="/parts-request" className="hover:text-[#f87f21] transition-colors py-2">
              Request by Brand
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => handleOpenModal()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#d9650b] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#f87f21]/20 hover:shadow-lg hover:shadow-[#f87f21]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Get Quote</span>
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
            <nav className="flex flex-col space-y-3 font-bold text-xs tracking-wider text-gray-200 uppercase">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gray-800/60"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Link>
              <Link
                href="/inventory"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gray-800/60"
              >
                <span>Parts Catalog (170+)</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Link>
              <Link
                href="/equipment"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gray-800/60"
              >
                <span>Heavy Equipment</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Link>
              <Link
                href="/parts-request"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gray-800/60"
              >
                <span>Request by Brand (CAT, Cummins, Komatsu, Volvo)</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Link>
            </nav>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenModal();
              }}
              className="w-full py-3 rounded-xl bg-[#f87f21] text-white font-bold text-xs uppercase tracking-wider text-center shadow-lg"
            >
              Request Quick Quote
            </button>
          </div>
        )}
      </header>

      {/* Quote Request Modal */}
      <PartsRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialBrand={modalBrand} />
    </>
  );
}
