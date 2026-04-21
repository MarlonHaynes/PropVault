'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Phone, CheckCircle, XCircle, AlertCircle, Star, MessageSquare, ChevronRight } from 'lucide-react';
import { demoViewings } from '@/data/demo-data';
import { formatPrice, cn } from '@/utils';

const statusConfig = {
  upcoming:  { label: 'Upcoming',  color: 'text-brand-gold',  bg: 'bg-brand-gold/10',  border: 'border-brand-gold/30',  icon: Calendar },
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-slate-400',   bg: 'bg-slate-700/50',   border: 'border-slate-600',      icon: XCircle },
};

export default function ViewingsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? demoViewings : demoViewings.filter(v => v.status === filter);
  const upcoming  = demoViewings.filter(v => v.status === 'upcoming');
  const completed = demoViewings.filter(v => v.status === 'completed');
  const cancelled = demoViewings.filter(v => v.status === 'cancelled');

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-bold text-white">My Viewings</h1>
        <p className="text-slate-400 text-sm mt-1">{demoViewings.length} viewings scheduled or completed</p>
      </div>

      {/* Next viewing banner */}
      {upcoming.length > 0 && (
        <div className="mb-6 p-5 bg-gradient-to-r from-brand-gold/10 to-amber-500/5 border border-brand-gold/30 rounded-2xl">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Next Scheduled Viewing
              </p>
              <h2 className="font-playfair text-xl font-bold text-white">{upcoming[0].listingTitle}</h2>
              <p className="flex items-center gap-1.5 text-sm text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-brand-gold" />{upcoming[0].listingAddress}
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <Calendar className="w-4 h-4 text-brand-gold" />
                  {new Date(upcoming[0].date).toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <Clock className="w-4 h-4 text-brand-gold" />{upcoming[0].time}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Phone className="w-4 h-4" /> Agent: {upcoming[0].agentName} · {upcoming[0].agentPhone}
                </span>
              </div>
              {upcoming[0].notes && (
                <p className="text-xs text-slate-500 mt-3 italic">{upcoming[0].notes}</p>
              )}
            </div>
            <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
              <Image src={upcoming[0].listingImage} alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Upcoming',  count: upcoming.length,  color: 'text-brand-gold' },
          { label: 'Completed', count: completed.length, color: 'text-emerald-400' },
          { label: 'Cancelled', count: cancelled.length, color: 'text-slate-400' },
        ].map(s => (
          <div key={s.label} className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-center">
            <p className={cn('text-2xl font-bold', s.color)}>{s.count}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {[{k:'all',l:'All'},{k:'upcoming',l:'Upcoming'},{k:'completed',l:'Completed'},{k:'cancelled',l:'Cancelled'}].map(t => (
          <button key={t.k} onClick={() => setFilter(t.k)}
            className={cn('px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
              filter === t.k ? 'bg-brand-gold text-slate-900' : 'border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
            )}>{t.l}</button>
        ))}
      </div>

      {/* Viewing cards */}
      <div className="space-y-4">
        {filtered.map(viewing => {
          const cfg = statusConfig[viewing.status];
          const StatusIcon = cfg.icon;
          return (
            <div key={viewing.id} className={cn(
              'bg-slate-800/50 border rounded-2xl overflow-hidden',
              viewing.status === 'upcoming' ? 'border-brand-gold/30' : 'border-slate-700'
            )}>
              <div className="flex gap-4 p-5">
                {/* Image */}
                <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-700">
                  <Image src={viewing.listingImage} alt={viewing.listingTitle} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white leading-tight">{viewing.listingTitle}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3" />{viewing.listingAddress}
                      </p>
                    </div>
                    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shrink-0', cfg.color, cfg.bg, cfg.border)}>
                      <StatusIcon className="w-3 h-3" />{cfg.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-2.5">
                    <span className="flex items-center gap-1 text-xs text-slate-300 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      {new Date(viewing.date).toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" />{viewing.time}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      Agent: {viewing.agentName}
                    </span>
                    <span className="text-sm font-bold text-brand-gold">
                      {viewing.listingPrice < 10000 ? `${formatPrice(viewing.listingPrice, true)}/mo` : formatPrice(viewing.listingPrice, true)}
                    </span>
                  </div>

                  {/* Notes or feedback */}
                  {viewing.notes && viewing.status !== 'completed' && (
                    <p className="text-xs text-slate-500 mt-2 italic">{viewing.notes}</p>
                  )}
                  {viewing.feedback && (
                    <div className="mt-3 p-3 bg-slate-900/60 rounded-xl border border-slate-700/50">
                      <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Your feedback</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{viewing.feedback}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-slate-700/60 px-5 py-3 flex items-center gap-3 bg-slate-900/30">
                <a href={`tel:${viewing.agentPhone}`}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-gold transition-colors">
                  <Phone className="w-3.5 h-3.5" />{viewing.agentPhone}
                </a>
                {viewing.status === 'upcoming' && (
                  <span className="ml-auto text-xs text-brand-gold font-medium animate-pulse">● Confirmed</span>
                )}
                {viewing.status === 'completed' && (
                  <Link href="/listings" className="ml-auto flex items-center gap-1 text-xs text-brand-gold hover:text-amber-400 transition-colors">
                    Browse similar <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Book new viewing CTA */}
      <div className="mt-8 p-6 bg-slate-800/40 border border-slate-700 rounded-2xl text-center">
        <Calendar className="w-8 h-8 text-brand-gold mx-auto mb-3" />
        <h3 className="font-semibold text-white mb-1">Want to book a new viewing?</h3>
        <p className="text-sm text-slate-400 mb-4">Browse listings and contact any agent to schedule a private or open house visit.</p>
        <Link href="/listings"
          className="inline-flex items-center gap-2 h-9 px-6 rounded-lg bg-brand-gold text-slate-900 text-sm font-semibold hover:bg-amber-400 transition-colors">
          Browse Listings
        </Link>
      </div>
    </div>
  );
}
