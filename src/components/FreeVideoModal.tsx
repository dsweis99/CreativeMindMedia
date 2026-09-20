import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

type FreeVideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FreeVideoModal({ isOpen, onClose }: FreeVideoModalProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) setSubmitted(false);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-end bg-black/70 p-0 sm:items-center sm:justify-center sm:p-6" onClick={onClose}>
        <motion.section role="dialog" aria-modal="true" aria-labelledby="free-video-title" initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 32, opacity: 0 }} className="relative max-h-[92vh] w-full overflow-y-auto bg-[var(--color-bg-primary)] sm:max-w-xl" onClick={(event) => event.stopPropagation()}>
          <button type="button" onClick={onClose} className="absolute right-5 top-5 rounded-full border border-[var(--color-border-subtle)] p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]" aria-label="Close free video form"><X size={20} /></button>
          {!submitted ? <div className="p-7 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Limited availability</p><h2 id="free-video-title" className="mt-3 pr-12 font-display text-5xl tracking-wide sm:text-6xl">Book a Free Video.</h2><p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">Tell us a little about your business. We’ll review your request and confirm the next step by email.</p><form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="freeVideoName" className="mb-2 block text-sm font-medium">Name <span className="text-[var(--color-accent)]">*</span></label><input id="freeVideoName" required placeholder="e.g. Jane Doe" className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]" /></div><div><label htmlFor="freeVideoBusiness" className="mb-2 block text-sm font-medium">Business name <span className="text-[var(--color-accent)]">*</span></label><input id="freeVideoBusiness" required placeholder="e.g. Rose City Coffee" className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]" /></div></div><div><label htmlFor="freeVideoEmail" className="mb-2 block text-sm font-medium">Email address <span className="text-[var(--color-accent)]">*</span></label><input id="freeVideoEmail" type="email" required placeholder="e.g. you@company.com" className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]" /></div><div><label htmlFor="freeVideoWebsite" className="mb-2 block text-sm font-medium">Instagram or website <span className="text-[var(--color-text-muted)]">(optional)</span></label><input id="freeVideoWebsite" placeholder="e.g. @yourbusiness" className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]" /></div><div><label htmlFor="freeVideoDetails" className="mb-2 block text-sm font-medium">What would you like to promote? <span className="text-[var(--color-accent)]">*</span></label><textarea id="freeVideoDetails" required rows={4} placeholder="Tell us about your business, offer, or campaign." className="w-full resize-none border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]" /></div><button type="submit" className="w-full bg-[var(--color-accent)] px-5 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-fg)] transition-opacity hover:opacity-90">Send Free Video Request</button></form><p className="mt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">No obligation. We’ll only use these details to respond to your request.</p></div> : <div className="p-10 text-center sm:p-14"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-dim)] text-[var(--color-accent)]"><CheckCircle2 size={28} /></div><h2 className="mt-6 font-display text-5xl tracking-wide">Request received.</h2><p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-text-muted)]">Thanks — we’ll review your business and get back to you by email.</p><button type="button" onClick={onClose} className="mt-8 border border-[var(--color-border-subtle)] px-5 py-3 text-sm font-semibold transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">Close</button></div>}
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  );
}
