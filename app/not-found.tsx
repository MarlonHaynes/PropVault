import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Search, Home, MapPin, Users } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
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
      </div>
    </div>
  );
}
