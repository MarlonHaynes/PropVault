import {
  doc, setDoc, getDoc, updateDoc, collection,
  addDoc, getDocs, query, where, deleteDoc, serverTimestamp,
} from 'firebase/firestore';
import { db, isDemoMode } from './config';
import type { UserProfile, Inquiry, SavedProperty, SavedSearch } from '@/types';

// ── Local mock storage helpers ──────────────────────────────────────────────
function ls<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
}
function lsSet(key: string, value: unknown) {
  if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
}

// ── User Profile ─────────────────────────────────────────────────────────────
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

// ── Inquiries ────────────────────────────────────────────────────────────────
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

// ── Saved Properties ─────────────────────────────────────────────────────────
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
    const list = ls<string[]>(`propvault_saved_${uid}`, []).filter(id => id !== listingId);
    lsSet(`propvault_saved_${uid}`, list);
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

// ── Saved Searches ───────────────────────────────────────────────────────────
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
