import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CompareProvider } from '@/context/CompareContext';
import { SavedProvider } from '@/context/SavedContext';
import { ListingsProvider } from '@/context/ListingsContext';
import { ToastContainer } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: { default: 'PropVault — GTA Real Estate', template: '%s | PropVault' },
  description: "The GTA's most trusted real estate brokerage. Buy, sell, and rent across Toronto, Mississauga, Oakville, Vaughan, and beyond.",
  keywords: ['real estate', 'GTA', 'Toronto', 'condos', 'houses', 'rent', 'buy', 'Oakville', 'Mississauga'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ListingsProvider>
            <SavedProvider>
              <CompareProvider>
                {children}
                <ToastContainer />
              </CompareProvider>
            </SavedProvider>
          </ListingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
