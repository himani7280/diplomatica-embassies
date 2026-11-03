import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteData } from "@/data/siteData";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { LuxHeading } from "./LuxHeading";

export function ContactBand({ contact }: { contact: SiteData["contact"] }) {
  const rows = [
    { icon: Phone, label: "Call Us", value: contact.phone, href: contact.phoneHref },
    { icon: Mail, label: "Email Us", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: "Visit Us", value: contact.officeAddress, href: contact.mapLink, external: true },
  ];

  return (
    <section className="relative bg-transparent py-8 sm:py-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal direction="left" className="flex flex-col justify-center">
            <LuxHeading eyebrow="Contact Us" title="Let Us Represent" accent="Your Journey" />
            <ul className="mt-6 divide-y divide-[#0a1a3d]/10 border-y border-[#0a1a3d]/10">
              {rows.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 py-3"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0a1a3d] text-[#f0d78c] transition-colors group-hover:bg-[#e2bd5c] group-hover:text-[#060f27]">
                      <r.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold uppercase tracking-[0.16em] text-[#b98a28]">{r.label}</span>
                      <span className="block break-words text-[14px] font-medium text-[#0a1a3d] sm:text-[15px]">{r.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="right" className="flex">
            <div className="flex w-full flex-col rounded-xl bg-[#0a1a3d] p-5 sm:p-7">
              <p className="text-[14px] font-semibold uppercase tracking-[0.2em] text-[#f0d78c]">Send Us a Message</p>
              <h3 className="mt-1 font-[family-name:Playfair_Display,Georgia,serif] text-xl font-bold text-white sm:text-2xl">
                We&rsquo;d Love to <span className="text-[#e2bd5c]">Hear from You</span>
              </h3>
              <div className="mt-4 flex-1 rounded-lg bg-[#faf7f0] p-4 sm:p-5">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Full-width Map styled with Diplomatica luxury theme colors */}
        <Reveal className="mt-8 lg:mt-10">
          <div className="relative h-[220px] w-full overflow-hidden rounded-xl border border-[#e2bd5c]/35 bg-[#060f27] shadow-[0_12px_40px_rgba(6,15,39,0.25)] sm:h-[260px] lg:h-[290px]">
            <iframe
              title="Map showing our office location"
              src={contact.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0 filter invert-[92%] hue-rotate-[185deg] contrast-[110%] brightness-[92%] saturate-[130%]"
            />
            {/* Theme color gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060f27]/40 via-transparent to-[#060f27]/20" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#e2bd5c]/25 rounded-xl" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
