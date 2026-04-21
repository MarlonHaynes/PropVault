<<<<<<< HEAD
'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, Award } from 'lucide-react';
=======
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175

const cities = ['Toronto', 'Mississauga', 'Oakville', 'Vaughan', 'Markham', 'Richmond Hill', 'Brampton'];

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
<<<<<<< HEAD
      {/* Awards bar */}
      <div className="border-b border-slate-800/60 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            'TRREB Top Brokerage 2022 & 2023',
            'Toronto Life Best Boutique Firm 2021–2022',
            'RECO Excellence Award 2023',
            'Globe & Mail Top Real Estate Brand 2023',
          ].map((award, i) => (
            <div key={i} className="flex items-center gap-1.5 text-slate-600 text-xs">
              <Award className="w-3 h-3 text-brand-gold/50" />
              {award}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
=======
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
              <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm font-mono">PV</span>
              </div>
              <span className="font-playfair text-xl font-bold text-white">PropVault</span>
<<<<<<< HEAD
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-xs">
              The GTA's most trusted independent real estate brokerage. Serving 15+ cities since 2010 with 48 expert agents and $3.2B+ in closed transactions.
            </p>
            <div className="flex items-center gap-2.5 mb-5">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-500 hover:text-brand-gold hover:border-brand-gold transition-all">
=======
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              The GTA&apos;s premier property platform. Buy, rent, and discover homes with confidence.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:text-brand-gold hover:border-brand-gold transition-all">
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
<<<<<<< HEAD
            <div className="flex flex-wrap gap-3">
              <span className="text-xs text-slate-600 border border-slate-800 rounded px-2 py-1">TRREB Member</span>
              <span className="text-xs text-slate-600 border border-slate-800 rounded px-2 py-1">RECO Licensed</span>
              <span className="text-xs text-slate-600 border border-slate-800 rounded px-2 py-1">CREA Member</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/listings', label: 'Browse Listings' },
                { href: '/listings?listingType=sale', label: 'Properties for Sale' },
                { href: '/listings?listingType=rent', label: 'Properties for Rent' },
                { href: '/listings?listingType=new-development', label: 'New Developments' },
                { href: '/agents', label: 'Find an Agent' },
                { href: '/map-search', label: 'Map Search' },
                { href: '/compare', label: 'Compare Properties' },
=======
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
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
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
<<<<<<< HEAD
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Coverage Areas</h4>
=======
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Cities</h4>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
            <ul className="space-y-2.5">
              {cities.map(city => (
                <li key={city}>
                  <Link href={`/listings?city=${city}`} className="text-sm text-slate-400 hover:text-brand-gold transition-colors">
                    {city}
                  </Link>
                </li>
              ))}
<<<<<<< HEAD
              <li><Link href="/about" className="text-sm text-slate-400 hover:text-brand-gold transition-colors">All Regions →</Link></li>
=======
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
            </ul>
          </div>

          {/* Contact */}
          <div>
<<<<<<< HEAD
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h4>
=======
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>100 King St W, Suite 5600<br />Toronto, ON M5X 1C9</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
<<<<<<< HEAD
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+14165550100" className="hover:text-white transition-colors">+1 (416) 555-0100</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
=======
                <Phone className="w-4 h-4 text-brand-gold" />
                <a href="tel:+14165550100" className="hover:text-white transition-colors">+1 (416) 555-0100</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-brand-gold" />
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
                <a href="mailto:hello@propvault.ca" className="hover:text-white transition-colors">hello@propvault.ca</a>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
<<<<<<< HEAD
              <p className="text-xs text-slate-500 mb-2.5 font-medium">GTA Market Updates</p>
              <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Your email" className="flex-1 h-8 px-3 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-brand-gold transition-colors" />
                <button type="submit" className="h-8 px-3 text-xs bg-brand-gold text-slate-900 rounded-lg font-medium hover:bg-amber-400 transition-colors whitespace-nowrap">
                  Subscribe
=======
              <p className="text-xs text-slate-500 mb-2">Subscribe for market updates</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Your email" className="flex-1 h-8 px-3 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-brand-gold" />
                <button type="button" className="h-8 px-3 text-xs bg-brand-gold text-slate-900 rounded-lg font-medium hover:bg-amber-400 transition-colors">
                  Join
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
                </button>
              </form>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} PropVault Inc. All rights reserved. Independently owned and operated.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Fair Housing Notice', 'Accessibility', 'Sitemap'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{link}</a>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-slate-700 mt-4">
          PropVault Inc. is a registered real estate brokerage. License #PROP2010-ON. All listings subject to errors and omissions.
        </p>
=======
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
>>>>>>> a65abc0b4b0b0d18843dcc04ebfbc4e6dc141175
      </div>
    </footer>
  );
}
