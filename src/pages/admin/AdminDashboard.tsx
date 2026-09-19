import { ArrowUpRight, BriefcaseBusiness, CircleDollarSign, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { demoLeads, statusStyles } from '../../data/admin';

const metrics = [
  { label: 'New Leads', value: '12', change: '+20%', icon: UsersRound },
  { label: 'Qualified Leads', value: '08', change: '+14%', icon: BriefcaseBusiness },
  { label: 'Won This Month', value: '04', change: '+33%', icon: CircleDollarSign },
];

export function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Overview</p><h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Good evening, Admin.</h1><p className="mt-3 text-sm text-[var(--color-text-muted)]">Here is how your potential clients are moving today.</p></div>
        <span className="inline-flex w-fit items-center gap-2 border border-[var(--color-accent)]/30 bg-[var(--color-accent-dim)] px-3 py-2 text-xs font-medium text-[var(--color-accent)]"><span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />Demo data — Supabase connects later</span>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {metrics.map(({ label, value, change, icon: Icon }) => <div key={label} className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6"><div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent-dim)] text-[var(--color-accent)]"><Icon size={20} /></div><span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300"><ArrowUpRight size={14} />{change}</span></div><p className="mt-8 font-display text-5xl tracking-wide">{value}</p><p className="mt-1 text-sm text-[var(--color-text-muted)]">{label}</p></div>)}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
        <section className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)]"><div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] p-6"><div><h2 className="font-display text-3xl tracking-wide">Recent Leads</h2><p className="mt-1 text-sm text-[var(--color-text-muted)]">Your latest website enquiries.</p></div><Link to="/admin/leads" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">View all</Link></div><div className="divide-y divide-[var(--color-border-subtle)]">{demoLeads.slice(0, 4).map((lead) => <div key={lead.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{lead.name} <span className="font-normal text-[var(--color-text-muted)]">· {lead.company}</span></p><p className="mt-1 text-sm text-[var(--color-text-muted)]">{lead.service} · {lead.receivedAt}</p></div><span className={`w-fit border px-2.5 py-1 text-xs font-semibold ${statusStyles[lead.status]}`}>{lead.status}</span></div>)}</div></section>
        <section className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6"><h2 className="font-display text-3xl tracking-wide">Lead Sources</h2><p className="mt-1 text-sm text-[var(--color-text-muted)]">Where new opportunities start.</p><div className="mt-8 space-y-6">{[{ label: 'Website', value: 54 }, { label: 'Instagram', value: 23 }, { label: 'Referral', value: 15 }, { label: 'Google', value: 8 }].map((source) => <div key={source.label}><div className="mb-2 flex justify-between text-sm"><span>{source.label}</span><span className="text-[var(--color-text-muted)]">{source.value}%</span></div><div className="h-2 bg-[var(--color-border-subtle)]"><div className="h-full bg-[var(--color-accent)]" style={{ width: `${source.value}%` }} /></div></div>)}</div></section>
      </div>
    </div>
  );
}
