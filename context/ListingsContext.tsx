'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { subscribeToListings } from '@/firebase/firestore';
import type { Listing } from '@/types';

interface ListingsContextType {
  listings: Listing[];
  loading: boolean;
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
      {children}
    </ListingsContext.Provider>
  );
}

export function useListingsContext() {
  return useContext(ListingsContext);
}
