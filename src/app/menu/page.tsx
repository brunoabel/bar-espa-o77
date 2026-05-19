"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────── TYPES ──────────── */
interface MenuItem {
  name: string;
  price: string;
  priceAlt?: string;
  isPopular?: boolean;
  sub?: string;
}
interface Category {
  id: string;
  title: string;
  items: MenuItem[];
  labels?: { price1: string; price2: string };
}

/* ──────────── CSS-IN-JS (original palette) ──────────── */
const C = {
  bg:       "#0a0604",
  red:      "#bf1f1a",
  rdk:      "#8a1310",
  orange:   "#d4a017",
  cream:    "#f0e6cc",
  muted:    "#8a7256",
  border:   "rgba(191,31,26,0.22)",
};

const fade = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ──────────── COMPONENT ──────────── */
export default function MenuPage() {
  const { dict } = useLanguage();
  const [tab, setTab] = useState<"drinks" | "food">("drinks");

  const drinksData = dict.menu.drinks as Category[];
  const foodData = dict.menu.food as Category[];

  const current = tab === "drinks" ? drinksData : foodData;

  /* specials shown in the 2×2 grid */
  const specials = dict.menu.specials as { badge: string; item: MenuItem }[];

  return (
    <div style={{ background: C.bg, color: C.cream, minHeight: "100vh", fontFamily: "var(--font-lora),'Lora',serif" }}>

      {/* ── HEADER ── */}
      <header style={{
        background: C.bg,
        borderBottom: `1px solid ${C.border}`,
        position: "sticky", top: 0, zIndex: 50,
        padding: "0 1.5rem", height: "3.75rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* logo stamp */}
        <a href="/" style={{ textDecoration: "none" }}>
          <div style={{
            background: C.red, padding: ".4rem .5rem .28rem",
            display: "inline-flex", flexDirection: "column", alignItems: "center",
          }}>
            <span style={{ fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif", fontSize: ".62rem", color: "#fff", letterSpacing: ".22em" }}>ESPAÇO</span>
            <div style={{ width: "100%", height: "1.5px", background: "#fff", margin: "2px 0" }} />
            <span style={{ fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif", fontSize: "1.4rem", color: "#fff", lineHeight: 1 }}>77</span>
          </div>
        </a>

        <a href="/reservas" style={{
          background: C.red, color: "#fff",
          fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
          fontSize: ".85rem", letterSpacing: ".12em", textDecoration: "none",
          padding: ".45rem 1rem",
        }}>
          Reservar Mesa
        </a>
      </header>

      {/* ── MENU TITLE ── */}
      <section style={{ padding: "2rem 1.5rem 1rem", maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".4rem" }}>
          <div style={{ width: 22, height: 1, background: C.red }} />
          <span style={{
            fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
            fontSize: ".62rem", letterSpacing: ".22em", color: C.red, textTransform: "uppercase",
          }}>
            {dict.menu.tag}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{
            fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
            fontSize: "3.5rem", letterSpacing: ".04em", color: C.cream, lineHeight: 1,
          }}>
            {dict.menu.title}
          </h1>
          <div style={{
            border: `2px solid ${C.red}`, borderRadius: "50%",
            width: 52, height: 52, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif", fontSize: ".42rem", letterSpacing: ".18em", color: C.red }}>DESDE</span>
            <span style={{ fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif", fontSize: "1.05rem", color: C.cream, lineHeight: 1 }}>1995</span>
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{ display: "flex", gap: "2.5rem", marginTop: "1.2rem", borderBottom: `1px solid ${C.border}` }}>
          {(["drinks", "food"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
                fontSize: ".85rem", letterSpacing: ".18em",
                color: tab === t ? C.red : C.muted,
                borderBottom: tab === t ? `2px solid ${C.red}` : "2px solid transparent",
                paddingBottom: ".5rem", marginBottom: -1,
                transition: "color .2s",
              }}
            >
              {t === "drinks" ? dict.menu.tabs.drinks : dict.menu.tabs.food}
            </button>
          ))}
        </div>
      </section>

      {/* ── SPECIALS GRID ── */}
      <section style={{ padding: "0 1.5rem 1.5rem", maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".9rem" }}>
          <span style={{ fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif", fontSize: ".75rem", letterSpacing: ".2em", color: C.red }}>→ ESPECIALIDADES DA CASA</span>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1,
          border: `1px solid ${C.border}`,
        }}>
          {specials.map(({ badge, item }, i) => (
            <div key={i} style={{
              padding: "1rem 1.1rem .9rem",
              borderRight: i % 2 === 0 ? `1px solid ${C.border}` : "none",
              borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
              position: "relative",
            }}>
              <span style={{
                position: "absolute", top: ".75rem", right: ".75rem",
                background: badge === "PACK" ? C.orange : C.red,
                color: "#fff", fontSize: ".52rem",
                fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
                letterSpacing: ".15em", padding: ".15rem .4rem",
              }}>{badge}</span>
              <div style={{
                fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
                fontSize: ".72rem", letterSpacing: ".18em", color: C.muted,
                marginBottom: ".2rem", textTransform: "uppercase",
              }}>
                {item.name}
              </div>
              <div style={{
                fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
                fontSize: "1.9rem", color: C.red, lineHeight: 1,
              }}>
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORY LISTS ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={tab}
          variants={stagger}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          style={{ padding: "0 1.5rem 6rem", maxWidth: 640, margin: "0 auto" }}
        >
          {current.map((cat) => (
            <motion.div key={cat.id} variants={fade} style={{ marginBottom: "2rem" }}>
              {/* category header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: `1px solid ${C.border}`, paddingBottom: ".4rem", marginBottom: ".8rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                  <span style={{ color: C.red, fontSize: ".85rem" }}>+</span>
                  <span style={{
                    fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
                    fontSize: ".78rem", letterSpacing: ".22em", color: C.cream,
                    textTransform: "uppercase",
                  }}>
                    {cat.title}
                  </span>
                </div>
                {cat.labels && (
                  <div style={{ display: "flex", gap: "1.8rem" }}>
                    {[cat.labels.price1, cat.labels.price2].map((l) => (
                      <span key={l} style={{
                        fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
                        fontSize: ".58rem", letterSpacing: ".18em", color: C.muted,
                        textTransform: "uppercase",
                      }}>{l}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* item rows */}
              {cat.items.map((item, idx) => (
                <div key={idx} style={{
                  display: "flex", alignItems: "baseline",
                  justifyContent: "space-between",
                  padding: ".38rem 0",
                  borderBottom: `1px solid rgba(191,31,26,0.08)`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".45rem", minWidth: 0 }}>
                    <span style={{
                      fontFamily: "var(--font-lora),'Lora',serif",
                      fontSize: ".88rem", color: C.cream,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      maxWidth: "calc(100vw - 140px)",
                    }}>
                      {item.name}
                    </span>
                    {item.isPopular && (
                      <span style={{
                        background: C.red, color: "#fff",
                        fontSize: ".48rem", letterSpacing: ".12em",
                        fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
                        padding: ".12rem .35rem", flexShrink: 0,
                      }}>POPULAR</span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "1.8rem", flexShrink: 0, marginLeft: ".8rem" }}>
                    <span style={{
                      fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
                      fontSize: "1.05rem", color: C.red, letterSpacing: ".02em",
                    }}>{item.price}</span>
                    {item.priceAlt && (
                      <span style={{
                        fontFamily: "var(--font-bebas),'Bebas Neue',sans-serif",
                        fontSize: "1.05rem", color: C.red, letterSpacing: ".02em",
                      }}>{item.priceAlt}</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          ))}

          <p style={{
            fontFamily: "var(--font-lora),'Lora',serif",
            fontStyle: "italic", fontSize: ".72rem", color: C.muted,
            textAlign: "center", marginTop: "1rem",
          }}>
            {dict.menu.note}
          </p>
        </motion.section>
      </AnimatePresence>

      {/* ── RESPONSIVE OVERRIDES ── */}
      <style>{`
        @media (max-width: 380px) {
          h1 { font-size: 2.8rem !important; }
          .feat-name { font-size: .65rem !important; }
          .feat-price { font-size: 1.6rem !important; }
        }
      `}</style>
    </div>
  );
}