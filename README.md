# Biolink भारत

Biolink भारत is a modern stubble trading platform that connects farmers and biomass buyers across the state. It provides dashboards, real-time stats, listings management, and responsive UI components to make collaboration faster and more transparent.

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS & shadcn/ui component primitives
- React Router for navigation
- TanStack Query for async data utilities

## Local development

```bash
git clone <repo-url>
cd Biolink-Punjab
npm install
cp .env.example .env.local
npm run dev
```

By default the dev server runs on `http://localhost:5173`. Update environment variables or API URLs inside the `src` directory as needed.

### Supabase configuration

The app is wired to a live Supabase instance. Environment variables are provided in `.env.example`; copy them into `.env.local` (ignored by git) to enable API access.

| Variable | Value |
| -------- | ----- |
| `VITE_SUPABASE_URL` | `https://ymiuiohsnywsgjvlhnrg.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltaXVpb2hzbnl3c2dqdmxobnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1Mjg1MDEsImV4cCI6MjA3OTEwNDUwMX0.BzGysZm8xbUBUct56JThWZwiMlu8JU0Zz_EmAxCJcr8` |

Database schema and policies can be created by running the SQL in [`supabase.sql`](./supabase.sql) inside the Supabase SQL editor or CLI.

## Available scripts

| Command        | Description                           |
| -------------- | ------------------------------------- |
| `npm run dev`  | Start the local dev server            |
| `npm run build`| Build the production bundle           |
| `npm run lint` | Lint the codebase with ESLint         |
| `npm run preview` | Preview the production build locally |

## Deployment

Build the project with `npm run build` and deploy the contents of the generated `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, etc.).
