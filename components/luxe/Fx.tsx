"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Wipes a block open from the bottom when it scrolls into view. */
export function ClipReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0% round 12px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Slides its content vertically at a different speed than the page while it is on screen. */
export function Parallax({ children, className, distance = 40 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/** Tilts toward the cursor, like a card held in the hand. */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 900 }}
      whileHover={{ rotateX: -3, rotateY: 4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}
