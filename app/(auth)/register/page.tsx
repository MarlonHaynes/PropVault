'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
<<<<<<< HEAD
<<<<<<< HEAD
=======
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    setLoading(true);
    const res = await register(form.email, form.password, form.name);
    if (res.error) { setError(res.error); setLoading(false); }
    else { toast('Account created! Welcome to PropVault.', 'success'); router.push('/dashboard'); }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brand-gold flex items-center justify-center">
<<<<<<< HEAD
<<<<<<< HEAD
              <span className="text-slate-900 font-bold font-mono text-sm">PV</span>
=======
              <span className="text-slate-900 font-bold font-mono">PV</span>
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
              <span className="text-slate-900 font-bold font-mono">PV</span>
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
            </div>
            <span className="font-playfair text-2xl font-bold text-white">PropVault</span>
          </Link>
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8">
          <h1 className="font-playfair text-2xl font-bold text-white mb-1">Create Your Account</h1>
          <p className="text-slate-400 text-sm mb-6">Join thousands of GTA property hunters</p>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8">
          <h1 className="font-playfair text-2xl font-bold text-white mb-1">Create Your Account</h1>
          <p className="text-slate-400 text-sm mb-6">Join thousands of GTA property hunters</p>

<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Jane Smith" />
            <Input label="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="you@example.com" />
            <div className="relative">
              <Input label="Password" type={show ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required placeholder="Min. 6 characters" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-8 text-slate-400 hover:text-white">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Input label="Confirm Password" type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required placeholder="Repeat password" />
            {error && <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}
            <Button type="submit" variant="gold" fullWidth loading={loading}>Create Account</Button>
          </form>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

          <p className="text-center text-xs text-slate-500 mt-4">
            By registering you agree to our{' '}
            <a href="#" className="text-brand-gold hover:underline">Terms of Service</a> &amp;{' '}
            <a href="#" className="text-brand-gold hover:underline">Privacy Policy</a>
          </p>

<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          <p className="text-center text-sm text-slate-400 mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-gold hover:text-amber-400 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
