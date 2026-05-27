'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
<<<<<<< HEAD
<<<<<<< HEAD

interface SavedContextType {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { saveProperty, unsaveProperty, getSavedPropertyIds } from '@/firebase/firestore';

interface SavedContextType {
  savedIds: string[];
  toggleSave: (listingId: string) => Promise<void>;
  isSaved: (listingId: string) => boolean;
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
}

const SavedContext = createContext<SavedContextType | null>(null);

<<<<<<< HEAD
<<<<<<< HEAD
function getKey(uid: string) { return `propvault_saved_${uid}`; }

=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
export function SavedProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) { setSavedIds([]); return; }
<<<<<<< HEAD
<<<<<<< HEAD
    try {
      const raw = localStorage.getItem(getKey(user.uid));
      setSavedIds(raw ? JSON.parse(raw) : []);
    } catch { setSavedIds([]); }
  }, [user]);

  function toggleSave(id: string) {
    if (!user) return;
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem(getKey(user.uid), JSON.stringify(next));
      return next;
    });
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
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
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
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
