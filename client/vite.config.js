import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Backend running on port 3000
        changeOrigin: true,               // Change the origin of the request to match the target
        secure: false,                   // Set to true if your backend uses HTTPS
        // Remove the `rewrite` function so the full `/api` path gets forwarded
      },
    },
  },
})
