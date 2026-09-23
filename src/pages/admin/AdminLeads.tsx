import { useEffect, useMemo, useState } from 'react';
import { Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { fetchLeads, updateLeadStatus, type Lead, type LeadStatus } from '../../lib/db';
import { statusStyles } from '../../data/admin';

const ALL_STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Won', 'Lost'];

function leadName(lead: Lead) {
  return `${lead.first_name ?? ''} ${lead.last_name ?? ''}`.trim();
}

export function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchLeads().then(({ data, error: err }) => {
      if (err) setError(err.message);
      else setLeads((data as Lead[]) ?? []);
      setLoading(false);
    });
  }, []);

  const sources = useMemo(() => [...new Set(leads.map((l) => l.source).filter(Boolean))], [leads]);
  const services = useMemo(() => [...new Set(leads.map((l) => l.service).filter(Boolean))], [leads]);
  const activeFilterCount = [statusFilter, sourceFilter, serviceFilter].filter(Boolean).length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return leads.filter((l) => {
      if (q && !leadName(l).toLowerCase().includes(q) && !l.company.toLowerCase().includes(q) && !l.email.toLowerCase().includes(q) && !l.service.toLowerCase().includes(q)) return false;
      if (statusFilter && l.status !== statusFilter) return false;
      if (sourceFilter && l.source !== sourceFilter) return false;
      if (serviceFilter && l.service !== serviceFilter) return false;
      return true;
    });
  }, [leads, search, statusFilter, sourceFilter, serviceFilter]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    setUpdatingId(id);
    const { error: err } = await updateLeadStatus(id, status);
    if (!err) setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    setUpdatingId(null);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 86_400_000) return `Today, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (diff < 172_800_000) return `Yesterday, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Pipeline</p>
        <h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Leads</h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">All enquiries submitted through the website contact form.</p>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-3 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] px-4 py-3">
          <Search size={18} className="text-[var(--color-text-muted)]" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-text-muted)]"
            placeholder="Search name, company, email or service"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="relative inline-flex items-center justify-center gap-2 border border-[var(--color-border-subtle)] px-4 py-3 text-sm font-semibold hover:bg-[var(--color-border-subtle)]"
        >
          <SlidersHorizontal size={17} />Filters
          {activeFilterCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-[var(--color-accent-fg)]">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {filtersOpen && (
        <div className="mb-5 grid grid-cols-1 gap-3 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]">
              <option value="">All statuses</option>
              {ALL_STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Source</label>
            <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]">
              <option value="">All sources</option>
              {sources.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Service</label>
            <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]">
              <option value="">All services</option>
              {services.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={28} className="animate-spin text-[var(--color-accent)]" />
        </div>
      ) : error ? (
        <div className="border border-red-500/30 bg-red-500/10 px-6 py-8 text-center text-sm text-red-500">{error}</div>
      ) : (
        <div className="overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)]">
          <div className="hidden grid-cols-[1.25fr_1fr_0.9fr_0.85fr_1fr_0.8fr] gap-4 border-b border-[var(--color-border-subtle)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] md:grid">
            <span>Lead</span><span>Service</span><span>Source</span><span>Status</span><span>Update status</span><span>Received</span>
          </div>
          {filtered.length === 0 ? (
            <p className="px-6 py-16 text-center text-sm text-[var(--color-text-muted)]">No leads match your filters.</p>
          ) : (
            filtered.map((lead) => (
              <article key={lead.id} className="grid gap-3 border-b border-[var(--color-border-subtle)] px-5 py-5 last:border-0 md:grid-cols-[1.25fr_1fr_0.9fr_0.85fr_1fr_0.8fr] md:items-center md:gap-4 md:px-6">
                <div>
                  <p className="font-semibold">{leadName(lead)}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">{lead.company ? `${lead.company} · ` : ''}{lead.email}</p>
                </div>
                <p className="text-sm"><span className="mr-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] md:hidden">Service </span>{lead.service || '—'}</p>
                <p className="text-sm"><span className="mr-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] md:hidden">Source </span>{lead.source || '—'}</p>
                <div><span className={`inline-flex border px-2.5 py-1 text-xs font-semibold ${statusStyles[lead.status] ?? ''}`}>{lead.status}</span></div>
                <div>
                  <select
                    value={lead.status}
                    disabled={updatingId === lead.id}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                    className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-2 py-1.5 text-xs outline-none focus:border-[var(--color-accent)] disabled:opacity-50"
                  >
                    {ALL_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">{formatDate(lead.created_at)}</p>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}
