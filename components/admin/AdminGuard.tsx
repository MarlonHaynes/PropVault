'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { isAdminUid } from '@/firebase/config';
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
import { isAdminUid } from '@/firebase/config';
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { LoadingSpinner } from '@/components/ui/Display';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <LoadingSpinner className="w-8 h-8" />
      </div>
    );
  }

  if (!user) return null;

<<<<<<< HEAD
<<<<<<< HEAD
  if (!user.isAdmin) {
=======
  if (!isAdminUid(user.uid)) {
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
  if (!isAdminUid(user.uid)) {
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
          <h1 className="font-playfair text-2xl font-bold text-white mb-2">Admin Access Only</h1>
          <p className="text-slate-400 text-sm mb-6 max-w-sm">
            You need an admin account to access this panel.
            Use the Demo User login to access all admin features.
          </p>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          <h1 className="font-playfair text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-slate-400 text-sm mb-6 max-w-sm">
            You don&apos;t have admin access. Contact the site administrator to request elevated permissions.
          </p>
          <p className="text-xs text-slate-600 mb-6 font-mono">Your UID: {user.uid}</p>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          <Link href="/" className="inline-flex items-center gap-2 h-10 px-6 rounded-lg bg-brand-gold text-slate-900 font-semibold text-sm hover:bg-amber-400 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
