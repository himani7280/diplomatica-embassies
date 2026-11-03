"use client";

// Gold accent curves for hero banner

const PATHS = [
  { d: "M-40 520 C 260 380, 520 560, 820 330 S 1180 60, 1260 20", width: 3, opacity: 0.9, delay: 0.3 },
  { d: "M-40 560 C 280 430, 540 600, 840 380 S 1190 120, 1260 70", width: 1.5, opacity: 0.7, delay: 0.6 },
  { d: "M-40 600 C 300 480, 560 640, 860 430 S 1200 190, 1260 130", width: 1, opacity: 0.45, delay: 0.9 },
];

/** The logo's gold swoosh, drawn in once on load. */
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
        <path
          key={p.d}
          d={p.d}
          stroke="url(#sw-anim)"
          strokeWidth={p.width}
          opacity={p.opacity}
        />
      ))}
    </svg>
  );
}
