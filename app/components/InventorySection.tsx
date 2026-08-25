"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, Wrench, ShieldCheck, Tag, ArrowRight, RefreshCw, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { partsInventory, PartItem, allBrands } from "@/app/lib/inventory";
import PartsRequestModal from "./PartsRequestModal";

interface Props {
  initialBrand?: string;
  showTitle?: boolean;
  limit?: number;
}

export default function InventorySection({ initialBrand = "All", showTitle = true, limit }: Props) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = limit || 12;

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [activePart, setActivePart] = useState<PartItem | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    partsInventory.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, []);

  const filteredParts = useMemo(() => {
    return partsInventory.filter((item) => {
      const matchBrand =
        selectedBrand === "All" || item.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch =
        search.trim() === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase());

      return matchBrand && matchCategory && matchSearch;
    });
  }, [selectedBrand, selectedCategory, search]);

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
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {showTitle && (
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Genuine & Aftermarket Replacement Parts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Heavy Equipment <span className="text-[#f87f21]">Parts Catalog</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Explore over 170+ tractor and construction machinery replacement parts available at our depot. Fast regional delivery & direct shipping.
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
              placeholder="Search by part name, SKU, brand..."
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
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                selectedBrand === "All"
                  ? "bg-[#f87f21] text-white border-[#f87f21]"
                  : "bg-[#141822] text-gray-400 border-gray-800 hover:text-white"
              }`}
            >
              All Brands ({partsInventory.length})
            </button>
            {allBrands.map((b) => (
              <button
                key={b.code}
                onClick={() => {
                  setSelectedBrand(b.code);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
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
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#f87f21]" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-gray-700 text-white font-bold"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {cat === "All" ? "All" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs sm:text-sm font-semibold text-gray-400">
          Showing <span className="text-white font-bold">{filteredParts.length}</span> parts found
        </p>

        {(selectedBrand !== "All" || selectedCategory !== "All" || search) && (
          <button
            onClick={() => {
              setSelectedBrand("All");
              setSelectedCategory("All");
              setSearch("");
              setCurrentPage(1);
            }}
            className="text-xs text-[#f87f21] hover:underline flex items-center gap-1 font-bold"
          >
            <RefreshCw className="w-3 h-3" /> Clear Filters
          </button>
        )}
      </div>

      {/* Inventory Items Grid */}
      {displayedParts.length === 0 ? (
        <div className="py-16 text-center glass-panel rounded-2xl border border-gray-800">
          <Wrench className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No parts found</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto mt-1">
            We couldn&apos;t find any matches for &quot;{search}&quot;. Contact us directly and we will locate or import it for you.
          </p>
          <button
            onClick={() => {
              setSelectedBrand("All");
              setSelectedCategory("All");
              setSearch("");
            }}
            className="mt-4 px-5 py-2 rounded-xl bg-[#f87f21] text-white text-xs font-bold"
          >
            View All Parts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayedParts.map((item, idx) => (
            <div
              key={`${item.sku}-${idx}`}
              className="glass-panel glass-panel-hover p-5 rounded-2xl border border-gray-800/80 flex flex-col justify-between group"
            >
              <div>
                {/* Brand & Condition Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-gray-800 text-[#f87f21] border border-gray-700">
                    {item.brand}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> In Stock
                  </span>
                </div>

                {/* Part Name */}
                <h4 className="text-base font-bold text-white group-hover:text-[#f87f21] transition-colors line-clamp-2 mb-2">
                  {item.name}
                </h4>

                {/* Category & SKU */}
                <div className="space-y-1 text-xs text-gray-400 mb-4">
                  <p className="flex items-center gap-1.5 text-gray-400">
                    <Tag className="w-3.5 h-3.5 text-gray-500" />
                    <span>{item.category}</span>
                  </p>
                  <p className="font-mono text-[11px] text-gray-400">
                    SKU: <span className="text-gray-300 font-bold">{item.sku}</span>
                  </p>
                </div>
              </div>

              {/* Action & Price Quote */}
              <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Pricing</span>
                  <span className="text-sm font-bold text-[#f87f21]">Inquire Price</span>
                </div>
                <button
                  onClick={() => handleOpenQuote(item)}
                  className="px-3.5 py-2 rounded-xl bg-[#f87f21] text-white text-xs font-bold hover:bg-[#df680d] transition-all flex items-center gap-1.5 shadow-md shadow-[#f87f21]/20"
                >
                  <span>Get Quote</span>
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
            className="p-2.5 rounded-xl bg-[#141822] border border-gray-800 text-gray-300 disabled:opacity-40 hover:text-white hover:border-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-gray-300">
            Page <span className="text-[#f87f21]">{currentPage}</span> of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl bg-[#141822] border border-gray-800 text-gray-300 disabled:opacity-40 hover:text-white hover:border-gray-700"
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
