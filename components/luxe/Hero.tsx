"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HomeData } from "@/data/siteData";
import { AnimatedSwoosh } from "./AnimatedSwoosh";
import { useIntroReady } from "./Intro";
import { CurveEdge, Diamond } from "./Ornaments";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ data }: { data: HomeData["hero"] }) {
  const ready = useIntroReady();
  const [index, setIndex] = useState(0);

  const SLIDES = [
    {
      backdrop: "/img/hero-bg-1.webp",
      eyebrow: data?.eyebrow || "Explore · Connect · Represent",
      titleLine1: data?.titleLine1 || "Embassy & Visa",
      titleAccent: data?.titleAccent || "Experts",
    },
    {
      backdrop: "/img/hero-bg-2.webp",
      eyebrow: "Global Mobility · Consular Advisory",
      titleLine1: "Worldwide Consular",
      titleAccent: "Representation",
    },
    {
      backdrop: "/img/hero-bg-3.webp",
      eyebrow: "Precision · Protocol · Excellence",
      titleLine1: "Fast-Track Visa &",
      titleAccent: "Passport Solutions",
    },
  ];

  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 6500);
    return () => window.clearInterval(t);
  }, [SLIDES.length]);

  const current = SLIDES[index];

  return (
    <section className="relative isolate flex min-h-[520px] items-center justify-center overflow-hidden bg-[#060f27] pb-16 pt-28 sm:min-h-[580px] sm:pb-20 sm:pt-32 lg:min-h-[660px] lg:pb-24 lg:pt-36">
      {/* Background Slides */}
      <div aria-hidden="true" className="absolute inset-0 -z-[15]">
        {SLIDES.map((slide, i) => (
          <motion.div
            key={slide.backdrop}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: i === index ? 0.45 : 0,
              scale: i === index ? 1 : 1.1,
            }}
            transition={{
              opacity: { duration: 1.6 },
              scale: { duration: 8, ease: "linear" },
            }}
          >
            <Image
              src={slide.backdrop}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover mix-blend-luminosity"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(6,15,39,0.7),rgba(6,15,39,0.95)_75%)]" />
      </div>

      {/* Radial ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_35%,rgba(36,74,154,0.45),transparent_65%),radial-gradient(ellipse_at_50%_90%,rgba(185,138,40,0.18),transparent_55%),linear-gradient(180deg,#060f27,#0a1a3d_60%,#060f27)]"
      />

      <AnimatedSwoosh play={ready} className="absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full" />

      {/* Centered Short Title Only */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e2bd5c]/50 bg-[#060f27]/70 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#f0d78c] shadow-[0_2px_12px_rgba(0,0,0,0.3)] backdrop-blur-md sm:gap-3 sm:px-5 sm:py-2 sm:text-[12px] sm:tracking-[0.22em]">
              <Diamond className="h-1.5 w-1.5 shrink-0 text-[#e2bd5c] sm:h-2 sm:w-2" />
              <span className="shrink-0 whitespace-nowrap">{current.eyebrow.toUpperCase()}</span>
              <Diamond className="h-1.5 w-1.5 shrink-0 text-[#e2bd5c] sm:h-2 sm:w-2" />
            </span>

            <h1 className="mt-4 font-[family-name:Playfair_Display,Georgia,serif] text-3xl font-bold leading-[1.08] tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl lg:text-[4.6rem]">
              <span>{current.titleLine1}</span>
              <span className="block bg-[linear-gradient(100deg,#d3a63e_0%,#f0d78c_25%,#e2bd5c_45%,#fff6d6_55%,#e2bd5c_65%,#d3a63e_100%)] bg-size-[220%_auto] bg-clip-text text-transparent">
                {current.titleAccent}
              </span>
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <CurveEdge fill="#fdfcf9" className="absolute inset-x-0 bottom-[-1px] h-[44px] w-full lg:h-[70px]" />
    </section>
  );
}
