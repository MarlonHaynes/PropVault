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
    </div>
  );
}
