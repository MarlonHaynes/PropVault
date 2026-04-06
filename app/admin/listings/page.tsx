import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { listings } from '@/data/listings';
import { formatPrice } from '@/utils';
import { ChevronLeft, Plus, Pencil } from 'lucide-react';

export const metadata: Metadata = { title: 'Admin — Listings' };

export default function AdminListingsPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-brand-gold transition-colors mb-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </Link>
            <h1 className="font-playfair text-2xl font-bold text-white">Listings Management</h1>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-brand-gold text-slate-900 text-sm font-semibold hover:bg-amber-400 transition-colors">
            <Plus className="w-4 h-4" /> Add Listing
          </button>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-900/40">
                <tr>
                  {['ID', 'Title', 'City', 'Price', 'Type', 'Status', 'Agent', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {listings.map(l => (
                  <tr key={l.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-3 text-xs text-slate-500 font-mono">{l.id.slice(-6)}</td>
                    <td className="px-4 py-3 text-sm text-white max-w-[200px] truncate">{l.title}</td>
                    <td className="px-4 py-3 text-sm text-slate-400">{l.city}</td>
                    <td className="px-4 py-3 text-sm text-brand-gold font-medium">{formatPrice(l.price, true)}</td>
                    <td className="px-4 py-3 text-sm text-slate-400 capitalize">{l.propertyType}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        l.propertyStatus === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                        l.propertyStatus === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>{l.propertyStatus}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">{l.agentId.slice(-4)}</td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 text-slate-400 hover:text-brand-gold transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
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
