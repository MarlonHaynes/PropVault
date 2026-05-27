<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { agents } from '@/data/agents';
import { agentPerformance } from '@/data/sales-history';
import { formatPrice, cn } from '@/utils';
import { Star, Phone, Mail, TrendingUp, Award, Search } from 'lucide-react';

export default function AdminAgentsPage() {
  const [search, setSearch] = useState('');
  const filtered = agents.filter(a =>
    !search || a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.cities.some(c => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Agent Management</h1>
          <p className="text-slate-400 text-sm mt-0.5">{agents.length} agents · {agents.filter(a=>a.featured).length} featured</p>
        </div>
      </div>

      {/* Performance leaderboard */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand-gold" />
          <h2 className="font-semibold text-white">2024 YTD Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-slate-900/40">
              <tr>
                {['Rank','Agent','Sales','Volume','Commission','Avg DOM','Rating'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {agentPerformance.sort((a,b) => b.volume - a.volume).map((perf, i) => {
                const agent = agents.find(a => a.id === perf.id);
                if (!agent) return null;
                return (
                  <tr key={perf.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-3">
                      <span className={cn('text-sm font-bold', i === 0 ? 'text-brand-gold' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-700' : 'text-slate-500')}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image src={agent.photo} alt={agent.name} width={32} height={32} className="object-cover" unoptimized />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{agent.name}</p>
                          <p className="text-xs text-slate-500">{agent.brokerage}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-white font-medium">{perf.sales}</td>
                    <td className="px-4 py-3 text-sm text-brand-gold font-semibold">{formatPrice(perf.volume, true)}</td>
                    <td className="px-4 py-3 text-sm text-emerald-400">{formatPrice(perf.commission, true)}</td>
                    <td className="px-4 py-3 text-sm text-slate-400">{perf.avgDOM} days</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-sm text-white">
                        <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />{perf.rating}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* All agents grid */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search agents..."
            className="w-full h-9 pl-9 pr-3 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-gold" />
        </div>
        <p className="text-sm text-slate-500">{filtered.length} agents</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(a => (
          <div key={a.id} className="flex items-start gap-4 p-4 bg-slate-800/40 border border-slate-700 rounded-xl hover:border-brand-gold/30 transition-all">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
              <Image src={a.photo} alt={a.name} width={56} height={56} className="object-cover" unoptimized />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-white text-sm truncate">{a.name}</p>
                {a.featured && <Award className="w-3.5 h-3.5 text-brand-gold shrink-0" />}
              </div>
              <p className="text-xs text-brand-gold">{a.title}</p>
              <p className="text-xs text-slate-500 truncate">{a.brokerage}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-0.5 text-xs text-white"><Star className="w-3 h-3 fill-brand-gold text-brand-gold" />{a.rating}</span>
                <span className="text-xs text-slate-500">{a.activeListings} active</span>
                <span className="text-xs text-slate-500">{a.totalSales} sold</span>
              </div>
              <div className="flex gap-2 mt-3">
                <a href={`tel:${a.phone}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-brand-gold transition-colors">
                  <Phone className="w-3 h-3" /> Call
                </a>
                <a href={`mailto:${a.email}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-brand-gold transition-colors">
                  <Mail className="w-3 h-3" /> Email
                </a>
                <Link href={`/agents/${a.id}`} className="ml-auto text-xs text-brand-gold hover:text-amber-400 transition-colors">
                  Profile →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { agents } from '@/data/agents';
import { ChevronLeft, Star } from 'lucide-react';

export const metadata: Metadata = { title: 'Admin — Agents' };

export default function AdminAgentsPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-brand-gold transition-colors mb-2">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="font-playfair text-2xl font-bold text-white">Agent Management</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map(a => (
            <div key={a.id} className="flex items-center gap-4 p-5 bg-slate-800/40 border border-slate-700 rounded-xl">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image src={a.photo} alt={a.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white text-sm truncate">{a.name}</p>
                <p className="text-xs text-brand-gold truncate">{a.title}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                  <span className="text-xs text-slate-400">{a.rating} · {a.activeListings} listings</span>
                </div>
              </div>
              <Link href={`/agents/${a.id}`} className="text-xs text-brand-gold hover:text-amber-400 transition-colors shrink-0">
                View
              </Link>
            </div>
          ))}
        </div>
      </main>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    </div>
  );
}
