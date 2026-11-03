import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getNotFound } from "@/data/siteData";

export default async function NotFound() {
  const notFound = await getNotFound();

  return (
    <section className="grid min-h-[60vh] place-items-center px-4 py-20 text-center">
      <div>
        <p className="font-[family-name:Playfair_Display,Georgia,serif] text-7xl font-extrabold text-[#b4841f] sm:text-8xl">
          {notFound.code}
        </p>
        <h1 className="mt-4 font-[family-name:Playfair_Display,Georgia,serif] text-3xl font-extrabold text-[#0c2250] sm:text-4xl">
          {notFound.title}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-[#666d82]">
          {notFound.text}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={notFound.homeButton.href}>{notFound.homeButton.label}</ButtonLink>
          <Link href={notFound.contactLink.href} className="text-[15px] font-semibold text-[#0c2250] underline-offset-4 hover:underline">
            {notFound.contactLink.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
