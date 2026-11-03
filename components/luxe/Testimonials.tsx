"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import type { HomeData, Testimonial } from "@/data/siteData";
import { CurveEdge } from "./Ornaments";
import { LuxHeading } from "./LuxHeading";

const AUTOPLAY_MS = 7000;

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Full-bleed photo backdrop with one large quote; clients are chosen from a name list. */
export function Testimonials({ intro, items }: { intro: HomeData["testimonials"]; items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const count = items.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    if (paused || reduceMotion || count < 2) return;
    const t = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, reduceMotion, count, next]);

  const current = items[index];
  if (!current) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#060f27] py-8 sm:py-10 lg:py-10">
      <CurveEdge fill="#fdfcf9" className="absolute inset-x-0 top-[-1px] h-[44px] w-full rotate-180 lg:h-[64px]" />
      <Image src="/img/gal-1.webp" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#060f27]/80 via-[#060f27]/70 to-[#060f27]/90" />

      <div className="mx-auto w-full max-w-[1100px] px-4 text-center sm:px-6 lg:px-10">
        <LuxHeading light center eyebrow={intro.eyebrow} title={intro.title} accent={intro.titleAccent} />

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="mt-10" role="region" aria-roledescription="carousel" aria-label="Client testimonials">
          <div className="font-[family-name:Playfair_Display,Georgia,serif] text-7xl leading-none text-[#e2bd5c]" aria-hidden="true">&ldquo;</div>
          <div className="relative min-h-[210px] sm:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-[860px] font-[family-name:Playfair_Display,Georgia,serif] text-[1.25rem] italic leading-[1.6] text-white sm:text-[1.65rem]"
              >
                {current.quote}
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-4 flex justify-center gap-1" aria-label={`${current.rating} out of 5 stars`}>
            {Array.from({ length: current.rating }, (_, s) => (
              <Star key={s} className="h-4 w-4 text-[#e2bd5c]" fill="currentColor" strokeWidth={0} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3" role="tablist" aria-label="Choose a client">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={cn("flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 text-left transition-colors", i === index ? "border-[#e2bd5c] bg-[#e2bd5c]/10" : "border-white/15 hover:border-white/40")}
              >
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt="" fill sizes="44px" className="object-cover" />
                </span>
                <span>
                  <span className={cn("block text-sm font-semibold", i === index ? "text-white" : "text-white/70")}>{t.name}</span>
                  <span className="block text-[14px] text-[#f0d78c]">{t.role}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <CurveEdge fill="#fdfcf9" className="absolute inset-x-0 bottom-[-1px] h-[44px] w-full lg:h-[64px]" />
    </section>
  );
}
