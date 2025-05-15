import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [tailwindcss(), svgLoader()],
});
