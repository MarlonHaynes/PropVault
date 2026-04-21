import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
<<<<<<< HEAD
import { getStorage, FirebaseStorage } from 'firebase/storage';
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

<<<<<<< HEAD
// Admin UIDs — add your Firebase UID here after first login
export const ADMIN_UIDS = (process.env.NEXT_PUBLIC_ADMIN_UIDS || '').split(',').filter(Boolean);

export function isAdminUid(uid: string): boolean {
  // In demo mode, demo user is always admin
  if (isDemoMode) return uid === 'demo-user-123';
  return ADMIN_UIDS.includes(uid);
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
=======
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175

if (!isDemoMode) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
<<<<<<< HEAD
  storage = getStorage(app);
}

export { app, auth, db, storage };
=======
}

export { app, auth, db };
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
