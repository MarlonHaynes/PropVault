import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, TrendingUp, Shield, Clock, Star, ChevronRight, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listings/ListingCard';
import { AgentCard } from '@/components/agents/AgentCard';
import { SectionHeader } from '@/components/ui/Display';
import { getFeaturedListings } from '@/utils';
import { agents } from '@/data/agents';
import { stats, testimonials, cities } from '@/data';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'PropVault — Premium GTA Real Estate' };

const featured = getFeaturedListings(6);
const featuredAgents = agents.filter(a => a.featured).slice(0, 4);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

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
              </div>
            ))}
          </div>
        </div>

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
              </div>
            </Link>
          ))}
        </div>
      </section>

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
          <div className="text-center mt-8 sm:hidden">
            <Link href="/listings?sort=featured" className="inline-flex items-center gap-2 text-sm text-brand-gold">
              View All Featured <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

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
            </div>
          ))}
        </div>
      </section>

      {/* ── Agents ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader label="Our Team" title="Top GTA Agents" subtitle="Work with experienced professionals who know every corner of the market." />
            <Link href="/agents" className="hidden sm:flex items-center gap-2 text-sm text-brand-gold hover:gap-3 transition-all">
              All Agents <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredAgents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
          </div>
        </div>
      </section>

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
        </div>
      </section>

      <Footer />
    </div>
  );
}
