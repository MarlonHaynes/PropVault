'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea, Checkbox } from '@/components/ui/FormElements';
import { ImageUploader } from './ImageUploader';
import { createListing, updateListing } from '@/firebase/firestore';
import { useToast } from '@/hooks';
import { slugify, generateId } from '@/utils';
import type { Listing, PropertyType, ListingType, PropertyStatus } from '@/types';
import { agents } from '@/data/agents';

interface ListingFormProps {
  listing?: Listing;
  mode: 'create' | 'edit';
}

const PROPERTY_TYPES: PropertyType[] = ['House', 'Condo', 'Townhouse', 'Apartment', 'Loft', 'Penthouse', 'Villa', 'Commercial'];
const LISTING_TYPES: { value: ListingType; label: string }[] = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
  { value: 'new-development', label: 'New Development' },
];
const STATUS_OPTIONS: { value: PropertyStatus; label: string }[] = [
  { value: 'available', label: 'Available' },
  { value: 'pending', label: 'Pending' },
  { value: 'sold', label: 'Sold' },
  { value: 'rented', label: 'Rented' },
];
const GTA_CITIES = ['Toronto', 'Mississauga', 'Oakville', 'Vaughan', 'Markham', 'Richmond Hill', 'Brampton'];

const blank: Omit<Listing, 'id' | 'slug' | 'thumbnail' | 'createdAt'> = {
  title: '', propertyType: 'Condo', listingType: 'sale', price: 0,
  address: '', city: 'Toronto', provinceState: 'ON', postalCode: '', neighborhood: '',
  latitude: 43.6532, longitude: -79.3832,
  bedrooms: 1, bathrooms: 1, sqft: 600, yearBuilt: 2020, parkingSpaces: 0,
  propertyStatus: 'available', featured: false, newListing: true, openHouse: false, newDevelopment: false,
  images: [], description: '', longDescription: '',
  features: [], amenities: [], nearbyPlaces: [],
  agentId: 'agent-001', petFriendly: false, furnished: false, garage: false,
  tags: [],
};

export function ListingForm({ listing, mode }: ListingFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const listingId = listing?.id || `lst-${generateId()}`;

  const [form, setForm] = useState<Omit<Listing, 'id' | 'slug' | 'thumbnail' | 'createdAt'>>({
    title: listing?.title || blank.title,
    propertyType: listing?.propertyType || blank.propertyType,
    listingType: listing?.listingType || blank.listingType,
    price: listing?.price || blank.price,
    address: listing?.address || blank.address,
    city: listing?.city || blank.city,
    provinceState: listing?.provinceState || blank.provinceState,
    postalCode: listing?.postalCode || blank.postalCode,
    neighborhood: listing?.neighborhood || blank.neighborhood,
    latitude: listing?.latitude || blank.latitude,
    longitude: listing?.longitude || blank.longitude,
    bedrooms: listing?.bedrooms || blank.bedrooms,
    bathrooms: listing?.bathrooms || blank.bathrooms,
    sqft: listing?.sqft || blank.sqft,
    yearBuilt: listing?.yearBuilt || blank.yearBuilt,
    parkingSpaces: listing?.parkingSpaces || blank.parkingSpaces,
    propertyStatus: listing?.propertyStatus || blank.propertyStatus,
    featured: listing?.featured || blank.featured,
    newListing: listing?.newListing || blank.newListing,
    openHouse: listing?.openHouse || blank.openHouse,
    newDevelopment: listing?.newDevelopment || blank.newDevelopment,
    images: listing?.images || blank.images,
    description: listing?.description || blank.description,
    longDescription: listing?.longDescription || blank.longDescription,
    features: listing?.features || blank.features,
    amenities: listing?.amenities || blank.amenities,
    nearbyPlaces: listing?.nearbyPlaces || blank.nearbyPlaces,
    agentId: listing?.agentId || blank.agentId,
    petFriendly: listing?.petFriendly || blank.petFriendly,
    furnished: listing?.furnished || blank.furnished,
    garage: listing?.garage || blank.garage,
    tags: listing?.tags || blank.tags,
    hoaFees: listing?.hoaFees,
    lotSize: listing?.lotSize,
    mlsNumber: listing?.mlsNumber,
    walkScore: listing?.walkScore,
    transitScore: listing?.transitScore,
  });

  function update(key: keyof typeof form, value: unknown) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function updateArray(key: 'features' | 'amenities' | 'tags', raw: string) {
    update(key, raw.split('\n').map(s => s.trim()).filter(Boolean));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.address || form.price <= 0) {
      toast('Please fill in all required fields (title, address, price)', 'error');
      return;
    }
    if (form.images.length === 0) {
      toast('Please upload at least one photo', 'error');
      return;
    }
    setSaving(true);
    try {
      const slug = slugify(form.title);
      const data = {
        ...form,
        slug,
        thumbnail: form.images[0],
      };

      if (mode === 'create') {
        await createListing(data);
        toast('Listing created successfully!', 'success');
      } else {
        await updateListing(listingId, data);
        toast('Listing updated!', 'success');
      }
      router.push('/admin/listings');
      router.refresh();
    } catch {
      toast('Failed to save listing. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Photos */}
      <Section title="Property Photos" subtitle="Upload up to 10 photos. Drag to reorder. First photo is the cover.">
        <ImageUploader
          listingId={listingId}
          images={form.images}
          onChange={imgs => update('images', imgs)}
          maxImages={10}
        />
      </Section>

      {/* Basic Info */}
      <Section title="Basic Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input label="Listing Title *" value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. Stunning Penthouse — King West" required />
          </div>
          <Select label="Property Type *" value={form.propertyType}
            onChange={e => update('propertyType', e.target.value as PropertyType)}
            options={PROPERTY_TYPES.map(t => ({ value: t, label: t }))} />
          <Select label="Listing Type *" value={form.listingType}
            onChange={e => update('listingType', e.target.value as ListingType)}
            options={LISTING_TYPES} />
          <Input label="Price *" type="number" value={form.price || ''} onChange={e => update('price', +e.target.value)}
            placeholder={form.listingType === 'rent' ? 'Monthly rent in CAD' : 'Sale price in CAD'} required />
          <Select label="Status" value={form.propertyStatus}
            onChange={e => update('propertyStatus', e.target.value as PropertyStatus)}
            options={STATUS_OPTIONS} />
          <Input label="MLS Number" value={form.mlsNumber || ''} onChange={e => update('mlsNumber', e.target.value)} placeholder="e.g. C9123456" />
          <Select label="Assign Agent" value={form.agentId}
            onChange={e => update('agentId', e.target.value)}
            options={agents.map(a => ({ value: a.id, label: a.name }))} />
        </div>
      </Section>

      {/* Location */}
      <Section title="Location">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input label="Street Address *" value={form.address} onChange={e => update('address', e.target.value)} placeholder="e.g. 88 Blue Jays Way, PH-32" required />
          </div>
          <Select label="City *" value={form.city} onChange={e => update('city', e.target.value)}
            options={GTA_CITIES.map(c => ({ value: c, label: c }))} />
          <Input label="Neighbourhood" value={form.neighborhood} onChange={e => update('neighborhood', e.target.value)} placeholder="e.g. King West" />
          <Input label="Postal Code" value={form.postalCode} onChange={e => update('postalCode', e.target.value)} placeholder="e.g. M5V 2G3" />
          <Input label="Province" value={form.provinceState} onChange={e => update('provinceState', e.target.value)} placeholder="ON" />
          <Input label="Latitude" type="number" step="0.0001" value={form.latitude} onChange={e => update('latitude', +e.target.value)} />
          <Input label="Longitude" type="number" step="0.0001" value={form.longitude} onChange={e => update('longitude', +e.target.value)} />
        </div>
      </Section>

      {/* Property Details */}
      <Section title="Property Details">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <Input label="Bedrooms" type="number" min="0" max="20" value={form.bedrooms} onChange={e => update('bedrooms', +e.target.value)} />
          <Input label="Bathrooms" type="number" min="1" max="20" value={form.bathrooms} onChange={e => update('bathrooms', +e.target.value)} />
          <Input label="Square Footage" type="number" value={form.sqft} onChange={e => update('sqft', +e.target.value)} />
          <Input label="Year Built" type="number" value={form.yearBuilt} onChange={e => update('yearBuilt', +e.target.value)} />
          <Input label="Parking Spaces" type="number" min="0" value={form.parkingSpaces} onChange={e => update('parkingSpaces', +e.target.value)} />
          <Input label="HOA / Maintenance Fees" type="number" value={form.hoaFees || ''} onChange={e => update('hoaFees', e.target.value ? +e.target.value : undefined)} placeholder="Monthly $/mo" />
          <Input label="Lot Size (sqft)" type="number" value={form.lotSize || ''} onChange={e => update('lotSize', e.target.value ? +e.target.value : undefined)} />
          <Input label="Walk Score (0-100)" type="number" min="0" max="100" value={form.walkScore || ''} onChange={e => update('walkScore', e.target.value ? +e.target.value : undefined)} />
          <Input label="Transit Score (0-100)" type="number" min="0" max="100" value={form.transitScore || ''} onChange={e => update('transitScore', e.target.value ? +e.target.value : undefined)} />
        </div>
        <div className="flex flex-wrap gap-5 mt-4">
          <Checkbox label="Garage" checked={!!form.garage} onChange={v => update('garage', v)} />
          <Checkbox label="Furnished" checked={form.furnished} onChange={v => update('furnished', v)} />
          <Checkbox label="Pet Friendly" checked={form.petFriendly} onChange={v => update('petFriendly', v)} />
          <Checkbox label="Featured Listing" checked={form.featured} onChange={v => update('featured', v)} />
          <Checkbox label="New Listing Badge" checked={form.newListing} onChange={v => update('newListing', v)} />
          <Checkbox label="Open House" checked={form.openHouse} onChange={v => update('openHouse', v)} />
          <Checkbox label="New Development" checked={!!form.newDevelopment} onChange={v => update('newDevelopment', v)} />
        </div>
      </Section>

      {/* Descriptions */}
      <Section title="Descriptions">
        <Textarea label="Short Description *" value={form.description} onChange={e => update('description', e.target.value)}
          rows={3} placeholder="1-2 sentence teaser shown on listing cards and search results." required />
        <div className="mt-4">
          <Textarea label="Full Description" value={form.longDescription} onChange={e => update('longDescription', e.target.value)}
            rows={8} placeholder="Detailed property description (5-10 sentences). This appears on the full listing page." />
        </div>
      </Section>

      {/* Features & Amenities */}
      <Section title="Features & Amenities" subtitle="Enter one item per line.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Textarea label="Interior Features" value={form.features.join('\n')} onChange={e => updateArray('features', e.target.value)}
            rows={6} placeholder="Floor-to-Ceiling Windows&#10;Chef's Kitchen&#10;Heated Floors" />
          <Textarea label="Building Amenities" value={form.amenities.join('\n')} onChange={e => updateArray('amenities', e.target.value)}
            rows={6} placeholder="24/7 Concierge&#10;Indoor Pool&#10;Fitness Centre" />
          <Textarea label="Tags (for search)" value={form.tags.join('\n')} onChange={e => updateArray('tags', e.target.value)}
            rows={3} placeholder="luxury&#10;condo&#10;waterfront" />
        </div>
      </Section>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
        <Button type="submit" variant="gold" size="lg" loading={saving}>
          {mode === 'create' ? 'Create Listing' : 'Save Changes'}
        </Button>
        <Button type="button" variant="ghost" size="lg" onClick={() => router.back()}>
          Cancel
        </Button>
        {mode === 'edit' && (
          <p className="text-xs text-slate-500 ml-auto">Last edited: {listing?.createdAt ? new Date(listing.createdAt).toLocaleDateString() : 'N/A'}</p>
        )}
      </div>
    </form>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
      <h2 className="font-semibold text-white mb-1">{title}</h2>
      {subtitle && <p className="text-xs text-slate-500 mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </div>
  );
}
