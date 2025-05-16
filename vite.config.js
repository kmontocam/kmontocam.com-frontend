import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      '/api': {
        /*
         * Proxying backend server through Vite to prevent Access-Control-Allow-Origin issues.
         * Ensure the backend server is running and accessible at the specified URL.
         */
        target: process.env.PROXY_VITE_BACKEND_URL || 'http://localhost:3000', // eslint-disable-line
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
