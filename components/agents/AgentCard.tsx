<<<<<<< HEAD
<<<<<<< HEAD

import Image from 'next/image';
import Link from 'next/link';
import { Star, Phone, Mail, Award } from 'lucide-react';
import { DEFAULT_AGENT_PHOTO } from '@/utils';
=======
import Image from 'next/image';
import Link from 'next/link';
import { Star, Phone, Mail, Award } from 'lucide-react';
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import Image from 'next/image';
import Link from 'next/link';
import { Star, Phone, Mail, Award } from 'lucide-react';
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import type { Agent } from '@/types';

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="group bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-brand-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/5">
      <div className="p-6 text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
<<<<<<< HEAD
<<<<<<< HEAD
          <Image src={agent.photo || DEFAULT_AGENT_PHOTO} alt={agent.name} fill className="object-cover rounded-full" unoptimized />
=======
          <Image src={agent.photo} alt={agent.name} fill className="object-cover rounded-full" />
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
          <Image src={agent.photo} alt={agent.name} fill className="object-cover rounded-full" />
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          {agent.featured && (
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center">
              <Award className="w-3.5 h-3.5 text-slate-900" />
            </div>
          )}
        </div>
        <Link href={`/agents/${agent.id}`} className="group/link">
          <h3 className="font-semibold text-white group-hover/link:text-brand-gold transition-colors">{agent.name}</h3>
        </Link>
        <p className="text-xs text-brand-gold mt-0.5">{agent.title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{agent.brokerage}</p>

        <div className="flex items-center justify-center gap-1 mt-3">
          <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
          <span className="text-sm font-medium text-white">{agent.rating}</span>
          <span className="text-xs text-slate-400">({agent.reviewCount})</span>
        </div>

        <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-sm font-bold text-brand-gold">{agent.activeListings}</div>
            <div className="text-[10px] text-slate-500">Active</div>
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <div className="text-center">
            <div className="text-sm font-bold text-white">{agent.totalSales}</div>
            <div className="text-[10px] text-slate-500">Total Sales</div>
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <div className="text-center">
            <div className="text-sm font-bold text-white">{agent.yearsExperience}y</div>
            <div className="text-[10px] text-slate-500">Exp</div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <a href={`tel:${agent.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border border-slate-600 text-xs text-slate-300 hover:border-brand-gold hover:text-brand-gold transition-all">
            <Phone className="w-3 h-3" /> Call
          </a>
          <a href={`mailto:${agent.email}`}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border border-slate-600 text-xs text-slate-300 hover:border-brand-gold hover:text-brand-gold transition-all">
            <Mail className="w-3 h-3" /> Email
          </a>
        </div>
      </div>
    </div>
  );
}
