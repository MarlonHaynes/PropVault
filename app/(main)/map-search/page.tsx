<<<<<<< HEAD
// app/(main)/map-search/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { PropertyMap } from '@/components/map/PropertyMap';
import { useListingsContext } from '@/context/ListingsContext';
import { useSaved } from '@/context/SavedContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks';
import { formatPrice, getListingSlug, cn } from '@/utils';
import { LoadingSpinner } from '@/components/ui/Display';
import type { Listing } from '@/types';

const CITY_FILTERS = ['All', 'Toronto', 'Mississauga', 'Oakville', 'Vaughan', 'Markham', 'Richmond Hill', 'Brampton'];
const TYPE_FILTERS = [
  { value: '', label: 'Any Type' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
  { value: 'new-development', label: 'New Dev' },
];

export default function MapSearchPage() {
  const { listings: allListings, loading } = useListingsContext();
  const { isSaved, toggleSave } = useSaved();
  const { user } = useAuth();
  const { toast } = useToast();

  const [city, setCity] = useState('All');
  const [typeFilter, setTypeFilter] = useState('');
  const [keyword, setKeyword] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = allListings.filter(l => {
    const matchCity = city === 'All' || l.city === city;
    const matchType = !typeFilter || l.listingType === typeFilter;
    const matchKw =
      !keyword ||
      l.title.toLowerCase().includes(keyword.toLowerCase()) ||
      l.neighborhood.toLowerCase().includes(keyword.toLowerCase());

    return matchCity && matchType && matchKw;
  });

  async function handleSave(e: React.MouseEvent, listing: Listing) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast('Sign in to save properties', 'info');
      return;
    }

    await toggleSave(listing.id);
    toast(isSaved(listing.id) ? 'Removed from saved' : 'Property saved!', 'success');
  }

  return (
    <div className="h-screen bg-brand-dark flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden pt-16">
        <div className="flex-1 relative overflow-hidden">
          <PropertyMap
            listings={filtered}
            selectedListing={selectedListing}
            setSelectedListing={setSelectedListing}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        </div>

        <div className="w-[420px] shrink-0 flex flex-col bg-slate-900 border-l border-slate-800">
          <div className="p-4 border-b border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  placeholder="Search listings..."
                  className="w-full h-9 pl-9 pr-3 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'h-9 px-3 rounded-lg border text-sm flex items-center gap-1.5 transition-all',
                  showFilters
                    ? 'border-brand-gold text-brand-gold bg-brand-gold/10'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500'
                )}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {showFilters && (
              <div className="flex gap-2">
                {TYPE_FILTERS.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTypeFilter(t.value)}
                    className={cn(
                      'flex-1 py-1.5 text-xs rounded-lg border font-medium transition-all',
                      typeFilter === t.value
                        ? 'bg-brand-gold/20 border-brand-gold text-brand-gold'
                        : 'border-slate-700 text-slate-400 hover:border-slate-500'
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {CITY_FILTERS.map(c => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all shrink-0',
                    city === c
                      ? 'bg-brand-gold text-slate-900 border-brand-gold'
                      : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                  )}
                >
=======
'use client';
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listings/ListingCard';
import { listings } from '@/data/listings';
import { MapPin } from 'lucide-react';

const cities = ['All', 'Toronto', 'Mississauga', 'Oakville', 'Vaughan', 'Markham', 'Richmond Hill', 'Brampton'];

export default function MapSearchPage() {
  const [city, setCity] = useState('All');
  const filtered = city === 'All' ? listings.slice(0, 9) : listings.filter(l => l.city === city).slice(0, 9);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-20">
        <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
          {/* Map placeholder */}
          <div className="lg:flex-1 bg-slate-800 relative flex items-center justify-center border-r border-slate-700">
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #c8a97e 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>
            <div className="text-center z-10">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="text-white font-playfair text-2xl font-semibold mb-2">Interactive Map</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Connect a Google Maps API key in <span className="text-brand-gold font-mono text-xs">.env.local</span> to enable the full interactive map experience.
              </p>
            </div>
            {/* Fake pins */}
            {['10%,20%', '30%,60%', '55%,35%', '70%,70%', '80%,25%', '45%,80%'].map((pos, i) => {
              const [top, left] = pos.split(',');
              return (
                <div key={i} className="absolute" style={{ top, left }}>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center animate-pulse cursor-pointer hover:scale-110 transition-transform">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Listings panel */}
          <div className="w-full lg:w-96 flex flex-col border-l border-slate-700">
            {/* City filter */}
            <div className="p-4 border-b border-slate-700 flex gap-2 overflow-x-auto">
              {cities.map(c => (
                <button key={c} onClick={() => setCity(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    city === c ? 'bg-brand-gold text-slate-900' : 'border border-slate-600 text-slate-400 hover:border-slate-400'
                  }`}>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
                  {c}
                </button>
              ))}
            </div>
<<<<<<< HEAD

            <p className="text-xs text-slate-500">
              {loading ? 'Loading...' : `${filtered.length} propert${filtered.length === 1 ? 'y' : 'ies'} found`}
              {(city !== 'All' || typeFilter || keyword) && (
                <button
                  onClick={() => {
                    setCity('All');
                    setTypeFilter('');
                    setKeyword('');
                  }}
                  className="ml-2 text-brand-gold hover:text-amber-400 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <LoadingSpinner className="w-6 h-6" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 px-6">
                <MapPin className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm font-medium">No properties found</p>
                <p className="text-slate-600 text-xs mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {filtered.map(listing => {
                  const saved = isSaved(listing.id);
                  const isSelected = selectedListing?.id === listing.id;
                  const slug = getListingSlug(listing);

                  return (
                    <Link
                      key={listing.id}
                      href={`/listings/${slug}`}
                      onMouseEnter={() => setHoveredId(listing.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedListing(listing)}
                      className={cn(
                        'flex gap-3 p-4 hover:bg-slate-800/60 transition-all duration-150 group relative',
                        isSelected && 'bg-slate-800/80 border-l-2 border-brand-gold',
                        hoveredId === listing.id && !isSelected && 'bg-slate-800/40'
                      )}
                    >
                      <div
                        className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-700 flex-shrink-0"
                        style={{ minWidth: '96px', height: '80px' }}
                      >
                        {listing.images?.[0] ? (
                          <Image
                            src={listing.images[0]}
                            alt={listing.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-slate-500" />
                          </div>
                        )}

                        <div
                          className={cn(
                            'absolute top-1.5 left-1.5 w-2 h-2 rounded-full border border-white/50',
                            listing.propertyStatus === 'available'
                              ? 'bg-emerald-400'
                              : listing.propertyStatus === 'pending'
                                ? 'bg-amber-400'
                                : 'bg-red-400'
                          )}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-white group-hover:text-brand-gold transition-colors line-clamp-1 leading-tight">
                              {listing.title}
                            </p>
                            <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">
                                {listing.neighborhood}, {listing.city}
                              </span>
                            </p>
                          </div>

                          <button
                            onClick={e => handleSave(e, listing)}
                            className={cn(
                              'shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all',
                              saved
                                ? 'text-red-400 bg-red-400/10'
                                : 'text-slate-500 hover:text-red-400 hover:bg-red-400/10'
                            )}
                          >
                            <Heart className={cn('w-3.5 h-3.5', saved && 'fill-current')} />
                          </button>
                        </div>

                        <p className="text-base font-bold text-brand-gold mt-1.5">
                          {formatPrice(listing.price, true)}
                          {listing.listingType === 'rent' && (
                            <span className="text-xs font-normal text-slate-400">/mo</span>
                          )}
                        </p>

                        <div className="flex items-center gap-3 mt-1.5">
                          {listing.bedrooms > 0 && (
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <Bed className="w-3 h-3" />
                              {listing.bedrooms}
                            </span>
                          )}

                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Bath className="w-3 h-3" />
                            {listing.bathrooms}
                          </span>

                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Maximize2 className="w-3 h-3" />
                            {listing.sqft?.toLocaleString()}
                          </span>

                          <span className="ml-auto text-[10px] font-medium text-slate-500 capitalize bg-slate-800 px-1.5 py-0.5 rounded">
                            {listing.propertyType}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
=======
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filtered.map(l => <ListingCard key={l.id} listing={l} layout="list" />)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
