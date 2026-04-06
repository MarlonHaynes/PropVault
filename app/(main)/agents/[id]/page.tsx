import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Phone, Mail, MapPin, Award, Globe, ChevronLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listings/ListingCard';
import { agents } from '@/data/agents';
import { listings } from '@/data/listings';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const agent = agents.find(a => a.id === params.id);
  return agent ? { title: agent.name } : { title: 'Agent Not Found' };
}

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const agent = agents.find(a => a.id === params.id);
  if (!agent) notFound();

  const agentListings = listings.filter(l => l.agentId === agent.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/agents" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> Back to Agents
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image src={agent.photo} alt={agent.name} fill className="object-cover rounded-full" />
                  {agent.featured && (
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-gold flex items-center justify-center">
                      <Award className="w-4 h-4 text-slate-900" />
                    </div>
                  )}
                </div>
                <h1 className="font-playfair text-2xl font-bold text-white">{agent.name}</h1>
                <p className="text-brand-gold text-sm mt-1">{agent.title}</p>
                <p className="text-slate-500 text-sm">{agent.brokerage}</p>

                <div className="flex items-center justify-center gap-1 mt-3">
                  <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  <span className="font-semibold text-white">{agent.rating}</span>
                  <span className="text-sm text-slate-400">({agent.reviewCount} reviews)</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-700">
                  <div>
                    <div className="text-xl font-bold text-brand-gold">{agent.activeListings}</div>
                    <div className="text-xs text-slate-500">Active</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{agent.totalSales}</div>
                    <div className="text-xs text-slate-500">Sales</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{agent.yearsExperience}y</div>
                    <div className="text-xs text-slate-500">Exp</div>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors justify-center">
                    <Phone className="w-4 h-4" /> {agent.phone}
                  </a>
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors justify-center">
                    <Mail className="w-4 h-4" /> {agent.email}
                  </a>
                  <div className="flex items-center gap-2 text-sm text-slate-400 justify-center">
                    <MapPin className="w-4 h-4" /> {agent.cities.slice(0, 2).join(', ')}
                  </div>
                  {agent.languages && (
                    <div className="flex items-center gap-2 text-sm text-slate-400 justify-center">
                      <Globe className="w-4 h-4" /> {agent.languages.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detail */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-playfair text-xl font-semibold text-white mb-3">About {agent.name}</h2>
                <p className="text-slate-400 leading-relaxed">{agent.bio}</p>
              </div>

              {agent.specialties?.length && (
                <div>
                  <h2 className="font-playfair text-xl font-semibold text-white mb-3">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map(s => (
                      <span key={s} className="px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-sm text-brand-gold">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {agentListings.length > 0 && (
                <div>
                  <h2 className="font-playfair text-xl font-semibold text-white mb-5">{agent.name.split(' ')[0]}&apos;s Listings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {agentListings.map(l => <ListingCard key={l.id} listing={l} />)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
