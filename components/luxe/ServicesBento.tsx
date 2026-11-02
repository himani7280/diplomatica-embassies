import Image from "next/image";
import type { HomeData, ServicesData } from "@/data/siteData";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { LuxHeading } from "./LuxHeading";
import { SpotlightCard } from "./Motion";

interface Props {
  intro: HomeData["services"];
  counselling: ServicesData["counselling"];
}

const SHAPES = [
  "lg:row-span-2",
  "sm:col-span-2 lg:col-span-2",
  "lg:row-span-2",
  "",
  "",
  "sm:col-span-2 lg:col-span-4",
] as const;

/** Flat photo mosaic: images carry the section, text appears only over the photo. */
export function ServicesBento({ intro, counselling }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-[#060f27] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <LuxHeading light center eyebrow={intro.eyebrow} title={intro.title} accent={intro.titleAccent} />

        <Stagger className="mt-5 grid gap-2 sm:mt-7 sm:grid-cols-2 sm:gap-3 lg:auto-rows-[250px] lg:grid-cols-4" stagger={0.08}>
          {counselling.items.map((item, i) => (
            <StaggerItem
              key={item.id}
              className={`flex flex-col ${SHAPES[i] ?? ""}`}
            >
              <SpotlightCard
                className={`group relative flex flex-col justify-end w-full overflow-hidden rounded-xl bg-[#0a1a3d] text-left ${
                  i === 5 ? "min-h-[320px] sm:min-h-[260px]" : "min-h-[280px] sm:min-h-[240px]"
                } lg:min-h-0 lg:h-full`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={
                    i === 5
                      ? "(min-width: 1024px) 1300px, 100vw"
                      : i === 1
                      ? "(min-width: 1024px) 650px, 100vw"
                      : "(min-width: 1024px) 420px, 50vw"
                  }
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                  priority={i === 0 || i === 2 || i === 5}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#060f27] via-[#060f27]/60 to-transparent sm:from-[#060f27]/90 sm:via-[#060f27]/25" />
                <div className="relative z-10 p-4 sm:p-5 mt-auto">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e2bd5c] sm:text-[12px]">0{i + 1}</span>
                  <h3 className="mt-1 font-[family-name:Playfair_Display,Georgia,serif] text-[1.2rem] font-bold leading-tight text-white sm:text-[1.35rem] lg:text-[1.5rem]">{item.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/80 transition-all duration-500 sm:mt-2 sm:text-[14px] sm:leading-6 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:opacity-100">{item.text}</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
