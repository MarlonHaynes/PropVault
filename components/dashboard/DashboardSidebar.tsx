'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { LayoutDashboard, Heart, Search, MessageSquare, Calendar, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { demoInquiries, demoViewings } from '@/data/demo-data';
import { cn } from '@/utils';

const links = [
  { href: '/dashboard',                 label: 'Overview',         icon: LayoutDashboard, exact: true,  badge: null },
  { href: '/dashboard/saved',           label: 'Saved Properties', icon: Heart,           exact: false, badge: null },
  { href: '/dashboard/saved-searches',  label: 'Saved Searches',   icon: Search,          exact: false, badge: '2' },
  { href: '/dashboard/inquiries',       label: 'My Inquiries',     icon: MessageSquare,   exact: false, badge: String(demoInquiries.filter(i=>i.status==='new').length) },
  { href: '/dashboard/viewings',        label: 'Viewings',         icon: Calendar,        exact: false, badge: String(demoViewings.filter(v=>v.status==='upcoming').length) },
  { href: '/dashboard/profile',         label: 'Profile',          icon: User,            exact: false, badge: null },
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import { LayoutDashboard, Heart, Search, MessageSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils';

const links = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/saved', label: 'Saved Properties', icon: Heart },
  { href: '/dashboard/saved-searches', label: 'Saved Searches', icon: Search },
  { href: '/dashboard/inquiries', label: 'My Inquiries', icon: MessageSquare },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
<<<<<<< HEAD
  const { savedIds } = useSaved();
=======
<<<<<<< HEAD
<<<<<<< HEAD
  const { savedIds } = useSaved();
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508

  function isActive(link: typeof links[0]) {
    return link.exact ? pathname === link.href : pathname.startsWith(link.href);
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  // Inject real saved count
  const linksWithBadges = links.map(l =>
    l.href === '/dashboard/saved' && savedIds.length > 0 ? { ...l, badge: String(savedIds.length) } : l
  );

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
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
<<<<<<< HEAD
          {linksWithBadges.map(link => (
=======
<<<<<<< HEAD
<<<<<<< HEAD
          {linksWithBadges.map(link => (
=======
          {links.map(link => (
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
          {links.map(link => (
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
            <Link key={link.href} href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-0.5',
                isActive(link) ? 'bg-brand-gold/10 text-brand-gold' : 'text-slate-400 hover:text-white hover:bg-slate-700'
              )}>
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
              <link.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{link.label}</span>
              {link.badge && link.badge !== '0' && (
                <span className={cn(
                  'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                  isActive(link) ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300'
                )}>
                  {link.badge}
                </span>
              )}
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
              <link.icon className="w-4 h-4" />
              {link.label}
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
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
