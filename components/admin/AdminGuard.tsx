'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { isAdminUid } from '@/firebase/config';
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

  if (!isAdminUid(user.uid)) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-slate-400 text-sm mb-6 max-w-sm">
            You don&apos;t have admin access. Contact the site administrator to request elevated permissions.
          </p>
          <p className="text-xs text-slate-600 mb-6 font-mono">Your UID: {user.uid}</p>
          <Link href="/" className="inline-flex items-center gap-2 h-10 px-6 rounded-lg bg-brand-gold text-slate-900 font-semibold text-sm hover:bg-amber-400 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
