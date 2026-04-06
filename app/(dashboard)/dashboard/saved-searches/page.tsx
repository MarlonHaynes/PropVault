'use client';
import Link from 'next/link';
import { Search, Trash2 } from 'lucide-react';
import { EmptyState } from '@/components/ui/Display';
import { Button } from '@/components/ui/Button';

// Placeholder – would pull from Firebase in production
const mockSearches = [
  { id: '1', name: 'Toronto Condos Under $800K', filters: { city: 'Toronto', propertyType: ['Condo'], maxPrice: 800000 }, createdAt: '2024-01-15' },
  { id: '2', name: 'Oakville Family Homes', filters: { city: 'Oakville', propertyType: ['House'], bedrooms: 3 }, createdAt: '2024-01-10' },
];

export default function SavedSearchesPage() {
  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold text-white mb-1">Saved Searches</h1>
      <p className="text-slate-400 text-sm mb-8">{mockSearches.length} saved searches</p>

      {mockSearches.length === 0 ? (
        <EmptyState title="No saved searches" description="Save a search to get notified when new matching properties are listed." action={<Link href="/listings"><Button variant="gold">Start Searching</Button></Link>} />
      ) : (
        <div className="space-y-3">
          {mockSearches.map(s => (
            <div key={s.id} className="flex items-center justify-between gap-4 p-5 bg-slate-800/50 border border-slate-700 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                  <Search className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{s.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Saved {s.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/listings">
                  <Button variant="outline" size="sm">View Results</Button>
                </Link>
                <button className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
