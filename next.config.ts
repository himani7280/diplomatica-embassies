import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // Old multi-page URLs now point at sections of the single page.
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/visa-passport", destination: "/#visa", permanent: true },
      { source: "/news-events", destination: "/#news", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/services-details", destination: "/#services", permanent: true },
      { source: "/news-events-details", destination: "/#news", permanent: true },
      { source: "/thank-you", destination: "/", permanent: true },
      { source: "/privacy-policy", destination: "/", permanent: true },
      { source: "/terms", destination: "/", permanent: true },
    ];
  },
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
