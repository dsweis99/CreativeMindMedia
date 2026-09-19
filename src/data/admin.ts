export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Won' | 'Lost';

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  source: string;
  status: LeadStatus;
  receivedAt: string;
  message: string;
};

export const demoLeads: Lead[] = [
  { id: 'LD-1048', name: 'Maya Rodriguez', company: 'Rose City Coffee', email: 'maya@rosecitycoffee.com', phone: '(503) 555-0182', service: 'Brand Strategy', source: 'Website', status: 'New', receivedAt: 'Today, 10:24 AM', message: 'We are opening a second location and need a clearer brand system.' },
  { id: 'LD-1047', name: 'Ethan Coleman', company: 'Coleman Dental', email: 'ethan@colemansmiles.com', phone: '(971) 555-0149', service: 'Website Design', source: 'Instagram', status: 'Contacted', receivedAt: 'Yesterday, 3:40 PM', message: 'Our current website does not reflect the quality of our practice.' },
  { id: 'LD-1046', name: 'Sofia Ahmed', company: 'Noura Kitchen', email: 'sofia@nourakitchen.com', phone: '(503) 555-0127', service: 'Content & Creative', source: 'Referral', status: 'Qualified', receivedAt: 'Sep 17, 2026', message: 'Looking for launch content and an ongoing social media partner.' },
  { id: 'LD-1045', name: 'Ryan Peterson', company: 'Cascade Food Trailers', email: 'ryan@cascadefoodtrailers.com', phone: '(503) 555-0196', service: 'Website Design', source: 'Website', status: 'Won', receivedAt: 'Sep 15, 2026', message: 'We need a stronger website that helps customers compare trailer options.' },
  { id: 'LD-1044', name: 'Jenna Park', company: 'Pine & Pour', email: 'jenna@pineandpour.com', phone: '(971) 555-0173', service: 'Digital Marketing', source: 'Google', status: 'Lost', receivedAt: 'Sep 12, 2026', message: 'Exploring marketing support for our new seasonal campaign.' },
];

export const statusStyles: Record<LeadStatus, string> = {
  New: 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20',
  Contacted: 'bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/20',
  Qualified: 'bg-[var(--color-accent-dim)] text-[var(--color-accent)] border-[var(--color-accent)]/30',
  Won: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
  Lost: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/20',
};
