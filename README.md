# RajAtlas

RajAtlas is a local-first Rajasthan GK learning app built with React and Vite. It turns districts, regions, geography, economy, polity, history, culture, quizzes, bookmarks, and progress tracking into a visual study flow for exam preparation.

## Features

- Interactive Rajasthan district and region exploration.
- Data-driven geography, economy, politics, history, and culture modules.
- Quiz practice, flashcards, bookmarks, daily challenges, and local progress tracking.
- Responsive dashboard-style UI built for repeated study sessions.
- Browser-only persistence through localStorage; no backend is required.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- React Router
- Framer Motion
- Recharts
- Lucide React

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

## Project Structure

```text
src/
  components/    Reusable UI, layout, dashboard, learning, quiz, and map components
  data/          Rajasthan GK source data used by the modules and quizzes
  hooks/         localStorage, progress, and quiz state hooks
  pages/         Route-level learning experiences
  utils/         Search, quiz, map, and progress helpers
```

## Git Hygiene

The repository should include source code, configuration, `package.json`, and `package-lock.json`. Generated or local-only files are ignored, including `node_modules/`, `dist/`, logs, Edge smoke-test profiles, smoke screenshots, and `graphify-out/` reports/caches.
