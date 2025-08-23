import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import path from 'path'
import { vitePluginAppLoading } from '@fastest/plugins'

import { createAliases } from '@fastest/config'; // 使用 exports 中的 vite alias

const repoRoot = path.resolve(__dirname, '../../'); // 根据包所在层级调整
const alias = createAliases(repoRoot, {
  asArray: true,
  extras: {
    '@': path.resolve(__dirname, 'src'),
  }
});

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 9000,
  },
  resolve: {
    alias
  },
  plugins: [vitePluginAppLoading({
    title: '建业管理',
    desc: 'JianYe Management',
    loadingTemplate: 'public/loading.html',
  }), react(), UnoCSS()],
})
