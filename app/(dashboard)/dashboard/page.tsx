'use client';
import { Heart, Search, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { listings } from '@/data/listings';
import { ListingCard } from '@/components/listings/ListingCard';
import { formatPrice } from '@/utils';

export default function DashboardPage() {
  const { user } = useAuth();
  const { savedIds } = useSaved();
  const recentSaved = listings.filter(l => savedIds.includes(l.id)).slice(0, 3);

  const cards = [
    { icon: Heart, label: 'Saved Properties', value: savedIds.length, href: '/dashboard/saved', color: 'text-red-400' },
    { icon: Search, label: 'Saved Searches', value: 0, href: '/dashboard/saved-searches', color: 'text-blue-400' },
    { icon: MessageSquare, label: 'Inquiries Sent', value: 0, href: '/dashboard/inquiries', color: 'text-emerald-400' },
    { icon: TrendingUp, label: 'Market Updates', value: 3, href: '/listings', color: 'text-brand-gold' },
  ];

  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold text-white mb-1">
        Welcome back, {user?.displayName?.split(' ')[0] || 'there'}
      </h1>
      <p className="text-slate-400 text-sm mb-8">Here&apos;s what&apos;s happening with your property search.</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c, i) => (
          <Link key={i} href={c.href} className="group p-5 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-brand-gold/40 transition-all">
            <c.icon className={`w-5 h-5 mb-3 ${c.color}`} />
            <div className="text-2xl font-bold text-white mb-0.5">{c.value}</div>
            <div className="text-xs text-slate-400">{c.label}</div>
          </Link>
        ))}
      </div>

      {/* Recently saved */}
      {recentSaved.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Recently Saved</h2>
            <Link href="/dashboard/saved" className="text-xs text-brand-gold hover:text-amber-400 transition-colors">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {recentSaved.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>
      )}

      {/* Market snapshot */}
      <div className="mt-10 p-6 bg-slate-800/40 border border-slate-700 rounded-xl">
        <h2 className="font-semibold text-white mb-4">GTA Market Snapshot</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Avg. Home Price', value: formatPrice(1_182_000), change: '+2.3%', up: true },
            { label: 'Avg. Days on Market', value: '18 days', change: '-4 days', up: true },
            { label: 'Active Listings', value: '8,423', change: '+12%', up: false },
            { label: 'Sales/Listing Ratio', value: '68%', change: '+5%', up: true },
          ].map((s, i) => (
            <div key={i} className="p-4 bg-slate-800/60 rounded-lg">
              <div className="text-sm font-semibold text-white">{s.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              <div className={`text-xs mt-1.5 font-medium ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
