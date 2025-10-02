# Overview

This is a full-stack web application built with React, Express, and TypeScript. The project appears to be a landing page for "Flexbot," a support/ticketing system with services for projects, tickets, bugs, and improvements. The application uses a modern tech stack with Vite for build tooling, shadcn/ui for UI components, and Drizzle ORM for database management.

The application follows a monorepo structure with separate client and server directories, sharing common schemas and types through a shared directory.

# User Preferences

- Preferred communication style: Simple, everyday language in Portuguese (Brazilian Portuguese)
- Design preference: Minimalist aesthetics with clean layouts and ample spacing

# Recent Changes

## October 2, 2025 - Hero Carousel Redesign
- Restructured hero carousel from vertical layout to horizontal layout (image left, content right)
- Added large background titles (PROJETOS, MELHORIAS, BUG, CHAMADOS) with semi-transparent overlay behind hero images
- Repositioned CTA button to appear below descriptive text for better visual hierarchy
- Updated header logo from image to text-based "redeFlex" for cleaner appearance
- Replaced hero carousel images with 4 new category-specific images
- Maintained smooth slide transitions (4-second intervals) and responsive design across all breakpoints

# System Architecture

## Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as the build tool and dev server
- Wouter for client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS for styling
- shadcn/ui component library (New York style variant)
- Framer Motion for animations

**Design Decisions:**
- **Component Library:** Uses shadcn/ui, which provides accessible, customizable components built on Radix UI primitives. This allows for consistent UI patterns while maintaining flexibility.
- **Styling Approach:** CSS-in-JS is avoided in favor of Tailwind utility classes with CSS variables for theming, enabling easy customization and smaller bundle sizes.
- **State Management:** TanStack Query handles server state with configured defaults (no refetch on window focus, infinite stale time), while local state is managed with React hooks.
- **Routing:** Wouter provides a lightweight routing solution (~1KB) compared to React Router, suitable for simpler applications.

## Backend Architecture

**Technology Stack:**
- Node.js with Express
- TypeScript for type safety
- Drizzle ORM for database operations
- PostgreSQL via Neon serverless driver

**Design Decisions:**
- **Database Layer:** Implements a storage interface pattern (`IStorage`) with an in-memory implementation (`MemStorage`). This abstraction allows for easy switching between different storage backends (memory, PostgreSQL, etc.) without changing application code.
- **API Structure:** All API routes are prefixed with `/api` to clearly separate API endpoints from static assets and frontend routes.
- **Development Setup:** Uses Vite middleware in development for HMR and SPA routing, while production serves static files from the build output.
- **Request Logging:** Custom middleware logs API requests with duration and response data (truncated to 80 chars) for debugging.

## Data Storage

**Database Schema:**
- **PostgreSQL** configured as the primary database dialect
- **Drizzle ORM** provides type-safe database queries and schema management
- **Schema Location:** `shared/schema.ts` contains the database schema shared between client and server
- **Current Schema:** Basic user table with UUID primary keys, username, and password fields
- **Validation:** Uses Zod schemas (via drizzle-zod) for runtime validation of insert operations

**Migration Strategy:**
- Migrations stored in `./migrations` directory
- Uses `drizzle-kit push` command for schema synchronization
- Database URL must be provided via `DATABASE_URL` environment variable

## External Dependencies

**Third-Party Services:**
- **Neon Database:** Serverless PostgreSQL database platform (via `@neondatabase/serverless` driver)
- **Replit Plugins:** Development tools including cartographer, dev banner, and runtime error modal (development only)

**UI Component Libraries:**
- **Radix UI:** Headless UI primitives for accessibility (accordion, dialog, dropdown, etc.)
- **shadcn/ui:** Pre-built components using Radix UI and Tailwind CSS
- **Embla Carousel:** Carousel/slider functionality
- **cmdk:** Command palette component
- **Framer Motion:** Animation library for interactive UI elements

**Development Tools:**
- **ESBuild:** Bundles server code for production
- **tsx:** TypeScript execution for development server
- **Drizzle Kit:** Database schema management and migrations

**Session Management:**
- **connect-pg-simple:** PostgreSQL session store (dependency present but not yet implemented in code)

**Utilities:**
- **date-fns:** Date manipulation and formatting
- **class-variance-authority & clsx:** Conditional CSS class management
- **nanoid:** Unique ID generation
- **zod:** Schema validation