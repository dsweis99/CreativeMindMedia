import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Bell, ChevronDown, LayoutDashboard, Megaphone, Menu, PanelsTopLeft, Settings, UsersRound, X } from 'lucide-react';
import { Logo } from '../ui/Logo';

const navigation = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Leads', to: '/admin/leads', icon: UsersRound },
  { label: 'Website Content', to: '/admin/content', icon: PanelsTopLeft },
  { label: 'Campaigns', to: '/admin/campaigns', icon: Megaphone },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menu = (
    <nav className="space-y-2">
      {navigation.map(({ label, to, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)]'}`}>
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-6 lg:flex lg:flex-col">
        <Link to="/" className="mb-12 inline-flex"><Logo className="h-9" /></Link>
        {menu}
        <div className="mt-auto border-t border-[var(--color-border-subtle)] pt-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Workspace</p>
          <p className="mt-2 text-sm font-medium">Creative Minds Media</p>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-6 lg:ml-72 lg:px-10">
        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={() => setMenuOpen(true)} className="rounded-sm p-2 hover:bg-[var(--color-border-subtle)]" aria-label="Open admin menu"><Menu size={22} /></button>
          <Logo className="h-7" />
        </div>
        <p className="hidden text-sm text-[var(--color-text-muted)] lg:block">CMM Admin Workspace</p>
        <div className="ml-auto flex items-center gap-4">
          <button className="relative rounded-full p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)]" aria-label="Notifications">
            <Bell size={20} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </button>
          <div className="flex items-center gap-3 border-l border-[var(--color-border-subtle)] pl-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-[var(--color-accent-fg)]">AS</div>
            <div className="hidden sm:block"><p className="text-sm font-semibold">Admin</p><p className="text-xs text-[var(--color-text-muted)]">Super Admin</p></div>
            <ChevronDown size={16} className="text-[var(--color-text-muted)]" />
          </div>
        </div>
      </header>

      {menuOpen && <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setMenuOpen(false)}>
        <aside className="h-full w-72 bg-[var(--color-bg-secondary)] p-6" onClick={(event) => event.stopPropagation()}>
          <div className="mb-12 flex items-center justify-between"><Logo className="h-8" /><button onClick={() => setMenuOpen(false)} className="p-2" aria-label="Close admin menu"><X size={22} /></button></div>
          {menu}
        </aside>
      </div>}

      <main className="p-6 lg:ml-72 lg:p-10"><Outlet /></main>
    </div>
  );
}
