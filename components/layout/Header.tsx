"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import type { NavLink, SiteData } from "@/data/siteData";
import { sectionId, useActiveSection } from "@/data/siteData";

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
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 pointer-events-none",
          compact ? "pt-1.5 sm:pt-2" : "pt-2.5 sm:pt-3.5"
        )}
      >
        <div className="mx-auto w-full max-w-[1360px] px-3 sm:px-6 lg:px-8">
          <div className="pointer-events-auto flex w-full items-center justify-between gap-2 rounded-2xl border border-[#0a1a3d]/10 bg-white/95 px-3 py-1.5 shadow-[0_10px_35px_-10px_rgba(10,26,61,0.15)] backdrop-blur-md sm:px-5 sm:py-2 xl:gap-4 xl:px-6">
            <Link
              href="/#home"
              aria-label="Diplomatica Embassies - Home"
              className="group shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src="/img/logo-brand.webp"
                unoptimized
                alt="Diplomatica Embassies - Explore, Connect, Represent"
                width={1200}
                height={378}
                priority
                className={cn(
                  "w-auto transition-all duration-300",
                  compact ? "h-[32px] sm:h-[36px] xl:h-[42px]" : "h-[36px] sm:h-[40px] xl:h-[46px]"
                )}
              />
            </Link>

            <div className="hidden items-center gap-1 lg:flex xl:gap-3">
              <nav aria-label="Main navigation">
                <ul className="relative flex items-center gap-0 lg:gap-0.5 xl:gap-1">
                  {nav.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href} className="relative">
                        <Link
                          href={item.href}
                          className={cn(
                            "group relative z-10 block whitespace-nowrap px-1 py-1 font-sans text-[14px] font-semibold uppercase tracking-tight transition-colors duration-300 lg:px-1.5 xl:px-3 xl:py-1.5 xl:font-sans xl:tracking-[0.05em]",
                            active ? "text-[#f0d78c]" : "text-[#0a1a3d] hover:text-[#b98a28]",
                          )}
                        >
                          <RollText>{item.label}</RollText>
                        </Link>
                        {active ? (
                          <motion.span layoutId="nav-active" transition={SPRING} className="absolute inset-0 rounded-lg bg-[#0a1a3d] shadow-[0_4px_14px_rgba(6,15,39,0.35)]">
                            <span className="absolute inset-x-1 bottom-[3px] h-px bg-gradient-to-r from-transparent via-[#e2bd5c] to-transparent xl:inset-x-3" />
                          </motion.span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {contact.phone ? (
                <div className="flex shrink-0 items-center">
                  <a
                    href={contact.phoneHref}
                    aria-label={`Call us: ${contact.phone}`}
                    className="group relative inline-flex h-[34px] items-center gap-1 overflow-hidden rounded-xl bg-[#0a1a3d] px-2 text-[#f0d78c] shadow-sm transition-all duration-300 hover:bg-[#e2bd5c] hover:text-[#060f27] xl:h-[40px] xl:gap-2 xl:px-3.5"
                  >
                    <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-lg bg-[#f0d78c]/15 text-[#f0d78c] transition-colors group-hover:bg-[#060f27]/15 group-hover:text-[#060f27] xl:h-5.5 xl:w-5.5">
                      <Phone className="h-3 w-3 stroke-[2.2]" />
                    </span>
                    <span className="whitespace-nowrap font-sans text-[14px] font-bold tracking-tight xl:font-sans">
                      {contact.phone}
                    </span>
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
                className="grid h-9 w-9 place-items-center rounded-lg border border-[#0a1a3d]/15 bg-white text-[#0a1a3d] transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
              >
                <Menu className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <div key="mobile-menu" className="lg:hidden">
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[80] bg-[#060f27]/70 backdrop-blur-sm"
            />

            {/* Mobile menu card open on one side with compact width, sticky logo header, and scrollable content */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-3 top-3 z-[90] flex h-auto max-h-[calc(100vh-24px)] w-[280px] max-w-[82vw] flex-col overflow-hidden rounded-2xl border border-[#0a1a3d]/10 bg-white shadow-2xl sm:right-6 sm:top-3.5 sm:w-[310px]"
            >
              {/* Sticky header with logo and close button */}
              <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-[#0a1a3d]/10 bg-white px-4 py-3 sm:px-5">
                <Link
                  href="/#home"
                  onClick={() => setOpen(false)}
                  aria-label="Diplomatica Embassies - Home"
                  className="shrink-0"
                >
                  <Image
                    src="/img/logo-brand.webp"
                    unoptimized
                    alt="Diplomatica Embassies - Explore, Connect, Represent"
                    width={1200}
                    height={378}
                    priority
                    className="h-[30px] w-auto sm:h-[34px]"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-[#0a1a3d]/10 bg-white text-[#0a1a3d] transition-colors hover:bg-gray-100"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Scrollable menu body */}
              <div className="flex-1 overflow-y-auto px-4 py-3.5 sm:px-5">
                <nav>
                  <ul className="space-y-1">
                    {nav.map((item) => {
                      const active = isActive(item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center justify-between rounded-lg px-3 py-2 font-sans text-[14px] font-semibold uppercase tracking-tight transition-colors",
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

                {contact.phone ? (
                  <div className="mt-3.5 border-t border-[#0a1a3d]/10 pt-3">
                    <a
                      href={contact.phoneHref}
                      className="flex items-center gap-2.5 rounded-xl border border-[#0a1a3d]/10 bg-[#faf7f0] p-2.5 text-[#0a1a3d] shadow-sm transition-colors hover:bg-white"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#0a1a3d] text-[#f0d78c]">
                        <Phone className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <span className="block text-[14px] text-[#0a1a3d]/60">Direct Consular Line</span>
                        <span className="font-sans text-[14px] font-bold text-[#0a1a3d]">{contact.phone}</span>
                      </div>
                    </a>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
