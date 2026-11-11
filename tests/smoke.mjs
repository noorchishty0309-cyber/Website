/**
 * Smoke test for a running build (default http://localhost:3100).
 * Crawls every internal link, exercises the APIs and drives the UI in a
 * headless browser at desktop, tablet and mobile widths.
 *
 *   npx next build && npx next start -p 3100 &
 *   NODE_PATH=<path to a node_modules containing playwright> node tests/smoke.mjs
 *
 * MODE=unconfigured (default) expects no service keys: forms and chatbot
 * must fail honestly. MODE=mock expects tests/mock-services.mjs to be
 * running and the app built and started with the env shown in that file.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const BASE = process.env.BASE || 'http://localhost:3100';
const MODE = process.env.MODE || 'unconfigured';
const SHOTS = process.env.SHOTS || '/tmp/shots';
fs.mkdirSync(SHOTS, { recursive: true });

let pass = 0;
const fails = [];
const check = (name, ok, extra = '') => {
  if (ok) pass++;
  else fails.push(`${name} ${extra}`);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  ' + extra : ''}`);
};
const post = (path, body, ip) =>
  fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

// ---- 1. Crawl ------------------------------------------------------------
const seen = new Set(['/']);
const queue = ['/'];
let h1Problems = [];
while (queue.length) {
  const path = queue.shift();
  const res = await fetch(BASE + path, { redirect: 'manual' });
  const okStatus = res.status === 200 || (path.startsWith('/admin') && [200, 307].includes(res.status));
  if (!okStatus) check(`GET ${path}`, false, `status ${res.status}`);
  if (res.status !== 200) continue;
  const html = await res.text();
  if (!path.startsWith('/admin')) {
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) h1Problems.push(`${path} has ${h1} h1`);
    if (!/<meta name="description"/.test(html)) h1Problems.push(`${path} missing meta description`);
    if (!/rel="canonical"/.test(html)) h1Problems.push(`${path} missing canonical`);
    const noAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;
    if (noAlt) h1Problems.push(`${path} has ${noAlt} img without alt`);
  }
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const p = m[1].replace(/\/$/, '') || '/';
    if (p.startsWith('/_next') || /\.(svg|png|ico|css|js|woff2?)$/.test(p)) continue;
    if (!seen.has(p)) {
      seen.add(p);
      queue.push(p);
    }
  }
}
check(`crawl: ${seen.size} internal pages all resolve`, !fails.length);
check('SEO: one h1, meta description, canonical, img alt on every page', h1Problems.length === 0, h1Problems.join('; '));

for (const p of ['/sitemap.xml', '/robots.txt', '/og-image.png', '/icon.svg', '/brand/noorlume-logo-horizontal-white.svg', '/illustrations/field-dark.svg']) {
  const r = await fetch(BASE + p);
  check(`GET ${p}`, r.status === 200, `status ${r.status}`);
}
const sm = await (await fetch(BASE + '/sitemap.xml')).text();
check('sitemap lists service pages, excludes demo projects', sm.includes('/renewable-energy/dc-and-ac-cable-sizing') && !sm.includes('/projects/sample-'));
check('404 for unknown page', (await fetch(BASE + '/no-such-page')).status === 404);
const home = await (await fetch(BASE + '/')).text();
check('JSON-LD organisation schema present', home.includes('application/ld+json') && home.includes('ProfessionalService'));
const hdr = await fetch(BASE + '/');
check('security headers set', hdr.headers.get('x-content-type-options') === 'nosniff' && !!hdr.headers.get('strict-transport-security'));

// ---- 2. APIs -------------------------------------------------------------
const valid = {
  fullName: 'Test Engineer', company: 'Test Co', email: 'test@example.com', phone: '+91 98765 43210', country: 'India',
  projectLocation: 'Pune', serviceCategory: 'Rooftop solar PV', projectCapacity: '500 kWp', buildingType: '',
  description: 'Automated smoke test enquiry.', timeline: 'Not decided', consent: true, website: '', startedAt: Date.now() - 10000,
};
let r = await post('/api/enquiry', { ...valid, email: 'not-an-email', consent: false }, '10.0.0.1');
let j = await r.json();
check('enquiry: invalid input rejected with field errors', r.status === 422 && j.errors?.email && j.errors?.consent);
r = await post('/api/enquiry', '{bad json', '10.0.0.1');
check('enquiry: malformed JSON rejected', r.status === 400);
r = await post('/api/enquiry', { ...valid, website: 'http://spam.example' }, '10.0.0.2');
check('enquiry: honeypot submission silently dropped', r.status === 200);
r = await post('/api/enquiry', valid, '10.0.0.3');
j = await r.json();
if (MODE === 'mock') check('enquiry: valid submission stored (mock database)', r.status === 200 && j.ok === true);
else check('enquiry: without services configured, reports failure honestly (503)', r.status === 503 && j.ok === false);
let last;
for (let i = 0; i < 7; i++) last = await post('/api/enquiry', { ...valid, email: 'x' }, '10.0.0.4');
check('enquiry: rate limit returns 429', last.status === 429 && !!last.headers.get('retry-after'));

r = await post('/api/chat', { sessionId: 'smoke-session-1', messages: [{ role: 'user', content: 'Hello' }] }, '10.0.1.1');
j = await r.json();
if (MODE === 'mock') check('chat: reply returned (mock model)', r.status === 200 && typeof j.reply === 'string' && j.reply.length > 0);
else check('chat: without API key, reports unavailable (503)', r.status === 503 && j.error === 'not_configured');
if (MODE === 'mock') {
  r = await post('/api/chat', { sessionId: 'x', messages: [] }, '10.0.1.2');
  check('chat: invalid request rejected', r.status === 400);
  r = await post('/api/chat', {
    sessionId: 'smoke-session-2',
    messages: [
      { role: 'user', content: 'I need rooftop solar design for a 500 kWp factory in Pune.' },
      { role: 'assistant', content: 'May I store your details and share them with the team?' },
      { role: 'user', content: 'Yes I agree. I am Test Engineer, test@example.com' },
    ],
  }, '10.0.1.3');
  j = await r.json();
  check('chat: consented lead saved through tool call', r.status === 200 && j.leadSaved === true && /^[0-9a-f-]{36}$/.test(j.leadId || ''), JSON.stringify(j).slice(0, 160));
  const log = await (await fetch('http://127.0.0.1:4010/__log')).json();
  const lead = log.inserts.find((x) => x.source === 'chatbot');
  check('chat: stored lead carries consent, session and contact', !!lead && lead.consent === true && lead.session_id === 'smoke-session-2' && lead.email === 'test@example.com');
  check('chat: model request is authenticated server-side and carries the system prompt', log.anthropic.every((a) => a.hasKey && a.hasSystem), JSON.stringify(log.anthropic[0]));
  check('chat: knowledge base included in system prompt', log.anthropic.some((a) => a.systemHasKb));
  const form = log.inserts.find((x) => x.source === 'contact_form');
  check('enquiry: stored record has expected fields', !!form && form.full_name === 'Test Engineer' && form.service_category === 'Rooftop solar PV' && form.consent === true);
  for (let i = 0; i < 22; i++) last = await post('/api/chat', { sessionId: 'smoke-session-3', messages: [{ role: 'user', content: 'hi' }] }, '10.0.1.9');
  check('chat: rate limit returns 429', last.status === 429);
}

// ---- 3. Browser ----------------------------------------------------------
const browser = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox'] });
const errors = [];
async function view(name, width, height, path, fn, full = false) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: width < 500 ? 2 : 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`${path}: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && !/favicon|Failed to load resource/.test(m.text()) && errors.push(`${path}: ${m.text()}`));
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(`${name}: no horizontal overflow at ${width}px`, overflow <= 1, `overflow ${overflow}px`);
  if (fn) await fn(page);
  if (full) {
    // scroll through so lazy images and scroll-reveal sections are loaded
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
  }
  await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: full });
  await ctx.close();
}

await view('home-desktop', 1440, 900, '/');
await view('home-desktop-full', 1440, 900, '/', null, true);
await view('home-tablet', 820, 1180, '/');
await view('home-mobile', 390, 844, '/');
await view('home-mobile-full', 390, 844, '/', null, true);
await view('renewable-desktop', 1440, 900, '/renewable-energy');
await view('service-desktop', 1440, 900, '/renewable-energy/dc-and-ac-cable-sizing', null, true);
await view('mep-desktop', 1440, 900, '/mep', null, true);
await view('mep-mobile', 390, 844, '/mep');
await view('about-mobile', 390, 844, '/about');
await view('insight-desktop', 1440, 900, '/insights/dc-cable-sizing-for-pv-strings', null, true);
await view('admin-login', 1440, 900, '/admin/login');

await view('nav-mobile', 390, 844, '/', async (page) => {
  await page.click('button[aria-controls="mobile-nav"]');
  await page.waitForSelector('#mobile-nav a');
  check('mobile menu opens and lists navigation', (await page.locator('#mobile-nav a').count()) >= 7);
  await page.click('#mobile-nav a[href="/mep"]');
  await page.waitForURL('**/mep');
  check('mobile menu navigates', page.url().endsWith('/mep'));
});

await view('projects-filter', 1440, 900, '/projects', async (page) => {
  await page.click('button:has-text("Rooftop solar")');
  check('project filter narrows results', (await page.locator('a[href^="/projects/sample"]').count()) === 1);
  check('demonstration content is labelled', (await page.locator('text=Demonstration content').count()) >= 1);
});

await view('insights-search', 1440, 900, '/insights', async (page) => {
  await page.fill('#insight-search', 'earthing');
  check('article search filters results', (await page.locator('a[href^="/insights/"]').count()) === 1);
});

await view('contact-form', 1440, 900, '/contact?service=DC%20and%20AC%20cable%20sizing', async (page) => {
  check('service pre-selected from link', (await page.inputValue('#serviceCategory')) === 'DC and AC cable sizing');
  await page.click('button[type="submit"]');
  check('client validation blocks empty form', (await page.locator('#fullName-error').count()) === 1 && (await page.locator('#consent-error').count()) === 1);
  await page.fill('#fullName', 'Test Engineer');
  await page.fill('#email', 'test@example.com');
  await page.fill('#country', 'India');
  await page.fill('#description', 'Browser smoke test enquiry for cable sizing.');
  await page.check('input[name="consent"]');
  await page.waitForTimeout(3200);
  await page.click('button[type="submit"]');
  if (MODE === 'mock') {
    await page.waitForSelector('text=Your enquiry is with our team');
    check('form submission shows confirmation', true);
  } else {
    await page.waitForSelector('[role="alert"]');
    const t = await page.locator('form [role="alert"]').innerText();
    check('form shows honest "not configured" error, no false success', /not been configured/.test(t));
  }
}, true);

await view('chat-desktop', 1440, 900, '/', async (page) => {
  await page.click('button[aria-label^="Open the NOORLUME"]');
  await page.waitForSelector('[role="dialog"]');
  check('chat greeting shown', (await page.locator('[role="dialog"]').innerText()).includes('Welcome to NOORLUME!'));
  await page.fill('#chat-input', 'What solar PV services do you offer?');
  await page.keyboard.press('Enter');
  if (MODE === 'mock') {
    await page.waitForFunction(() => document.querySelectorAll('[role="dialog"] p.whitespace-pre-wrap').length >= 3);
    check('chat shows assistant reply', true);
    await page.reload({ waitUntil: 'networkidle' });
    await page.click('button[aria-label^="Open the NOORLUME"]');
    check('chat history survives reload within the session', (await page.locator('[role="dialog"]').innerText()).includes('What solar PV services'));
  } else {
    await page.waitForSelector('[role="dialog"] [role="alert"]');
    check('chat shows unavailable notice with contact link', (await page.locator('[role="dialog"] [role="alert"] a[href="/contact"]').count()) === 1);
  }
});
await view('chat-mobile', 390, 844, '/contact', async (page) => {
  await page.click('button[aria-label^="Open the NOORLUME"]');
  await page.waitForSelector('[role="dialog"]');
});

if (MODE === 'mock') {
  const red = await fetch(BASE + '/admin', { redirect: 'manual' });
  check('admin: signed-out visitor is redirected to login', red.status === 307 && (red.headers.get('location') || '').includes('/admin/login'));
  await view('admin-login-error', 1440, 900, '/admin/login', async (page) => {
    await page.fill('#email', 'intruder@example.com');
    await page.fill('#password', 'wrong-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/login?error=invalid');
    await page.waitForSelector('text=The email or password is incorrect');
    check('admin: wrong credentials are rejected with a message', true);
  });
} else {
  const html = await (await fetch(BASE + '/admin')).text();
  check('admin: shows "not configured" notice without Supabase keys', html.includes('Dashboard not configured'));
}

check('no browser console or page errors', errors.length === 0, errors.slice(0, 4).join(' | '));
await browser.close();

console.log(`\n${pass} passed, ${fails.length} failed`);
if (fails.length) {
  console.log(fails.join('\n'));
  process.exit(1);
}
