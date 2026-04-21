import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CompareProvider } from '@/context/CompareContext';
import { SavedProvider } from '@/context/SavedContext';
<<<<<<< HEAD
import { ListingsProvider } from '@/context/ListingsContext';
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
import { ToastContainer } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: { default: 'PropVault — GTA Real Estate', template: '%s | PropVault' },
<<<<<<< HEAD
  description: "The GTA's premier property platform. Buy, rent, and discover homes across Toronto, Mississauga, Oakville and beyond.",
=======
  description: "The GTA's premier property platform. Find homes for sale, rent, and new developments across Toronto, Mississauga, Oakville and beyond.",
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
  keywords: ['real estate', 'GTA', 'Toronto', 'condos', 'houses', 'rent', 'buy'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
<<<<<<< HEAD
          <ListingsProvider>
            <SavedProvider>
              <CompareProvider>
                {children}
                <ToastContainer />
              </CompareProvider>
            </SavedProvider>
          </ListingsProvider>
=======
          <SavedProvider>
            <CompareProvider>
              {children}
              <ToastContainer />
            </CompareProvider>
          </SavedProvider>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
        </AuthProvider>
      </body>
    </html>
  );
}
