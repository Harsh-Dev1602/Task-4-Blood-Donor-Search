import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
     tailwindcss(),
  ],
   server: {
    port: 3002,
    proxy: {
      "/api": {
        target: "https://blood-donor-backend-tx6x.onrender.com",
        changeOrigin: true,
      },
    },
  }
})
