import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, ChevronDown, CircleDot, LayoutDashboard, LogOut, Mail, Megaphone, Menu, PanelsTopLeft, Settings, ShieldCheck, UsersRound, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ADMIN_PROFILE_UPDATED_EVENT, getAdminProfile, getProfileInitials, type AdminProfile } from '../../data/adminProfile';
import { useAuth } from '../../context/AuthContext';
import { fetchNotifications, markAllNotificationsRead, markNotificationRead, type Notification } from '../../lib/db';

const navigation = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Leads', to: '/admin/leads', icon: UsersRound },
  { label: 'Website Content', to: '/admin/content', icon: PanelsTopLeft },
  { label: 'Campaigns', to: '/admin/campaigns', icon: Megaphone },
  { label: 'Newsletter', to: '/admin/newsletter', icon: Mail },
  { label: 'Team & Roles', to: '/admin/team', icon: ShieldCheck },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profile, setProfile] = useState<AdminProfile>(() => getAdminProfile());
  const { adminUser, signOut } = useAuth();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    if (!adminUser) return;
    fetchNotifications(adminUser.user.id).then(({ data }) => {
      if (data) setNotifications(data as Notification[]);
    });
  }, [adminUser]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  useEffect(() => {
    const refreshProfile = () => setProfile(getAdminProfile());
    window.addEventListener(ADMIN_PROFILE_UPDATED_EVENT, refreshProfile);
    return () => window.removeEventListener(ADMIN_PROFILE_UPDATED_EVENT, refreshProfile);
  }, []);

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
    <div className="relative mt-5 border-t border-[var(--color-border-subtle)] pt-4 lg:mt-auto">
      <button type="button" onClick={() => setNotificationsOpen((open) => !open)} title={!sidebarOpen ? 'Notifications' : undefined} className={`relative flex min-h-12 items-center rounded-sm text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)] ${sidebarOpen ? 'w-full gap-3 px-4' : 'h-12 w-12 justify-center'}`}>
        <Bell size={22} strokeWidth={2} />{unreadCount > 0 && <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--color-accent)]" />}
        {sidebarOpen && <span>Notifications</span>}
      </button>
      {notificationsOpen && (
        <div className={`absolute bottom-16 z-50 w-80 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-4 shadow-2xl ${sidebarOpen ? 'left-0' : 'left-full ml-3'}`}>
          <div className="flex items-center justify-between gap-3">
            <div><p className="font-semibold">Notifications</p><p className="mt-0.5 text-xs text-[var(--color-text-muted)]">Your latest workspace updates.</p></div>
            {unreadCount > 0 && adminUser && (
              <button type="button" onClick={async () => { await markAllNotificationsRead(adminUser.user.id); setNotifications((n) => n.map((item) => ({ ...item, is_read: true }))); }} className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)]"><CheckCheck size={15} />Mark all read</button>
            )}
          </div>
          <div className="mt-4 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
            {notifications.length === 0 ? (
              <p className="py-4 text-center text-xs text-[var(--color-text-muted)]">No notifications yet.</p>
            ) : notifications.map((n) => (
              <div key={n.id} className="py-3">
                <p className="flex items-center gap-2 text-sm font-medium">
                  {!n.is_read && <CircleDot size={14} className="shrink-0 text-[var(--color-accent)]" />}
                  {n.title}
                </p>
                {n.message && <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">{n.message}</p>}
                {!n.is_read && (
                  <button type="button" onClick={async () => { await markNotificationRead(n.id); setNotifications((prev) => prev.map((item) => item.id === n.id ? { ...item, is_read: true } : item)); }} className="mt-1.5 text-[10px] font-semibold text-[var(--color-accent)] hover:underline">Mark read</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <Link to="/admin/profile" title={!sidebarOpen ? 'My profile' : undefined} className={`mt-2 flex min-h-12 items-center rounded-sm text-left text-sm font-medium transition-colors hover:bg-[var(--color-border-subtle)] ${sidebarOpen ? 'w-full gap-3 px-4' : 'h-12 w-12 justify-center'}`}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-[var(--color-accent-fg)]">{adminUser ? getProfileInitials(adminUser.name) : getProfileInitials(profile.name)}</span>
        {sidebarOpen && <><span className="min-w-0 flex-1"><span className="block truncate font-semibold">{adminUser?.name ?? profile.name}</span><span className="block text-xs text-[var(--color-text-muted)]">{adminUser?.role ?? profile.role}</span></span><ChevronDown size={16} className="text-[var(--color-text-muted)]" /></>}
      </Link>
      <button type="button" onClick={handleSignOut} title={!sidebarOpen ? 'Sign out' : undefined} className={`mt-1 flex min-h-11 items-center rounded-sm text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-red-500/10 hover:text-red-500 ${sidebarOpen ? 'w-full gap-3 px-4' : 'h-11 w-12 justify-center'}`}>
        <LogOut size={18} strokeWidth={2} />
        {sidebarOpen && <span>Sign out</span>}
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
