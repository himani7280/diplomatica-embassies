import rawData from "./siteData.json";

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteData {
  brand: { name: string; tagline: string };
  bodyBgClass: string;
  nav: NavLink[];
  cta: NavLink;
  quickLinks: NavLink[];
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    address: string;
    officeAddress: string;
    mapLink: string;
    mapEmbed: string;
    replyTime: string;
    ctaPhone: string;
    ctaPhoneHref: string;
  };
  social: { name: "Facebook" | "Instagram" | "LinkedIn"; href: string }[];
  legal: NavLink[];
  copyright?: {
    allRightsReserved: string;
    poweredByText: string;
    poweredByCompany: string;
    poweredByUrl: string;
  };
}

export interface HomeData {
  hero: {
    titleLine1: string;
    titleAccent: string;
    eyebrow: string;
    text: string;
    button: NavLink;
    secondaryButton: NavLink;
    highlights: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    titleLine2: string;
    titleAccent: string;
    text: string;
    statValue: number;
    statSuffix: string;
    statLabel: string;
    pillars: { title: string; text: string; icon?: string }[];
    missionVision?: {
      bgImage: string;
      mission: { title: string; text: string };
      vision: { title: string; text: string };
    };
    mission?: { title: string; text: string; image?: string };
    vision?: { title: string; text: string; image?: string };
  };
  services: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    text: string;
    button: NavLink;
  };
  process: { eyebrow: string; title: string; titleAccent: string };
  testimonials: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    text: string;
  };
  cta: {
    watermark: string;
    titleLine1: string;
    titleAccent: string;
    titleEnd: string;
    text: string;
    label: string;
  };
}

export type IconName =
  | "graduation"
  | "file-user"
  | "file-check"
  | "signpost"
  | "users"
  | "globe"
  | "clipboard-user"
  | "clipboard-list"
  | "home"
  | "building"
  | "headset"
  | "trending-up"
  | "message"
  | "calendar";

export interface HighlightService {
  id: number;
  icon: IconName;
  title: string;
  text: string;
  href: string;
}

export interface CounsellingItem extends HighlightService {
  image: string;
  side: "left" | "right";
}

export interface ServicesData {
  highlights: HighlightService[];
  counselling: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    text: string;
    items: CounsellingItem[];
  };
}

export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  text: string;
  image: string;
  alt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface ServiceDetailData {
  about: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    text: string;
    image: string;
    features: { icon: IconName; label: string }[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    text: string;
    items: { icon: IconName; title: string; text: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    steps: { number: string; icon: IconName; title: string; text: string }[];
  };
  audience: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    text: string;
    image: string;
    points: string[];
  };
  cta: {
    eyebrow: string;
    title: string;
    titleLine2: string;
    titleAccent: string;
    text: string;
    image: string;
    button: NavLink;
  };
}

export interface VisaSection {
  id: number;
  eyebrow: string;
  title: string;
  titleLine2?: string;
  titleAccent: string;
  titleEnd?: string;
  text: string;
  image: string;
  alt: string;
  imageSide: "left" | "right";
  tone: "white" | "tint";
}

export interface NewsSection {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface NewsPost {
  id: number;
  slug: string;
  date: string;
  title: string;
  titleAccent: string;
  excerpt: string;
  category?: string;
  image: string;
  cover: string;
  sections: NewsSection[];
}

export interface ContactSubmission {
  id: string;
}

export interface WhyChooseUsItem {
  id: number;
  icon: string;
  number: string;
  title: string;
  text: string;
  badge: string;
}

export interface WhyChooseUsColumn {
  id: number;
  title: string;
  tagline: string;
  button: NavLink;
  image: string;
  alt: string;
}

export interface WhyChooseUsStat {
  value: string;
  label: string;
}

export interface WhyChooseUsData {
  eyebrow: string;
  titleLarge?: string;
  titleSub?: string;
  title?: string;
  titleAccent?: string;
  tagline?: string;
  text?: string;
  columns?: WhyChooseUsColumn[];
  items?: WhyChooseUsItem[];
  stats?: WhyChooseUsStat[];
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqData {
  eyebrow: string;
  title: string;
  titleAccent: string;
  text: string;
  bgImage?: string;
  topicLabel?: string;
  sparkle?: string;
  qBadge?: string;
  aBadge?: string;
  items: FaqItem[];
}

export interface LegalContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

export type PageBanner = { title: string };

export type PageBannerKey =
  | "about"
  | "services"
  | "servicesDetails"
  | "visaPassport"
  | "blog"
  | "blogDetails"
  | "contact"
  | "privacyPolicy"
  | "terms";

/* ---------- JSON-backed content ---------- */

const { Diplomatica } = rawData;
const { sections } = Diplomatica;
const chrome = sections.SiteChrome.variants;
const heroes = sections.Hero.variants;

export const pageBanners: Record<PageBannerKey, PageBanner> = {
  about: heroes.DiplomaticaAboutHero1,
  services: heroes.DiplomaticaServicesHero1,
  servicesDetails: heroes.DiplomaticaServicesDetailHero1,
  visaPassport: heroes.DiplomaticaVisaHero1,
  blog: heroes.DiplomaticaBlogHero1,
  blogDetails: heroes.DiplomaticaBlogDetailHero1,
  contact: heroes.DiplomaticaContactHero1,
  privacyPolicy: heroes.DiplomaticaPrivacyHero1,
  terms: heroes.DiplomaticaTermsHero1,
};

export const legalPages: { privacy: LegalContent; terms: LegalContent } = {
  privacy: sections.Legal.variants.DiplomaticaPrivacy1,
  terms: sections.Legal.variants.DiplomaticaTerms1,
};

/* Single page: every top-level page now lives as a section of "/". */
const sectionAnchors: Record<string, string> = {
  "/": "/#home",
  "/home": "/#home",
  "/about": "/#about",
  "/services": "/#services",
  "/visa-passport": "/#visa",
  "/why-choose-us": "/#why-choose-us",
  "/faq": "/#faq",
  "/news-events": "/#faq",
  "/contact": "/#contact",
  "/privacy-policy": "/#privacy",
  "/terms": "/#terms",
};

const toAnchor = (link: NavLink): NavLink => ({
  ...link,
  href: sectionAnchors[link.href] ?? link.href,
});

export const getSite = async (): Promise<SiteData> => ({
  brand: chrome.DiplomaticaHeader1.brand,
  bodyBgClass: (rawData as unknown as { theme?: { bodyBgClass?: string } }).theme?.bodyBgClass ?? "bg-[#e5dac9]",
  nav: chrome.DiplomaticaHeader1.nav.map(toAnchor),
  cta: toAnchor(chrome.DiplomaticaHeader1.cta),
  quickLinks: chrome.DiplomaticaFooter1.quickLinks.map(toAnchor),
  contact: chrome.DiplomaticaFooter1.contact,
  social: chrome.DiplomaticaFooter1.social as SiteData["social"],
  legal: chrome.DiplomaticaFooter1.legal.map(toAnchor),
  copyright: (chrome.DiplomaticaFooter1 as { copyright?: SiteData["copyright"] }).copyright ?? {
    allRightsReserved: "All Rights Reserved.",
    poweredByText: "Powered by",
    poweredByCompany: "Lestow",
    poweredByUrl: "https://lestow.com",
  },
});

export const getHome = async (): Promise<HomeData> => ({
  hero: {
    ...heroes.DiplomaticaHomeHero1,
    button: toAnchor(heroes.DiplomaticaHomeHero1.button),
    secondaryButton: toAnchor(heroes.DiplomaticaHomeHero1.secondaryButton),
  },
  about: sections.About.variants.DiplomaticaAbout1,
  services: {
    ...sections.Services.variants.DiplomaticaHomeServices1,
    button: toAnchor(sections.Services.variants.DiplomaticaHomeServices1.button),
  },
  process: sections.Process.variants.DiplomaticaProcess1.section,
  testimonials: sections.Testimonials.variants.DiplomaticaTestimonials1.section,
  cta: sections.Cta.variants.DiplomaticaCta1,
});

export const getServices = async (): Promise<ServicesData> =>
  sections.ServicesPage.variants.DiplomaticaServicesPage1 as ServicesData;

export const getSteps = async (): Promise<ProcessStep[]> =>
  sections.Process.variants.DiplomaticaProcess1.steps;

export const getTestimonials = async (): Promise<Testimonial[]> =>
  sections.Testimonials.variants.DiplomaticaTestimonials1.items;

export const getServiceDetail = async (): Promise<ServiceDetailData> =>
  sections.ServiceDetail.variants.DiplomaticaServiceDetail1 as ServiceDetailData;

export const getVisaSections = async (): Promise<VisaSection[]> =>
  sections.VisaPassport.variants.DiplomaticaVisaPassport1.sections as VisaSection[];

export const getWhyChooseUs = async (): Promise<WhyChooseUsData> =>
  sections.WhyChooseUs.variants.DiplomaticaWhyChooseUs1 as WhyChooseUsData;

export const getFaq = async (): Promise<FaqData> =>
  sections.Faq.variants.DiplomaticaFaq1 as FaqData;

export const getNews = async (): Promise<NewsPost[]> =>
  sections.News.variants.DiplomaticaNews1.posts;

export const getNewsBySlug = async (slug?: string): Promise<NewsPost | undefined> =>
  (await getNews()).find((post) => post.slug === slug);

export interface NotFoundData {
  code: string;
  title: string;
  text: string;
  homeButton: NavLink;
  contactLink: NavLink;
}

export const getNotFound = async (): Promise<NotFoundData> =>
  ((rawData as unknown as { notFound?: NotFoundData }).notFound ?? {
    code: "404",
    title: "This page took a different flight",
    text: "The page you are looking for does not exist or has moved. Let us get you back on track.",
    homeButton: { label: "Back to Home", href: "/#home" },
    contactLink: { label: "Contact our team", href: "/#contact" },
  });

export interface ContactFormData {
  eyebrow: string;
  title: string;
  titleAccent: string;
  placeholders: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
  buttons: {
    submit: string;
    submitting: string;
  };
  errors: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
  success: {
    title: string;
    text: string;
  };
}

export interface ContactPageData {
  info: SiteData["contact"];
  form: ContactFormData;
}

export const getContactPage = async (): Promise<ContactPageData> =>
  sections.ContactPage.variants.DiplomaticaContactPage1 as unknown as ContactPageData;

export const getPageBannerConfig = async () =>
  ((rawData as unknown as { pageBanner?: { homeLabel: string; homeHref: string; bgImage: string } }).pageBanner ?? {
    homeLabel: "Home",
    homeHref: "/#home",
    bgImage: "/img/banner-bg.webp",
  });

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

/** Id of the section currently crossing the reading line, or null off the single page. */
export const sectionId = (href: string): string | undefined => href.split("#")[1];

export function useActiveSection(ids: readonly string[]): string | null {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react") as typeof import("react");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { usePathname } = require("next/navigation") as typeof import("next/navigation");

  const pathname = usePathname();
  const [active, setActive] = React.useState<string | null>(null);
  const idsKey = ids.join(",");

  React.useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }

    const elements = idsKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        const first = elements.find((el) => visible.has(el.id));
        setActive((prev) => (first ? first.id : prev));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, idsKey]);

  return active;
}
