/**
 * Simple localStorage store — replaces Firebase entirely.
 * All data persists in the browser. Works offline, zero config.
 */

import { seedListings } from '@/data/listings';
import type { Listing } from '@/types';

// ── LISTINGS ──────────────────────────────────────────────────────────────────

export function getListings(): Listing[] {
  if (typeof window === 'undefined') return seedListings;
  try {
    const raw = localStorage.getItem('propvault_listings');
    if (!raw) return seedListings;
    const stored = JSON.parse(raw) as Listing[];
    const storedIds = new Set(stored.map((l: Listing) => l.id));
    return [...stored, ...seedListings.filter(l => !storedIds.has(l.id))];
  } catch { return seedListings; }
}

export function getListing(id: string): Listing | null {
  return getListings().find(l => l.id === id) ?? null;
}

export function saveListing(listing: Listing): void {
  const all = getListings();
  const idx = all.findIndex(l => l.id === listing.id);
  if (idx >= 0) all[idx] = listing;
  else all.unshift(listing);
  localStorage.setItem('propvault_listings', JSON.stringify(all));
}

export function deleteListing(id: string): void {
  const all = getListings().filter(l => l.id !== id);
  localStorage.setItem('propvault_listings', JSON.stringify(all));
}

export function resetListings(): void {
  localStorage.removeItem('propvault_listings');
}

// ── INQUIRIES ─────────────────────────────────────────────────────────────────

export interface StoredInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  listingId: string;
  listingTitle: string;
  inquiryType: string;
  message: string;
  status: 'new' | 'contacted' | 'viewing-scheduled' | 'closed';
  createdAt: string;
}

export function getInquiries(): StoredInquiry[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem('propvault_inquiries') || '[]'); }
  catch { return []; }
}

export function saveInquiry(inq: Omit<StoredInquiry, 'id' | 'createdAt'>): string {
  const id = `inq-${Date.now()}`;
  const all = getInquiries();
  all.unshift({ ...inq, id, createdAt: new Date().toISOString() });
  localStorage.setItem('propvault_inquiries', JSON.stringify(all));
  return id;
}

export function updateInquiryStatus(id: string, status: StoredInquiry['status']): void {
  const all = getInquiries().map(i => i.id === id ? { ...i, status } : i);
  localStorage.setItem('propvault_inquiries', JSON.stringify(all));
}

// ── GENERATE ID ───────────────────────────────────────────────────────────────
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
