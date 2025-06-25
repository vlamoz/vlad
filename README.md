# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features a clean design with dark/light theme support and smooth animations.

## Tech Stack

- **Frontend**: React 19+ with TypeScript
- **Build Tool**: Vite with Hot Module Replacement (HMR)
- **Styling**: Tailwind CSS with custom color palette
- **Theme**: Dark/Light mode with system preference detection
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Internationalization**: React i18next

## Features

- 🌙 Dark/Light theme toggle with localStorage persistence
- 📱 Fully responsive design (mobile-first approach)
- ⚡ Fast development with Vite HMR
- 🎨 Custom Tailwind CSS configuration
- 🔄 Smooth animations and transitions
- 🌍 Multi-language support ready
- 🎯 Type-safe with TypeScript

## Project Structure

```
src/
├── components/     # React components (Header, Hero, About, Skills, etc.)
├── contexts/       # React Context providers (ThemeContext)
├── data/          # Static data (technologies.ts)
└── types/         # TypeScript type definitions
```

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev        # Start development server on port 3000
npm run build      # Build for production (TypeScript check + Vite build)
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Development Patterns

- **Components**: Functional React with hooks
- **Styling**: Tailwind utilities with dark: prefix for theme support
- **Type Safety**: TypeScript interfaces from `src/types/`
- **Icons**: Lucide React library for consistent iconography
- **Theme**: Context-based theme management with automatic system detection
