"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Beer, Calendar, MapPin, BookOpen, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function BottomNav() {
  const { dict } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { href: "/menu", icon: Beer, label: dict.nav.menu },
    { href: "/historia", icon: BookOpen, label: dict.nav.history },
    { href: "/reservas", icon: Star, label: dict.nav.book.split(' ')[0] },
    { href: "/localizacao", icon: MapPin, label: dict.nav.location.split(' ')[0] },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/5 md:hidden">
      <div className="grid h-full grid-cols-4 mx-auto max-w-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-2 group transition-all"
            >
              <item.icon className={`w-5 h-5 mb-1 transition-colors ${isActive ? "text-[#dc2626]" : "text-[#f0e6cc]/40 group-hover:text-[#dc2626]"}`} />
              <span className={`text-[9px] font-bebas tracking-widest transition-colors ${isActive ? "text-[#dc2626]" : "text-[#f0e6cc]/40 group-hover:text-[#dc2626]"}`}>
                {item.label.toUpperCase()}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
