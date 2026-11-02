"use client";

import { MotionConfig } from "framer-motion";
import { Suspense, type ReactNode } from "react";
import { ScrollToTop } from "./ScrollToTop";
import { IntroProvider } from "@/components/luxe/Intro";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <IntroProvider>
        {children}
      </IntroProvider>
    </MotionConfig>
  );
}
