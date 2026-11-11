import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Logo } from '@/components/ui';
import { leadStatuses } from '@/lib/site';
import { authConfigured, createSessionClient } from '@/lib/supabase/server';
import { signOut, updateLead } from './actions';

export const dynamic = 'force-dynamic';

type Lead = {
  id: string;
  created_at: string;
  source: 'contact_form' | 'chatbot';
  status: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  visitor_type: string | null;
  country: string | null;
  project_location: string | null;
  service_category: string | null;
  project_type: string | null;
  project_capacity: string | null;
  building_type: string | null;
  project_stage: string | null;
  timeline: string | null;
  description: string | null;
  handover_requested: boolean;
  notes: string | null;
};

const statusTone: Record<string, string> = {
  New: 'bg-lime text-navy',
  Contacted: 'bg-mist text-navy',
  'Discussion in Progress': 'bg-navy text-white',
  'Proposal Submitted': 'bg-emerald text-navy',
  Won: 'bg-forest text-white',
  Lost: 'bg-charcoal/15 text-charcoal',
};

function tally(leads: Lead[], key: (l: Lead) => string | null) {
  const m = new Map<string, number>();
  for (const l of leads) {
    const k = (key(l) || 'Not specified').trim();
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
}

function Shell({ children, email }: { children: React.ReactNode; email?: string }) {
  return (
    <>
      <header className="bg-navy text-white">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-4">
            <Logo className="h-8 w-auto" />
            <span className="hidden font-mono text-xs uppercase tracking-[0.18em] text-lime sm:inline">Lead dashboard</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            {email ? <span className="hidden text-white/70 md:inline">{email}</span> : null}
            <Link href="/" className="text-white/80 hover:text-lime">View site</Link>
            <form action={signOut}>
              <button type="submit" className="border border-white/30 px-3 py-1.5 hover:border-lime hover:text-lime">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="wrap py-10">{children}</main>
    </>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="mt-3 text-charcoal/80">{children}</div>
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; source?: string; q?: string }>;
}) {
  if (!authConfigured()) {
    return (
      <Shell>
        <Notice title="Dashboard not configured">
          Supabase environment variables are missing. Follow docs/DEPLOYMENT.md and docs/ADMIN.md to connect the database and
          create an administrator account.
        </Notice>
      </Shell>
    );
  }

  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: adminRow } = await supabase.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
  if (!adminRow) {
    return (
      <Shell email={user.email}>
        <Notice title="Not authorised">
          Your account is signed in but has not been granted administrator access. Ask the site owner to add your user to
          the <code>admins</code> table (see docs/ADMIN.md).
        </Notice>
      </Shell>
    );
  }

  const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(1000);
  if (error) {
    return (
      <Shell email={user.email}>
        <Notice title="Could not load leads">
          The database returned an error: {error.message}. Check that supabase/schema.sql has been run.
        </Notice>
      </Shell>
    );
  }
  const leads = (data ?? []) as Lead[];
  const sp = await searchParams;
  const q = (sp.q ?? '').trim().toLowerCase();
  const shown = leads.filter(
    (l) =>
      (!sp.status || l.status === sp.status) &&
      (!sp.source || l.source === sp.source) &&
      (!q ||
        [l.full_name, l.company, l.email, l.country, l.project_location, l.service_category, l.description]
          .join(' ')
          .toLowerCase()
          .includes(q))
  );

  const stats = [
    ['Total enquiries', leads.length],
    ['New leads', leads.filter((l) => l.status === 'New').length],
    ['Chatbot leads', leads.filter((l) => l.source === 'chatbot').length],
    ['Contact form', leads.filter((l) => l.source === 'contact_form').length],
  ] as const;
  const byService = tally(leads, (l) => l.service_category);
  const byLocation = tally(leads, (l) => l.country || l.project_location);
  const byStatus = leadStatuses.map((s) => [s, leads.filter((l) => l.status === s).length] as const);
  const max = (rows: readonly (readonly [string, number])[]) => Math.max(1, ...rows.map((r) => r[1]));

  const Bars = ({ title, rows }: { title: string; rows: readonly (readonly [string, number])[] }) => (
    <section className="card p-6">
      <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-forest">{title}</h2>
      {rows.length ? (
        <ul className="mt-5 space-y-3">
          {rows.map(([k, n]) => (
            <li key={k}>
              <div className="flex justify-between gap-4 text-sm">
                <span className="truncate text-charcoal/85">{k}</span>
                <span className="font-semibold text-navy">{n}</span>
              </div>
              <div className="mt-1.5 h-1.5 bg-mist">
                <div className="h-1.5 bg-emerald" style={{ width: `${(n / max(rows)) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-charcoal/60">No data yet.</p>
      )}
    </section>
  );

  return (
    <Shell email={user.email}>
      <h1 className="text-3xl font-semibold">Enquiries</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([k, n]) => (
          <div key={k} className="card p-6">
            <p className="text-sm text-charcoal/65">{k}</p>
            <p className="mt-2 font-display text-4xl font-semibold text-navy">{n}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Bars title="Leads by service" rows={byService} />
        <Bars title="Leads by location" rows={byLocation} />
        <Bars title="Leads by status" rows={byStatus} />
      </div>

      <section className="mt-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-2xl font-semibold">Recent enquiries</h2>
          <form method="get" className="flex flex-wrap items-end gap-3">
            <div>
              <label className="field-label" htmlFor="q">Search</label>
              <input className="field !py-2" id="q" name="q" defaultValue={sp.q ?? ''} placeholder="Name, company, service" />
            </div>
            <div>
              <label className="field-label" htmlFor="status">Status</label>
              <select className="field !py-2" id="status" name="status" defaultValue={sp.status ?? ''}>
                <option value="">All</option>
                {leadStatuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="source">Source</label>
              <select className="field !py-2" id="source" name="source" defaultValue={sp.source ?? ''}>
                <option value="">All</option>
                <option value="contact_form">Contact form</option>
                <option value="chatbot">Chatbot</option>
              </select>
            </div>
            <button className="btn-navy !py-2.5" type="submit">Filter</button>
            <Link href="/admin" className="py-2.5 text-sm text-navy underline">Reset</Link>
          </form>
        </div>

        <p className="mt-4 text-sm text-charcoal/60">Showing {shown.length} of {leads.length}</p>

        {shown.length === 0 ? (
          <p className="card mt-4 p-8 text-charcoal/70">No enquiries match. New submissions from the website will appear here.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {shown.map((l) => (
              <li key={l.id} className="card">
                <details>
                  <summary className="flex cursor-pointer flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold ${statusTone[l.status] ?? 'bg-mist'}`}>{l.status}</span>
                    <span className="font-semibold text-navy">{l.full_name}</span>
                    {l.company ? <span className="text-sm text-charcoal/70">{l.company}</span> : null}
                    <span className="text-sm text-charcoal/70">{l.service_category ?? l.project_type ?? 'Service not specified'}</span>
                    {l.handover_requested ? <span className="bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900">Follow-up requested</span> : null}
                    <span className="ml-auto flex items-center gap-3 text-xs text-charcoal/60">
                      <span className="border border-navy/15 px-2 py-0.5">{l.source === 'chatbot' ? 'Chatbot' : 'Contact form'}</span>
                      {new Date(l.created_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </summary>
                  <div className="grid gap-8 border-t border-navy/10 px-5 py-6 lg:grid-cols-[1.4fr_1fr]">
                    <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                      {(
                        [
                          ['Email', l.email],
                          ['Phone', l.phone],
                          ['Visitor type', l.visitor_type],
                          ['Country', l.country],
                          ['Project location', l.project_location],
                          ['Project type', l.project_type],
                          ['Capacity', l.project_capacity],
                          ['Building type', l.building_type],
                          ['Project stage', l.project_stage],
                          ['Timeline', l.timeline],
                        ] as const
                      )
                        .filter(([, v]) => v)
                        .map(([k, v]) => (
                          <div key={k}>
                            <dt className="text-charcoal/55">{k}</dt>
                            <dd className="mt-0.5 break-words font-medium text-navy">
                              {k === 'Email' ? <a className="underline" href={`mailto:${v}`}>{v}</a> : v}
                            </dd>
                          </div>
                        ))}
                      {l.description ? (
                        <div className="sm:col-span-2">
                          <dt className="text-charcoal/55">Details</dt>
                          <dd className="mt-0.5 whitespace-pre-wrap text-charcoal/90">{l.description}</dd>
                        </div>
                      ) : null}
                    </dl>
                    <form action={updateLead} className="space-y-4">
                      <input type="hidden" name="id" value={l.id} />
                      <div>
                        <label className="field-label" htmlFor={`status-${l.id}`}>Lead status</label>
                        <select className="field" id={`status-${l.id}`} name="status" defaultValue={l.status}>
                          {leadStatuses.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="field-label" htmlFor={`notes-${l.id}`}>Internal notes</label>
                        <textarea className="field min-h-[6rem]" id={`notes-${l.id}`} name="notes" defaultValue={l.notes ?? ''} />
                      </div>
                      <button type="submit" className="btn-navy">Save</button>
                    </form>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Shell>
  );
}
