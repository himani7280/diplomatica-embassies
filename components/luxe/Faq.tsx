"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqData, SiteData } from "@/data/siteData";

interface FaqProps {
  data: FaqData;
  contact?: SiteData["contact"];
}

export function Faq({ data }: FaqProps) {
  if (!data || !data.items || data.items.length === 0) return null;

  const pairs: Array<{
    pairIndex: number;
    q1: (typeof data.items)[0];
    q2: (typeof data.items)[0];
  }> = [];

  for (let i = 0; i < data.items.length; i += 2) {
    if (data.items[i]) {
      pairs.push({
        pairIndex: pairs.length,
        q1: data.items[i],
        q2: data.items[i + 1] || data.items[0],
      });
    }
  }

  const [activePair, setActivePair] = useState(0);
  const current = pairs[activePair] || pairs[0];
  const eyebrow = data.eyebrow || "CONSULAR ADVISORY";
  const title = data.title || "FAQ";
  const topicLabel = data.topicLabel || "Topic:";
  const sparkle = data.sparkle || "✦";
  const qBadge = data.qBadge || "Q";
  const aBadge = data.aBadge || "A";

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="w-full">
        <div className="group relative overflow-hidden border-y border-white/15 py-8 px-4 sm:py-10 sm:px-6 lg:py-10 lg:px-10">
          <div className="absolute inset-0 -z-10">
            <Image
              src={data.bgImage || "/img/faq-luxury-bg.webp"}
              alt={`${eyebrow} ${title}`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.3px]" />
          </div>

          <div className="mx-auto w-full max-w-[1100px]">
            <div className="relative pb-5 sm:pb-7">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[14px] sm:text-[15px] font-extrabold italic uppercase tracking-[0.16em] text-[#f0d78c] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {eyebrow}
                    </span>
                    <span className="text-[#f0d78c] text-[18px] sm:text-[20px] leading-none select-none drop-shadow-[0_2px_6px_rgba(226,189,92,0.7)]">
                      {sparkle}
                    </span>
                  </div>
                  <h2 className="mt-1 font-[family-name:Playfair_Display,Georgia,serif] text-2xl font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] sm:text-4xl lg:text-[3.1rem]">
                    {title}
                  </h2>
                </div>

                {pairs.length > 1 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-sans text-white/80 uppercase tracking-wider hidden sm:inline-block drop-shadow-sm">
                      {topicLabel}
                    </span>
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-white/20 backdrop-blur-md">
                      {pairs.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActivePair(idx)}
                          className={`px-3 py-1.5 rounded-lg font-sans text-[14px] font-semibold transition-all ${
                            activePair === idx
                              ? "bg-[#e2bd5c] text-[#060f27] shadow-md"
                              : "text-white/80 hover:text-white hover:bg-white/15"
                          }`}
                        >
                          0{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 sm:mt-5 h-[1.5px] w-full bg-white/70 shadow-sm" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePair}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-8 sm:mt-10 space-y-6 sm:space-y-8 w-full max-w-[960px] mx-auto px-2 sm:px-4"
              >
                <div className="flex justify-end w-full">
                  <div className="relative flex items-center gap-2.5 sm:gap-3.5 w-full sm:w-[76%] md:w-[64%] lg:w-[60%] max-w-[550px]">
                    <div className="grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full bg-[#060f27] text-[#f0d78c] border-2 border-[#e2bd5c] shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
                      <span className="font-[family-name:Playfair_Display,Georgia,serif] text-xl font-bold leading-none">
                        {qBadge}
                      </span>
                    </div>

                    <div className="relative flex-1 rounded-2xl bg-[#0a1a3d] p-4 sm:p-5 text-white shadow-[0_12px_35px_rgba(0,0,0,0.6)] border border-[#e2bd5c]/40 backdrop-blur-md">
                      <p className="font-sans text-[14.5px] sm:text-[15.5px] font-bold leading-snug text-[#fdfcf9]">
                        {current.q1.question}
                      </p>
                      <span className="absolute -left-2 top-1/2 -translate-y-1/2 h-0 w-0 border-y-[7px] border-y-transparent border-r-[8px] border-r-[#0a1a3d]" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-start w-full">
                  <div className="relative flex items-center gap-2.5 sm:gap-3.5 w-full sm:w-[76%] md:w-[64%] lg:w-[60%] max-w-[550px]">
                    <div className="relative flex-1 rounded-2xl bg-gradient-to-r from-[#e2bd5c] via-[#f0d78c] to-[#e2bd5c] p-4 sm:p-5 text-[#060f27] shadow-[0_12px_35px_rgba(0,0,0,0.4)] border border-[#f0d78c]/80">
                      <p className="font-sans text-[14px] sm:text-[14.5px] font-semibold leading-relaxed text-[#060f27]">
                        {current.q1.answer}
                      </p>
                      <span className="absolute -right-2 top-1/2 -translate-y-1/2 h-0 w-0 border-y-[7px] border-y-transparent border-l-[8px] border-l-[#f0d78c]" />
                    </div>

                    <div className="grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full bg-[#0a1a3d] text-[#f0d78c] border-2 border-[#e2bd5c] shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
                      <span className="font-[family-name:Playfair_Display,Georgia,serif] text-xl font-bold leading-none">
                        {aBadge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end w-full">
                  <div className="relative flex items-center gap-2.5 sm:gap-3.5 w-full sm:w-[76%] md:w-[64%] lg:w-[60%] max-w-[550px]">
                    <div className="grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full bg-[#060f27] text-[#f0d78c] border-2 border-[#e2bd5c] shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
                      <span className="font-[family-name:Playfair_Display,Georgia,serif] text-xl font-bold leading-none">
                        {qBadge}
                      </span>
                    </div>

                    <div className="relative flex-1 rounded-2xl bg-[#0a1a3d] p-4 sm:p-5 text-white shadow-[0_12px_35px_rgba(0,0,0,0.6)] border border-[#e2bd5c]/40 backdrop-blur-md">
                      <p className="font-sans text-[14.5px] sm:text-[15.5px] font-bold leading-snug text-[#fdfcf9]">
                        {current.q2.question}
                      </p>
                      <span className="absolute -left-2 top-1/2 -translate-y-1/2 h-0 w-0 border-y-[7px] border-y-transparent border-r-[8px] border-r-[#0a1a3d]" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-start w-full">
                  <div className="relative flex items-center gap-2.5 sm:gap-3.5 w-full sm:w-[76%] md:w-[64%] lg:w-[60%] max-w-[550px]">
                    <div className="relative flex-1 rounded-2xl bg-gradient-to-r from-[#e2bd5c] via-[#f0d78c] to-[#e2bd5c] p-4 sm:p-5 text-[#060f27] shadow-[0_12px_35px_rgba(0,0,0,0.4)] border border-[#f0d78c]/80">
                      <p className="font-sans text-[14px] sm:text-[14.5px] font-semibold leading-relaxed text-[#060f27]">
                        {current.q2.answer}
                      </p>
                      <span className="absolute -right-2 top-1/2 -translate-y-1/2 h-0 w-0 border-y-[7px] border-y-transparent border-l-[8px] border-l-[#f0d78c]" />
                    </div>

                    <div className="grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full bg-[#0a1a3d] text-[#f0d78c] border-2 border-[#e2bd5c] shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
                      <span className="font-[family-name:Playfair_Display,Georgia,serif] text-xl font-bold leading-none">
                        {aBadge}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
