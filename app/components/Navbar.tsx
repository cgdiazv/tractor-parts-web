"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, PhoneCall, Menu, X, ChevronRight } from "lucide-react";
import PartsRequestModal from "./PartsRequestModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBrand, setModalBrand] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenModal = (brand = "") => {
    setModalBrand(brand);
    setModalOpen(true);
  };

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/inventory?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#0b0d10]/95 backdrop-blur-md border-b border-gray-800 shadow-2xl"
            : "bg-transparent border-b border-white/10 backdrop-blur-xs"
        }`}
      >
        {/* Orange Top Divider Line (4px tall) */}
        <div className="relative z-50 h-[4px] bg-[#f87f21] w-full shadow-[0_2px_10px_rgba(248,127,33,0.5)]" />

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
            <Link href="/contact" className="hover:text-[#f87f21] transition-colors py-2">
              Contact Us
            </Link>
          </nav>

          {/* CTA & Search Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Icon & Expandable Input */}
            <form onSubmit={handleNavSearch} className="relative flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-[#181c26]/95 border border-gray-700 rounded-xl px-3 py-2 shadow-2xl transition-all w-48 sm:w-64">
                  <Search className="w-4 h-4 text-[#f87f21] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search part, SKU..."
                    autoFocus
                    className="w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-gray-400 hover:text-white p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-xl bg-[#181c26]/80 border border-gray-700/80 text-gray-200 hover:text-[#f87f21] hover:border-[#f87f21]/60 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                  aria-label="Search Catalog"
                  title="Search inventory catalog"
                >
                  <Search className="w-4 h-4 text-[#f87f21]" />
                  <span className="hidden md:inline text-xs">Search</span>
                </button>
              )}
            </form>

            <div className="hidden sm:flex items-center gap-4">
              <a
                href="tel:+13466257229"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#d9650b] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#f87f21]/20 hover:shadow-lg hover:shadow-[#f87f21]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>+1 346.625.7229</span>
              </a>
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
        </div>
      </header>

      {/* Mobile Side Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/80 z-50 lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Sliding Drawer (Solid Background) */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-[#0b0d10] border-r border-gray-800 shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
              <Image
                src="/logo.webp"
                alt="Tractor Parts Depot Logo"
                width={180}
                height={50}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-gray-800 text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Nav Links */}
          <nav className="flex flex-col space-y-2 font-bold text-xs tracking-wider text-gray-200 uppercase">
            <Link
              href="/inventory"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/60 transition-colors"
            >
              <span>Parts Catalog (170+)</span>
              <ChevronRight className="w-4 h-4 text-[#f87f21]" />
            </Link>
            <Link
              href="/equipment"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/60 transition-colors"
            >
              <span>Heavy Equipment</span>
              <ChevronRight className="w-4 h-4 text-[#f87f21]" />
            </Link>
            <Link
              href="/parts-request"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/60 transition-colors"
            >
              <span>Request by Brand</span>
              <ChevronRight className="w-4 h-4 text-[#f87f21]" />
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/60 transition-colors"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-[#f87f21]" />
            </Link>
          </nav>
        </div>

        {/* Drawer Footer CTA */}
        <div className="space-y-4 border-t border-gray-800 pt-4">
          <a
            href="tel:+13466257229"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#d9650b] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center shadow-lg"
          >
            <PhoneCall className="w-4 h-4" />
            <span>+1 346.625.7229</span>
          </a>
          <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider font-semibold">
            USA &amp; Orlando, FL Heavy Equipment Exporter
          </p>
        </div>
      </div>

      {/* Quote Request Modal */}
      <PartsRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialBrand={modalBrand} />
    </>
  );
}
