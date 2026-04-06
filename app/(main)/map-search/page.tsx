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
                  {c}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filtered.map(l => <ListingCard key={l.id} listing={l} layout="list" />)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
