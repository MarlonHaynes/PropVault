'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils';

interface AccordionItem { question: string; answer: string; }

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-slate-700">
      {items.map((item, i) => (
        <div key={i} className="py-4">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left gap-4 group"
          >
            <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{item.question}</span>
            <ChevronDown className={cn('w-4 h-4 text-brand-gold shrink-0 transition-transform duration-300', open === i && 'rotate-180')} />
          </button>
          <div className={cn('overflow-hidden transition-all duration-300', open === i ? 'max-h-96 mt-3' : 'max-h-0')}>
            <p className="text-sm text-slate-400 leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
