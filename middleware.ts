import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/** Protects /admin: refreshes the Supabase session and redirects visitors who are not signed in. */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return response; // the admin pages render a "not configured" notice

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(list) {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLogin = request.nextUrl.pathname.startsWith('/admin/login');
  if (!user && !isLogin) {
    const to = request.nextUrl.clone();
    to.pathname = '/admin/login';
    to.search = '';
    return NextResponse.redirect(to);
  }
  if (user && isLogin) {
    const to = request.nextUrl.clone();
    to.pathname = '/admin';
    to.search = '';
    return NextResponse.redirect(to);
  }
  return response;
}

export const config = { matcher: ['/admin/:path*'] };
