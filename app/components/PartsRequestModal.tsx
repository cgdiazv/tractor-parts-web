"use client";

import React, { useState, useEffect } from "react";
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
            <div className="w-10 h-10 rounded-lg bg-[#f87f21]/20 border border-[#f87f21]/40 flex items-center justify-center text-[#f87f21]">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                Solicitud de Cotización de Repuestos
              </h3>
              <p className="text-xs text-gray-400">
                Tractor Parts Depot • Valle de Sula #2, San Pedro Sula
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
              <h4 className="text-2xl font-black text-white">¡Solicitud Enviada con Éxito!</h4>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Hemos recibido tu requerimiento de repuesto <span className="text-[#f87f21] font-bold">{partName || "solicitado"}</span>. Nuestro equipo técnico en Valle de Sula se pondrá en contacto contigo en breve con la disponibilidad y mejor precio.
              </p>
              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-[#f87f21] text-white font-bold text-sm hover:bg-[#df680d] transition-colors"
                >
                  Cerrar Ventana
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Brand Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Marca de la Maquinaria / Repuesto *
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
                    Nombre o Descripción del Repuesto *
                  </label>
                  <input
                    type="text"
                    required
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                    placeholder="Ej. Inyector Diésel, Filtro de Combustible, Mandos Finales..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Número de Parte / SKU (Si se conoce)
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Ej. 1W9A1F5 / TPD-CAT-1004"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
              </div>

              {/* Machine Model & Serial */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Modelo de Máquina
                  </label>
                  <input
                    type="text"
                    value={machineModel}
                    onChange={(e) => setMachineModel(e.target.value)}
                    placeholder="Ej. CAT 349D / Volvo L220E"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Serie de Chasis / Motor
                  </label>
                  <input
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    placeholder="Número de serie"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Cantidad Requerida
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
                  Datos de Contacto del Cliente
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Tu nombre o Empresa"
                      className="w-full px-3 py-2 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Teléfono / WhatsApp *</label>
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
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full px-3 py-2 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Notas Adicionales</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Detalles sobre entrega, urgencia o especificaciones de la pieza..."
                    className="w-full px-3 py-2 rounded-xl bg-[#1a1f2c] border border-gray-800 text-white text-sm focus:outline-none focus:border-[#f87f21]"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-3 flex items-center justify-between border-t border-gray-800">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Importación Garantizada • Valle de Sula #2</span>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#d9650b] text-white font-bold text-sm shadow-lg shadow-[#f87f21]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Procesando...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Cotización</span>
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
