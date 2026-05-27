<<<<<<< HEAD
<<<<<<< HEAD
'use client';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation2, ExternalLink } from 'lucide-react';

interface NearbyPlace {
  name: string;
  type: string;
  distance: string;
}

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  address: string;
  nearbyPlaces?: NearbyPlace[];
}

const placeIcons: Record<string, string> = {
  transit: '🚇',
  park: '🌳',
  shopping: '🛍️',
  restaurant: '🍽️',
  education: '🎓',
  entertainment: '🎭',
  hospital: '🏥',
};

declare global {
  interface Window {
    google: typeof google;
    initPropertyMap: () => void;
  }
}

export function PropertyMap({ latitude, longitude, address, nearbyPlaces = [] }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setMapError(true);
      return;
    }

    // If Google Maps already loaded
    if (window.google?.maps) {
      initMap();
      return;
    }

    // Load script
    const existing = document.getElementById('google-maps-script');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initPropertyMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    window.initPropertyMap = () => {
      setMapLoaded(true);
    };
  }, [apiKey]);

  useEffect(() => {
    if (mapLoaded) initMap();
  }, [mapLoaded]);

  function initMap() {
    if (!mapRef.current || !window.google?.maps) return;

    const center = { lat: latitude, lng: longitude };

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 15,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
        { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#3f4f6b' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0c2a4a' }] },
        { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#1a3a2a' }] },
        { featureType: 'transit.station', elementType: 'labels.icon', stylers: [{ visibility: 'on' }] },
      ],
      mapTypeControl: false,
      streetViewControl: true,
      fullscreenControl: true,
    });

    // Property pin
    new window.google.maps.Marker({
      position: center,
      map,
      title: address,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#c8a97e',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 10,
      },
    });

    // Info window on pin click
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="background:#1e293b;color:#f1f5f9;padding:10px 14px;border-radius:8px;font-family:sans-serif;max-width:220px;">
          <p style="font-weight:600;font-size:13px;margin:0 0 4px;">${address}</p>
          <p style="font-size:11px;color:#94a3b8;margin:0;">Click for Street View</p>
        </div>
      `,
    });

    const marker = new window.google.maps.Marker({
      position: center,
      map,
      title: address,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#c8a97e',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 12,
      },
    });

    marker.addListener('click', () => infoWindow.open(map, marker));
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <div className="space-y-4">
      {/* Map container */}
      <div className="relative rounded-xl overflow-hidden border border-slate-700" style={{ height: 340 }}>
        {mapError ? (
          /* Fallback when no API key */
          <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center gap-3">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'radial-gradient(circle, #c8a97e 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            {/* Simulated streets */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 340">
              <line x1="0" y1="170" x2="400" y2="170" stroke="#94a3b8" strokeWidth="2" />
              <line x1="200" y1="0" x2="200" y2="340" stroke="#94a3b8" strokeWidth="2" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#64748b" strokeWidth="1" />
              <line x1="0" y1="240" x2="400" y2="240" stroke="#64748b" strokeWidth="1" />
              <line x1="130" y1="0" x2="130" y2="340" stroke="#64748b" strokeWidth="1" />
              <line x1="270" y1="0" x2="270" y2="340" stroke="#64748b" strokeWidth="1" />
              <circle cx="200" cy="170" r="12" fill="#c8a97e" stroke="white" strokeWidth="2" />
            </svg>
            <div className="relative z-10 text-center px-6">
              <MapPin className="w-10 h-10 text-brand-gold mx-auto mb-3" />
              <p className="text-white font-semibold text-sm mb-1">{address}</p>
              <p className="text-slate-500 text-xs mb-4">
                Add <code className="text-brand-gold bg-slate-900 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to enable the interactive map
              </p>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-brand-gold hover:text-amber-400 transition-colors">
                <ExternalLink className="w-3 h-3" /> Open in Google Maps
              </a>
            </div>
          </div>
        ) : (
          <div ref={mapRef} className="w-full h-full" />
        )}
      </div>

      {/* Map action buttons */}
      <div className="flex gap-3">
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg border border-slate-700 text-xs text-slate-300 hover:border-brand-gold hover:text-brand-gold transition-all">
          <MapPin className="w-3.5 h-3.5" /> View on Google Maps
        </a>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg border border-slate-700 text-xs text-slate-300 hover:border-brand-gold hover:text-brand-gold transition-all">
          <Navigation2 className="w-3.5 h-3.5" /> Get Directions
        </a>
      </div>

      {/* Nearby places */}
      {nearbyPlaces.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Nearby</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {nearbyPlaces.map((place, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-base shrink-0">{placeIcons[place.type] || '📍'}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-200 truncate">{place.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{place.type}</p>
                </div>
                <span className="text-xs text-brand-gold font-medium shrink-0">{place.distance}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
// components/map/PropertyMap.tsx
'use client';

import { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from '@react-google-maps/api';
import { MapPin, Bed, Bath, Maximize2, X } from 'lucide-react';
import { formatPrice, getListingSlug } from '@/utils';
import { StatusBadge } from '@/components/ui/Display';
import type { Listing } from '@/types';

type PropertyMapProps = {
  listings?: Listing[];
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
};

type ListingWithCoords = Listing & {
  lat: number;
  lng: number;
};

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 43.6532,
  lng: -79.3832,
};

const cityCenters: Record<string, { lat: number; lng: number }> = {
  Toronto: { lat: 43.6532, lng: -79.3832 },
  Mississauga: { lat: 43.5890, lng: -79.6441 },
  Oakville: { lat: 43.4675, lng: -79.6877 },
  Vaughan: { lat: 43.8361, lng: -79.4985 },
  Markham: { lat: 43.8561, lng: -79.3370 },
  'Richmond Hill': { lat: 43.8828, lng: -79.4403 },
  Brampton: { lat: 43.7315, lng: -79.7624 },
};

const neighborhoodOffsets: Record<string, { lat: number; lng: number }> = {
  'King West': { lat: 0.005, lng: -0.01 },
  'Distillery District': { lat: -0.002, lng: 0.015 },
  Rosedale: { lat: 0.02, lng: 0.01 },
  Yorkville: { lat: 0.012, lng: 0.003 },
  'Liberty Village': { lat: -0.01, lng: -0.02 },
  Annex: { lat: 0.01, lng: -0.01 },
  Etobicoke: { lat: -0.005, lng: -0.05 },
  NorthYork: { lat: 0.05, lng: 0 },
  'North York': { lat: 0.05, lng: 0 },
  Scarborough: { lat: 0.03, lng: 0.08 },
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  clickableIcons: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
    { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#334155' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#111827' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#132d1c' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#0f172a' }] },
    { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#1f2937' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0b1120' }] },
  ],
};

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getListingCoordinates(listing: Listing): { lat: number; lng: number } {
  const maybeCoords = listing as Listing & {
    lat?: number;
    lng?: number;
    latitude?: number;
    longitude?: number;
  };

  if (
    typeof maybeCoords.lat === 'number' &&
    typeof maybeCoords.lng === 'number'
  ) {
    return { lat: maybeCoords.lat, lng: maybeCoords.lng };
  }

  if (
    typeof maybeCoords.latitude === 'number' &&
    typeof maybeCoords.longitude === 'number'
  ) {
    return { lat: maybeCoords.latitude, lng: maybeCoords.longitude };
  }

  const base = cityCenters[listing.city] || defaultCenter;
  const neighborhoodOffset = neighborhoodOffsets[listing.neighborhood] || {
    lat: 0,
    lng: 0,
  };

  const seed = hashString(`${listing.id}-${listing.title}-${listing.city}`);
  const latJitter = ((seed % 100) - 50) * 0.0003;
  const lngJitter = (((Math.floor(seed / 100)) % 100) - 50) * 0.0003;

  return {
    lat: base.lat + neighborhoodOffset.lat + latJitter,
    lng: base.lng + neighborhoodOffset.lng + lngJitter,
  };
}

export function PropertyMap({
  listings = [],
  selectedListing,
  setSelectedListing,
  hoveredId,
  setHoveredId,
}: PropertyMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'propvault-google-map',
    googleMapsApiKey: apiKey,
  });

  const listingsWithCoords = useMemo<ListingWithCoords[]>(
    () =>
      (listings ?? []).map(listing => {
        const coords = getListingCoordinates(listing);
        return {
          ...listing,
          lat: coords.lat,
          lng: coords.lng,
        };
      }),
    [listings]
  );

  useEffect(() => {
    if (!mapRef.current || listingsWithCoords.length === 0 || !isLoaded) return;

    const bounds = new window.google.maps.LatLngBounds();

    listingsWithCoords.forEach(listing => {
      bounds.extend({ lat: listing.lat, lng: listing.lng });
    });

    mapRef.current.fitBounds(bounds);

    if (listingsWithCoords.length === 1) {
      mapRef.current.setZoom(12);
    }
  }, [listingsWithCoords, isLoaded]);

  if (!apiKey) {
    return (
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
        <div className="px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-300">
          Add <code className="bg-slate-800 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to enable live map
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
        <div className="text-sm text-slate-400">Loading map...</div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
      options={mapOptions}
      onLoad={map => {
        mapRef.current = map;
      }}
    >
      {listingsWithCoords.map(listing => (
        <MarkerF
          key={listing.id}
          position={{ lat: listing.lat, lng: listing.lng }}
          onClick={() =>
            setSelectedListing(
              selectedListing?.id === listing.id ? null : listing
            )
          }
          onMouseOver={() => setHoveredId(listing.id)}
          onMouseOut={() => setHoveredId(null)}
          label={{
            text: formatPrice(listing.price, true),
            color:
              selectedListing?.id === listing.id || hoveredId === listing.id
                ? '#0f172a'
                : '#ffffff',
            fontSize: '12px',
            fontWeight: '700',
          }}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: selectedListing?.id === listing.id ? 28 : hoveredId === listing.id ? 26 : 24,
            fillColor:
              selectedListing?.id === listing.id
                ? '#d4af7a'
                : hoveredId === listing.id
                  ? '#ffffff'
                  : '#1e293b',
            fillOpacity: 1,
            strokeColor:
              selectedListing?.id === listing.id
                ? '#d4af7a'
                : '#475569',
            strokeWeight: 2,
          }}
        />
      ))}

      {selectedListing && (
        <InfoWindowF
          position={getListingCoordinates(selectedListing)}
          onCloseClick={() => setSelectedListing(null)}
        >
          <div className="w-80 bg-slate-900 text-white rounded-2xl overflow-hidden">
            <Link href={`/listings/${getListingSlug(selectedListing)}`}>
              <div className="relative h-40">
                {selectedListing.images?.[0] ? (
                  <Image
                    src={selectedListing.images[0]}
                    alt={selectedListing.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-slate-700" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute top-3 left-3">
                  <StatusBadge status={selectedListing.propertyStatus} />
                </div>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setSelectedListing(null);
                  }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="text-xl font-bold text-white">
                    {formatPrice(selectedListing.price, true)}
                  </span>
                  {selectedListing.listingType === 'rent' && (
                    <span className="text-sm text-slate-300">/mo</span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-1">
                  {selectedListing.title}
                </h3>
                <p className="flex items-center gap-1 text-xs text-slate-600 mb-3">
                  <MapPin className="w-3 h-3" />
                  {selectedListing.neighborhood}, {selectedListing.city}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5" />
                    {selectedListing.bedrooms || 'Studio'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5" />
                    {selectedListing.bathrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    {selectedListing.sqft?.toLocaleString()}
                  </span>
                  <span className="ml-auto font-medium text-xs capitalize text-amber-700">
                    {selectedListing.propertyType}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
<<<<<<< HEAD
}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
