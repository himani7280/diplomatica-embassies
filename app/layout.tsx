import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSite } from "@/data/siteData";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/motion/Providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Diplomatica Embassies | Immigration & Visa Consultancy",
    template: "%s | Diplomatica Embassies",
  },
  description:
    "Expert immigration, visa and passport advisory. End-to-end embassy and consulate support for students, families and professionals.",
  icons: { icon: "/img/favicon.png" },
  openGraph: {
    title: "Diplomatica Embassies | Explore · Connect · Represent",
    description:
      "From application guidance and document preparation to embassy support, we provide end-to-end assistance with clarity, care and expertise.",
    type: "website",
    images: ["/img/hero-1.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1a3d",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();

  return (
    <html lang="en" className="scroll-smooth motion-reduce:scroll-auto" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('dp-intro-seen')||location.pathname!=='/')document.documentElement.setAttribute('data-intro-seen','1')}catch(e){}" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className={`overflow-x-hidden ${site.bodyBgClass} font-[family-name:Inter,system-ui,sans-serif] text-[15px] leading-relaxed text-[#0a1a3d] antialiased selection:bg-[#e2bd5c] selection:text-[#060f27]`}>
        <Providers>
          <div className="overflow-x-clip">
            <Header nav={site.nav} cta={site.cta} contact={site.contact} />
            <main>{children}</main>
            <Footer site={site} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
