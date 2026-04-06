'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile } from '@/firebase/firestore';
import { Input } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    phone: '',
    bio: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await updateUserProfile(user.uid, form);
      toast('Profile updated!', 'success');
    } catch {
      toast('Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold text-white mb-1">My Profile</h1>
      <p className="text-slate-400 text-sm mb-8">Manage your account details</p>

      <div className="max-w-xl">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8 p-5 bg-slate-800/40 border border-slate-700 rounded-xl">
          <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center">
            <User className="w-8 h-8 text-brand-gold" />
          </div>
          <div>
            <p className="font-semibold text-white">{user?.displayName || 'User'}</p>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Display Name" value={form.displayName} onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))} />
          <Input label="Email" value={user?.email || ''} disabled className="opacity-60 cursor-not-allowed" />
          <Input label="Phone" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (416) 000-0000" />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">About Me (optional)</label>
            <textarea
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              rows={3}
              placeholder="Tell agents a bit about yourself..."
              className="w-full px-3 py-2.5 text-sm bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none"
            />
          </div>
          <Button type="submit" variant="gold" loading={loading}>Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
