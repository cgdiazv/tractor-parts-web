"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Wrench, ShieldCheck, ArrowUpRight } from "lucide-react";
import { storeInfo, allBrands } from "@/app/lib/inventory";

export default function Footer() {
  return (
    <footer className="bg-[#080a0e] text-gray-400 border-t border-gray-800/80 pt-16 pb-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Col 1: About & Depot Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f87f21] flex items-center justify-center text-white shadow-lg shadow-[#f87f21]/20">
              <Wrench className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                TRACTOR <span className="text-[#f87f21]">PARTS</span> DEPOT
              </h3>
              <span className="text-[10px] font-bold text-gray-400 block uppercase">
                Valle de Sula #2 • Honduras
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-gray-400">
            {storeInfo.tagline}. Especialistas en repuestos de motor, mandos finales, rodaje, filtros e inyectores para excavadoras, cargadores y tractores.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Garantía de Calidad e Importación Directa</span>
          </div>
        </div>

        {/* Col 2: Operating Hours & Location */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#f87f21]">
            Ubicación y Horarios
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#f87f21] shrink-0 mt-0.5" />
              <span>{storeInfo.location}</span>
            </div>
            <p className="text-[11px] text-gray-500 pl-6">
              Coexistencia operativa en San Pedro Sula, Choloma, Chamelecón, Guanacaste y La Lima.
            </p>
          </div>

          <div className="pt-2 space-y-1.5 border-t border-gray-800 text-xs">
            <div className="flex items-center gap-2 text-gray-300 font-bold">
              <Clock className="w-3.5 h-3.5 text-[#f87f21]" />
              <span>Horarios de Atención:</span>
            </div>
            {storeInfo.hours.map((h, i) => (
              <div key={i} className="flex justify-between text-[11px] text-gray-400">
                <span>{h.days}:</span>
                <span className="text-white font-medium">{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Supported Heavy Equipment Brands */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#f87f21]">
            Marcas Soportadas
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {allBrands.map((b) => (
              <Link
                key={b.code}
                href={`/inventory?brand=${b.code}`}
                className="p-2 rounded-lg bg-[#11141c] hover:bg-[#f87f21]/20 hover:text-[#f87f21] border border-gray-800 transition-colors flex items-center justify-between group"
              >
                <span>{b.name}</span>
                <ArrowUpRight className="w-3 h-3 text-gray-600 group-hover:text-[#f87f21]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4: Contact & Direct Quote Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#f87f21]">
            Atención al Cliente
          </h4>

          <div className="space-y-3 text-xs">
            <a
              href={`tel:${storeInfo.phone.split("/")[0].trim()}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#141824] border border-gray-800 hover:border-[#f87f21] transition-colors group"
            >
              <Phone className="w-4 h-4 text-[#f87f21]" />
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Ventas Directas</span>
                <span className="text-white font-bold text-sm group-hover:text-[#f87f21]">
                  {storeInfo.phone.split("/")[0].trim()}
                </span>
              </div>
            </a>

            <a
              href={`mailto:${storeInfo.email}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#141824] border border-gray-800 hover:border-[#f87f21] transition-colors group"
            >
              <Mail className="w-4 h-4 text-[#f87f21]" />
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Correo Electrónico</span>
                <span className="text-white font-bold text-xs group-hover:text-[#f87f21]">
                  {storeInfo.email}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© {new Date().getFullYear()} Tractor Parts Depot • Tracto Repuestos Valle de Sula. Todos los derechos reservados.</p>
        <div className="flex items-center gap-6">
          <Link href="/inventory" className="hover:text-gray-300">Catálogo</Link>
          <Link href="/equipment" className="hover:text-gray-300">Maquinaria</Link>
          <Link href="/parts-request" className="hover:text-gray-300">Cotización</Link>
        </div>
      </div>
    </footer>
  );
}
