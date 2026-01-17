# Elkostart Vehicle Wrap Design Agency

## Overview

This is a portfolio website for a vehicle wrap design agency called "Fast Signs & Wraps" / "Elkostart". The application showcases custom vehicle wrap designs and allows potential customers to submit inquiries. It's a design-only agency (no print/install services), focusing on commercial fleets, color changes, racing liveries, and itasha art.

The application is a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion with react-intersection-observer for scroll-triggered effects
- **Build Tool**: Vite

The frontend follows a page-based structure with three main routes:
- Home (`/`) - Hero, About, Services, and Featured Projects sections
- Portfolio (`/portfolio`) - Full project gallery
- Contact (`/contact`) - Inquiry submission form

Custom hooks (`use-projects.ts`, `use-inquiries.ts`) encapsulate API interactions using React Query.

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with tsx for development
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts`
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

The server uses a storage layer pattern (`server/storage.ts`) that abstracts database operations, making it easier to test or swap implementations.

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Drizzle table definitions and Zod validation schemas
- `routes.ts` - API route definitions with type-safe request/response schemas

### Database Schema
Two main tables:
- **projects** - Portfolio items with title, description, imageUrl, category, and createdAt
- **inquiries** - Contact form submissions with name, email, message, and createdAt

### Build System
- Development: Vite dev server with HMR, proxied through Express
- Production: Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Database migrations: Drizzle Kit with `db:push` command

## External Dependencies

### Database
- **PostgreSQL** - Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM** - Type-safe database access with `drizzle-kit` for migrations

### UI Components
- **shadcn/ui** - Pre-built accessible component library (configured in `components.json`)
- **Radix UI** - Headless UI primitives underlying shadcn components
- **Lucide React** - Icon library

### Frontend Libraries
- **TanStack React Query** - Async state management and caching
- **Framer Motion** - Animation library
- **react-hook-form** + **zod** - Form handling with schema validation
- **tailwind-merge** + **clsx** - CSS class utilities

### Fonts
- Google Fonts: Racing Sans One (display), Exo 2 (body), plus additional fonts loaded in `index.html`