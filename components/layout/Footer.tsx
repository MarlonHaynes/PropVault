'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Award, Shield } from 'lucide-react';

const cities = ['Toronto', 'Mississauga', 'Oakville', 'Vaughan', 'Markham', 'Richmond Hill', 'Brampton'];

const services = [
  { label: 'Browse Listings',       href: '/listings' },
  { label: 'Find an Agent',         href: '/agents' },
  { label: 'Map Search',            href: '/map-search' },
  { label: 'Compare Properties',    href: '/compare' },
  { label: 'Mortgage Calculator',   href: '/listings' },
  { label: 'New Developments',      href: '/listings?listingType=new-development' },
];

const company = [
  { label: 'About PropVault', href: '/about' },
  { label: 'Our Story',       href: '/about' },
  { label: 'Awards & Press',  href: '/about' },
  { label: 'Careers',         href: '/contact' },
  { label: 'Blog',            href: '/' },
  { label: 'Contact Us',      href: '/contact' },
];

const offices = [
  { city: 'Toronto HQ', address: '100 King St W, Suite 5600', phone: '+1 (416) 555-0100' },
  { city: 'Mississauga', address: '220 Lakeshore Rd W, Suite 201', phone: '+1 (905) 555-0200' },
  { city: 'Oakville',    address: '150 Lakeshore Rd E, Suite 100', phone: '+1 (905) 555-0300' },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      {/* Top bar — awards */}
      <div className="border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-brand-gold" /> TRREB Top Brokerage 2022 & 2023</span>
            <span className="w-px h-4 bg-slate-700" />
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand-gold" /> RECO Registered · Fully Insured</span>
            <span className="w-px h-4 bg-slate-700" />
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-brand-gold" /> Toronto Life Best Boutique Firm 2021 & 2022</span>
            <span className="w-px h-4 bg-slate-700" />
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand-gold" /> $3.2B+ in Total Sales Volume</span>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center">
                <span className="text-slate-900 font-bold text-xs font-mono">PV</span>
              </div>
              <span className="font-playfair text-xl font-bold text-white">PropVault</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              The GTA's most trusted independent real estate brokerage. Serving buyers, sellers,
              and renters across 15+ cities since 2010.
            </p>

            {/* Social */}
            <div className="flex items-center gap-2.5 mb-6">
              {[
                { Icon: Facebook,  href: '#' },
                { Icon: Twitter,   href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Linkedin,  href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:text-brand-gold hover:border-brand-gold transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            {/* Offices */}
            <div className="space-y-2.5">
              {offices.map((o, i) => (
                <div key={i} className="text-xs text-slate-500">
                  <span className="text-slate-300 font-medium">{o.city}:</span>{' '}
                  {o.address} · <a href={`tel:${o.phone}`} className="hover:text-brand-gold transition-colors">{o.phone}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2">
              {services.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities + Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Cities</h4>
            <ul className="space-y-2 mb-6">
              {cities.map(city => (
                <li key={city}>
                  <Link href={`/listings?city=${city}`} className="text-sm text-slate-400 hover:text-brand-gold transition-colors">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-xs text-slate-500 mb-2 font-medium">Monthly Market Report</p>
              <form className="space-y-2" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full h-8 px-3 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-brand-gold transition-colors"
                />
                <button type="submit"
                  className="w-full h-8 text-xs bg-brand-gold text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
                  Subscribe — Free
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PropVault Inc. All rights reserved. · Ontario Real Estate License #12345678
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Fair Housing', 'Accessibility', 'PIPEDA'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
