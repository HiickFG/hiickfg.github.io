import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "./src/styles/general/variables.less";`
      }
    }
  },
  plugins: [react()],
})