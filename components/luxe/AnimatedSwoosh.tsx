"use client";

import { motion } from "framer-motion";

const PATHS = [
  { d: "M-40 520 C 260 380, 520 560, 820 330 S 1180 60, 1260 20", width: 3, opacity: 0.9, delay: 0.2 },
  { d: "M-40 560 C 280 430, 540 600, 840 380 S 1190 120, 1260 70", width: 1.5, opacity: 0.7, delay: 0.45 },
  { d: "M-40 600 C 300 480, 560 640, 860 430 S 1200 190, 1260 130", width: 1, opacity: 0.45, delay: 0.7 },
];

// 3 gold accent curves for hero banner, animated in on load
export function AnimatedSwoosh({ className, play = true }: { className?: string; play?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id="sw-anim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f6e3a1" stopOpacity="0" />
          <stop offset=".5" stopColor="#e2bd5c" stopOpacity=".9" />
          <stop offset="1" stopColor="#b98a28" stopOpacity="0" />
        </linearGradient>
      </defs>
      {PATHS.map((p) => (
        <motion.path
          key={p.d}
          d={p.d}
          stroke="url(#sw-anim)"
          strokeWidth={p.width}
          opacity={p.opacity}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: play ? 1 : 0 }}
          transition={{ duration: 2.2, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  );
}
