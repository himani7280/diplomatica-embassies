"use client";

import { createContext, useContext, type ReactNode } from "react";

/** True immediately so page content renders without delay. */
const IntroReadyContext = createContext(true);
export const useIntroReady = () => useContext(IntroReadyContext);

export function IntroProvider({ children }: { children: ReactNode }) {
  return (
    <IntroReadyContext.Provider value={true}>
      {children}
    </IntroReadyContext.Provider>
  );
}
