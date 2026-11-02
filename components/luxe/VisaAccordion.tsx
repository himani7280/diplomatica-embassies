"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { VisaSection } from "@/data/siteData";
import { Reveal } from "@/components/motion/Reveal";
import { LuxHeading } from "./LuxHeading";

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const headline = (s: VisaSection) => `${s.titleAccent}${s.titleEnd ? ` ${s.titleEnd}` : ""}`;

/** Photo panels that expand when clicked (or activated with the keyboard). */
export function VisaAccordion({ sections }: { sections: VisaSection[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-transparent pt-2 pb-6 sm:pt-3 sm:pb-8 lg:pt-3 lg:pb-8">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <LuxHeading center eyebrow="Visa & Passport" title="Explore" accent="the Journey" />

        <Reveal className="mt-5 sm:mt-6">
          <div className="flex h-[620px] flex-col gap-2 sm:h-[560px] lg:h-[400px] lg:flex-row">
            {sections.map((s, i) => {
              const open = i === active;
              return (
                <div
                  key={s.id}
                  role="button"
                  tabIndex={0}
                  aria-expanded={open}
                  aria-label={s.eyebrow}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  className={cn(
                    "relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-xl bg-[#0a1a3d] outline-none transition-[flex-grow] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-4 focus-visible:ring-[#e2bd5c]/60",
                    open ? "flex-[8] sm:flex-[6]" : "flex-[1]",
                  )}
                >
                  <Image src={s.image} alt={s.alt} fill sizes="(min-width: 1024px) 700px, 100vw" className={cn("object-cover transition-transform duration-[1200ms] ease-out", open ? "scale-100" : "scale-110")} />
                  <div className={cn("absolute inset-0 transition-opacity duration-700", open ? "bg-gradient-to-t from-[#060f27] via-[#060f27]/35 to-transparent" : "bg-[#060f27]/55")} />

                  <div className={cn("absolute inset-0 flex items-center gap-3 px-5 transition-opacity duration-500 lg:flex-col lg:justify-end lg:gap-4 lg:px-0 lg:pb-7", open ? "pointer-events-none opacity-0" : "opacity-100 delay-300")}>
                    <span className="font-[family-name:Playfair_Display,Georgia,serif] text-2xl font-bold text-[#e2bd5c]">0{i + 1}</span>
                    <span className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.22em] text-white lg:rotate-180 lg:[writing-mode:vertical-rl]">{s.eyebrow}</span>
                  </div>

                  <div className={cn("absolute inset-x-0 bottom-0 flex max-h-full flex-col justify-end p-3.5 transition-all duration-700 sm:p-7", open ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-6 opacity-0")}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f0d78c] sm:text-[12px]">0{i + 1} · {s.eyebrow}</p>
                    <h3 className="mt-1 max-w-[520px] font-[family-name:Playfair_Display,Georgia,serif] text-[1.25rem] font-bold leading-tight text-white sm:mt-2 sm:text-[1.8rem] lg:text-[2.2rem]">{headline(s)}</h3>
                    <p className="mt-1.5 max-w-[460px] text-[12.5px] leading-snug text-white/85 sm:mt-2.5 sm:text-[15px] sm:leading-7">{s.text}</p>
                    <div>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.stopPropagation();
                          const el = document.getElementById("contact");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="mt-2.5 inline-flex items-center rounded-full bg-gradient-to-b from-[#e2bd5c] to-[#b98a28] px-4 py-2 text-[12.5px] font-semibold text-[#060f27] shadow-[0_4px_16px_rgba(226,189,92,0.35)] transition-transform duration-300 hover:scale-105 sm:mt-4 sm:px-6 sm:py-2.5 sm:text-[14px]"
                      >
                        Ask an Adviser
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
