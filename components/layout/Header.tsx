"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import type { NavLink, SiteData } from "@/data/siteData";
import { sectionId, useActiveSection } from "./useActiveSection";

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

interface HeaderProps {
  nav: NavLink[];
  cta: NavLink;
  contact: SiteData["contact"];
}

const SPRING = { type: "spring", stiffness: 420, damping: 34 } as const;

// Text roll hover effect
function RollText({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">{children}</span>
      <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

// Global fixed header
export function Header({ nav, contact }: HeaderProps) {
  const pathname = usePathname();
  const activeId = useActiveSection(nav.flatMap((n) => sectionId(n.href) ?? []));
  const isActive = (href: string) => sectionId(href) === activeId;
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 24));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left bg-gradient-to-r from-[#b98a28] via-[#f0d78c] to-[#e2bd5c]" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          compact
            ? "bg-[#060f27]/35 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-md border-b border-white/10"
            : "bg-transparent py-4 border-b border-transparent"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-1.5 px-3 sm:px-4 lg:px-4 xl:gap-4 xl:px-8">
          <Link
            href="/#home"
            aria-label="Diplomatica Embassies - Home"
            className="group shrink-0 rounded-xl bg-white px-2.5 py-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/5 backdrop-blur transition-transform duration-500 hover:scale-[1.04] xl:px-3.5 xl:py-2"
          >
            <Image
              src="/img/logo-brand.webp"
              unoptimized
              alt="Diplomatica Embassies - Explore, Connect, Represent"
              width={1200}
              height={378}
              priority
              className={cn("w-auto transition-all duration-500", compact ? "h-[28px] lg:h-[30px] xl:h-[38px]" : "h-[32px] lg:h-[34px] xl:h-[44px]")}
            />
          </Link>

          <div className="hidden items-center gap-1.5 lg:flex xl:gap-2.5">
            <nav aria-label="Main navigation" className="rounded-xl bg-white p-1 shadow-[0_10px_35px_-14px_rgba(0,0,0,0.5)] ring-1 ring-black/5 backdrop-blur-md xl:p-1.5">
              <ul className="relative flex items-center">
                {nav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href} className="relative">
                      <Link
                        href={item.href}
                        className={cn(
                          "group relative z-10 block whitespace-nowrap px-1.5 py-1 font-sans text-[14px] font-semibold uppercase tracking-tight transition-colors duration-300 xl:px-3.5 xl:py-2 xl:font-mono xl:tracking-[0.06em]",
                          active ? "text-[#f0d78c]" : "text-[#0a1a3d]",
                        )}
                      >
                        <RollText>{item.label}</RollText>
                      </Link>
                      {active ? (
                        <motion.span layoutId="nav-active" transition={SPRING} className="absolute inset-0 rounded-lg bg-[#0a1a3d] shadow-[0_8px_18px_-8px_rgba(6,15,39,0.8)]">
                          <span className="absolute inset-x-2 bottom-[3px] h-px bg-gradient-to-r from-transparent via-[#e2bd5c] to-transparent xl:inset-x-3" />
                        </motion.span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {contact.phone ? (
              <div className="flex shrink-0 items-center">
                {/* Standalone phone button: Golden by default, Blue on hover */}
                <a
                  href={contact.phoneHref}
                  aria-label={`Call us: ${contact.phone}`}
                  className="group relative inline-flex h-[38px] items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#e2bd5c] via-[#f0d78c] to-[#e2bd5c] px-2.5 text-[#060f27] shadow-[0_10px_30px_-12px_rgba(185,138,40,0.6)] ring-1 ring-[#b98a28]/60 transition-all duration-500 hover:bg-[#0a1a3d] hover:bg-none hover:text-[#f0d78c] hover:ring-[#e2bd5c]/40 xl:h-[46px] xl:gap-2 xl:px-4"
                >
                  <span className="grid h-5.5 w-5.5 shrink-0 place-items-center rounded-lg bg-[#060f27]/15 text-[#060f27] transition-colors group-hover:bg-[#e2bd5c]/20 group-hover:text-[#f0d78c] xl:h-6 xl:w-6">
                    <Phone className="h-3 w-3 stroke-[2.2] xl:h-3.5 xl:w-3.5" />
                  </span>
                  <span className="whitespace-nowrap font-sans text-[14px] font-bold tracking-tight xl:font-mono">
                    {contact.phone}
                  </span>
                  <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile hamburger menu */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#0a1a3d] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.4)] ring-1 ring-black/5 transition-colors hover:bg-gray-50"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <div key="mobile-menu" className="lg:hidden">
            <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[80] bg-[#060f27]/70 backdrop-blur-sm" />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-[360px] flex-col justify-between bg-[#fdfcf9] p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#0a1a3d]/10 pb-4">
                  <span className="font-mono text-[14px] font-semibold uppercase tracking-[0.14em] text-[#b98a28]">Menu</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="grid h-10 w-10 place-items-center rounded-lg border border-[#0a1a3d]/10 text-[#0a1a3d] transition-colors hover:bg-black/5"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="mt-6">
                  <ul className="space-y-1">
                    {nav.map((item) => {
                      const active = isActive(item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center justify-between rounded-lg px-3 py-2.5 font-mono text-[15px] font-semibold uppercase tracking-[0.08em] transition-colors",
                              active ? "bg-[#0a1a3d] text-[#f0d78c]" : "text-[#0a1a3d] hover:bg-black/5"
                            )}
                          >
                            <span>{item.label}</span>
                            <ArrowRight className="h-4 w-4 opacity-50" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              <div className="border-t border-[#0a1a3d]/10 pt-6">
                {contact.phone ? (
                  <a
                    href={contact.phoneHref}
                    className="flex items-center gap-3 rounded-xl border border-[#e2bd5c]/40 bg-[#0a1a3d] p-3 text-[#f0d78c] shadow-sm"
                  >
                    <Phone className="h-4 w-4" />
                    <div>
                      <span className="block text-[14px] text-white/60">Direct Consular Line</span>
                      <span className="font-mono text-[14px] font-bold">{contact.phone}</span>
                    </div>
                  </a>
                ) : null}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
