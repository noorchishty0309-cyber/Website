# Deployment guide

The steps below take the project from this repository to a live website on your domain. Allow about an hour. Dashboards change their wording from time to time; if a menu name differs slightly, look for the nearest equivalent.

You will use five accounts: GitHub (code), Supabase (database and sign-in), Anthropic (chatbot), Resend (email) and Vercel (hosting). All have free or pay-as-you-go tiers suitable for launch.

## 1. Put the code on GitHub

```bash
cd noorlume
git init
git add .
git commit -m "NOORLUME website"
```

Create a private repository on GitHub and push to it using the commands GitHub shows. `.env.local` is ignored by git; never commit secrets.

## 2. Supabase: database and administrator sign-in

1. Create a project at supabase.com. Choose a region close to your clients and save the database password.
2. Open **SQL Editor**, paste the whole of `supabase/schema.sql` and run it. This creates the `leads` and `admins` tables and the security policies.
3. Open **Authentication > Sign In / Providers** and turn **off** "Allow new users to sign up", so nobody can self-register.
4. Open **Authentication > Users > Add user**. Enter your email and a strong password and tick auto-confirm.
5. Back in **SQL Editor**, grant that user dashboard access:

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@yourdomain.com';
   ```

6. Open **Project Settings > API** (or **API Keys**) and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon / publishable key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role / secret key → `SUPABASE_SERVICE_ROLE_KEY` (server only, keep private)

## 3. Anthropic: chatbot

1. Create an account at console.anthropic.com, add billing and create an API key.
2. Set `ANTHROPIC_API_KEY`. Optionally set `ANTHROPIC_MODEL`; the default is `claude-haiku-5-5`, a fast and economical model suited to a website assistant. Check docs.claude.com for the current model list if you want a different one.
3. In the console, set a monthly spend limit that suits your budget.

## 4. Resend: enquiry emails

1. Create an account at resend.com and add your domain under **Domains**. Add the DNS records Resend shows at your domain registrar and wait for verification.
2. Create an API key → `RESEND_API_KEY`.
3. Set `ENQUIRY_FROM_EMAIL` to an address on the verified domain, for example `NOORLUME Website <enquiries@yourdomain.com>`.
4. Set `ENQUIRY_NOTIFY_EMAIL` to the inbox that should receive enquiries. Separate several addresses with commas.

Email is optional: without it, enquiries are still stored and visible in the dashboard.

## 5. Vercel: hosting

1. Sign in at vercel.com with GitHub and choose **Add New > Project**. Import the repository. Vercel detects Next.js; leave the build settings as they are.
2. Before deploying, open **Environment Variables** and add every key from `.env.example` that you have a value for. Set `NEXT_PUBLIC_SITE_URL` to your final address, for example `https://www.yourdomain.com` (no trailing slash).
3. Deploy. Vercel gives you a preview address ending in `.vercel.app`.

`NEXT_PUBLIC_*` values are built into the site at build time. After changing any of them, redeploy.

## 6. Connect your domain

1. In Vercel, open the project, then **Settings > Domains**, and add both `yourdomain.com` and `www.yourdomain.com`. Choose which one is primary; the other will redirect.
2. Vercel displays the DNS records to create. Add exactly those at your domain registrar (GoDaddy, Namecheap, Cloudflare and so on). They are normally:
   - an **A** record for the root domain (`@`) pointing to the IP address Vercel shows
   - a **CNAME** record for `www` pointing to the hostname Vercel shows
3. Wait for DNS to propagate (minutes to a few hours). Vercel issues the HTTPS certificate automatically and marks the domain as valid.
4. Confirm `NEXT_PUBLIC_SITE_URL` matches the primary domain and redeploy, so canonical links, the sitemap and social previews use it.
5. In Supabase, open **Authentication > URL Configuration** and set **Site URL** to your domain.

## 7. Go-live checks

Run through these on the live site:

- [ ] Home page and every navigation link load on desktop and phone
- [ ] Submit the contact form with real details: the confirmation appears, the lead shows in `/admin`, the email arrives
- [ ] Open the chatbot, ask about services, then give consent, a name and an email: a "Chatbot" lead appears in `/admin`
- [ ] Ask the chatbot for something not in the knowledge base (for example years of experience): it should decline to invent an answer
- [ ] Sign in at `/admin`, change a lead status, add a note, sign out
- [ ] Visit `/admin` in a private window: you are sent to the login page
- [ ] `https://yourdomain.com/sitemap.xml` and `/robots.txt` show your domain
- [ ] WhatsApp button on the contact page opens a chat with the right number
- [ ] Paste the site address into WhatsApp or LinkedIn and check the preview image

Then submit the sitemap in Google Search Console (**Sitemaps > Add** `sitemap.xml`) and verify the domain there.

## 8. After launch

**Rate limiting.** The built-in limiter keeps counters in server memory. On Vercel each serverless instance has its own counters, so limits are approximate. For strict limits, replace the `Map` in `lib/rate-limit.ts` with a shared store such as Upstash Redis (`@upstash/ratelimit`), and consider adding Cloudflare Turnstile to the form if spam appears.

**Analytics.** None is installed, which is why no cookie banner is needed. If you add analytics that set cookies, add a consent banner and update the privacy policy.

**Legal pages.** The privacy policy and terms are templates. Have them reviewed for the jurisdictions you operate in (for example India's DPDP Act and, if you serve EU residents, GDPR), and add your registered entity name and address.

**Backups.** Supabase paid plans include daily backups. On the free tier, export the `leads` table periodically (**Table Editor > Export**).

**Updating the site.** Edit files, commit and push. Vercel redeploys automatically.

## Other hosts

Any host that runs Node.js 20+ works: build with `npm run build` and start with `npm start`. Set the same environment variables. Put the app behind HTTPS.
