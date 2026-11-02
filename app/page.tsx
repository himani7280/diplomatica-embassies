import type { Metadata } from "next";
import {
  getHome,
  getNews,
  getServices,
  getSite,
  getSteps,
  getTestimonials,
  getVisaSections,
} from "@/data/siteData";
import { Hero } from "@/components/luxe/Hero";
import { About } from "@/components/luxe/About";
import { ServicesBento } from "@/components/luxe/ServicesBento";
import { ProcessTimeline } from "@/components/luxe/ProcessTimeline";
import { VisaAccordion } from "@/components/luxe/VisaAccordion";
import { Stats } from "@/components/luxe/Stats";
import { Testimonials } from "@/components/luxe/Testimonials";
import { NewsMagazine } from "@/components/luxe/NewsMagazine";
import { CtaBand } from "@/components/luxe/CtaBand";
import { ContactBand } from "@/components/luxe/ContactBand";

export const metadata: Metadata = {
  title: { absolute: "Diplomatica Embassies | Embassy, Visa & Immigration Experts" },
};

export default async function SinglePage() {
  const [home, services, steps, testimonials, visaSections, news, site] = await Promise.all([
    getHome(),
    getServices(),
    getSteps(),
    getTestimonials(),
    getVisaSections(),
    getNews(),
    getSite(),
  ]);

  return (
    <>
      <div id="home" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <Hero data={home.hero} />
      </div>

      <div id="about" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <About data={home.about} />
        <Stats />
      </div>

      <div id="services" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <ServicesBento intro={home.services} counselling={services.counselling} />
        <ProcessTimeline intro={home.process} steps={steps} />
      </div>

      <div id="visa" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <VisaAccordion sections={visaSections} />
        <Testimonials intro={home.testimonials} items={testimonials} />
      </div>

      <div id="news" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <NewsMagazine posts={news} />
      </div>

      <CtaBand data={home.cta} contact={site.contact} />

      <div id="contact" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <ContactBand contact={site.contact} />
      </div>
    </>
  );
}
