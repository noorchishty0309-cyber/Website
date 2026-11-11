# NOORLUME Energy & Engineering: website and brand platform

Illuminating Innovation. Engineering Tomorrow.

This repository contains the complete NOORLUME digital platform:

- A responsive company website (Next.js, React, TypeScript, Tailwind CSS)
- A working enquiry backend (Supabase database, Resend email notifications)
- The NOORLUME Engineering Assistant, an AI chatbot on the Anthropic Claude API
- A secure lead management dashboard for administrators
- The brand identity: logo suite, stationery and engineering illustrations
- The Instagram launch kit and a LinkedIn plan

## Current status

| Item | Status |
| --- | --- |
| Source code, production build, automated tests | Complete and passing (see `docs/TEST-REPORT.md`) |
| Deployment to a live domain | **Not done.** Needs your Vercel, Supabase, Anthropic and Resend accounts. Follow `docs/DEPLOYMENT.md`. |
| Enquiry form, chatbot, dashboard | Fully implemented. They activate when the environment variables are set. Until then they report "not configured" rather than pretending to work. |
| Instagram and LinkedIn pages | Content and graphics prepared. **Accounts not created, nothing published, handle availability not checked.** |
| Company details, projects, photographs | Placeholders. See `docs/INFORMATION-CHECKLIST.md`. |

## Quick start

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env.local     # fill in what you have; every key is optional for local preview
npm run dev                    # http://localhost:3000
```

Other commands:

```bash
npm run build       # production build
npm start           # serve the production build
npm run typecheck   # TypeScript check
npm run brand       # regenerate logos, illustrations and Instagram graphics
```

## Folder structure

```
app/
  layout.tsx, globals.css        Root layout, fonts, global styles, default SEO metadata
  (site)/                        Public website (shares header, footer and chatbot)
    page.tsx                     Home
    about/                       About us
    renewable-energy/            Service index + [slug] detail page for each of 20 services
    mep/                         MEP engineering
    industries/                  Industries we serve
    projects/                    Portfolio with filtering + [slug] detail pages
    insights/                    Knowledge Centre with search + [slug] article pages
    contact/                     Enquiry form and contact details
    privacy/, terms/             Legal pages
  admin/                         Lead dashboard, login, server actions (protected)
  api/enquiry/route.ts           Contact form endpoint
  api/chat/route.ts              Chatbot endpoint (Claude API, server side only)
  sitemap.ts, robots.ts          Generated sitemap.xml and robots.txt
components/                      Header, Footer, EnquiryForm, ChatWidget, filters, shared UI
content/
  knowledge-base.md              Approved facts the chatbot may use (edit freely)
  insights/*.md                  Knowledge Centre articles (one Markdown file each)
lib/
  site.ts                        Company details, navigation, testimonials, form options
  services.ts                    The 20 renewable energy services
  content.ts                     MEP categories, industries, projects
  leads.ts                       Lead storage and email notification (server only)
  chat/prompt.ts                 Chatbot system prompt and knowledge retrieval
  validation.ts, rate-limit.ts   Input schemas and request throttling
  supabase/server.ts             Administrator session client
middleware.ts                    Guards /admin
supabase/schema.sql              Database tables and Row Level Security policies
public/brand/                    Logos, favicon, business card, email signature, cover
public/illustrations/            Engineering line art used across the site
instagram/                       Profile image, highlights, posts, templates, playbook
scripts/build_brand.py           Generates every brand and social graphic
tests/                           Automated smoke tests
docs/                            Deployment, admin, brand, checklist and test documentation
```

## Editing content

| To change | Edit |
| --- | --- |
| Email, WhatsApp, address, map, social links, site URL | Environment variables (`.env.example` lists them) |
| Company history, team, credentials, testimonials | `lib/site.ts` (sections appear automatically when filled) |
| Add or remove a solar service | `lib/services.ts` (page, card and sitemap entry are generated) |
| MEP services, industries | `lib/content.ts` |
| Replace demonstration projects with real ones | `lib/content.ts` → `projects`, set `demo: false` |
| Publish an article | Add a `.md` file to `content/insights/` with the same front matter as the existing ones |
| What the chatbot knows | `content/knowledge-base.md` |
| How the chatbot behaves | `lib/chat/prompt.ts` |
| Legal text | `app/(site)/privacy/page.tsx`, `app/(site)/terms/page.tsx` |
| Colours and fonts | `tailwind.config.ts`, `app/globals.css` |

## How the main features work

**Enquiry form.** The browser validates, then posts JSON to `/api/enquiry`. The server validates again with Zod, applies a honeypot, a time trap and a per-IP rate limit, stores the lead in Supabase with the service role key, and emails the team through Resend. If neither storage nor email is configured it returns an error, and the visitor is told the message was not sent.

**Chatbot.** The widget keeps the conversation in the browser's session storage and posts it to `/api/chat`. The server builds a system prompt from `content/knowledge-base.md`, calls the Claude API and returns the reply. The API key exists only on the server. The model has one tool, `save_lead`, which the server will execute only when the model confirms the visitor's consent and supplies a name plus an email or phone number. A saved lead appears in the dashboard marked "Chatbot", and "Follow-up requested" when the visitor asks for a person.

**Dashboard.** `/admin` is protected by Supabase Auth. Row Level Security allows reading and updating leads only for users listed in the `admins` table, so access is enforced by the database as well as by the application.

**SEO.** Per-page titles, descriptions and canonical URLs, Open Graph image, JSON-LD (`ProfessionalService`, `Service`, `Article`), generated `sitemap.xml` and `robots.txt`, one `h1` per page, alt text on all images. Demonstration projects are marked `noindex` and left out of the sitemap.

## Imagery

The site uses original engineering line art in place of photographs, because no licensed photography was available when it was built. Each `Art` component (`components/ui.tsx`) can be swapped for an optimised photo once you have images you are licensed to use. See the checklist.

## Documentation

- `docs/DEPLOYMENT.md`: accounts, environment variables, deployment and domain connection
- `docs/ADMIN.md`: administrator guide
- `docs/BRAND-GUIDELINES.md`: logo, colour, typography and voice
- `docs/INFORMATION-CHECKLIST.md`: information still needed from you
- `docs/TEST-REPORT.md`: what was tested and what remains to be tested live
- `docs/LINKEDIN-PLAN.md`: LinkedIn company page plan
- `instagram/INSTAGRAM-PLAYBOOK.md`: Instagram profile, posts, reels and calendar
