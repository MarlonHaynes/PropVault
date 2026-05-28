import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Listing, MortgageInput, MortgageResult } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_PROPERTY_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop';

export const DEFAULT_AGENT_PHOTO =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop';

export function getListingCoverImage(listing: {
  images?: string[];
  thumbnail?: string;
}): string {
  const url = listing.thumbnail || listing.images?.find(Boolean);
  return url || DEFAULT_PROPERTY_IMAGE;
}

export function formatPrice(price: number, compact = false): string {
  if (compact) {
    if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(1)}M`;
    if (price >= 1_000)     return `$${(price / 1_000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-CA', {
    style: 'currency', currency: 'CAD', maximumFractionDigits: 0,
  }).format(price);
}

export function formatAddress(address: string, city: string, province: string, postal: string) {
  return `${address}, ${city}, ${province} ${postal}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[—–]/g, '-')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getListingSlug(listing: { id: string; slug?: string; title: string }): string {
  if (listing.slug) return listing.slug;
  const numericId = listing.id.replace(/[^0-9]/g, '') || listing.id.slice(-3);
  return slugify(listing.title) + '-' + numericId;
}

export function calculateMortgage({ homePrice, downPayment, interestRate, amortizationYears }: MortgageInput): MortgageResult {
  const principal = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const payments = amortizationYears * 12;
  const monthly = monthlyRate === 0
    ? principal / payments
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
  return {
    monthlyPayment: monthly,
    loanAmount:     principal,
    totalPayment:   monthly * payments,
    totalInterest:  monthly * payments - principal,
  };
}

export function getFeaturedListings(listings: Listing[], limit = 6): Listing[] {
  return listings.filter(l => l.featured && l.propertyStatus === 'available').slice(0, limit);
}

export function getRelatedListings(listing: Listing, all: Listing[], limit = 3): Listing[] {
  return all
    .filter(l => l.id !== listing.id && l.city === listing.city && l.propertyType === listing.propertyType)
    .slice(0, limit);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(date));
}

export function mapFirebaseError(code: string): string {
  const map: Record<string, string> = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
  };
  return map[code] || 'An unexpected error occurred.';
}
