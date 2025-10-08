# Overview

This is a full-stack web application, "Flexbot," designed as a support/ticketing system with features for projects, tickets, bugs, and improvements. It leverages React, Express, and TypeScript within a monorepo structure, using Vite for building, shadcn/ui for UI, and Drizzle ORM for database management. The project aims to provide a comprehensive, multi-stage ticket creation system and a complete Kanban board for ticket management, inspired by Trello.

# User Preferences

- Preferred communication style: Simple, everyday language in Portuguese (Brazilian Portuguese)
- Design preference: Minimalist aesthetics with clean layouts and ample spacing

# System Architecture

## Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as the build tool
- Wouter for client-side routing
- TanStack Query for server state management
- Tailwind CSS for styling
- shadcn/ui component library (New York style variant)
- Framer Motion for animations
- @dnd-kit/core and @dnd-kit/sortable for drag-and-drop functionality in Kanban

**Design Decisions:**
- Uses shadcn/ui for accessible, customizable components built on Radix UI.
- Employs Tailwind utility classes with CSS variables for styling.
- TanStack Query manages server state; React hooks manage local state.
- Wouter provides a lightweight routing solution.
- Multi-stage ticket creation wizard with 12 steps, animated transitions, and persistent data on navigation.
- Complete Kanban system with drag-and-drop, filtering, and detailed ticket modals.
- Consistent design language with specific color palettes, glow effects for buttons and cards, and 3D minimalist button styles.

## Backend Architecture

**Technology Stack:**
- Node.js with Express
- TypeScript for type safety
- Drizzle ORM for database operations
- PostgreSQL via Neon serverless driver

**Design Decisions:**
- Implements a storage interface pattern (`IStorage`) with an in-memory implementation (`MemStorage`) for flexible storage backend switching.
- All API routes are prefixed with `/api`.
- Vite middleware is used for HMR and SPA routing in development.
- Custom middleware logs API requests for debugging.
- Extensible ticket schema to support Kanban features like status, priority, assignee, comments, and history.

## Data Storage

**Database Schema:**
- PostgreSQL configured as the primary database dialect.
- Drizzle ORM provides type-safe database queries and schema management.
- Schema is defined in `shared/schema.ts` for shared access between client and server.
- Uses Zod schemas for runtime validation of insert operations.

**Migration Strategy:**
- Migrations are managed using `drizzle-kit push` and stored in the `./migrations` directory.

# External Dependencies

**Third-Party Services:**
- Neon Database: Serverless PostgreSQL database platform.

**UI Component Libraries:**
- Radix UI: Headless UI primitives.
- shadcn/ui: Pre-built components using Radix UI and Tailwind CSS.
- Embla Carousel: Carousel/slider functionality.
- cmdk: Command palette component.
- Framer Motion: Animation library.
- @dnd-kit/core & @dnd-kit/sortable: Drag-and-drop for Kanban.

**Development Tools:**
- ESBuild: Bundles server code.
- tsx: TypeScript execution for development server.
- Drizzle Kit: Database schema management and migrations.

**Utilities:**
- date-fns: Date manipulation.
- class-variance-authority & clsx: Conditional CSS class management.
- nanoid: Unique ID generation.
- zod: Schema validation.