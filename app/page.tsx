import type { Metadata } from "next";
import {
  getContactPage,
  getFaq,
  getHome,
  getServices,
  getSite,
  getSteps,
  getTestimonials,
  getVisaSections,
  getWhyChooseUs,
} from "@/data/siteData";
import { Hero } from "@/components/luxe/Hero";
import { About } from "@/components/luxe/About";
import { ServicesBento } from "@/components/luxe/ServicesBento";
import { ProcessTimeline } from "@/components/luxe/ProcessTimeline";
import { VisaAccordion } from "@/components/luxe/VisaAccordion";
import { Stats } from "@/components/luxe/Stats";
import { Testimonials } from "@/components/luxe/Testimonials";
import { WhyChooseUs } from "@/components/luxe/WhyChooseUs";
import { Faq } from "@/components/luxe/Faq";
import { CtaBand } from "@/components/luxe/CtaBand";
import { ContactBand } from "@/components/luxe/ContactBand";

export const metadata: Metadata = {
  title: { absolute: "Diplomatica Embassies | Embassy, Visa & Immigration Experts" },
};

export default async function SinglePage() {
  const [home, services, steps, testimonials, visaSections, whyChooseUs, faq, site, contactPage] =
    await Promise.all([
      getHome(),
      getServices(),
      getSteps(),
      getTestimonials(),
      getVisaSections(),
      getWhyChooseUs(),
      getFaq(),
      getSite(),
      getContactPage(),
    ]);

  return (
    <>
      {/* Home section without scroll-margin to prevent reload vertical shift */}
      <div id="home" className="scroll-mt-0">
        <Hero data={home.hero} />
      </div>

      <div id="about" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <About data={home.about} />
      </div>

      {/* Standalone Stats counter band with balanced top margin matching the bottom space */}
      <div id="stats" className="scroll-mt-[72px] mt-8 sm:mt-10 lg:mt-10 lg:scroll-mt-[88px]">
        <Stats />
      </div>

      {/* Diplomatica Services section */}
      <div id="services" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <ServicesBento intro={home.services} counselling={services.counselling} />
      </div>

      {/* Standalone Process Timeline section */}
      <div id="process" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <ProcessTimeline intro={home.process} steps={steps} />
      </div>

      <div id="visa" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <VisaAccordion sections={visaSections} />
      </div>

      <div id="testimonials" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <Testimonials intro={home.testimonials} items={testimonials} />
      </div>

      <div id="why-choose-us" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <WhyChooseUs data={whyChooseUs} />
      </div>

      <div id="faq" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <Faq data={faq} contact={site.contact} />
      </div>

      <CtaBand data={home.cta} contact={site.contact} />

      <div id="contact" className="scroll-mt-[72px] lg:scroll-mt-[88px]">
        <ContactBand contact={site.contact} form={contactPage.form} />
      </div>
    </>
  );
}
