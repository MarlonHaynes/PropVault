'use client';
<<<<<<< HEAD
<<<<<<< HEAD
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { seedListings } from '@/data/listings';
=======
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { subscribeToListings } from '@/firebase/firestore';
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { subscribeToListings } from '@/firebase/firestore';
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import type { Listing } from '@/types';

interface ListingsContextType {
  listings: Listing[];
  loading: boolean;
<<<<<<< HEAD
<<<<<<< HEAD
  refetch: () => void;
}

const ListingsContext = createContext<ListingsContextType>({
  listings: seedListings,
  loading: false,
  refetch: () => {},
});

function getStoredListings(): Listing[] {
  if (typeof window === 'undefined') return seedListings;
  try {
    const raw = localStorage.getItem('propvault_listings');
    if (!raw) return seedListings;
    const stored = JSON.parse(raw) as Listing[];
    // Merge: stored listings take priority, add any seed listings not yet in store
    const storedIds = new Set(stored.map(l => l.id));
    const merged = [...stored, ...seedListings.filter(l => !storedIds.has(l.id))];
    return merged;
  } catch { return seedListings; }
}

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(seedListings);
  const [loading, setLoading] = useState(true);

  function load() {
    setListings(getStoredListings());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <ListingsContext.Provider value={{ listings, loading, refetch: load }}>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
}

const ListingsContext = createContext<ListingsContextType>({ listings: [], loading: true });

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToListings(data => {
      setListings(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <ListingsContext.Provider value={{ listings, loading }}>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {children}
    </ListingsContext.Provider>
  );
}

export function useListingsContext() {
  return useContext(ListingsContext);
}
