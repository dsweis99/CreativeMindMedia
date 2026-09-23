import { useEffect, useState } from 'react';
import { Eye, EyeOff, Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { featuredOfferPresets, type CampaignExample, type CampaignExampleType, type FeaturedOffer } from '../../data/featuredOffer';
import { useFeaturedOffer } from '../../hooks/useFeaturedOffer';
import { fetchCampaigns, upsertCampaign } from '../../lib/db';

export function AdminCampaigns() {
  const { offer, saveOffer } = useFeaturedOffer();
  const [draft, setDraft] = useState<FeaturedOffer>(offer);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dbId, setDbId] = useState<string | undefined>(undefined);

  useEffect(() => setDraft(offer), [offer]);

  // Load the most-recent campaign from Supabase on mount
  useEffect(() => {
    fetchCampaigns().then(({ data }) => {
      if (data && data.length > 0) {
        const row = data[0] as { id: string; campaign_type: string; eyebrow: string; headline: string; description: string; button_label: string; form_prompt: string; examples: CampaignExample[]; active: boolean };
        setDbId(row.id);
        const loaded: FeaturedOffer = {
          ...offer,
          campaignType: row.campaign_type ?? offer.campaignType,
          eyebrow: row.eyebrow ?? offer.eyebrow,
          title: row.headline ?? offer.title,
          description: row.description ?? offer.description,
          buttonLabel: row.button_label ?? offer.buttonLabel,
          formPrompt: row.form_prompt ?? offer.formPrompt,
          examples: row.examples ?? offer.examples,
          enabled: row.active ?? offer.enabled,
        };
        setDraft(loaded);
        saveOffer(loaded);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const update = (field: keyof FeaturedOffer, value: string | boolean) => { setDraft((current) => ({ ...current, [field]: value })); setSaved(false); };
  const addExample = () => {
    const newExample: CampaignExample = { id: crypto.randomUUID(), type: 'video', title: 'New video example', description: '', mediaUrl: '', actionUrl: '' };
    setDraft((current) => ({ ...current, examples: [...current.examples, newExample] }));
    setSaved(false);
  };
  const updateExample = (id: string, field: keyof CampaignExample, value: string) => {
    setDraft((current) => ({ ...current, examples: current.examples.map((item) => item.id === id ? { ...item, [field]: value } : item) }));
    setSaved(false);
  };
  const removeExample = (id: string) => { setDraft((current) => ({ ...current, examples: current.examples.filter((item) => item.id !== id) })); setSaved(false); };

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
            <div className="border-t border-[var(--color-border-subtle)] pt-8">
              <div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-4xl tracking-wide">Campaign examples</h2><p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">These appear below the campaign on the Home page. Add video examples for a free video offer, or audit examples when the offer is an audit.</p></div><button type="button" role="switch" aria-checked={draft.examplesEnabled} onClick={() => update('examplesEnabled', !draft.examplesEnabled)} className={`flex h-9 w-16 shrink-0 items-center rounded-full p-1 transition-colors ${draft.examplesEnabled ? 'justify-end bg-[var(--color-accent)]' : 'justify-start bg-[var(--color-border-subtle)]'}`}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-bg-primary)]">{draft.examplesEnabled ? <Eye size={15} /> : <EyeOff size={15} />}</span></button></div>
              <div className="mt-6 space-y-5"><div><label className="mb-2 block text-sm font-medium" htmlFor="examplesHeading">Examples heading</label><input id="examplesHeading" value={draft.examplesHeading} onChange={(event) => update('examplesHeading', event.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div><div><label className="mb-2 block text-sm font-medium" htmlFor="examplesDescription">Examples description</label><textarea id="examplesDescription" rows={2} value={draft.examplesDescription} onChange={(event) => update('examplesDescription', event.target.value)} className="w-full resize-none border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div></div>
              <div className="mt-6 space-y-4">{draft.examples.map((example, index) => <div key={example.id} className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] p-5"><div className="flex items-center justify-between gap-4"><p className="font-semibold">Example {index + 1}</p><button type="button" onClick={() => removeExample(example.id)} className="p-2 text-[var(--color-text-muted)] hover:text-red-500" aria-label={`Delete example ${index + 1}`}><Trash2 size={17} /></button></div><div className="mt-4 grid gap-4 sm:grid-cols-2"><div><label className="mb-2 block text-xs font-medium" htmlFor={`example-type-${example.id}`}>Example type</label><select id={`example-type-${example.id}`} value={example.type} onChange={(event) => updateExample(example.id, 'type', event.target.value as CampaignExampleType)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-3 text-sm outline-none focus:border-[var(--color-accent)]"><option value="video">Video</option><option value="audit">Audit</option><option value="image">Image / work</option></select></div><div><label className="mb-2 block text-xs font-medium" htmlFor={`example-title-${example.id}`}>Title</label><input id={`example-title-${example.id}`} value={example.title} onChange={(event) => updateExample(example.id, 'title', event.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div></div><div className="mt-4"><label className="mb-2 block text-xs font-medium" htmlFor={`example-media-${example.id}`}>{example.type === 'video' ? 'Direct MP4 video link' : 'Image link'}</label><input id={`example-media-${example.id}`} value={example.mediaUrl} onChange={(event) => updateExample(example.id, 'mediaUrl', event.target.value)} placeholder={example.type === 'video' ? 'https://.../video.mp4' : 'https://.../image.jpg'} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div><div className="mt-4"><label className="mb-2 block text-xs font-medium" htmlFor={`example-description-${example.id}`}>Short description</label><input id={`example-description-${example.id}`} value={example.description} onChange={(event) => updateExample(example.id, 'description', event.target.value)} placeholder="What should the visitor notice?" className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div><div className="mt-4"><label className="mb-2 block text-xs font-medium" htmlFor={`example-action-${example.id}`}>Optional button link</label><input id={`example-action-${example.id}`} value={example.actionUrl} onChange={(event) => updateExample(example.id, 'actionUrl', event.target.value)} placeholder="https://..." className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div></div>)}
                <button type="button" onClick={addExample} className="inline-flex items-center gap-2 border border-[var(--color-border-subtle)] px-4 py-3 text-sm font-semibold hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"><Plus size={17} />Add example</button>
              </div>
            </div>
            <button type="button" disabled={saving} onClick={async () => {
              setSaving(true);
              saveOffer(draft);
              await upsertCampaign({
                ...(dbId ? { id: dbId } : {}),
                campaign_type: draft.campaignType,
                eyebrow: draft.eyebrow,
                headline: draft.title,
                description: draft.description,
                button_label: draft.buttonLabel,
                form_prompt: draft.formPrompt,
                examples: draft.examples,
                active: draft.enabled,
              });
              setSaving(false);
              setSaved(true);
            }} className="inline-flex items-center gap-2 bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-fg)] disabled:opacity-60">
              {saving ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}
              Save campaign
            </button>{saved && <p className="mt-3 text-sm text-emerald-500">Saved to Supabase. Refresh the Home page to see changes.</p>}
          </div>
        </section>
        <aside className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6"><h2 className="font-display text-3xl tracking-wide">Quick templates</h2><p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">Start from one of these, then adjust the wording as you need.</p><div className="mt-6 space-y-3">{featuredOfferPresets.map((preset) => <button type="button" key={preset.campaignType} onClick={() => { setDraft(preset); setSaved(false); }} className={`w-full border p-4 text-left transition-colors ${draft.campaignType === preset.campaignType ? 'border-[var(--color-accent)] bg-[var(--color-accent-dim)]' : 'border-[var(--color-border-subtle)] hover:border-[var(--color-accent)]'}`}><p className="font-semibold">{preset.campaignType}</p><p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">{preset.buttonLabel}</p></button>)}</div></aside>
      </div>
    </div>
  );
}
