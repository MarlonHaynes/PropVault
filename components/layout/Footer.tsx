import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const cities = ['Toronto', 'Mississauga', 'Oakville', 'Vaughan', 'Markham', 'Richmond Hill', 'Brampton'];

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm font-mono">PV</span>
              </div>
              <span className="font-playfair text-xl font-bold text-white">PropVault</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              The GTA&apos;s premier property platform. Buy, rent, and discover homes with confidence.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:text-brand-gold hover:border-brand-gold transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/listings', label: 'Browse Listings' },
                { href: '/agents', label: 'Find Agents' },
                { href: '/map-search', label: 'Map Search' },
                { href: '/compare', label: 'Compare Properties' },
                { href: '/about', label: 'About Us' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Cities</h4>
            <ul className="space-y-2.5">
              {cities.map(city => (
                <li key={city}>
                  <Link href={`/listings?city=${city}`} className="text-sm text-slate-400 hover:text-brand-gold transition-colors">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>100 King St W, Suite 5600<br />Toronto, ON M5X 1C9</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-brand-gold" />
                <a href="tel:+14165550100" className="hover:text-white transition-colors">+1 (416) 555-0100</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-brand-gold" />
                <a href="mailto:hello@propvault.ca" className="hover:text-white transition-colors">hello@propvault.ca</a>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-xs text-slate-500 mb-2">Subscribe for market updates</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Your email" className="flex-1 h-8 px-3 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-brand-gold" />
                <button type="button" className="h-8 px-3 text-xs bg-brand-gold text-slate-900 rounded-lg font-medium hover:bg-amber-400 transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PropVault Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Fair Housing', 'Accessibility'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
