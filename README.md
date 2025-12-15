# Finitiv

A portfolio website for photography and videography built with Next.js (app directory), Tailwind CSS and Supabase — deployed on Vercel.

## Features
- Photo gallery
- Video gallery
- Minimal responsive UI (Navbar, Footer, cards)
- Supabase integration for any dynamic data

## Tech Stack
- Next.js (App Router)
- Tailwind CSS
- Supabase (client in app/lib/supabase.js)
- Deployed on Vercel

## Project Structure (high level)
- app/ — Next.js app routes and components
  - components/ — Navbar, Footer, PhotoCard, VideoCard
  - photography/ — photography listing and [id] pages
  - videography/ — videography pages
- public/photos/ — static photo assets
- app/lib/supabase.js — Supabase client

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

[finitiv.vercel.app]
