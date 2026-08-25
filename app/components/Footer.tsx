"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#080a0e] text-gray-300 border-t border-gray-800/80 pt-12 pb-8 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Logo Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-gray-800/80">
          <Link href="/" className="inline-block group">
            <Image
              src={language === "es" ? "/logo-es.webp" : "/logo.webp"}
              alt="Tractor Parts Depot Logo"
              width={220}
              height={60}
              className="h-11 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
            />
          </Link>
          <span className="text-xs font-semibold text-gray-400 max-w-md">
            {t.footer.blurb}
          </span>
        </div>

        {/* 4 Column Footer Content matching design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Col 1: San Pedro Sula, HN */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
              SAN PEDRO SULA, HN
            </h3>
            <div className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
              <p>27 cll. 19 ave. SE</p>
              <p>San Pedro Sula, HN 21101</p>
            </div>
            <div className="pt-1 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#f87f21] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              <a
                href="https://wa.me/50499911407"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f87f21] font-bold text-sm sm:text-base hover:underline"
              >
                504.9991.1407
              </a>
            </div>
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Valle+de+Sula+2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 hover:text-[#f87f21] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>{t.footer.getDirections}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Orlando, FL */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
              ORLANDO, FL
            </h3>
            <div className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
              <p>7450 E Irlo Bronson Memorial Hwy, St Cloud</p>
              <p>FL 34771</p>
            </div>
            <div className="pt-1 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#f87f21] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              <a
                href="https://wa.me/13466257229"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f87f21] font-bold text-sm sm:text-base hover:underline"
              >
                346.625.7229
              </a>
            </div>
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=7450+E+Irlo+Bronson+Memorial+Hwy+St+Cloud+FL+34771"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 hover:text-[#f87f21] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>{t.footer.getDirections}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Hours & Email */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
              {t.contact.hoursTitle}
            </h3>
            <div className="text-xs sm:text-sm text-gray-300 space-y-1 font-medium">
              <p>{t.contact.hoursWeekdays}</p>
              <p>{t.contact.hoursSat}</p>
            </div>
            <div className="pt-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#f87f21] shrink-0" />
              <a
                href="mailto:info@tractorpartsdepot.us"
                className="text-xs sm:text-sm font-semibold text-white hover:text-[#f87f21] transition-colors"
              >
                info@tractorpartsdepot.us
              </a>
            </div>
          </div>

          {/* Col 4: Quick Links */}
          <div className="lg:col-span-3 space-y-3 lg:border-l lg:border-gray-800 lg:pl-8">
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold text-gray-300">
              <li>
                <Link href="/inventory" className="hover:text-[#f87f21] transition-colors flex items-center gap-1.5">
                  <span className="text-[#f87f21] font-bold">+</span> {t.nav.partsCatalog}
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="hover:text-[#f87f21] transition-colors flex items-center gap-1.5">
                  <span className="text-[#f87f21] font-bold">+</span> {t.nav.heavyEquipment}
                </Link>
              </li>
              <li>
                <Link href="/parts-request" className="hover:text-[#f87f21] transition-colors flex items-center gap-1.5">
                  <span className="text-[#f87f21] font-bold">+</span> {t.nav.requestByBrand}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#f87f21] transition-colors flex items-center gap-1.5">
                  <span className="text-[#f87f21] font-bold">+</span> {t.nav.contactUs}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Taglines */}
        <div className="pt-6 border-t border-gray-800/60 text-[11px] text-gray-400 space-y-2">
          <p className="font-bold text-gray-300 uppercase tracking-wider">
            {t.footer.tagline}
          </p>
        </div>

        {/* Sub-footer */}
        <div className="pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Tractor Parts Depot. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
