"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, PhoneCall, Menu, X, ChevronRight, Globe } from "lucide-react";
import PartsRequestModal from "./PartsRequestModal";
import { partsInventory } from "@/app/lib/inventory";
import { useLanguage } from "@/app/context/LanguageContext";

function UsaFlag() {
  return (
    <svg className="w-full h-full object-cover block" viewBox="0 0 640 480" preserveAspectRatio="none">
      <g fillRule="evenodd">
        <path fill="#bd3d44" d="M0 0h640v480H0z"/>
        <path fill="#fff" d="M0 36.9h640v36.9H0zm0 73.8h640v36.9H0zm0 73.9h640v36.9H0zm0 73.8h640v36.9H0zm0 73.9h640v36.9H0zm0 73.8h640v36.9H0z"/>
        <path fill="#192f5d" d="M0 0h256v258.5H0z"/>
        <g fill="#fff">
          <path d="M20.2 14.5l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1zM58.6 14.5l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1zM97 14.5l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1zM135.4 14.5l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1zM173.8 14.5l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1zM212.2 14.5l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1z"/>
          <path d="M39.4 39.1l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1zM77.8 39.1l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1zM116.2 39.1l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1zM154.6 39.1l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1zM193 39.1l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1z"/>
        </g>
      </g>
    </svg>
  );
}

function HondurasFlag() {
  return (
    <svg className="w-full h-full object-cover block" viewBox="0 0 640 480" preserveAspectRatio="none">
      <g fillRule="evenodd">
        <path fill="#00bce4" d="M0 0h640v480H0z"/>
        <path fill="#ffffff" d="M0 160h640v160H0z"/>
        <g fill="#00bce4">
          <path d="M230 205l1.8 5.5h5.8l-4.7 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.7-3.4h5.8zM230 255l1.8 5.5h5.8l-4.7 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.7-3.4h5.8zM410 205l1.8 5.5h5.8l-4.7 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.7-3.4h5.8zM410 255l1.8 5.5h5.8l-4.7 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.7-3.4h5.8zM320 230l1.8 5.5h5.8l-4.7 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.7-3.4h5.8z"/>
        </g>
      </g>
    </svg>
  );
}

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBrand, setModalBrand] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [catalogCount, setCatalogCount] = useState<number>(partsInventory.length);

  useEffect(() => {
    // Fetch live Prado Commerce inventory count if available
    fetch("/api/prado/products")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.parts) && data.parts.length > 0) {
          setCatalogCount(data.parts.length);
        }
      })
      .catch(() => {});
  }, []);

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

        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-3 lg:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src={language === "es" ? "/logo-es.webp" : "/logo.webp"}
              alt="Tractor Parts Depot Logo"
              width={220}
              height={60}
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-xs xl:text-sm font-bold tracking-wider text-gray-300 uppercase whitespace-nowrap">
            <Link href="/inventory" className="hover:text-[#f87f21] transition-colors py-2 flex items-center gap-1.5">
              <span>{t.nav.partsCatalog}</span>
              <span className="bg-[#f87f21]/20 text-[#f87f21] text-[10px] px-1.5 py-0.5 rounded font-mono font-bold lowercase">
                {catalogCount}+
              </span>
            </Link>
            <Link href="/equipment" className="hover:text-[#f87f21] transition-colors py-2">
              {t.nav.heavyEquipment}
            </Link>
            <Link href="/parts-request" className="hover:text-[#f87f21] transition-colors py-2">
              {t.nav.requestByBrand}
            </Link>
            <Link href="/contact" className="hover:text-[#f87f21] transition-colors py-2">
              {t.nav.contactUs}
            </Link>
          </nav>

          {/* CTA, Search & White Container Flag Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* White Container Flag Toggle Widget */}
            <div className="flex items-center bg-[#181c26]/90 border border-gray-700/80 rounded-xl p-1 shadow-inner shrink-0 gap-1.5">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`p-[2px] rounded-lg transition-all cursor-pointer block ${
                  language === "en"
                    ? "bg-white shadow-md scale-105 opacity-100"
                    : "opacity-40 hover:opacity-100"
                }`}
                title="English (USA)"
              >
                <div className="w-7 h-4.5 rounded-[5px] overflow-hidden">
                  <UsaFlag />
                </div>
              </button>
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`p-[2px] rounded-lg transition-all cursor-pointer block ${
                  language === "es"
                    ? "bg-white shadow-md scale-105 opacity-100"
                    : "opacity-40 hover:opacity-100"
                }`}
                title="Español (Honduras)"
              >
                <div className="w-7 h-4.5 rounded-[5px] overflow-hidden">
                  <HondurasFlag />
                </div>
              </button>
            </div>

            {/* Search Icon & Expandable Input */}
            <form onSubmit={handleNavSearch} className="relative flex items-center shrink-0">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-[#181c26]/95 border border-[#f87f21]/60 rounded-xl px-3 py-2 shadow-2xl transition-all w-44 sm:w-56 md:w-64">
                  <Search className="w-4 h-4 text-[#f87f21] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.nav.searchPlaceholder}
                    autoFocus
                    className="w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-gray-400 hover:text-white p-0.5 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-xl bg-[#181c26]/80 border border-gray-700/80 text-gray-200 hover:text-[#f87f21] hover:border-[#f87f21]/60 transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  aria-label="Search Catalog"
                  title={t.nav.searchBtn}
                >
                  <Search className="w-4 h-4 text-[#f87f21]" />
                  <span className="hidden xl:inline text-xs">{t.nav.searchBtn}</span>
                </button>
              )}
            </form>

            {/* Phone Call CTA */}
            <div className="hidden sm:flex items-center gap-4 shrink-0">
              <a
                href="tel:+13466257229"
                className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#d9650b] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#f87f21]/20 hover:shadow-lg hover:shadow-[#f87f21]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4" />
                <span>+1 346.625.7229</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-800 text-gray-200 hover:text-white cursor-pointer shrink-0"
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

      {/* Mobile Sliding Drawer */}
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
                src={language === "es" ? "/logo-es.webp" : "/logo.webp"}
                alt="Tractor Parts Depot Logo"
                width={180}
                height={50}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-gray-800 text-gray-400 hover:text-white cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Language Switcher */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#181c26] border border-gray-800">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#f87f21]" /> Language:
            </span>
            <div className="flex items-center bg-[#0b0d10] border border-gray-700/80 rounded-lg p-1 text-xs font-bold gap-1.5">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`p-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  language === "en"
                    ? "bg-white text-black font-black shadow-md"
                    : "text-gray-400 hover:text-gray-200 opacity-60"
                }`}
              >
                <div className="w-6 h-4 rounded-[4px] overflow-hidden">
                  <UsaFlag />
                </div>
                <span>USA</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`p-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  language === "es"
                    ? "bg-white text-black font-black shadow-md"
                    : "text-gray-400 hover:text-gray-200 opacity-60"
                }`}
              >
                <div className="w-6 h-4 rounded-[4px] overflow-hidden">
                  <HondurasFlag />
                </div>
                <span>HN</span>
              </button>
            </div>
          </div>

          {/* Drawer Nav Links */}
          <nav className="flex flex-col space-y-2 font-bold text-xs tracking-wider text-gray-200 uppercase">
            <Link
              href="/inventory"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/60 transition-colors"
            >
              <span>{t.nav.partsCatalog} ({catalogCount}+)</span>
              <ChevronRight className="w-4 h-4 text-[#f87f21]" />
            </Link>
            <Link
              href="/equipment"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/60 transition-colors"
            >
              <span>{t.nav.heavyEquipment}</span>
              <ChevronRight className="w-4 h-4 text-[#f87f21]" />
            </Link>
            <Link
              href="/parts-request"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/60 transition-colors"
            >
              <span>{t.nav.requestByBrand}</span>
              <ChevronRight className="w-4 h-4 text-[#f87f21]" />
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/60 transition-colors"
            >
              <span>{t.nav.contactUs}</span>
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
            {t.nav.mobileSubtitle}
          </p>
        </div>
      </div>

      {/* Quote Request Modal */}
      <PartsRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialBrand={modalBrand} />
    </>
  );
}
