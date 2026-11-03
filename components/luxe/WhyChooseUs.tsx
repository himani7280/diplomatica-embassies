"use client";

import Image from "next/image";
import Link from "next/link";
import type { WhyChooseUsData } from "@/data/siteData";
import { LuxHeading } from "./LuxHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowUpRight } from "lucide-react";

export function WhyChooseUs({ data }: { data: WhyChooseUsData }) {
  if (!data) return null;

  const columns = data.columns || [];

  return (
    <section className="relative overflow-hidden bg-transparent py-8 sm:py-10 lg:py-10">
      {/* Background contours */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30">
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-12 left-1/2 h-[120%] w-[130%] -translate-x-1/2 object-cover stroke-[#d3a63e]/25"
        >
          <path d="M-100 200 C300 400, 600 50, 1500 350" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d="M-100 350 C400 600, 800 200, 1500 500" strokeWidth="2" />
          <path d="M-100 500 C500 750, 900 350, 1500 650" strokeWidth="1.5" strokeDasharray="6 8" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(226,189,92,0.15),transparent_65%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <LuxHeading
          center
          eyebrow={data.eyebrow || "Why Choose Us"}
          title={data.title || "Why"}
          accent={data.titleAccent || "Choose Us"}
          text={data.text}
        />

        {/* 3 capsule columns */}
        <Stagger className="mt-6 grid grid-cols-1 items-center gap-6 sm:mt-8 sm:gap-7 md:grid-cols-3 lg:gap-8" stagger={0.12}>
          {columns.map((col, idx) => {
            const isCenter = idx === 1;

            return (
              <StaggerItem key={col.id} className="h-full">
                <div
                  className={`group relative flex h-full flex-col items-center justify-between overflow-hidden rounded-[44px] sm:rounded-[56px] border border-[#e2bd5c]/35 bg-white/80 p-5 sm:p-7 text-center shadow-[0_14px_35px_-14px_rgba(10,26,61,0.12)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_20px_45px_-10px_rgba(226,189,92,0.32)] hover:border-[#b98a28] ${
                    isCenter ? "md:-translate-y-2 md:bg-white/90 md:ring-1 md:ring-[#e2bd5c]/40" : ""
                  }`}
                >
                  {isCenter ? (
                    <>
                      {/* Center image at top */}
                      <div className="relative mb-5 mt-1 h-[190px] w-[190px] shrink-0 overflow-hidden rounded-full border-[6px] border-[#b98a28] shadow-lg transition-transform duration-700 group-hover:scale-105 sm:h-[210px] sm:w-[210px]">
                        <Image
                          src={col.image}
                          alt={col.alt}
                          fill
                          sizes="(min-width: 768px) 240px, 80vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-white/40" />
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-between pb-1">
                        <div>
                          <h3 className="font-[family-name:Playfair_Display,Georgia,serif] text-xl font-bold text-[#0a1a3d] transition-colors duration-300 group-hover:text-[#b98a28] sm:text-2xl">
                            {col.title}
                          </h3>
                          {col.tagline ? (
                            <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-[#555d71]">
                              {col.tagline}
                            </p>
                          ) : null}
                        </div>

                        {col.button ? (
                          <Link
                            href={col.button.href}
                            className="group/btn relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#0a1a3d] px-4 py-2.5 text-[#f0d78c] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] ring-1 ring-[#e2bd5c]/40 transition-colors duration-500 hover:bg-[#e2bd5c] hover:text-[#060f27]"
                          >
                            <span className="font-mono text-[14px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap">
                              {col.button.label}
                            </span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:rotate-45" strokeWidth={2.2} />
                            <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                          </Link>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-1 flex-col items-center pt-1">
                        <h3 className="font-[family-name:Playfair_Display,Georgia,serif] text-xl font-bold text-[#0a1a3d] transition-colors duration-300 group-hover:text-[#b98a28] sm:text-2xl">
                          {col.title}
                        </h3>
                        {col.tagline ? (
                          <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-[#555d71]">
                            {col.tagline}
                          </p>
                        ) : null}

                        {col.button ? (
                          <Link
                            href={col.button.href}
                            className="group/btn relative mt-4 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#0a1a3d] px-4 py-2.5 text-[#f0d78c] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] ring-1 ring-[#e2bd5c]/40 transition-colors duration-500 hover:bg-[#e2bd5c] hover:text-[#060f27]"
                          >
                            <span className="font-mono text-[14px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap">
                              {col.button.label}
                            </span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:rotate-45" strokeWidth={2.2} />
                            <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                          </Link>
                        ) : null}
                      </div>

                      {/* Image at bottom */}
                      <div className="relative mb-1 mt-5 h-[175px] w-[175px] shrink-0 overflow-hidden rounded-full border-[6px] border-[#e2bd5c] shadow-md transition-transform duration-700 group-hover:scale-105 sm:h-[195px] sm:w-[195px]">
                        <Image
                          src={col.image}
                          alt={col.alt}
                          fill
                          sizes="(min-width: 768px) 220px, 80vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-white/40" />
                      </div>
                    </>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
