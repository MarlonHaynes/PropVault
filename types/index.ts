export type PropertyStatus = "available" | "pending" | "sold" | "rented";
export type ListingType = "sale" | "rent" | "new-development";
export type PropertyType =
  | "House"
  | "Condo"
  | "Townhouse"
  | "Apartment"
  | "Loft"
  | "Penthouse"
  | "Villa"
  | "Commercial";

export interface NearbyPlace {
  name: string;
  type: "school" | "transit" | "shopping" | "restaurant" | "park" | "hospital";
  distance: string;
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  originalPrice?: number;
  address: string;
  city: string;
  provinceState: string;
  postalCode: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize?: number;
  yearBuilt: number;
  parkingSpaces: number;
  hoaFees?: number;
  propertyStatus: PropertyStatus;
  featured: boolean;
  newListing: boolean;
  openHouse: boolean;
  images: string[];
  thumbnail: string;
  description: string;
  longDescription: string;
  features: string[];
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  agentId: string;
  virtualTourUrl?: string;
  floorPlanUrl?: string;
  energyRating?: string;
  petFriendly: boolean;
  furnished: boolean;
  tags: string[];
  createdAt: string;
  rating?: number;
  reviewCount?: number;
  mlsNumber?: string;
  newDevelopment?: boolean;
  walkScore?: number;
  transitScore?: number;
  bikeScore?: number;
  garage?: boolean;
  garageSpaces?: number;
}

export interface Agent {
  id: string;
  name: string;
  photo: string;
  title: string;
  bio: string;
  shortBio: string;
  email: string;
  phone: string;
  specialties: string[];
  languages: string[];
  citiesServed: string[];
  cities: string[];
  yearsExperience: number;
  activeListings: number;
  soldCount: number;
  totalSales: number;
  rating: number;
  reviewCount: number;
  licenseNumber: string;
  brokerage: string;
  featured: boolean;
  social?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  phone?: string;
  preferredCity?: string;
  budgetMin?: number;
  budgetMax?: number;
  userType?: "buyer" | "renter" | "investor";
  createdAt: string;
  avatar?: string;
}

export interface Inquiry {
  id: string;
  userId?: string;
  listingId: string;
  listingTitle: string;
  listingSlug: string;
  agentId: string;
  agentName: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: "viewing" | "info" | "question" | "consultation" | "agent";
  preferredDate?: string;
  message: string;
  financingStatus: "pre-approved" | "not-started" | "cash-buyer" | "in-progress";
  status: "new" | "contacted" | "viewing-scheduled" | "closed";
  createdAt: string;
}

export interface SavedProperty {
  id: string;
  userId: string;
  listingId: string;
  savedAt: string;
}

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  filters: FilterState;
  createdAt: string;
}

export interface FilterState {
  keyword: string;
  city: string;
  neighborhood: string;
  propertyType: PropertyType[];
  listingType: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minSqft?: number;
  maxSqft?: number;
  furnished: boolean;
  petFriendly: boolean;
  parking?: number;
  sort: SortOption;
}

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "sqft-desc"
  | "bedrooms-desc"
  | "featured";

export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  amortization: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  loanAmount: number;
  totalPayment: number;
  totalInterest: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  listingType: ListingType;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  province: string;
  image: string;
  listingCount: number;
  description: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  image: string;
  avgPrice: number;
  listingCount: number;
  description: string;
  highlights: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  authorAvatar: string;
  category: string;
  readTime: number;
  publishedAt: string;
}
