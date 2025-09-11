/**
 * VITE CONFIG — build & dev server settings.
 * You can set proxies here if you want /api to forward to Django. 
 * Tool which bundles everything and make it run faster.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
})
