import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  // The pre-render (vite build --ssr) bundles its dependencies so Node doesn't have to resolve their ESM/CJS entry points
  ssr: {
    noExternal: true,
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              // One chunk per lazily loaded language instead of one per namespace file
              // (English is bundled into the main chunk by i18n.ts)
              test: /\/locales\/(?!en\/)\w+\//,
              name: (id) => `locale-${id.match(/\/locales\/(\w+)\//)![1]}`,
            },
          ],
        },
      },
    },
  },
})
