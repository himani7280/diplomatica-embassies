"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Plane } from "lucide-react";

/** True once the opening iris starts to open (or when no intro is shown). Page content waits for it. */
const IntroReadyContext = createContext(true);
export const useIntroReady = () => useContext(IntroReadyContext);

type Phase = "idle" | "playing" | "leaving" | "done";

const SEEN_KEY = "dp-intro-seen";
const LEAVE_AT_MS = 3500;
const DONE_AT_MS = 4800;
const EASE = [0.22, 1, 0.36, 1] as const;
const WORD = "DIPLOMATICA";

export function IntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [percent, setPercent] = useState(0);
  const timers = useRef<number[]>([]);
  const iris = useMotionValue(0);
  const mask = useTransform(iris, (v) => `radial-gradient(circle farthest-corner at 50% 50%, transparent ${v}%, #000 ${v + 0.4}%)`);

  const finish = useCallback(() => {
    setPhase("done");
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode: the intro just plays again next visit */
    }
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(SEEN_KEY));
    } catch {
      /* ignore */
    }
    if (seen || reduceMotion || pathname !== "/") {
      setPhase("done");
      return;
    }
    setPhase("playing");
    const counter = animate(0, 100, { duration: 2.9, ease: [0.4, 0, 0.2, 1], onUpdate: (v) => setPercent(Math.round(v)) });
    timers.current = [
      window.setTimeout(() => setPhase((p) => (p === "done" ? p : "leaving")), LEAVE_AT_MS),
      window.setTimeout(finish, DONE_AT_MS),
    ];
    return () => {
      counter.stop();
      timers.current.forEach(window.clearTimeout);
    };
    // the intro only decides once, on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === "leaving") animate(iris, 100, { duration: 1.2, ease: [0.76, 0, 0.24, 1] });
    if (phase === "playing" || phase === "leaving") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [phase, iris]);

  const skip = () => {
    timers.current.forEach(window.clearTimeout);
    setPercent(100);
    setPhase("leaving");
    timers.current = [window.setTimeout(finish, 1300)];
  };

  const leaving = phase === "leaving";
  const ready = leaving || phase === "done";

  return (
    <IntroReadyContext.Provider value={ready}>
      {children}
      {phase !== "done" ? (
        <motion.div
          className="[html[data-intro-seen]_&]:hidden fixed inset-0 z-[200] bg-[#060f27]"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          role="status"
          aria-label="Loading Diplomatica Embassies"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(36,74,154,0.5),transparent_60%),radial-gradient(ellipse_at_50%_100%,rgba(185,138,40,0.22),transparent_55%)]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgba(226,189,92,0.22)_1px,transparent_1px)] bg-size-[24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_at_50%_45%,black,transparent_65%)]" />

          {/* gold meridian lines sweeping across */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#e2bd5c]/60 to-transparent"
              style={{ top: `${30 + i * 20}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: leaving ? 0 : 1 }}
              transition={{ scaleX: { duration: 1.6, delay: 0.2 + i * 0.25, ease: EASE }, opacity: { duration: 0.5 } }}
            />
          ))}

          <motion.div
            className="absolute inset-0 grid place-items-center"
            animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 1.18 : 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="relative flex flex-col items-center px-6 text-center">
              <div className="relative h-[210px] w-[210px] sm:h-[250px] sm:w-[250px]">
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(226,189,92,0.4),transparent_68%)] blur-xl"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 1, 0.7, 1], scale: [0.6, 1, 0.95, 1.08] }}
                  transition={{ duration: 3, ease: "easeOut" }}
                />
                <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
                  <motion.circle cx="50" cy="50" r="48" fill="none" stroke="#e2bd5c" strokeWidth="0.7" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: percent / 100 }} transition={{ duration: 0.2, ease: "linear" }} />
                  <circle cx="50" cy="50" r="43" fill="none" stroke="#e2bd5c" strokeOpacity="0.3" strokeWidth="0.4" strokeDasharray="1.4 2.2" />
                </svg>
                <motion.div aria-hidden="true" className="absolute inset-0" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 270, opacity: [0, 1, 1, 0] }} transition={{ duration: 3, ease: [0.45, 0, 0.25, 1], opacity: { duration: 3, times: [0, 0.08, 0.92, 1] } }}>
                  <span className="absolute left-1/2 top-0 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-b from-[#e2bd5c] to-[#b98a28] text-[#060f27] shadow-[0_0_22px_rgba(226,189,92,0.8)]">
                    <Plane className="h-4 w-4 rotate-45" fill="currentColor" strokeWidth={1.5} />
                  </span>
                </motion.div>
                <motion.div className="absolute inset-[9%]" initial={{ opacity: 0, scale: 0.6, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4, ease: EASE }}>
                  <Image src="/img/emblem-brand.webp" unoptimized alt="" width={560} height={440} priority className="h-full w-full object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)]" />
                </motion.div>

                {/* passport-style stamp that slams onto the emblem */}
                <motion.div
                  aria-hidden="true"
                  className="absolute -right-6 -top-2 grid h-[104px] w-[104px] place-items-center rounded-full border-[3px] border-[#e2bd5c] text-center text-[#e2bd5c] sm:-right-10 sm:h-[120px] sm:w-[120px]"
                  initial={{ opacity: 0, scale: 2.6, rotate: -34 }}
                  animate={{ opacity: [0, 0.95, 0.95], scale: [2.6, 0.92, 1], rotate: [-34, -14, -14] }}
                  transition={{ duration: 0.55, delay: 2.15, ease: [0.5, 0, 0.2, 1], times: [0, 0.7, 1] }}
                >
                  <span className="absolute inset-[5px] rounded-full border border-[#e2bd5c]/70" />
                  <span className="font-mono text-[9px] font-bold uppercase leading-tight tracking-[0.18em] sm:text-[10px]">
                    Cleared
                    <br />
                    <span className="text-[15px] sm:text-[17px]">★</span>
                    <br />
                    Welcome
                  </span>
                </motion.div>
              </div>

              <h2 aria-label="Diplomatica" className="mt-8 flex font-[family-name:Playfair_Display,Georgia,serif] text-[2.2rem] font-bold tracking-[0.16em] sm:text-5xl">
                {WORD.split("").map((letter, i) => (
                  <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em]">
                    <motion.span
                      className="inline-block bg-[linear-gradient(100deg,#d3a63e_0%,#f0d78c_25%,#e2bd5c_45%,#fff6d6_55%,#e2bd5c_65%,#d3a63e_100%)] bg-size-[220%_auto] bg-clip-text text-transparent"
                      initial={{ y: "115%", rotateX: -60 }}
                      animate={{ y: 0, rotateX: 0, backgroundPosition: ["0% center", "200% center"] }}
                      transition={{ duration: 0.8, delay: 0.9 + i * 0.05, ease: EASE, backgroundPosition: { duration: 7, ease: "linear", repeat: Infinity } }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </h2>

              <motion.p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.5em] text-white/80 sm:text-[13px]" initial={{ opacity: 0, letterSpacing: "0.9em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 1.1, delay: 1.7, ease: EASE }}>
                Embassies
              </motion.p>

              <div className="mt-9 flex items-center gap-4 font-mono text-[12px] tracking-[0.3em] text-[#f0d78c]">
                <span className="tabular-nums">{String(percent).padStart(3, "0")}</span>
                <span className="h-px w-40 overflow-hidden bg-white/15">
                  <span className="block h-full origin-left bg-[#e2bd5c]" style={{ transform: `scaleX(${percent / 100})` }} />
                </span>
                <span>%</span>
              </div>
            </div>

            <button type="button" onClick={skip} className="absolute bottom-6 right-6 rounded-full border border-white/20 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:border-[#e2bd5c] hover:text-[#f0d78c]">
              Skip
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </IntroReadyContext.Provider>
  );
}
