import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CompareProvider } from '@/context/CompareContext';
import { SavedProvider } from '@/context/SavedContext';
<<<<<<< HEAD
import { ListingsProvider } from '@/context/ListingsContext';
=======
<<<<<<< HEAD
<<<<<<< HEAD
import { ListingsProvider } from '@/context/ListingsContext';
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { ToastContainer } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: { default: 'PropVault — GTA Real Estate', template: '%s | PropVault' },
<<<<<<< HEAD
<<<<<<< HEAD
  description: "The GTA's most trusted real estate brokerage. Buy, sell, and rent across Toronto, Mississauga, Oakville, Vaughan, and beyond.",
  keywords: ['real estate', 'GTA', 'Toronto', 'condos', 'houses', 'rent', 'buy', 'Oakville', 'Mississauga'],
=======
<<<<<<< HEAD
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  description: "The GTA's premier property platform. Buy, rent, and discover homes across Toronto, Mississauga, Oakville and beyond.",
=======
  description: "The GTA's premier property platform. Find homes for sale, rent, and new developments across Toronto, Mississauga, Oakville and beyond.",
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
  keywords: ['real estate', 'GTA', 'Toronto', 'condos', 'houses', 'rent', 'buy'],
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          <ListingsProvider>
            <SavedProvider>
              <CompareProvider>
                {children}
                <ToastContainer />
              </CompareProvider>
            </SavedProvider>
          </ListingsProvider>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
          <SavedProvider>
            <CompareProvider>
              {children}
              <ToastContainer />
            </CompareProvider>
          </SavedProvider>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        </AuthProvider>
      </body>
    </html>
  );
}
