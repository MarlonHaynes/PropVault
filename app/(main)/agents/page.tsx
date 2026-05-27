import type { Metadata } from 'next';
<<<<<<< HEAD
import Link from 'next/link';
import Image from 'next/image';
=======
<<<<<<< HEAD
<<<<<<< HEAD
import Link from 'next/link';
import Image from 'next/image';
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AgentCard } from '@/components/agents/AgentCard';
import { SectionHeader } from '@/components/ui/Display';
import { agents } from '@/data/agents';
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { agentPerformance } from '@/data/sales-history';
import { Star, Award, TrendingUp, Phone } from 'lucide-react';
import { formatPrice } from '@/utils';

export const metadata: Metadata = {
  title: 'Our Agents — PropVault GTA Real Estate',
  description: '48 expert GTA real estate agents with proven track records. Find your perfect match.',
};

const featured = agents.filter(a => a.featured);
const rest = agents.filter(a => !a.featured);

const specialtyGroups = [
  { label: 'Luxury & Prestige',   agents: ['agent-001', 'agent-003'] },
  { label: 'Investment & Growth', agents: ['agent-002', 'agent-008'] },
  { label: 'Family Homes',        agents: ['agent-004', 'agent-009'] },
  { label: 'New Developments',    agents: ['agent-005', 'agent-010'] },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-slate-900 to-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs tracking-widest text-brand-gold uppercase">Our Team</span>
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            48 Expert GTA Agents
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Combined experience of 500+ years. $3.2B in closed transactions.
            Every agent specialises in their market — so you get a true local expert.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { label: 'Avg Years Experience', value: '11 yrs' },
              { label: 'Combined Sales Volume', value: '$3.2B+' },
              { label: 'Client Satisfaction', value: '4.9 ★' },
              { label: 'Avg Response Time', value: '< 2 hrs' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-playfair text-2xl font-bold text-brand-gold">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top performers */}
      <section className="py-12 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-5 h-5 text-brand-gold" />
            <h2 className="font-semibold text-white">2024 Top Performers</h2>
            <span className="text-xs text-slate-500">YTD by sales volume</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agentPerformance.slice(0, 4).map((perf, i) => {
              const agent = agents.find(a => a.id === perf.id);
              if (!agent) return null;
              return (
                <Link key={perf.id} href={`/agents/${perf.id}`}
                  className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-brand-gold/40 transition-all group">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image src={agent.photo} alt={agent.name} width={48} height={48} className="object-cover" unoptimized />
                    </div>
                    {i === 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center">
                        <span className="text-slate-900 text-[9px] font-bold">★</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white group-hover:text-brand-gold transition-colors truncate">{agent.name.split(' ')[0]} {agent.name.split(' ')[1]}</p>
                    <p className="text-xs text-brand-gold font-medium">{formatPrice(perf.volume, true)} volume</p>
                    <p className="text-[10px] text-slate-500">{perf.sales} sales · {perf.avgDOM}d avg</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured agents */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Star className="w-4 h-4 text-brand-gold" />
          <h2 className="font-playfair text-2xl font-bold text-white">Featured Agents</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {featured.map(a => <AgentCard key={a.id} agent={a} />)}
        </div>

        <h2 className="font-playfair text-2xl font-bold text-white mb-8">All Agents</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {rest.map(a => <AgentCard key={a.id} agent={a} />)}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-white mb-3">Are You a GTA Real Estate Professional?</h2>
          <p className="text-slate-400 mb-6">We're always looking for exceptional agents who share our commitment to client excellence. Join PropVault and access our platform, marketing resources, and client network.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 h-11 px-8 rounded-xl bg-brand-gold text-slate-900 font-semibold hover:bg-amber-400 transition-colors">
            <Phone className="w-4 h-4" /> Speak with Our Recruiting Team
          </Link>
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======

export const metadata: Metadata = { title: 'Our Agents' };

export default function AgentsPage() {
  const featured = agents.filter(a => a.featured);
  const others = agents.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionHeader label="Our Team" title="GTA's Top Real Estate Experts" center
              subtitle="Our agents combine deep local knowledge with proven results to guide you through every step of your real estate journey." />
          </div>

          {/* Featured */}
          <h2 className="font-playfair text-xl font-semibold text-white mb-6">Featured Agents</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
            {featured.map(a => <AgentCard key={a.id} agent={a} />)}
          </div>

          {/* All Agents */}
          <h2 className="font-playfair text-xl font-semibold text-white mb-6">All Agents</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {others.map(a => <AgentCard key={a.id} agent={a} />)}
          </div>
        </div>
      </main>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      <Footer />
    </div>
  );
}
