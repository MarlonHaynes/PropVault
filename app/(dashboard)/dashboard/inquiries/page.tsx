'use client';
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare, MapPin, Phone, Mail, ChevronDown, ChevronUp, ExternalLink, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { demoInquiries } from '@/data/demo-data';
import { formatPrice, getListingSlug, cn } from '@/utils';

const statusConfig = {
  'new':                { label: 'Sent',               icon: Clock,        color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/30' },
  'contacted':          { label: 'Agent Replied',       icon: CheckCircle,  color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  'viewing-scheduled':  { label: 'Viewing Scheduled',   icon: CheckCircle,  color: 'text-brand-gold',  bg: 'bg-brand-gold/10',  border: 'border-brand-gold/30' },
  'closed':             { label: 'Application Sent',    icon: CheckCircle,  color: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/30' },
};

export default function InquiriesPage() {
  const [expanded, setExpanded] = useState<string | null>('inq-demo-001');
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? demoInquiries
    : demoInquiries.filter(i => i.status === filter);

  const counts = {
    all: demoInquiries.length,
    new: demoInquiries.filter(i => i.status === 'new').length,
    contacted: demoInquiries.filter(i => i.status === 'contacted').length,
    'viewing-scheduled': demoInquiries.filter(i => i.status === 'viewing-scheduled').length,
    closed: demoInquiries.filter(i => i.status === 'closed').length,
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-bold text-white">My Inquiries</h1>
        <p className="text-slate-400 text-sm mt-1">{demoInquiries.length} inquiries sent · track your conversations with agents</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'all', label: 'All' },
          { key: 'new', label: 'Sent' },
          { key: 'contacted', label: 'Replied' },
          { key: 'viewing-scheduled', label: 'Viewing Set' },
          { key: 'closed', label: 'Applied' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setFilter(tab.key)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              filter === tab.key
                ? 'bg-brand-gold text-slate-900'
                : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
            )}>
            {tab.label}
            <span className={cn('text-xs px-1.5 py-0.5 rounded-full', filter === tab.key ? 'bg-slate-900/30 text-slate-900' : 'bg-slate-700 text-slate-300')}>
              {counts[tab.key as keyof typeof counts]}
            </span>
          </button>
        ))}
      </div>

      {/* Inquiry cards */}
      <div className="space-y-4">
        {filtered.map(inq => {
          const cfg = statusConfig[inq.status];
          const isExpanded = expanded === inq.id;
          const StatusIcon = cfg.icon;

          return (
            <div key={inq.id} className={cn(
              'bg-slate-800/50 border rounded-2xl overflow-hidden transition-all duration-200',
              isExpanded ? 'border-brand-gold/40' : 'border-slate-700 hover:border-slate-600'
            )}>
              {/* Card header */}
              <button
                className="w-full flex items-start gap-4 p-5 text-left"
                onClick={() => setExpanded(isExpanded ? null : inq.id)}
              >
                {/* Listing thumbnail */}
                <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-700">
                  <Image src={inq.listingImage} alt={inq.listingTitle} fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-semibold text-white text-sm leading-tight">{inq.listingTitle}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3" />{inq.listingAddress}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border', cfg.color, cfg.bg, cfg.border)}>
                        <StatusIcon className="w-3 h-3" />{cfg.label}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-brand-gold font-bold text-sm">
                      {inq.listingType === 'rent' ? `${formatPrice(inq.listingPrice, true)}/mo` : formatPrice(inq.listingPrice, true)}
                    </span>
                    <span className="text-xs text-slate-500 capitalize">{inq.inquiryType} inquiry</span>
                    <span className="text-xs text-slate-500">
                      {new Date(inq.createdAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-slate-700 p-5 space-y-5">
                  {/* Agent + Your message side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Agent info */}
                    <div className="bg-slate-900/60 rounded-xl p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Your Agent</p>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                          <Image src={inq.agentPhoto} alt={inq.agentName} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{inq.agentName}</p>
                          <p className="text-xs text-brand-gold">PropVault Senior Agent</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <a href={`tel:${inq.agentPhone}`} className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-gold transition-colors">
                          <Phone className="w-3.5 h-3.5" />{inq.agentPhone}
                        </a>
                        <a href={`mailto:${inq.agentEmail}`} className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-gold transition-colors">
                          <Mail className="w-3.5 h-3.5" />{inq.agentEmail}
                        </a>
                      </div>
                    </div>

                    {/* Message thread */}
                    <div className="bg-slate-900/60 rounded-xl p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Message Thread</p>
                      {/* Your message */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center">
                            <span className="text-brand-gold text-[9px] font-bold">You</span>
                          </div>
                          <span className="text-[10px] text-slate-500">
                            {new Date(inq.createdAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 rounded-lg p-2.5 line-clamp-3">{inq.message}</p>
                      </div>
                      {/* Agent response */}
                      {inq.response && (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-5 h-5 rounded-full overflow-hidden">
                              <Image src={inq.agentPhoto} alt="" width={20} height={20} className="object-cover" />
                            </div>
                            <span className="text-[10px] text-slate-500">
                              {new Date(inq.lastUpdate).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed bg-emerald-900/20 border border-emerald-800/30 rounded-lg p-2.5">{inq.response}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-1">
                    <Link href={`/listings/${inq.listingId === 'lst-001' ? 'pinnacle-penthouse-king-west' : inq.listingId}`}
                      className="flex items-center gap-1.5 h-8 px-4 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs text-slate-200 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> View Listing
                    </Link>
                    <a href={`mailto:${inq.agentEmail}`}
                      className="flex items-center gap-1.5 h-8 px-4 rounded-lg bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/30 text-xs text-brand-gold transition-colors">
                      <Mail className="w-3.5 h-3.5" /> Reply to Agent
                    </a>
                    {inq.status === 'viewing-scheduled' && (
                      <span className="ml-auto text-xs text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Viewing confirmed — see Viewings tab
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
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
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    </div>
  );
}
