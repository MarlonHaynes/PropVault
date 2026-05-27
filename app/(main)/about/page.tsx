import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/ui/Display';
import { AgentCard } from '@/components/agents/AgentCard';
import { agents } from '@/data/agents';
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { Award, Shield, TrendingUp, Users, Home, Star, CheckCircle, MapPin, Globe } from 'lucide-react';

export const metadata: Metadata = { title: 'About PropVault — GTA\'s Premier Real Estate Platform' };

const timeline = [
  { year: '2010', title: 'Founded in Toronto', desc: 'PropVault was founded by Alexandra Whitmore and Marcus Chen with a vision to modernize GTA real estate. Started with 2 agents and a single office in King West.' },
  { year: '2012', title: 'Expanded to Mississauga & Oakville', desc: 'Added 6 new agents and opened a second office in Port Credit to serve the booming Mississauga market.' },
  { year: '2015', title: 'First $1 Billion Milestone', desc: 'Surpassed $1B in total sales volume. Named one of Toronto Life\'s top boutique real estate firms. Team grew to 18 agents.' },
  { year: '2018', title: 'Digital Transformation', desc: 'Launched PropVault\'s proprietary digital platform — the first GTA firm to offer real-time listing analytics, virtual tours, and AI-powered property matching.' },
  { year: '2020', title: 'GTA-Wide Expansion', desc: 'Expanded coverage to all 7 GTA municipalities. 48 agents. Maintained service through the pandemic with fully virtual offerings.' },
  { year: '2022', title: 'TRREB Awards — Top Brokerage', desc: 'Received TRREB Top Producing Brokerage Award. Average days-on-market dropped to 14 days — 8 below GTA average.' },
  { year: '2024', title: '$3.2B Sold & Counting', desc: 'Today PropVault is trusted by over 12,400 GTA families. 48 agents. 15+ cities. 97% on-time move rate. Still independently owned.' },
];

const awards = [
  { org: 'TRREB',         title: 'Top Producing Brokerage',          year: '2022, 2023' },
  { org: 'Toronto Life',  title: 'Best Boutique Real Estate Firm',    year: '2021, 2022' },
  { org: 'Real Estate Magazine', title: 'Fastest Growing Brokerage', year: '2019' },
  { org: 'RECO',          title: 'Excellence in Client Service',      year: '2020, 2023' },
  { org: 'Zoocasa',       title: 'Top GTA Brokerage Rating',          year: '2024' },
  { org: 'Globe & Mail',  title: 'Canada\'s Top Real Estate Brands',  year: '2023' },
];

const press = [
  { outlet: 'Globe & Mail',  quote: 'PropVault has fundamentally changed how GTA buyers and sellers experience real estate.', date: 'March 2024' },
  { outlet: 'Toronto Star',  quote: 'The most client-focused brokerage operating in the GTA today.', date: 'Jan 2024' },
  { outlet: 'Toronto Life',  quote: 'If you\'re buying or selling in Toronto, PropVault should be your first call.', date: 'Nov 2023' },
  { outlet: 'BNN Bloomberg', quote: 'A data-driven approach that is setting the standard for Canadian real estate.', date: 'Sep 2023' },
];

const values = [
  { icon: Shield,     title: 'Integrity First',      desc: 'We never compromise on honesty. Every piece of advice we give is in your best interest — not ours.' },
  { icon: TrendingUp, title: 'Data-Driven',           desc: 'Every recommendation is backed by real market data, neighbourhood analytics, and 14 years of GTA-specific experience.' },
  { icon: Users,      title: 'Community Rooted',      desc: 'We live and work in the communities we serve. Our agents aren\'t just advisors — they\'re your neighbours.' },
  { icon: Globe,      title: 'Globally Connected',    desc: 'Part of an international network giving our clients access to buyers and sellers across 40+ countries.' },
  { icon: CheckCircle,'title': 'Relentlessly Reliable', desc: '97% on-time move rate, same-day inquiry response, and a dedicated client success team available 7 days a week.' },
  { icon: Star,       title: 'Award-Winning',         desc: 'Recognized by TRREB, RECO, Toronto Life, and the Globe & Mail for excellence in service and innovation.' },
];

const stats = [
  { value: '$3.2B+',  label: 'Total Sales Volume' },
  { value: '12,400+', label: 'Families Served' },
  { value: '14 yrs',  label: 'In Business' },
  { value: '97%',     label: 'Client Satisfaction' },
  { value: '48',      label: 'Expert Agents' },
  { value: '15+',     label: 'GTA Cities' },
];
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import { stats } from '@/data';
import { Target, Heart, Zap } from 'lucide-react';

export const metadata: Metadata = { title: 'About Us' };
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

export default function AboutPage() {
  const featured = agents.filter(a => a.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80" alt="Toronto skyline" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/80 to-brand-dark" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs tracking-widest uppercase mb-6">
            <Star className="w-3 h-3" /> Established 2010 · Toronto, Ontario
          </span>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            The GTA's Most Trusted<br /><span className="text-brand-gold italic">Real Estate Partner</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            For 14 years, PropVault has guided over 12,400 families through one of life's biggest decisions — buying,
            selling, or renting in the Greater Toronto Area. We combine deep local expertise with cutting-edge technology
            to deliver results that exceed expectations, every time.
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80" alt="About" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 to-brand-dark" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs tracking-widest text-brand-gold uppercase mb-4 block">Our Story</span>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white mb-6">
            Reimagining Real Estate<br /><span className="text-brand-gold italic">Across the GTA</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            PropVault was built with one belief: finding your home should be inspiring, not overwhelming.
            We combine local expertise, cutting-edge tools, and human connection to make that possible.
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          </p>
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {/* ── STATS BAR ───────────────────────────────────────────────────── */}
      <section className="border-y border-slate-800 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 lg:grid-cols-6 divide-x divide-slate-800">
            {stats.map((s, i) => (
              <div key={i} className="py-8 text-center px-4">
                <div className="font-playfair text-3xl font-bold text-brand-gold">{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      {/* Stats */}
      <section className="py-12 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-playfair text-4xl font-bold text-brand-gold">{s.value}</div>
                <div className="text-sm text-slate-400 mt-1">{s.label}</div>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              </div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {/* ── OUR STORY ────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader label="Our Story" title="Built on Trust, Driven by Results" />
            <div className="mt-6 space-y-4 text-slate-400 leading-relaxed">
              <p>PropVault was born from a simple frustration: buying a home in the GTA was unnecessarily stressful, opaque, and impersonal. In 2010, Alexandra Whitmore and Marcus Chen set out to change that — not by growing as fast as possible, but by being extraordinarily good at serving each client.</p>
              <p>Today we are one of the GTA's most respected independent brokerages. We've never been acquired. We've never franchised. We've stayed independent because it lets us put clients first — always. Our 48 agents are among the most experienced in their respective markets, averaging 11 years of GTA-specific experience each.</p>
              <p>We were the first GTA brokerage to offer AI-powered property matching, virtual-first showings, and real-time market dashboards — and we continue to invest in technology that saves our clients time and money.</p>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" alt="PropVault office" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">TRREB Award Winner</p>
                  <p className="text-xs text-slate-400">Top GTA Brokerage 2022 & 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader label="Company History" title="14 Years of Excellence" center />
          <div className="mt-12 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-700 hidden md:block" />
            {timeline.map((item, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Content */}
                <div className="flex-1 md:text-right md:pr-10">
                  {i % 2 === 0 ? (
                    <>
                      <span className="inline-block text-xs font-bold text-brand-gold tracking-widest uppercase mb-2">{item.year}</span>
                      <h3 className="font-playfair text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </>
                  ) : <div />}
                </div>
                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1 w-4 h-4 rounded-full bg-brand-gold border-4 border-brand-dark z-10" />
                {/* Right content */}
                <div className="flex-1 md:pl-10">
                  {i % 2 !== 0 ? (
                    <>
                      <span className="inline-block text-xs font-bold text-brand-gold tracking-widest uppercase mb-2">{item.year}</span>
                      <h3 className="font-playfair text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </>
                  ) : <div />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Our Values" title="What We Stand For" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {values.map((v, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-brand-gold/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors">
                <v.icon className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-playfair text-lg font-bold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      {/* Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Our Values" title="What Drives Us" center />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            { icon: Target, title: 'Results-First', desc: 'Every decision we make is oriented toward your outcome — whether you\'re buying, selling, or investing in GTA real estate.' },
            { icon: Heart, title: 'Client-Obsessed', desc: 'Our agents build relationships that last beyond a single transaction. Your success is our reputation.' },
            { icon: Zap, title: 'Innovation-Led', desc: 'We leverage the latest technology — from AI-powered search to real-time market analytics — so you stay ahead.' },
          ].map((v, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700 text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-5">
                <v.icon className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-white mb-3">{v.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
            </div>
          ))}
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {/* ── AWARDS ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Recognition" title="Award-Winning Excellence" center />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {awards.map((a, i) => (
              <div key={i} className="p-5 bg-slate-800/40 border border-slate-700 rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs text-brand-gold font-semibold">{a.org}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{a.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{a.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS ────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="In the Press" title="What They're Saying" center />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          {press.map((p, i) => (
            <div key={i} className="p-6 bg-slate-800/40 border border-slate-700 rounded-xl">
              <p className="text-xl text-slate-600 mb-3 font-playfair leading-none">"</p>
              <p className="text-slate-300 leading-relaxed text-sm italic mb-4">{p.quote}</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-white text-sm">{p.outlet}</p>
                <p className="text-xs text-slate-500">{p.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Leadership Team" title="Meet the Agents" center />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {featured.map(a => <AgentCard key={a.id} agent={a} />)}
          </div>
          <div className="text-center mt-8">
            <Link href="/agents" className="inline-flex items-center gap-2 h-10 px-8 rounded-xl border border-slate-600 text-slate-200 font-medium hover:border-brand-gold hover:text-brand-gold transition-all text-sm">
              Meet All 48 Agents →
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      {/* Team */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Meet the Team" title="Our Top Agents" center />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {featured.map(a => <AgentCard key={a.id} agent={a} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/agents" className="inline-flex items-center gap-2 text-sm text-brand-gold hover:gap-3 transition-all">
              View All Agents →
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
            </Link>
          </div>
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-playfair text-4xl font-bold text-white mb-4">Ready to Work With Us?</h2>
        <p className="text-slate-400 mb-8 text-lg">Join the 12,400+ GTA families who found their perfect home with PropVault.</p>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      {/* CTA */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-playfair text-4xl font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-slate-400 mb-8">Whether you&apos;re a first-time buyer or seasoned investor, we have the right agent and the right property for you.</p>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/listings" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-brand-gold text-slate-900 font-semibold hover:bg-amber-400 transition-colors">
            Browse Listings
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl border border-slate-600 text-slate-200 font-medium hover:border-brand-gold hover:text-brand-gold transition-all">
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
