<div align="center">

# PropVault — GTA Real Estate Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

</div>

Production-ready real estate web app focused on the Greater Toronto Area, with public browsing, map search, user dashboard, and admin operations.

## Live Demo + Login (Top Priority)

- **Live Demo:** [https://prop-vault-sage.vercel.app/](https://prop-vault-sage.vercel.app/)
- **Login URL:** `/login`
- **Demo Credentials:**
  - Email: `demo@propvault.ca`
  - Password: `demo123`
- **Quick Access:**
  - Client Dashboard: `/dashboard`
  - Admin Dashboard: `/admin`

## Key Features

- Public property marketplace with advanced filtering and city coverage
- Listing detail pages with gallery, inquiry form, and mortgage calculator
- Map search experience
- Client dashboard for saved properties and inquiries
- Admin dashboard for listings, agents, and inquiry workflow

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Local demo-friendly data flow (works out of the box)

## Screenshots

### Home
![Home page](doc/screenshot/Home%20page.png)

### Listings
![Listings page](doc/screenshot/Listings%20page.png)

### Map Search
![Map search page](doc/screenshot/Map%20search%20page.png)

### Client Dashboard
![Client dashboard](doc/screenshot/Client%20dashboard.png)

### Admin Dashboard
![Admin dashboard](doc/screenshot/Admin%20dashboard.png)

### Mortgage Calculator
![Mortgage calculator](doc/screenshot/Mortgage%20calculator.png)

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

```text
app/             routes (auth, main site, dashboard, admin)
components/      reusable UI, forms, listings, map, admin
context/         app-level state providers
data/            listings, agents, seeded content
hooks/           custom React hooks
lib/             local data/store utilities
types/           shared TypeScript interfaces
utils/           helper functions
```

## Contact

Available for full-time and contract opportunities.
📧 [marlon.haynes.dev@gmail.com](mailto:marlon.haynes.dev@gmail.com)

---

## License

Personal portfolio project — not licensed for reuse or redistribution.

© 2026 Marlon Haynes. All rights reserved.

---

<div align="center">

Built by Marlon Haynes • Web Alchemist Labs

</div>
