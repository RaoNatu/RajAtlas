# RajAtlas

RajAtlas is a production-ready Rajasthan GK learning app built with React, Vite, and MongoDB Atlas-backed account authentication. It turns districts, regions, geography, economy, polity, history, culture, quizzes, bookmarks, and progress tracking into a visual study flow for exam preparation.

## Features

- Interactive Rajasthan district and region exploration.
- Data-driven geography, economy, politics, history, and culture modules.
- Quiz practice, flashcards, bookmarks, daily challenges, and progress tracking.
- Secure registration, login, account dashboard, email changes, password changes, and account deletion.
- Responsive dashboard-style UI built for repeated study sessions.
- Vercel API routes for MongoDB Atlas-backed user accounts.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- React Router
- Framer Motion
- Recharts
- Lucide React
- MongoDB Node.js driver

## Getting Started

Install dependencies:

```powershell
npm install
```

Run the development server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview the production build:

```powershell
npm run preview
```

Configure authentication for production:

```powershell
$env:MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true&w=majority"
$env:MONGODB_DB="rajatlas"
npm run build
```

For Vercel, add `MONGODB_URI` and optional `MONGODB_DB` in Project Settings -> Environment Variables. The serverless auth layer automatically creates the `users` and `sessions` collections plus required indexes on first use, so a free MongoDB Atlas cluster is enough.

## Project Structure

```text
src/
  components/    Reusable UI, layout, dashboard, learning, quiz, and map components
  data/          Rajasthan GK source data used by the modules and quizzes
  hooks/         localStorage, progress, and quiz state hooks
  pages/         Route-level learning experiences
  utils/         Search, quiz, map, and progress helpers
api/
  auth/          Serverless authentication endpoints
```

## Git Hygiene

The repository should include source code, configuration, `package.json`, and `package-lock.json`. Generated or local-only files are ignored, including `node_modules/`, `dist/`, logs, Edge smoke-test profiles, smoke screenshots, and `graphify-out/` reports/caches.
