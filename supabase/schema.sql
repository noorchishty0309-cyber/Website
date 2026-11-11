-- ===========================================================================
-- NOORLUME - database schema
-- Run once in Supabase: Dashboard > SQL Editor > New query > paste > Run.
-- ===========================================================================

create extension if not exists "pgcrypto";

-- Administrators: users (from Supabase Auth) who may view and manage leads.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Leads: contact form submissions and chatbot enquiries.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source text not null check (source in ('contact_form', 'chatbot')),
  status text not null default 'New'
    check (status in ('New', 'Contacted', 'Discussion in Progress', 'Proposal Submitted', 'Won', 'Lost')),
  full_name text not null,
  email text,
  phone text,
  company text,
  visitor_type text,
  country text,
  project_location text,
  service_category text,
  project_type text,
  project_capacity text,
  building_type text,
  project_stage text,
  timeline text,
  description text,
  handover_requested boolean not null default false,
  session_id text,
  consent boolean not null default false,
  consent_at timestamptz,
  notes text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_source_idx on public.leads (source);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- The website inserts leads from the server with the service role key, which
-- bypasses RLS. The public (anon) key has no access to these tables at all.
-- Signed-in users can read and update leads only if they are in `admins`.
-- ---------------------------------------------------------------------------
alter table public.leads enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins read leads" on public.leads;
create policy "admins read leads" on public.leads
  for select to authenticated using (public.is_admin());

drop policy if exists "admins update leads" on public.leads;
create policy "admins update leads" on public.leads
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
  for select to authenticated using (user_id = auth.uid());

revoke all on public.leads from anon;
revoke all on public.admins from anon;

-- ---------------------------------------------------------------------------
-- After creating your administrator user in Authentication > Users, grant
-- dashboard access by running (replace the email address):
--
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'you@yourdomain.com';
-- ---------------------------------------------------------------------------
