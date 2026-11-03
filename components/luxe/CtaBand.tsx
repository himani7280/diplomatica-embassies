import Link from "next/link";
import { Phone, ArrowUpRight } from "lucide-react";
import type { HomeData, SiteData } from "@/data/siteData";
import { Reveal } from "@/components/motion/Reveal";
import { Laurel } from "./Ornaments";

export function CtaBand({ data, contact }: { data: HomeData["cta"]; contact: SiteData["contact"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#e2bd5c] via-[#f0d78c] to-[#d3a63e] mt-8 sm:mt-10 lg:mt-10 py-8 sm:py-10 lg:py-10">
      <Laurel className="pointer-events-none absolute -left-10 top-1/2 -z-10 h-[340px] w-[340px] -translate-y-1/2 -rotate-12 text-[#060f27]/[0.07]" />
      <Laurel className="pointer-events-none absolute -right-10 top-1/2 -z-10 h-[340px] w-[340px] -translate-y-1/2 rotate-12 text-[#060f27]/[0.07]" />
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <p className="text-[14px] font-bold uppercase tracking-[0.24em] text-[#0a1a3d]/80">Explore · Connect · Represent</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-[family-name:Playfair_Display,Georgia,serif] text-[2rem] font-bold leading-[1.1] tracking-tight text-[#060f27] sm:mt-4 sm:text-4xl lg:text-[3.2rem]">
            {data.titleLine1} <span className="italic">{data.titleAccent}</span> {data.titleEnd}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:mt-6">
            <Link
              href="/#contact"
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#0a1a3d] px-6 py-3 text-[#f0d78c] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] ring-1 ring-[#e2bd5c]/40 transition-colors duration-500 hover:bg-[#e2bd5c] hover:text-[#060f27]"
            >
              <span className="font-sans text-[14px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap">
                Request a Consultation
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:rotate-45" strokeWidth={2.2} />
              <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            </Link>
            <a
              href={contact.ctaPhoneHref}
              className="group/btn relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-[#0a1a3d]/20 bg-white px-5 py-3 text-[#0a1a3d] shadow-[0_10px_35px_-14px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:bg-[#0a1a3d] hover:text-[#f0d78c]"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#0a1a3d] text-[#e2bd5c] transition-colors group-hover/btn:bg-[#e2bd5c] group-hover/btn:text-[#060f27]">
                <Phone className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
              <span className="font-sans text-[14px] font-bold tracking-tight whitespace-nowrap">
                {contact.ctaPhone}
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
