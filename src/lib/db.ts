import { supabase } from './supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  source: string;
  status: LeadStatus;
  message: string;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  type: 'individual' | 'company';
  saved: boolean;
}

export interface SiteContentRow {
  page_id: string;
  title: string;
  intro: string;
  sections: Array<{ name: string; visible: boolean }>;
  updated_at: string;
}

export interface CampaignExample {
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
  admin_id: string;
  title: string;
  message: string;
  read: boolean;
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

export const upsertSubscriber = (email: string, type: 'individual' | 'company') =>
  supabase
    .from('newsletter_subscribers')
    .upsert({ email, type, saved: false }, { onConflict: 'email', ignoreDuplicates: true })
    .select();

export const updateSubscriber = (id: string, patch: Partial<Pick<Subscriber, 'type' | 'saved'>>) =>
  supabase.from('newsletter_subscribers').update(patch).eq('id', id);

export const deleteSubscriber = (id: string) =>
  supabase.from('newsletter_subscribers').delete().eq('id', id);

// ─── Site content ─────────────────────────────────────────────────────────────

export const fetchSiteContent = () =>
  supabase.from('site_content').select('*');

export const upsertPageContent = (row: Omit<SiteContentRow, 'updated_at'>) =>
  supabase.from('site_content').upsert(
    { ...row, updated_at: new Date().toISOString() },
    { onConflict: 'page_id' },
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

export const fetchNotifications = (adminId: string) =>
  supabase
    .from('notifications')
    .select('*')
    .eq('admin_id', adminId)
    .order('created_at', { ascending: false })
    .limit(20);

export const markNotificationRead = (id: string) =>
  supabase.from('notifications').update({ read: true }).eq('id', id);

export const markAllNotificationsRead = (adminId: string) =>
  supabase.from('notifications').update({ read: true }).eq('admin_id', adminId).eq('read', false);
