import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-brand-dark text-white hover:bg-slate-700 border border-transparent',
  secondary: 'bg-brand-surface text-slate-200 hover:bg-slate-600 border border-slate-600',
  ghost: 'text-slate-300 hover:bg-white/10 border border-transparent',
  outline: 'border border-slate-600 text-slate-200 hover:border-brand-gold hover:text-brand-gold',
  gold: 'bg-brand-gold text-slate-900 hover:bg-amber-400 border border-transparent font-semibold',
  danger: 'bg-red-600 text-white hover:bg-red-700 border border-transparent',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
);
Button.displayName = 'Button';
