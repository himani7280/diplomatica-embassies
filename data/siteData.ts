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
    pillars: { title: string; text: string }[];
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

const { Meridian } = rawData;
const { sections } = Meridian;
const chrome = sections.SiteChrome.variants;
const heroes = sections.Hero.variants;

export const pageBanners: Record<PageBannerKey, PageBanner> = {
  about: heroes.MeridianAboutHero1,
  services: heroes.MeridianServicesHero1,
  servicesDetails: heroes.MeridianServicesDetailHero1,
  visaPassport: heroes.MeridianVisaHero1,
  blog: heroes.MeridianBlogHero1,
  blogDetails: heroes.MeridianBlogDetailHero1,
  contact: heroes.MeridianContactHero1,
  privacyPolicy: heroes.MeridianPrivacyHero1,
  terms: heroes.MeridianTermsHero1,
};

export const legalPages: { privacy: LegalContent; terms: LegalContent } = {
  privacy: sections.Legal.variants.MeridianPrivacy1,
  terms: sections.Legal.variants.MeridianTerms1,
};

/* Single page: every top-level page now lives as a section of "/". */
const sectionAnchors: Record<string, string> = {
  "/": "/#home",
  "/home": "/#home",
  "/about": "/#about",
  "/services": "/#services",
  "/visa-passport": "/#visa",
  "/news-events": "/#news",
  "/contact": "/#contact",
  "/privacy-policy": "/#privacy",
  "/terms": "/#terms",
};

const toAnchor = (link: NavLink): NavLink => ({
  ...link,
  href: sectionAnchors[link.href] ?? link.href,
});

export const getSite = async (): Promise<SiteData> => ({
  brand: chrome.MeridianHeader1.brand,
  bodyBgClass: (rawData as unknown as { theme?: { bodyBgClass?: string } }).theme?.bodyBgClass ?? "bg-[#e5dac9]",
  nav: chrome.MeridianHeader1.nav.map(toAnchor),
  cta: toAnchor(chrome.MeridianHeader1.cta),
  quickLinks: chrome.MeridianFooter1.quickLinks.map(toAnchor),
  contact: chrome.MeridianFooter1.contact,
  social: chrome.MeridianFooter1.social as SiteData["social"],
  legal: chrome.MeridianFooter1.legal.map(toAnchor),
});

export const getHome = async (): Promise<HomeData> => ({
  hero: {
    ...heroes.MeridianHomeHero1,
    button: toAnchor(heroes.MeridianHomeHero1.button),
    secondaryButton: toAnchor(heroes.MeridianHomeHero1.secondaryButton),
  },
  about: sections.About.variants.MeridianAbout1,
  services: {
    ...sections.Services.variants.MeridianHomeServices1,
    button: toAnchor(sections.Services.variants.MeridianHomeServices1.button),
  },
  process: sections.Process.variants.MeridianProcess1.section,
  testimonials: sections.Testimonials.variants.MeridianTestimonials1.section,
  cta: sections.Cta.variants.MeridianCta1,
});

export const getServices = async (): Promise<ServicesData> =>
  sections.ServicesPage.variants.MeridianServicesPage1 as ServicesData;

export const getSteps = async (): Promise<ProcessStep[]> =>
  sections.Process.variants.MeridianProcess1.steps;

export const getTestimonials = async (): Promise<Testimonial[]> =>
  sections.Testimonials.variants.MeridianTestimonials1.items;

export const getServiceDetail = async (): Promise<ServiceDetailData> =>
  sections.ServiceDetail.variants.MeridianServiceDetail1 as ServiceDetailData;

export const getVisaSections = async (): Promise<VisaSection[]> =>
  sections.VisaPassport.variants.MeridianVisaPassport1.sections as VisaSection[];

export const getNews = async (): Promise<NewsPost[]> =>
  sections.News.variants.MeridianNews1.posts;

export const getNewsBySlug = async (slug?: string): Promise<NewsPost | undefined> =>
  (await getNews()).find((post) => post.slug === slug);
