'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useScrolled } from '@/hooks';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { cn } from '@/utils';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { href: '/listings', label: 'Listings' },
  { href: '/agents', label: 'Agents' },
  { href: '/map-search', label: 'Map Search' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const scrolled = useScrolled(20);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { savedIds } = useSaved();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isHome = pathname === '/';

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
      scrolled || !isHome
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-xl'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm font-mono">PV</span>
            </div>
            <span className="font-playfair text-xl font-bold text-white group-hover:text-brand-gold transition-colors">
              PropVault
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href} href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  pathname.startsWith(link.href)
                    ? 'text-brand-gold bg-brand-gold/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/saved" className="relative p-2 text-slate-300 hover:text-brand-gold transition-colors">
              <Heart className="w-5 h-5" />
              {savedIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-gold text-slate-900 text-[10px] font-bold flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-brand-gold transition-colors group"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                  <span className="text-sm text-slate-200 group-hover:text-white">
                    {user.displayName?.split(' ')[0] || 'Account'}
                  </span>
                  <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform', userMenuOpen && 'rotate-180')} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link href="/saved" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                      <Heart className="w-4 h-4" /> Saved ({savedIds.length})
                    </Link>
                    <div className="border-t border-slate-700" />
                    <button onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-slate-800 transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button variant="gold" size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-700 px-4 py-4">
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  pathname.startsWith(link.href) ? 'text-brand-gold bg-brand-gold/10' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                )}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-700">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" fullWidth size="sm">Dashboard</Button>
                </Link>
                <Button variant="ghost" size="sm" fullWidth onClick={() => { logout(); setMobileOpen(false); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" fullWidth size="sm">Sign In</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button variant="gold" fullWidth size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
