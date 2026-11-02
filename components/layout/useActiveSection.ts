"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Id of the section currently crossing the reading line, or null off the single page. */
export const sectionId = (href: string): string | undefined => href.split("#")[1];

export function useActiveSection(ids: readonly string[]): string | null {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const idsKey = ids.join(",");

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }

    const elements = idsKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        const first = elements.find((el) => visible.has(el.id));
        setActive((prev) => (first ? first.id : prev));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, idsKey]);

  return active;
}
