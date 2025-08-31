import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Build optimizations for production
  build: {
    // Generate source maps for better debugging
    sourcemap: true,

    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          chess: ['chess.js', 'react-chessboard'],
          ai: ['@anthropic-ai/sdk', '@google/generative-ai', 'openai']
        }
      }
    },

    // Optimize CSS
    cssCodeSplit: true,

    // Minify for smaller bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    }
  },

  // Server configuration for development
  server: {
    port: 5173,
    host: true, // Listen on all addresses for easier development
  },

  // Preview configuration for production builds
  preview: {
    port: 4173,
    host: true
  },

  // Base path for deployment (useful for GitHub Pages or subdirectory deployments)
  base: './'
})
