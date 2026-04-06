'use client';
import { useInquiries } from '@/hooks';
import { EmptyState, LoadingSpinner } from '@/components/ui/Display';
import { formatDate } from '@/utils';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  contacted: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  'viewing-scheduled': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  closed: 'bg-slate-800 text-slate-500 border border-slate-700',
};

export default function InquiriesPage() {
  const { inquiries, loading } = useInquiries();

  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold text-white mb-1">My Inquiries</h1>
      <p className="text-slate-400 text-sm mb-8">{inquiries.length} sent</p>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner className="w-8 h-8" /></div>
      ) : inquiries.length === 0 ? (
        <EmptyState title="No inquiries yet" description="When you contact an agent about a property, your inquiries will appear here." action={<Link href="/listings"><Button variant="gold">Browse Listings</Button></Link>} />
      ) : (
        <div className="space-y-3">
          {inquiries.map(inq => (
            <div key={inq.id} className="p-5 bg-slate-800/50 border border-slate-700 rounded-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{inq.listingTitle}</p>
                    <p className="text-xs text-slate-400 capitalize mt-0.5">{inq.inquiryType} inquiry</p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{inq.message}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs capitalize ${statusColors[inq.status] || statusColors.new}`}>{inq.status}</span>
                  <p className="text-xs text-slate-500 mt-1.5">{formatDate(inq.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
