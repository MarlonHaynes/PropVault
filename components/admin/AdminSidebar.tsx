'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Home, Users, MessageSquare, Settings, LogOut, Database, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils';

const links = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/listings', label: 'Listings', icon: Home },
  { href: '/admin/agents', label: 'Agents', icon: Users },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  function isActive(link: typeof links[0]) {
    return link.exact ? pathname === link.href : pathname.startsWith(link.href);
  }

  return (
    <aside className="w-60 shrink-0">
      <div className="sticky top-24 bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        {/* Brand */}
        <div className="px-4 py-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-gold flex items-center justify-center">
              <span className="text-slate-900 font-bold text-xs font-mono">PV</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">PropVault Admin</p>
              <p className="text-[10px] text-slate-500 truncate max-w-[140px]">{user?.email}</p>
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

        {/* Quick actions */}
        <div className="p-2 border-t border-slate-700">
          <Link href="/admin/listings/new"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-emerald-400 hover:bg-slate-700 transition-all mb-0.5">
            <Plus className="w-4 h-4" /> New Listing
          </Link>
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-700 transition-all mb-0.5">
            <Settings className="w-4 h-4" /> View Live Site
          </Link>
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-slate-700 transition-all">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
