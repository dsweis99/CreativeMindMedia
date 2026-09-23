import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/ui/Logo';

export function AdminLogin() {
  const { adminUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border-subtle)] border-t-[var(--color-accent)]" />
      </div>
    );
  }

  if (adminUser) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError || !data.user) {
      setError(authError?.message ?? 'Sign in failed. Please try again.');
      setSubmitting(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile || (profile.role !== 'super_admin' && profile.role !== 'admin')) {
      await supabase.auth.signOut();
      setError('Your account does not have admin access.');
      setSubmitting(false);
      return;
    }

    navigate(from, { replace: true });
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Enter your email address first, then click Forgot password.');
      return;
    }
    setError(null);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/#/admin/login`,
    });
    setForgotSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)] px-6">
      <div className="w-full max-w-md">
        <div className="mb-12 flex justify-center">
          <Logo variant="stacked" className="h-16" />
        </div>

        <div className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Admin workspace</p>
          <h1 className="mt-2 font-display text-4xl tracking-wide">Sign in</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">Access is restricted to authorised team members.</p>

          {error && (
            <div className="mt-6 flex items-start gap-3 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {forgotSent && (
            <div className="mt-6 border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500">
              Password reset link sent — check your inbox.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
              <div className="relative">
                <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@creativemindsmedia.com"
                  className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] py-3 pl-11 pr-4 text-sm focus:border-[var(--color-accent)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] py-3 pl-11 pr-11 text-sm focus:border-[var(--color-accent)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 bg-[var(--color-accent)] py-3.5 text-sm font-semibold text-[var(--color-accent-fg)] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? <><Loader2 size={17} className="animate-spin" />Signing in…</> : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-[var(--color-text-muted)]">
          Creative Minds Media — Admin only. <a href="/#/" className="hover:text-[var(--color-accent)] transition-colors">Return to website →</a>
        </p>
      </div>
    </div>
  );
}
