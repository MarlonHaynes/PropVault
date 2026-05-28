'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { saveProperty, unsaveProperty, getSavedPropertyIds } from '@/firebase/firestore';

interface SavedContextType {
  savedIds: string[];
  toggleSave: (listingId: string) => Promise<void>;
  isSaved: (listingId: string) => boolean;
}

const SavedContext = createContext<SavedContextType | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) { setSavedIds([]); return; }
    getSavedPropertyIds(user.uid).then(setSavedIds);
  }, [user]);

  async function toggleSave(listingId: string) {
    if (!user) return;
    if (savedIds.includes(listingId)) {
      await unsaveProperty(user.uid, listingId);
      setSavedIds(prev => prev.filter(id => id !== listingId));
    } else {
      await saveProperty(user.uid, listingId);
      setSavedIds(prev => [...prev, listingId]);
    }
  }

  function isSaved(id: string) { return savedIds.includes(id); }

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used within SavedProvider');
  return ctx;
}
