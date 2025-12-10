import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/gacha': {
        target: 'https://safebooru.org',
        changeOrigin: true,
        rewrite: () => '/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=1girl%20sort:random'
      }
    }
  }
})
