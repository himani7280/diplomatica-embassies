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
