'use client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EmptyState } from '@/components/ui/Display';
import { useCompare } from '@/context/CompareContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { X, Bed, Bath, Maximize2, Car } from 'lucide-react';
import { formatPrice } from '@/utils';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  const rows = [
    { label: 'Price', fn: (l: typeof compareList[0]) => formatPrice(l.price) },
    { label: 'Type', fn: (l: typeof compareList[0]) => l.propertyType },
    { label: 'Bedrooms', fn: (l: typeof compareList[0]) => `${l.bedrooms}` },
    { label: 'Bathrooms', fn: (l: typeof compareList[0]) => `${l.bathrooms}` },
    { label: 'Sqft', fn: (l: typeof compareList[0]) => l.sqft.toLocaleString() },
    { label: 'Parking', fn: (l: typeof compareList[0]) => `${l.parkingSpaces}` },
    { label: 'Year Built', fn: (l: typeof compareList[0]) => `${l.yearBuilt}` },
    { label: 'Furnished', fn: (l: typeof compareList[0]) => l.furnished ? 'Yes' : 'No' },
    { label: 'Pet Friendly', fn: (l: typeof compareList[0]) => l.petFriendly ? 'Yes' : 'No' },
    { label: 'Walk Score', fn: (l: typeof compareList[0]) => `${l.walkScore}` },
  ];

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-white">Compare Properties</h1>
              <p className="text-slate-400 mt-1">Side-by-side comparison of up to 4 properties</p>
            </div>
            {compareList.length > 0 && (
              <Button variant="ghost" onClick={clearCompare}>Clear All</Button>
            )}
          </div>

          {compareList.length === 0 ? (
            <EmptyState title="Nothing to compare" description="Browse listings and click the compare icon to add properties here." action={<Link href="/listings"><Button variant="gold">Browse Listings</Button></Link>} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="w-36 text-left p-3 text-sm font-medium text-slate-400">Feature</th>
                    {compareList.map(l => (
                      <th key={l.id} className="p-3">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2">
                          <Image src={l.images[0]} alt={l.title} fill className="object-cover" />
                          <button onClick={() => removeFromCompare(l.id)}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-red-500 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-white text-left line-clamp-1">{l.title}</p>
                        <p className="text-xs text-slate-400 text-left">{l.city}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-slate-800/20' : ''}>
                      <td className="p-3 text-sm text-slate-400">{row.label}</td>
                      {compareList.map(l => (
                        <td key={l.id} className="p-3 text-sm text-white font-medium">{row.fn(l)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
