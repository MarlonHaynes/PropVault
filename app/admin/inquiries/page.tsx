<<<<<<< HEAD
'use client';
<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus, type StoredInquiry } from '@/lib/store';
import { EmptyState, LoadingSpinner } from '@/components/ui/Display';
import { formatDate, cn } from '@/utils';
import { MessageSquare, Mail, Phone } from 'lucide-react';

const statusColors: Record<string, string> = {
  new:                 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  contacted:           'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  'viewing-scheduled': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  closed:              'bg-slate-700 text-slate-400 border border-slate-600',
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [filter, setFilter] = useState('');

  function load() { setInquiries(getInquiries()); }
  useEffect(() => { load(); }, []);

  const filtered = filter ? inquiries.filter(i => i.status === filter) : inquiries;

  function handleStatus(id: string, status: StoredInquiry['status']) {
    updateInquiryStatus(id, status);
    load();
  }
=======
<<<<<<< HEAD
'use client';
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { useEffect, useState } from 'react';
import { getAllInquiries } from '@/firebase/firestore';
import { formatDate } from '@/utils';
import { LoadingSpinner, EmptyState } from '@/components/ui/Display';
import { MessageSquare, Mail, Phone } from 'lucide-react';
import type { Inquiry } from '@/types';

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  contacted: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  'viewing-scheduled': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  closed: 'bg-slate-700 text-slate-400 border border-slate-600',
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getAllInquiries().then(data => {
      setInquiries(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter ? inquiries.filter(i => i.status === filter) : inquiries;

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner className="w-8 h-8" /></div>;
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Inquiries</h1>
          <p className="text-slate-400 text-sm mt-0.5">{inquiries.length} total · {inquiries.filter(i=>i.status==='new').length} new</p>
        </div>
        <div className="flex gap-2">
<<<<<<< HEAD
<<<<<<< HEAD
          {['','new','contacted','viewing-scheduled','closed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all',
                filter === s ? 'bg-brand-gold text-slate-900' : 'border border-slate-700 text-slate-400 hover:border-slate-500')}>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          {['', 'new', 'contacted', 'viewing-scheduled', 'closed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                filter === s ? 'bg-brand-gold text-slate-900' : 'border border-slate-700 text-slate-400 hover:border-slate-400'
              }`}>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
<<<<<<< HEAD
<<<<<<< HEAD
        <EmptyState title="No inquiries yet" description="When visitors submit inquiries from listing pages, they'll appear here." />
=======
        <EmptyState title="No inquiries yet" description="When users submit inquiries through listing pages, they'll appear here." />
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
        <EmptyState title="No inquiries yet" description="When users submit inquiries through listing pages, they'll appear here." />
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      ) : (
        <div className="space-y-3">
          {filtered.map(inq => (
            <div key={inq.id} className="p-5 bg-slate-800/40 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{inq.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Re: {inq.listingTitle}</p>
                    <p className="text-sm text-slate-300 mt-2 line-clamp-2">{inq.message}</p>
<<<<<<< HEAD
<<<<<<< HEAD
                    <div className="flex flex-wrap gap-3 mt-2">
                      <a href={`mailto:${inq.email}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-brand-gold transition-colors">
                        <Mail className="w-3 h-3" />{inq.email}
                      </a>
                      {inq.phone && <a href={`tel:${inq.phone}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-brand-gold transition-colors"><Phone className="w-3 h-3" />{inq.phone}</a>}
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                    <div className="flex flex-wrap gap-3 mt-3">
                      <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-gold transition-colors">
                        <Mail className="w-3 h-3" /> {inq.email}
                      </a>
                      {inq.phone && (
                        <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-gold transition-colors">
                          <Phone className="w-3 h-3" /> {inq.phone}
                        </a>
                      )}
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
<<<<<<< HEAD
<<<<<<< HEAD
                  <select value={inq.status} onChange={e => handleStatus(inq.id, e.target.value as StoredInquiry['status'])}
                    className={cn('text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer focus:outline-none', statusColors[inq.status] || statusColors.new)}>
                    {['new','contacted','viewing-scheduled','closed'].map(s => <option key={s} value={s} className="bg-slate-900 text-slate-200">{s}</option>)}
                  </select>
                  <p className="text-xs text-slate-500 mt-2">{formatDate(inq.createdAt)}</p>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs capitalize ${statusColors[inq.status] || statusColors.new}`}>
                    {inq.status}
                  </span>
                  <p className="text-xs text-slate-500 mt-2">{formatDate(inq.createdAt)}</p>
                  <p className="text-xs text-slate-500 capitalize mt-0.5">{inq.inquiryType} inquiry</p>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { EmptyState } from '@/components/ui/Display';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = { title: 'Admin — Inquiries' };

export default function AdminInquiriesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-brand-gold transition-colors mb-2">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="font-playfair text-2xl font-bold text-white">Inquiry Management</h1>
          <p className="text-slate-400 text-sm mt-1">Connect Firebase to view real inquiries from buyers.</p>
        </div>
        <EmptyState title="No inquiries yet" description="Inquiries submitted through listing pages will appear here once Firebase is connected." />
      </main>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    </div>
  );
}
