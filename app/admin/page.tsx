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
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
