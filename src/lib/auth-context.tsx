'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/types';
import { DEMO_USERS } from './storage/mock-data';
import { storageAdapter } from './storage/storage-adapter';
import { supabase, isSupabaseConfigured } from './supabase/client';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoading: boolean;
  loginAs: (role: UserRole) => Promise<void>;
  loginWithEmail: (email: string, password?: string) => Promise<boolean>;
  registerWithEmail: (fullName: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = 'pwi_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local session or Supabase session
    async function initAuth() {
      if (isSupabaseConfigured && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (profile) {
            setUser(profile);
            setIsLoading(false);
            return;
          }
        }
      }

      // Check localStorage for active session
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(AUTH_USER_KEY);
        if (saved) {
          try {
            setUser(JSON.parse(saved));
          } catch {
            setUser(null);
          }
        } else {
          // Default to Customer or Guest for a friendly initial experience
          const defaultCustomer = DEMO_USERS.find((u) => u.role === 'customer') || DEMO_USERS[1];
          setUser(defaultCustomer);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(defaultCustomer));
        }
      }
      setIsLoading(false);
    }

    initAuth();
  }, []);

  const loginAs = async (targetRole: UserRole) => {
    setIsLoading(true);
    const demo = DEMO_USERS.find((u) => u.role === targetRole) || {
      id: 'usr-' + targetRole + '-' + Date.now(),
      email: `${targetRole}@pernikahan.id`,
      full_name: targetRole.toUpperCase() + ' Demo User',
      role: targetRole,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUser(demo);
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(demo));
    }
    setIsLoading(false);
  };

  const loginWithEmail = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    const users = await storageAdapter.getUsers();
    let found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      // Auto-create customer
      found = {
        id: 'usr-' + Date.now(),
        email,
        full_name: email.split('@')[0],
        role: 'customer',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
    setUser(found);
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(found));
    }
    setIsLoading(false);
    return true;
  };

  const registerWithEmail = async (fullName: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      email,
      full_name: fullName,
      role: 'customer',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
    }
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    // Switch to Guest role
    const guestUser: UserProfile = {
      id: 'guest-anon',
      email: 'guest@public.id',
      full_name: 'Pengunjung',
      role: 'guest',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUser(guestUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(guestUser));
    }
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
  };

  const switchRole = (newRole: UserRole) => {
    loginAs(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'guest',
        isLoading,
        loginAs,
        loginWithEmail,
        registerWithEmail,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

