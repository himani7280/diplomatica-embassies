/** Decorative SVGs echoing the logo: the gold swoosh, laurel wreath and diamond divider. */

export function Swoosh({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id="sw-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f6e3a1" stopOpacity="0" />
          <stop offset=".5" stopColor="#e2bd5c" stopOpacity=".9" />
          <stop offset="1" stopColor="#b98a28" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M-40 520 C 260 380, 520 560, 820 330 S 1180 60, 1260 20" stroke="url(#sw-a)" strokeWidth="3" />
      <path d="M-40 560 C 280 430, 540 600, 840 380 S 1190 120, 1260 70" stroke="url(#sw-a)" strokeWidth="1.5" opacity=".7" />
      <path d="M-40 600 C 300 480, 560 640, 860 430 S 1200 190, 1260 130" stroke="url(#sw-a)" strokeWidth="1" opacity=".45" />
    </svg>
  );
}

export function Diamond({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" className={className}>
      <path d="M5 0 L10 5 L5 10 L0 5Z" fill="currentColor" />
    </svg>
  );
}

function leafPath(side: 1 | -1, i: number): string {
  const t = i / 6;
  const x = 50 + side * (6 + Math.sin(t * 1.25) * 26);
  const y = 74 - t * 62;
  const rot = side * (24 + t * 54);
  return `translate(${x} ${y}) rotate(${rot})`;
}

export function Laurel({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 80" className={className} fill="currentColor">
      {[-1, 1].flatMap((side) =>
        Array.from({ length: 7 }, (_, i) => (
          <ellipse key={`${side}-${i}`} cx="0" cy="0" rx="3.2" ry="8" transform={leafPath(side as 1 | -1, i)} opacity={0.55 + (i / 6) * 0.45} />
        )),
      )}
      <circle cx="50" cy="76" r="2.6" />
    </svg>
  );
}

export function OrnamentRule({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-3 text-[#d3a63e] ${className ?? ""}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-current" />
      <Diamond className="h-2 w-2" />
      <Laurel className="h-6 w-7" />
      <Diamond className="h-2 w-2" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-current" />
    </div>
  );
}

/** Clean straight section divider with gold luxury accent. */
export function CurveEdge({ className }: { fill?: string; className?: string }) {
  const isTop = className?.includes("top-");
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-20 h-px w-full bg-gradient-to-r from-transparent via-[#d3a63e]/35 to-transparent ${
        isTop ? "top-0" : "bottom-0"
      }`}
    />
  );
}
