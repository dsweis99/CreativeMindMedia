import { useEffect, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, CircleDollarSign, Loader2, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchLeads, type Lead, type LeadStatus } from '../../lib/db';
import { statusStyles } from '../../data/admin';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 86_400_000) return `Today, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  if (diff < 172_800_000) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads().then(({ data }) => {
      setLeads((data as Lead[]) ?? []);
      setLoading(false);
    });
  }, []);

  const countByStatus = (status: LeadStatus) => leads.filter((l) => l.status === status).length;

  const sourceCounts = leads.reduce<Record<string, number>>((acc, l) => {
    if (l.source) acc[l.source] = (acc[l.source] ?? 0) + 1;
    return acc;
  }, {});
  const totalLeads = leads.length || 1;
  const topSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([label, count]) => ({ label, value: Math.round((count / totalLeads) * 100) }));

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const metrics = [
    { label: 'Total Leads', value: leads.length, icon: UsersRound },
    { label: 'Qualified', value: countByStatus('Qualified'), icon: BriefcaseBusiness },
    { label: 'Won', value: countByStatus('Won'), icon: CircleDollarSign },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Overview</p>
          <h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">{greeting}, Admin.</h1>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">Here is how your potential clients are moving today.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={28} className="animate-spin text-[var(--color-accent)]" />
        </div>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-3">
            {metrics.map(({ label, value, icon: Icon }) => (
              <div key={label} className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent-dim)] text-[var(--color-accent)]"><Icon size={20} /></div>
                  <ArrowUpRight size={14} className="text-emerald-500" />
                </div>
                <p className="mt-8 font-display text-5xl tracking-wide">{String(value).padStart(2, '0')}</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
            <section className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)]">
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] p-6">
                <div>
                  <h2 className="font-display text-3xl tracking-wide">Recent Leads</h2>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">Your latest website enquiries.</p>
                </div>
                <Link to="/admin/leads" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{lead.name} <span className="font-normal text-[var(--color-text-muted)]">{lead.company ? `· ${lead.company}` : ''}</span></p>
                      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{lead.service || 'General enquiry'} · {formatDate(lead.created_at)}</p>
                    </div>
                    <span className={`w-fit border px-2.5 py-1 text-xs font-semibold ${statusStyles[lead.status] ?? ''}`}>{lead.status}</span>
                  </div>
                ))}
                {leads.length === 0 && <p className="px-6 py-10 text-center text-sm text-[var(--color-text-muted)]">No leads yet. Submit the contact form to see them here.</p>}
              </div>
            </section>

            <section className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6">
              <h2 className="font-display text-3xl tracking-wide">Lead Sources</h2>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">Where new opportunities start.</p>
              <div className="mt-8 space-y-6">
                {topSources.length > 0 ? topSources.map((source) => (
                  <div key={source.label}>
                    <div className="mb-2 flex justify-between text-sm"><span>{source.label}</span><span className="text-[var(--color-text-muted)]">{source.value}%</span></div>
                    <div className="h-2 bg-[var(--color-border-subtle)]"><div className="h-full bg-[var(--color-accent)]" style={{ width: `${source.value}%` }} /></div>
                  </div>
                )) : <p className="text-sm text-[var(--color-text-muted)]">No source data yet.</p>}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
