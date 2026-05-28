'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks';

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(form.email, form.password);
    if (res.error) { setError(res.error); setLoading(false); }
    else { toast('Welcome back!', 'success'); router.push('/dashboard'); }
  }

  function handleDemo() {
    demoLogin();
    toast(
      activeTab === 'admin' ? 'Signed in to Admin Workspace' : 'Signed in as Demo User',
      'success'
    );
    router.push(activeTab === 'admin' ? '/admin' : '/dashboard');
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brand-gold flex items-center justify-center">
              <span className="text-slate-900 font-bold font-mono text-sm">PV</span>
            </div>
            <span className="font-playfair text-2xl font-bold text-white">PropVault</span>
          </Link>
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8">
          <h1 className="font-playfair text-2xl font-bold text-white mb-1">Welcome Back</h1>
          <p className="text-slate-400 text-sm mb-6">Sign in to access your account</p>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900/60 border border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab('user')}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'user'
                    ? 'bg-brand-gold text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Client Sign In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('admin')}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'admin'
                    ? 'bg-brand-gold text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Admin Sign In
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {activeTab === 'admin'
                ? 'For brokerage staff managing listings, inquiries, and team performance.'
                : 'For buyers and renters managing saved properties, viewings, and inquiries.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="you@example.com" />
            <div className="relative">
              <Input label="Password" type={show ? 'text' : 'password'} value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required placeholder="••••••••" />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-3 top-8 text-slate-400 hover:text-white transition-colors">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-right">
              <Link href="/forgot-password" className="text-xs text-brand-gold hover:text-amber-400 transition-colors">Forgot password?</Link>
            </div>
            {error && <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}
            <Button type="submit" variant="gold" fullWidth loading={loading}>Sign In</Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700" /></div>
            <div className="relative text-center"><span className="bg-slate-800 px-3 text-xs text-slate-500">or</span></div>
          </div>

          <Button variant="secondary" fullWidth onClick={handleDemo}>
            {activeTab === 'admin' ? 'Continue to Admin Workspace' : 'Continue as Client'}
          </Button>

          {activeTab === 'user' && (
            <p className="text-center text-sm text-slate-400 mt-4">
              No account?{' '}
              <Link href="/register" className="text-brand-gold hover:text-amber-400 transition-colors">Create one free</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
