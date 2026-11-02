import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-4 py-20 text-center">
      <div>
        <p className="font-[family-name:Playfair_Display,Georgia,serif] text-7xl font-extrabold text-[#b4841f] sm:text-8xl">404</p>
        <h1 className="mt-4 font-[family-name:Playfair_Display,Georgia,serif] text-3xl font-extrabold text-[#0c2250] sm:text-4xl">
          This page took a different flight
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[#666d82]">
          The page you are looking for does not exist or has moved. Let us get you back on
          track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <Link href="/#contact" className="font-semibold text-[#0c2250] underline-offset-4 hover:underline">
            Contact our team
          </Link>
        </div>
      </div>
    </section>
  );
}
