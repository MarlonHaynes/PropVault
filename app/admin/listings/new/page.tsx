import { ListingForm } from '@/components/admin/ListingForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin — New Listing' };

export default function NewListingPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-2xl font-bold text-white">Create New Listing</h1>
        <p className="text-slate-400 text-sm mt-1">Fill in the details below and upload photos to publish a new property listing.</p>
      </div>
      <ListingForm mode="create" />
    </div>
  );
}
