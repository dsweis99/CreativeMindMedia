import { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Save, UsersRound } from 'lucide-react';
import { getNewsletterSettings, getNewsletterSubscribers, saveNewsletterSettings, type NewsletterSettings, type NewsletterSubscriber } from '../../data/newsletter';

export function AdminNewsletter() {
  const [draft, setDraft] = useState<NewsletterSettings>(() => getNewsletterSettings());
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => getNewsletterSubscribers());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const refresh = () => setSubscribers(getNewsletterSubscribers());
    window.addEventListener('cmm-newsletter-updated', refresh);
    return () => window.removeEventListener('cmm-newsletter-updated', refresh);
  }, []);

  const update = (field: keyof NewsletterSettings, value: string | boolean) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Audience growth</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Newsletter</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">Manage the email sign-up section in your public footer and review people who subscribed.</p>

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

        <aside className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:p-8"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent-dim)] text-[var(--color-accent)]"><UsersRound size={20} /></div><p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Subscribers</p><p className="mt-1 font-display text-6xl tracking-wide">{subscribers.length}</p><p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">New email addresses collected from the Footer form on this browser.</p><p className="mt-7 border-t border-[var(--color-border-subtle)] pt-5 text-xs leading-relaxed text-[var(--color-text-muted)]">When Supabase is connected, this becomes a shared subscriber list that you can export or connect to an email platform.</p></aside>
      </div>

      <section className="mt-5 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)]"><div className="flex items-center justify-between gap-4 border-b border-[var(--color-border-subtle)] p-6"><div><h2 className="font-display text-4xl tracking-wide">Subscriber list</h2><p className="mt-1 text-sm text-[var(--color-text-muted)]">Newest subscriptions first.</p></div><Mail className="text-[var(--color-accent)]" size={22} /></div>{subscribers.length ? <div className="divide-y divide-[var(--color-border-subtle)]">{subscribers.map((subscriber) => <div key={subscriber.id} className="flex flex-col justify-between gap-1 p-5 sm:flex-row sm:items-center"><p className="font-medium">{subscriber.email}</p><p className="text-xs text-[var(--color-text-muted)]">{new Date(subscriber.subscribedAt).toLocaleString()}</p></div>)}</div> : <p className="p-6 text-sm text-[var(--color-text-muted)]">No one has subscribed yet.</p>}</section>
    </div>
  );
}
