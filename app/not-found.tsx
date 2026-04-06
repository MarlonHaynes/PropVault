import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
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
      </div>
    </div>
  );
}
