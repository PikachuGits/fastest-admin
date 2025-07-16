// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  // ⬇️ 手动 copy 模板或用 postbuild 脚本
  // publicDir 无法用于 src 目录，所以：
  onSuccess: 'cp src/inject-app-loading/default-loading.html dist/',
});