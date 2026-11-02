"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlaneTrail } from "@/components/ui/PlaneTrail";

interface PageBannerProps {
  title: string;
  crumb?: string;
}

export function PageBanner({ title, crumb }: PageBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a1a3d]">
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 9, ease: "easeOut" }}
      >
        <Image
          src="/img/banner-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/25 to-black/5" />

      <PlaneTrail className="absolute left-[2%] top-3 hidden h-[110px] w-[190px] text-white/45 sm:block lg:left-[3%] lg:top-8 lg:h-[130px] lg:w-[220px]" />

      <div className="mx-auto flex min-h-[210px] w-full max-w-[1320px] flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[290px] sm:px-6 lg:min-h-[395px] lg:items-start lg:px-10 lg:pl-24 lg:text-left">
        <motion.h1
          initial={{ opacity: 0, x: -34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:Playfair_Display,Georgia,serif] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem]"
        >
          {title}
        </motion.h1>
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 flex items-center justify-center gap-2 text-[15px] lg:justify-start"
        >
          <Link href="/" className="text-white/65 transition-colors hover:text-white">
            Home
          </Link>
          <span className="text-white/65">/</span>
          <span className="text-white">{crumb ?? title}</span>
        </motion.nav>
      </div>
    </section>
  );
}
