import { StrictMode } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import { i18nReady } from './i18n'
import App from './App.tsx'

i18nReady.finally(() => {
  // Replaces the pre-rendered HTML (served for crawlers and the first paint) with the live app.
  // A plain render, not hydration: theme and language can differ from what the build rendered
  flushSync(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
  // Set by the pre-render's inline script when the visitor's language differs from the page's
  document.documentElement.classList.remove('lang-pending')
})
