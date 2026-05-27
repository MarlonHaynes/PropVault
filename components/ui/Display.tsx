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

<<<<<<< HEAD
<<<<<<< HEAD
export function StatusBadge({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        statusStyles[status],
        className
      )}
    >
=======
export function StatusBadge({ status, className }: { status: PropertyStatus; className?: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusStyles[status], className)}>
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
export function StatusBadge({ status, className }: { status: PropertyStatus; className?: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusStyles[status], className)}>
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {statusLabels[status]}
    </span>
  );
}

// ── PriceDisplay ─────────────────────────────────────────────────────────────
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
export function PriceDisplay({ price, listingType, original, className }: {
  price: number; listingType: string; original?: number; className?: string;
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
}) {
  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className="text-brand-gold font-bold">
        {formatPrice(price)}
<<<<<<< HEAD
<<<<<<< HEAD
        {listingType === 'rent' && (
          <span className="text-sm font-normal text-slate-400">/mo</span>
        )}
      </span>
      {original && original > price && (
        <span className="text-sm text-slate-500 line-through">
          {formatPrice(original)}
        </span>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        {listingType === 'rent' && <span className="text-sm font-normal text-slate-400">/mo</span>}
      </span>
      {original && original > price && (
        <span className="text-sm text-slate-500 line-through">{formatPrice(original)}</span>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      )}
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
export function SectionHeader({ label, title, subtitle, center = false, light = false }: {
  label?: string; title: string; subtitle?: string; center?: boolean; light?: boolean;
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
}) {
  return (
    <div className={cn(center && 'text-center')}>
      {label && (
<<<<<<< HEAD
<<<<<<< HEAD
        <span
          className={cn(
            'text-xs tracking-widest uppercase font-medium',
            light ? 'text-brand-teal' : 'text-brand-gold'
          )}
        >
          {label}
        </span>
      )}

=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        <span className={cn('text-xs tracking-widest uppercase font-medium', light ? 'text-brand-teal' : 'text-brand-gold')}>
          {label}
        </span>
      )}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      <h2
        className={cn(
          'font-playfair text-3xl lg:text-4xl font-bold mt-1',
          light ? 'text-slate-900' : 'text-white'
        )}
      >
<<<<<<< HEAD
<<<<<<< HEAD
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'mt-3 text-base max-w-2xl',
            center && 'mx-auto',
            light ? 'text-slate-600' : 'text-slate-400'
          )}
        >
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      <h2 className={cn(
        'font-playfair text-3xl lg:text-4xl font-bold mt-1',
        light ? 'text-slate-900' : 'text-white'
      )}>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-base max-w-2xl', center && 'mx-auto', light ? 'text-slate-600' : 'text-slate-400')}>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
export function EmptyState({ title, description, action }: {
  title: string; description?: string; action?: ReactNode;
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7 text-slate-400" />
      </div>
<<<<<<< HEAD
<<<<<<< HEAD

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

      {description && (
        <p className="text-slate-400 text-sm max-w-xs mb-6">{description}</p>
      )}

=======
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-slate-400 text-sm max-w-xs mb-6">{description}</p>}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-slate-400 text-sm max-w-xs mb-6">{description}</p>}
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {action}
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
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
<<<<<<< HEAD
<<<<<<< HEAD
  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)
  );
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  const visible = pages.filter((p) => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1));
=======
export function Pagination({ page, totalPages, onChange }: {
  page: number; totalPages: number; onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter(p => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1));
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      <button
<<<<<<< HEAD
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
=======
<<<<<<< HEAD
<<<<<<< HEAD
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
=======
        onClick={() => onChange(page - 1)} disabled={page === 1}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
        onClick={() => onChange(page - 1)} disabled={page === 1}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-700 text-slate-400 hover:border-brand-gold hover:text-brand-gold disabled:opacity-30 transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

      {visible.map((p, i) => {
        const prev = visible[i - 1];

<<<<<<< HEAD
<<<<<<< HEAD
        return (
          <Fragment key={p}>
            {prev && p - prev > 1 && (
              <span className="text-slate-600 px-1">…</span>
            )}

=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      {visible.map((p, i) => {
        const prev = visible[i - 1];
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
        return (
          <Fragment key={p}>
            {prev && p - prev > 1 && <span className="text-slate-600 px-1">…</span>}
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
            <button
              onClick={() => onChange(p)}
              className={cn(
                'w-8 h-8 rounded-lg text-sm font-medium transition-all',
<<<<<<< HEAD
                p === page
                  ? 'bg-brand-gold text-slate-900'
                  : 'border border-slate-700 text-slate-400 hover:border-brand-gold hover:text-brand-gold'
=======
<<<<<<< HEAD
<<<<<<< HEAD
                p === page
                  ? 'bg-brand-gold text-slate-900'
                  : 'border border-slate-700 text-slate-400 hover:border-brand-gold hover:text-brand-gold'
=======
                p === page ? 'bg-brand-gold text-slate-900' : 'border border-slate-700 text-slate-400 hover:border-brand-gold hover:text-brand-gold'
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
                p === page ? 'bg-brand-gold text-slate-900' : 'border border-slate-700 text-slate-400 hover:border-brand-gold hover:text-brand-gold'
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              )}
            >
              {p}
            </button>
          </Fragment>
        );
      })}
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
      <button
        onClick={() => onChange(page + 1)} disabled={page === totalPages}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-700 text-slate-400 hover:border-brand-gold hover:text-brand-gold disabled:opacity-30 transition-all"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
<<<<<<< HEAD
}
=======
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
