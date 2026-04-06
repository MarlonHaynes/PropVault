import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CompareProvider } from '@/context/CompareContext';
import { SavedProvider } from '@/context/SavedContext';
import { ToastContainer } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: { default: 'PropVault — GTA Real Estate', template: '%s | PropVault' },
  description: "The GTA's premier property platform. Find homes for sale, rent, and new developments across Toronto, Mississauga, Oakville and beyond.",
  keywords: ['real estate', 'GTA', 'Toronto', 'condos', 'houses', 'rent', 'buy'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SavedProvider>
            <CompareProvider>
              {children}
              <ToastContainer />
            </CompareProvider>
          </SavedProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
