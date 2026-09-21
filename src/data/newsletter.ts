export type NewsletterSettings = {
  enabled: boolean;
  title: string;
  placeholder: string;
  buttonLabel: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  subscribedAt: string;
  type: 'individual' | 'company';
  saved: boolean;
};

const SETTINGS_KEY = 'cmm-newsletter-settings';
const SUBSCRIBERS_KEY = 'cmm-newsletter-subscribers';
export const NEWSLETTER_UPDATED_EVENT = 'cmm-newsletter-updated';

export const defaultNewsletterSettings: NewsletterSettings = {
  enabled: true,
  title: 'Sign up to get news, latest releases and more…',
  placeholder: 'email@domain.com',
  buttonLabel: 'Subscribe',
};

export const getNewsletterSettings = (): NewsletterSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...defaultNewsletterSettings, ...JSON.parse(stored) } : defaultNewsletterSettings;
  } catch {
    return defaultNewsletterSettings;
  }
};

export const saveNewsletterSettings = (settings: NewsletterSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event(NEWSLETTER_UPDATED_EVENT));
};

export const getNewsletterSubscribers = (): NewsletterSubscriber[] => {
  try {
    const stored = localStorage.getItem(SUBSCRIBERS_KEY);
    const subscribers = stored ? JSON.parse(stored) : [];
    return subscribers.map((subscriber: Partial<NewsletterSubscriber> & { email: string }) => ({
      ...subscriber,
      type: subscriber.type ?? getSubscriberTypeFromEmail(subscriber.email),
      saved: subscriber.saved ?? false,
    }));
  } catch {
    return [];
  }
};

const personalEmailDomains = new Set(['gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com', 'yahoo.com', 'icloud.com', 'aol.com', 'proton.me', 'protonmail.com']);
export const getSubscriberTypeFromEmail = (email: string): NewsletterSubscriber['type'] => personalEmailDomains.has(email.split('@')[1]?.toLowerCase()) ? 'individual' : 'company';

export const saveNewsletterSubscribers = (subscribers: NewsletterSubscriber[]) => {
  localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(subscribers));
  window.dispatchEvent(new Event(NEWSLETTER_UPDATED_EVENT));
};

export const subscribeToNewsletter = (email: string): 'added' | 'exists' => {
  const subscribers = getNewsletterSubscribers();
  if (subscribers.some((subscriber) => subscriber.email.toLowerCase() === email.toLowerCase())) return 'exists';
  const next = [{ id: crypto.randomUUID(), email, subscribedAt: new Date().toISOString(), type: getSubscriberTypeFromEmail(email), saved: false }, ...subscribers];
  saveNewsletterSubscribers(next);
  return 'added';
};
