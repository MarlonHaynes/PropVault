'use client';
import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listings/ListingCard';
import { AdvancedFilters, defaultFilters } from '@/components/listings/AdvancedFilters';
import { Pagination, EmptyState, LoadingSpinner } from '@/components/ui/Display';
import { useListings } from '@/hooks';
import type { FilterState } from '@/types';

export default function ListingsPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const { results, total, page, setPage, totalPages, loading } = useListings(filters);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-playfair text-3xl font-bold text-white">GTA Property Listings</h1>
            <p className="text-slate-400 mt-1">{loading ? 'Loading…' : `${total} properties found`}</p>
          </div>

          <AdvancedFilters filters={filters} onChange={setFilters} />

          <div className="flex items-center justify-between my-6">
            <p className="text-sm text-slate-400">{loading ? '' : `${total} results`}</p>
            <div className="flex items-center gap-1 border border-slate-700 rounded-lg p-1">
              <button onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-md transition-all ${layout === 'grid' ? 'bg-brand-gold text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setLayout('list')}
                className={`p-1.5 rounded-md transition-all ${layout === 'list' ? 'bg-brand-gold text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner className="w-10 h-10" />
            </div>
          ) : results.length === 0 ? (
            <EmptyState title="No properties found" description="Try adjusting your filters to see more results." />
          ) : layout === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {results.map(l => <ListingCard key={l.id} listing={l} layout="list" />)}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
