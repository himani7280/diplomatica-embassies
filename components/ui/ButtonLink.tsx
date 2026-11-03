import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClasses } from "@/data/siteData";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
  size?: "md" | "lg";
  variant?: "gold" | "outline" | "navy";
}

export function ButtonLink({
  href,
  children,
  className,
  arrow = true,
  size = "md",
  variant = "gold",
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses({ size, variant, className })}>
      <span className="relative z-10">{children}</span>
      {arrow ? (
        <ArrowRight
          className="relative z-10 h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2}
        />
      ) : null}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </Link>
  );
}
