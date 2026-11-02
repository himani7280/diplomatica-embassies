"use client";

import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import type { HomeData, ProcessStep } from "@/data/siteData";
import { Parallax } from "./Fx";
import { LuxHeading } from "./LuxHeading";
import { CurveEdge } from "./Ornaments";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Dark timeline: a gold line fills as you scroll and steps slide in from alternating sides. */
export function ProcessTimeline({ intro, steps }: { intro: HomeData["process"]; steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="relative isolate overflow-hidden bg-[#0a1a3d] pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-10 lg:pb-24">
      <Parallax className="absolute inset-0 -z-10" distance={60}>
        <Image src="/img/proc-main.webp" alt="" fill sizes="100vw" className="scale-125 object-cover opacity-[0.12]" />
      </Parallax>
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-10">
        <LuxHeading light center eyebrow={intro.eyebrow} title={intro.title} accent={intro.titleAccent} />

        <div ref={ref} className="relative mt-14">
          <div aria-hidden="true" className="absolute bottom-0 left-[27px] top-0 w-px bg-white/15 md:left-1/2">
            <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top bg-linear-to-b from-[#f0d78c] to-[#d3a63e]" />
          </div>

          <ol className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li key={step.id} className="group relative grid cursor-pointer items-center gap-4 pl-[72px] md:grid-cols-2 md:gap-20 md:pl-0">
                  <motion.span
                    className="absolute left-0 top-1/2 z-10 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-[#e2bd5c] bg-[#060f27] font-[family-name:Playfair_Display,Georgia,serif] text-lg font-bold text-[#f0d78c] shadow-[0_0_30px_rgba(226,189,92,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e2bd5c] group-hover:text-[#060f27] group-hover:shadow-[0_0_40px_rgba(226,189,92,0.7)] md:left-1/2 md:-translate-x-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  >
                    {step.number}
                  </motion.span>
                  <motion.div
                    className={left ? "md:col-start-1 md:text-right" : "md:col-start-2"}
                    initial={{ opacity: 0, x: left ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    <h3 className="font-[family-name:Playfair_Display,Georgia,serif] text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#f0d78c] sm:text-[1.7rem]">{step.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-7 text-white/65">{step.text}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <CurveEdge fill="#fdfcf9" className="absolute inset-x-0 bottom-[-1px] h-[44px] w-full lg:h-[64px]" />
    </section>
  );
}
