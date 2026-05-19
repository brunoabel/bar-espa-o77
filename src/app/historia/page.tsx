"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";

export default function Historia() {
  const { dict } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f0e6cc] pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <motion.header 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="border-b border-[#dc2626]/20 pb-12 mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[#dc2626]" />
            <span className="font-bebas text-sm tracking-[0.4em] text-[#dc2626] uppercase font-bold">
              {dict.history.tag}
            </span>
          </div>
          <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-none">
            {dict.history.title}
          </h1>
        </motion.header>

        {/* STATS */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 border border-[#dc2626]/20 mb-20 divide-y md:divide-y-0 md:divide-x divide-[#dc2626]/20"
        >
          {[
            { num: dict.history.stat1, label: dict.history.stat1Lbl },
            { num: dict.history.stat2, label: dict.history.stat2Lbl },
            { num: dict.history.stat3, label: dict.history.stat3Lbl },
          ].map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="p-12 text-center group">
              <div className="font-bebas text-6xl md:text-7xl text-[#dc2626] mb-2 group-hover:scale-110 transition-transform duration-500">
                {stat.num}
              </div>
              <div className="font-bebas text-sm tracking-[0.2em] text-[#8a7256] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FEATURED PHOTO */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video mb-32 group overflow-hidden border border-[#dc2626]/20"
        >
          <Image 
            src="/assets/user-photo-1.jpg" 
            alt="Espaço 77" 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          <div className="absolute bottom-10 left-10">
            <p className="font-bebas text-lg sm:text-2xl tracking-[0.3em] text-[#f0e6cc] opacity-80">
              CEDOFEITA, PORTO · 1995
            </p>
          </div>
        </motion.div>

        {/* BODY CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <p className="font-lora text-xl md:text-2xl italic leading-relaxed text-[#8a7256]">
              {dict.history.p1a}<span className="text-[#f0e6cc] font-bold not-italic mx-1">{dict.history.p1b}</span>{dict.history.p1c}
            </p>
            <p className="font-lora text-lg md:text-xl leading-relaxed opacity-60">
              {dict.history.p2a}<span className="text-[#f0e6cc] mx-1">{dict.history.p2b}</span>{dict.history.p2c}<span className="text-[#f0e6cc] mx-1">{dict.history.p2d}</span>{dict.history.p2e}
            </p>
            <p className="font-lora text-lg md:text-xl leading-relaxed opacity-60">
              {dict.history.p3}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div className="border-l-4 border-[#dc2626] pl-10 py-4">
              <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl leading-[0.9] tracking-tighter mb-4 italic">
                <span className="text-[#f0e6cc] block">{dict.history.q1}</span>
                <span className="text-[#dc2626] block">{dict.history.q2}</span>
                <span className="text-[#f0e6cc] block">{dict.history.q3}</span>
              </h2>
            </div>
            <p className="font-lora text-lg md:text-xl leading-relaxed opacity-60">
              {dict.history.p4a}<span className="text-[#f0e6cc] mx-1">{dict.history.p4b}</span>{dict.history.p4c}
            </p>
            <p className="font-lora text-lg md:text-xl leading-relaxed opacity-60">
              {dict.history.p5}
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
