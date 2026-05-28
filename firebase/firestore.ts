import {
  doc, setDoc, getDoc, updateDoc, collection,
  addDoc, getDocs, query, where, deleteDoc,
  serverTimestamp, orderBy, onSnapshot,
  Unsubscribe, DocumentData, QuerySnapshot,
  writeBatch,
} from 'firebase/firestore';
import { db, isDemoMode } from './config';
import type { Listing, UserProfile, Inquiry, SavedSearch } from '@/types';
import { seedListings } from '@/data/listings';

// ── localStorage helpers ─────────────────────────────────────────────────────
function ls<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
}
function lsSet(key: string, value: unknown) {
  if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
}

// ── LISTINGS (Live from Firestore) ────────────────────────────────────────────

/** Subscribe to all listings in real time */
export function subscribeToListings(
  callback: (listings: Listing[]) => void
): Unsubscribe {
  if (isDemoMode) {
    const stored = ls<Listing[]>('propvault_listings', seedListings);
    callback(stored);
    return () => {};
  }
  const q = query(collection(db!, 'listings'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap: QuerySnapshot<DocumentData>) => {
    const listings = snap.docs.map(d => ({ id: d.id, ...d.data() }) as Listing);
    callback(listings);
  });
}

/** Get single listing by ID */
export async function getListing(id: string): Promise<Listing | null> {
  if (isDemoMode) {
    const list = ls<Listing[]>('propvault_listings', seedListings);
    return list.find(l => l.id === id) ?? null;
  }
  const snap = await getDoc(doc(db!, 'listings', id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Listing) : null;
}

/** Get all listings (one-time) */
export async function getAllListings(): Promise<Listing[]> {
  if (isDemoMode) return ls<Listing[]>('propvault_listings', seedListings);
  const snap = await getDocs(query(collection(db!, 'listings'), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Listing);
}

/** Create a new listing */
export async function createListing(data: Omit<Listing, 'id' | 'createdAt'>): Promise<string> {
  if (isDemoMode) {
    const id = `lst-demo-${Date.now()}`;
    const list = ls<Listing[]>('propvault_listings', seedListings);
    list.unshift({ ...data, id, createdAt: new Date().toISOString() } as Listing);
    lsSet('propvault_listings', list);
    return id;
  }
  const ref = await addDoc(collection(db!, 'listings'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update an existing listing */
export async function updateListing(id: string, data: Partial<Listing>): Promise<void> {
  if (isDemoMode) {
    const list = ls<Listing[]>('propvault_listings', seedListings);
    const idx = list.findIndex(l => l.id === id);
    if (idx !== -1) list[idx] = { ...list[idx], ...data };
    lsSet('propvault_listings', list);
    return;
  }
  await updateDoc(doc(db!, 'listings', id), { ...data, updatedAt: serverTimestamp() });
}

/** Delete a listing */
export async function deleteListing(id: string): Promise<void> {
  if (isDemoMode) {
    const list = ls<Listing[]>('propvault_listings', seedListings).filter(l => l.id !== id);
    lsSet('propvault_listings', list);
    return;
  }
  await deleteDoc(doc(db!, 'listings', id));
}

/** Seed Firestore with initial listings (run once from admin panel) */
export async function seedFirestoreListings(): Promise<void> {
  if (isDemoMode) {
    lsSet('propvault_listings', seedListings);
    return;
  }
  const batch = writeBatch(db!);
  seedListings.forEach(listing => {
    const { id, ...rest } = listing;
    const ref = doc(collection(db!, 'listings'), id);
    batch.set(ref, { ...rest, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  });
  await batch.commit();
}

// ── USER PROFILE ─────────────────────────────────────────────────────────────
export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
  if (isDemoMode) { lsSet(`propvault_profile_${uid}`, { uid, ...data, createdAt: new Date().toISOString() }); return; }
  await setDoc(doc(db!, 'users', uid), { uid, ...data, createdAt: serverTimestamp() }, { merge: true });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (isDemoMode) return ls(`propvault_profile_${uid}`, null);
  const snap = await getDoc(doc(db!, 'users', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  if (isDemoMode) {
    const cur = ls<Partial<UserProfile>>(`propvault_profile_${uid}`, {});
    lsSet(`propvault_profile_${uid}`, { ...cur, ...data });
    return;
  }
  await updateDoc(doc(db!, 'users', uid), data);
}

// ── INQUIRIES ────────────────────────────────────────────────────────────────
export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<string> {
  if (isDemoMode) {
    const id = `inq-${Date.now()}`;
    const list = ls<Inquiry[]>('propvault_inquiries', []);
    list.unshift({ ...inquiry, id, createdAt: new Date().toISOString() });
    lsSet('propvault_inquiries', list);
    return id;
  }
  const ref = await addDoc(collection(db!, 'inquiries'), { ...inquiry, createdAt: serverTimestamp() });
  return ref.id;
}

export async function getUserInquiries(uid: string): Promise<Inquiry[]> {
  if (isDemoMode) return ls<Inquiry[]>('propvault_inquiries', []).filter(i => i.userId === uid);
  const q = query(collection(db!, 'inquiries'), where('userId', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Inquiry);
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  if (isDemoMode) return ls<Inquiry[]>('propvault_inquiries', []);
  const snap = await getDocs(query(collection(db!, 'inquiries'), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Inquiry);
}

// ── SAVED PROPERTIES ─────────────────────────────────────────────────────────
export async function saveProperty(uid: string, listingId: string): Promise<void> {
  if (isDemoMode) {
    const list = ls<string[]>(`propvault_saved_${uid}`, []);
    if (!list.includes(listingId)) { list.push(listingId); lsSet(`propvault_saved_${uid}`, list); }
    return;
  }
  await setDoc(doc(db!, 'savedProperties', `${uid}_${listingId}`), { uid, listingId, savedAt: serverTimestamp() });
}

export async function unsaveProperty(uid: string, listingId: string): Promise<void> {
  if (isDemoMode) {
    lsSet(`propvault_saved_${uid}`, ls<string[]>(`propvault_saved_${uid}`, []).filter(id => id !== listingId));
    return;
  }
  await deleteDoc(doc(db!, 'savedProperties', `${uid}_${listingId}`));
}

export async function getSavedPropertyIds(uid: string): Promise<string[]> {
  if (isDemoMode) return ls<string[]>(`propvault_saved_${uid}`, []);
  const q = query(collection(db!, 'savedProperties'), where('uid', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data().listingId as string);
}

// ── SAVED SEARCHES ────────────────────────────────────────────────────────────
export async function saveSavedSearch(uid: string, search: Omit<SavedSearch, 'id' | 'createdAt'>): Promise<void> {
  if (isDemoMode) {
    const id = `ss-${Date.now()}`;
    const list = ls<SavedSearch[]>(`propvault_searches_${uid}`, []);
    list.unshift({ ...search, id, createdAt: new Date().toISOString() });
    lsSet(`propvault_searches_${uid}`, list);
    return;
  }
  await addDoc(collection(db!, 'savedSearches'), { ...search, uid, createdAt: serverTimestamp() });
}

export async function getSavedSearches(uid: string): Promise<SavedSearch[]> {
  if (isDemoMode) return ls<SavedSearch[]>(`propvault_searches_${uid}`, []);
  const q = query(collection(db!, 'savedSearches'), where('uid', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as SavedSearch);
}

export async function deleteSavedSearch(id: string): Promise<void> {
  if (isDemoMode) return;
  await deleteDoc(doc(db!, 'savedSearches', id));
}
