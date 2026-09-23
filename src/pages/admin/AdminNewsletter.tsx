import { useEffect, useMemo, useState } from 'react';
import { Bookmark, BookmarkCheck, Download, Loader2, Save, Search, Trash2 } from 'lucide-react';
import { getNewsletterSettings, saveNewsletterSettings, type NewsletterSettings } from '../../data/newsletter';
import { fetchSubscribers, updateSubscriber, deleteSubscriber, type Subscriber } from '../../lib/db';

type TypeFilter = 'all' | 'individual' | 'company';

export function AdminNewsletter() {
  const [settings, setSettings] = useState<NewsletterSettings>(() => getNewsletterSettings());
  const [draft, setDraft] = useState<NewsletterSettings>(() => getNewsletterSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [savedFilter, setSavedFilter] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchSubscribers().then(({ data, error: err }) => {
      if (err) setError(err.message);
      else setSubscribers((data as Subscriber[]) ?? []);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return subscribers.filter((s) => {
      if (q && !s.email.toLowerCase().includes(q)) return false;
      if (typeFilter !== 'all' && s.subscriber_type !== typeFilter) return false;
      if (savedFilter && !s.is_saved) return false;
      return true;
    });
  }, [subscribers, search, typeFilter, savedFilter]);

  const stats = useMemo(() => ({
    total: subscribers.length,
    companies: subscribers.filter((s) => s.subscriber_type === 'company').length,
    individuals: subscribers.filter((s) => s.subscriber_type === 'individual').length,
  }), [subscribers]);

  const allSelected = filtered.length > 0 && filtered.every((s) => selected.has(s.id));

  const toggleSelect = (id: string) =>
    setSelected((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });

  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(filtered.map((s) => s.id)));

  const patchSubscriber = async (id: string, patch: Partial<Pick<Subscriber, 'subscriber_type' | 'is_saved'>>) => {
    await updateSubscriber(id, patch);
    setSubscribers((prev) => prev.map((s) => s.id === id ? { ...s, ...patch } : s));
  };

  const removeSubscriber = async (id: string) => {
    await deleteSubscriber(id);
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    setSelected((prev) => { const next = new Set(prev); next.delete(id); return next; });
  };

  const exportCsv = () => {
    const rows = (selected.size > 0 ? filtered.filter((s) => selected.has(s.id)) : filtered);
    const csv = ['Email,Type,Saved,Subscribed At', ...rows.map((s) => `${s.email},${s.subscriber_type},${s.is_saved},${s.subscribed_at}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'newsletter-subscribers.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const saveSettings = () => {
    saveNewsletterSettings(draft);
    setSettings(draft);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  void settings;

  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Email</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Newsletter</h1>
      <p className="mt-3 text-sm text-[var(--color-text-muted)]">Manage the footer sign-up widget and your subscriber list.</p>

      {/* Settings */}
      <section className="mt-10 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:p-8">
        <h2 className="font-display text-3xl tracking-wide">Sign-up widget settings</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="flex items-center justify-between gap-4 border border-[var(--color-border-subtle)] p-4 sm:col-span-2">
            <div><p className="font-medium">Enable newsletter sign-up</p><p className="mt-0.5 text-xs text-[var(--color-text-muted)]">Show the sign-up form in the website footer.</p></div>
            <button type="button" role="switch" aria-checked={draft.enabled} onClick={() => setDraft((d) => ({ ...d, enabled: !d.enabled }))} className={`flex h-8 w-14 items-center rounded-full p-1 transition-colors ${draft.enabled ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-subtle)]'}`}>
              <span className={`h-6 w-6 rounded-full bg-white shadow transition-transform ${draft.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
          <div><label className="mb-2 block text-sm font-medium">Heading</label><input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
          <div><label className="mb-2 block text-sm font-medium">Placeholder text</label><input value={draft.placeholder} onChange={(e) => setDraft((d) => ({ ...d, placeholder: e.target.value }))} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
          <div><label className="mb-2 block text-sm font-medium">Button label</label><input value={draft.buttonLabel} onChange={(e) => setDraft((d) => ({ ...d, buttonLabel: e.target.value }))} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button onClick={saveSettings} className="inline-flex items-center gap-2 bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-fg)]"><Save size={17} />Save settings</button>
          {settingsSaved && <p className="text-sm text-emerald-500">Settings saved.</p>}
        </div>
      </section>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[{ label: 'Total subscribers', value: stats.total }, { label: 'Companies', value: stats.companies }, { label: 'Individuals', value: stats.individuals }].map(({ label, value }) => (
          <div key={label} className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-5">
            <p className="font-display text-4xl tracking-wide">{value}</p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{label}</p>
          </div>
        ))}
      </div>

      {/* Subscriber list */}
      <section className="mt-6 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)]">
        <div className="flex flex-col gap-3 border-b border-[var(--color-border-subtle)] p-4 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-3 border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-2.5">
            <Search size={16} className="text-[var(--color-text-muted)]" />
            <input className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-text-muted)]" placeholder="Search email" value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>
          <div className="flex flex-wrap gap-2">
            {(['all', 'company', 'individual'] as TypeFilter[]).map((f) => (
              <button key={f} onClick={() => setTypeFilter(f)} className={`border px-3 py-2 text-xs font-semibold capitalize transition-colors ${typeFilter === f ? 'border-[var(--color-accent)] bg-[var(--color-accent-dim)] text-[var(--color-accent)]' : 'border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]'}`}>{f}</button>
            ))}
            <button onClick={() => setSavedFilter((v) => !v)} className={`inline-flex items-center gap-1.5 border px-3 py-2 text-xs font-semibold transition-colors ${savedFilter ? 'border-[var(--color-accent)] bg-[var(--color-accent-dim)] text-[var(--color-accent)]' : 'border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]'}`}>
              <BookmarkCheck size={14} />Saved
            </button>
            <button onClick={exportCsv} className="inline-flex items-center gap-1.5 border border-[var(--color-border-subtle)] px-3 py-2 text-xs font-semibold text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
              <Download size={14} />CSV {selected.size > 0 ? `(${selected.size})` : ''}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-[var(--color-accent)]" /></div>
        ) : error ? (
          <p className="px-6 py-10 text-center text-sm text-red-500">{error}</p>
        ) : (
          <>
            <div className="hidden grid-cols-[2rem_1.8fr_0.9fr_0.6fr_0.6fr_2rem] items-center gap-4 border-b border-[var(--color-border-subtle)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] sm:grid">
              <input type="checkbox" checked={allSelected} onChange={toggleAll} className="h-4 w-4 accent-[var(--color-accent)]" />
              <span>Email</span><span>Type</span><span>Saved</span><span>Subscribed</span><span></span>
            </div>
            {filtered.length === 0 ? (
              <p className="px-6 py-12 text-center text-sm text-[var(--color-text-muted)]">No subscribers match your filters.</p>
            ) : (
              filtered.map((sub) => (
                <div key={sub.id} className="grid grid-cols-[2rem_1fr] items-center gap-3 border-b border-[var(--color-border-subtle)] px-5 py-4 last:border-0 sm:grid-cols-[2rem_1.8fr_0.9fr_0.6fr_0.6fr_2rem]">
                  <input type="checkbox" checked={selected.has(sub.id)} onChange={() => toggleSelect(sub.id)} className="h-4 w-4 accent-[var(--color-accent)]" />
                  <p className="truncate text-sm font-medium">{sub.email}</p>
                  <select value={sub.subscriber_type} onChange={(e) => patchSubscriber(sub.id, { subscriber_type: e.target.value as 'individual' | 'company' })} className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-2 py-1 text-xs outline-none focus:border-[var(--color-accent)]">
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                  </select>
                  <button onClick={() => patchSubscriber(sub.id, { is_saved: !sub.is_saved })} className={`flex h-7 w-7 items-center justify-center rounded-sm transition-colors ${sub.is_saved ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-accent)]'}`}>
                    {sub.is_saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>
                  <p className="text-xs text-[var(--color-text-muted)]">{new Date(sub.subscribed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  <button onClick={() => removeSubscriber(sub.id)} className="flex h-7 w-7 items-center justify-center text-[var(--color-text-muted)] hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                </div>
              ))
            )}
          </>
        )}
      </section>
    </div>
  );
}
