import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { demoLeads, statusStyles, type LeadStatus } from '../../data/admin';

export function AdminLeads() {
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [status, setStatus] = useState<LeadStatus | ''>('');
  const [source, setSource] = useState('');
  const [service, setService] = useState('');
  const sources = [...new Set(demoLeads.map((lead) => lead.source))];
  const services = [...new Set(demoLeads.map((lead) => lead.service))];
  const activeFilterCount = [status, source, service].filter(Boolean).length;
  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return demoLeads.filter((lead) => {
      const matchesSearch = !query || [lead.name, lead.company, lead.email, lead.service].some((value) => value.toLowerCase().includes(query));
      return matchesSearch && (!status || lead.status === status) && (!source || lead.source === source) && (!service || lead.service === service);
    });
  }, [search, status, source, service]);
  const clearFilters = () => { setStatus(''); setSource(''); setService(''); };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Pipeline</p><h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Leads</h1><p className="mt-3 text-sm text-[var(--color-text-muted)]">Every website enquiry will appear here once Supabase is connected.</p></div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row"><label className="flex flex-1 items-center gap-3 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] px-4 py-3"><Search size={18} className="text-[var(--color-text-muted)]" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-text-muted)]" placeholder="Search name, company, or service" /></label><button type="button" onClick={() => setFiltersOpen((open) => !open)} className={`inline-flex items-center justify-center gap-2 border px-4 py-3 text-sm font-semibold ${filtersOpen || activeFilterCount ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-[var(--color-border-subtle)] hover:bg-[var(--color-border-subtle)]'}`}><SlidersHorizontal size={17} />Filters{activeFilterCount > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] text-[var(--color-accent-fg)]">{activeFilterCount}</span>}</button></div>
      {filtersOpen && <section className="mb-5 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-5"><div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-medium">Status<select value={status} onChange={(event) => setStatus(event.target.value as LeadStatus | '')} className="mt-2 w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-3 text-sm font-normal outline-none focus:border-[var(--color-accent)]"><option value="">All statuses</option>{(['New', 'Contacted', 'Qualified', 'Won', 'Lost'] as LeadStatus[]).map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-sm font-medium">Source<select value={source} onChange={(event) => setSource(event.target.value)} className="mt-2 w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-3 text-sm font-normal outline-none focus:border-[var(--color-accent)]"><option value="">All sources</option>{sources.map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-sm font-medium">Service<select value={service} onChange={(event) => setService(event.target.value)} className="mt-2 w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-3 text-sm font-normal outline-none focus:border-[var(--color-accent)]"><option value="">All services</option>{services.map((item) => <option key={item}>{item}</option>)}</select></label></div>{activeFilterCount > 0 && <button type="button" onClick={clearFilters} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"><X size={16} />Clear filters</button>}</section>}
      <div className="overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)]"><div className="hidden grid-cols-[1.25fr_1.1fr_0.9fr_0.85fr_0.8fr] gap-4 border-b border-[var(--color-border-subtle)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] md:grid"><span>Lead</span><span>Service</span><span>Source</span><span>Status</span><span>Received</span></div>{filteredLeads.map((lead) => <article key={lead.id} className="grid gap-3 border-b border-[var(--color-border-subtle)] px-5 py-5 last:border-0 md:grid-cols-[1.25fr_1.1fr_0.9fr_0.85fr_0.8fr] md:items-center md:gap-4 md:px-6"><div><p className="font-semibold">{lead.name}</p><p className="mt-1 text-sm text-[var(--color-text-muted)]">{lead.company} · {lead.email}</p></div><p className="text-sm"><span className="mr-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] md:hidden">Service</span>{lead.service}</p><p className="text-sm"><span className="mr-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] md:hidden">Source</span>{lead.source}</p><div><span className={`inline-flex border px-2.5 py-1 text-xs font-semibold ${statusStyles[lead.status]}`}>{lead.status}</span></div><p className="text-sm text-[var(--color-text-muted)]">{lead.receivedAt}</p></article>)}{filteredLeads.length === 0 && <div className="px-6 py-16 text-center"><p className="font-semibold">No leads found</p><p className="mt-2 text-sm text-[var(--color-text-muted)]">Try a different search or clear the filters.</p></div>}</div>
    </div>
  );
}
