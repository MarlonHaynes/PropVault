'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile } from '@/firebase/firestore';
import { Input, Select } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks';
import { User, Shield, Bell, CreditCard, CheckCircle, Camera } from 'lucide-react';
import { cn } from '@/utils';

const tabs = [
  { id: 'profile',     label: 'Personal Info', icon: User },
  { id: 'preferences', label: 'Preferences',   icon: Bell },
  { id: 'security',    label: 'Security',       icon: Shield },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({
    displayName:             user?.displayName || 'Demo User',
    email:                   user?.email || 'demo@propvault.ca',
    phone:                   '+1 (416) 555-0199',
    bio:                     'Looking for a 3+ bedroom family home in the Oakville/Mississauga corridor. Pre-approved up to $2.2M. Target move: Q3 2024.',
    preferredCity:           'Toronto',
    buyerType:               'primary-residence',
    priceRange:              '1m-2m',
    notifyNewListings:       true,
    notifyPriceChanges:      true,
    notifyMarketReports:     false,
    notifyViewingReminders:  true,
  });

  async function handleSave() {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserProfile(user.uid, { displayName: form.displayName, phone: form.phone });
      toast('Profile updated!', 'success');
    } catch {
      toast('Failed to save. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-bold text-white">My Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account details and preferences</p>
      </div>

      {/* Profile header card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6 flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-3xl font-playfair">
            {(user?.displayName || 'D')[0].toUpperCase()}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-gold flex items-center justify-center text-slate-900 hover:bg-amber-400 transition-colors shadow-lg">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-white text-lg">{form.displayName}</h2>
          <p className="text-slate-400 text-sm">{form.email}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <CheckCircle className="w-3 h-3" /> Verified Account
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
              Member since April 2024
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-700">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-all',
              activeTab === tab.id ? 'border-brand-gold text-brand-gold' : 'border-transparent text-slate-400 hover:text-white'
            )}>
            <tab.icon className="w-4 h-4" />{tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'profile' && (
        <div className="space-y-5 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Display Name" value={form.displayName} onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))} />
            <Input label="Email Address" value={form.email} disabled className="opacity-60 cursor-not-allowed" />
          </div>
          <Input label="Phone Number" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Buyer Profile</label>
            <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3}
              className="w-full px-3 py-2.5 text-sm bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Preferred City" value={form.preferredCity} onChange={e => setForm(f => ({ ...f, preferredCity: e.target.value }))}
              options={['Toronto','Mississauga','Oakville','Vaughan','Markham','Richmond Hill','Brampton'].map(c => ({ value: c, label: c }))} />
            <Select label="Budget Range" value={form.priceRange} onChange={e => setForm(f => ({ ...f, priceRange: e.target.value }))}
              options={[
                { value: 'under-500k', label: 'Under $500K' },
                { value: '500k-1m',    label: '$500K – $1M' },
                { value: '1m-2m',      label: '$1M – $2M' },
                { value: '2m-3m',      label: '$2M – $3M' },
                { value: '3m-plus',    label: '$3M+' },
              ]} />
          </div>
          <Button variant="gold" onClick={handleSave} loading={loading}>Save Profile</Button>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="max-w-xl space-y-4">
          {[
            { key: 'notifyNewListings',      label: 'New Matching Listings',   desc: 'Get notified when a new property matches your saved searches' },
            { key: 'notifyPriceChanges',     label: 'Price Reduction Alerts',  desc: 'Get notified when a saved property drops in price' },
            { key: 'notifyViewingReminders', label: 'Viewing Reminders',       desc: '24-hour reminder before a scheduled viewing' },
            { key: 'notifyMarketReports',    label: 'Monthly Market Report',   desc: 'GTA market digest every first Monday of the month' },
          ].map(pref => (
            <div key={pref.key} className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700 rounded-xl">
              <div>
                <p className="text-sm font-medium text-white">{pref.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{pref.desc}</p>
              </div>
              <button onClick={() => setForm(f => ({ ...f, [pref.key]: !f[pref.key as keyof typeof f] }))}
                className={cn('w-10 h-5 rounded-full transition-all relative shrink-0', (form[pref.key as keyof typeof form] as boolean) ? 'bg-brand-gold' : 'bg-slate-600')}>
                <div className={cn('w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all', (form[pref.key as keyof typeof form] as boolean) ? 'left-5' : 'left-0.5')} />
              </button>
            </div>
          ))}
          <Button variant="gold" onClick={handleSave} loading={loading}>Save Preferences</Button>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="max-w-xl space-y-5">
          <div className="p-5 bg-slate-800/40 border border-slate-700 rounded-xl">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-brand-gold" /> Change Password</h3>
            <div className="space-y-4">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="Min. 8 characters" />
              <Input label="Confirm Password" type="password" placeholder="Repeat new password" />
              <Button variant="gold" size="sm" onClick={() => toast('Password updated!', 'success')}>Update Password</Button>
            </div>
          </div>
          <div className="p-5 bg-slate-800/40 border border-slate-700 rounded-xl">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><CreditCard className="w-4 h-4 text-slate-400" /> Account Details</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex justify-between"><span>Account ID</span><span className="text-white font-mono text-xs">{user?.uid?.slice(0,16)}...</span></div>
              <div className="flex justify-between"><span>Plan</span><span className="text-emerald-400">Free Account</span></div>
              <div className="flex justify-between"><span>Member Since</span><span className="text-white">April 2024</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
