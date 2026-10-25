# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio and printable CV for vlamoz.me: a single-page React 19 + TypeScript 6 app built with Vite 8 (Rolldown), styled with Tailwind CSS 4, in four languages (en, es, et, ru). Deployed on Vercel. See README.md for setup and where content lives.

## Commands

```bash
npm run dev        # Dev server on port 3000
npm run build      # tsc -b, then vite build (keep the main chunk under Vite's 500 kB warning)
npm run lint       # ESLint 10 (flat config in eslint.config.js)
npm run preview    # Serve the production build
```

Node 20.19+ or 22.12+ is required by Vite 8.

## Architecture

- **Entry**: `src/main.tsx` waits for `i18nReady` before the first render so non-English visitors never see English text.
- **i18n** (`src/i18n.ts`): `LANGUAGES` is the single list of supported languages (switcher labels, hreflang, Open Graph locale all derive from it). English namespaces are bundled eagerly with `import.meta.glob`; other languages load lazily, grouped into one chunk per language by `codeSplitting` in `vite.config.ts`. Detection order: `?lang=` → localStorage `preferredLanguage` → browser languages, with regions stripped. `i18n.on('languageChanged')` is the one place that sets `<html lang>`. Components read the current language from `i18n.resolvedLanguage`; there is no language context.
- **Content data**: `src/data/workExperience.ts` holds language-independent facts (id, company, years, position key, location keys, technologies) plus `formatPeriod` / `formatPosition` / `formatLocations`. Descriptions and highlights live only in `src/locales/<lng>/data.json` under `projects.<id>`. `src/data/skills.ts` stores category keys and names from `src/data/technologies.ts`. `src/data/profile.ts` holds name, email, location and LinkedIn URL.
- **SEO**: `useSEO` (called in `App`) updates title, meta, canonical (keeps `?lang=`), hreflang and JSON-LD per language. `index.html` carries static Open Graph tags for crawlers that don't run JavaScript; keep both in sync.
- **Theme**: `ThemeContext` toggles the `dark` class on `<html>`, initialised from localStorage or the system preference.
- **Animation**: the app is wrapped in `<LazyMotion features={domAnimation} strict>`. Use `m.*` elements from framer-motion, never `motion.*` (strict mode throws).
- **Code cards**: `ProjectPlaceholder` uses `PrismLight` with only the Java grammar registered; snippets are in `CODE_SNIPPETS` keyed by project id.

## Conventions

- Functional components with hooks; shared pieces in `src/components` (`SectionHeader`, `TechTag`, `AnimatedSection`, `ErrorBoundary`).
- Store translation keys in data, not display text. Any user-visible string goes in all four `src/locales/<lng>/` files.
- Tailwind 4: theme tokens (primary green palette, fonts) are in the `@theme` block of `src/index.css`; there is no `tailwind.config.js`. Use `dark:` for dark mode, responsive prefixes mobile-first. Unlayered CSS in `index.css` beats utilities, so keep it to `html`/`body` and the print stylesheet.
- The print stylesheet in `src/index.css` produces the "Download CV" output; check the print preview after layout changes.
- `typescript` is held at 6.0.x because `typescript-eslint` doesn't support 7 yet.
- Environment: `VITE_FORMSPREE_ENDPOINT` (see `.env.example`); `.env` is not committed.

## Using Gemini CLI for Large Codebase Analysis
When analyzing large codebases or multiple files that might exceed context limits, use the Gemini CLI with its massive context window. Use gemini -p to leverage Google Gemini's large context capacity.

### File and Directory Inclusion Syntax
Use the @ syntax to include files and directories in your Gemini prompts. The paths should be relative to WHERE you run the gemini command:

Examples:
Single file analysis: `gemini -p "@src/main.py Explain this file's purpose and structure"`

Multiple files: `gemini -p "@package.json @src/index.js Analyze the dependencies used in the code"`

Entire directory: `gemini -p "@src/ Summarize the architecture of this codebase"`

Multiple directories: `gemini -p "@src/ @tests/ Analyze test coverage for the source code"`

Current directory and subdirectories: `gemini -p "@./ Give me an overview of this entire project"`

Or use --all_files flag:
`gemini --all_files -p "Analyze the project structure and dependencies"`

### Implementation Verification Examples

Check if a feature is implemented: `gemini -p "@src/ @lib/ Has dark mode been implemented in this codebase? Show me the relevant files and functions"`

Verify authentication implementation: `gemini -p "@src/ @middleware/ Is JWT authentication implemented? List all auth-related endpoints and middleware"`

Check for specific patterns: `gemini -p "@src/ Are there any React hooks that handle WebSocket connections? List them with file paths"`

Verify error handling: `gemini -p "@src/ @api/ Is proper error handling implemented for all API endpoints? Show examples of try-catch blocks"`

Check for rate limiting: `gemini -p "@backend/ @middleware/ Is rate limiting implemented for the API? Show the implementation details"`

Verify caching strategy: `gemini -p "@src/ @lib/ @services/ Is Redis caching implemented? List all cache-related functions and their usage"`

Check for specific security measures: `gemini -p "@src/ @api/ Are SQL injection protections implemented? Show how user inputs are sanitized"`

Verify test coverage for features: `gemini -p "@src/payment/ @tests/ Is the payment processing module fully tested? List all test cases"`

## When to Use Gemini CLI

Use gemini -p when:
- Analyzing entire codebases or large directories 
- Comparing multiple large files 
- Need to understand project-wide patterns or architecture 
- Current context window is insufficient for the task 
- Working with files totaling more than 100KB 
- Verifying if specific features, patterns, or security measures are implemented
- Checking for the presence of certain coding patterns across the entire codebase

### Important Notes

Paths in @ syntax are relative to your current working directory when invoking gemini

The CLI will include file contents directly in the context

No need for --yolo flag for read-only analysis

Gemini's context window can handle entire codebases that would overflow Claude's context

When checking implementations, be specific about what you're looking for to get accurate results
