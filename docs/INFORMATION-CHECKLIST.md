# Information checklist

Nothing on the site has been invented. Where information was missing, the site shows a labelled placeholder, hides the section, or uses clearly marked demonstration content. This list is what is needed to complete it.

## A. Needed before launch

| # | Item | Where it goes | Shown now as |
| --- | --- | --- | --- |
| 1 | Domain name | `NEXT_PUBLIC_SITE_URL` | `localhost` |
| 2 | Business email address | `NEXT_PUBLIC_CONTACT_EMAIL` | "Business email to be added" |
| 3 | Inbox for enquiry notifications | `ENQUIRY_NOTIFY_EMAIL` | Emails not sent |
| 4 | WhatsApp business number with country code | `NEXT_PUBLIC_WHATSAPP_NUMBER` | "WhatsApp number to be added" |
| 5 | Office address | `NEXT_PUBLIC_OFFICE_ADDRESS` | "Office address to be added" |
| 6 | Google Maps embed link | `NEXT_PUBLIC_MAPS_EMBED_URL` | Map placeholder |
| 7 | Supabase, Anthropic, Resend and Vercel accounts | See `docs/DEPLOYMENT.md` | Form and chatbot report "not configured" |
| 8 | Registered legal entity name and address | Privacy policy and terms pages | "NOORLUME Energy & Engineering" |
| 9 | Legal review of privacy policy and terms | `app/(site)/privacy`, `app/(site)/terms` | Template text |
| 10 | Confirmation that every listed service is actually offered | `lib/services.ts`, `lib/content.ts`, `content/knowledge-base.md` | All services from the brief are listed. Remove any you do not offer. |
| 11 | Trademark and name clearance for "NOORLUME" in your markets | n/a | Not checked |

## B. Needed soon after launch

| # | Item | Where it goes | Shown now as |
| --- | --- | --- | --- |
| 12 | Instagram account and handle | `NEXT_PUBLIC_INSTAGRAM_URL` | "Instagram link to be added" |
| 13 | LinkedIn company page | `NEXT_PUBLIC_LINKEDIN_URL` | "LinkedIn link to be added" |
| 14 | Real projects: name, location, capacity, scope, highlights, status, images, and written client permission where a client is named | `lib/content.ts` → `projects` (set `demo: false`) | Six entries labelled "Demonstration content", hidden from search engines |
| 15 | Licensed photography: utility-scale plant, rooftop, carport, substation, commercial building, plant room, HVAC, drawings | Replace `Art` components or add to project pages | Original engineering line art |
| 16 | Company history and year established | `lib/site.ts` → `company.history` | Section hidden |
| 17 | Team members: name, role, short biography, qualifications | `lib/site.ts` → `company.team` | Section hidden |
| 18 | Registrations, memberships, certifications (with evidence) | `lib/site.ts` → `company.credentials` | Section hidden |
| 19 | Genuine client testimonials with permission to publish | `lib/site.ts` → `testimonials` | Section hidden |
| 20 | Business card and email signature details | `scripts/build_brand.py`, `public/brand/email-signature.html` | Bracketed fields |

## C. Statements to confirm

The site makes a small number of statements about how NOORLUME works. Please confirm each is accurate, or tell me what to change:

- "We do not sell equipment" and "We are engineers, not installers" (home, about)
- Deliverables are issued against an agreed deliverables list with tracked revisions and comment resolution sheets (home, about)
- Each assignment starts with a written design basis (about)
- Clients speak directly with the engineers doing the work (home)
- PVsyst is used for energy yield assessment (service page, knowledge base)
- Regions served: India, the Middle East, GCC countries and international markets

## D. Decisions for you

- **Chatbot model.** Default is `claude-haiku-5-5` (fast, low cost). A larger model gives more nuanced answers at higher cost per conversation.
- **Analytics.** None installed. Decide whether you want privacy-friendly analytics; cookie-based tools need a consent banner.
- **Knowledge Centre articles.** Five starter articles are included. Please review them technically before launch, since they will be published under the NOORLUME name.
