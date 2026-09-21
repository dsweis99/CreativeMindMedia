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
    <section className="border-b border-[var(--color-border-subtle)] pb-16">
      <div className="max-w-2xl">
        <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-4xl">{settings.title}</h2>
        <form onSubmit={submit} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="footerNewsletterEmail">Email address</label>
          <input id="footerNewsletterEmail" type="email" required value={email} onChange={(event) => { setEmail(event.target.value); setMessage(''); }} placeholder={settings.placeholder} className="min-h-12 flex-1 border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]" />
          <button type="submit" className="min-h-12 bg-[var(--color-accent)] px-7 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-fg)] transition-opacity hover:opacity-90">{settings.buttonLabel}</button>
        </form>
        {message && <p className="mt-3 flex items-center gap-2 text-sm text-emerald-500"><CheckCircle2 size={16} />{message}</p>}
      </div>
    </section>
  );
}
