"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteData } from "@/data/siteData";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { Reveal } from "@/components/motion/Reveal";
import { Diamond, OrnamentRule } from "@/components/luxe/Ornaments";
import { sectionId, useActiveSection } from "./useActiveSection";

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedinIcon,
} as const;

/** Compact, centered footer with reduced vertical height. */
export function Footer({ site }: { site: SiteData }) {
  const year = new Date().getFullYear();
  const activeId = useActiveSection(site.quickLinks.flatMap((l) => sectionId(l.href) ?? []));
  const isActive = (href: string) => sectionId(href) === activeId;

  const contactRows = [
    { icon: Phone, text: site.contact.phone, href: site.contact.phoneHref },
    { icon: Mail, text: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: MapPin, text: site.contact.address, href: site.contact.mapLink },
  ];

  return (
    <footer className="relative bg-[#f6f1e3] text-[#0a1a3d]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d3a63e] to-transparent" />
      <div aria-hidden="true" className="bg-[radial-gradient(rgba(10,26,61,0.12)_1px,transparent_1px)] bg-size-[24px_24px] absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col items-center px-2 pb-5 pt-6 text-center sm:px-6 lg:px-10 lg:pt-8">
        <Reveal>
          <Link href="/#home" aria-label="Diplomatica Embassies - Home" className="inline-block">
            <Image
              src="/img/logo-brand.webp"
              unoptimized
              alt="Diplomatica Embassies - Explore, Connect, Represent"
              width={1200}
              height={378}
              className="h-[52px] w-auto sm:h-[68px]"
            />
          </Link>
        </Reveal>
        <OrnamentRule className="mt-3.5" />

        <Reveal delay={0.06}>
          <ul className="mt-3.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {site.quickLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`group relative text-[14px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-[#8f6a1a] ${active ? "text-[#8f6a1a]" : ""}`}
                  >
                    {l.label}
                    <span className={`absolute inset-x-0 -bottom-1 h-px bg-[#d3a63e] transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
            {contactRows.map((r) => (
              <li key={r.text} className="max-w-full">
                <a
                  href={r.href}
                  className="group flex max-w-full items-center gap-1.5 rounded-full border border-[#e2bd5c]/50 bg-white/70 py-1 pl-1.5 pr-2.5 text-left text-[14px] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d3a63e] hover:bg-white sm:gap-2.5 sm:py-1.5 sm:pr-4"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0a1a3d] text-[#f0d78c] sm:h-7 sm:w-7">
                    <r.icon className="h-3 w-3 stroke-[2] sm:h-3.5 sm:w-3.5" />
                  </span>
                  <span className="leading-snug whitespace-nowrap text-[14px] tracking-tight sm:tracking-normal">{r.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="mt-3.5 flex items-center justify-center gap-2.5">
          {site.social.map((s) => {
            const Cmp = SOCIAL_ICONS[s.name];
            return (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid h-8 w-8 place-items-center rounded-full border border-[#0a1a3d]/25 text-[#0a1a3d] transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-[#0a1a3d] hover:text-[#f0d78c]"
                >
                  <Cmp className="h-3.5 w-3.5" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative bg-[#060f27] text-white/65">
        <div className="mx-auto flex w-full max-w-[1320px] items-center justify-center px-4 py-3 text-[14px] sm:px-6 lg:px-10">
          <p className="flex flex-wrap items-center justify-center gap-2 text-center">
            <Diamond className="h-1.5 w-1.5 text-[#e2bd5c] shrink-0" />
            <span>
              © {year} {site.brand.name}. All Rights Reserved.{" "}
              <span className="inline-block whitespace-nowrap">
                Powered by{" "}
                <a
                  href="https://lestow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white/90 transition-colors hover:text-[#f0d78c] hover:underline"
                >
                  Lestow
                </a>
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
