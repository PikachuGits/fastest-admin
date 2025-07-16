// uno.config.ts
import { defineConfig, presetAttributify, presetWind4, presetWind3   } from 'unocss';

export default defineConfig({
  presets: [
    presetWind4(), // 默认原子化工具
    presetAttributify(),
    // presetIcons(),
    // 你也可以加入 presetAttributify() 等
  ],  
  rules: [
    ['animate-spin-slow', { animation: 'spin 5s linear infinite' }],
    ['animate-spin-slower', { animation: 'spin 10s linear infinite' }],
    ['animate-spin-fast', { animation: 'spin 0.5s linear infinite' }],
  ],
});
