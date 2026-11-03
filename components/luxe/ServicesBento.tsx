import Image from "next/image";
import type { HomeData, ServicesData } from "@/data/siteData";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { LuxHeading } from "./LuxHeading";
import { SpotlightCard } from "./Motion";
import {
  Building2,
  FileCheck,
  ClipboardList,
  Globe,
  UserCheck,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface Props {
  intro: HomeData["services"];
  counselling: ServicesData["counselling"];
}

const ICON_MAP: Record<string, LucideIcon> = {
  building: Building2,
  "file-check": FileCheck,
  "clipboard-list": ClipboardList,
  globe: Globe,
  "clipboard-user": UserCheck,
  users: Users,
};

const SHAPES = [
  "sm:col-span-2 md:col-span-2 lg:col-span-1 lg:row-span-2",
  "sm:col-span-2 lg:col-span-2",
  "lg:row-span-2",
  "",
  "sm:col-span-2 md:col-span-2 lg:col-span-1",
  "sm:col-span-2 lg:col-span-4",
] as const;

/** Flat photo mosaic: images carry the section, text appears only over the photo. */
export function ServicesBento({ intro, counselling }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-[#060f27] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <LuxHeading light center eyebrow={intro.eyebrow} title={intro.title} accent={intro.titleAccent} />

        <Stagger className="mt-5 grid gap-2 sm:mt-7 sm:grid-cols-2 sm:gap-3 lg:auto-rows-[250px] lg:grid-cols-4" stagger={0.08}>
          {counselling.items.map((item, i) => {
            const Icon = (item.icon && ICON_MAP[item.icon]) || Sparkles;
            return (
              <StaggerItem
                key={item.id}
                className={`flex flex-col w-full ${SHAPES[i] ?? ""}`}
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
                    <div className="mb-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e2bd5c]/50 bg-[#0a1a3d]/80 text-[#f0d78c] shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#e2bd5c] group-hover:bg-[#e2bd5c] group-hover:text-[#060f27]">
                        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                      </span>
                    </div>
                    <h3 className="mt-1 font-[family-name:Playfair_Display,Georgia,serif] text-[1.2rem] font-bold leading-tight text-white sm:text-[1.35rem] lg:text-[1.5rem]">{item.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-white/80 transition-all duration-500 sm:mt-2 sm:text-[15px] sm:leading-6 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:opacity-100">{item.text}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
