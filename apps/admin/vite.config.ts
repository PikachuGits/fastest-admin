import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
import path from 'path'
import { vitePluginAppLoading } from '@fastest/plugins'
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 9000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vitePluginAppLoading({
    title: '建业管理',
    desc: 'JianYe Management',
    loadingTemplate: 'public/loading.html',
  }), react(), UnoCSS()],
})
