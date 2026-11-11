'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { leadStatuses, type LeadStatus } from '@/lib/site';
import { authConfigured, createSessionClient } from '@/lib/supabase/server';

export async function signIn(formData: FormData) {
  if (!authConfigured()) redirect('/admin/login?error=config');
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  if (!email || !password) redirect('/admin/login?error=missing');
  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect('/admin/login?error=invalid');
  redirect('/admin');
}

export async function signOut() {
  if (authConfigured()) {
    const supabase = await createSessionClient();
    await supabase.auth.signOut();
  }
  redirect('/admin/login');
}

/** Updates status and notes. Row Level Security rejects the update unless the caller is in `admins`. */
export async function updateLead(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '') as LeadStatus;
  const notes = String(formData.get('notes') ?? '').slice(0, 4000);
  if (!/^[0-9a-f-]{36}$/i.test(id) || !leadStatuses.includes(status)) return;
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const { error } = await supabase.from('leads').update({ status, notes: notes || null }).eq('id', id);
  if (error) console.error('[admin] update failed:', error.message);
  revalidatePath('/admin');
}
