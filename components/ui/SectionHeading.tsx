import { Reveal } from "@/components/motion/Reveal";

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function Eyebrow({
  children,
  center = false,
  light = false,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        center && "justify-center",
        className,
      )}
    >
      <span className="h-[2px] w-9 bg-[#b4841f] sm:w-12" />
      <span
        className={cn(
          "text-[14px] font-semibold uppercase tracking-[0.16em]",
          light ? "text-white" : "text-[#0c2250]",
        )}
      >
        {children}
      </span>
    </div>
  );
}

interface TitleProps {
  title: string;
  line2?: string;
  accent?: string;
  end?: string;
  inline?: boolean;
  light?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function GradientTitle({
  title,
  line2,
  accent,
  end,
  inline = false,
  light = false,
  className,
  as: Tag = "h2",
}: TitleProps) {
  return (
    <Tag
      className={cn(
        "font-[family-name:Playfair_Display,Georgia,serif] text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]",
        light ? "text-white" : "text-[#0c2250]",
        className,
      )}
    >
      {title}
      {line2 ? (
        <>
          <br />
          {line2}{" "}
        </>
      ) : accent ? (
        inline ? (
          " "
        ) : (
          <br />
        )
      ) : null}
      {accent ? <span className="text-[#b4841f]">{accent}</span> : null}
      {end ? ` ${end}` : null}
    </Tag>
  );
}

interface SectionHeadingProps extends TitleProps {
  eyebrow?: string;
  text?: string;
  center?: boolean;
  textClassName?: string;
}

export function SectionHeading({
  eyebrow,
  text,
  center = false,
  textClassName,
  className,
  ...title
}: SectionHeadingProps) {
  return (
    <div className={cn(center && "text-center", className)}>
      {eyebrow ? (
        <Reveal>
          <Eyebrow center={center} light={title.light}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.08} className={eyebrow ? "mt-2" : undefined}>
        <GradientTitle {...title} />
      </Reveal>
      {text ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-3 text-[15px] leading-7 sm:text-base",
              center && "mx-auto max-w-2xl",
              title.light ? "text-white/80" : "text-[#666d82]",
              textClassName,
            )}
          >
            {text}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
