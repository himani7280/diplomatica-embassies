import Image from "next/image";
import type { HomeData } from "@/data/siteData";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { LuxHeading } from "./LuxHeading";
import { Parallax } from "./Fx";
import { Compass, Users, ShieldCheck, Globe, Award, Sparkles, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  compass: Compass,
  users: Users,
  "shield-check": ShieldCheck,
  globe: Globe,
  award: Award,
};

// About Diplomatica section
export function About({ data }: { data: HomeData["about"] }) {
  return (
    <section className="relative overflow-hidden bg-transparent pt-2 pb-6 sm:pt-3 sm:pb-8 lg:pt-3 lg:pb-8">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal direction="left" className="relative mx-auto h-[470px] w-full max-w-[520px] sm:h-[560px]">
          <div className="absolute left-0 top-6 h-[78%] w-[66%] overflow-hidden rounded-t-[999px] rounded-b-md bg-[#0a1a3d]">
            <Image src="/img/about-main.webp" alt="Embassy building with a national flag" fill sizes="(min-width: 1024px) 340px, 60vw" className="object-cover" />
          </div>
          <Parallax className="absolute right-0 top-0 h-[44%] w-[38%]" distance={34}>
            <div className="relative h-full w-full rotate-[5deg] overflow-hidden rounded-md border-4 border-[#fdfcf9] bg-[#0a1a3d]">
              <Image src="/img/about-plane.webp" alt="Aeroplane at sunset" fill sizes="200px" className="object-cover" />
            </div>
          </Parallax>
          <div className="absolute bottom-2 right-[4%] aspect-square h-[44%] overflow-hidden rounded-full border-[6px] border-[#fdfcf9] bg-[#0a1a3d]">
            <Image src="/img/about-globe.webp" alt="Desk globe" fill sizes="240px" className="object-cover" />
          </div>
          <div className="absolute bottom-[12%] left-[4%] border-l-2 border-[#e2bd5c] bg-[#fdfcf9]/90 py-1.5 pl-4 pr-3.5">
            <div className="font-[family-name:Playfair_Display,Georgia,serif] text-5xl font-bold leading-none text-[#0a1a3d]">
              <CountUp to={data.statValue} suffix={data.statSuffix} />
            </div>
            <div className="mt-1 text-[14px] font-semibold uppercase tracking-[0.16em] text-[#b98a28]">Years</div>
          </div>
        </Reveal>

        <div>
          <LuxHeading eyebrow={data.eyebrow} title={`${data.title} ${data.titleLine2}`} accent={data.titleAccent} text={data.text} />
          <Stagger className="mt-8 divide-y divide-[#0a1a3d]/10 border-y border-[#0a1a3d]/10" stagger={0.12}>
            {data.pillars.map((p, i) => {
              const Icon = (p.icon && ICON_MAP[p.icon]) || (i === 0 ? Compass : i === 1 ? Users : ShieldCheck) || Sparkles;
              return (
                <StaggerItem key={p.title}>
                  <div className="group flex items-center gap-5 py-4 transition-colors">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#e2bd5c]/40 bg-[#0a1a3d]/5 text-[#b98a28] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-[#e2bd5c] group-hover:bg-[#0a1a3d] group-hover:text-[#f0d78c] group-hover:shadow-[0_6px_20px_rgba(10,26,61,0.25)]">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="font-[family-name:Playfair_Display,Georgia,serif] text-xl font-bold text-[#0a1a3d] transition-colors group-hover:text-[#b98a28]">{p.title}</h3>
                      <p className="text-[15px] leading-relaxed text-[#666d82]">{p.text}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>

      {/* Mission & Vision cards */}
      {(() => {
        const mission = data.missionVision?.mission || data.mission;
        const vision = data.missionVision?.vision || data.vision;
        const bgImage = data.missionVision?.bgImage || "/img/about-1.webp";

        if (!mission && !vision) return null;

        return (
          <div className="mt-10 sm:mt-14 w-full">
            <Reveal className="w-full">
              <div className="group relative flex min-h-[420px] w-full items-center justify-center overflow-hidden border-y border-white/10 py-10 px-4 sm:min-h-[450px] sm:py-12 sm:px-6 lg:min-h-[480px] lg:px-10">
                <Image
                  src={bgImage}
                  alt="Diplomatica Embassies Mission & Vision"
                  fill
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/45" />

                <div className="relative z-10 grid w-full max-w-[1240px] grid-cols-1 items-stretch gap-10 sm:gap-12 md:grid-cols-2 lg:gap-14">
                  {/* Mission card */}
                  {mission && (
                    <div className="relative flex min-h-[220px] flex-col justify-center rounded-2xl border border-white/30 bg-[#0a1020]/90 p-8 pt-12 pb-8 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#e2bd5c]/60 hover:bg-[#0a1020]/95 sm:min-h-[240px] sm:p-9 sm:pt-13 sm:pb-8 lg:min-h-[260px] lg:p-10 lg:pt-14 lg:pb-9">
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 sm:-top-6 lg:-top-7 xl:-top-8">
                        <span className="whitespace-nowrap font-sans text-2xl font-black uppercase tracking-[0.16em] text-[#f0d78c] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-3xl lg:text-4xl xl:text-5xl">
                          {mission.title}
                        </span>
                      </div>

                      <p className="font-[family-name:Playfair_Display,Georgia,serif] text-[16px] font-medium italic leading-relaxed text-white/95 sm:text-[18px] lg:text-[19px]">
                        &ldquo;{mission.text}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Vision card */}
                  {vision && (
                    <div className="relative flex min-h-[220px] flex-col justify-center rounded-2xl border border-white/30 bg-[#0a1020]/90 p-8 pt-12 pb-8 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#e2bd5c]/60 hover:bg-[#0a1020]/95 sm:min-h-[240px] sm:p-9 sm:pt-13 sm:pb-8 lg:min-h-[260px] lg:p-10 lg:pt-14 lg:pb-9">
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 sm:-top-6 lg:-top-7 xl:-top-8">
                        <span className="whitespace-nowrap font-sans text-2xl font-black uppercase tracking-[0.16em] text-[#f0d78c] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-3xl lg:text-4xl xl:text-5xl">
                          {vision.title}
                        </span>
                      </div>

                      <p className="font-[family-name:Playfair_Display,Georgia,serif] text-[16px] font-medium italic leading-relaxed text-white/95 sm:text-[18px] lg:text-[19px]">
                        &ldquo;{vision.text}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        );
      })()}
    </section>
  );
}
