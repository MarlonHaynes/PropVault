'use client';
<<<<<<< HEAD
<<<<<<< HEAD
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  logout: () => void;
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange, loginUser, registerUser, logoutUser, resetPassword } from '@/firebase/auth';
import { isDemoMode } from '@/firebase/config';
import { DEMO_USER } from '@/firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  sendReset: (email: string) => Promise<{ error: string | null }>;
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

<<<<<<< HEAD
<<<<<<< HEAD
const DEMO_USER: AppUser = {
  uid: 'demo-user-001',
  email: 'demo@propvault.ca',
  displayName: 'Demo User',
  isAdmin: true,
};

// Simple local user store
function getStoredUser(): AppUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('propvault_user');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setStoredUser(user: AppUser | null) {
  if (typeof window === 'undefined') return;
  if (user) localStorage.setItem('propvault_user', JSON.stringify(user));
  else localStorage.removeItem('propvault_user');
}

// Simple in-memory registered users store
function getRegisteredUsers(): { email: string; password: string; name: string }[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('propvault_registered') || '[]');
  } catch { return []; }
}

function addRegisteredUser(email: string, password: string, name: string) {
  const users = getRegisteredUsers();
  users.push({ email, password, name });
  localStorage.setItem('propvault_registered', JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    setUser(stored);
    setLoading(false);
  }, []);

  function demoLogin() {
    setStoredUser(DEMO_USER);
    setUser(DEMO_USER);
  }

  async function login(email: string, password: string): Promise<{ error: string | null }> {
    // Accept demo credentials
    if (email === 'demo@propvault.ca' && password === 'demo123') {
      setStoredUser(DEMO_USER);
      setUser(DEMO_USER);
      return { error: null };
    }
    // Check registered users
    const users = getRegisteredUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const u: AppUser = { uid: `user-${Date.now()}`, email: found.email, displayName: found.name, isAdmin: false };
      setStoredUser(u);
      setUser(u);
      return { error: null };
    }
    return { error: 'Invalid email or password.' };
  }

  async function register(email: string, password: string, name: string): Promise<{ error: string | null }> {
    if (password.length < 6) return { error: 'Password must be at least 6 characters.' };
    const users = getRegisteredUsers();
    if (users.find(u => u.email === email)) return { error: 'An account with this email already exists.' };
    addRegisteredUser(email, password, name);
    const u: AppUser = { uid: `user-${Date.now()}`, email, displayName: name, isAdmin: false };
    setStoredUser(u);
    setUser(u);
    return { error: null };
  }

  function logout() {
    setStoredUser(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, demoLogin }}>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
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
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
