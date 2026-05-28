'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, MapPin, TrendingUp, Shield, Clock, Star, ChevronRight, ArrowRight, Award, CheckCircle, Building2, Users, Home, Zap, Globe } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listings/ListingCard';
import { AgentCard } from '@/components/agents/AgentCard';
import { SectionHeader } from '@/components/ui/Display';
import { useListingsContext } from '@/context/ListingsContext';
import { agents } from '@/data/agents';
import { testimonials, cities } from '@/data';

const featuredAgents = agents.filter(a => a.featured).slice(0, 4);

const companyStats = [
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
];

const processSteps = [
  { num: '01', title: 'Browse & Save',         desc: 'Search 30+ curated GTA listings. Save your favourites and set up alerts for new properties matching your criteria.' },
  { num: '02', title: 'Connect with an Agent', desc: 'Submit an inquiry in 30 seconds. Your dedicated agent responds within 2 hours with market insights and availability.' },
  { num: '03', title: 'Tour Properties',       desc: 'Schedule private in-person viewings or 3D virtual tours on your schedule, any day of the week.' },
  { num: '04', title: 'Close with Confidence', desc: 'Your agent negotiates on your behalf. We coordinate inspections, legal, and mortgage referrals so nothing falls through the cracks.' },
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

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
            alt="Toronto skyline hero"
            fill className="object-cover" priority unoptimized
          />
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
              </div>
            ))}
          </div>
        </div>
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
              </div>
            </Link>
          ))}
        </div>
      </section>

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
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-slate-800/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(listing => <ListingCard key={listing.id} listing={listing} />)}
            </div>
          )}
          <div className="text-center mt-8 sm:hidden">
            <Link href="/listings?sort=featured"
              className="inline-flex items-center gap-2 text-sm text-brand-gold">
              View All Featured <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY PROPVAULT ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="The PropVault Difference" title="Why 12,400 Families Chose Us" center
            subtitle="We built PropVault to be the brokerage we always wished existed — transparent, data-driven, and fiercely client-first." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {whyUs.map((item, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-brand-gold/40 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors">
                  <item.icon className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            </div>
          ))}
        </div>
      </section>

      {/* ── AGENTS ────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader label="Meet the Team" title="Top GTA Agents"
              subtitle="Averaging 11 years of GTA experience each. Our agents don't just sell properties — they build relationships." />
            <Link href="/agents" className="hidden sm:flex items-center gap-2 text-sm text-brand-gold hover:text-amber-400 transition-colors whitespace-nowrap">
              All Agents <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredAgents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800">
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
                <p className="text-sm text-slate-300 leading-relaxed mb-5 flex-1 italic">&ldquo;{t.text}&rdquo;</p>
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
          </div>
        </div>
      </section>

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
              className="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl bg-brand-gold text-slate-900 font-bold text-base hover:bg-amber-400 transition-all shadow-lg shadow-brand-gold/20">
              <Search className="w-5 h-5" /> Browse Properties
            </Link>
            <Link href="/agents"
              className="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl border border-slate-600 text-slate-200 font-medium text-base hover:border-brand-gold hover:text-brand-gold transition-all">
              Find an Agent <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
