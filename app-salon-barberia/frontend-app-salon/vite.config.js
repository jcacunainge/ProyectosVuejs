import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import WindiCSS from 'vite-plugin-windicss'; // Agrega este import para WindiCSS

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // WindiCSS(), // Agrega el plugin de WindiCSS aquí
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
