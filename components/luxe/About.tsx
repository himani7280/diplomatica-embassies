import Image from "next/image";
import type { HomeData } from "@/data/siteData";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { LuxHeading } from "./LuxHeading";
import { Parallax } from "./Fx";

/** Left: an overlapping collage of three differently-shaped photos. Right: copy and a plain numbered list. */
export function About({ data }: { data: HomeData["about"] }) {
  return (
    <section className="relative overflow-hidden bg-transparent pt-2 pb-6 sm:pt-3 sm:pb-8 lg:pt-3 lg:pb-8">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal direction="left" className="relative mx-auto h-[470px] w-full max-w-[520px] sm:h-[560px]">
          <div className="absolute left-0 top-6 h-[78%] w-[66%] overflow-hidden rounded-t-[999px] rounded-b-md bg-[#0a1a3d]">
            <Image src="/img/about-main.webp" alt="Embassy building with a national flag" fill sizes="(min-width: 1024px) 340px, 60vw" className="object-cover" />
          </div>
          <Parallax className="absolute right-0 top-0 h-[44%] w-[38%]" distance={34}><div className="relative h-full w-full rotate-[5deg] overflow-hidden rounded-md border-4 border-[#fdfcf9] bg-[#0a1a3d]">
            <Image src="/img/about-plane.webp" alt="Aeroplane at sunset" fill sizes="200px" className="object-cover" />
          </div></Parallax>
          <div className="absolute bottom-2 right-[4%] aspect-square h-[44%] overflow-hidden rounded-full border-[6px] border-[#fdfcf9] bg-[#0a1a3d]">
            <Image src="/img/about-globe.webp" alt="Desk globe" fill sizes="240px" className="object-cover" />
          </div>
          <div className="absolute bottom-[12%] left-[4%] border-l-2 border-[#e2bd5c] bg-[#fdfcf9]/90 py-1 pl-4 pr-3">
            <div className="font-[family-name:Playfair_Display,Georgia,serif] text-5xl font-bold leading-none text-[#0a1a3d]">
              <CountUp to={data.statValue} suffix={data.statSuffix} />
            </div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b98a28]">Years</div>
          </div>
        </Reveal>

        <div>
          <LuxHeading eyebrow={data.eyebrow} title={`${data.title} ${data.titleLine2}`} accent={data.titleAccent} text={data.text} />
          <Stagger className="mt-8 divide-y divide-[#0a1a3d]/10 border-y border-[#0a1a3d]/10" stagger={0.12}>
            {data.pillars.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="group flex items-center gap-5 py-4 transition-colors">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[#e2bd5c]/30 bg-[#0a1a3d]/5 font-[family-name:Playfair_Display,Georgia,serif] text-xl font-bold text-[#b98a28] transition-all duration-300 group-hover:border-[#e2bd5c] group-hover:bg-[#0a1a3d] group-hover:text-[#f0d78c] group-hover:shadow-[0_4px_16px_rgba(10,26,61,0.25)]">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:Playfair_Display,Georgia,serif] text-xl font-bold text-[#0a1a3d] transition-colors group-hover:text-[#b98a28]">{p.title}</h3>
                    <p className="text-[15px] text-[#666d82]">{p.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
