"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { NewsPost } from "@/data/siteData";
import { Tilt } from "./Fx";
import { LuxHeading } from "./LuxHeading";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function NewsMagazine({ posts }: { posts: NewsPost[] }) {
  if (!posts || posts.length === 0) return null;

  // Show only 3 items on the right
  const items = posts.slice(0, 3);
  const [selectedPostId, setSelectedPostId] = useState<number>(items[0]?.id ?? 1);

  const featured = items.find((p) => p.id === selectedPostId) ?? items[0];

  return (
    <section className="relative bg-transparent pt-2 pb-6 sm:pt-3 sm:pb-8 lg:pt-3 lg:pb-8">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <LuxHeading center eyebrow="News & Events" title="From the" accent="Diplomatica Desk" />

        <div className="mt-5 grid gap-6 sm:mt-7 sm:gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          {/* Left Featured Column */}
          <div className="w-full">
            <Tilt className="h-full">
              <article className="relative min-h-[340px] w-full overflow-hidden rounded-xl bg-[#0a1a3d] sm:min-h-[380px] lg:h-full lg:min-h-[440px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featured.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(min-width: 1024px) 700px, 100vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#060f27] via-[#060f27]/45 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={featured.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <time dateTime={featured.date} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f0d78c] sm:text-[12px]">
                        {formatDate(featured.date)}
                      </time>

                      <h3 className="mt-2 font-[family-name:Playfair_Display,Georgia,serif] text-[1.3rem] font-bold leading-tight text-white sm:text-[1.8rem] lg:text-[2.2rem]">
                        {featured.title} {featured.titleAccent}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-white/85 sm:line-clamp-none sm:text-[14px] sm:leading-6 lg:text-[15px] lg:leading-7">
                        {featured.excerpt}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </article>
            </Tilt>
          </div>

          {/* Right News List: Exactly 3 compact items */}
          <div className="flex flex-col justify-center divide-y divide-[#0a1a3d]/15">
            {items.map((post, idx) => {
              const isSelected = post.id === selectedPostId;
              return (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => setSelectedPostId(post.id)}
                  className={`group flex w-full items-center gap-3.5 rounded-xl p-3 text-left transition-all duration-300 sm:gap-4 sm:p-3.5 ${
                    isSelected
                      ? "bg-white/90 shadow-md ring-1.5 ring-[#e2bd5c]"
                      : "hover:bg-white/50"
                  }`}
                >
                  <div className="relative h-18 w-20 shrink-0 overflow-hidden rounded-lg bg-[#0a1a3d] sm:h-20 sm:w-24">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {isSelected && (
                      <span className="absolute inset-0 bg-[#e2bd5c]/15 ring-2 ring-inset ring-[#e2bd5c]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#e2bd5c]">
                        0{idx + 1}
                      </span>
                      <span className="text-[#0a1a3d]/30">•</span>
                      <time dateTime={post.date} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b98a28]">
                        {formatDate(post.date)}
                      </time>
                    </div>

                    <h3 className={`mt-1 font-[family-name:Playfair_Display,Georgia,serif] text-[15px] font-bold leading-snug transition-colors sm:text-base lg:text-[1.1rem] ${
                      isSelected ? "text-[#0a1a3d]" : "text-[#0a1a3d]/85 group-hover:text-[#0a1a3d]"
                    }`}>
                      {post.title} {post.titleAccent}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
