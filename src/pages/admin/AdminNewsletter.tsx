import { useEffect, useMemo, useState } from 'react';
import { Bookmark, Download, Eye, EyeOff, Save, Search, UsersRound } from 'lucide-react';
import { getNewsletterSettings, getNewsletterSubscribers, NEWSLETTER_UPDATED_EVENT, saveNewsletterSettings, saveNewsletterSubscribers, type NewsletterSettings, type NewsletterSubscriber } from '../../data/newsletter';

type SubscriberFilter = 'all' | 'individual' | 'company' | 'saved';
const csvCell = (value: string) => `"${value.replaceAll('"', '""')}"`;

export function AdminNewsletter() {
  const [draft, setDraft] = useState<NewsletterSettings>(() => getNewsletterSettings());
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => getNewsletterSubscribers());
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState<SubscriberFilter>('all');
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setSubscribers(getNewsletterSubscribers());
    window.addEventListener(NEWSLETTER_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(NEWSLETTER_UPDATED_EVENT, refresh);
  }, []);

  const filteredSubscribers = useMemo(() => subscribers.filter((subscriber) => {
    const matchesFilter = filter === 'all' || filter === subscriber.type || (filter === 'saved' && subscriber.saved);
    return matchesFilter && subscriber.email.toLowerCase().includes(query.toLowerCase());
  }), [filter, query, subscribers]);

  const update = (field: keyof NewsletterSettings, value: string | boolean) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const updateSubscriber = (id: string, updates: Partial<NewsletterSubscriber>) => {
    const next = subscribers.map((subscriber) => subscriber.id === id ? { ...subscriber, ...updates } : subscriber);
    setSubscribers(next);
    saveNewsletterSubscribers(next);
  };

  const toggleSelected = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const toggleAll = () => setSelectedIds((current) => filteredSubscribers.every((subscriber) => current.includes(subscriber.id)) ? current.filter((id) => !filteredSubscribers.some((subscriber) => subscriber.id === id)) : [...new Set([...current, ...filteredSubscribers.map((subscriber) => subscriber.id)])]);
  const selectedSubscribers = selectedIds.length ? subscribers.filter((subscriber) => selectedIds.includes(subscriber.id)) : filteredSubscribers;

  const exportCsv = () => {
    const rows = [['Email', 'Type', 'Saved', 'Subscribed at'], ...selectedSubscribers.map((subscriber) => [subscriber.email, subscriber.type === 'company' ? 'Company' : 'Individual', subscriber.saved ? 'Yes' : 'No', new Date(subscriber.subscribedAt).toLocaleString()])];
    const blob = new Blob([rows.map((row) => row.map(csvCell).join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cmm-newsletter-subscribers.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Audience growth</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Newsletter</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">Manage the email sign-up section, group subscribers, and export a list for your outreach.</p>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-4xl tracking-wide">Footer sign-up</h2><p className="mt-2 text-sm text-[var(--color-text-muted)]">Show or hide it without removing any footer links.</p></div><button type="button" role="switch" aria-checked={draft.enabled} onClick={() => update('enabled', !draft.enabled)} className={`flex h-9 w-16 shrink-0 items-center rounded-full p-1 transition-colors ${draft.enabled ? 'justify-end bg-[var(--color-accent)]' : 'justify-start bg-[var(--color-border-subtle)]'}`}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-bg-primary)]">{draft.enabled ? <Eye size={15} /> : <EyeOff size={15} />}</span></button></div>
          <div className="mt-8 space-y-5">
            <div><label htmlFor="newsletterTitle" className="mb-2 block text-sm font-medium">Heading</label><textarea id="newsletterTitle" rows={2} value={draft.title} onChange={(event) => update('title', event.target.value)} className="w-full resize-none border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
            <div><label htmlFor="newsletterPlaceholder" className="mb-2 block text-sm font-medium">Email field placeholder</label><input id="newsletterPlaceholder" value={draft.placeholder} onChange={(event) => update('placeholder', event.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
            <div><label htmlFor="newsletterButton" className="mb-2 block text-sm font-medium">Button label</label><input id="newsletterButton" value={draft.buttonLabel} onChange={(event) => update('buttonLabel', event.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
            <button type="button" onClick={() => { saveNewsletterSettings(draft); setSaved(true); }} className="inline-flex items-center gap-2 bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-fg)]"><Save size={17} />Save newsletter</button>
            {saved && <p className="text-sm text-emerald-500">Saved. The Footer updates immediately in this browser.</p>}
          </div>
        </section>
        <aside className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:p-8"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent-dim)] text-[var(--color-accent)]"><UsersRound size={20} /></div><p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Subscribers</p><p className="mt-1 font-display text-6xl tracking-wide">{subscribers.length}</p><div className="mt-5 grid grid-cols-2 gap-3 border-t border-[var(--color-border-subtle)] pt-5 text-sm"><p><span className="block text-xl font-semibold">{subscribers.filter((subscriber) => subscriber.type === 'company').length}</span><span className="text-[var(--color-text-muted)]">Companies</span></p><p><span className="block text-xl font-semibold">{subscribers.filter((subscriber) => subscriber.type === 'individual').length}</span><span className="text-[var(--color-text-muted)]">Individuals</span></p></div><p className="mt-6 text-xs leading-relaxed text-[var(--color-text-muted)]">Company/individual is initially estimated from the email domain. You can change it manually in the list.</p></aside>
      </div>
      <section className="mt-5 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)]">
        <div className="border-b border-[var(--color-border-subtle)] p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><h2 className="font-display text-4xl tracking-wide">Subscriber list</h2><p className="mt-1 text-sm text-[var(--color-text-muted)]">Filter, save, select, or export your list.</p></div><button type="button" onClick={exportCsv} disabled={!selectedSubscribers.length} className="inline-flex items-center justify-center gap-2 border border-[var(--color-border-subtle)] px-4 py-3 text-sm font-semibold transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-40"><Download size={17} />Export {selectedIds.length ? `${selectedIds.length} selected` : 'filtered'} CSV</button></div><div className="mt-6 flex flex-col gap-3 lg:flex-row"><label className="flex min-w-0 flex-1 items-center gap-2 border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3"><Search size={17} className="text-[var(--color-text-muted)]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search an email" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" /></label><div className="flex flex-wrap gap-2">{(['all', 'company', 'individual', 'saved'] as SubscriberFilter[]).map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={`px-3 py-2 text-xs font-semibold capitalize transition-colors ${filter === item ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]' : 'border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]'}`}>{item === 'all' ? 'All' : item === 'company' ? 'Companies' : item === 'individual' ? 'Individuals' : 'Saved'}</button>)}</div></div></div>
        {filteredSubscribers.length ? <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-[var(--color-border-subtle)] text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]"><tr><th className="w-12 px-5 py-4"><input type="checkbox" aria-label="Select all filtered subscribers" checked={filteredSubscribers.every((subscriber) => selectedIds.includes(subscriber.id))} onChange={toggleAll} /></th><th className="px-3 py-4">Email</th><th className="px-3 py-4">Type</th><th className="px-3 py-4">Saved</th><th className="px-3 py-4">Received</th></tr></thead><tbody className="divide-y divide-[var(--color-border-subtle)]">{filteredSubscribers.map((subscriber) => <tr key={subscriber.id}><td className="px-5 py-4"><input type="checkbox" aria-label={`Select ${subscriber.email}`} checked={selectedIds.includes(subscriber.id)} onChange={() => toggleSelected(subscriber.id)} /></td><td className="px-3 py-4 font-medium">{subscriber.email}</td><td className="px-3 py-4"><select value={subscriber.type} onChange={(event) => updateSubscriber(subscriber.id, { type: event.target.value as NewsletterSubscriber['type'] })} className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-2 py-1.5 text-xs outline-none focus:border-[var(--color-accent)]"><option value="company">Company</option><option value="individual">Individual</option></select></td><td className="px-3 py-4"><button type="button" onClick={() => updateSubscriber(subscriber.id, { saved: !subscriber.saved })} className={`inline-flex items-center gap-1.5 text-xs font-semibold ${subscriber.saved ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-accent)]'}`}><Bookmark size={16} fill={subscriber.saved ? 'currentColor' : 'none'} />{subscriber.saved ? 'Saved' : 'Save'}</button></td><td className="px-3 py-4 text-xs text-[var(--color-text-muted)]">{new Date(subscriber.subscribedAt).toLocaleString()}</td></tr>)}</tbody></table></div> : <p className="p-6 text-sm text-[var(--color-text-muted)]">No subscribers match this filter.</p>}
      </section>
    </div>
  );
}
