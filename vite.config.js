import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:8080',  // 后端API地址
        target: 'https://sso.punengshuo.com',  // 后端API地址
        changeOrigin: true,
      }
    }
  }
})
