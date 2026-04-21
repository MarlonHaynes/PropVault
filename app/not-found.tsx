import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
<<<<<<< HEAD
import { Search, Home, MapPin, Users } from 'lucide-react';
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
<<<<<<< HEAD
        {/* Big 404 */}
        <div className="font-playfair text-[140px] font-bold leading-none select-none mb-2" style={{ color: 'rgba(200,169,126,0.12)' }}>
          404
        </div>
        <div className="-mt-8 mb-6">
          <h1 className="font-playfair text-3xl font-bold text-white mb-2">Page Not Found</h1>
          <p className="text-slate-400 max-w-md">
            This page doesn't exist or may have been moved. Try browsing our active listings or use the navigation above.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg w-full mb-8">
          {[
            { href: '/listings',  icon: Search, label: 'Browse Listings' },
            { href: '/',          icon: Home,   label: 'Go to Homepage' },
            { href: '/agents',    icon: Users,  label: 'Find an Agent' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:border-brand-gold hover:text-brand-gold transition-all">
              <link.icon className="w-4 h-4" /> {link.label}
            </Link>
          ))}
        </div>

        <p className="text-xs text-slate-600">
          Looking for a specific property? Try our <Link href="/map-search" className="text-brand-gold hover:text-amber-400">map search</Link> or contact us at{' '}
          <a href="tel:+14165550100" className="text-brand-gold hover:text-amber-400">+1 (416) 555-0100</a>
        </p>
=======
        <div className="font-playfair text-[120px] font-bold text-brand-gold/20 leading-none select-none">404</div>
        <h1 className="font-playfair text-3xl font-bold text-white -mt-4 mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex gap-4">
          <Link href="/" className="h-10 px-6 rounded-lg bg-brand-gold text-slate-900 font-semibold text-sm flex items-center hover:bg-amber-400 transition-colors">
            Go Home
          </Link>
          <Link href="/listings" className="h-10 px-6 rounded-lg border border-slate-600 text-slate-200 text-sm flex items-center hover:border-brand-gold hover:text-brand-gold transition-all">
            Browse Listings
          </Link>
        </div>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
      </div>
    </div>
  );
}
