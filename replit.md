# Overview

This is a full-stack web application built with React, Express, and TypeScript. The project appears to be a landing page for "Flexbot," a support/ticketing system with services for projects, tickets, bugs, and improvements. The application uses a modern tech stack with Vite for build tooling, shadcn/ui for UI components, and Drizzle ORM for database management.

The application follows a monorepo structure with separate client and server directories, sharing common schemas and types through a shared directory.

# User Preferences

- Preferred communication style: Simple, everyday language in Portuguese (Brazilian Portuguese)
- Design preference: Minimalist aesthetics with clean layouts and ample spacing

# Recent Changes

## October 3, 2025 - Amber Glow Buttons & Cards Update (Latest)
- Fixed animation overflow issue: added `overflow: hidden` to contain glow effects within button boundaries
- Applied amber glow design to service cards (Projeto, Chamado, Bug, Melhoria)
- Created `.glow-card` class with same animation system as buttons
- Card features: 200px height, rounded corners (10px), amber background, conic-gradient halo
- Card hover: scale(1.02), translateY(-2px), linear gradient background, animated glow
- Removed shadcn Card components in favor of pure CSS glow implementation
- Cleaned up unused imports (Card, CardContent, React, FaCheck)
- Both buttons and cards now share consistent amber color palette and animation behavior
- All animations properly contained within element boundaries without visual overflow

## October 3, 2025 - Glow Buttons and Hero Images Update
- Updated hero carousel images: replaced img1 and img2 with new versions (PROJETOS and MELHORIAS)
- Implemented glow button effect across all pages following provided HTML/CSS example
- All buttons now feature animated gradient glow with cyan border and hover effects
- Glow buttons include smooth transitions, hover opacity animation, and active state scaling
- Added @keyframes glowRotate animation for continuous 6s rotating gradient effect
- Updated buttons in LandingPageFlexbot.tsx: "Saber mais" (3x), "Acessar portfolio", "Contribuir agora"
- Updated button in BugPage.tsx: "Abrir chamado"
- Removed motion.button components in favor of pure CSS glow effect with .glow-btn class

## October 3, 2025 - GitHub Import to Replit (Fresh Clone)
- Successfully cloned and configured GitHub project for Replit environment
- All dependencies already installed and working correctly (479 packages)
- Vite dev server already properly configured with `allowedHosts: true` for Replit proxy compatibility
- Application serving on 0.0.0.0:5000 with proper HMR (Hot Module Replacement) connection
- Workflow "Start application" configured with webview output type and port 5000
- Deployment already configured for autoscale with npm build and start scripts
- Both pages verified working: Landing page (/) and Bug page (/bug)
- Application tested and running successfully with all features functional
- Uses in-memory storage (MemStorage) for data persistence

## October 2, 2025 - Replit Environment Setup
- Successfully imported GitHub project and configured for Replit environment
- Verified all dependencies installed correctly (479 packages)
- Confirmed Vite dev server properly configured with `allowedHosts: true` for Replit proxy compatibility
- Verified application serving on 0.0.0.0:5000 with proper HMR (Hot Module Replacement) connection
- Configured workflow "Start application" with webview output type and port 5000
- Deployment configured for autoscale with npm build and start scripts
- Application tested and running successfully with all features working
- Uses in-memory storage (MemStorage) for data persistence

## October 2, 2025 - Hero Carousel and 3D Buttons Update
- Implemented infinite loop carousel with horizontal scroll where images are seamlessly connected without gaps
- Carousel uses duplicated slide set with intelligent reset mechanism after transition completes (800ms)
- Reset happens instantly without visible animation using requestAnimationFrame for smooth loop
- Redesigned all buttons with 3D minimalist style using shadow depth effect
- Button shadows create physical depth: primary shadow for 3D effect, secondary shadow for ambient lighting
- Interactive button animations: lift on hover (y: -2), press down on tap (y: 2)
- Maintained original color palette: #9e090f (red), #f5ad11 (yellow), #d69810 (dark yellow), #7a0000 (dark red)
- Removed unused imports (Button component, buttonImage asset, AnimatePresence, useRef)
- All buttons now have consistent 3D styling across the entire landing page

## October 2, 2025 - Bug Category Page Implementation
- Created new BugPage.tsx with three main sections following the design specification
- Hero section: red background with "O QUE É UM BUG?" title and bug illustration in yellow rounded card
- Instructions section: white background with purple icon, "COMO INSTRUIR A ABERTURA DO CHAMADO" title, and yellow 3D CTA button
- Footer section: red background with "VEJA OUTRAS CATEGORIAS" title and three placeholder cards
- Added /bug route to application router in App.tsx
- Implemented navigation from landing page service cards using wouter's useLocation hook
- Bug card on landing page now redirects to /bug when clicked
- Maintained design consistency with same color palette and 3D button styling throughout

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