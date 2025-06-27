# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development and Building
- `npm run dev` - Start development server on http://localhost:5173
- `npm run build` - Production build to /dist directory
- `npm run build-with-ts` - TypeScript compilation followed by build
- `npm run preview` - Preview production build locally

### Code Quality and Testing
- `npm run lint` - ESLint code linting
- `npm run lint:md` - Markdown linting for README.md
- `npm test` - Run tests with Vitest in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report

### Deployment
- `npm run deploy` - Deploy to GitHub Pages (runs predeploy build automatically)

## Architecture Overview

### Application Structure
This is a **React 18 + TypeScript + Vite** single-page application focused on divorce planning resources for Ohio residents. The app uses a **sidebar navigation pattern** with modular section components.

### Key Architectural Patterns

**Component Architecture:**
- `App.tsx` - Main application with sidebar navigation and section routing
- `Sidebar.tsx` - Collapsible navigation with categorized sections
- Section components in `/src/components/sections/` - Self-contained tools and resources
- UI components in `/src/components/ui/` - Reusable shadcn/ui-based components

**State Management:**
- Custom `useLocalStorageState` hook for persistent data storage
- All user data stored locally in browser (privacy-first approach)
- No external APIs or user accounts - completely client-side

**Data Export System:**
- `dataExport.ts` - Professional export utilities for legal/mediation use
- Multiple export formats: attorney-friendly text, CSV, JSON backups
- Component-specific export functions with formatted output

### Section Component Categories

1. **Find Direction** - Welcome, assessment, resource mapping
2. **Legal Guidance** - Decision tools, path comparison, professional directory
3. **Financial Planning** - Calculators, asset division, budget tools
4. **Progress Tracking** - Dashboard, timelines, checklists, logs
5. **Family & Relationships** - Co-parenting tools, communication templates
6. **Emotional Support** - Crisis resources, toolkits
7. **Learning Resources** - Educational content, references

### Technology Stack

**Core Framework:**
- React 18 with TypeScript for type safety
- Vite 6.x for fast development and building
- Path alias `@/` maps to `./src/`

**UI and Styling:**
- Tailwind CSS for utility-first styling
- shadcn/ui components (Radix UI primitives)
- Lucide React for consistent iconography
- Custom sage color theme for legal/professional appearance

**State and Data:**
- Custom localStorage hooks for persistence
- Form handling with react-hook-form + Zod validation
- Date handling with date-fns
- Chart rendering with Recharts

**Testing and Quality:**
- Vitest + React Testing Library for component testing
- ESLint with TypeScript rules
- Husky for git hooks and linting

### Development Conventions

**Component Structure:**
- Each section component is self-contained and handles its own state
- Export functionality integrated into each tool
- Consistent use of shadcn/ui components for professional appearance
- Privacy-first design - no external data transmission

**Data Patterns:**
- Use `useLocalStorageState` for persistent component state
- Export functions should use `dataExport.ts` utilities
- Form validation with Zod schemas where applicable
- All financial calculations should include proper formatting and disclaimers

**File Organization:**
```
src/
├── components/
│   ├── sections/           # Main application sections
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   ├── Sidebar.tsx        # Navigation component
│   └── QuickEscape.tsx    # Privacy/safety feature
├── hooks/
│   └── useLocalStorageState.ts  # Persistent state management
├── lib/
│   ├── dataExport.ts      # Export utilities
│   └── ohioChildSupport.ts # State-specific calculations
└── data/                  # Static data and resources
```

### Ohio-Specific Features
- Child support calculations using Ohio guidelines
- County-specific court information and resources
- Ohio legal process guidance (divorce vs dissolution)
- Local resource mapping and professional directories

### Privacy and Security Architecture
- **Quick Escape** button for safety (redirects to neutral site)
- All data stored in browser localStorage only
- No user accounts, tracking, or external data transmission
- CSV template downloads for private record-keeping in user's preferred tools
- Clear disclaimers about educational vs legal advice

### Component Export System
Most section components include professional export functionality using the `dataExport.ts` utilities. When adding new components:
- Implement export functions for attorney/mediation use
- Include formatted output with disclaimers
- Support multiple formats (text, CSV, JSON)
- Follow existing export patterns for consistency

### Deployment Configuration
- GitHub Pages deployment with custom base path
- Production builds include path corrections for subdirectory hosting
- Assets optimized and bundled in `/dist/assets/`

## Working with This Codebase

When modifying existing components, maintain the established patterns for state management, export functionality, and UI consistency. The application prioritizes user privacy and professional utility - ensure any changes support these core principles.

For new section components, follow the existing structure in `App.tsx` routing and `Sidebar.tsx` navigation, and integrate with the export system for professional use cases.