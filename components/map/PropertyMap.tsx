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
