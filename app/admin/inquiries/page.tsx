import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { EmptyState } from '@/components/ui/Display';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = { title: 'Admin — Inquiries' };

export default function AdminInquiriesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-brand-gold transition-colors mb-2">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="font-playfair text-2xl font-bold text-white">Inquiry Management</h1>
          <p className="text-slate-400 text-sm mt-1">Connect Firebase to view real inquiries from buyers.</p>
        </div>
        <EmptyState title="No inquiries yet" description="Inquiries submitted through listing pages will appear here once Firebase is connected." />
      </main>
    </div>
  );
}
