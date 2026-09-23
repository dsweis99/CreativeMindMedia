import { FormEvent, useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { getNewsletterSettings, NEWSLETTER_UPDATED_EVENT, type NewsletterSettings } from '../data/newsletter';
import { supabase } from '../lib/supabase';

export function NewsletterSignup() {
  const [settings, setSettings] = useState<NewsletterSettings>(() => getNewsletterSettings());
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const refreshSettings = () => setSettings(getNewsletterSettings());
    window.addEventListener(NEWSLETTER_UPDATED_EVENT, refreshSettings);
    return () => window.removeEventListener(NEWSLETTER_UPDATED_EVENT, refreshSettings);
  }, []);

  if (!settings.enabled) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setIsSubmitting(true);
    setMessage('');
    setIsError(false);

    const { error } = await supabase
      .from(‘newsletter_subscribers’)
      .insert({ email: cleanEmail, subscriber_type: ‘individual’ });

    setIsSubmitting(false);

    if (error) {
      console.error(‘Newsletter subscription error:’, error);
      setIsError(true);
      if (error.code === ‘23505’) {
        setIsError(false);
        setMessage(‘You\’re already subscribed.’);
      } else {
        setMessage(error.message);
      }
      return;
    }

    setEmail(‘’);
    setMessage("You’re subscribed — thank you.");
  };

  return (
    <div>
      <h2 className="font-display text-xl leading-tight tracking-wider lg:mt-3">{settings.title}</h2>
      <form onSubmit={submit} className="mt-4 flex">
        <label className="sr-only" htmlFor="footerNewsletterEmail">Email address</label>
        <input id="footerNewsletterEmail" type="email" required value={email} disabled={isSubmitting} onChange={(event) => { setEmail(event.target.value); setMessage(''); setIsError(false); }} placeholder={settings.placeholder} className="min-w-0 flex-1 border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-2 text-xs text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]" />
        <button type="submit" disabled={isSubmitting} className="shrink-0 bg-[var(--color-accent)] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-accent-fg)] transition-opacity hover:opacity-90 disabled:opacity-60">{isSubmitting ? 'Sending...' : settings.buttonLabel}</button>
      </form>
      {message && <p className={`mt-3 flex items-start gap-1.5 text-xs leading-relaxed ${isError ? 'text-red-500' : 'text-emerald-500'}`}>{isError ? <AlertCircle size={14} className="mt-0.5 shrink-0" /> : <CheckCircle2 size={14} className="mt-0.5 shrink-0" />}{message}</p>}
    </div>
  );
}
