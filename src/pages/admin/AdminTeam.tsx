import { useState, type FormEvent } from 'react';
import { Plus, ShieldCheck, UserPlus, UsersRound } from 'lucide-react';

type Role = 'Super Admin' | 'Admin' | 'Editor';
type TeamMember = { id: string; name: string; email: string; role: Role; initials: string };

const roleDetails: Record<Role, { description: string; permissions: string[] }> = {
  'Super Admin': { description: 'Full control of the CRM, team, and website.', permissions: ['Manage team & roles', 'View and manage leads', 'Edit website & campaigns', 'Manage settings'] },
  Admin: { description: 'Manages day-to-day leads and approved website updates.', permissions: ['View and manage leads', 'Edit website & campaigns'] },
  Editor: { description: 'Updates public content without client-data access.', permissions: ['Edit website & campaigns'] },
};

const initialTeam: TeamMember[] = [
  { id: 'team-1', name: 'Dima Al-Sweis', email: 'dima@creativemindsmedia.com', role: 'Super Admin', initials: 'DS' },
  { id: 'team-2', name: 'Content Team', email: 'content@creativemindsmedia.com', role: 'Editor', initials: 'CT' },
];

export function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>(initialTeam);
  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Editor' as Role });

  const changeRole = (id: string, role: Role) => setMembers((current) => current.map((member) => member.id === id ? { ...member, role } : member));
  const addMember = (event: FormEvent) => {
    event.preventDefault();
    if (!newMember.name.trim() || !newMember.email.trim()) return;
    const initials = newMember.name.trim().split(' ').slice(0, 2).map((word) => word[0]).join('').toUpperCase();
    setMembers((current) => [...current, { id: crypto.randomUUID(), initials, ...newMember }]);
    setNewMember({ name: '', email: '', role: 'Editor' });
    setShowForm(false);
  };

  return <div className="mx-auto max-w-6xl">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Access control</p><h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Team & Roles</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">Choose exactly what each person can access. These are demo controls until Supabase authentication is connected.</p></div><button type="button" onClick={() => setShowForm((show) => !show)} className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-fg)]"><UserPlus size={18} />Add team member</button></div>

    {showForm && <form onSubmit={addMember} className="mt-8 grid gap-4 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:grid-cols-[1fr_1fr_180px_auto] sm:items-end"><div><label className="mb-2 block text-sm font-medium" htmlFor="memberName">Full name</label><input id="memberName" required value={newMember.name} onChange={(event) => setNewMember({ ...newMember, name: event.target.value })} placeholder="e.g. Jane Doe" className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div><div><label className="mb-2 block text-sm font-medium" htmlFor="memberEmail">Work email</label><input id="memberEmail" required type="email" value={newMember.email} onChange={(event) => setNewMember({ ...newMember, email: event.target.value })} placeholder="jane@company.com" className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div><div><label className="mb-2 block text-sm font-medium" htmlFor="memberRole">Role</label><select id="memberRole" value={newMember.role} onChange={(event) => setNewMember({ ...newMember, role: event.target.value as Role })} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]"><option>Super Admin</option><option>Admin</option><option>Editor</option></select></div><button type="submit" className="inline-flex items-center justify-center gap-2 border border-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent)]"><Plus size={17} />Add</button></form>}

    <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]"><section className="overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)]"><div className="flex items-center gap-3 border-b border-[var(--color-border-subtle)] px-6 py-5"><UsersRound size={21} className="text-[var(--color-accent)]" /><div><h2 className="font-display text-3xl tracking-wide">Team members</h2><p className="text-sm text-[var(--color-text-muted)]">{members.length} people in this workspace</p></div></div>{members.map((member) => <article key={member.id} className="flex flex-col gap-4 border-b border-[var(--color-border-subtle)] px-6 py-5 last:border-0 sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-dim)] text-xs font-bold text-[var(--color-accent)]">{member.initials}</span><div className="min-w-0"><p className="truncate font-semibold">{member.name}</p><p className="truncate text-sm text-[var(--color-text-muted)]">{member.email}</p></div></div><label className="text-sm"><span className="sr-only">Role for {member.name}</span><select value={member.role} onChange={(event) => changeRole(member.id, event.target.value as Role)} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-sm font-medium outline-none focus:border-[var(--color-accent)] sm:w-44"><option>Super Admin</option><option>Admin</option><option>Editor</option></select></label></article>)}</section>
      <aside className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6"><div className="flex items-center gap-3"><ShieldCheck size={21} className="text-[var(--color-accent)]" /><h2 className="font-display text-3xl tracking-wide">Role guide</h2></div><div className="mt-6 space-y-5">{(Object.keys(roleDetails) as Role[]).map((role) => <div key={role} className="border-l-2 border-[var(--color-accent)] pl-4"><p className="font-semibold">{role}</p><p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{roleDetails[role].description}</p><ul className="mt-3 space-y-1 text-xs text-[var(--color-text-muted)]">{roleDetails[role].permissions.map((permission) => <li key={permission}>• {permission}</li>)}</ul></div>)}</div></aside>
    </div>
  </div>;
}
