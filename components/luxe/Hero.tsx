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
    <section className="relative isolate flex min-h-[480px] items-center justify-center overflow-hidden bg-[#060f27] pb-8 pt-24 sm:min-h-[540px] sm:pb-10 sm:pt-28 lg:min-h-[600px] lg:pb-10 lg:pt-32">
      {/* Background slide images */}
      <div aria-hidden="true" className="absolute inset-0 -z-[15]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.backdrop}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-45" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.backdrop}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover mix-blend-luminosity"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(6,15,39,0.7),rgba(6,15,39,0.95)_75%)]" />
      </div>

      {/* Ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_35%,rgba(36,74,154,0.45),transparent_65%),radial-gradient(ellipse_at_50%_90%,rgba(185,138,40,0.18),transparent_55%),linear-gradient(180deg,#060f27,#0a1a3d_60%,#060f27)]"
      />

      <AnimatedSwoosh play={ready} className="absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full" />

      {/* Hero title */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={index === 0 ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center"
          >
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e2bd5c]/50 bg-[#060f27]/80 px-3.5 py-1.5 text-center text-[14px] font-semibold tracking-[0.04em] text-[#f0d78c] shadow-[0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-md sm:gap-3 sm:px-5 sm:py-2 sm:tracking-[0.1em] md:tracking-[0.14em]">
              <Diamond className="h-1.5 w-1.5 shrink-0 text-[#e2bd5c]" />
              <span className="leading-tight break-normal">{current.eyebrow.toUpperCase()}</span>
              <Diamond className="h-1.5 w-1.5 shrink-0 text-[#e2bd5c]" />
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

      {/* Simple straight edge at the bottom of hero background image */}
      <CurveEdge />
    </section>
  );
}
