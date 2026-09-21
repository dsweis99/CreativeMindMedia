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
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const subscribeToNewsletter = (email: string): 'added' | 'exists' => {
  const subscribers = getNewsletterSubscribers();
  if (subscribers.some((subscriber) => subscriber.email.toLowerCase() === email.toLowerCase())) return 'exists';
  const next = [{ id: crypto.randomUUID(), email, subscribedAt: new Date().toISOString() }, ...subscribers];
  localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(NEWSLETTER_UPDATED_EVENT));
  return 'added';
};
