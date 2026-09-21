import { FormEvent, useState } from 'react';
import { KeyRound, Mail, Save, ShieldCheck, UserRound } from 'lucide-react';
import { getAdminProfile, saveAdminProfile, type AdminProfile } from '../../data/adminProfile';

export function AdminProfile() {
  const [profile, setProfile] = useState<AdminProfile>(() => getAdminProfile());
  const [saved, setSaved] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveAdminProfile(profile);
    setSaved(true);
  };

  const changePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get('newPassword') || '');
    const confirmation = String(form.get('confirmation') || '');
    if (password.length < 8) return setPasswordMessage('Use at least 8 characters.');
    if (password !== confirmation) return setPasswordMessage('The two passwords do not match.');
    setPasswordMessage('Password change saved as a preview. It becomes a real secure change once Supabase Auth is connected.');
    event.currentTarget.reset();
  };

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Account</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">My Profile</h1>
      <p className="mt-3 text-sm text-[var(--color-text-muted)]">Manage the basic information shown in your admin workspace.</p>

      <div className="mt-10 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:p-8"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)] text-lg font-bold text-[var(--color-accent-fg)]">{profile.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'AD'}</div><h2 className="mt-5 font-display text-3xl tracking-wide">{profile.name || 'Admin'}</h2><p className="mt-1 text-sm text-[var(--color-text-muted)]">{profile.role}</p><div className="mt-7 border-t border-[var(--color-border-subtle)] pt-5 text-sm text-[var(--color-text-muted)]"><p className="flex items-center gap-2"><Mail size={16} />{profile.email}</p><p className="mt-4 flex items-center gap-2"><ShieldCheck size={16} className="text-[var(--color-accent)]" />Full workspace access</p></div></aside>

        <div className="space-y-5">
          <form onSubmit={saveProfile} className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:p-8"><div className="flex items-center gap-3"><UserRound className="text-[var(--color-accent)]" size={21} /><div><h2 className="font-display text-3xl tracking-wide">Personal details</h2><p className="mt-1 text-sm text-[var(--color-text-muted)]">This updates the name shown in the sidebar.</p></div></div><div className="mt-7 grid gap-5 sm:grid-cols-2"><div><label htmlFor="profileName" className="mb-2 block text-sm font-medium">Display name</label><input id="profileName" value={profile.name} onChange={(event) => { setProfile({ ...profile, name: event.target.value }); setSaved(false); }} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div><div><label htmlFor="profileEmail" className="mb-2 block text-sm font-medium">Email address</label><input id="profileEmail" type="email" value={profile.email} onChange={(event) => { setProfile({ ...profile, email: event.target.value }); setSaved(false); }} className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div></div><button type="submit" className="mt-6 inline-flex items-center gap-2 bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-fg)]"><Save size={17} />Save profile</button>{saved && <span className="ml-3 text-sm text-emerald-500">Profile saved.</span>}</form>

          <form onSubmit={changePassword} className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-6 sm:p-8"><div className="flex items-center gap-3"><KeyRound className="text-[var(--color-accent)]" size={21} /><div><h2 className="font-display text-3xl tracking-wide">Password</h2><p className="mt-1 text-sm text-[var(--color-text-muted)]">Choose a new password for your future secure sign-in.</p></div></div><div className="mt-7 grid gap-5 sm:grid-cols-2"><div><label htmlFor="newPassword" className="mb-2 block text-sm font-medium">New password</label><input id="newPassword" name="newPassword" type="password" minLength={8} required placeholder="At least 8 characters" className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div><div><label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">Confirm password</label><input id="confirmPassword" name="confirmation" type="password" minLength={8} required className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]" /></div></div><button type="submit" className="mt-6 inline-flex items-center gap-2 border border-[var(--color-border-subtle)] px-5 py-3 text-sm font-semibold transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"><KeyRound size={17} />Update password</button>{passwordMessage && <p className="mt-4 text-sm text-[var(--color-text-muted)]">{passwordMessage}</p>}</form>
        </div>
      </div>
    </div>
  );
}
