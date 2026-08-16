import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// GitHub Pages serves a project site from /<repo-name>/, so assets need that prefix.
// The Pages workflow sets VITE_BASE_PATH; a custom domain would set it to '/'.
const base = process.env.VITE_BASE_PATH || '/my-website/';

export default defineConfig(() => {
  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
