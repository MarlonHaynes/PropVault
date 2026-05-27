'use client';
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { useState } from 'react';
import Link from 'next/link';
import { Search, Trash2, Bell, BellOff, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { EmptyState } from '@/components/ui/Display';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils';

const savedSearches = [
  {
    id: '1',
    name: 'Toronto Condos — Under $1.2M',
    description: 'Condo · Toronto · 2+ beds · Under $1.2M · For Sale',
    filters: { city: 'Toronto', propertyType: 'Condo', maxPrice: 1200000, bedrooms: 2, listingType: 'sale' },
    matches: 12,
    newMatches: 3,
    notificationsOn: true,
    createdAt: '2024-03-15',
    lastAlert: '2024-04-19',
  },
  {
    id: '2',
    name: 'Oakville Family Homes',
    description: 'House · Oakville · 3+ beds · $1.5M–$3M · For Sale',
    filters: { city: 'Oakville', propertyType: 'House', minPrice: 1500000, maxPrice: 3000000, bedrooms: 3 },
    matches: 8,
    newMatches: 1,
    notificationsOn: true,
    createdAt: '2024-03-10',
    lastAlert: '2024-04-18',
  },
];

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState(savedSearches);

  function toggleNotifications(id: string) {
    setSearches(prev => prev.map(s => s.id === id ? { ...s, notificationsOn: !s.notificationsOn } : s));
  }

  function deleteSearch(id: string) {
    setSearches(prev => prev.filter(s => s.id !== id));
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-bold text-white">Saved Searches</h1>
        <p className="text-slate-400 text-sm mt-1">{searches.length} active searches — get notified when new listings match</p>
      </div>

      {searches.length === 0 ? (
        <EmptyState title="No saved searches" description="Save a search to get notified when new matching properties are listed."
          action={<Link href="/listings"><Button variant="gold">Start Searching</Button></Link>} />
      ) : (
        <div className="space-y-4">
          {searches.map(s => (
            <div key={s.id} className={cn(
              'bg-slate-800/50 border rounded-2xl p-5 transition-all',
              s.newMatches > 0 ? 'border-brand-gold/30' : 'border-slate-700'
            )}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white">{s.name}</h3>
                      {s.newMatches > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-gold text-slate-900 text-[10px] font-bold">
                          {s.newMatches} new
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <SlidersHorizontal className="w-3 h-3" />{s.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="text-xs text-slate-400">{s.matches} matching properties</span>
                      <span className="text-xs text-slate-500">Saved {s.createdAt}</span>
                      {s.notificationsOn && <span className="text-xs text-emerald-400">Last alert: {s.lastAlert}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleNotifications(s.id)}
                    className={cn('flex items-center gap-1.5 h-8 px-3 rounded-lg border text-xs transition-all',
                      s.notificationsOn ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-slate-600 text-slate-400 hover:border-slate-400'
                    )}>
                    {s.notificationsOn ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
                    {s.notificationsOn ? 'Alerts On' : 'Alerts Off'}
                  </button>
                  <button onClick={() => deleteSearch(s.id)}
                    className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-500 hover:text-red-400 hover:border-red-400/30 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  {s.notificationsOn ? '✓ You\'ll be alerted when new matching properties are listed' : 'Notifications paused'}
                </p>
                <Link href={`/listings?city=${(s.filters as Record<string,string>).city || ''}`}
                  className="flex items-center gap-1 text-xs text-brand-gold hover:text-amber-400 transition-colors">
                  View Results <ArrowRight className="w-3 h-3" />
                </Link>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import Link from 'next/link';
import { Search, Trash2 } from 'lucide-react';
import { EmptyState } from '@/components/ui/Display';
import { Button } from '@/components/ui/Button';

// Placeholder – would pull from Firebase in production
const mockSearches = [
  { id: '1', name: 'Toronto Condos Under $800K', filters: { city: 'Toronto', propertyType: ['Condo'], maxPrice: 800000 }, createdAt: '2024-01-15' },
  { id: '2', name: 'Oakville Family Homes', filters: { city: 'Oakville', propertyType: ['House'], bedrooms: 3 }, createdAt: '2024-01-10' },
];

export default function SavedSearchesPage() {
  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold text-white mb-1">Saved Searches</h1>
      <p className="text-slate-400 text-sm mb-8">{mockSearches.length} saved searches</p>

      {mockSearches.length === 0 ? (
        <EmptyState title="No saved searches" description="Save a search to get notified when new matching properties are listed." action={<Link href="/listings"><Button variant="gold">Start Searching</Button></Link>} />
      ) : (
        <div className="space-y-3">
          {mockSearches.map(s => (
            <div key={s.id} className="flex items-center justify-between gap-4 p-5 bg-slate-800/50 border border-slate-700 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                  <Search className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{s.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Saved {s.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/listings">
                  <Button variant="outline" size="sm">View Results</Button>
                </Link>
                <button className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              </div>
            </div>
          ))}
        </div>
      )}
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

      {/* Add search CTA */}
      <div className="mt-8 p-5 bg-slate-800/30 border border-dashed border-slate-700 rounded-2xl text-center">
        <Search className="w-7 h-7 text-slate-600 mx-auto mb-2" />
        <p className="text-sm text-slate-400 mb-1">Save a new search</p>
        <p className="text-xs text-slate-600 mb-4">Apply filters on the listings page, then click "Save Search" to be notified of new matches</p>
        <Link href="/listings">
          <Button variant="outline" size="sm">Browse & Filter Listings</Button>
        </Link>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    </div>
  );
}
