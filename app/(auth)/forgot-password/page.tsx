'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const { sendReset } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await sendReset(email);
    if (res.error) { setError(res.error); setLoading(false); }
    else setSent(true);
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
          {sent ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h2 className="font-playfair text-2xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-slate-400 text-sm mb-6">We sent a reset link to <span className="text-white">{email}</span>.</p>
              <Link href="/login"><Button variant="gold" fullWidth>Back to Login</Button></Link>
            </div>
          ) : (
            <>
              <h1 className="font-playfair text-2xl font-bold text-white mb-1">Reset Password</h1>
              <p className="text-slate-400 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
                {error && <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}
                <Button type="submit" variant="gold" fullWidth loading={loading}>Send Reset Link</Button>
              </form>
              <p className="text-center text-sm text-slate-400 mt-5">
                <Link href="/login" className="text-brand-gold hover:text-amber-400 transition-colors">← Back to Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
