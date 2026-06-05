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
touch .env.local
npm run dev
```

By default the dev server runs on `http://localhost:5173`. Update environment variables or API URLs inside the `src` directory as needed.

### Supabase configuration

The app is wired to a live Supabase instance. Set the environment variables in `.env.local` (ignored by git) to enable API access.

| Variable | Value |
| -------- | ----- |
| `VITE_SUPABASE_URL` | `https://ymiuiohsnywsgjvlhnrg.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltaXVpb2hzbnl3c2dqdmxobnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1Mjg1MDEsImV4cCI6MjA3OTEwNDUwMX0.BzGysZm8xbUBUct56JThWZwiMlu8JU0Zz_EmAxCJcr8` |

Database schema and policies can be created by running the SQL files in [`src/migrations`](./src/migrations) inside the Supabase SQL editor or CLI, in the listed order.

### Phone OTP authentication

The app supports two login methods on the farmer and buyer pages:

1. **Phone OTP** (default) — SMS one-time password via Supabase Auth
2. **Email** — email and password

Phone OTP uses Supabase’s built-in SMS provider (Twilio). Configure it in the Supabase Dashboard:

1. **Authentication → Providers → Phone** — enable the phone provider
2. **Authentication → Providers → Phone → SMS provider** — add your Twilio Account SID, Auth Token, and Message Service SID (or From number)
3. Set OTP length (6 digits recommended) and enable auto-confirm for phone signups
4. Run migration [`0007_profiles_phone_auth.sql`](./src/migrations/0007_profiles_phone_auth.sql) in the SQL editor

No extra frontend env vars are required for SMS; Twilio credentials stay in Supabase only. The existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are sufficient.

## Available scripts

| Command        | Description                           |
| -------------- | ------------------------------------- |
| `npm run dev`  | Start the local dev server            |
| `npm run build`| Build the production bundle           |
| `npm run lint` | Lint the codebase with ESLint         |
| `npm run preview` | Preview the production build locally |

## Deployment

Build the project with `npm run build` and deploy the contents of the generated `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, etc.).
