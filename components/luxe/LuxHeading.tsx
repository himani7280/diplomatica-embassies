"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Diamond } from "./Ornaments";

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

interface LuxHeadingProps {
  eyebrow?: string;
  title: string;
  accent?: string;
  text?: string;
  center?: boolean;
  /** true on dark (navy) backgrounds */
  light?: boolean;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Each word rises out of its own mask when the heading scrolls into view. */
function Words({ text, base, className }: { text: string; base: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={`${w}-${i}`} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block", className)}
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 + (base + i) * 0.07, ease: EASE }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function LuxHeading({ eyebrow, title, accent, text, center = false, light = false, className }: LuxHeadingProps) {
  const accentClass = light
    ? "bg-linear-to-r from-[#f0d78c] via-[#e2bd5c] via-55% to-[#d3a63e] bg-clip-text text-transparent"
    : "bg-linear-to-r from-[#8f6a1a] via-[#b98a28] to-[#d3a63e] bg-clip-text text-transparent";
  return (
    <div className={cn(center && "mx-auto text-center", "max-w-[760px]", className)}>
      {eyebrow ? (
        <Reveal>
          <div className={cn("flex items-center gap-1.5 text-[14px] font-semibold uppercase tracking-[0.16em] sm:gap-2.5 sm:text-[14px] sm:tracking-[0.2em]", center && "justify-center", light ? "text-[#f0d78c]" : "text-[#b98a28]")}>
            <motion.span className="h-px min-w-3 w-4 shrink origin-right bg-current opacity-70 sm:w-8" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} />
            <Diamond className="h-1.5 w-1.5 shrink-0 sm:h-2 sm:w-2" />
            <span className="shrink-0 whitespace-nowrap">{eyebrow}</span>
            <Diamond className="h-1.5 w-1.5 shrink-0 sm:h-2 sm:w-2" />
            <motion.span className="h-px min-w-3 w-4 shrink origin-left bg-current opacity-70 sm:w-8" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} />
          </div>
        </Reveal>
      ) : null}
      <h2 className={cn("font-[family-name:Playfair_Display,Georgia,serif] text-2xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[3.1rem]", eyebrow && "mt-3 sm:mt-4", light ? "text-white" : "text-[#0a1a3d]")}>
        <Words text={title} base={0} />
        {accent ? <Words text={accent} base={title.split(" ").length} className={accentClass} /> : null}
      </h2>
      {text ? (
        <Reveal delay={0.3}>
          <p className={cn("mt-4 text-sm leading-7 sm:mt-5 sm:text-[17px] sm:leading-8", light ? "text-white/70" : "text-[#666d82]")}>{text}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
