'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange, loginUser, registerUser, logoutUser, resetPassword, DEMO_USER } from '@/firebase/auth';
import { isDemoMode } from '@/firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  sendReset: (email: string) => Promise<{ error: string | null }>;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      const stored = localStorage.getItem('propvault_demo_user');
      setUser(stored ? DEMO_USER : null);
      setLoading(false);
      return;
    }
    const unsub = onAuthChange((u) => { setUser(u); setLoading(false); });
    return unsub;
  }, []);

  async function login(email: string, password: string) {
    const res = await loginUser(email, password);
    if (res.user) {
      setUser(res.user);
      if (isDemoMode) localStorage.setItem('propvault_demo_user', '1');
    }
    return { error: res.error };
  }

  async function register(email: string, password: string, name: string) {
    const res = await registerUser(email, password, name);
    if (res.user) {
      setUser(res.user);
      if (isDemoMode) localStorage.setItem('propvault_demo_user', '1');
    }
    return { error: res.error };
  }

  async function logout() {
    await logoutUser();
    setUser(null);
    if (isDemoMode) localStorage.removeItem('propvault_demo_user');
  }

  async function sendReset(email: string) {
    return resetPassword(email);
  }

  function demoLogin() {
    setUser(DEMO_USER);
    localStorage.setItem('propvault_demo_user', '1');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, sendReset, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
