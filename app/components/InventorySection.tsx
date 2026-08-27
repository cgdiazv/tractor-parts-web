"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Search, Filter, Wrench, ArrowRight, RefreshCw, CheckCircle2, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { partsInventory, PartItem, allBrands, isBrandMatch } from "@/app/lib/inventory";
import PartsRequestModal from "./PartsRequestModal";
import { useLanguage } from "@/app/context/LanguageContext";

interface Props {
  initialBrand?: string;
  showTitle?: boolean;
  limit?: number;
}

export default function InventorySection({ initialBrand = "All", showTitle = true, limit }: Props) {
  const { t, translateCategory, translateCondition } = useLanguage();
  const [items, setItems] = useState<PartItem[]>(partsInventory);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = limit || 12;

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [activePart, setActivePart] = useState<PartItem | null>(null);

  useEffect(() => {
    fetch("/api/prado/products")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.parts) && data.parts.length > 0) {
          setItems(data.parts);
        }
      })
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [items]);

  const filteredParts = useMemo(() => {
    return items.filter((item) => {
      const matchBrand = isBrandMatch(item.brand, selectedBrand);
      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch =
        search.trim() === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase());

      return matchBrand && matchCategory && matchSearch;
    });
  }, [items, selectedBrand, selectedCategory, search]);

  const totalPages = Math.ceil(filteredParts.length / itemsPerPage);
  const displayedParts = useMemo(() => {
    if (limit) return filteredParts.slice(0, limit);
    const start = (currentPage - 1) * itemsPerPage;
    return filteredParts.slice(start, start + itemsPerPage);
  }, [filteredParts, currentPage, itemsPerPage, limit]);

  const handleOpenQuote = (part: PartItem) => {
    setActivePart(part);
    setModalOpen(true);
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto font-sans">
      {showTitle && (
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.inventory.sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {t.inventory.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            {t.inventory.sectionSubtitle}
          </p>
        </div>
      )}

      {/* Filter Controls Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-gray-800 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Box */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={t.inventory.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#12151c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
            />
          </div>

          {/* Brand Pills Filter */}
          <div className="md:col-span-2 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => {
                setSelectedBrand("All");
                setCurrentPage(1);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
                selectedBrand === "All"
                  ? "bg-[#f87f21] text-white border-[#f87f21]"
                  : "bg-[#141822] text-gray-400 border-gray-800 hover:text-white"
              }`}
            >
              {t.inventory.brand} {t.inventory.all} ({items.length})
            </button>
            {allBrands.map((b) => (
              <button
                key={b.code}
                onClick={() => {
                  setSelectedBrand(b.code);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
                  selectedBrand.toLowerCase() === b.code.toLowerCase()
                    ? "bg-[#f87f21] text-white border-[#f87f21]"
                    : "bg-[#141822] text-gray-400 border-gray-800 hover:text-white"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-gray-800/80 scrollbar-none">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#f87f21]" /> {t.inventory.category}
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gray-700 text-white font-bold"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {cat === "All" ? t.inventory.allCategories : translateCategory(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs sm:text-sm font-semibold text-gray-400">
          {limit ? (
            <>
              Showing <span className="text-white font-bold">{displayedParts.length}</span> of{" "}
              <span className="text-white font-bold">{filteredParts.length}</span> parts
            </>
          ) : (
            <>
              Showing{" "}
              <span className="text-white font-bold">
                {filteredParts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
                {Math.min(currentPage * itemsPerPage, filteredParts.length)}
              </span>{" "}
              {t.inventory.of} <span className="text-white font-bold">{filteredParts.length}</span> parts
            </>
          )}
        </p>

        {(selectedBrand !== "All" || selectedCategory !== "All" || search) && (
          <button
            onClick={() => {
              setSelectedBrand("All");
              setSelectedCategory("All");
              setSearch("");
              setCurrentPage(1);
            }}
            className="text-xs text-[#f87f21] hover:underline flex items-center gap-1 font-bold cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> {t.inventory.resetFilters}
          </button>
        )}
      </div>

      {/* Inventory Items Grid */}
      {displayedParts.length === 0 ? (
        <div className="py-16 text-center glass-panel rounded-2xl border border-gray-800">
          <Wrench className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">{t.inventory.noResults}</h3>
          <button
            onClick={() => {
              setSelectedBrand("All");
              setSelectedCategory("All");
              setSearch("");
            }}
            className="mt-4 px-5 py-2 rounded-xl bg-[#f87f21] text-white text-xs font-bold cursor-pointer"
          >
            {t.inventory.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayedParts.map((item, idx) => (
            <div
              key={`${item.sku}-${idx}`}
              className="glass-panel glass-panel-hover rounded-2xl border border-gray-800/80 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Full-width Edge-to-Edge Product Image */}
                <div className="relative aspect-square w-full bg-[#0b0d10] overflow-hidden border-b border-gray-800 flex items-center justify-center">
                  <Image
                    src={item.imageUrl || "/images/prado-placeholder.jpg"}
                    alt={item.name}
                    fill
                    unoptimized={Boolean(item.imageUrl?.startsWith("http"))}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target && !target.src.includes("prado-placeholder.jpg")) {
                        target.srcset = "";
                        target.src = "/images/prado-placeholder.jpg";
                      }
                    }}
                  />
                </div>

                {/* Padded Content Body */}
                <div className="p-5 space-y-3">
                  {/* Part Name */}
                  <h4 className="text-base font-bold text-white group-hover:text-[#f87f21] transition-colors line-clamp-2">
                    {item.name}
                  </h4>

                  {/* Category & SKU */}
                  <div className="space-y-1 text-xs text-gray-400">
                    <p className="flex items-center gap-1.5 text-gray-400">
                      <Tag className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      <span className="truncate">{translateCategory(item.category)}</span>
                    </p>
                    <p className="font-mono text-[11px] text-gray-400">
                      {t.inventory.skuLabel} <span className="text-gray-300 font-bold">{item.sku}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Condition, Stock & Button */}
              <div className="p-5 pt-0 space-y-2.5">
                <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block truncate">
                    {translateCondition(item.condition)}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3" /> {t.inventory.inStock}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenQuote(item)}
                  className="w-full py-2.5 rounded-xl bg-[#f87f21] text-white text-xs font-bold hover:bg-[#df680d] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#f87f21]/20 cursor-pointer"
                >
                  <span>{t.inventory.requestQuote}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!limit && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl bg-[#141822] border border-gray-800 text-gray-300 disabled:opacity-40 hover:text-white hover:border-gray-700 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-gray-300">
            {t.inventory.page} <span className="text-[#f87f21]">{currentPage}</span> {t.inventory.of} {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl bg-[#141822] border border-gray-800 text-gray-300 disabled:opacity-40 hover:text-white hover:border-gray-700 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Quote Request Modal */}
      {activePart && (
        <PartsRequestModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setActivePart(null);
          }}
          initialBrand={activePart.brand}
          initialPartName={activePart.name}
          initialSku={activePart.sku}
        />
      )}
    </section>
  );
}
