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
const EASE = [0.22, 1, 0.36, 1] as const;

/** Label that rolls up and is replaced by a copy of itself on hover. */
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

/** Transparent bar: logo on the left, a frosted menu tray and a square arrow button on the right. */
export function Header({ nav, cta, contact }: HeaderProps) {
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

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500",
          compact ? "py-2.5" : "py-4"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-10">
          <Link
            href="/#home"
            aria-label="Diplomatica Embassies - Home"
            className="group shrink-0 rounded-xl bg-white px-3.5 py-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/5 backdrop-blur transition-transform duration-500 hover:scale-[1.04]"
          >
            <Image
              src="/img/logo-brand.webp"
              unoptimized
              alt="Diplomatica Embassies - Explore, Connect, Represent"
              width={1200}
              height={378}
              priority
              className={cn("w-auto transition-all duration-500", compact ? "h-[34px] sm:h-[38px]" : "h-[40px] sm:h-[46px]")}
            />
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            <nav aria-label="Main navigation" className="rounded-xl bg-white p-1.5 shadow-[0_10px_35px_-14px_rgba(0,0,0,0.5)] ring-1 ring-black/5 backdrop-blur-md">
              <ul className="relative flex items-center">
                {nav.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.li key={item.href} className="relative" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.45 + i * 0.07 }}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group relative z-10 block whitespace-nowrap px-4 py-2.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 xl:px-5 xl:text-[12px]",
                          active ? "text-[#f0d78c]" : "text-[#0a1a3d]",
                        )}
                      >
                        <RollText>{item.label}</RollText>
                      </Link>
                      {active ? (
                        <motion.span layoutId="nav-active" transition={SPRING} className="absolute inset-0 rounded-lg bg-[#0a1a3d] shadow-[0_8px_18px_-8px_rgba(6,15,39,0.8)]">
                          <span className="absolute inset-x-4 bottom-[3px] h-px bg-gradient-to-r from-transparent via-[#e2bd5c] to-transparent" />
                        </motion.span>
                      ) : null}
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.95 }}>
              <Link
                href={cta.href}
                aria-label={cta.label}
                title={cta.label}
                className="group relative grid h-[52px] w-[52px] place-items-center overflow-hidden rounded-xl bg-[#0a1a3d] text-[#f0d78c] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] ring-1 ring-[#e2bd5c]/40 transition-colors duration-500 hover:bg-[#e2bd5c] hover:text-[#060f27]"
              >
                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45" strokeWidth={2.2} />
                <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#0a1a3d] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.4)] ring-1 ring-black/5 transition-colors hover:bg-gray-50 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <div key="mobile-menu" className="lg:hidden">
            <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[80] bg-[#060f27]/70 backdrop-blur-sm" />
            <motion.aside
              role="dialog"
              aria-label="Main navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="fixed right-0 top-0 z-[90] flex h-full w-[88%] max-w-[380px] flex-col overflow-hidden bg-[#060f27] shadow-2xl"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(36,74,154,0.55),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(185,138,40,0.2),transparent_55%)]" />
              <div className="relative flex h-[72px] items-center justify-between border-b border-white/10 px-5">
                <Link
                  href="/#home"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-white/95 px-2.5 py-1.5 shadow-sm transition-transform hover:scale-105"
                >
                  <Image
                    src="/img/logo-brand.webp"
                    unoptimized
                    alt="Diplomatica Embassies"
                    width={1200}
                    height={378}
                    className="h-[30px] w-auto"
                  />
                </Link>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-white transition-colors hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="relative flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
                {nav.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.li key={item.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i + 0.12, duration: 0.35 }}>
                      <Link href={item.href} onClick={() => setOpen(false)} className={cn("flex items-center gap-4 rounded-xl px-4 py-3.5 font-[family-name:Playfair_Display,Georgia,serif] text-[1.2rem] font-semibold transition-colors", active ? "bg-white/10 text-[#f0d78c]" : "text-white/85 hover:bg-white/5")}>
                        <span className="w-6 font-mono text-[13px] font-bold text-[#e2bd5c]">0{i + 1}</span>
                        {item.label}
                        <ArrowRight className="ml-auto h-4 w-4 opacity-60" />
                      </Link>
                    </motion.li>
                  );
                })}
                <motion.li initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * nav.length + 0.15, duration: 0.35 }} className="mt-4">
                  <Link href={cta.href} onClick={() => setOpen(false)} className="flex w-full items-center justify-between rounded-xl bg-gradient-to-b from-[#e2bd5c] to-[#b98a28] px-4 py-4 font-[family-name:Playfair_Display,Georgia,serif] text-lg font-bold text-[#060f27]">
                    {cta.label}
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </motion.li>
              </ul>
              <div className="relative space-y-3 border-t border-white/10 p-5 text-sm text-white/75">
                <a href={contact.phoneHref} className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#e2bd5c]" /> {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#e2bd5c]" /> {contact.email}
                </a>
              </div>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
