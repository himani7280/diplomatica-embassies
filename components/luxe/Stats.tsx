"use client";

import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Parallax } from "./Fx";
import { CurveEdge } from "./Ornaments";

const STATS = [
  { to: 25, suffix: "+", label: "Years of experience" },
  { to: 12, suffix: "k+", label: "Applications handled" },
  { to: 40, suffix: "+", label: "Countries covered" },
  { to: 24, suffix: "h", label: "Reply time" },
] as const;

/** Full-width photo band with four counters that run when first scrolled into view. */
export function Stats() {
  return (
    <section aria-label="Diplomatica in numbers" className="relative isolate overflow-hidden bg-[#060f27] pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12">
      <CurveEdge fill="#fdfcf9" className="absolute inset-x-0 top-[-1px] h-[44px] w-full rotate-180 lg:h-[64px]" />
      <Parallax className="absolute inset-0 -z-10" distance={50}>
        <Image src="/img/gal-3.webp" alt="" fill sizes="100vw" className="scale-125 object-cover opacity-40" />
      </Parallax>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#060f27]/90 via-[#060f27]/60 to-[#060f27]/90" />
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Stagger className="grid grid-cols-2 gap-y-8 lg:grid-cols-4" stagger={0.12}>
          {STATS.map((s, i) => (
            <StaggerItem key={s.label}>
              <div className={`text-center ${i > 0 ? "lg:border-l lg:border-[#e2bd5c]/30" : ""}`}>
                <div className="bg-linear-to-b from-[#f6e3a1] to-[#d3a63e] bg-clip-text font-[family-name:Playfair_Display,Georgia,serif] text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
                  <CountUp to={s.to} suffix={s.suffix} duration={2} />
                </div>
                <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/75">{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
