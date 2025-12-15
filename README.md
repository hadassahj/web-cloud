# Finitiv

A **production-ready photography and videography portfolio platform** built with **Next.js (App Router)**, **Tailwind CSS**, and **Supabase**, and deployed on **Vercel**.  
Finitiv is engineered with a strong focus on **scalability, maintainability, and performance**, going well beyond a simple static gallery.

---

## Overview

Finitiv is designed as a **modern web application**, not just a visual showcase.  
It leverages the **Next.js App Directory architecture**, modular component design, and a cloud-based backend to provide a clean, extensible foundation suitable for real-world usage and future growth.

The project follows a clear separation of concerns between **routing**, **UI components**, and **data access**, ensuring long-term maintainability.

---

## Features

- Photography and videography sections with dedicated routes
- Dynamic detail pages implemented via parameterized routes (`[id]`)
- Reusable, composable UI components (Navbar, Footer, PhotoCard, VideoCard)
- Fully responsive, minimalist interface built with Tailwind CSS
- Supabase integration for dynamic data and backend services
- Optimized asset handling using Next.js conventions
- Production-grade deployment and CI/CD via Vercel

---

## Tech Stack

- **Next.js** — App Router, layouts, and modern routing patterns
- **Tailwind CSS** — utility-first styling and responsive design
- **Supabase** — backend services and data access layer
- **Vercel** — hosting, CI/CD, and optimized production builds

---

## Project Structure (High-Level)

app/
├── components/          # Shared UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PhotoCard.jsx
│   └── VideoCard.jsx
├── photography/         # Photography listing and detail pages
│   └── [id]/            # Dynamic photo pages
├── videography/         # Videography pages
├── lib/
│   └── supabase.js      # Supabase client configuration
├── page.js              # Homepage
public/
└── photos/              # Static photo assets


## Local Setup
Prerequisites: Node.js 18+ and npm (or pnpm/yarn).

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm run start
```

## Environment Variables
Create a `.env.local` (or configure in Vercel) with the following values if using Supabase:

- NEXT_PUBLIC_SUPABASE_URL — your Supabase project URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY — your Supabase anon/public key

The app expects the Supabase client in app/lib/supabase.js to read from the public NEXT_PUBLIC_ keys. Keep any service_role keys secret and never commit them.

## Deployment (Vercel)
1. Push the repository to GitHub (or connect your Git provider).
2. Import the project in Vercel and set the Environment Variables listed above.
3. Set the build command to `npm run build` (Vercel usually detects this automatically) and the framework preset to Next.js.
4. Deploy — Vercel will handle the build and publish the site.

## Where to look in this repo
- Homepage: app/page.js
- Photography listing: app/photography/page.js
- Photography detail: app/photography/[id]/page.js
- Videography: app/videography/page.js
- Components: app/components/

## Contributors & Assigned (Completed) Tasks
- Hadassah Finichiu — Project setup, layout, `Navbar`/`Footer`, photography pages, Vercel deployment. ✓
- Adelin Finichiu — PhotoCard & VideoCard components, videography pages, Supabase client integration. ✓


## Troubleshooting
- If images don’t show, confirm files exist under public/photos/ and paths in components match.
- If Supabase calls fail, verify the NEXT_PUBLIC_SUPABASE_* variables in local env or Vercel.

## Contact
Open an issue or reach out to the repo owners for further help.

## 🚀 Live Demo

The project is currently deployed and available here:
https://finitiv.vercel.app/
