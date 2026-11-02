"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

/** A rule that draws itself from left to right when scrolled into view. */
export function DrawLine({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/** Springs into place when scrolled into view (used for the numbered step badges). */
export function Pop({ className, children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  return (
    <motion.span
      className={className}
      initial={{ scale: 0, rotate: -90, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
    >
      {children}
    </motion.span>
  );
}

/** Card link with a gold spotlight that follows the cursor; leads to the contact section. */
export function SpotlightCard({ href = "/#contact", className, children }: { href?: string; className?: string; children: ReactNode }) {
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Link href={href} onMouseMove={onMove} className={className}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(226,189,92,0.22), transparent 62%)" }}
      />
      {children}
    </Link>
  );
}
