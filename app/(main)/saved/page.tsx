'use client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listings/ListingCard';
import { EmptyState } from '@/components/ui/Display';
import { useSaved } from '@/context/SavedContext';
import { useAuth } from '@/context/AuthContext';
import { listings } from '@/data/listings';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SavedPage() {
  const { user } = useAuth();
  const { savedIds } = useSaved();
  const savedListings = listings.filter(l => savedIds.includes(l.id));

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-3xl font-bold text-white mb-2">Saved Properties</h1>
          <p className="text-slate-400 mb-8">{savedListings.length} saved {savedListings.length === 1 ? 'property' : 'properties'}</p>

          {!user ? (
            <div className="text-center py-20">
              <p className="text-slate-400 mb-4">Sign in to save and manage your favourite properties.</p>
              <Link href="/login"><Button variant="gold">Sign In</Button></Link>
            </div>
          ) : savedListings.length === 0 ? (
            <EmptyState title="No saved properties yet" description="Browse listings and tap the heart icon to save properties you love." action={<Link href="/listings"><Button variant="gold">Browse Listings</Button></Link>} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedListings.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
