import { useState } from 'react';
import { Eye, EyeOff, FileText, Pencil, Save } from 'lucide-react';

type PageId = 'home' | 'about' | 'work' | 'services' | 'contact';

const pages: Array<{ id: PageId; name: string; description: string; sections: string[]; title: string; intro: string }> = [
  { id: 'home', name: 'Home', description: 'The first impression of CMM.', sections: ['Hero banner', 'Services', 'Featured work', 'Call to action'], title: 'Strategy that starts with seeing.', intro: 'We help businesses turn unclear ideas into brands and digital experiences people remember.' },
  { id: 'about', name: 'About', description: 'Your story, values, and approach.', sections: ['Hero banner', 'Our story', 'Values', 'Call to action'], title: 'We see what others miss.', intro: 'A closer look at the thinking and people behind Creative Minds Media.' },
  { id: 'work', name: 'Work', description: 'Projects and case studies.', sections: ['Hero banner', 'Project filters', 'Case studies', 'Call to action'], title: 'Work that works.', intro: 'A selection of the brands and businesses we have helped move forward.' },
  { id: 'services', name: 'Services', description: 'What CMM offers clients.', sections: ['Hero banner', 'Service areas', 'Process', 'Call to action'], title: 'Built around what your brand needs.', intro: 'Strategy, creative, and digital support designed to work together.' },
  { id: 'contact', name: 'Contact', description: 'Contact details and quote request.', sections: ['Hero banner', 'Contact information', 'Quote request form', 'FAQs', 'Location'], title: 'Start your project.', intro: 'Tell us what you are building and we will take it from there.' },
];

export function AdminContent() {
  const [selectedPage, setSelectedPage] = useState<PageId>('home');
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>(() => Object.fromEntries(pages.flatMap((page) => page.sections.map((section) => [`${page.id}-${section}`, true]))));
  const [content, setContent] = useState(() => Object.fromEntries(pages.map((page) => [page.id, { title: page.title, intro: page.intro }])) as Record<PageId, { title: string; intro: string }>);
  const [saved, setSaved] = useState(false);

  const page = pages.find((item) => item.id === selectedPage)!;
  const pageContent = content[selectedPage];

  const updateContent = (field: 'title' | 'intro', value: string) => {
    setContent((current) => ({ ...current, [selectedPage]: { ...current[selectedPage], [field]: value } }));
    setSaved(false);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Website manager</p>
      <div className="mt-2 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h1 className="font-display text-5xl tracking-wide sm:text-6xl">Website Content</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">Manage what appears on your public website. Choose a page, edit its key content, or turn individual sections on and off.</p></div><span className="w-fit border border-[var(--color-accent)]/30 bg-[var(--color-accent-dim)] px-3 py-2 text-xs font-semibold text-[var(--color-accent)]">Supabase connection pending</span></div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.6fr]">
        <section className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-4 sm:p-5">
          <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Choose a page</p>
          <div className="space-y-2">{pages.map((item) => <button key={item.id} type="button" onClick={() => { setSelectedPage(item.id); setSaved(false); }} className={`w-full border p-4 text-left transition-colors ${selectedPage === item.id ? 'border-[var(--color-accent)] bg-[var(--color-accent-dim)]' : 'border-transparent hover:border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-secondary)]'}`}><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{item.name}</p><p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">{item.description}</p></div><Pencil size={16} className={selectedPage === item.id ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'} /></div></button>)}</div>
        </section>

        <div className="space-y-5">
          <section className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:p-8">
            <div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-dim)] text-[var(--color-accent)]"><FileText size={20} /></div><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">Editing {page.name}</p><h2 className="mt-1 font-display text-4xl tracking-wide">Page content</h2><p className="mt-2 text-sm text-[var(--color-text-muted)]">Change the main heading and supporting text for this page.</p></div></div>
            <div className="mt-8 space-y-6"><div><label htmlFor="pageTitle" className="mb-2 block text-sm font-medium">Main heading</label><input id="pageTitle" value={pageContent.title} onChange={(event) => updateContent('title', event.target.value)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm focus:border-[var(--color-accent)] focus:outline-none" /></div><div><label htmlFor="pageIntro" className="mb-2 block text-sm font-medium">Supporting text</label><textarea id="pageIntro" rows={4} value={pageContent.intro} onChange={(event) => updateContent('intro', event.target.value)} className="w-full resize-none border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm leading-relaxed focus:border-[var(--color-accent)] focus:outline-none" /></div><div className="flex flex-wrap items-center gap-4"><button type="button" onClick={() => setSaved(true)} className="inline-flex items-center gap-2 bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-fg)] transition-opacity hover:opacity-90"><Save size={17} />Save changes</button>{saved && <p className="text-sm text-emerald-500">Saved in this admin preview.</p>}</div></div>
          </section>

          <section className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:p-8"><h2 className="font-display text-4xl tracking-wide">Section visibility</h2><p className="mt-2 text-sm text-[var(--color-text-muted)]">Turn a section on to show it, or off to hide it from the page.</p><div className="mt-7 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">{page.sections.map((section) => { const key = `${page.id}-${section}`; const isVisible = visibleSections[key]; return <div key={key} className="flex items-center justify-between gap-5 py-4"><div><p className="font-medium">{section}</p><p className="mt-1 text-xs text-[var(--color-text-muted)]">{isVisible ? 'Visible on the website' : 'Hidden from the website'}</p></div><button type="button" role="switch" aria-checked={isVisible} aria-label={`Toggle ${section}`} onClick={() => { setVisibleSections((current) => ({ ...current, [key]: !current[key] })); setSaved(false); }} className={`flex h-9 w-16 items-center rounded-full p-1 transition-colors ${isVisible ? 'justify-end bg-[var(--color-accent)]' : 'justify-start bg-[var(--color-border-subtle)]'}`}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">{isVisible ? <Eye size={15} /> : <EyeOff size={15} />}</span></button></div>; })}</div></section>
        </div>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-[var(--color-text-muted)]">When Supabase is connected, these controls will save securely and publish the changes to the public website. Until then, this is the management interface and preview workflow.</p>
    </div>
  );
}
