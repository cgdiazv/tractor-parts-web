"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Send, ShieldCheck, CheckCircle2, AlertCircle, Wrench, PackageCheck } from "lucide-react";
import { allBrands } from "@/app/lib/inventory";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialBrand?: string;
  initialPartName?: string;
  initialSku?: string;
}

export default function PartsRequestModal({
  isOpen,
  onClose,
  initialBrand = "",
  initialPartName = "",
  initialSku = "",
}: Props) {
  const [brand, setBrand] = useState(initialBrand || "CAT");
  const [partName, setPartName] = useState(initialPartName);
  const [sku, setSku] = useState(initialSku);
  const [machineModel, setMachineModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialBrand) setBrand(initialBrand);
    if (initialPartName) setPartName(initialPartName);
    if (initialSku) setSku(initialSku);
  }, [initialBrand, initialPartName, initialSku]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#14171f] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1a1f2c] border-b border-gray-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.webp"
              alt="Tractor Parts Depot Logo"
              width={160}
              height={45}
              className="h-9 w-auto object-contain"
            />
            <div className="border-l border-gray-700/80 pl-3">
              <h3 className="text-base font-bold text-white uppercase tracking-tight">
                Quote Request
              </h3>
              <p className="text-[11px] text-gray-400">
                Direct Technical Assistance
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-white">Request Sent Successfully!</h4>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                We have received your inquiry for part <span className="text-[#f87f21] font-bold">{partName || "requested"}</span>. Our technical team will contact you shortly with availability and pricing.
              </p>
              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-[#f87f21] text-white font-bold text-sm hover:bg-[#df680d] transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Brand Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Machinery / Part Brand *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {allBrands.map((b) => (
                    <button
                      key={b.code}
                      type="button"
                      onClick={() => setBrand(b.code)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        brand === b.code
                          ? "bg-[#f87f21] text-white border-[#f87f21] shadow-md shadow-[#f87f21]/20"
                          : "bg-[#1c212d] text-gray-300 border-gray-800 hover:border-gray-700"
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Part Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Part Name or Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                    placeholder="e.g. Diesel Injector, Fuel Filter, Final Drive..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Part Number / SKU (If known)
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. 1W9A1F5 / TPD-CAT-1004"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
              </div>

              {/* Machine Model & Serial */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Machine Model
                  </label>
                  <input
                    type="text"
                    value={machineModel}
                    onChange={(e) => setMachineModel(e.target.value)}
                    placeholder="e.g. CAT 349D / Volvo L220E"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Chassis / Engine Serial No.
                  </label>
                  <input
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    placeholder="Serial number"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Quantity Required
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
              </div>

              {/* Customer Contact */}
              <div className="border-t border-gray-800/80 pt-4 space-y-4">
                <h4 className="text-xs font-bold text-[#f87f21] uppercase tracking-wider flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4" />
                  Customer Contact Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name / Company *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your name or company"
                      className="w-full px-3 py-2 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+504 9900-0000"
                      className="w-full px-3 py-2 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@company.com"
                      className="w-full px-3 py-2 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Additional Notes</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Details about delivery location, urgency, or specs..."
                    className="w-full px-3 py-2 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-3 flex items-center justify-between border-t border-gray-800">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Guaranteed Import & Technical Support</span>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#d9650b] text-white font-bold text-sm shadow-lg shadow-[#f87f21]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Quote Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
