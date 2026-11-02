import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews, getNewsBySlug, pageBanners } from "@/data/siteData";
import { PageBanner } from "@/components/layout/PageBanner";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

function currentDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type SearchParams = Promise<{ slug?: string | string[] }>;

function pickSlug(slug: string | string[] | undefined): string | undefined {
  return Array.isArray(slug) ? slug[0] : slug;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { slug } = await searchParams;
  const post = await getNewsBySlug(pickSlug(slug));
  if (!post) return { title: "News Details" };
  return {
    title: `${post.title} ${post.titleAccent}`,
    description: post.excerpt,
  };
}

export default async function BlogDetailsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { slug } = await searchParams;
  const [post, all] = await Promise.all([getNewsBySlug(pickSlug(slug)), getNews()]);
  if (!post) notFound();

  return (
    <>
      <PageBanner
        title={`${post.title} ${post.titleAccent}`}
        crumb={pageBanners.blogDetails.title}
      />

      <section className="pt-6 pb-6 mt-6 mb-6">
        <div className="mx-auto grid w-full max-w-[1320px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14 lg:px-10">
          <article>
            <Reveal>
              <time dateTime={new Date().toISOString()} className="text-[15px] text-(color:--color-mute)">
                {currentDate()}
              </time>
              <h1 className="mt-6 py-4 max-w-2xl font-(family-name:--family-title) text-[2rem] font-extrabold leading-[1.12] tracking-tight text-(color:--color-navy) sm:text-4xl lg:text-[2.9rem]">
                {post.title}
                <br />
                <span className="text-(color:--color-brand)">{post.titleAccent}</span>
              </h1>
              <p className="mt-5 max-w-[760px] text-base leading-8 text-(color:--color-mute)">{post.excerpt}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <div className="relative aspect-[825/563] overflow-hidden rounded-md shadow-(--shadow-soft)">
                <Image
                  src={post.cover}
                  alt={`${post.title} ${post.titleAccent}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="mt-10 space-y-8">
              {post.sections.map((s) => (
                <Reveal key={s.heading}>
                  {s.image ? (
                    <div className="relative mb-8 aspect-[825/342] overflow-hidden rounded-md shadow-(--shadow-card)">
                      <Image
                        src={s.image}
                        alt={s.imageAlt ?? ""}
                        fill
                        sizes="(min-width: 1024px) 760px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <h2 className="flex items-center gap-3 font-(family-name:--family-title) text-2xl font-bold text-(color:--color-navy)">
                    <span className="h-[3px] w-7 shrink-0 bg-(color:--color-brand)" />
                    {s.heading}
                  </h2>
                  <p className="mt-6 text-base leading-8 text-(color:--color-mute)">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="left">
              <span className="block h-[3px] w-7 bg-(color:--color-brand)" />
              <h2 className="mt-6 font-(family-name:--family-title) text-3xl font-extrabold text-(color:--color-navy)">
                Recent <span className="text-(color:--color-brand)">News</span>
              </h2>
            </Reveal>

            <Stagger className="mt-6 divide-y divide-(color:--color-navy)/10" stagger={0.1}>
              {all.map((p) => (
                <StaggerItem key={p.id}>
                  <Link
                    href={`/news-events-details?slug=${p.slug}`}
                    className="group flex items-center gap-4 py-4 first:pt-0"
                  >
                    <span className="relative block h-[88px] w-[104px] shrink-0 overflow-hidden rounded-md shadow-(--shadow-card)">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="104px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </span>
                    <span>
                      <time dateTime={new Date().toISOString()} className="block text-[13px] text-(color:--color-mute)">
                        {currentDate()}
                      </time>
                      <span
                        className={
                          p.id === post.id
                            ? "mt-1 block font-(family-name:--family-title) text-[1.02rem] font-bold leading-snug text-(color:--color-brand)"
                            : "mt-1 block font-(family-name:--family-title) text-[1.02rem] font-bold leading-snug text-(color:--color-navy) transition-colors group-hover:text-(color:--color-brand)"
                        }
                      >
                        {p.title} {p.titleAccent}
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </aside>
        </div>
      </section>
    </>
  );
}



