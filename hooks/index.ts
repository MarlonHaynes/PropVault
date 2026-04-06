import { useState, useEffect, useCallback, useRef } from 'react';
import { listings } from '@/data/listings';
import type { Listing, FilterState, MortgageInput, MortgageResult, Inquiry } from '@/types';
import { calculateMortgage } from '@/utils';
import { createInquiry, getUserInquiries } from '@/firebase/firestore';
import { useAuth } from '@/context/AuthContext';

// ── useScrolled ──────────────────────────────────────────────────────────────
export function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return scrolled;
}

// ── useLocalStorage ──────────────────────────────────────────────────────────
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

// ── useToast ─────────────────────────────────────────────────────────────────
type ToastType = 'success' | 'error' | 'info';
interface Toast { id: string; message: string; type: ToastType }

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
    const id = `${Date.now()}`;
    globalSetToasts(p => [...p, { id, message, type }]);
    setTimeout(() => globalSetToasts!(p => p.filter(t => t.id !== id)), 4000);
  }
  return { toast };
}

// ── useListings ──────────────────────────────────────────────────────────────
export function useListings(filters: FilterState) {
  const [results, setResults] = useState<Listing[]>(listings);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  useEffect(() => {
    let filtered = [...listings];
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(kw) ||
        l.address.toLowerCase().includes(kw) ||
        l.neighborhood.toLowerCase().includes(kw) ||
        l.city.toLowerCase().includes(kw)
      );
    }
    if (filters.city) filtered = filtered.filter(l => l.city === filters.city);
    if (filters.neighborhood) filtered = filtered.filter(l => l.neighborhood === filters.neighborhood);
    if (filters.propertyType.length > 0) filtered = filtered.filter(l => filters.propertyType.includes(l.propertyType));
    if (filters.listingType) filtered = filtered.filter(l => l.listingType === filters.listingType);
    if (filters.minPrice) filtered = filtered.filter(l => l.price >= filters.minPrice!);
    if (filters.maxPrice) filtered = filtered.filter(l => l.price <= filters.maxPrice!);
    if (filters.bedrooms) filtered = filtered.filter(l => l.bedrooms >= filters.bedrooms!);
    if (filters.bathrooms) filtered = filtered.filter(l => l.bathrooms >= filters.bathrooms!);
    if (filters.minSqft) filtered = filtered.filter(l => l.sqft >= filters.minSqft!);
    if (filters.maxSqft) filtered = filtered.filter(l => l.sqft <= filters.maxSqft!);
    if (filters.furnished) filtered = filtered.filter(l => l.furnished);
    if (filters.petFriendly) filtered = filtered.filter(l => l.petFriendly);
    if (filters.parking) filtered = filtered.filter(l => l.parkingSpaces >= filters.parking!);

    switch (filters.sort) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'sqft-desc': filtered.sort((a, b) => b.sqft - a.sqft); break;
      case 'bedrooms-desc': filtered.sort((a, b) => b.bedrooms - a.bedrooms); break;
      case 'featured': filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
      default: filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setResults(filtered);
    setPage(1);
  }, [filters]);

  const total = results.length;
  const paginated = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(total / PER_PAGE);

  return { results: paginated, total, page, setPage, totalPages };
}

// ── useMortgageCalculator ─────────────────────────────────────────────────────
export function useMortgageCalculator(initial?: Partial<MortgageInput>) {
  const [input, setInput] = useState<MortgageInput>({
    homePrice: initial?.homePrice ?? 800000,
    downPayment: initial?.downPayment ?? 160000,
    interestRate: initial?.interestRate ?? 5.5,
    amortization: initial?.amortization ?? 25,
  });
  const result: MortgageResult = calculateMortgage(input);
  return { input, setInput, result };
}

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
