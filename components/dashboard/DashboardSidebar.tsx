'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Heart, Search, MessageSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils';

const links = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/saved', label: 'Saved Properties', icon: Heart },
  { href: '/dashboard/saved-searches', label: 'Saved Searches', icon: Search },
  { href: '/dashboard/inquiries', label: 'My Inquiries', icon: MessageSquare },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  function isActive(link: typeof links[0]) {
    return link.exact ? pathname === link.href : pathname.startsWith(link.href);
  }

  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-24 bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        {/* User */}
        <div className="px-5 py-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
              <span className="text-brand-gold font-bold text-sm">
                {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.displayName || 'User'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-2">
          {links.map(link => (
            <Link key={link.href} href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-0.5',
                isActive(link) ? 'bg-brand-gold/10 text-brand-gold' : 'text-slate-400 hover:text-white hover:bg-slate-700'
              )}>
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-2 border-t border-slate-700">
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-slate-700 transition-all">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
