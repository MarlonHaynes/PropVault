import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/ui/Display';
import { AgentCard } from '@/components/agents/AgentCard';
import { agents } from '@/data/agents';
import { stats } from '@/data';
import { Target, Heart, Zap } from 'lucide-react';

export const metadata: Metadata = { title: 'About Us' };

export default function AboutPage() {
  const featured = agents.filter(a => a.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

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
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-playfair text-4xl font-bold text-brand-gold">{s.value}</div>
                <div className="text-sm text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            </div>
          ))}
        </div>
      </section>

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
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-playfair text-4xl font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-slate-400 mb-8">Whether you&apos;re a first-time buyer or seasoned investor, we have the right agent and the right property for you.</p>
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
