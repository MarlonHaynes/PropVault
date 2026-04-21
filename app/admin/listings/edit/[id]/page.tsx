'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getListing } from '@/firebase/firestore';
import { ListingForm } from '@/components/admin/ListingForm';
import { LoadingSpinner } from '@/components/ui/Display';
import type { Listing } from '@/types';

export default function EditListingPage() {
  const params = useParams();
  const id = params.id as string;
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getListing(id).then(data => {
      if (data) setListing(data);
      else setNotFound(true);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="flex justify-center py-20"><LoadingSpinner className="w-8 h-8" /></div>
  );

  if (notFound) return (
    <div className="text-center py-20">
      <p className="text-slate-400">Listing not found.</p>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-2xl font-bold text-white">Edit Listing</h1>
        <p className="text-slate-400 text-sm mt-1 truncate">{listing?.title}</p>
      </div>
      {listing && <ListingForm listing={listing} mode="edit" />}
    </div>
  );
}
