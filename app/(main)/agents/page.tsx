import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AgentCard } from '@/components/agents/AgentCard';
import { SectionHeader } from '@/components/ui/Display';
import { agents } from '@/data/agents';

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
      <Footer />
    </div>
  );
}
