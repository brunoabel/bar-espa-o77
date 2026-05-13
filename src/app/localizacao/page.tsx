"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";

export default function OndeParamos() {
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
      transition: { duration: 0.6, ease: "easeOut" }
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
              {dict.location.tag}
            </span>
          </div>
          <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-none">
            {dict.location.title}
          </h1>
        </motion.header>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#dc2626]/20 divide-y lg:divide-y-0 lg:divide-x divide-[#dc2626]/20">
          
          {/* INFO SIDE */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col divide-y divide-[#dc2626]/20"
          >
            {[
              { icon: MapPin, label: dict.location.lbl1, val: dict.location.val1a, sub: dict.location.val1b },
              { icon: Clock, label: dict.location.lbl2, val: dict.location.val2a, sub: dict.location.val2b },
              { icon: Phone, label: dict.location.lbl3, val: dict.location.val3a, sub: dict.location.val3b },
              { icon: Navigation, label: dict.location.lbl4, val: dict.location.val4a, sub: dict.location.val4b },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="p-10 group hover:bg-[#dc2626]/5 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <item.icon className="text-[#dc2626]" size={20} />
                  <span className="font-bebas text-sm tracking-[0.2em] text-[#dc2626] uppercase">
                    {item.label}
                  </span>
                </div>
                <div className="font-lora text-xl md:text-2xl text-[#f0e6cc] leading-tight mb-2">
                  {item.val}
                </div>
                <div className="font-lora text-sm italic text-[#8a7256]">
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* MAP SIDE */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 p-6 sm:p-10 flex flex-col"
          >
            <div className="relative flex-grow min-h-[400px] border border-[#dc2626]/20 overflow-hidden group">
              <div className="absolute inset-0 bg-[#dc2626]/5 group-hover:opacity-0 transition-opacity z-10 pointer-events-none" />
              <iframe
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Travessa%20de%20Cedofeita%2022,%20Porto+(Espa%C3%A7o%2077)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                className="w-full h-full border-0 grayscale invert-[90%] hue-rotate-180 contrast-[1.1]"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Espaço 77 - Google Maps"
              />
            </div>
            <div className="mt-6 flex justify-between items-center font-lora text-xs italic text-[#8a7256]">
              <span>Porto, Portugal</span>
              <span>{dict.location.mapLegend}</span>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
