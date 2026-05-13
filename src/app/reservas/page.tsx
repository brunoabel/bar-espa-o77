"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Clock, Send, CheckCircle2 } from "lucide-react";

export default function Reservas() {
  const { dict } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telemovel: "",
    email: "",
    data: "",
    hora: "",
    pessoas: "2",
    observacoes: "",
    rgpd: false,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.nome.trim()) return setErrorMsg(dict.book.errName);
    if (!formData.telemovel.trim() && !formData.email.trim()) {
      return setErrorMsg(dict.book.errContact);
    }
    if (!formData.data) return setErrorMsg(dict.book.errDate);
    if (!formData.hora) return setErrorMsg(dict.book.errTime);
    if (!formData.rgpd) return setErrorMsg(dict.book.errRgpd);

    console.log("Submitting reservation:", formData);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f0e6cc] pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        
        {/* HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#dc2626]" />
            <span className="font-bebas text-sm tracking-[0.4em] text-[#dc2626] uppercase font-bold">
              {dict.book.tag}
            </span>
            <div className="w-8 h-[1px] bg-[#dc2626]" />
          </div>
          <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl tracking-tighter leading-none mb-4">
            {dict.book.title}
          </h1>
        </motion.header>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-[#dc2626]/20 p-12 text-center"
            >
              <CheckCircle2 className="mx-auto text-[#dc2626] mb-8" size={64} />
              <div className="font-bebas text-5xl text-[#dc2626] mb-4 leading-none">ESPAÇO 77</div>
              <p className="font-lora text-xl italic text-[#8a7256] leading-relaxed">
                {dict.book.successMsg}
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-12 font-bebas text-lg tracking-widest text-[#dc2626] hover:text-[#f0e6cc] transition-colors"
              >
                NOVA RESERVA
              </button>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit} 
              className="space-y-8"
              noValidate
            >
              {/* NOME */}
              <div className="space-y-2">
                <label className="block font-bebas text-xs tracking-widest text-[#dc2626] uppercase">
                  {dict.book.name}
                </label>
                <input
                  type="text"
                  name="nome"
                  placeholder={dict.book.namePl}
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full bg-[#dc2626]/5 border border-[#dc2626]/20 px-6 py-4 font-lora text-[#f0e6cc] focus:border-[#dc2626] focus:outline-none transition-colors placeholder:text-[#8a7256]/40"
                />
              </div>

              {/* CONTACTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block font-bebas text-xs tracking-widest text-[#dc2626] uppercase">
                    {dict.book.phone}
                  </label>
                  <input
                    type="tel"
                    name="telemovel"
                    placeholder={dict.book.phonePl}
                    value={formData.telemovel}
                    onChange={handleChange}
                    className="w-full bg-[#dc2626]/5 border border-[#dc2626]/20 px-6 py-4 font-lora text-[#f0e6cc] focus:border-[#dc2626] focus:outline-none transition-colors placeholder:text-[#8a7256]/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-bebas text-xs tracking-widest text-[#dc2626] uppercase">
                    {dict.book.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={dict.book.emailPl}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#dc2626]/5 border border-[#dc2626]/20 px-6 py-4 font-lora text-[#f0e6cc] focus:border-[#dc2626] focus:outline-none transition-colors placeholder:text-[#8a7256]/40"
                  />
                </div>
              </div>

              {/* DATE / TIME / PAX */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="block font-bebas text-xs tracking-widest text-[#dc2626] uppercase">
                    {dict.book.date}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                      className="w-full bg-[#dc2626]/5 border border-[#dc2626]/20 px-6 py-4 font-lora text-[#f0e6cc] focus:border-[#dc2626] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-bebas text-xs tracking-widest text-[#dc2626] uppercase">
                    {dict.book.time}
                  </label>
                  <select
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    className="w-full bg-[#dc2626]/5 border border-[#dc2626]/20 px-6 py-4 font-lora text-[#f0e6cc] focus:border-[#dc2626] focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">{dict.book.timePh}</option>
                    {["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block font-bebas text-xs tracking-widest text-[#dc2626] uppercase">
                    {dict.book.pax}
                  </label>
                  <select
                    name="pessoas"
                    value={formData.pessoas}
                    onChange={handleChange}
                    className="w-full bg-[#dc2626]/5 border border-[#dc2626]/20 px-6 py-4 font-lora text-[#f0e6cc] focus:border-[#dc2626] focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="1">{dict.book.pax1}</option>
                    <option value="2">{dict.book.pax2}</option>
                    <option value="3">{dict.book.pax3}</option>
                    <option value="4">{dict.book.pax4}</option>
                    <option value="5">{dict.book.pax5}</option>
                    <option value="6">{dict.book.pax6}</option>
                  </select>
                </div>
              </div>

              {/* MESSAGE */}
              <div className="space-y-2">
                <label className="block font-bebas text-xs tracking-widest text-[#dc2626] uppercase">
                  {dict.book.msg}
                </label>
                <textarea
                  name="observacoes"
                  placeholder={dict.book.msgPl}
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#dc2626]/5 border border-[#dc2626]/20 px-6 py-4 font-lora text-[#f0e6cc] focus:border-[#dc2626] focus:outline-none transition-colors placeholder:text-[#8a7256]/40 resize-none"
                />
              </div>

              {/* RGPD */}
              <div className="flex items-start gap-4 p-4 border border-[#dc2626]/10 bg-[#dc2626]/5">
                <input
                  type="checkbox"
                  name="rgpd"
                  id="rgpd"
                  checked={formData.rgpd}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 accent-[#dc2626]"
                />
                <label htmlFor="rgpd" className="font-lora text-sm text-[#8a7256] leading-tight cursor-pointer">
                  {dict.book.rgpd}
                </label>
              </div>

              {errorMsg && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#dc2626] font-bebas text-sm tracking-widest text-center">
                  {errorMsg}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full bg-[#dc2626] text-white py-6 font-bebas text-2xl tracking-[0.2em] hover:bg-white hover:text-[#0a0a0a] transition-all flex items-center justify-center gap-4 group"
              >
                {dict.book.submit.toUpperCase()} <Send size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>

              <p className="text-center font-lora text-sm italic text-[#8a7256] opacity-60">
                {dict.book.note}
              </p>
            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
