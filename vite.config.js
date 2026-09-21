import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ruta base del hosting. En GitHub Pages es '/rodamarsrl-web/'; con dominio propio, SITE_BASE=/
  base: process.env.SITE_BASE || '/rodamarsrl-web/',
})
