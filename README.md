

# PropVault — GTA Real Estate Platform

**Production-grade real estate marketplace for the Greater Toronto Area.**
Zero backend dependencies. Works instantly with `npm run dev`. Deploys to Vercel in one command.

---



 
# PropVault v4 — GTA Real Estate Platform

**Enterprise-grade real estate marketplace serving Southern Ontario.**
Built to impress real clients, hireable as a portfolio centrepiece.

---

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




 

 
npm install
npm run dev
```



Open `http://localhost:3000` — everything works immediately, no setup required.

**Demo login:** Click "Continue as Demo User" on the login page.
- Full admin access at `/admin`
- Pre-seeded with 30 listings, 5 inquiries, 4 viewings

---

## ✨ No Firebase. No Environment Variables. No Config.

All data persists in **localStorage**. The app works identically whether you're running locally or deployed to Vercel.

| Feature | How it works |
|---------|-------------|
| Listings | Static TypeScript data + localStorage for admin edits |
| Auth | localStorage-based user accounts |
| Saved Properties | localStorage per user |
| Inquiries | localStorage |
| Admin CRUD | localStorage — changes persist across page refreshes |
| Images | URL input or local file preview |

---

## 📁 Project Structure

```
propvault/


 
Open `http://localhost:3000` · Click **"Continue as Demo User"** on the login page.
Full admin access at `/admin`. All 30 listings, 5 inquiries, 4 viewings are pre-seeded.

---

## ✨ Enterprise Features

### Public Platform
| Page | Features |
|------|---------|
| **Home** | Functional search bar, live featured listings, process steps, client logos, press section |
| **Listings** | 30 curated properties, 15+ filters, grid/list toggle, real-time Firestore sync |
| **Listing Detail** | 5-image gallery, Google Maps, mortgage calculator, agent inquiry form, related listings |
| **Map Search** | Price-bubble pins, click-to-expand popup, city filters, professional sidebar cards |
| **Agents** | Top performers leaderboard, 48-agent directory, performance stats, recruiting CTA |
| **About** | Company timeline (2010–2024), 6 awards, 4 press mentions, values, milestone stats |
| **Contact** | 3 office locations, contact-reason selector, hours, success state confirmation |

### User Dashboard
| Page | Features |
|------|---------|
| **Overview** | Upcoming viewing banner, saved properties, inquiry status, market snapshot, recent GTA closings |
| **My Inquiries** | 5 seeded inquiries with message threads, agent replies, status badges, expandable cards |
| **Viewings** | Upcoming viewing banner, completed feedback, cancelled entries, status filters, book-more CTA |
| **Saved Properties** | Live Firebase/localStorage sync, listing cards with full details |
| **Saved Searches** | Notification toggles, new-match badges, filter summaries |
| **Profile** | Tabbed UI: personal info, preferences toggles, security settings, account details |

### Admin Panel
| Page | Features |
|------|---------|
| **Dashboard** | Revenue bar chart (12 months), agent leaderboard, KPI cards with deltas, sales history, inquiry pipeline |
| **Listings** | Full CRUD, search/filter, inline status dropdown, featured toggle, delete with confirmation |
| **Create/Edit** | Full form with image upload (drag-drop, progress bars, reorder), all fields |
| **Agents** | YTD performance leaderboard, searchable agent grid with stats |
| **Inquiries** | Pipeline view with status filters, buyer contact info |

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Auth + DB | Firebase v10 (localStorage demo fallback) |
| Storage | Firebase Storage (blob URL demo fallback) |
| Payments | Stripe (mock demo fallback) |
| Icons | Lucide React |

---

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


 

 
├── app/
│   ├── (auth)/          Login, Register, Forgot Password
│   ├── (main)/          Listings, Agents, Map, About, Contact, Compare, Saved
│   ├── (dashboard)/     User CRM: Overview, Inquiries, Viewings, Saved, Searches, Profile
│   └── admin/           Admin: Dashboard, Listings CRUD, Agents, Inquiries


├── components/          UI components, layout, forms, admin, map
├── context/             Auth, Listings, Saved, Compare — all localStorage based
├── data/
│   ├── listings.ts      30 curated GTA properties with matched photos
│   ├── agents.ts        12 full agent profiles
│   ├── sales-history.ts Historical sales data for admin charts
│   └── demo-data.ts     Seeded inquiries + viewings for dashboard demo
├── lib/
│   └── store.ts         Single localStorage store — replaces all Firebase calls
├── hooks/               useListings, useScrolled, useToast, useMortgageCalculator
├── types/               Full TypeScript interfaces
└── utils/               formatPrice, slugify, getListingSlug, calculateMortgage, cn


 
├── components/
│   ├── admin/           AdminGuard, AdminSidebar, ImageUploader, ListingForm
│   ├── layout/          Navbar, Footer
│   ├── listings/        ListingCard, AdvancedFilters
│   ├── map/             PropertyMap (Google Maps + dark fallback)
│   ├── forms/           InquiryForm, MortgageCalculator
│   ├── dashboard/       DashboardSidebar (with notification badges)
│   └── ui/              Button, FormElements, Display, Toast, Modal, Accordion
├── context/             Auth, Listings (real-time), Saved, Compare
├── data/
│   ├── listings.ts      30 curated GTA properties with matched photos
│   ├── agents.ts        12 full agent profiles
│   ├── sales-history.ts 12 closed sales, monthly revenue, agent performance
│   ├── demo-data.ts     5 seeded inquiries + 4 viewings for dashboard demo
│   └── index.ts         Testimonials, FAQs, cities, stats
├── firebase/            config, auth, firestore (CRUD + real-time), storage
├── firestore.rules      Security rules for production deployment
├── storage.rules        Storage security rules
└── next.config.js       module.exports format, domains array

 

 
```

---



## 🌐 Deploy to Vercel

```bash
npx vercel
```

Zero environment variables required. The app is fully static + client-side.

---



 
## 🔐 Firebase Setup (go live in 15 minutes)

```bash
# 1. Create project at console.firebase.google.com
# 2. Enable Authentication > Email/Password
# 3. Create Firestore database
# 4. Create Storage bucket
# 5. Copy config to .env.local
# 6. Deploy rules:
firebase deploy --only firestore:rules,storage

# 7. Log in → visit /admin → copy your UID → add to NEXT_PUBLIC_ADMIN_UIDS
# 8. Click "Seed DB" in admin dashboard

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


| Gold Accent | `#c8a97e` |
| Heading Font | Playfair Display |
| Body Font | DM Sans |

---

Built by **WebAlchemistLabs** · PropVault © 2024


 
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


## 🗺️ Google Maps

Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to `.env.local` for live maps.
Without it: styled placeholder with price-bubble pins, a link to Google Maps, and full nearby places list.

---

Built by **WebAlchemistLabs** · PropVault © 2024 · License #PROP2010-ON

Built by [WebAlchemistLabs](https://github.com/WebAlchemistLabs) · PropVault © 2024

 

 
