function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export interface ButtonStyleOptions {
  size?: "md" | "lg";
  variant?: "gold" | "outline" | "navy";
  className?: string;
}

export function buttonClasses({ size = "md", variant = "gold", className }: ButtonStyleOptions = {}): string {
  return cn(
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-md",
    "font-medium transition-all duration-300 hover:-translate-y-0.5",
    variant === "gold"
      ? "bg-gradient-to-b from-[#e2bd5c] to-[#b98a28] text-[#060f27] shadow-[0_12px_30px_-10px_rgba(185,138,40,0.6)] hover:shadow-[0_16px_34px_-10px_rgba(185,138,40,0.65)]"
      : variant === "navy"
        ? "bg-[#060f27] text-[#f0d78c] shadow-[0_14px_34px_-12px_rgba(6,15,39,0.7)] hover:bg-[#0a1a3d]"
        : "border border-[#e2bd5c]/60 bg-white/5 text-white backdrop-blur hover:border-[#e2bd5c] hover:bg-white/10",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b4841f]/30",
    size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-[15px]",
    className,
  );
}
