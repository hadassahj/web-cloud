# Finitiv
This is a minimal, image-first portfolio built with Next.js (App Router), Tailwind CSS, Framer Motion and Supabase. The app showcases photo and video projects, supports a contact form (saved to Supabase), and is optimized for modern performance and responsiveness. The project is deployed on Vercel for hosting.

## Table of contents
- [Contributions of team members](#contributions)
- [Demo](#demo)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Supabase schema (recommended)](#supabase-schema-recommended)
- [Deployment](#deployment)
- [Where to look](#where-to-look)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)

## Features
- Photo gallery
- Video gallery
- Contact page with comunication form 
- Database integration
- Minimal responsive UI (Navbar, Footer, cards)
- Supabase integration for any dynamic data
- SEO optimized
- Deployed on Vercel for easy hosting

---

## Contributions

### 👥 TEAM & CONTRIBUTIONS


### 🧑‍💻 **Hadassah Finichiu** — *Lead Developer & Project Architect*  
**Status:** ✅ Completed

**Responsibilities**
- 🏗️ Project setup & overall architecture
- 🎨 Application layout & structure (global styles, layout, pages)
- 🧭 `Navbar` and `Footer` components
- 📸 Photography pages and project detail page
- 🚀 Vercel deployment & environment configuration

---

### 🧑‍💻 **Adelin Finichiu** — *Frontend & Backend Integration*  
**Status:** ✅ Completed

**Responsibilities**
- 🧩 `PhotoCard` & `VideoCard` components
- 🎬 Videography pages and media embeds
- 🔗 Supabase client integration (`app/lib/supabase.js`)
- ✉️ Contact form integration (saving to `messages` table)

---

> Want to update a contribution or add a new team member? Open an issue or submit a PR updating this section and include a short bullet list of responsibilities and contact (GitHub handle or email).


## Demo
Live demo: https://www.finitiv.vercel.app ✅

---

## Features
- Responsive, image-first portfolio layout (masonry-like gallery)
- Photography and Videography sections with dedicated project pages
- Contact form that inserts messages into a `messages` table in Supabase
- Image optimization using Next.js `next/image` where applicable
- Smooth animations via Framer Motion and a mobile-first navigation
- Supabase integration (projects, gallery_images, messages) for dynamic content
- Built-in linting and Turbopack dev server for fast feedback

---

## Tech stack
- Next.js (App Router, v16+) — React 19
- Tailwind CSS (v4)
- Supabase (JS client)
- Framer Motion (animations)
- lucide-react (icons)

---

## Project structure (high level)
```text
app/
├── components/           # Shared UI components (Navbar, Footer, Cards)
├── photography/          # Listing + dynamic project pages
│   └── [id]/
├── videography/          # Listing of video projects
├── lib/                  # Services (supabase client)
│   └── supabase.js
├── page.js               # Homepage / hero
├── contact/page.js       # Contact form (saves messages)
public/
└── photos/               # Optional local assets
```

---

## Getting started
Prerequisites: Node.js 18+ (recommended), npm (or pnpm/yarn)

1. Clone the repo

```bash
git clone <repo-url>
cd web-cloud
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables (create `.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

4. Run dev server (Turbopack)

```bash
npm run dev
```

5. Build for production

```bash
npm run build
npm run start
```

Linting

```bash
npm run lint
```

Notes
- `app/lib/supabase.js` uses the `NEXT_PUBLIC_*` keys to create a client; keep any service_role keys out of the repo.
- `next.config.mjs` already includes `remotePatterns` for Supabase storage and `images.unsplash.com` — update if you use other image hosts.

---

## Supabase schema (recommended)
The app expects a simple set of tables. Example SQL for local seeding (run in the Supabase SQL editor):

```sql
-- Projects (photo/video albums)
create table if not exists projects (
	id serial primary key,
	title text not null,
	description text,
	image_url text,
	category text,
	type text,          -- 'photo' or 'video'
	created_at timestamptz default now()
);

-- Gallery images for a project
create table if not exists gallery_images (
	id serial primary key,
	project_id integer references projects(id) on delete cascade,
	image_url text not null,
	caption text,
	"order" integer default 0
);

-- Messages from the contact form
create table if not exists messages (
	id serial primary key,
	name text,
	email text,
	message text,
	created_at timestamptz default now()
);

-- Example seed
insert into projects (title, description, image_url, category, type)
values ('Sample Album', 'A demo album', 'https://images.unsplash.com/photo-...', 'Editorial', 'photo');
```

Tips
- If you store images in Supabase Storage, make them public or generate signed URLs for client use.
- Make sure `next.config.mjs` allows the image host domain if you use external images.

---

## Deployment
Recommended: Vercel
1. Push to GitHub
2. Import project in Vercel
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in project settings
4. Vercel will detect Next.js and use `npm run build` automatically

---

## Where to look
- Homepage: `app/page.js` (hero + philosophy)
- Photography listing: `app/photography/page.js` (fetches `projects` where `type='photo'`)
- Photography detail: `app/photography/[id]/page.js` (loads `projects` + `gallery_images`)
- Contact form: `app/contact/page.js` (inserts into `messages`)
- Supabase client: `app/lib/supabase.js`
- UI: `app/components/*` (Navbar.jsx, Footer.js, PhotoCard.jsx, VideoCard.jsx)

---

## Contributing
- Open an issue to discuss features/bugs
- Create a branch `feature/<name>` or `fix/<name>`
- Run `npm run dev` and `npm run lint` before opening a PR

---

## Troubleshooting
- Images not loading: check `next.config.mjs` `remotePatterns`, or confirm the image URLs are public
- Supabase errors: verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` and table permissions
- Contact form not saving: ensure `messages` table exists and anon key has insert permissions

---

## Roadmap & TODOs
- Add CMS / admin panel to manage projects (Supabase Studio or custom admin)
- Implement unit / integration tests
- Add SEO meta components and better OpenGraph previews
- Add pagination / filters for galleries

---

## Contact
For collaboration or questions, open an issue or contact the team listed in the project.

---

*Thanks for checking out Finitiv — built with care for visual storytelling.*