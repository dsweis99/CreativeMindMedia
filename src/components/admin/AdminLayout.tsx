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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menu = (
    <nav className="space-y-2">
      {navigation.map(({ label, to, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)} title={!sidebarOpen ? label : undefined} className={({ isActive }) => `flex min-h-12 items-center rounded-sm text-sm font-medium transition-colors ${sidebarOpen ? 'gap-3 px-4' : 'h-12 w-12 justify-center'} ${isActive ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)]'}`}> 
          <Icon size={22} strokeWidth={2} />
          {sidebarOpen && <span>{label}</span>}
        </NavLink>
      ))}
    </nav>
  );

  const adminTools = (
    <div className="mt-5 border-t border-[var(--color-border-subtle)] pt-4 lg:mt-auto">
      <button type="button" title={!sidebarOpen ? 'Notifications' : undefined} className={`relative flex min-h-12 items-center rounded-sm text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)] ${sidebarOpen ? 'w-full gap-3 px-4' : 'h-12 w-12 justify-center'}`}>
        <Bell size={22} strokeWidth={2} /><span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        {sidebarOpen && <span>Notifications</span>}
      </button>
      <button type="button" title={!sidebarOpen ? 'Admin profile' : undefined} className={`mt-2 flex min-h-12 items-center rounded-sm text-left text-sm font-medium transition-colors hover:bg-[var(--color-border-subtle)] ${sidebarOpen ? 'w-full gap-3 px-4' : 'h-12 w-12 justify-center'}`}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-[var(--color-accent-fg)]">AS</span>
        {sidebarOpen && <><span className="min-w-0 flex-1"><span className="block truncate font-semibold">Admin</span><span className="block text-xs text-[var(--color-text-muted)]">Super Admin</span></span><ChevronDown size={16} className="text-[var(--color-text-muted)]" /></>}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <aside className={`fixed inset-y-0 left-0 z-40 hidden border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-6 transition-[width] duration-300 lg:flex lg:flex-col ${sidebarOpen ? 'w-72' : 'w-24'}`}>
        <button type="button" onClick={() => setSidebarOpen((open) => !open)} className={`mb-12 inline-flex items-center rounded-sm text-left outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${sidebarOpen ? '' : 'justify-center'}`} aria-label={sidebarOpen ? 'Collapse admin navigation' : 'Expand admin navigation'} title={sidebarOpen ? 'Collapse menu' : 'Expand menu'}>
          <Logo className={sidebarOpen ? 'h-9' : 'h-8'} labelClassName={sidebarOpen ? '' : '!hidden'} />
        </button>
        {menu}
        {adminTools}
      </aside>

      <header className={`sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-6 transition-[margin] duration-300 lg:px-10 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>
        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={() => setMenuOpen(true)} className="rounded-sm p-2 hover:bg-[var(--color-border-subtle)]" aria-label="Open admin menu"><Menu size={22} /></button>
          <Logo className="h-7" />
        </div>
        <p className="hidden text-sm text-[var(--color-text-muted)] lg:block">CMM Admin Workspace</p>
      </header>

      {menuOpen && <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setMenuOpen(false)}>
        <aside className="h-full w-72 bg-[var(--color-bg-secondary)] p-6" onClick={(event) => event.stopPropagation()}>
          <div className="mb-12 flex items-center justify-between"><Logo className="h-8" /><button onClick={() => setMenuOpen(false)} className="p-2" aria-label="Close admin menu"><X size={22} /></button></div>
          {menu}
          {adminTools}
        </aside>
      </div>}

      <main className={`p-6 transition-[margin] duration-300 lg:p-10 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}><Outlet /></main>
    </div>
  );
}
