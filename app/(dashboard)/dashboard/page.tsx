'use client';
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageSquare, TrendingUp, Search, Calendar, ArrowRight, MapPin, Bed, Bath, Maximize2, CheckCircle, Clock, Star, AlertCircle, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { useListingsContext } from '@/context/ListingsContext';
import { demoInquiries, demoViewings } from '@/data/demo-data';
import { saleHistory } from '@/data/sales-history';
import { formatPrice, getListingSlug, cn } from '@/utils';
import { LoadingSpinner } from '@/components/ui/Display';

const marketStats = [
  { label: 'Avg Sale Price',      value: '$1,182,000', delta: '+2.3%', up: true },
  { label: 'Avg Days on Market',  value: '18 days',    delta: '-4 days', up: true },
  { label: 'Sale-to-List Ratio',  value: '101.2%',     delta: '+0.8%', up: true },
  { label: 'Active GTA Listings', value: '8,423',      delta: '+12%',  up: false },
];

const recentClosings = saleHistory.slice(0, 3);
const upcomingViewing = demoViewings.find(v => v.status === 'upcoming');
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import { Heart, Search, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { listings } from '@/data/listings';
import { ListingCard } from '@/components/listings/ListingCard';
import { formatPrice } from '@/utils';
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

export default function DashboardPage() {
  const { user } = useAuth();
  const { savedIds } = useSaved();
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  const { listings, loading } = useListingsContext();
  const firstName = user?.displayName?.split(' ')[0] || 'there';
  const savedListings = listings.filter(l => savedIds.includes(l.id)).slice(0, 3);
  const newInquiries = demoInquiries.filter(i => i.status === 'new').length;

  const quickStats = [
    { icon: Heart,         label: 'Saved Properties', value: savedIds.length || 0,     href: '/dashboard/saved',          color: 'text-red-400',    bg: 'bg-red-500/10' },
    { icon: Search,        label: 'Saved Searches',   value: 2,                          href: '/dashboard/saved-searches', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: MessageSquare, label: 'Inquiries Sent',   value: demoInquiries.length,       href: '/dashboard/inquiries',      color: 'text-blue-400',   bg: 'bg-blue-500/10' },
    { icon: Calendar,      label: 'Viewings Booked',  value: demoViewings.filter(v=>v.status==='upcoming').length, href: '/dashboard/viewings', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Welcome back, {firstName} 👋</h1>
          <p className="text-slate-400 text-sm mt-1">Here's your property search overview for today.</p>
        </div>
        <Link href="/listings" className="flex items-center gap-2 h-9 px-5 rounded-lg bg-brand-gold text-slate-900 text-sm font-semibold hover:bg-amber-400 transition-colors">
          Browse Listings <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Upcoming viewing alert */}
      {upcomingViewing && (
        <div className="p-4 bg-brand-gold/10 border border-brand-gold/30 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Upcoming Viewing — {upcomingViewing.listingTitle}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {new Date(upcomingViewing.date).toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' })} at {upcomingViewing.time} · with {upcomingViewing.agentName}
            </p>
          </div>
          <Link href="/dashboard/viewings" className="shrink-0 text-xs text-brand-gold hover:text-amber-400 flex items-center gap-1 transition-colors">
            View details <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((card, i) => (
          <Link key={i} href={card.href} className="group p-5 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-brand-gold/40 transition-all duration-200">
            <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center mb-3', card.bg)}>
              <card.icon className={cn('w-[18px] h-[18px]', card.color)} />
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
            <p className="text-xs text-slate-400 mt-0.5 group-hover:text-slate-300 transition-colors">{card.label}</p>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
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
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          </Link>
        ))}
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Saved properties */}
        <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
            <h2 className="font-semibold text-white flex items-center gap-2"><Heart className="w-4 h-4 text-red-400" /> Saved Properties</h2>
            <Link href="/dashboard/saved" className="text-xs text-brand-gold hover:text-amber-400 transition-colors">View All ({savedIds.length})</Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-12"><LoadingSpinner className="w-6 h-6" /></div>
          ) : savedListings.length === 0 ? (
            <div className="text-center py-12 px-6">
              <Heart className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm font-medium">No saved properties yet</p>
              <p className="text-slate-600 text-xs mt-1 mb-4">Tap the ♥ on any listing to save it here</p>
              <Link href="/listings" className="inline-flex items-center gap-2 text-xs text-brand-gold hover:text-amber-400">Browse Listings <ArrowRight className="w-3 h-3" /></Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {savedListings.map(listing => (
                <Link key={listing.id} href={`/listings/${getListingSlug(listing)}`}
                  className="flex gap-4 px-5 py-4 hover:bg-slate-700/20 transition-colors group">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-700">
                    {listing.images?.[0] && <Image src={listing.images[0]} alt={listing.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-brand-gold transition-colors truncate">{listing.title}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5 mb-2"><MapPin className="w-3 h-3" />{listing.neighborhood}, {listing.city}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-brand-gold">{formatPrice(listing.price, true)}{listing.listingType==='rent'&&<span className="text-xs font-normal text-slate-400">/mo</span>}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500"><Bed className="w-3 h-3"/>{listing.bedrooms}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500"><Bath className="w-3 h-3"/>{listing.bathrooms}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
            <h2 className="font-semibold text-white flex items-center gap-2"><MessageSquare className="w-4 h-4 text-blue-400" /> Inquiries</h2>
            <Link href="/dashboard/inquiries" className="text-xs text-brand-gold hover:text-amber-400 transition-colors">View All</Link>
          </div>
          <div className="divide-y divide-slate-800">
            {demoInquiries.slice(0, 4).map(inq => (
              <Link key={inq.id} href="/dashboard/inquiries"
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/20 transition-colors">
                <div className="relative w-10 h-9 rounded-lg overflow-hidden shrink-0 bg-slate-700">
                  <Image src={inq.listingImage} alt="" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{inq.listingTitle}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{inq.status === 'new' ? 'Awaiting reply' : inq.status === 'contacted' ? 'Agent replied ✓' : inq.status === 'viewing-scheduled' ? 'Viewing booked ✓' : 'Applied ✓'}</p>
                </div>
                <div className={cn('w-2 h-2 rounded-full shrink-0',
                  inq.status === 'new' ? 'bg-blue-400' : inq.status === 'contacted' ? 'bg-emerald-400' : inq.status === 'viewing-scheduled' ? 'bg-brand-gold' : 'bg-purple-400'
                )} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* GTA Market Snapshot */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white flex items-center gap-2"><TrendingUp className="w-4 h-4 text-brand-gold" /> GTA Market Snapshot</h2>
          <span className="text-xs text-slate-500">April 2024 · TRREB Data</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {marketStats.map((s, i) => (
            <div key={i} className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
              <p className={cn('text-xs font-medium mt-1.5', s.up ? 'text-emerald-400' : 'text-red-400')}>{s.up ? '↑' : '↓'} {s.delta}</p>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
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
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
            </div>
          ))}
        </div>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

      {/* Recent Closings */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700">
          <h2 className="font-semibold text-white">Recent GTA Closings</h2>
          <p className="text-xs text-slate-500 mt-0.5">See what's sold recently near your search areas</p>
        </div>
        <div className="divide-y divide-slate-800">
          {recentClosings.map(sale => {
            const overAsking = sale.salePrice > sale.listPrice;
            const pctDiff = (((sale.salePrice - sale.listPrice) / sale.listPrice) * 100).toFixed(1);
            return (
              <div key={sale.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-700/20 transition-colors">
                <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
                  <Image src={sale.image} alt={sale.listingTitle} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{sale.listingTitle}</p>
                  <p className="text-xs text-slate-500">{sale.city} · {sale.daysOnMarket} days on market · Sold {sale.soldDate}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-white">{formatPrice(sale.salePrice)}</p>
                  <p className={cn('text-xs font-medium', overAsking ? 'text-emerald-400' : 'text-slate-400')}>
                    {overAsking ? '+' : ''}{pctDiff}% list
                  </p>
                </div>
              </div>
            );
          })}
        </div>
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
