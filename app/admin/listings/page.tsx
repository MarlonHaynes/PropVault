<<<<<<< HEAD
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Eye, Search, Filter } from 'lucide-react';
import { subscribeToListings, deleteListing } from '@/firebase/firestore';
import { deleteAllListingImages } from '@/firebase/storage';
import { formatPrice, getListingSlug } from '@/utils';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/FormElements';
import { LoadingSpinner, EmptyState } from '@/components/ui/Display';
import { useToast } from '@/hooks';
import { Modal } from '@/components/ui/Modal';
import type { Listing, PropertyStatus } from '@/types';

export default function AdminListingsPage() {
  const { toast } = useToast();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToListings(data => {
      setListings(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const filtered = listings.filter(l => {
    const kw = search.toLowerCase();
    const matchKw = !kw || l.title.toLowerCase().includes(kw) || l.city.toLowerCase().includes(kw) || l.neighborhood.toLowerCase().includes(kw);
    const matchStatus = !statusFilter || l.propertyStatus === statusFilter;
    const matchCity = !cityFilter || l.city === cityFilter;
    return matchKw && matchStatus && matchCity;
  });

  const cities = [...new Set(listings.map(l => l.city))].sort();

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAllListingImages(deleteTarget.id);
      await deleteListing(deleteTarget.id);
      toast('Listing deleted', 'success');
      setDeleteTarget(null);
    } catch {
      toast('Failed to delete listing', 'error');
    } finally {
      setDeleting(false);
    }
  }

  async function quickStatus(id: string, status: PropertyStatus) {
    const { updateListing } = await import('@/firebase/firestore');
    await updateListing(id, { propertyStatus: status });
    toast(`Status updated to ${status}`, 'success');
  }

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner className="w-8 h-8" /></div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Listings</h1>
          <p className="text-slate-400 text-sm mt-0.5">{listings.length} total · {filtered.length} shown</p>
        </div>
        <Link href="/admin/listings/new">
          <Button variant="gold" size="sm"><Plus className="w-4 h-4" /> New Listing</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Input
          placeholder="Search title, city, neighbourhood…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4" />}
          className="w-72"
        />
        <Select
          options={[
            { value: 'available', label: 'Available' },
            { value: 'pending', label: 'Pending' },
            { value: 'sold', label: 'Sold' },
            { value: 'rented', label: 'Rented' },
          ]}
          placeholder="All Statuses"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-40"
        />
        <Select
          options={cities.map(c => ({ value: c, label: c }))}
          placeholder="All Cities"
          value={cityFilter}
          onChange={e => setCityFilter(e.target.value)}
          className="w-40"
        />
        {(search || statusFilter || cityFilter) && (
          <button onClick={() => { setSearch(''); setStatusFilter(''); setCityFilter(''); }}
            className="text-xs text-slate-400 hover:text-red-400 transition-colors px-2">
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState title="No listings found" description="Try adjusting your filters or create a new listing." />
      ) : (
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-900/40">
                <tr>
                  {['Photo', 'Title', 'City', 'Price', 'Type', 'Status', 'Featured', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">{h}</th>
=======
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { listings } from '@/data/listings';
import { formatPrice } from '@/utils';
import { ChevronLeft, Plus, Pencil } from 'lucide-react';

export const metadata: Metadata = { title: 'Admin — Listings' };

export default function AdminListingsPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-brand-gold transition-colors mb-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </Link>
            <h1 className="font-playfair text-2xl font-bold text-white">Listings Management</h1>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-brand-gold text-slate-900 text-sm font-semibold hover:bg-amber-400 transition-colors">
            <Plus className="w-4 h-4" /> Add Listing
          </button>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-900/40">
                <tr>
                  {['ID', 'Title', 'City', 'Price', 'Type', 'Status', 'Agent', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">{h}</th>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
<<<<<<< HEAD
                {filtered.map(l => {
                  const slug = getListingSlug(l);
                  return (
                    <tr key={l.id} className="hover:bg-slate-700/20 transition-colors group">
                      {/* Thumb */}
                      <td className="px-4 py-3">
                        <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-700">
                          {l.images?.[0] ? (
                            <Image src={l.images[0]} alt={l.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No img</div>
                          )}
                        </div>
                      </td>
                      {/* Title */}
                      <td className="px-4 py-3 text-sm text-white max-w-[200px]">
                        <p className="truncate font-medium">{l.title}</p>
                        <p className="text-xs text-slate-500 truncate">{l.neighborhood}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">{l.city}</td>
                      <td className="px-4 py-3 text-sm text-brand-gold font-medium whitespace-nowrap">{formatPrice(l.price, true)}</td>
                      <td className="px-4 py-3 text-xs text-slate-400 capitalize">{l.propertyType}</td>
                      {/* Status — inline change */}
                      <td className="px-4 py-3">
                        <select
                          value={l.propertyStatus}
                          onChange={e => quickStatus(l.id, e.target.value as PropertyStatus)}
                          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold ${
                            l.propertyStatus === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                            l.propertyStatus === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                            l.propertyStatus === 'sold' ? 'bg-red-500/20 text-red-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {['available','pending','sold','rented'].map(s => (
                            <option key={s} value={s} className="bg-slate-900 text-slate-200">{s}</option>
                          ))}
                        </select>
                      </td>
                      {/* Featured toggle */}
                      <td className="px-4 py-3">
                        <button
                          onClick={async () => {
                            const { updateListing } = await import('@/firebase/firestore');
                            await updateListing(l.id, { featured: !l.featured });
                            toast(l.featured ? 'Removed from featured' : 'Marked as featured', 'success');
                          }}
                          className={`w-8 h-4 rounded-full transition-all ${l.featured ? 'bg-brand-gold' : 'bg-slate-600'}`}
                        >
                          <div className={`w-3 h-3 rounded-full bg-white transition-transform mx-0.5 ${l.featured ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          <Link href={`/listings/${slug}`} target="_blank"
                            className="p-1.5 text-slate-400 hover:text-white transition-colors" title="View live">
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <Link href={`/admin/listings/edit/${l.id}`}
                            className="p-1.5 text-slate-400 hover:text-brand-gold transition-colors" title="Edit">
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <button onClick={() => setDeleteTarget(l)}
                            className="p-1.5 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
=======
                {listings.map(l => (
                  <tr key={l.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-3 text-xs text-slate-500 font-mono">{l.id.slice(-6)}</td>
                    <td className="px-4 py-3 text-sm text-white max-w-[200px] truncate">{l.title}</td>
                    <td className="px-4 py-3 text-sm text-slate-400">{l.city}</td>
                    <td className="px-4 py-3 text-sm text-brand-gold font-medium">{formatPrice(l.price, true)}</td>
                    <td className="px-4 py-3 text-sm text-slate-400 capitalize">{l.propertyType}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        l.propertyStatus === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                        l.propertyStatus === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>{l.propertyStatus}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">{l.agentId.slice(-4)}</td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 text-slate-400 hover:text-brand-gold transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
              </tbody>
            </table>
          </div>
        </div>
<<<<<<< HEAD
      )}

      {/* Delete confirmation modal */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Listing" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Are you sure you want to permanently delete{' '}
            <span className="text-white font-medium">{deleteTarget?.title}</span>?
            This will also delete all uploaded photos from storage. This cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="danger" fullWidth loading={deleting} onClick={confirmDelete}>
              Yes, Delete
            </Button>
            <Button variant="ghost" fullWidth onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
=======
      </main>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
    </div>
  );
}
