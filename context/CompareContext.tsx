'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import type { Listing } from '@/types';

interface CompareContextType {
  compareList: Listing[];
  addToCompare: (listing: Listing) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Listing[]>([]);

  function addToCompare(listing: Listing) {
<<<<<<< HEAD
<<<<<<< HEAD
    if (compareList.length >= 4 || compareList.find(l => l.id === listing.id)) return;
    setCompareList(prev => [...prev, listing]);
  }
  function removeFromCompare(id: string) { setCompareList(prev => prev.filter(l => l.id !== id)); }
  function isInCompare(id: string) { return compareList.some(l => l.id === id); }
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    if (compareList.length >= 4) return;
    if (!compareList.find(l => l.id === listing.id)) {
      setCompareList(prev => [...prev, listing]);
    }
  }

  function removeFromCompare(id: string) {
    setCompareList(prev => prev.filter(l => l.id !== id));
  }

  function isInCompare(id: string) {
    return compareList.some(l => l.id === id);
  }

<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  function clearCompare() { setCompareList([]); }

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
