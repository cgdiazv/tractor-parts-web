"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ContactPage() {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    category: "General Parts Inquiry",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSuccessMessage(
        data.message || (language === "es" ? "¡Su mensaje ha sido enviado con éxito a info@tractorpartsdepot.us!" : "Your message has been sent successfully to info@tractorpartsdepot.us!")
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        category: "General Parts Inquiry",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong while submitting.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#f3f4f6] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pb-16 w-full -mt-[84px]">
        {/* Full Width Top Header Banner */}
        <div className="relative w-full pt-[110px] pb-12 sm:pb-16 bg-[#0b0d10] border-b border-gray-800 overflow-hidden mb-12">
          <Image
            src="/header.webp"
            alt="Contact Header Background"
            fill
            priority
            quality={95}
            className="object-cover object-top opacity-55 pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10]/95 via-[#0b0d10]/80 to-[#0b0d10]/40 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>{t.contact.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              {t.contact.titlePrefix} <span className="text-[#f87f21]">{t.contact.titleHighlight}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              {t.contact.desc}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Form Column */}
            <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border border-gray-800 space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#f87f21]" />
                  <span>{t.contact.formTitle}</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {language === "es"
                    ? "Complete el formulario a continuación. Su solicitud será transmitida directamente a nuestro departamento de ventas."
                    : "Fill out the form below. Your request will be transmitted directly to our sales department."}
                </p>
              </div>

              {successMessage && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      {t.contact.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Carlos Mendoza"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0b0d10] border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#f87f21]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      {t.contact.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="carlos@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0b0d10] border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#f87f21]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      {t.contact.phone}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (346) 625-7229"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0b0d10] border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#f87f21]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      {t.contact.company}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Constructora Del Sur"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0b0d10] border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#f87f21]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      {t.contact.category}
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0b0d10] border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#f87f21]"
                    >
                      <option value="General Parts Inquiry">{t.contact.catGeneral}</option>
                      <option value="Diesel Engine Components">{t.contact.catEngine}</option>
                      <option value="Undercarriage & Track Parts">{t.contact.catUndercarriage}</option>
                      <option value="Heavy Machinery & Export Quote">{t.contact.catExport}</option>
                      <option value="Hydraulics & Seals">{t.contact.catHydraulics}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      {t.contact.subject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. CAT 349D Hydraulic Pump Quote"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0b0d10] border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#f87f21]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    {t.contact.message} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      language === "es"
                        ? "Proporcione números de parte, números de serie de máquina, modelo de motor o detalles de su cotización..."
                        : "Provide part numbers, machine serial numbers, engine model, or details regarding your quote requirement..."
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b0d10] border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#f87f21] leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f87f21] to-[#d9650b] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#f87f21]/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{t.contact.submitting}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.contact.submit}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Direct Contact Info Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              {/* Orlando Depot */}
              <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
                <div className="flex items-center gap-2 text-[#f87f21] font-black uppercase text-sm tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>ORLANDO, FL DEPOT (USA &amp; EXPORT)</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  7450 E Irlo Bronson Memorial Hwy, St Cloud, FL 34771
                </p>
                <div className="space-y-2 pt-2 border-t border-gray-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Direct Phone:</span>
                    <a href="tel:+13466257229" className="font-bold text-white hover:text-[#f87f21]">
                      +1 346.625.7229
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Official Email:</span>
                    <a href="mailto:info@tractorpartsdepot.us" className="font-bold text-[#f87f21] hover:underline">
                      info@tractorpartsdepot.us
                    </a>
                  </div>
                </div>
              </div>

              {/* San Pedro Sula Depot */}
              <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
                <div className="flex items-center gap-2 text-[#f87f21] font-black uppercase text-sm tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>SAN PEDRO SULA, HN DEPOT</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  27 cll. 19 ave. SE, San Pedro Sula, HN 21101
                </p>
                <div className="space-y-2 pt-2 border-t border-gray-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">WhatsApp / Sales:</span>
                    <a href="https://wa.me/50499911407" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-[#f87f21]">
                      +504 9991-1407
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-wider">
                  <Clock className="w-4 h-4 text-[#f87f21]" />
                  <span>{t.contact.hoursTitle}</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1 font-medium">
                  <div className="flex justify-between">
                    <span>{t.contact.hoursWeekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.contact.hoursSat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.contact.hoursSun}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
