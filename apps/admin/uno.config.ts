// uno.config.ts
import { defineConfig, presetAttributify, presetWind3   } from 'unocss';
import { presetAnimations } from 'unocss-preset-animations'

export default defineConfig({
  presets: [
    presetWind3(), // 默认原子化工具
    presetAttributify(),
    presetAnimations()
    // presetIcons(),
    // 你也可以加入 presetAttributify() 等
  ],  
});
