import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: 'sites/portfolio/',
  build: {
    outDir: '../../sites/portfolio',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Only rename CSS files, leave others (like images/fonts) as default
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/css/style.css'
          }
          return assetInfo.name ? assetInfo.name : '[name][extname]'
        }
      }
    }
  },
})
