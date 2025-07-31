import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Get timestamp for cache busting
const timestamp = new Date().getTime();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Cache busting plugin
    {
      name: 'html-cache-bust',
      transformIndexHtml(html) {
        // Add timestamp as query parameter to all CSS and JS files
        return html.replace(/(href|src)="(\/assets\/[^"]+)"/g, `$1="$2?v=${timestamp}"`);
      },
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    force: true,
  },
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        // Add cache busting to chunk names
        chunkFileNames: `assets/[name]-[hash]-${timestamp}.js`,
        entryFileNames: `assets/[name]-[hash]-${timestamp}.js`,
        assetFileNames: `assets/[name]-[hash]-${timestamp}.[ext]`,
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // Clear cache on startup
  cacheDir: '.vite_cache',
});
