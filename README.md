# PropVault — GTA Real Estate Platform

A production-grade real estate marketplace for the Greater Toronto Area. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Firebase, and Stripe.

## ✨ Features

- **100 GTA Listings** — curated properties across Toronto, Mississauga, Oakville, Vaughan, Markham, Richmond Hill, and Brampton
- **12 Expert Agents** — fully detailed profiles with specialties, ratings, and bios
- **Advanced Filters** — 15+ filter criteria: city, property type, price range, bedrooms, sqft, furnished, pet-friendly
- **Saved Properties** — authenticated save/unsave with real-time sync
- **Compare Tool** — side-by-side comparison of up to 4 properties
- **Inquiry System** — contact agents directly from listing pages
- **Mortgage Calculator** — interactive slider-based calculator
- **Dashboard** — user account overview with saved properties, inquiries, profile
- **Admin Panel** — listings and agent management view
- **Map Search** — city-filtered listings panel with map placeholder (plug in Google Maps API)
- **Demo Mode** — fully functional without any API keys using localStorage mock

## 🚀 Quick Start

```bash
git clone <your-repo>
cd propvault
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs in **Demo Mode** without any environment variables.

## 🔧 Configuration

Copy `.env.example` to `.env.local` and add keys to enable:

| Feature | Keys Needed |
|---------|------------|
| Auth + Database | Firebase keys |
| Payments | Stripe keys |
| Interactive Map | Google Maps API key |

## 🗂 Project Structure

```
propvault/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login, Register, Forgot Password
│   ├── (main)/             # Listings, Agents, Map, Compare, Contact, About
│   ├── (dashboard)/        # User dashboard + sub-pages
│   └── admin/              # Admin panel
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── listings/           # ListingCard, AdvancedFilters
│   ├── agents/             # AgentCard
│   ├── forms/              # InquiryForm, MortgageCalculator
│   ├── dashboard/          # DashboardSidebar
│   └── ui/                 # Button, FormElements, Display, Toast, Modal, Accordion
├── context/                # AuthContext, SavedContext, CompareContext
├── data/                   # 100 listings, 12 agents, testimonials, cities, FAQs
├── firebase/               # config, auth, firestore helpers
├── hooks/                  # useListings, useScrolled, useToast, useMortgageCalculator
├── stripe/                 # config
├── types/                  # Full TypeScript interfaces
└── utils/                  # cn, formatPrice, slugify, calculateMortgage, etc.
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0f172a` |
| Surface | `#1e293b` |
| Gold Accent | `#c8a97e` |
| Teal Accent | `#0f766e` |
| Heading Font | Playfair Display |
| Body Font | DM Sans |
| Mono Font | DM Mono |

## 📦 Stack

- **Framework** — Next.js 14 App Router
- **Language** — TypeScript
- **Styling** — Tailwind CSS v3
- **Auth/DB** — Firebase v10 (with demo fallback)
- **Payments** — Stripe (with demo fallback)
- **Icons** — Lucide React
- **Utilities** — clsx, tailwind-merge, date-fns

## 🌐 Deployment

Deploy to Vercel in one click. Add your environment variables in the Vercel dashboard.

```bash
npx vercel
```

---

Built by [WebAlchemistLabs](https://github.com/WebAlchemistLabs) · PropVault © 2024
