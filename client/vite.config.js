import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteHtmlPlugin from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteHtmlPlugin({
      inject: {
        injectData: {
          title: 'Client' // Les données que à injecter dans le template Pug
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
