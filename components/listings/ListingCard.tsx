'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Maximize2, Heart, MapPin, GitCompare } from 'lucide-react';
import { cn, formatPrice, slugify } from '@/utils';
import { StatusBadge } from '@/components/ui/Display';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { useCompare } from '@/context/CompareContext';
import { useToast } from '@/hooks';
import type { Listing } from '@/types';

interface ListingCardProps {
  listing: Listing;
  layout?: 'grid' | 'list';
}

export function ListingCard({ listing, layout = 'grid' }: ListingCardProps) {
  const { user } = useAuth();
  const { isSaved, toggleSave } = useSaved();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const { toast } = useToast();
  const saved = isSaved(listing.id);
  const inCompare = isInCompare(listing.id);
  const slug = slugify(listing.title) + '-' + listing.id.slice(-4);

  async function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    if (!user) { toast('Sign in to save properties', 'info'); return; }
    await toggleSave(listing.id);
    toast(saved ? 'Removed from saved' : 'Property saved!', saved ? 'info' : 'success');
  }

  function handleCompare(e: React.MouseEvent) {
    e.preventDefault();
    if (inCompare) { removeFromCompare(listing.id); toast('Removed from compare', 'info'); }
    else { addToCompare(listing); toast('Added to compare', 'success'); }
  }

  if (layout === 'list') {
    return (
      <Link href={`/listings/${slug}`} className="group flex gap-4 bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-brand-gold/50 transition-all duration-300">
        <div className="relative w-48 shrink-0 overflow-hidden">
          <Image src={listing.images[0]} alt={listing.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <StatusBadge status={listing.propertyStatus} className="absolute top-2 left-2" />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-white group-hover:text-brand-gold transition-colors line-clamp-1">{listing.title}</h3>
              <span className="text-brand-gold font-bold whitespace-nowrap">{formatPrice(listing.price)}</span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mb-2">
              <MapPin className="w-3 h-3" />{listing.neighborhood}, {listing.city}
            </p>
            <p className="text-sm text-slate-400 line-clamp-2">{listing.description}</p>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-slate-400 flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{listing.bedrooms} bed</span>
            <span className="text-xs text-slate-400 flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{listing.bathrooms} bath</span>
            <span className="text-xs text-slate-400 flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" />{listing.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/listings/${slug}`} className="group block bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-brand-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/5">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={listing.images[0]} alt={listing.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <StatusBadge status={listing.propertyStatus} />
          {listing.featured && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-gold/90 text-slate-900">Featured</span>
          )}
          {listing.newDevelopment && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-teal/90 text-white">New Dev</span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <button onClick={handleSave} className={cn(
            'w-7 h-7 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all',
            saved ? 'bg-red-500 border-red-500 text-white' : 'bg-black/40 border-white/20 text-white hover:bg-red-500 hover:border-red-500'
          )}>
            <Heart className={cn('w-3.5 h-3.5', saved && 'fill-current')} />
          </button>
          <button onClick={handleCompare} className={cn(
            'w-7 h-7 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all',
            inCompare ? 'bg-brand-teal border-brand-teal text-white' : 'bg-black/40 border-white/20 text-white hover:bg-brand-teal hover:border-brand-teal'
          )}>
            <GitCompare className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="text-lg font-bold text-white">
            {formatPrice(listing.price)}
            {listing.listingType === 'rent' && <span className="text-xs font-normal text-slate-300">/mo</span>}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-slate-400 flex items-center gap-1 mb-1">
          <MapPin className="w-3 h-3" />{listing.neighborhood}, {listing.city}
        </p>
        <h3 className="font-semibold text-white group-hover:text-brand-gold transition-colors mb-3 line-clamp-1">
          {listing.title}
        </h3>
        <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
          <span className="flex items-center gap-1 text-xs text-slate-400"><Bed className="w-3.5 h-3.5" />{listing.bedrooms}</span>
          <span className="flex items-center gap-1 text-xs text-slate-400"><Bath className="w-3.5 h-3.5" />{listing.bathrooms}</span>
          <span className="flex items-center gap-1 text-xs text-slate-400"><Maximize2 className="w-3.5 h-3.5" />{listing.sqft.toLocaleString()}</span>
          <span className="ml-auto text-xs text-slate-500 capitalize">{listing.propertyType}</span>
        </div>
      </div>
    </Link>
  );
}
