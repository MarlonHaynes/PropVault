'use client';
import { useState } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { useAuth } from '@/context/AuthContext';
=======
<<<<<<< HEAD
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile } from '@/firebase/firestore';
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile } from '@/firebase/firestore';
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { Input, Select } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks';
import { User, Shield, Bell, CreditCard, CheckCircle, Camera } from 'lucide-react';
import { cn } from '@/utils';

const tabs = [
<<<<<<< HEAD
<<<<<<< HEAD
  { id: 'profile',     label: 'Personal Info', icon: User },
  { id: 'preferences', label: 'Preferences',   icon: Bell },
  { id: 'security',    label: 'Security',       icon: Shield },
];
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  { id: 'profile',   label: 'Personal Info',    icon: User },
  { id: 'preferences', label: 'Preferences',    icon: Bell },
  { id: 'security',  label: 'Security',         icon: Shield },
];
=======
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile } from '@/firebase/firestore';
import { Input } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks';
import { User } from 'lucide-react';
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({
<<<<<<< HEAD
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
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    // Save to localStorage
    localStorage.setItem('propvault_profile', JSON.stringify(form));
    toast('Profile updated!', 'success');
    setLoading(false);
=======
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    displayName: user?.displayName || 'Demo User',
    email: user?.email || 'demo@propvault.ca',
    phone: '+1 (416) 555-0199',
    bio: 'Looking for a 3+ bedroom family home in the Oakville/Mississauga corridor. Pre-approved up to $2.2M. Target move: Q3 2024.',
    preferredCity: 'Toronto',
    buyerType: 'primary-residence',
    priceRange: '1m-2m',
    notifyNewListings: true,
    notifyPriceChanges: true,
    notifyMarketReports: false,
    notifyViewingReminders: true,
  });

  async function handleSave() {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserProfile(user.uid, { displayName: form.displayName, phone: form.phone });
      toast('Profile updated successfully!', 'success');
    } catch {
      toast('Failed to save. Please try again.', 'error');
=======
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
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  }

  return (
    <div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-bold text-white">My Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account details and preferences</p>
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
      {/* Profile header */}
=======
      {/* Profile header card */}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      {/* Profile header card */}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
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
<<<<<<< HEAD
<<<<<<< HEAD
              activeTab === tab.id ? 'border-brand-gold text-brand-gold' : 'border-transparent text-slate-400 hover:text-white'
            )}>
            <tab.icon className="w-4 h-4" />{tab.label}
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              activeTab === tab.id
                ? 'border-brand-gold text-brand-gold'
                : 'border-transparent text-slate-400 hover:text-white'
            )}>
            <tab.icon className="w-4 h-4" />
            {tab.label}
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          </button>
        ))}
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
      {/* Tab content */}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      {/* Tab content */}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {activeTab === 'profile' && (
        <div className="space-y-5 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Display Name" value={form.displayName} onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))} />
            <Input label="Email Address" value={form.email} disabled className="opacity-60 cursor-not-allowed" />
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          <Input label="Phone Number" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (416) 000-0000" />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Buyer Profile (helps agents serve you better)</label>
=======
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
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
            <textarea
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              rows={3}
<<<<<<< HEAD
              className="w-full px-3 py-2.5 text-sm bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Preferred City" value={form.preferredCity}
              onChange={e => setForm(f => ({ ...f, preferredCity: e.target.value }))}
              options={['Toronto','Mississauga','Oakville','Vaughan','Markham','Richmond Hill','Brampton'].map(c => ({ value: c, label: c }))} />
            <Select label="Buyer Type" value={form.buyerType}
              onChange={e => setForm(f => ({ ...f, buyerType: e.target.value }))}
              options={[
                { value: 'primary-residence', label: 'Primary Residence' },
                { value: 'investment', label: 'Investment Property' },
                { value: 'vacation', label: 'Vacation / Secondary' },
                { value: 'first-time', label: 'First-Time Buyer' },
              ]} />
          </div>
          <Select label="Budget Range" value={form.priceRange}
            onChange={e => setForm(f => ({ ...f, priceRange: e.target.value }))}
            options={[
              { value: 'under-500k', label: 'Under $500,000' },
              { value: '500k-1m', label: '$500K – $1M' },
              { value: '1m-2m', label: '$1M – $2M' },
              { value: '2m-3m', label: '$2M – $3M' },
              { value: '3m-5m', label: '$3M – $5M' },
              { value: '5m-plus', label: '$5M+' },
            ]} />
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          <Button variant="gold" onClick={handleSave} loading={loading}>Save Profile</Button>
        </div>
      )}

      {activeTab === 'preferences' && (
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="max-w-xl space-y-4">
          {[
            { key: 'notifyNewListings',      label: 'New Matching Listings',   desc: 'Get notified when a new property matches your saved searches' },
            { key: 'notifyPriceChanges',     label: 'Price Reduction Alerts',  desc: 'Get notified when a saved property drops in price' },
            { key: 'notifyViewingReminders', label: 'Viewing Reminders',       desc: '24-hour reminder before a scheduled viewing' },
            { key: 'notifyMarketReports',    label: 'Monthly Market Report',   desc: 'GTA market digest every first Monday of the month' },
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        <div className="max-w-xl space-y-5">
          <p className="text-sm text-slate-400">Control when and how PropVault contacts you.</p>
          {[
            { key: 'notifyNewListings',     label: 'New Matching Listings',      desc: 'Email when a new property matches your saved searches' },
            { key: 'notifyPriceChanges',    label: 'Price Reduction Alerts',     desc: 'Email when a saved property drops in price' },
            { key: 'notifyViewingReminders',label: 'Viewing Reminders',          desc: 'SMS reminder 24 hours before a scheduled viewing' },
            { key: 'notifyMarketReports',   label: 'Monthly Market Report',      desc: 'GTA market digest delivered the first Monday of each month' },
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          ].map(pref => (
            <div key={pref.key} className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700 rounded-xl">
              <div>
                <p className="text-sm font-medium text-white">{pref.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{pref.desc}</p>
              </div>
<<<<<<< HEAD
<<<<<<< HEAD
              <button onClick={() => setForm(f => ({ ...f, [pref.key]: !f[pref.key as keyof typeof f] }))}
                className={cn('w-10 h-5 rounded-full transition-all relative shrink-0', (form[pref.key as keyof typeof form] as boolean) ? 'bg-brand-gold' : 'bg-slate-600')}>
                <div className={cn('w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all', (form[pref.key as keyof typeof form] as boolean) ? 'left-5' : 'left-0.5')} />
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              <button
                onClick={() => setForm(f => ({ ...f, [pref.key]: !f[pref.key as keyof typeof f] }))}
                className={cn('w-10 h-5 rounded-full transition-all relative', form[pref.key as keyof typeof form] ? 'bg-brand-gold' : 'bg-slate-600')}
              >
                <div className={cn('w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all', form[pref.key as keyof typeof form] ? 'left-5' : 'left-0.5')} />
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              </button>
            </div>
          ))}
          <Button variant="gold" onClick={handleSave} loading={loading}>Save Preferences</Button>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="max-w-xl space-y-5">
          <div className="p-5 bg-slate-800/40 border border-slate-700 rounded-xl">
<<<<<<< HEAD
<<<<<<< HEAD
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-brand-gold" /> Change Password</h3>
            <div className="space-y-4">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="Min. 8 characters" />
              <Input label="Confirm Password" type="password" placeholder="Repeat new password" />
              <Button variant="gold" size="sm" onClick={() => toast('Password updated!', 'success')}>Update Password</Button>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-brand-gold" /> Change Password</h3>
            <div className="space-y-4">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="Min. 8 characters" />
              <Input label="Confirm New Password" type="password" placeholder="Repeat new password" />
              <Button variant="gold" size="sm">Update Password</Button>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
            </div>
          </div>
          <div className="p-5 bg-slate-800/40 border border-slate-700 rounded-xl">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><CreditCard className="w-4 h-4 text-slate-400" /> Account Details</h3>
            <div className="space-y-2 text-sm text-slate-400">
<<<<<<< HEAD
<<<<<<< HEAD
              <div className="flex justify-between"><span>Account ID</span><span className="text-white font-mono text-xs">{user?.uid?.slice(0,16)}...</span></div>
              <div className="flex justify-between"><span>Plan</span><span className="text-emerald-400">Free Account</span></div>
              <div className="flex justify-between"><span>Member Since</span><span className="text-white">April 2024</span></div>
            </div>
          </div>
        </div>
      )}
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              <div className="flex justify-between"><span>Account ID</span><span className="text-white font-mono text-xs">{user?.uid?.slice(0,12)}...</span></div>
              <div className="flex justify-between"><span>Plan</span><span className="text-emerald-400">Free Account</span></div>
              <div className="flex justify-between"><span>Email Verified</span><span className="text-emerald-400">✓ Yes</span></div>
              <div className="flex justify-between"><span>Member Since</span><span className="text-white">April 2024</span></div>
            </div>
          </div>
          <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl">
            <h3 className="font-semibold text-white mb-2">Danger Zone</h3>
            <p className="text-xs text-slate-500 mb-3">Permanently delete your account and all associated data. This cannot be undone.</p>
            <Button variant="danger" size="sm">Delete Account</Button>
          </div>
        </div>
      )}
=======
              placeholder="Tell agents a bit about yourself..."
              className="w-full px-3 py-2.5 text-sm bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none"
            />
          </div>
          <Button type="submit" variant="gold" loading={loading}>Save Changes</Button>
        </form>
      </div>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    </div>
  );
}
