import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
<<<<<<< HEAD
<<<<<<< HEAD
import { Bed, Bath, Maximize2, MapPin, Calendar, Car, Wifi, Wind, Dumbbell, ChevronLeft, Star } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StatusBadge, PriceDisplay, SectionHeader } from '@/components/ui/Display';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { MortgageCalculator } from '@/components/forms/MortgageCalculator';
import { ListingCard } from '@/components/listings/ListingCard';
import { PropertyMap } from '@/components/map/PropertyMap';
import { seedListings } from '@/data/listings';
import { agents } from '@/data/agents';
import { getListingSlug, slugify, formatDate, formatPrice } from '@/utils';
import type { Metadata } from 'next';
import type { Listing } from '@/types';

function findBySlug(slug: string): Listing | null {
  return seedListings.find(l => getListingSlug(l) === slug) ?? null;
}

function getRelated(listing: Listing): Listing[] {
  return seedListings
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import dynamic from 'next/dynamic';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Car,
  Wifi,
  Wind,
  Dumbbell,
  ChevronLeft,
  Star,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StatusBadge, PriceDisplay, SectionHeader } from '@/components/ui/Display';
import { ListingCard } from '@/components/listings/ListingCard';
import { getAllListings } from '@/firebase/firestore';
import { agents } from '@/data/agents';
import { getListingSlug, formatDate, formatPrice } from '@/utils';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { Listing } from '@/types';

const InquiryForm = dynamic(
  () => import('@/components/forms/InquiryForm').then(mod => mod.InquiryForm),
  { ssr: false }
);

const MortgageCalculator = dynamic(
  () => import('@/components/forms/MortgageCalculator').then(mod => mod.MortgageCalculator),
  { ssr: false }
);

async function findBySlug(slug: string): Promise<Listing | null> {
  const all = await getAllListings();
  return all.find(l => getListingSlug(l) === slug) ?? null;
}

async function getRelated(listing: Listing): Promise<Listing[]> {
  const all = await getAllListings();
  return all
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    .filter(l => l.id !== listing.id && l.city === listing.city && l.propertyType === listing.propertyType)
    .slice(0, 3);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
<<<<<<< HEAD
<<<<<<< HEAD
  const listing = findBySlug(params.slug);
  if (!listing) return { title: 'Not Found' };
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  const listing = await findBySlug(params.slug);

  if (!listing) {
    return { title: 'Not Found' };
  }

<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  return {
    title: listing.title,
    description: listing.description.slice(0, 160),
    openGraph: {
      title: listing.title,
      description: listing.description,
<<<<<<< HEAD
<<<<<<< HEAD
      images: [listing.thumbnail || listing.images?.[0]],
=======
      images: [listing.thumbnail || listing.images?.[0] || ''],
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      images: [listing.thumbnail || listing.images?.[0] || ''],
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    },
  };
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
const amenityIcons: Record<string, ReactNode> = {
  WiFi: <Wifi className="w-4 h-4" />,
  Gym: <Dumbbell className="w-4 h-4" />,
  'Air Conditioning': <Wind className="w-4 h-4" />,
  Parking: <Car className="w-4 h-4" />,
  'Fitness Centre': <Dumbbell className="w-4 h-4" />,
};

export default async function ListingDetailPage({ params }: { params: { slug: string } }) {
  const listing = await findBySlug(params.slug);

  if (!listing) {
    notFound();
  }

  const agent = agents.find(a => a.id === listing.agentId);
  const related = await getRelated(listing);

  const fullAddress = `${listing.address}, ${listing.neighborhood}, ${listing.city}, ${listing.provinceState} ${listing.postalCode}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=15&output=embed`;
=======
import { Bed, Bath, Maximize2, MapPin, Calendar, Car, Wifi, Wind, Dumbbell, ChevronLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StatusBadge, PriceDisplay, SectionHeader } from '@/components/ui/Display';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { MortgageCalculator } from '@/components/forms/MortgageCalculator';
import { ListingCard } from '@/components/listings/ListingCard';
import { listings } from '@/data/listings';
import { agents } from '@/data/agents';
import { getRelatedListings, slugify, formatDate } from '@/utils';
import type { Metadata } from 'next';

function findBySlug(slug: string) {
  return listings.find(l => {
    const s = slugify(l.title) + '-' + l.id.slice(-4);
    return s === slug;
  });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const listing = findBySlug(params.slug);
  if (!listing) return { title: 'Not Found' };
  return { title: listing.title, description: listing.description.slice(0, 160) };
}

<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="w-4 h-4" />,
  'Gym': <Dumbbell className="w-4 h-4" />,
  'Air Conditioning': <Wind className="w-4 h-4" />,
  'Parking': <Car className="w-4 h-4" />,
<<<<<<< HEAD
<<<<<<< HEAD
  'Fitness Centre': <Dumbbell className="w-4 h-4" />,
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
};

export default function ListingDetailPage({ params }: { params: { slug: string } }) {
  const listing = findBySlug(params.slug);
  if (!listing) notFound();

  const agent = agents.find(a => a.id === listing.agentId);
<<<<<<< HEAD
<<<<<<< HEAD
  const related = getRelated(listing);
=======
  const related = getRelatedListings(listing, 3);
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
  const related = getRelatedListings(listing, 3);
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
<<<<<<< HEAD
<<<<<<< HEAD
      <main className="pt-20 pb-16">
        {/* Gallery */}
        {listing.images?.length > 0 && (
          <div className={`grid gap-1.5 h-[55vh] max-h-[520px] ${listing.images.length >= 5 ? 'grid-cols-4 grid-rows-2' : 'grid-cols-3 grid-rows-1'}`}>
            <div className={`relative overflow-hidden ${listing.images.length >= 3 ? 'col-span-2 row-span-2' : 'col-span-1'}`}>
              <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" priority unoptimized />
            </div>
            {listing.images.slice(1, listing.images.length >= 5 ? 5 : 3).map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <Image src={img} alt={`${listing.title} ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-500" unoptimized />
              </div>
            ))}
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

      <main className="pt-20 pb-16">
        {/* ── Photo Gallery ─────────────────────────────────────────────── */}
        {listing.images?.length > 0 && (
          <div
            className={`grid gap-1.5 h-[55vh] max-h-[520px] ${
              listing.images.length >= 5
                ? 'grid-cols-4 grid-rows-2'
                : listing.images.length >= 3
                  ? 'grid-cols-3 grid-rows-1'
                  : 'grid-cols-2 grid-rows-1'
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                listing.images.length >= 3 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
              }`}
            >
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                className="object-cover hover:scale-102 transition-transform duration-700"
                priority
              />
            </div>

            {listing.images.slice(1, listing.images.length >= 5 ? 5 : 3).map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <Image
                  src={img}
                  alt={`${listing.title} ${i + 2}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}

            {listing.images.length > 5 && (
              <div className="relative overflow-hidden cursor-pointer group">
                <Image src={listing.images[4]} alt="more" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                  <p className="text-white font-semibold text-sm">+{listing.images.length - 4} more</p>
                </div>
              </div>
            )}
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
<<<<<<< HEAD
<<<<<<< HEAD
          <Link href="/listings" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" /> Back to Listings
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left */}
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Listings
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ── LEFT: Main Content ───────────────────────────────────── */}
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <StatusBadge status={listing.propertyStatus} />
<<<<<<< HEAD
<<<<<<< HEAD
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 capitalize border border-slate-700">{listing.propertyType}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 capitalize border border-slate-700">
                    {listing.listingType === 'sale' ? 'For Sale' : listing.listingType === 'rent' ? 'For Rent' : 'New Development'}
                  </span>
                  {listing.featured && <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30">⭐ Featured</span>}
                </div>
                <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-white mb-2">{listing.title}</h1>
                <p className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                  {listing.address}, {listing.neighborhood}, {listing.city}, {listing.provinceState} {listing.postalCode}
                </p>
                <PriceDisplay price={listing.price} listingType={listing.listingType} className="mt-4" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Bed,       label: 'Bedrooms',    value: listing.bedrooms || 'Studio' },
                  { icon: Bath,      label: 'Bathrooms',   value: listing.bathrooms },
                  { icon: Maximize2, label: 'Square Feet', value: listing.sqft?.toLocaleString() },
                  { icon: Car,       label: 'Parking',     value: listing.parkingSpaces ?? 0 },
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 capitalize border border-slate-700">
                    {listing.propertyType}
                  </span>

                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 capitalize border border-slate-700">
                    {listing.listingType === 'sale'
                      ? 'For Sale'
                      : listing.listingType === 'rent'
                        ? 'For Rent'
                        : 'New Development'}
                  </span>

                  {listing.featured && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-white mb-2">
                  {listing.title}
                </h1>

                <p className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                  {fullAddress}
                </p>

                <PriceDisplay price={listing.price} listingType={listing.listingType} className="mt-4" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Bed, label: 'Bedrooms', value: listing.bedrooms || 'Studio' },
                  { icon: Bath, label: 'Bathrooms', value: listing.bathrooms },
                  { icon: Maximize2, label: 'Square Feet', value: listing.sqft?.toLocaleString() },
                  { icon: Car, label: 'Parking', value: listing.parkingSpaces ?? 0 },
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                ].map((s, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
                    <s.icon className="w-5 h-5 text-brand-gold mx-auto mb-1.5" />
                    <div className="text-xl font-bold text-white">{String(s.value)}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      <main className="pt-20 pb-16">
        {/* Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[60vh] max-h-[560px]">
          <div className="col-span-2 row-span-2 relative">
            <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" priority />
          </div>
          {listing.images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={img} alt={`${listing.title} ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Breadcrumb */}
          <Link href="/listings" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" /> Back to Listings
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title row */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <StatusBadge status={listing.propertyStatus} />
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 capitalize">{listing.propertyType}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 capitalize">{listing.listingType}</span>
                </div>
                <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-white mb-2">{listing.title}</h1>
                <p className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  {listing.address}, {listing.neighborhood}, {listing.city}, {listing.provinceState} {listing.postalCode}
                </p>
                <PriceDisplay price={listing.price} listingType={listing.listingType} className="mt-4" />
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Bed, label: 'Bedrooms', value: listing.bedrooms },
                  { icon: Bath, label: 'Bathrooms', value: listing.bathrooms },
                  { icon: Maximize2, label: 'Square Feet', value: listing.sqft.toLocaleString() },
                  { icon: Car, label: 'Parking', value: listing.parkingSpaces },
                ].map((s, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
                    <s.icon className="w-5 h-5 text-brand-gold mx-auto mb-1.5" />
                    <div className="text-xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-slate-400">{s.label}</div>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                  </div>
                ))}
              </div>

<<<<<<< HEAD
<<<<<<< HEAD
              {/* Description */}
              {listing.longDescription && (
                <div>
                  <h2 className="font-playfair text-xl font-semibold text-white mb-3">About This Property</h2>
                  <p className="text-slate-400 leading-relaxed">{listing.longDescription}</p>
                </div>
              )}

              {/* Details table */}
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              {listing.longDescription && (
                <div>
                  <h2 className="font-playfair text-xl font-semibold text-white mb-3">About This Property</h2>
                  <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                    {listing.longDescription}
                  </p>
                </div>
              )}

<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              <div>
                <h2 className="font-playfair text-xl font-semibold text-white mb-4">Property Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-slate-700 rounded-xl overflow-hidden">
                  {[
<<<<<<< HEAD
<<<<<<< HEAD
                    { label: 'Property Type',       value: listing.propertyType },
                    { label: 'Year Built',           value: listing.yearBuilt },
                    { label: 'Lot Size',             value: listing.lotSize ? `${listing.lotSize.toLocaleString()} sqft` : 'N/A' },
                    { label: 'HOA / Maintenance',    value: listing.hoaFees ? `${formatPrice(listing.hoaFees)}/mo` : 'None' },
                    { label: 'Garage',               value: listing.garage ? 'Yes' : 'No' },
                    { label: 'Furnished',            value: listing.furnished ? 'Yes' : 'No' },
                    { label: 'Pet Friendly',         value: listing.petFriendly ? 'Yes' : 'No' },
                    { label: 'Walk Score',           value: listing.walkScore ?? 'N/A' },
                    { label: 'Transit Score',        value: listing.transitScore ?? 'N/A' },
                    { label: 'MLS #',                value: listing.mlsNumber || 'N/A' },
                    { label: 'Listed',               value: formatDate(listing.createdAt) },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center px-4 py-2.5 text-sm border-b border-slate-700/60 ${i % 2 === 0 ? 'bg-slate-800/20' : ''}`}>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                    { label: 'Property Type', value: listing.propertyType },
                    { label: 'Year Built', value: listing.yearBuilt },
                    { label: 'Lot Size', value: listing.lotSize ? `${listing.lotSize.toLocaleString()} sqft` : 'N/A' },
                    { label: 'HOA / Maintenance', value: listing.hoaFees ? `${formatPrice(listing.hoaFees)}/mo` : 'None' },
                    { label: 'Garage', value: listing.garage ? 'Yes' : 'No' },
                    { label: 'Furnished', value: listing.furnished ? 'Yes' : 'No' },
                    { label: 'Pet Friendly', value: listing.petFriendly ? 'Yes' : 'No' },
                    { label: 'Walk Score', value: listing.walkScore ?? 'N/A' },
                    { label: 'Transit Score', value: listing.transitScore ?? 'N/A' },
                    { label: 'MLS #', value: listing.mlsNumber || 'N/A' },
                    { label: 'Listed', value: formatDate(listing.createdAt) },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center px-4 py-2.5 text-sm border-b border-slate-700/60 ${
                        i % 2 === 0 ? 'bg-slate-800/20' : ''
                      }`}
                    >
=======
              {/* Description */}
              <div>
                <h2 className="font-playfair text-xl font-semibold text-white mb-3">About This Property</h2>
                <p className="text-slate-400 leading-relaxed">{listing.description}</p>
              </div>

              {/* Property Details */}
              <div>
                <h2 className="font-playfair text-xl font-semibold text-white mb-4">Property Details</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Property Type', value: listing.propertyType },
                    { label: 'Year Built', value: listing.yearBuilt },
                    { label: 'Lot Size', value: listing.lotSize ? `${listing.lotSize} sqft` : 'N/A' },
                    { label: 'Garage', value: listing.garage ? 'Yes' : 'No' },
                    { label: 'Furnished', value: listing.furnished ? 'Yes' : 'No' },
                    { label: 'Pet Friendly', value: listing.petFriendly ? 'Yes' : 'No' },
                    { label: 'Walk Score', value: listing.walkScore },
                    { label: 'Transit Score', value: listing.transitScore },
                    { label: 'Listed', value: formatDate(listing.createdAt) },
                    { label: 'MLS #', value: listing.mlsNumber || 'N/A' },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-slate-800 text-sm">
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                      <span className="text-slate-400">{row.label}</span>
                      <span className="text-white font-medium">{String(row.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

<<<<<<< HEAD
<<<<<<< HEAD
              {/* Features */}
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              {listing.features?.length > 0 && (
                <div>
                  <h2 className="font-playfair text-xl font-semibold text-white mb-4">Interior Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {listing.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
<<<<<<< HEAD
<<<<<<< HEAD
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />{f}
=======
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        {f}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        {f}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                      </div>
                    ))}
                  </div>
                </div>
              )}

<<<<<<< HEAD
<<<<<<< HEAD
              {/* Amenities */}
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              {listing.amenities?.length > 0 && (
                <div>
                  <h2 className="font-playfair text-xl font-semibold text-white mb-4">Building Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {listing.amenities.map((a, i) => (
<<<<<<< HEAD
<<<<<<< HEAD
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-slate-300">
                        <span className="text-brand-gold">{amenityIcons[a] || <Calendar className="w-4 h-4" />}</span>{a}
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-slate-300"
                      >
                        <span className="text-brand-gold shrink-0">
                          {amenityIcons[a] || <Calendar className="w-4 h-4" />}
                        </span>
=======
              {/* Amenities */}
              {listing.amenities.length > 0 && (
                <div>
                  <h2 className="font-playfair text-xl font-semibold text-white mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {listing.amenities.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/50 text-sm text-slate-300">
                        {amenityIcons[a] || <Calendar className="w-4 h-4 text-brand-gold" />}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
                        {a}
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                      </div>
                    ))}
                  </div>
                </div>
              )}

<<<<<<< HEAD
<<<<<<< HEAD
              {/* Map */}
              <div>
                <h2 className="font-playfair text-xl font-semibold text-white mb-4">Location & Neighbourhood</h2>
                <PropertyMap
                  latitude={listing.latitude}
                  longitude={listing.longitude}
                  address={`${listing.address}, ${listing.city}, ON`}
                  nearbyPlaces={listing.nearbyPlaces}
                />
              </div>

              {/* Mortgage */}
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              <div>
                <h2 className="font-playfair text-xl font-semibold text-white mb-4">Location & Neighbourhood</h2>
                <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                  <div className="h-[380px] w-full">
                    <iframe
                      title={`Map of ${listing.title}`}
                      src={mapSrc}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700 bg-slate-800/40">
                    <p className="text-sm text-slate-300 truncate">{fullAddress}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-brand-gold hover:text-amber-400 transition-colors shrink-0 ml-4"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              {listing.listingType === 'sale' && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h2 className="font-playfair text-xl font-semibold text-white mb-5">Mortgage Calculator</h2>
                  <MortgageCalculator defaultPrice={listing.price} />
                </div>
              )}
            </div>

<<<<<<< HEAD
<<<<<<< HEAD
            {/* Right sidebar */}
=======
            {/* ── RIGHT: Sticky Sidebar ─────────────────────────────────── */}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
            {/* ── RIGHT: Sticky Sidebar ─────────────────────────────────── */}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
            <div>
              <div className="sticky top-24 space-y-4">
                {agent && (
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-3 p-5 border-b border-slate-700">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
<<<<<<< HEAD
<<<<<<< HEAD
                        <Image src={agent.photo} alt={agent.name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="min-w-0">
                        <Link href={`/agents/${agent.id}`} className="font-semibold text-white hover:text-brand-gold transition-colors text-sm">{agent.name}</Link>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                        <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
                      </div>

                      <div className="min-w-0">
                        <Link
                          href={`/agents/${agent.id}`}
                          className="font-semibold text-white hover:text-brand-gold transition-colors text-sm"
                        >
                          {agent.name}
                        </Link>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                        <p className="text-xs text-brand-gold">{agent.title}</p>
                        <p className="text-xs text-slate-500">{agent.brokerage}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
<<<<<<< HEAD
<<<<<<< HEAD
                          <span className="text-xs text-slate-300">{agent.rating} ({agent.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-white mb-4 text-sm">Send a Message</h3>
                      <InquiryForm listingId={listing.id} listingTitle={listing.title} agentName={agent.name} agentEmail={agent.email} />
                    </div>
                  </div>
                )}
                <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Facts</h3>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                          <span className="text-xs text-slate-300">
                            {agent.rating} ({agent.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-semibold text-white mb-4 text-sm">Send a Message</h3>
                      <InquiryForm listing={listing} />
                    </div>
                  </div>
                )}

                <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Quick Facts
                  </h3>

<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                  <div className="space-y-2">
                    {listing.mlsNumber && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">MLS #</span>
                        <span className="text-white font-mono text-xs">{listing.mlsNumber}</span>
                      </div>
                    )}
<<<<<<< HEAD
<<<<<<< HEAD
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Price/sqft</span>
                      <span className="text-white">{listing.sqft ? formatPrice(Math.round(listing.price / listing.sqft)) : 'N/A'}</span>
                    </div>
                    {listing.openHouse && (
                      <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <p className="text-emerald-400 text-xs font-semibold">Open House — Contact Agent</p>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Price/sqft</span>
                      <span className="text-white">
                        {listing.sqft ? formatPrice(Math.round(listing.price / listing.sqft)) : 'N/A'}
                      </span>
                    </div>

                    {listing.openHouse && (
                      <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <p className="text-emerald-400 text-xs font-semibold">
                          Open House — Contact Agent
                        </p>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

<<<<<<< HEAD
<<<<<<< HEAD
          {/* Related */}
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          {related.length > 0 && (
            <div className="mt-16">
              <SectionHeader label="Similar Properties" title="You May Also Like" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
<<<<<<< HEAD
<<<<<<< HEAD
                {related.map(l => <ListingCard key={l.id} listing={l} />)}
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                {related.map(l => (
                  <ListingCard key={l.id} listing={l} />
                ))}
=======
              {/* Mortgage Calculator */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h2 className="font-playfair text-xl font-semibold text-white mb-5">Mortgage Calculator</h2>
                <MortgageCalculator defaultPrice={listing.price} />
              </div>
            </div>

            {/* Right: Sticky sidebar */}
            <div className="space-y-6">
              {/* Agent card */}
              {agent && (
                <div className="sticky top-24 space-y-4">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden">
                        <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{agent.name}</p>
                        <p className="text-xs text-brand-gold">{agent.title}</p>
                        <p className="text-xs text-slate-500">{agent.brokerage}</p>
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-4">Request Information</h3>
                    <InquiryForm listing={listing} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <SectionHeader label="Similar" title="Related Properties" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                {related.map(l => <ListingCard key={l.id} listing={l} />)}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              </div>
            </div>
          )}
        </div>
      </main>
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD

>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======

>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      <Footer />
    </div>
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      <Footer />
    </div>
  );
}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
