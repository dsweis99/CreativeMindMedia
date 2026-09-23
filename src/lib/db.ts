import { supabase } from './supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  source: string;
  status: LeadStatus;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscriber_type: 'individual' | 'company';
  company_name: string | null;
  is_saved: boolean;
  subscribed_at: string;
}

export interface SiteContentRow {
  id: string;
  page_key: string;
  content: Record<string, unknown>;
  updated_by: string | null;
  updated_at: string;
}

export interface CampaignExample {
  id?: string;
  type: 'video' | 'audit' | 'image';
  title: string;
  mediaUrl: string;
  description: string;
  actionUrl: string;
}

export interface Campaign {
  id: string;
  campaign_type: string;
  eyebrow: string;
  headline: string;
  description: string;
  button_label: string;
  form_prompt: string;
  examples: CampaignExample[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  role: string;
  created_at: string;
}

// ─── Leads ───────────────────────────────────────────────────────────────────

export const fetchLeads = () =>
  supabase.from('leads').select('*').order('created_at', { ascending: false });

export const insertLead = (lead: Omit<Lead, 'id' | 'created_at'>) =>
  supabase.from('leads').insert(lead);

export const updateLeadStatus = (id: string, status: LeadStatus) =>
  supabase.from('leads').update({ status }).eq('id', id);

// ─── Newsletter subscribers ───────────────────────────────────────────────────

export const fetchSubscribers = () =>
  supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false });

export const upsertSubscriber = (email: string, subscriber_type: 'individual' | 'company') =>
  supabase
    .from('newsletter_subscribers')
    .upsert({ email, subscriber_type }, { onConflict: 'email', ignoreDuplicates: true })
    .select();

export const updateSubscriber = (id: string, patch: Partial<Pick<Subscriber, 'subscriber_type' | 'is_saved'>>) =>
  supabase.from('newsletter_subscribers').update(patch).eq('id', id);

export const deleteSubscriber = (id: string) =>
  supabase.from('newsletter_subscribers').delete().eq('id', id);

// ─── Site content ─────────────────────────────────────────────────────────────

export const fetchSiteContent = () =>
  supabase.from('site_content').select('*');

export const upsertPageContent = (page_key: string, content: Record<string, unknown>, updated_by?: string | null) =>
  supabase.from('site_content').upsert(
    { page_key, content, updated_by: updated_by ?? null, updated_at: new Date().toISOString() },
    { onConflict: 'page_key' },
  );

// ─── Campaigns ───────────────────────────────────────────────────────────────

export const fetchCampaigns = () =>
  supabase.from('campaigns').select('*').order('created_at', { ascending: false });

export const upsertCampaign = (campaign: Omit<Campaign, 'created_at' | 'updated_at'> & { id?: string }) =>
  supabase.from('campaigns').upsert(
    { ...campaign, updated_at: new Date().toISOString() },
    { onConflict: 'id' },
  ).select().single();

// ─── Notifications ────────────────────────────────────────────────────────────

export const fetchNotifications = (userId: string) =>
  supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);

export const markNotificationRead = (id: string) =>
  supabase.from('notifications').update({ is_read: true }).eq('id', id);

export const markAllNotificationsRead = (userId: string) =>
  supabase.from('notifications').update({ is_read: true }).eq('user_id', userId).eq('is_read', false);

// ─── Profiles ────────────────────────────────────────────────────────────────

export const fetchProfiles = () =>
  supabase.from('profiles').select('id, full_name, role, created_at').order('created_at', { ascending: true });

export const updateProfileName = (id: string, full_name: string) =>
  supabase.from('profiles').update({ full_name }).eq('id', id);
