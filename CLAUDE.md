# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a personal portfolio website built with React, TypeScript, and Vite.

### Core Architecture

- **Frontend Framework**: React 19+ with TypeScript
- **Build Tool**: Vite with Hot Module Replacement (HMR)
- **Styling**: Tailwind CSS with custom color palette and dark mode support
- **Theme Management**: React Context API for light/dark theme switching with localStorage persistence
- **Icons**: Lucide React for consistent iconography
- **Animation**: Framer Motion for smooth animations and transitions

### Key Directories

- `src/components/`: React components organized by functionality (Header, Hero, About, Skills, Projects, Experience, Contact, Footer)
- `src/contexts/`: React Context providers (ThemeContext for theme management)
- `src/data/`: Static data definitions (technologies.ts with standardized tech stack constants)
- `src/types/`: TypeScript type definitions for Project, Experience, and Skill interfaces

## Common Commands

### Development
```bash
npm run dev        # Start development server on port 3000
npm run build      # Build for production (runs TypeScript check + Vite build)
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Key Configuration Files

- **Vite Config**: Custom server port (3000), React plugin, global polyfill
- **TypeScript**: Uses project references with separate app and node configs
- **Tailwind**: Custom color palette with primary green theme, dark mode class strategy
- **ESLint**: TypeScript ESLint with React hooks and refresh plugins

## Development Patterns

### Component Structure
- Components use functional React with hooks
- Theme-aware styling using Tailwind's dark: prefix
- Consistent use of TypeScript interfaces from `src/types/`
- Icons from Lucide React library

### Theme System
- ThemeContext provides theme state and toggle function
- Automatic detection of system preference on first load
- Persistent storage in localStorage
- CSS class-based dark mode implementation

### Technology Standards
- Use constants from `src/data/technologies.ts` for consistent technology naming
- Type-safe technology references using the `Technology` type

### Styling Conventions
- Tailwind utility classes with responsive prefixes (sm:, md:, lg:)
- Custom color palette defined in tailwind.config.js
- Smooth transitions and animations using Tailwind and Framer Motion
- Mobile-first responsive design patterns
