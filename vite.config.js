import tailwindcss from '@tailwindcss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { defineConfig } from 'vite';
import fs from 'fs';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  appType: 'mpa',
  plugins: [
    tailwindcss(),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'src/main.js',
          template: 'index.html',
          injectOptions: {
            data: {
              azureIcon: fs.readFileSync('./src/svgs/azure.svg', 'utf8'),
              bashIcon: fs.readFileSync('./src/svgs/bash.svg', 'utf8'),
              cemexIcon: fs.readFileSync('./src/svgs/cemex.svg', 'utf8'),
              dockerIcon: fs.readFileSync('./src/svgs/docker.svg', 'utf8'),
              heyIcon: fs.readFileSync('./src/svgs/hey.svg', 'utf8'),
              kevinIcon: fs.readFileSync('./src/svgs/kevin.svg', 'utf8'),
              kubernetesIcon: fs.readFileSync('./src/svgs/kubernetes.svg', 'utf8'),
              luaIcon: fs.readFileSync('./src/svgs/lua.svg', 'utf8'),
              nginxIcon: fs.readFileSync('./src/svgs/nginx.svg', 'utf8'),
              postgresqlIcon: fs.readFileSync('./src/svgs/postgresql.svg', 'utf8'),
              prometheusIcon: fs.readFileSync('./src/svgs/prometheus.svg', 'utf8'),
              pythonIcon: fs.readFileSync('./src/svgs/python.svg', 'utf8'),
              tecIcon: fs.readFileSync('./src/svgs/tec.svg', 'utf8'),
              tecnologicoDeMonterreyIcon: fs.readFileSync(
                './src/svgs/tecnologico-de-monterrey.svg',
                'utf8',
              ),
              terraformIcon: fs.readFileSync('./src/svgs/terraform.svg', 'utf8'),
              avatar3e060ace: fs.readFileSync(
                './src/svgs/avatars/3e060ace-c01b-4edc-b43f-b25d7bd928c8.svg',
                'utf8',
              ),
              avatar5d88ff89: fs.readFileSync(
                './src/svgs/avatars/5d88ff89-b498-4d59-8cf2-b4f7135a67d6.svg',
                'utf8',
              ),
              avatar8fbdd1cd: fs.readFileSync(
                './src/svgs/avatars/8fbdd1cd-b058-4165-9e0c-ff9c0c587d63.svg',
                'utf8',
              ),
              avatar375ab366: fs.readFileSync(
                './src/svgs/avatars/375ab366-d2ef-4189-b2c0-4c6f90a8716e.svg',
                'utf8',
              ),
              avatar513f8f7e: fs.readFileSync(
                './src/svgs/avatars/513f8f7e-7100-11ee-a443-a605a64952ec.svg',
                'utf8',
              ),
              avatar719c9ff9: fs.readFileSync(
                './src/svgs/avatars/719c9ff9-b333-409d-ad64-32d1470786b7.svg',
                'utf8',
              ),
              avatar911df03a: fs.readFileSync(
                './src/svgs/avatars/911df03a-f51e-467f-b0e8-820df4e76de7.svg',
                'utf8',
              ),
              avatar927ee273: fs.readFileSync(
                './src/svgs/avatars/927ee273-c452-4816-9320-0c9beff6facb.svg',
                'utf8',
              ),
              avatar3091cd69: fs.readFileSync(
                './src/svgs/avatars/3091cd69-44ea-402d-b1e3-8c6814d5b940.svg',
                'utf8',
              ),
              avatara958f17a: fs.readFileSync(
                './src/svgs/avatars/a958f17a-9f9b-4623-9731-a3adf3da02b0.svg',
                'utf8',
              ),
              avatare8645d44: fs.readFileSync(
                './src/svgs/avatars/e8645d44-2d67-4cc5-819e-441becffb719.svg',
                'utf8',
              ),
            },
          },
        },
        {
          entry: 'src/main.js',
          template: 'live.html',
          injectOptions: {
            data: {
              kevinIcon: fs.readFileSync('./src/svgs/kevin.svg', 'utf8'),
            },
          },
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        live: 'live.html',
      },
    },
  },
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
      '/ws': {
        target: process.env.PROXY_VITE_BACKEND_WS_URL || 'ws://localhost:3000', // eslint-disable-line
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, ''),
      },
    },
  },
});
