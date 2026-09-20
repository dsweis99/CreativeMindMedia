import { useEffect, useState } from 'react';
import { Eye, EyeOff, Save } from 'lucide-react';
import { featuredOfferPresets, type FeaturedOffer } from '../../data/featuredOffer';
import { useFeaturedOffer } from '../../hooks/useFeaturedOffer';

export function AdminCampaigns() {
  const { offer, saveOffer } = useFeaturedOffer();
  const [draft, setDraft] = useState<FeaturedOffer>(offer);
  const [saved, setSaved] = useState(false);
  useEffect(() => setDraft(offer), [offer]);
  const update = (field: keyof FeaturedOffer, value: string | boolean) => { setDraft((current) => ({ ...current, [field]: value })); setSaved(false); };

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Lead generation</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Featured Campaign</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">Run one clear offer at a time. Its copy and booking pop-up update automatically on the Home page.</p>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4"><div><h2 className="font-display text-4xl tracking-wide">Current offer</h2><p className="mt-1 text-sm text-[var(--color-text-muted)]">Show or hide it from the Home page.</p></div><button type="button" role="switch" aria-checked={draft.enabled} onClick={() => update('enabled', !draft.enabled)} className={`flex h-9 w-16 items-center rounded-full p-1 transition-colors ${draft.enabled ? 'justify-end bg-[var(--color-accent)]' : 'justify-start bg-[var(--color-border-subtle)]'}`}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-bg-primary)]">{draft.enabled ? <Eye size={15} /> : <EyeOff size={15} />}</span></button></div>
          <div className="mt-8 space-y-5">
            <div><label className="mb-2 block text-sm font-medium" htmlFor="campaignType">Offer type</label><input id="campaignType" value={draft.campaignType} onChange={(event) => update('campaignType', event.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
            <div><label className="mb-2 block text-sm font-medium" htmlFor="campaignEyebrow">Small label</label><input id="campaignEyebrow" value={draft.eyebrow} onChange={(event) => update('eyebrow', event.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
            <div><label className="mb-2 block text-sm font-medium" htmlFor="campaignTitle">Headline</label><textarea id="campaignTitle" rows={3} value={draft.title} onChange={(event) => update('title', event.target.value)} className="w-full resize-none border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
            <div><label className="mb-2 block text-sm font-medium" htmlFor="campaignDescription">Description</label><textarea id="campaignDescription" rows={4} value={draft.description} onChange={(event) => update('description', event.target.value)} className="w-full resize-none border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
            <div><label className="mb-2 block text-sm font-medium" htmlFor="campaignButton">Button label</label><input id="campaignButton" value={draft.buttonLabel} onChange={(event) => update('buttonLabel', event.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
            <div><label className="mb-2 block text-sm font-medium" htmlFor="campaignPrompt">Question inside pop-up</label><input id="campaignPrompt" value={draft.formPrompt} onChange={(event) => update('formPrompt', event.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div>
            <button type="button" onClick={() => { saveOffer(draft); setSaved(true); }} className="inline-flex items-center gap-2 bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-fg)]"><Save size={17} />Save campaign</button>{saved && <p className="mt-3 text-sm text-emerald-500">Saved. Refresh the Home page to see the current campaign.</p>}
          </div>
        </section>
        <aside className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6"><h2 className="font-display text-3xl tracking-wide">Quick templates</h2><p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">Start from one of these, then adjust the wording as you need.</p><div className="mt-6 space-y-3">{featuredOfferPresets.map((preset) => <button type="button" key={preset.campaignType} onClick={() => { setDraft(preset); setSaved(false); }} className={`w-full border p-4 text-left transition-colors ${draft.campaignType === preset.campaignType ? 'border-[var(--color-accent)] bg-[var(--color-accent-dim)]' : 'border-[var(--color-border-subtle)] hover:border-[var(--color-accent)]'}`}><p className="font-semibold">{preset.campaignType}</p><p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">{preset.buttonLabel}</p></button>)}</div></aside>
      </div>
    </div>
  );
}
