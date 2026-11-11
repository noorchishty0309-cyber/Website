import Link from 'next/link';
import { Logo } from '@/components/ui';
import { authConfigured } from '@/lib/supabase/server';
import { signIn } from '../actions';

const messages: Record<string, string> = {
  invalid: 'The email or password is incorrect.',
  missing: 'Enter your email and password.',
  config: 'Sign-in is not configured yet.',
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const configured = authConfigured();
  return (
    <main className="blueprint flex min-h-screen items-center justify-center bg-navy px-5 py-12">
      <div className="w-full max-w-md">
        <Link href="/" aria-label="NOORLUME home">
          <Logo className="mx-auto h-11 w-auto" />
        </Link>
        <div className="mt-10 bg-white p-8 sm:p-10" style={{ borderRadius: 3 }}>
          <h1 className="text-2xl font-semibold">Administrator sign-in</h1>
          <p className="mt-2 text-sm text-charcoal/70">Lead management dashboard. Authorised users only.</p>

          {!configured ? (
            <p role="alert" className="mt-6 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then follow
              docs/ADMIN.md to create an administrator.
            </p>
          ) : null}
          {error && messages[error] ? (
            <p role="alert" className="mt-6 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">
              {messages[error]}
            </p>
          ) : null}

          <form action={signIn} className="mt-7 space-y-5">
            <div>
              <label className="field-label" htmlFor="email">Email</label>
              <input className="field" id="email" name="email" type="email" autoComplete="username" required disabled={!configured} />
            </div>
            <div>
              <label className="field-label" htmlFor="password">Password</label>
              <input className="field" id="password" name="password" type="password" autoComplete="current-password" required disabled={!configured} />
            </div>
            <button type="submit" className="btn-navy w-full disabled:opacity-40" disabled={!configured}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
