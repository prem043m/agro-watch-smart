# Frontend - Agro-Watch Smart

React + TypeScript frontend application for the Agro-Watch Smart agricultural monitoring system.

## Setup

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start Vite dev server (http://localhost:5173)
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - ESLint code quality check

## Project Structure

```
src/
├── main.tsx              # React entry point
├── App.tsx               # Main router & providers
├── components/
│   ├── DashboardLayout.tsx
│   └── ui/               # shadcn-ui components
├── pages/                # Page components
├── hooks/                # Custom React hooks
└── lib/                  # Utilities & mock data
```

## Key Features

- React 18.3 with TypeScript
- Vite for fast development
- Tailwind CSS styling
- shadcn-ui component library
- React Router for navigation
- React Query for server state
- Recharts for data visualization

## Development

See root [README.md](../README.md) for full setup instructions.
