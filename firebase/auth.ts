import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth, isDemoMode } from './config';
import { createUserProfile } from './firestore';

// Demo mode mock user
export const DEMO_USER: User = {
  uid: 'demo-user-123',
  email: 'demo@propvault.ca',
  displayName: 'Demo User',
  photoURL: null,
  emailVerified: true,
} as User;

export async function registerUser(email: string, password: string, displayName: string): Promise<{ user: User | null; error: string | null }> {
  if (isDemoMode) {
    await createUserProfile(DEMO_USER.uid, { email, displayName });
    return { user: DEMO_USER, error: null };
  }
  try {
    const cred: UserCredential = await createUserWithEmailAndPassword(auth!, email, password);
    await createUserProfile(cred.user.uid, { email, displayName });
    return { user: cred.user, error: null };
  } catch (e: unknown) {
    return { user: null, error: mapFirebaseError(e) };
  }
}

export async function loginUser(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  if (isDemoMode) return { user: DEMO_USER, error: null };
  try {
    const cred = await signInWithEmailAndPassword(auth!, email, password);
    return { user: cred.user, error: null };
  } catch (e: unknown) {
    return { user: null, error: mapFirebaseError(e) };
  }
}

export async function logoutUser(): Promise<void> {
  if (!isDemoMode && auth) await signOut(auth);
}

export async function resetPassword(email: string): Promise<{ error: string | null }> {
  if (isDemoMode) return { error: null };
  try {
    await sendPasswordResetEmail(auth!, email);
    return { error: null };
  } catch (e: unknown) {
    return { error: mapFirebaseError(e) };
  }
}

export function onAuthChange(callback: (user: User | null) => void) {
  if (isDemoMode) {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('propvault_demo_user') : null;
    callback(stored ? DEMO_USER : null);
    return () => {};
  }
  return onAuthStateChanged(auth!, callback);
}

function mapFirebaseError(e: unknown): string {
  const err = e as { code?: string };
  const map: Record<string, string> = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
  };
  return map[err.code || ''] || 'An unexpected error occurred.';
}
