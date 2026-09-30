import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Customer storefront — dev server on port 3001.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: true,
  },
  preview: {
    port: 3001,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query', 'axios'],
        },
      },
    },
  },
});
