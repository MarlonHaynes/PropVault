<<<<<<< HEAD
import { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import { useListingsContext } from '@/context/ListingsContext';
import type { Listing, FilterState, MortgageInput, MortgageResult } from '@/types';
import { calculateMortgage } from '@/utils';

// ── useScrolled ───────────────────────────────────────────────────────────────
=======
<<<<<<< HEAD
import { useState, useEffect, useCallback } from 'react';
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import { useState, useEffect, useCallback, useRef } from 'react';
import { listings } from '@/data/listings';
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
import type { Listing, FilterState, MortgageInput, MortgageResult, Inquiry } from '@/types';
import { calculateMortgage } from '@/utils';
import { createInquiry, getUserInquiries } from '@/firebase/firestore';
import { useAuth } from '@/context/AuthContext';
<<<<<<< HEAD
import { useListingsContext } from '@/context/ListingsContext';

// ── useScrolled ───────────────────────────────────────────────────────────────
=======

// ── useScrolled ──────────────────────────────────────────────────────────────
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
export function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return scrolled;
}

<<<<<<< HEAD
// ── useLocalStorage ───────────────────────────────────────────────────────────
=======
<<<<<<< HEAD
<<<<<<< HEAD
// ── useLocalStorage ───────────────────────────────────────────────────────────
=======
// ── useLocalStorage ──────────────────────────────────────────────────────────
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
// ── useLocalStorage ──────────────────────────────────────────────────────────
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
export function useLocalStorage<T>(key: string, initial: T): [T, (val: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? initial; } catch { return initial; }
  });
  const set = useCallback((val: T) => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  }, [key]);
  return [value, set];
}

<<<<<<< HEAD
// ── useToast ──────────────────────────────────────────────────────────────────
type ToastType = 'success' | 'error' | 'info' | 'warning';
<<<<<<< HEAD
interface Toast { id: string; message: string; type: ToastType }
=======
<<<<<<< HEAD
// ── useToast ──────────────────────────────────────────────────────────────────
type ToastType = 'success' | 'error' | 'info' | 'warning';
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
// ── useToast ─────────────────────────────────────────────────────────────────
type ToastType = 'success' | 'error' | 'info';
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
interface Toast { id: string; message: string; type: ToastType }

<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
let globalSetToasts: ((fn: (prev: Toast[]) => Toast[]) => void) | null = null;

export function useToastStore() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  globalSetToasts = setToasts;
  const dismiss = (id: string) => setToasts(p => p.filter(t => t.id !== id));
  return { toasts, dismiss };
}

export function useToast() {
  function toast(message: string, type: ToastType = 'success') {
    if (!globalSetToasts) return;
<<<<<<< HEAD
<<<<<<< HEAD
    const id = `toast-${Date.now()}`;
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    const id = `toast-${Date.now()}-${Math.random()}`;
=======
    const id = `${Date.now()}`;
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    globalSetToasts(p => [...p, { id, message, type }]);
    setTimeout(() => globalSetToasts!(p => p.filter(t => t.id !== id)), 4000);
  }
  return { toast };
}

<<<<<<< HEAD
<<<<<<< HEAD
// ── useListings (filters live listings from context) ──────────────────────────
export function useListings(filters: FilterState) {
  const { listings: all, loading } = useListingsContext();
  const [results, setResults] = useState<Listing[]>([]);
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
// ── useListings (uses live Firestore context) ─────────────────────────────────
export function useListings(filters: FilterState) {
  const { listings: allListings, loading } = useListingsContext();
  const [results, setResults] = useState<Listing[]>([]);
=======
// ── useListings ──────────────────────────────────────────────────────────────
export function useListings(filters: FilterState) {
  const [results, setResults] = useState<Listing[]>(listings);
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    let filtered = [...all];
=======
<<<<<<< HEAD
    let filtered = [...allListings];
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
    let filtered = [...allListings];
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      filtered = filtered.filter(l =>
        l.title?.toLowerCase().includes(kw) ||
        l.address?.toLowerCase().includes(kw) ||
        l.neighborhood?.toLowerCase().includes(kw) ||
        l.city?.toLowerCase().includes(kw)
<<<<<<< HEAD
<<<<<<< HEAD
      );
    }
    if (filters.city)                 filtered = filtered.filter(l => l.city === filters.city);
    if (filters.neighborhood)         filtered = filtered.filter(l => l.neighborhood === filters.neighborhood);
    if (filters.propertyType?.length) filtered = filtered.filter(l => filters.propertyType.includes(l.propertyType));
    if (filters.listingType)          filtered = filtered.filter(l => l.listingType === filters.listingType);
    if (filters.minPrice)             filtered = filtered.filter(l => l.price >= filters.minPrice!);
    if (filters.maxPrice)             filtered = filtered.filter(l => l.price <= filters.maxPrice!);
    if (filters.bedrooms)             filtered = filtered.filter(l => l.bedrooms >= filters.bedrooms!);
    if (filters.bathrooms)            filtered = filtered.filter(l => l.bathrooms >= filters.bathrooms!);
    if (filters.minSqft)              filtered = filtered.filter(l => l.sqft >= filters.minSqft!);
    if (filters.maxSqft)              filtered = filtered.filter(l => l.sqft <= filters.maxSqft!);
    if (filters.furnished)            filtered = filtered.filter(l => l.furnished);
    if (filters.petFriendly)          filtered = filtered.filter(l => l.petFriendly);

    switch (filters.sort) {
      case 'price-asc':     filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc':    filtered.sort((a, b) => b.price - a.price); break;
      case 'sqft-desc':     filtered.sort((a, b) => (b.sqft || 0) - (a.sqft || 0)); break;
      case 'bedrooms-desc': filtered.sort((a, b) => (b.bedrooms || 0) - (a.bedrooms || 0)); break;
      case 'featured':      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
      default:              filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
    let filtered = [...listings];
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(kw) ||
        l.address.toLowerCase().includes(kw) ||
        l.neighborhood.toLowerCase().includes(kw) ||
        l.city.toLowerCase().includes(kw)
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
      );
    }
    if (filters.city) filtered = filtered.filter(l => l.city === filters.city);
    if (filters.neighborhood) filtered = filtered.filter(l => l.neighborhood === filters.neighborhood);
<<<<<<< HEAD
    if (filters.propertyType?.length > 0) filtered = filtered.filter(l => filters.propertyType.includes(l.propertyType));
=======
    if (filters.propertyType.length > 0) filtered = filtered.filter(l => filters.propertyType.includes(l.propertyType));
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
    if (filters.listingType) filtered = filtered.filter(l => l.listingType === filters.listingType);
    if (filters.minPrice) filtered = filtered.filter(l => l.price >= filters.minPrice!);
    if (filters.maxPrice) filtered = filtered.filter(l => l.price <= filters.maxPrice!);
    if (filters.bedrooms) filtered = filtered.filter(l => l.bedrooms >= filters.bedrooms!);
    if (filters.bathrooms) filtered = filtered.filter(l => l.bathrooms >= filters.bathrooms!);
    if (filters.minSqft) filtered = filtered.filter(l => l.sqft >= filters.minSqft!);
    if (filters.maxSqft) filtered = filtered.filter(l => l.sqft <= filters.maxSqft!);
    if (filters.furnished) filtered = filtered.filter(l => l.furnished);
    if (filters.petFriendly) filtered = filtered.filter(l => l.petFriendly);
<<<<<<< HEAD
=======
    if (filters.parking) filtered = filtered.filter(l => l.parkingSpaces >= filters.parking!);
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175

    switch (filters.sort) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
<<<<<<< HEAD
      case 'sqft-desc': filtered.sort((a, b) => (b.sqft || 0) - (a.sqft || 0)); break;
      case 'bedrooms-desc': filtered.sort((a, b) => (b.bedrooms || 0) - (a.bedrooms || 0)); break;
      case 'featured': filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
      default: filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
=======
      case 'sqft-desc': filtered.sort((a, b) => b.sqft - a.sqft); break;
      case 'bedrooms-desc': filtered.sort((a, b) => b.bedrooms - a.bedrooms); break;
      case 'featured': filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
      default: filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    }

    setResults(filtered);
    setPage(1);
<<<<<<< HEAD
<<<<<<< HEAD
  }, [filters, all]);
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  }, [filters, allListings]);
=======
  }, [filters]);
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

  const total = results.length;
  const paginated = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(total / PER_PAGE);

<<<<<<< HEAD
  return { results: paginated, total, page, setPage, totalPages, loading };
=======
<<<<<<< HEAD
<<<<<<< HEAD
  return { results: paginated, total, page, setPage, totalPages, loading };
=======
  return { results: paginated, total, page, setPage, totalPages };
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
  return { results: paginated, total, page, setPage, totalPages };
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
}

// ── useMortgageCalculator ─────────────────────────────────────────────────────
export function useMortgageCalculator(initial?: Partial<MortgageInput>) {
  const [input, setInput] = useState<MortgageInput>({
<<<<<<< HEAD
<<<<<<< HEAD
    homePrice:    initial?.homePrice    ?? 800000,
    downPayment:  initial?.downPayment  ?? 160000,
=======
    homePrice: initial?.homePrice ?? 800000,
    downPayment: initial?.downPayment ?? 160000,
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
    homePrice: initial?.homePrice ?? 800000,
    downPayment: initial?.downPayment ?? 160000,
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    interestRate: initial?.interestRate ?? 5.5,
    amortization: initial?.amortization ?? 25,
  });
  const result: MortgageResult = calculateMortgage(input);
  return { input, setInput, result };
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

// ── useInquiries ──────────────────────────────────────────────────────────────
export function useInquiries() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const data = await getUserInquiries(user.uid);
    setInquiries(data);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  async function submitInquiry(data: Omit<Inquiry, 'id' | 'createdAt'>) {
    const id = await createInquiry(data);
    await load();
    return id;
  }

  return { inquiries, loading, submitInquiry };
}
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
