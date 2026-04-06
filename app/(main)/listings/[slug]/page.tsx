import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="w-4 h-4" />,
  'Gym': <Dumbbell className="w-4 h-4" />,
  'Air Conditioning': <Wind className="w-4 h-4" />,
  'Parking': <Car className="w-4 h-4" />,
};

export default function ListingDetailPage({ params }: { params: { slug: string } }) {
  const listing = findBySlug(params.slug);
  if (!listing) notFound();

  const agent = agents.find(a => a.id === listing.agentId);
  const related = getRelatedListings(listing, 3);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
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
                  </div>
                ))}
              </div>

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
                      <span className="text-slate-400">{row.label}</span>
                      <span className="text-white font-medium">{String(row.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {listing.amenities.length > 0 && (
                <div>
                  <h2 className="font-playfair text-xl font-semibold text-white mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {listing.amenities.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/50 text-sm text-slate-300">
                        {amenityIcons[a] || <Calendar className="w-4 h-4 text-brand-gold" />}
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
