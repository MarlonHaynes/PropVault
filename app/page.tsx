<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD
<<<<<<< HEAD
import { Search, MapPin, TrendingUp, Shield, Clock, Star, ChevronRight, ArrowRight, Award, CheckCircle, Building2, Users, Home, Zap, Globe } from 'lucide-react';
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { Search, MapPin, TrendingUp, Shield, Clock, Star, ChevronRight, ArrowRight, Award, CheckCircle, Building2 } from 'lucide-react';
=======
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, TrendingUp, Shield, Clock, Star, ChevronRight, ArrowRight } from 'lucide-react';
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listings/ListingCard';
import { AgentCard } from '@/components/agents/AgentCard';
import { SectionHeader } from '@/components/ui/Display';
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { useListingsContext } from '@/context/ListingsContext';
import { agents } from '@/data/agents';
import { stats, testimonials, cities } from '@/data';

const featuredAgents = agents.filter(a => a.featured).slice(0, 4);

const companyStats = [
<<<<<<< HEAD
<<<<<<< HEAD
  { value: '$3.2B+',  label: 'Total Sales Volume',  icon: TrendingUp },
  { value: '12,400+', label: 'Families Served',      icon: Users },
  { value: '14 yrs',  label: 'In Business',          icon: Award },
  { value: '97%',     label: 'Client Satisfaction',  icon: Star },
];

const whyUs = [
  { icon: Search,       title: 'AI-Powered Search',        desc: 'Our property matching engine learns your preferences and surfaces listings you\'ll love — before others even see them.' },
  { icon: Shield,       title: 'Fully Licensed & Insured',  desc: 'RECO-registered. Fully insured. Every PropVault agent carries E&O insurance and meets our rigorous vetting standards.' },
  { icon: TrendingUp,   title: 'Real-Time Market Data',    desc: 'TRREB data updated daily. Price trend charts, neighbourhood heat maps, and sale-to-list analytics at your fingertips.' },
  { icon: Clock,        title: '2-Hour Response Guarantee', desc: 'Any inquiry submitted to a PropVault agent is guaranteed a response within 2 business hours — or your next commission is discounted.' },
  { icon: CheckCircle,  title: 'End-to-End Support',        desc: 'From first search to closing day: mortgage referrals, home inspection coordination, legal introductions, and post-sale check-ins.' },
  { icon: Globe,        title: 'Global Buyer Network',      desc: 'Access to pre-qualified international buyers across 40+ countries through our partner network — maximising your sale price.' },
];

const propertyTypes = [
  { label: 'Condos',      icon: Building2, query: 'Condo',     image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop' },
  { label: 'Houses',      icon: Home,      query: 'House',     image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop' },
  { label: 'Townhouses',  icon: Building2, query: 'Townhouse', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop' },
  { label: 'Penthouses',  icon: Star,      query: 'Penthouse', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop' },
];

const quickSearchTags = [
  { label: 'Luxury Condos', q: 'Condo', t: 'sale' },
  { label: 'Family Homes',  q: 'House', t: 'sale' },
  { label: 'Oakville Estates', q: 'Oakville', t: '' },
  { label: 'New Developments', q: '', t: 'new-development' },
  { label: 'Rentals Under $3K', q: '', t: 'rent' },
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  { value: '$3.2B+',  label: 'Total Sales Volume' },
  { value: '12,400+', label: 'Families Served' },
  { value: '4.9★',    label: 'Client Rating' },
  { value: '97%',     label: 'On-Time Rate' },
];

const whyUs = [
  { icon: Search,       title: 'Advanced Property Search',   desc: 'Filter by 15+ criteria. Find exactly what you\'re looking for — by city, neighbourhood, type, price, sqft, and lifestyle features.' },
  { icon: Shield,       title: 'Verified Listings',          desc: 'Every property is independently verified by our team and updated in real time. No duplicates, no surprises.' },
  { icon: TrendingUp,   title: 'Market Intelligence',        desc: 'Get neighbourhood-level pricing trends, days-on-market averages, and sale-to-list ratios to make informed decisions.' },
  { icon: Clock,        title: '24/7 Agent Access',          desc: 'Our agents respond within 2 hours, 7 days a week. Schedule viewings, submit inquiries, and track your search any time.' },
  { icon: Award,        title: 'Award-Winning Service',      desc: 'TRREB Top Brokerage 2022 & 2023. Recognized by Toronto Life, RECO, and the Globe & Mail for excellence in client service.' },
  { icon: CheckCircle,  title: 'End-to-End Support',         desc: 'From first search to closing day — mortgage guidance, legal referrals, home inspection coordination, and post-sale support.' },
];

const processSteps = [
  { num: '01', title: 'Browse & Save',         desc: 'Search 30+ curated GTA listings. Save your favourites and set up alerts for new properties matching your criteria.' },
  { num: '02', title: 'Connect with an Agent', desc: 'Submit an inquiry in 30 seconds. Your dedicated agent responds within 2 hours with market insights and availability.' },
  { num: '03', title: 'Tour Properties',       desc: 'Schedule private in-person viewings or 3D virtual tours on your schedule, any day of the week.' },
  { num: '04', title: 'Close with Confidence', desc: 'Your agent negotiates on your behalf. We coordinate inspections, legal, and mortgage referrals so nothing falls through the cracks.' },
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
];

export default function HomePage() {
  const router = useRouter();
  const { listings, loading } = useListingsContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('');

  const featured = listings.filter(l => l.featured && l.propertyStatus === 'available').slice(0, 6);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('keyword', searchQuery);
    if (searchType) params.set('listingType', searchType);
    router.push(`/listings?${params.toString()}`);
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import { getFeaturedListings } from '@/utils';
import { agents } from '@/data/agents';
import { stats, testimonials, cities } from '@/data';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'PropVault — Premium GTA Real Estate' };

const featured = getFeaturedListings(6);
const featuredAgents = agents.filter(a => a.featured).slice(0, 4);

export default function HomePage() {
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

<<<<<<< HEAD
<<<<<<< HEAD
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
=======
<<<<<<< HEAD
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
            alt="Toronto skyline hero"
            fill className="object-cover" priority unoptimized
          />
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/55 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/25 mb-8">
              <Award className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-brand-gold text-xs tracking-widest uppercase font-medium">TRREB Top Brokerage 2022 & 2023</span>
            </div>

            {/* Headline */}
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              Southern Ontario's<br />
              <span className="text-brand-gold italic">Premier Real Estate</span><br />
              Platform
            </h1>

            <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">
              14 years. $3.2B in sales. 12,400 families served across the GTA.
              Buy, sell, or rent with the most trusted independent brokerage in Ontario.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-2xl p-3 shadow-2xl max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-2 bg-slate-800/80 rounded-xl px-4 h-12">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="City, neighbourhood, address, MLS #..."
                    className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 text-sm focus:outline-none"
                  />
                </div>
                <select
                  value={searchType}
                  onChange={e => setSearchType(e.target.value)}
                  className="h-12 px-4 bg-slate-800/80 rounded-xl text-sm text-slate-300 focus:outline-none border-0 cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="new-development">New Dev</option>
                </select>
                <button type="submit"
                  className="h-12 px-6 rounded-xl bg-brand-gold text-slate-900 font-semibold text-sm flex items-center gap-2 hover:bg-amber-400 transition-colors whitespace-nowrap">
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-700/50">
                {quickSearchTags.map(tag => (
                  <button key={tag.label} type="button"
                    onClick={() => { setSearchQuery(tag.q); setSearchType(tag.t); router.push(`/listings?keyword=${tag.q}&listingType=${tag.t}`); }}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-700/60 text-slate-400 hover:bg-brand-gold/20 hover:text-brand-gold transition-all border border-slate-600/50 hover:border-brand-gold/30">
                    {tag.label}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Floating stats */}
          <div className="mt-16 flex flex-wrap gap-6 max-w-2xl">
            {companyStats.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white leading-none">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
                </div>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/65 to-brand-dark" />
          {/* Subtle grain overlay */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/70 border border-slate-700/80 backdrop-blur-sm mb-8">
            <div className="flex -space-x-1.5">
              {['photo-1573496359142-b8d87734a5a2','photo-1560250097-0b93528c311a','photo-1551836022-d5d88e9218df'].map((id, i) => (
                <div key={i} className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-slate-800">
                  <Image src={`https://images.unsplash.com/${id}?w=50&h=50&fit=crop&face`} alt="agent" fill className="object-cover" unoptimized />
                </div>
              ))}
            </div>
            <span className="text-slate-300 text-xs">Trusted by <strong className="text-white">12,400+</strong> GTA families since 2010</span>
          </div>

          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
            Southern Ontario's<br />
            <span className="text-brand-gold italic">Premier Real Estate</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Buy, sell, or rent across Toronto, Mississauga, Oakville, Vaughan, and beyond.
            Expert agents. Verified listings. Real results.
          </p>

          {/* Functional search bar */}
          <form onSubmit={handleSearch} className="bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 max-w-3xl mx-auto shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1 flex items-center gap-2 bg-slate-800/80 rounded-xl px-4 h-12 border border-slate-700/50">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="City, neighbourhood, or address..."
                  className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 text-sm focus:outline-none"
                />
              </div>
              <select
                value={searchType}
                onChange={e => setSearchType(e.target.value)}
                className="h-12 px-4 bg-slate-800/80 border border-slate-700/50 rounded-xl text-sm text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="">Any Type</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="new-development">New Development</option>
              </select>
              <button type="submit" className="h-12 px-7 rounded-xl bg-brand-gold text-slate-900 font-semibold text-sm flex items-center gap-2 hover:bg-amber-400 transition-colors whitespace-nowrap shadow-lg">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2.5 px-1">
              {[
                { label: 'Toronto Condos', q: 'Toronto', t: 'sale' },
                { label: 'Oakville Estates', q: 'Oakville', t: '' },
                { label: 'Vaughan New Dev', q: 'Vaughan', t: 'new-development' },
                { label: 'Port Credit', q: 'Port Credit', t: '' },
              ].map(tag => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => { setSearchQuery(tag.q); setSearchType(tag.t); router.push(`/listings?keyword=${tag.q}${tag.t ? `&listingType=${tag.t}` : ''}`); }}
                  className="text-xs px-3 py-1 rounded-full bg-slate-700/60 text-slate-400 hover:bg-brand-gold/20 hover:text-brand-gold transition-all border border-slate-700/40"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </form>

          {/* Company stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-14">
            {companyStats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-playfair text-3xl font-bold text-brand-gold">{s.value}</div>
                <div className="text-xs text-slate-400 mt-0.5 tracking-wide">{s.label}</div>
=======
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" alt="Hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-brand-dark" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-brand-gold text-xs tracking-widest uppercase">100+ Premium GTA Properties</span>
          </div>

          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Find Your Perfect<br />
            <span className="text-brand-gold italic">Home in the GTA</span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse luxury condos, detached homes, and new developments across Toronto,
            Mississauga, Oakville, Vaughan, and beyond.
          </p>

          {/* Quick search */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-4 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 bg-slate-800 rounded-xl px-4 h-12">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <input type="text" placeholder="City, neighborhood, or address..." className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 text-sm focus:outline-none" />
              </div>
              <select className="h-12 px-4 bg-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none border-none">
                <option value="">Any Type</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="new-development">New Dev</option>
              </select>
              <Link href="/listings"
                className="h-12 px-6 rounded-xl bg-brand-gold text-slate-900 font-semibold text-sm flex items-center gap-2 hover:bg-amber-400 transition-colors whitespace-nowrap">
                <Search className="w-4 h-4" /> Search
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Toronto Condos', 'Oakville Detached', 'Vaughan New Dev', 'Mississauga Townhouses'].map(tag => (
                <Link key={tag} href={`/listings?keyword=${tag}`}
                  className="text-xs px-3 py-1 rounded-full bg-slate-700/60 text-slate-400 hover:bg-brand-gold/20 hover:text-brand-gold transition-all">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {stats.slice(0, 4).map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-brand-gold font-playfair">{s.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              </div>
            ))}
          </div>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
      </section>

      {/* ── PROPERTY TYPES ───────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader label="Browse by Type" title="Find Your Fit" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {propertyTypes.map(pt => (
            <Link key={pt.label} href={`/listings?propertyType=${pt.query}`}
              className="group relative aspect-[3/2] rounded-2xl overflow-hidden">
              <Image src={pt.image} alt={pt.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-playfair text-lg font-bold text-white group-hover:text-brand-gold transition-colors">{pt.label}</h3>
                <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                  Browse listings <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </p>
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <div className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-brand-gold animate-bounce" />
          </div>
          <span className="text-[10px] text-slate-600 tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ── CITIES ────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Service Areas" title="We Cover the Entire GTA"
          subtitle="From downtown Toronto condos to Oakville estates — our agents know every street, every neighbourhood, every hidden gem." center />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {cities.map(city => (
            <Link key={city.name} href={`/listings?city=${city.name}`}
              className="group relative aspect-[3/2] rounded-2xl overflow-hidden">
              <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold/40 rounded-2xl transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-playfair text-lg font-bold text-white">{city.name}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{city.listingCount} properties</p>
=======
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500">
          <div className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-brand-gold animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Cities ────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Explore" title="Browse by City" subtitle="Discover properties across the Greater Toronto Area's most sought-after communities." center />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {cities.map(city => (
            <Link key={city.name} href={`/listings?city=${city.name}`}
              className="group relative aspect-[3/2] rounded-xl overflow-hidden">
              <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-playfair text-lg font-bold text-white">{city.name}</h3>
                <p className="text-xs text-slate-300">{city.listingCount} properties</p>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              </div>
            </Link>
          ))}
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
      {/* ── CITIES ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="GTA Coverage" title="15 Cities, One Platform" center
            subtitle="From the heart of Toronto to the shores of Oakville — PropVault covers every corner of the Greater Toronto Area." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {cities.map(city => (
              <Link key={city.name} href={`/listings?city=${city.name}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-playfair text-base font-bold text-white group-hover:text-brand-gold transition-colors">{city.name}</h3>
                  <p className="text-xs text-slate-400">{city.listingCount} properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader label="Featured Properties" title="Handpicked Excellence"
              subtitle="Our agents' most compelling listings across the GTA right now." />
            <Link href="/listings?sort=featured"
              className="hidden sm:flex items-center gap-2 text-sm text-brand-gold hover:text-amber-400 transition-colors whitespace-nowrap">
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {/* ── FEATURED LISTINGS ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader label="Featured Properties" title="Handpicked Excellence"
              subtitle="Our agents' most coveted listings across the GTA's finest addresses." />
            <Link href="/listings?sort=featured" className="hidden sm:flex items-center gap-2 text-sm text-brand-gold hover:text-amber-400 transition-colors whitespace-nowrap">
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
<<<<<<< HEAD
<<<<<<< HEAD
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-slate-800/50 animate-pulse" />
=======
              {Array.from({length:6}).map((_,i) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700 rounded-xl aspect-[4/3] animate-pulse" />
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
              {Array.from({length:6}).map((_,i) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700 rounded-xl aspect-[4/3] animate-pulse" />
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
<<<<<<< HEAD
<<<<<<< HEAD
              {featured.map(listing => <ListingCard key={listing.id} listing={listing} />)}
            </div>
          )}
          <div className="text-center mt-8 sm:hidden">
            <Link href="/listings?sort=featured"
              className="inline-flex items-center gap-2 text-sm text-brand-gold">
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              {featured.slice(0,6).map(listing => <ListingCard key={listing.id} listing={listing} />)}
            </div>
          )}
=======
      {/* ── Featured Listings ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader label="Featured" title="Premium Properties" subtitle="Handpicked listings across the GTA's most prestigious addresses." />
            <Link href="/listings?sort=featured" className="hidden sm:flex items-center gap-2 text-sm text-brand-gold hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(listing => <ListingCard key={listing.id} listing={listing} />)}
          </div>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
          <div className="text-center mt-8 sm:hidden">
            <Link href="/listings?sort=featured" className="inline-flex items-center gap-2 text-sm text-brand-gold">
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              View All Featured <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
      {/* ── WHY PROPVAULT ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="The PropVault Difference" title="Why 12,400 Families Chose Us" center
            subtitle="We built PropVault to be the brokerage we always wished existed — transparent, data-driven, and fiercely client-first." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {whyUs.map((item, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-brand-gold/40 transition-all duration-300">
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Our Process" title="Finding Your Home, Simplified" center
          subtitle="We've guided 12,400+ families through this process. Here's how it works." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {processSteps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="p-6 bg-slate-800/40 border border-slate-700 rounded-2xl hover:border-brand-gold/30 transition-all h-full">
                <div className="font-playfair text-5xl font-bold text-brand-gold/20 group-hover:text-brand-gold/30 transition-colors mb-4 leading-none">
                  {step.num}
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
              {i < processSteps.length - 1 && (
                <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-700 z-10" />
              )}
=======
      {/* ── Why PropVault ─────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Why Us" title="The PropVault Advantage" center subtitle="Built for the modern GTA buyer and investor — powerful tools, local expertise." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { icon: Search, title: 'Advanced Search', desc: 'Filter by 15+ criteria including neighbourhood, amenities, and commute proximity.' },
            { icon: Shield, title: 'Verified Listings', desc: 'Every property is verified by our team and updated in real-time.' },
            { icon: TrendingUp, title: 'Market Intelligence', desc: 'Data-driven insights and price trends for every neighbourhood.' },
            { icon: Clock, title: 'Always Available', desc: 'Schedule viewings, send inquiries, and track your saved properties 24/7.' },
          ].map((item, i) => (
            <div key={i} className="group p-6 rounded-xl bg-slate-800/40 border border-slate-700 hover:border-brand-gold/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors">
                <item.icon className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
            </div>
          ))}
        </div>
      </section>

<<<<<<< HEAD
      {/* ── WHY US ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="The PropVault Advantage" title="Why 12,400+ Families Choose Us" center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {whyUs.map((item, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-brand-gold/40 hover:bg-slate-800/60 transition-all">
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors">
                  <item.icon className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
<<<<<<< HEAD
<<<<<<< HEAD
          </div>
        </div>
      </section>

      {/* ── AGENTS ────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader label="Meet the Team" title="Top GTA Agents"
              subtitle="Averaging 11 years of GTA experience each. Our agents don't just sell properties — they build relationships." />
            <Link href="/agents" className="hidden sm:flex items-center gap-2 text-sm text-brand-gold hover:text-amber-400 transition-colors whitespace-nowrap">
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      {/* ── Agents ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader label="Our Team" title="Top GTA Agents" subtitle="Work with experienced professionals who know every corner of the market." />
            <Link href="/agents" className="hidden sm:flex items-center gap-2 text-sm text-brand-gold hover:gap-3 transition-all">
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              All Agents <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredAgents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          </div>
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800">
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {/* ── AGENTS ────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader label="Meet the Team" title="GTA's Top Agents"
            subtitle="48 experienced agents. 14 years of GTA expertise. Deep local knowledge in every market we serve." />
          <Link href="/agents" className="hidden sm:flex items-center gap-2 text-sm text-brand-gold hover:text-amber-400 transition-colors">
            All Agents <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredAgents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50">
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Client Stories" title="What Our Clients Say" center />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
<<<<<<< HEAD
<<<<<<< HEAD
                <p className="text-sm text-slate-300 leading-relaxed mb-5 flex-1 italic">&ldquo;{t.text}&rdquo;</p>
=======
                <p className="text-sm text-slate-300 leading-relaxed mb-5 italic flex-1">&ldquo;{t.text}&rdquo;</p>
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
                <p className="text-sm text-slate-300 leading-relaxed mb-5 italic flex-1">&ldquo;{t.text}&rdquo;</p>
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
                <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <span className="text-brand-gold font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
        </div>
      </section>

      {/* ── AWARDS STRIP ──────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs text-slate-600 uppercase tracking-widest mb-6">Recognised by</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['TRREB', 'RECO', 'Toronto Life', 'Globe & Mail', 'BNN Bloomberg', 'Zoocasa'].map(name => (
              <span key={name} className="text-slate-500 font-semibold text-sm tracking-wide hover:text-slate-300 transition-colors cursor-default">{name}</span>
            ))}
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

          {/* Press logos */}
          <div className="mt-16 pt-12 border-t border-slate-800">
            <p className="text-center text-xs text-slate-600 uppercase tracking-widest mb-8">As Seen In</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {['Globe & Mail', 'Toronto Star', 'Toronto Life', 'BNN Bloomberg', 'TRREB'].map(name => (
                <span key={name} className="text-slate-600 font-semibold text-sm tracking-wide hover:text-slate-400 transition-colors">{name}</span>
              ))}
            </div>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          </div>
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-brand-dark to-brand-dark" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #c8a97e 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs tracking-widest uppercase mb-6">
            <Zap className="w-3 h-3" /> Get Started Today
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Find Your<br /><span className="text-brand-gold italic">Perfect Property?</span>
          </h2>
          <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
            Join over 12,400 GTA families who found their home with PropVault.
            Start your search today — it's free, with no commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings"
              className="inline-flex items-center justify-center gap-2 h-13 px-10 rounded-xl bg-brand-gold text-slate-900 font-bold text-base hover:bg-amber-400 transition-all shadow-lg shadow-brand-gold/20"
              style={{ height: '52px' }}>
              <Search className="w-5 h-5" /> Browse 30 Properties
            </Link>
            <Link href="/agents"
              className="inline-flex items-center justify-center gap-2 h-13 px-10 rounded-xl border border-slate-600 text-slate-200 font-medium text-base hover:border-brand-gold hover:text-brand-gold transition-all"
              style={{ height: '52px' }}>
              Find an Agent <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" alt="CTA background" fill className="object-cover opacity-10" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-slate-900 to-brand-dark" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs tracking-widest uppercase mb-6">
            <Building2 className="w-3.5 h-3.5" /> GTA's Most Trusted Brokerage
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Find Your <span className="text-brand-gold italic">Dream Home?</span>
          </h2>
          <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto">
            Join 12,400+ GTA families who found their perfect property with PropVault.
            Our agents respond within 2 hours, every day of the week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings" className="inline-flex items-center justify-center gap-2 h-13 px-8 py-3.5 rounded-xl bg-brand-gold text-slate-900 font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-brand-gold/20 text-base">
              <Search className="w-5 h-5" /> Browse All Listings
            </Link>
            <Link href="/agents" className="inline-flex items-center justify-center gap-2 h-13 px-8 py-3.5 rounded-xl border border-slate-600 text-slate-200 font-medium hover:border-brand-gold hover:text-brand-gold transition-all text-base">
              Find an Agent <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-slate-600 text-xs mt-8">No obligation. No pressure. Just expert guidance.</p>
=======
      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Reviews" title="What Our Clients Say" center />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={i} className="p-6 rounded-xl bg-slate-800/40 border border-slate-700">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <span className="text-brand-gold font-bold text-sm">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role} · {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-slate-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Find Your <span className="text-brand-gold italic">Dream Home?</span>
          </h2>
          <p className="text-slate-400 mb-8 text-lg">Join thousands of GTA buyers who found their perfect property with PropVault.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-brand-gold text-slate-900 font-semibold hover:bg-amber-400 transition-colors">
              <Search className="w-4 h-4" /> Browse Listings
            </Link>
            <Link href="/agents"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-slate-600 text-slate-200 font-medium hover:border-brand-gold hover:text-brand-gold transition-all">
              Find an Agent <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        </div>
      </section>

      <Footer />
    </div>
  );
}
