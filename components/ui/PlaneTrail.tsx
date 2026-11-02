import { Plane } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function PlaneTrail({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none", flip && "-scale-x-100", className)}
    >
      <svg viewBox="0 0 220 130" fill="none" className="absolute inset-0 h-full w-full">
        <path
          d="M2 2 C 52 18, 92 38, 134 70"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute left-[58%] top-[48%] animate-[bounce_5s_ease-in-out_infinite]">
        <Plane className="h-10 w-10 rotate-90 fill-current sm:h-12 sm:w-12" strokeWidth={1} />
      </div>
    </div>
  );
}
