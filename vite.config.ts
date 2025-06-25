import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  },
  server: {
    port: 3000,
  },
  build: {
    commonjsOptions: {
      include: [/framer-motion/, /node_modules/]
    }
  }
})
