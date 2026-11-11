# Test report

Date: 11 November 2026 · Environment: Node.js 22, Next.js 15.5 production build, Google Chrome (headless) driven by Playwright.

## Summary

| Check | Result |
| --- | --- |
| TypeScript (`tsc --noEmit`, strict) | Pass, 0 errors |
| Production build (`next build`) | Pass, 49 pages generated |
| Dependency audit (`npm audit --omit=dev`) | 0 known vulnerabilities |
| Automated smoke suite, no service keys | 48 of 48 passed |
| Automated smoke suite, mocked Supabase and Claude API | 58 of 58 passed |
| Secrets in client bundle | None found (searched `.next/static` for key names) |
| Live deployment, real Supabase, real Claude API, real Resend | **Not tested.** No accounts or keys were available. |

The last row matters: the application logic is verified, but the first real enquiry, chatbot conversation and email must be checked by you after deployment using the go-live list in `docs/DEPLOYMENT.md`.

## What the suite covers

Run with `tests/smoke.mjs` against a production build.

**Site structure and SEO**

- Crawls every internal link from the home page: 41 pages, all resolve
- Every public page has exactly one `h1`, a meta description, a canonical link and alt text on every image
- `sitemap.xml`, `robots.txt`, Open Graph image, favicon and brand assets are served
- Sitemap includes service pages and excludes demonstration projects
- Unknown addresses return 404
- JSON-LD organisation schema is present; security headers are set

**Enquiry API**

- Invalid input is rejected with per-field messages (422); malformed JSON is rejected (400)
- Honeypot submissions are dropped without being stored
- Rate limit returns 429 with `Retry-After` after five submissions in ten minutes
- With no services configured, a valid submission returns 503 and the visitor is told it was not sent
- With the mock database, a valid submission is stored with the expected fields and consent flag

**Chatbot API**

- With no API key, returns 503 and the widget shows an "unavailable" notice with a link to the contact page
- With the mock model: returns a reply; rejects invalid requests; executes the `save_lead` tool only with consent; stores the lead with consent, session reference and contact details; includes the knowledge base in the system prompt; rate limit returns 429

**Administrator area**

- Without Supabase keys, `/admin` shows a "not configured" notice
- With keys, a signed-out visitor to `/admin` is redirected to the login page
- Wrong credentials are rejected with a message

**Browser, at 1440 px (desktop), 820 px (tablet) and 390 px (mobile)**

- No horizontal overflow on any tested page at any width
- Mobile menu opens, lists all destinations and navigates
- Project category filter and article search work
- Demonstration content is labelled
- Contact form: service is pre-selected from a service page link; empty submission is blocked with messages; a complete submission shows confirmation (mock) or an honest error (unconfigured)
- Chat widget: opens, shows the greeting, sends a message, shows the reply, and keeps the conversation across a page reload within the session
- No JavaScript console errors or page errors

## What the mocks are

`tests/mock-services.mjs` is a small local server that imitates the Supabase REST endpoint, the Supabase sign-in endpoint and the Anthropic Messages endpoint. It lets the real application code run end to end, including the tool-use loop, without external accounts. It does not prove that live credentials, database policies or email delivery are set up correctly.

## Not covered

- Real model behaviour: tone, accuracy and adherence to the "never invent credentials" rules need a manual conversation test with the live model
- Row Level Security policies in `supabase/schema.sql` (written and reviewed, not executed against a live database)
- Signed-in dashboard views and lead status updates (need a real Supabase project)
- Resend email delivery
- Safari and Firefox (tested in Chrome only)
- Screen reader testing. Semantic markup, labels, focus styles, skip link and reduced-motion support are implemented, but no assistive technology audit was run
- Load testing

## Re-running

```bash
# Unconfigured mode
npm run build && npx next start -p 3100 &
NODE_PATH=/path/to/node_modules/with/playwright node tests/smoke.mjs

# Mock mode: see the header of tests/mock-services.mjs
```

Playwright is not a project dependency. Install it separately (`npm i -D playwright`) if you want to run the browser checks locally.
