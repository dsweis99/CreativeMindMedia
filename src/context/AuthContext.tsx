import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type AdminRole = 'super_admin' | 'admin';

export interface AdminUser {
  user: User;
  role: AdminRole;
  name: string;
}

interface AuthState {
  loading: boolean;
  adminUser: AdminUser | null;
}

interface AuthContextValue extends AuthState {
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  loading: true,
  adminUser: null,
  signOut: async () => {},
});

async function fetchProfile(user: User): Promise<AdminUser | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (error || !data) return null;
  if (data.role !== 'super_admin' && data.role !== 'admin') return null;

  return { user, role: data.role as AdminRole, name: data.full_name ?? user.email ?? 'Admin' };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ loading: true, adminUser: null });

  useEffect(() => {
    let mounted = true;

    async function init(session: Session | null) {
      if (!session?.user) {
        if (mounted) setState({ loading: false, adminUser: null });
        return;
      }
      const adminUser = await fetchProfile(session.user);
      if (mounted) setState({ loading: false, adminUser });
    }

    supabase.auth.getSession().then(({ data }) => init(data.session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      init(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({ loading: false, adminUser: null });
  };

  return <AuthContext.Provider value={{ ...state, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
