<<<<<<< HEAD
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Users, MessageSquare, TrendingUp, Plus, Database, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, Award, Clock } from 'lucide-react';
import { subscribeToListings, getAllInquiries } from '@/firebase/firestore';
import { agents } from '@/data/agents';
import { saleHistory, monthlyRevenue, agentPerformance } from '@/data/sales-history';
import { formatPrice, cn } from '@/utils';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks';
import { LoadingSpinner } from '@/components/ui/Display';
import type { Listing, Inquiry } from '@/types';

export default function AdminDashboard() {
  const { toast } = useToast();
  const [listings, setListings] = useState<Listing[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const unsub = subscribeToListings(data => { setListings(data); setLoading(false); });
    getAllInquiries().then(setInquiries);
    return unsub;
  }, []);

  async function handleSeed() {
    setSeeding(true);
    try {
      const { seedFirestoreListings } = await import('@/firebase/firestore');
      await seedFirestoreListings();
      toast('Database seeded with 30 listings!', 'success');
    } catch { toast('Failed to seed database', 'error'); }
    finally { setSeeding(false); }
  }

  // Key metrics
  const totalVolume = saleHistory.reduce((s, r) => s + r.salePrice, 0);
  const totalCommission = saleHistory.reduce((s, r) => s + r.commission, 0);
  const avgDOM = Math.round(saleHistory.reduce((s, r) => s + r.daysOnMarket, 0) / saleHistory.length);
  const thisMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1];
  const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2];
  const revenueChange = ((thisMonthRevenue.commission - lastMonthRevenue.commission) / lastMonthRevenue.commission * 100).toFixed(1);
  const active = listings.filter(l => l.propertyStatus === 'available').length;
  const newInquiries = inquiries.filter(i => i.status === 'new').length;

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner className="w-8 h-8" /></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">PropVault GTA — Performance Overview · April 2024</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="secondary" size="sm" onClick={handleSeed} loading={seeding}>
            <Database className="w-4 h-4" /> Seed DB
          </Button>
          <Link href="/admin/listings/new">
            <Button variant="gold" size="sm"><Plus className="w-4 h-4" /> New Listing</Button>
          </Link>
        </div>
      </div>

      {/* ── KPI CARDS ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            icon: DollarSign, label: 'Total Sales Volume', value: formatPrice(totalVolume, true),
            sub: `${saleHistory.length} transactions closed`, color: 'text-emerald-400', bg: 'bg-emerald-500/10',
            delta: '+14.2% YoY', up: true,
          },
          {
            icon: TrendingUp, label: 'Commission Earned', value: formatPrice(totalCommission, true),
            sub: `Avg ${formatPrice(Math.round(totalCommission / saleHistory.length), true)} / deal`, color: 'text-brand-gold', bg: 'bg-brand-gold/10',
            delta: `${revenueChange}% vs last month`, up: parseFloat(revenueChange) > 0,
          },
          {
            icon: Clock, label: 'Avg Days on Market', value: `${avgDOM} days`,
            sub: '8 days below GTA average', color: 'text-blue-400', bg: 'bg-blue-500/10',
            delta: '-3 days vs last quarter', up: true,
          },
          {
            icon: MessageSquare, label: 'Active Inquiries', value: String(inquiries.length),
            sub: `${newInquiries} new · ${listings.length} listings active`, color: 'text-purple-400', bg: 'bg-purple-500/10',
            delta: `${newInquiries} need response`, up: false,
          },
        ].map((kpi, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', kpi.bg)}>
              <kpi.icon className={cn('w-5 h-5', kpi.color)} />
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{kpi.label}</p>
            <p className="text-xs text-slate-500 mt-1">{kpi.sub}</p>
            <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', kpi.up ? 'text-emerald-400' : 'text-red-400')}>
              {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {kpi.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── REVENUE CHART ──────────────────────────────────────────────── */}
        <div className="xl:col-span-2 bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-white">Monthly Commission Revenue</h2>
              <p className="text-xs text-slate-500 mt-0.5">Last 12 months · all agents</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-brand-gold">{formatPrice(thisMonthRevenue.commission, true)}</p>
              <p className="text-xs text-slate-500">Apr 2024</p>
            </div>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-1.5 h-40">
            {monthlyRevenue.map((m, i) => {
              const maxVal = Math.max(...monthlyRevenue.map(x => x.commission));
              const pct = (m.commission / maxVal) * 100;
              const isLast = i === monthlyRevenue.length - 1;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="relative w-full flex flex-col justify-end" style={{ height: '120px' }}>
                    <div
                      className={cn('w-full rounded-t-md transition-all group-hover:opacity-80', isLast ? 'bg-brand-gold' : 'bg-slate-600 group-hover:bg-slate-500')}
                      style={{ height: `${pct}%` }}
                    />
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {formatPrice(m.commission, true)}
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-500 rotate-45 origin-left mt-1 whitespace-nowrap">{m.month}</p>
                </div>
              );
            })}
          </div>
          {/* Summary row */}
          <div className="flex gap-6 mt-6 pt-4 border-t border-slate-700">
            {[
              { label: 'YTD Volume', value: formatPrice(monthlyRevenue.slice(9).reduce((s,m)=>s+m.volume,0), true) },
              { label: 'YTD Commission', value: formatPrice(monthlyRevenue.slice(9).reduce((s,m)=>s+m.commission,0), true) },
              { label: 'YTD Sales', value: `${monthlyRevenue.slice(9).reduce((s,m)=>s+m.sales,0)} deals` },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="text-sm font-bold text-white mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── AGENT LEADERBOARD ────────────────────────────────────────── */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Agent Performance</h2>
            <Link href="/admin/agents" className="text-xs text-brand-gold hover:text-amber-400">View All</Link>
          </div>
          <div className="space-y-3">
            {agentPerformance.sort((a,b) => b.volume - a.volume).map((agent, i) => (
              <div key={agent.id} className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image src={agent.photo} alt={agent.name} width={32} height={32} className="object-cover" />
                  </div>
                  {i === 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-gold flex items-center justify-center">
                      <Award className="w-2.5 h-2.5 text-slate-900" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{agent.name.split(' ')[0]} {agent.name.split(' ')[1]?.[0]}.</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-gold rounded-full"
                        style={{ width: `${(agent.volume / agentPerformance[0].volume) * 100}%` }} />
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-white">{formatPrice(agent.volume, true)}</p>
                  <p className="text-[10px] text-slate-500">{agent.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ── RECENT SALES HISTORY ────────────────────────────────────── */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
            <h2 className="font-semibold text-white">Recent Closed Sales</h2>
            <span className="text-xs text-slate-500">{saleHistory.length} transactions</span>
          </div>
          <div className="divide-y divide-slate-800">
            {saleHistory.slice(0, 6).map(sale => {
              const overAsking = sale.salePrice > sale.listPrice;
              const pctDiff = (((sale.salePrice - sale.listPrice) / sale.listPrice) * 100).toFixed(1);
              return (
                <div key={sale.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-700/20 transition-colors">
                  <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image src={sale.image} alt={sale.listingTitle} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{sale.listingTitle}</p>
                    <p className="text-xs text-slate-500">{sale.city} · {sale.soldDate}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white">{formatPrice(sale.salePrice, true)}</p>
                    <p className={cn('text-xs font-medium', overAsking ? 'text-emerald-400' : 'text-slate-400')}>
                      {overAsking ? `+${pctDiff}%` : `${pctDiff}%`} asking
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-5 py-3 border-t border-slate-700 bg-slate-900/30">
            <Link href="/admin/inquiries" className="text-xs text-brand-gold hover:text-amber-400 transition-colors">
              View all sales history →
            </Link>
          </div>
        </div>

        {/* ── ACTIVE LISTINGS SNAPSHOT ─────────────────────────────────── */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
            <h2 className="font-semibold text-white">Active Listings</h2>
            <Link href="/admin/listings" className="text-xs text-brand-gold hover:text-amber-400">Manage →</Link>
          </div>
          {/* Status breakdown */}
          <div className="grid grid-cols-4 divide-x divide-slate-700 border-b border-slate-700">
            {[
              { label: 'Available', count: listings.filter(l=>l.propertyStatus==='available').length, color: 'text-emerald-400' },
              { label: 'Pending', count: listings.filter(l=>l.propertyStatus==='pending').length, color: 'text-amber-400' },
              { label: 'Sold', count: listings.filter(l=>l.propertyStatus==='sold').length, color: 'text-red-400' },
              { label: 'Featured', count: listings.filter(l=>l.featured).length, color: 'text-brand-gold' },
            ].map(s => (
              <div key={s.label} className="py-3 text-center">
                <p className={cn('text-xl font-bold', s.color)}>{s.count}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          {/* Recent listings */}
          <div className="divide-y divide-slate-800">
            {listings.slice(0, 5).map(l => (
              <div key={l.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-700/20 transition-colors">
                <div className="relative w-10 h-9 rounded-lg overflow-hidden shrink-0 bg-slate-700">
                  {l.images?.[0] && <Image src={l.images[0]} alt={l.title} fill className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{l.title}</p>
                  <p className="text-xs text-slate-500">{l.neighborhood}, {l.city}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-brand-gold">{formatPrice(l.price, true)}</p>
                  <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full',
                    l.propertyStatus === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                    l.propertyStatus === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                  )}>{l.propertyStatus}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-slate-700 bg-slate-900/30">
            <Link href="/admin/listings/new" className="text-xs text-brand-gold hover:text-amber-400 transition-colors">
              + Add new listing
            </Link>
          </div>
        </div>
      </div>

      {/* ── INQUIRY PIPELINE ─────────────────────────────────────────────── */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <h2 className="font-semibold text-white">Inquiry Pipeline</h2>
          <Link href="/admin/inquiries" className="text-xs text-brand-gold hover:text-amber-400">View All →</Link>
        </div>
        {inquiries.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-500 text-sm">No inquiries yet. They'll appear here when buyers reach out.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-slate-900/40">
                <tr>
                  {['Buyer', 'Property', 'Type', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase">{h}</th>
=======
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { listings } from '@/data/listings';
import { agents } from '@/data/agents';
import { LayoutDashboard, Home, Users, MessageSquare, TrendingUp, Settings } from 'lucide-react';
import { formatPrice } from '@/utils';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default function AdminPage() {
  const totalListings = listings.length;
  const activeListings = listings.filter(l => l.propertyStatus === 'available').length;
  const avgPrice = Math.round(listings.reduce((s, l) => s + l.price, 0) / listings.length);
  const totalAgents = agents.length;

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-gold/20 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-brand-gold" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-white">Admin Dashboard</h1>
          <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Demo Mode</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Home, label: 'Total Listings', value: totalListings, sub: `${activeListings} active` },
            { icon: TrendingUp, label: 'Average Price', value: formatPrice(avgPrice, true), sub: 'Across GTA' },
            { icon: Users, label: 'Agents', value: totalAgents, sub: `${agents.filter(a => a.featured).length} featured` },
            { icon: MessageSquare, label: 'Inquiries', value: '0', sub: 'Demo mode' },
          ].map((s, i) => (
            <div key={i} className="p-5 bg-slate-800/50 border border-slate-700 rounded-xl">
              <s.icon className="w-5 h-5 text-brand-gold mb-3" />
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              <div className="text-xs text-slate-500 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { href: '/admin/listings', icon: Home, label: 'Manage Listings', desc: 'View, edit, and publish properties' },
            { href: '/admin/agents', icon: Users, label: 'Manage Agents', desc: 'Agent profiles and assignments' },
            { href: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries', desc: 'View and respond to buyer inquiries' },
          ].map(link => (
            <Link key={link.href} href={link.href} className="group p-6 bg-slate-800/40 border border-slate-700 rounded-xl hover:border-brand-gold/40 transition-all">
              <link.icon className="w-6 h-6 text-brand-gold mb-3" />
              <h3 className="font-semibold text-white group-hover:text-brand-gold transition-colors">{link.label}</h3>
              <p className="text-xs text-slate-400 mt-1">{link.desc}</p>
            </Link>
          ))}
        </div>

        {/* Listings table preview */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
            <h2 className="font-semibold text-white">Recent Listings</h2>
            <Link href="/admin/listings" className="text-xs text-brand-gold hover:text-amber-400 transition-colors">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/40">
                <tr>
                  {['Title', 'City', 'Price', 'Type', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">{h}</th>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
<<<<<<< HEAD
                {inquiries.slice(0, 6).map(inq => (
                  <tr key={inq.id} className="hover:bg-slate-700/20">
                    <td className="px-5 py-3 text-sm text-white font-medium">{inq.name}</td>
                    <td className="px-5 py-3 text-sm text-slate-400 max-w-[180px] truncate">{inq.listingTitle}</td>
                    <td className="px-5 py-3 text-xs text-slate-400 capitalize">{inq.inquiryType}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{new Date(inq.createdAt).toLocaleDateString('en-CA')}</td>
                    <td className="px-5 py-3">
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium capitalize',
                        inq.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                        inq.status === 'contacted' ? 'bg-amber-500/20 text-amber-400' :
                        inq.status === 'viewing-scheduled' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-slate-700 text-slate-400'
                      )}>{inq.status}</span>
=======
                {listings.slice(0, 8).map(l => (
                  <tr key={l.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3 text-sm text-white">{l.title}</td>
                    <td className="px-5 py-3 text-sm text-slate-400">{l.city}</td>
                    <td className="px-5 py-3 text-sm text-brand-gold font-medium">{formatPrice(l.price)}</td>
                    <td className="px-5 py-3 text-sm text-slate-400 capitalize">{l.propertyType}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        l.propertyStatus === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                        l.propertyStatus === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>{l.propertyStatus}</span>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
<<<<<<< HEAD
        )}
      </div>
=======
        </div>
      </main>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
    </div>
  );
}
