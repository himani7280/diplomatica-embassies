import Link from "next/link";
import { Phone } from "lucide-react";
import type { HomeData, SiteData } from "@/data/siteData";
import { Reveal } from "@/components/motion/Reveal";
import { Laurel } from "./Ornaments";

export function CtaBand({ data, contact }: { data: HomeData["cta"]; contact: SiteData["contact"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#e2bd5c] via-[#f0d78c] to-[#d3a63e] py-8 sm:py-10 lg:py-10">
      <Laurel className="pointer-events-none absolute -left-10 top-1/2 -z-10 h-[340px] w-[340px] -translate-y-1/2 -rotate-12 text-[#060f27]/[0.07]" />
      <Laurel className="pointer-events-none absolute -right-10 top-1/2 -z-10 h-[340px] w-[340px] -translate-y-1/2 rotate-12 text-[#060f27]/[0.07]" />
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#0a1a3d]/80">Explore · Connect · Represent</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-[family-name:Playfair_Display,Georgia,serif] text-[2rem] font-bold leading-[1.1] tracking-tight text-[#060f27] sm:mt-4 sm:text-4xl lg:text-[3.2rem]">
            {data.titleLine1} <span className="italic">{data.titleAccent}</span> {data.titleEnd}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:mt-6">
            <Link href="/#contact" className="rounded-full bg-[#060f27] px-7 py-3 text-sm font-medium text-[#f0d78c] transition-colors hover:bg-[#0a1a3d] sm:text-base">
              Request a Consultation
            </Link>
            <a href={contact.ctaPhoneHref} className="inline-flex items-center gap-3 rounded-full border-2 border-[#060f27]/80 px-7 py-2.5 text-sm font-semibold text-[#060f27] transition-colors hover:bg-[#060f27] hover:text-[#f0d78c] sm:text-base">
              <Phone className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              {contact.ctaPhone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
