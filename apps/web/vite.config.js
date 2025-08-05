import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 直接导入源码
import { vitePluginAppLoading } from '@fastest/plugins'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginAppLoading({ title: '建业管理平台' })],
  resolve: {  
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
