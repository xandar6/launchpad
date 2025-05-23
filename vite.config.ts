import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Image optimization configuration
const imageOptimizerConfig = {
  png: {
    quality: 80,
    compressionLevel: 9,
  },
  jpeg: {
    quality: 80,
    progressive: true,
  },
  jpg: {
    quality: 80,
    progressive: true,
  },
  webp: {
    quality: 80,
    lossless: false,
  },
  avif: {
    quality: 80,
    lossless: false,
  },
  // SVG optimization
  svg: {
    multipass: true,
    // plugins: [  // Temporarily comment out to resolve TS error
    //   {
    //     name: 'preset-default',
    //     params: {
    //       overrides: {
    //         removeViewBox: false,
    //         cleanupNumericValues: {
    //           floatPrecision: 2,
    //         },
    //       },
    //     },
    //   },
    // ],
  },
  // GIF optimization
  // gif: {
  //   optimizationLevel: 3,
  // },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer(imageOptimizerConfig),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunks
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          ui: [
            '@headlessui/react',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
          ],
          // Split animation libraries into their own chunk
          animations: [
            'motion',
          ],
        },
      },
    },
    // Enable source maps for production (can be disabled for smaller builds)
    sourcemap: true,
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
