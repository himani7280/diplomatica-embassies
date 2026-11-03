# Diplomatica Embassies - Immigration & Visa Consultancy

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion, with a JSON file "database".

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Node 18.18+ is required.

## Pages (same names as the original HTML theme)

| Original file           | Route               | Source                                  |
| ----------------------- | ------------------- | --------------------------------------- |
| `home.html`             | `/` and `/home`     | `src/app/page.tsx`                      |
| `about.html`            | `/about`            | `src/app/about/page.tsx`                |
| `services.html`         | `/services`         | `src/app/services/page.tsx`             |
| `services-details.html` | `/services-details` | `src/app/services-details/page.tsx`     |
| `visa-passport.html`    | `/visa-passport`    | `src/app/visa-passport/page.tsx`        |
| `blog.html`             | `/blog`             | `src/app/blog/page.tsx`                 |
| `blog-details.html`     | `/blog-details?slug=...` | `src/app/blog-details/page.tsx`    |
| `contact.html`          | `/contact`          | `src/app/contact/page.tsx`              |

Images live in `public/img/` (`logo.png`, `logo-w.png`, ... exactly like the original `img/` folder).

## Folder structure

```
diplomatica-embassy/
├─ db/                     JSON database (edit content here)
│  ├─ site.json            brand, menu, contact details, footer links, social
│  ├─ home.json            hero / about / section headings / CTA copy
│  ├─ services.json        home service list + counselling cards
│  ├─ service-detail.json  services-details page content
│  ├─ steps.json           "4 simple steps"
│  ├─ testimonials.json    client stories (slider)
│  ├─ visa.json            visa & passport sections
│  ├─ news.json            blog posts (slug, sections, images)
│  └─ contacts.json        contact-form submissions (written by the API)
├─ public/img/             logo, logo-w, banner and all photos
└─ src/
   ├─ app/                 routes, layout, template, API routes
   │  └─ api/contact       POST - validates and saves to db/contacts.json
   │  └─ api/news          GET  - list or ?slug=
   ├─ components/
   │  ├─ layout/           Header, Footer, PageBanner
   │  ├─ sections/         Hero, AboutSection, HomeServices, ProcessSteps, Testimonials, CtaSection, ...
   │  ├─ motion/           Reveal, Stagger, Float, CountUp, ArrowLine, Providers
   │  └─ ui/               ButtonLink, SectionHeading, Icon, PlaneTrail, SocialIcons
   ├─ lib/db.ts            typed JSON DB helpers (getHome, getNews, addContact ...)
   └─ types/index.ts       TypeScript types for every collection
```

## Editing content

* Change any text, link, image path or post in `db/*.json` - no code change needed.
* Add a news post: append an object to `db/news.json` (use a unique `slug`), it appears on `/blog`, in the sidebar and in the sitemap automatically.
* Colours & fonts: `tailwind.config.ts` (`navy`, `brand`, `slate2`, `mute`; fonts Manrope + Inter via `@fontsource`).

## Contact form & the JSON DB

Submissions are appended to `db/contacts.json`. This works on a normal Node server / VPS / `npm start`.
Serverless hosts (e.g. Vercel) have a read-only filesystem, so for those replace the two functions in
`src/lib/db.ts` (`read` / `write`) with MongoDB, Supabase, Prisma, etc. - the pages do not need to change.

## Animations

Framer Motion powers scroll reveals, staggered lists, the floating hero collage, the animated nav underline,
the scroll-progress bar, page transitions, the count-up number and the testimonial slider.
Everything respects the visitor's "reduce motion" setting. The layout is responsive from mobile to large desktop.
