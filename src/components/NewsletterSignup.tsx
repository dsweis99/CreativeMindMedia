import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { getNewsletterSettings, NEWSLETTER_UPDATED_EVENT, subscribeToNewsletter, type NewsletterSettings } from '../data/newsletter';

export function NewsletterSignup() {
  const [settings, setSettings] = useState<NewsletterSettings>(() => getNewsletterSettings());
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const refreshSettings = () => setSettings(getNewsletterSettings());
    window.addEventListener(NEWSLETTER_UPDATED_EVENT, refreshSettings);
    return () => window.removeEventListener(NEWSLETTER_UPDATED_EVENT, refreshSettings);
  }, []);

  if (!settings.enabled) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;
    const result = subscribeToNewsletter(trimmedEmail);
    setMessage(result === 'added' ? 'You are subscribed — thank you.' : 'This email is already subscribed.');
    if (result === 'added') setEmail('');
  };

  return (
    <div>
      <h2 className="font-display text-xl leading-tight tracking-wider lg:mt-3">{settings.title}</h2>
      <form onSubmit={submit} className="mt-4 flex">
        <label className="sr-only" htmlFor="footerNewsletterEmail">Email address</label>
        <input id="footerNewsletterEmail" type="email" required value={email} onChange={(event) => { setEmail(event.target.value); setMessage(''); }} placeholder={settings.placeholder} className="min-w-0 flex-1 border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-2 text-xs text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]" />
        <button type="submit" className="shrink-0 bg-[var(--color-accent)] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-accent-fg)] transition-opacity hover:opacity-90">{settings.buttonLabel}</button>
      </form>
      {message && <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-emerald-500"><CheckCircle2 size={14} className="mt-0.5 shrink-0" />{message}</p>}
    </div>
  );
}
