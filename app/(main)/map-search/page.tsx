'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  Search,
  SlidersHorizontal,
  X,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { useListingsContext } from '@/context/ListingsContext';
import { useSaved } from '@/context/SavedContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks';
import { formatPrice, getListingSlug, cn } from '@/utils';
import { LoadingSpinner, StatusBadge } from '@/components/ui/Display';
import type { Listing } from '@/types';

const CITY_FILTERS = [
  'All',
  'Toronto',
  'Mississauga',
  'Oakville',
  'Vaughan',
  'Markham',
  'Richmond Hill',
  'Brampton',
];

const TYPE_FILTERS = [
  { value: '', label: 'Any Type' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
  { value: 'new-development', label: 'New Dev' },
];

const DEFAULT_CENTER = { lat: 43.6532, lng: -79.3832 };

declare global {
  interface Window {
    google: typeof google;
    initMapSearchPage: () => void;
  }
}

type ListingWithCoords = Listing & {
  latitude?: number;
  longitude?: number;
  lat?: number;
  lng?: number;
  coords?: {
    lat?: number;
    lng?: number;
  };
  address?: string;
};

type ResolvedCoord = {
  lat: number;
  lng: number;
};

type AdvancedMarkerInstance = google.maps.marker.AdvancedMarkerElement & {
  __contentEl?: HTMLDivElement;
};

function getDirectLatLng(listing: ListingWithCoords): ResolvedCoord | null {
  const lat = Number(listing.latitude ?? listing.lat ?? listing.coords?.lat);
  const lng = Number(listing.longitude ?? listing.lng ?? listing.coords?.lng);

  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return { lat, lng };
  }

  return null;
}

function buildGeocodeQuery(listing: ListingWithCoords) {
  const parts = [
    listing.address,
    listing.neighborhood,
    listing.city,
    'Ontario',
    'Canada',
  ].filter(Boolean);

  return parts.join(', ');
}

function createAdvancedMarkerContent(isSelected: boolean) {
  const el = document.createElement('div');
  el.style.width = isSelected ? '22px' : '20px';
  el.style.height = isSelected ? '22px' : '20px';
  el.style.borderRadius = '9999px';
  el.style.background = isSelected ? '#f4d08a' : '#c8a97e';
  el.style.border = '3px solid #ffffff';
  el.style.boxShadow = '0 4px 14px rgba(0,0,0,0.35)';
  el.style.transition = 'all 0.18s ease';
  el.style.cursor = 'pointer';
  return el;
}


export default function MapSearchPage() {
  const { listings: allListings, loading } = useListingsContext();
  const { isSaved, toggleSave } = useSaved();
  const { user } = useAuth();
  const { toast } = useToast();

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [city, setCity] = useState('All');
  const [typeFilter, setTypeFilter] = useState('');
  const [keyword, setKeyword] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [resolvedCoords, setResolvedCoords] = useState<Record<string, ResolvedCoord>>({});

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Record<string, AdvancedMarkerInstance>>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const geocodingInFlightRef = useRef<Set<string>>(new Set());
  const initialFitDoneRef = useRef(false);

  const filtered = useMemo(() => {
    return allListings.filter((l) => {
      const matchCity = city === 'All' || l.city === city;
      const matchType = !typeFilter || l.listingType === typeFilter;
      const matchKw =
        !keyword ||
        l.title.toLowerCase().includes(keyword.toLowerCase()) ||
        l.neighborhood.toLowerCase().includes(keyword.toLowerCase());

      return matchCity && matchType && matchKw;
    });
  }, [allListings, city, typeFilter, keyword]);

  useEffect(() => {
    initialFitDoneRef.current = false;
  }, [city, typeFilter, keyword]);

  useEffect(() => {
    if (!apiKey) {
      setMapError(true);
      return;
    }

    if (window.google?.maps?.marker?.AdvancedMarkerElement) {
      setMapLoaded(true);
      return;
    }

    const existingScript = document.getElementById('google-maps-script-map-search');
    if (existingScript) return;

    window.initMapSearchPage = () => {
      setMapLoaded(true);
    };

    const script = document.createElement('script');
    script.id = 'google-maps-script-map-search';
    // Use the core Maps JS API only. The optional `marker` library (AdvancedMarkerElement)
    // can fail to load or behave inconsistently depending on key/config/billing.
    // We fall back to classic `google.maps.Marker` pins which always render.
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=initMapSearchPage`;
    script.async = true;
    script.defer = true;
    script.onerror = () => setMapError(true);

    document.head.appendChild(script);
  }, [apiKey]);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !window.google?.maps || mapInstanceRef.current) return;

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: DEFAULT_CENTER,
      zoom: 10,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#020617' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
        { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#334155' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0b2440' }] },
        { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#0f2d1b' }] },
        { featureType: 'poi', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      clickableIcons: false,
    });

    infoWindowRef.current = new window.google.maps.InfoWindow();
    geocoderRef.current = new window.google.maps.Geocoder();
  }, [mapLoaded]);

  useEffect(() => {
    if (!mapLoaded || !window.google?.maps || !geocoderRef.current) return;

    const listingsNeedingGeocode = filtered.filter((listing) => {
      const typedListing = listing as ListingWithCoords;

      if (resolvedCoords[listing.id]) return false;
      if (getDirectLatLng(typedListing)) return false;
      if (geocodingInFlightRef.current.has(listing.id)) return false;

      return true;
    });

    listingsNeedingGeocode.forEach((listing) => {
      const typedListing = listing as ListingWithCoords;
      const query = buildGeocodeQuery(typedListing);

      if (!query) return;

      geocodingInFlightRef.current.add(listing.id);

      const cacheKey = `propvault-geocode-${listing.id}`;
      const cached =
        typeof window !== 'undefined' ? window.sessionStorage.getItem(cacheKey) : null;

      if (cached) {
        try {
          const parsed = JSON.parse(cached) as ResolvedCoord;
          if (Number.isFinite(parsed.lat) && Number.isFinite(parsed.lng)) {
            setResolvedCoords((prev) => ({
              ...prev,
              [listing.id]: parsed,
            }));
            geocodingInFlightRef.current.delete(listing.id);
            return;
          }
        } catch {
          // ignore bad cache
        }
      }

      geocoderRef.current!.geocode({ address: query }, (results, status) => {
        geocodingInFlightRef.current.delete(listing.id);

        if (status === 'OK' && results?.[0]?.geometry?.location) {
          const coord = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };

          setResolvedCoords((prev) => ({
            ...prev,
            [listing.id]: coord,
          }));

          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(cacheKey, JSON.stringify(coord));
          }
        }
      });
    });
  }, [filtered, mapLoaded, resolvedCoords]);

  const mapListings = useMemo(() => {
    return filtered.filter((listing) => {
      const typedListing = listing as ListingWithCoords;
      return !!getDirectLatLng(typedListing) || !!resolvedCoords[listing.id];
    }) as ListingWithCoords[];
  }, [filtered, resolvedCoords]);

  function getResolvedLatLng(listing: ListingWithCoords): ResolvedCoord | null {
    return getDirectLatLng(listing) ?? resolvedCoords[listing.id] ?? null;
  }

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !window.google?.maps) return;

    // With the script configured to not load the marker library,
    // we always use classic markers for reliability.
    const useAdvancedMarkers = false;

    // Clear all existing markers and rebuild from scratch to avoid type mismatch bugs
    Object.values(markersRef.current).forEach((marker) => {
      if ('setMap' in (marker as unknown as google.maps.Marker)) {
        (marker as unknown as google.maps.Marker).setMap(null);
      } else {
        (marker as AdvancedMarkerInstance).map = null;
      }
    });
    markersRef.current = {};

    const bounds = new window.google.maps.LatLngBounds();
    let hasCoords = false;

    mapListings.forEach((listing) => {
      const coords = getResolvedLatLng(listing);
      if (!coords) return;

      hasCoords = true;
      bounds.extend(coords);

      if (useAdvancedMarkers) {
        // Modern gold dot markers
        const content = createAdvancedMarkerContent(selectedListing?.id === listing.id);

        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: coords,
          title: listing.title,
          content,
          zIndex: selectedListing?.id === listing.id ? 999 : 1,
        }) as AdvancedMarkerInstance;

        marker.__contentEl = content;

        content.addEventListener('click', () => {
          setSelectedListing(listing);

          if (infoWindowRef.current) {
            const slug = getListingSlug(listing);
            infoWindowRef.current.setContent(`
              <div style="min-width:220px;max-width:240px;padding:8px 10px;font-family:Arial,sans-serif;">
                <div style="font-size:14px;font-weight:700;color:#0f172a;margin-bottom:4px;">
                  ${listing.title}
                </div>
                <div style="font-size:12px;color:#475569;margin-bottom:6px;">
                  ${listing.neighborhood}, ${listing.city}
                </div>
                <div style="font-size:15px;font-weight:700;color:#b45309;margin-bottom:8px;">
                  ${formatPrice(listing.price, true)}${listing.listingType === 'rent' ? '/mo' : ''}
                </div>
                <a href="/listings/${slug}" style="font-size:12px;font-weight:600;color:#1d4ed8;text-decoration:none;">
                  View listing
                </a>
              </div>
            `);
            infoWindowRef.current.setPosition(coords);
            infoWindowRef.current.open(map);
          }
        });

        markersRef.current[listing.id] = marker;
      } else {
        // Fallback: classic Google Maps marker so dots always show
        const marker = new window.google.maps.Marker({
          map,
          position: coords,
          title: listing.title,
        });

        marker.addListener('click', () => {
          setSelectedListing(listing);

          if (infoWindowRef.current) {
            const slug = getListingSlug(listing);
            infoWindowRef.current.setContent(`
              <div style="min-width:220px;max-width:240px;padding:8px 10px;font-family:Arial,sans-serif;">
                <div style="font-size:14px;font-weight:700;color:#0f172a;margin-bottom:4px;">
                  ${listing.title}
                </div>
                <div style="font-size:12px;color:#475569;margin-bottom:6px;">
                  ${listing.neighborhood}, ${listing.city}
                </div>
                <div style="font-size:15px;font-weight:700;color:#b45309;margin-bottom:8px;">
                  ${formatPrice(listing.price, true)}${listing.listingType === 'rent' ? '/mo' : ''}
                </div>
                <a href="/listings/${slug}" style="font-size:12px;font-weight:600;color:#1d4ed8;text-decoration:none;">
                  View listing
                </a>
              </div>
            `);
            infoWindowRef.current.setPosition(coords);
            infoWindowRef.current.open(map);
          }
        });

        markersRef.current[listing.id] = marker as unknown as AdvancedMarkerInstance;
      }
    });

    if (!hasCoords) {
      map.setCenter(DEFAULT_CENTER);
      map.setZoom(10);
      initialFitDoneRef.current = false;
      return;
    }

    // No special styling updates needed for classic markers

    if (selectedListing) {
      const selectedCoords = getResolvedLatLng(selectedListing as ListingWithCoords);
      if (selectedCoords) {
        map.panTo(selectedCoords);
        map.setZoom(14);
        return;
      }
    }

    if (!initialFitDoneRef.current) {
      if (mapListings.length === 1) {
        map.setCenter(bounds.getCenter());
        map.setZoom(14);
      } else {
        map.fitBounds(bounds);
        window.google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
          const currentZoom = map.getZoom();
          if (currentZoom && currentZoom > 13) {
            map.setZoom(13);
          }
        });
      }

      initialFitDoneRef.current = true;
    }
  }, [mapListings, selectedListing, resolvedCoords]);

  useEffect(() => {
    if (!hoveredId || !mapInstanceRef.current) return;

    const hoveredListing = mapListings.find((listing) => listing.id === hoveredId);
    if (!hoveredListing) return;

    const coords = getResolvedLatLng(hoveredListing);
    if (!coords) return;

    mapInstanceRef.current.panTo(coords);
  }, [hoveredId, mapListings, resolvedCoords]);

  useEffect(() => {
    if (!selectedListing || !mapInstanceRef.current) return;

    const coords = getResolvedLatLng(selectedListing as ListingWithCoords);
    if (!coords) return;

    mapInstanceRef.current.panTo(coords);
    mapInstanceRef.current.setZoom(14);
  }, [selectedListing, resolvedCoords]);

  async function handleSave(e: React.MouseEvent, listing: Listing) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast('Sign in to save properties', 'info');
      return;
    }

    await toggleSave(listing.id);
    toast(isSaved(listing.id) ? 'Removed from saved' : 'Property saved!', 'success');
  }

  return (
    <div className="h-screen bg-brand-dark flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden pt-16">
        <div className="flex-1 relative bg-slate-900 overflow-hidden">
          {mapError || !apiKey ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
              <div className="text-center px-6">
                <MapPin className="w-10 h-10 text-brand-gold mx-auto mb-3" />
                <p className="text-white font-semibold text-sm mb-2">
                  Google Map could not load
                </p>
                <p className="text-slate-400 text-xs">
                  Make sure <code className="bg-slate-800 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> is set
                  and restart the dev server.
                </p>
              </div>
            </div>
          ) : (
            <div ref={mapRef} className="absolute inset-0" />
          )}

          {selectedListing && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-80 bg-slate-900 border border-slate-600 rounded-2xl shadow-2xl overflow-hidden z-20 animate-slide-up">
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
                <StatusBadge
                  status={selectedListing.propertyStatus}
                  className="absolute top-3 left-3"
                />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedListing(null);
                  }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70"
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
                <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">
                  {selectedListing.title}
                </h3>

                <p className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                  <MapPin className="w-3 h-3" />
                  {selectedListing.neighborhood}, {selectedListing.city}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 border-t border-slate-700 pt-3 mb-4">
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
                  <span className="ml-auto text-brand-gold font-medium text-xs capitalize">
                    {selectedListing.propertyType}
                  </span>
                </div>

                <Link
                  href={`/listings/${getListingSlug(selectedListing)}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-gold hover:text-amber-400"
                >
                  View details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {!loading && filtered.length > 0 && mapListings.length === 0 && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-slate-900/85 border border-slate-700 backdrop-blur-sm z-20">
              <p className="text-xs text-slate-300">
                Listings loaded, but no usable coordinates were found yet.
              </p>
            </div>
          )}
        </div>

        <div className="w-[420px] shrink-0 flex flex-col bg-slate-900 border-l border-slate-800">
          <div className="p-4 border-b border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search listings..."
                  className="w-full h-9 pl-9 pr-3 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'h-9 px-3 rounded-lg border text-sm flex items-center gap-1.5 transition-all',
                  showFilters
                    ? 'border-brand-gold text-brand-gold bg-brand-gold/10'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500'
                )}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {showFilters && (
              <div className="flex gap-2">
                {TYPE_FILTERS.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTypeFilter(t.value)}
                    className={cn(
                      'flex-1 py-1.5 text-xs rounded-lg border font-medium transition-all',
                      typeFilter === t.value
                        ? 'bg-brand-gold/20 border-brand-gold text-brand-gold'
                        : 'border-slate-700 text-slate-400 hover:border-slate-500'
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {CITY_FILTERS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all shrink-0',
                    city === c
                      ? 'bg-brand-gold text-slate-900 border-brand-gold'
                      : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-500">
              {loading ? 'Loading...' : `${filtered.length} propert${filtered.length === 1 ? 'y' : 'ies'} found`}
              {(city !== 'All' || typeFilter || keyword) && (
                <button
                  onClick={() => {
                    setCity('All');
                    setTypeFilter('');
                    setKeyword('');
                    setSelectedListing(null);
                  }}
                  className="ml-2 text-brand-gold hover:text-amber-400 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <LoadingSpinner className="w-6 h-6" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 px-6">
                <MapPin className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm font-medium">No properties found</p>
                <p className="text-slate-600 text-xs mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {filtered.map((listing) => {
                  const saved = isSaved(listing.id);
                  const isSelected = selectedListing?.id === listing.id;
                  const slug = getListingSlug(listing);

                  return (
                    <div
                      key={listing.id}
                      onMouseEnter={() => setHoveredId(listing.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedListing(listing)}
                      className={cn(
                        'flex gap-3 p-4 hover:bg-slate-800/60 transition-all duration-150 group relative cursor-pointer',
                        isSelected && 'bg-slate-800/80 border-l-2 border-brand-gold',
                        hoveredId === listing.id && !isSelected && 'bg-slate-800/40'
                      )}
                    >
                      <div
                        className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-700 flex-shrink-0"
                        style={{ minWidth: '96px', height: '80px' }}
                      >
                        {listing.images?.[0] ? (
                          <Image
                            src={listing.images[0]}
                            alt={listing.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-slate-500" />
                          </div>
                        )}

                        <div
                          className={cn(
                            'absolute top-1.5 left-1.5 w-2 h-2 rounded-full border border-white/50',
                            listing.propertyStatus === 'available'
                              ? 'bg-emerald-400'
                              : listing.propertyStatus === 'pending'
                                ? 'bg-amber-400'
                                : 'bg-red-400'
                          )}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-white group-hover:text-brand-gold transition-colors line-clamp-1 leading-tight">
                              {listing.title}
                            </p>

                            <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">
                                {listing.neighborhood}, {listing.city}
                              </span>
                            </p>
                          </div>

                          <button
                            onClick={(e) => handleSave(e, listing)}
                            className={cn(
                              'shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all',
                              saved
                                ? 'text-red-400 bg-red-400/10'
                                : 'text-slate-500 hover:text-red-400 hover:bg-red-400/10'
                            )}
                          >
                            <Heart className={cn('w-3.5 h-3.5', saved && 'fill-current')} />
                          </button>
                        </div>

                        <p className="text-base font-bold text-brand-gold mt-1.5">
                          {formatPrice(listing.price, true)}
                          {listing.listingType === 'rent' && (
                            <span className="text-xs font-normal text-slate-400">/mo</span>
                          )}
                        </p>

                        <div className="flex items-center gap-3 mt-1.5">
                          {listing.bedrooms > 0 && (
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <Bed className="w-3 h-3" />
                              {listing.bedrooms}
                            </span>
                          )}

                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Bath className="w-3 h-3" />
                            {listing.bathrooms}
                          </span>

                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Maximize2 className="w-3 h-3" />
                            {listing.sqft?.toLocaleString()}
                          </span>

                          <span className="ml-auto text-[10px] font-medium text-slate-500 capitalize bg-slate-800 px-1.5 py-0.5 rounded">
                            {listing.propertyType}
                          </span>
                        </div>

                        <div className="mt-3">
                          <Link
                            href={`/listings/${slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-gold hover:text-amber-400"
                          >
                            View details
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
