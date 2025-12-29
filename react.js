import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Create a standardized Vite config for React apps
 * @param {Object} options - Configuration options
 * @param {number} options.port - Dev server port (default: 5173)
 * @param {boolean} options.open - Open browser on start (default: false)
 * @param {Object} options.manualChunks - Additional manual chunks for code splitting
 * @param {string[]} options.excludeDeps - Dependencies to exclude from optimization
 * @param {Array} options.plugins - Additional Vite plugins
 * @returns {import('vite').UserConfig}
 */
export function createReactConfig(options = {}) {
  const {
    port = 5173,
    open = false,
    manualChunks = {},
    excludeDeps = [],
    plugins = []
  } = options;

  return defineConfig({
    plugins: [react(), ...plugins],
    server: {
      port,
      host: true,
      open
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            ...manualChunks
          }
        }
      }
    },
    optimizeDeps: {
      exclude: excludeDeps
    }
  });
}
