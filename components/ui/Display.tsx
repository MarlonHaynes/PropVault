import { ReactNode, Fragment } from 'react';
import { cn, formatPrice } from '@/utils';
import type { PropertyStatus } from '@/types';
import { SearchX, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

// ── StatusBadge ──────────────────────────────────────────────────────────────
const statusStyles: Record<PropertyStatus, string> = {
  available: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  pending: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  sold: 'bg-red-500/20 text-red-400 border border-red-500/30',
  rented: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
};

const statusLabels: Record<PropertyStatus, string> = {
  available: 'Available',
  pending: 'Pending',
  sold: 'Sold',
  rented: 'Rented',
};

export function StatusBadge({ status, className }: { status: PropertyStatus; className?: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusStyles[status], className)}>
      {statusLabels[status]}
    </span>
  );
}

// ── PriceDisplay ─────────────────────────────────────────────────────────────
export function PriceDisplay({
  price,
  listingType,
  original,
  className,
}: {
  price: number;
  listingType: string;
  original?: number;
  className?: string;
}) {
  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className="text-brand-gold font-bold">
        {formatPrice(price)}
        {listingType === 'rent' && (
          <span className="text-sm font-normal text-slate-400">/mo</span>
        )}
      </span>
      {original && original > price && (
        <span className="text-sm text-slate-500 line-through">
          {formatPrice(original)}
        </span>
      )}
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
export function SectionHeader({
  label,
  title,
  subtitle,
  center = false,
  light = false,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={cn(center && 'text-center')}>
      {label && (
        <span className={cn('text-xs tracking-widest uppercase font-medium', light ? 'text-brand-teal' : 'text-brand-gold')}>
          {label}
        </span>
      )}
      <h2 className={cn('font-playfair text-3xl lg:text-4xl font-bold mt-1', light ? 'text-slate-900' : 'text-white')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-base max-w-2xl', center && 'mx-auto', light ? 'text-slate-600' : 'text-slate-400')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── LoadingSpinner ────────────────────────────────────────────────────────────
export function LoadingSpinner({ className }: { className?: string }) {
  return <Loader2 className={cn('animate-spin text-brand-gold', className)} />;
}

// ── EmptyState ────────────────────────────────────────────────────────────────
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-slate-400 text-sm max-w-xs mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)
  );

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-700 text-slate-400 hover:border-brand-gold hover:text-brand-gold disabled:opacity-30 transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {visible.map((p, i) => {
        const prev = visible[i - 1];
        return (
          <Fragment key={p}>
            {prev && p - prev > 1 && (
              <span className="text-slate-600 px-1">…</span>
            )}
            <button
              onClick={() => onChange(p)}
              className={cn(
                'w-8 h-8 rounded-lg text-sm font-medium transition-all',
                p === page
                  ? 'bg-brand-gold text-slate-900'
                  : 'border border-slate-700 text-slate-400 hover:border-brand-gold hover:text-brand-gold'
              )}
            >
              {p}
            </button>
          </Fragment>
        );
      })}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-700 text-slate-400 hover:border-brand-gold hover:text-brand-gold disabled:opacity-30 transition-all"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
