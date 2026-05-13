"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export default function Home() {
  const { dict } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f0e6cc] overflow-hidden selection:bg-[#dc2626] selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-32">
        {/* Background Decorative "77" */}
        <div className="absolute right-[-10%] bottom-[10%] text-[40vw] font-bebas text-[#dc2626]/5 leading-none select-none pointer-events-none z-0">
          77
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-[2px] bg-[#dc2626]" />
            <span className="font-bebas text-sm tracking-[0.4em] text-[#dc2626] uppercase font-bold">
              {dict.home.tag}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-bebas text-[clamp(4rem,15vw,10rem)] leading-[0.85] tracking-tighter mb-12"
          >
            {dict.home.hero1}<br />
            <span className="text-[#dc2626]">{dict.home.hero2}</span><br />
            {dict.home.hero3}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl"
          >
            <p className="font-lora text-lg sm:text-xl text-[#8a7256] leading-relaxed mb-12">
              {dict.home.subtitle[0]}
              <span className="text-[#f0e6cc] font-bold mx-1">{dict.home.subtitle[1]}</span>
              {dict.home.subtitle[2]}
              <br className="hidden sm:block" />
              {dict.home.quote[1]}
            </p>

            <div className="flex flex-wrap gap-6">
              <Link href="/menu" className="group bg-[#dc2626] text-white px-10 py-4 font-bebas text-xl tracking-widest hover:bg-white hover:text-[#0a0a0a] transition-all flex items-center gap-3 shadow-2xl shadow-[#dc2626]/20">
                {dict.home.btnMenu} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/reservas" className="border border-white/20 px-10 py-4 font-bebas text-xl tracking-widest hover:bg-white hover:text-[#0a0a0a] hover:border-white transition-all">
                {dict.home.btnBook.replace(' →', '')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* TICKER */}
        <div className="absolute bottom-10 left-0 w-full overflow-hidden opacity-20 hover:opacity-40 transition-opacity border-y border-white/5 py-4 bg-white/5 backdrop-blur-sm select-none">
          <div className="flex whitespace-nowrap animate-ticker">
            <span className="font-bebas text-2xl tracking-[0.2em] flex items-center">
              {Array(4).fill(dict.home.ticker.join(" · ")).join(" · ")}
            </span>
          </div>
        </div>
      </section>

      {/* FEATURED CARDS */}
      <section className="py-32 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-20">
            {dict.home.cards.map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group"
              >
                <p className="font-bebas text-[#dc2626] text-sm tracking-widest mb-4 opacity-60">
                  {card.num}
                </p>
                <h2 className="font-bebas text-4xl mb-6 group-hover:text-[#dc2626] transition-colors leading-tight">
                  {card.title}
                </h2>
                <p className="font-lora text-[#8a7256] mb-8 leading-relaxed">
                  {card.desc}
                </p>
                <Link href={card.link.includes('carta') ? '/menu' : card.link.includes('agenda') ? '/menu' : '/localizacao'} className="inline-flex items-center gap-2 font-bebas text-lg tracking-widest text-[#dc2626] hover:text-[#f0e6cc] transition-colors">
                  {card.link}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER-ISH QUOTE */}
      <section className="py-40 px-6 text-center bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <Star className="mx-auto text-[#dc2626] mb-12 opacity-40 animate-pulse" size={48} />
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tighter mb-8 italic">
            "{dict.home.quote[0]} <span className="text-[#dc2626] not-italic">{dict.home.quote[1]}</span> {dict.home.quote[2]}"
          </h2>
          <p className="font-lora text-[#8a7256] text-sm tracking-widest uppercase opacity-60">Espaço 77 · O Coração do Porto</p>
        </div>
      </section>

      <style jsx global>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </main>
  );
}
