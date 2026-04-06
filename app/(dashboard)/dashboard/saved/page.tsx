'use client';
import Link from 'next/link';
import { useSaved } from '@/context/SavedContext';
import { listings } from '@/data/listings';
import { ListingCard } from '@/components/listings/ListingCard';
import { EmptyState } from '@/components/ui/Display';
import { Button } from '@/components/ui/Button';

export default function DashboardSavedPage() {
  const { savedIds } = useSaved();
  const saved = listings.filter(l => savedIds.includes(l.id));

  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold text-white mb-1">Saved Properties</h1>
      <p className="text-slate-400 text-sm mb-8">{saved.length} saved {saved.length === 1 ? 'property' : 'properties'}</p>

      {saved.length === 0 ? (
        <EmptyState title="No saved properties" description="Browse listings and save your favourites to track them here." action={<Link href="/listings"><Button variant="gold">Browse Listings</Button></Link>} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {saved.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  );
}
