import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // String shorthand: `/api` -> `http://jsonplaceholder.typicode.com/posts`
      '/api': {
        target: 'https://safebooru.org', // Target API yang sebenarnya
        changeOrigin: true, // Diperlukan untuk virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Hapus /api dari path
      },
    }
  }
})
