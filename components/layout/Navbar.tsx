'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, ChevronDown, LogOut, LayoutDashboard, Building2 } from 'lucide-react';
import { useScrolled } from '@/hooks';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { cn } from '@/utils';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { href: '/listings',   label: 'Listings' },
  { href: '/agents',     label: 'Agents' },
  { href: '/map-search', label: 'Map Search' },
  { href: '/about',      label: 'About' },
  { href: '/contact',    label: 'Contact' },
];

export function Navbar() {
  const scrolled = useScrolled(20);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { savedIds } = useSaved();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
      isTransparent
        ? 'bg-transparent'
        : 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-2xl shadow-black/20'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center shadow-lg shadow-brand-gold/30">
              <span className="text-slate-900 font-bold text-xs font-mono tracking-tight">PV</span>
            </div>
            <div>
              <span className="font-playfair text-xl font-bold text-white group-hover:text-brand-gold transition-colors">
                PropVault
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  pathname.startsWith(link.href)
                    ? 'text-brand-gold bg-brand-gold/10'
                    : isTransparent
                      ? 'text-slate-200 hover:text-white hover:bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                )}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Saved count */}
            <Link href="/dashboard/saved" className="relative p-2 text-slate-300 hover:text-brand-gold transition-colors rounded-lg hover:bg-white/5">
              <Heart className="w-5 h-5" />
              {savedIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-gold text-slate-900 text-[9px] font-bold flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-brand-gold transition-all group">
                  <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <span className="text-brand-gold font-bold text-xs">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-slate-200 group-hover:text-white">
                    {user.displayName?.split(' ')[0] || 'Account'}
                  </span>
                  <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform duration-200', userMenuOpen && 'rotate-180')} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-slate-700">
                      <p className="text-xs font-semibold text-white truncate">{user.displayName || 'User'}</p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link href="/dashboard/saved" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <Heart className="w-4 h-4" /> Saved ({savedIds.length})
                      </Link>
                      <Link href="/dashboard/viewings" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <Building2 className="w-4 h-4" /> My Viewings
                      </Link>
                    </div>
                    <div className="p-1.5 border-t border-slate-700">
                      <button onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
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
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/10">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-700 px-4 py-4 shadow-2xl">
          <nav className="flex flex-col gap-0.5 mb-4">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  pathname.startsWith(link.href)
                    ? 'text-brand-gold bg-brand-gold/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
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
                  <Button variant="gold" fullWidth size="sm">Get Started Free</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
