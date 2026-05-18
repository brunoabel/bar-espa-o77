"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { dict, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md py-3 border-b border-[#dc2626]/20" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-[#dc2626] p-1.5 flex flex-col items-center leading-none transition-transform group-hover:scale-105">
              <span className="font-bebas text-[0.6rem] tracking-[0.2em] text-white">ESPAÇO</span>
              <div className="w-full h-[1px] bg-white/50 my-0.5" />
              <span className="font-bebas text-xl text-white tracking-tight">77</span>
            </div>
            <span className={`font-bebas text-xl tracking-widest text-[#f0e6cc] transition-opacity duration-300 hidden sm:block ${scrolled ? "opacity-100" : "opacity-0"}`}>PORTO</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-bebas tracking-widest text-xs lg:text-sm text-[#f0e6cc]">
            <Link href="/menu" className="hover:text-[#dc2626] transition-colors">{dict.nav.menu}</Link>
            <Link href="/historia" className="hover:text-[#dc2626] transition-colors">{dict.nav.history}</Link>
            <Link href="/localizacao" className="hover:text-[#dc2626] transition-colors">{dict.nav.location}</Link>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <div className="flex gap-2">
                {(['pt', 'en', 'es'] as const).map((l) => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[10px] w-6 h-6 rounded-full flex items-center justify-center transition-all ${lang === l ? "bg-[#dc2626] text-white" : "hover:bg-white/5 opacity-40 hover:opacity-100"}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-[#f0e6cc] hover:text-[#dc2626]">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial="closed" animate="open" exit="closed" variants={navVariants}
            className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex gap-2">
                {(['pt', 'en', 'es'] as const).map((l) => (
                  <button 
                    key={l}
                    onClick={() => { setLang(l); setIsMenuOpen(false); }}
                    className={`text-xs w-8 h-8 rounded-full flex items-center justify-center transition-all ${lang === l ? "bg-[#dc2626] text-white" : "bg-white/5 opacity-40"}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="text-[#f0e6cc] hover:text-[#dc2626]">
                <X size={32} />
              </button>
            </div>
            <nav className="flex flex-col gap-8 font-bebas text-4xl tracking-tighter text-[#f0e6cc]">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#dc2626]">HOME</Link>
              <Link href="/menu" onClick={() => setIsMenuOpen(false)} className="hover:text-[#dc2626]">{dict.nav.menu}</Link>
              <Link href="/historia" onClick={() => setIsMenuOpen(false)} className="hover:text-[#dc2626]">{dict.nav.history}</Link>
              <Link href="/localizacao" onClick={() => setIsMenuOpen(false)} className="hover:text-[#dc2626]">{dict.nav.location}</Link>
            </nav>
            <div className="mt-auto pt-10 border-t border-[#dc2626]/20">
              <p className="font-bebas text-lg tracking-widest text-[#dc2626]">ESPAÇO 77 · PORTO</p>
              <p className="text-sm opacity-40 font-lora italic mt-2">Travessa de Cedofeita, 77</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
