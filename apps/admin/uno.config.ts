// uno.config.ts
import { defineConfig, presetAttributify, presetWind4 } from 'unocss';
import { presetAnimations } from 'unocss-preset-animations';
import { createResponsiveUnocssConfig } from '@fastest/components/src/theme/unocss-theme';

// 获取统一的主题配置
const { theme, rules, shortcuts, variants } = createResponsiveUnocssConfig();
import { lightDesignTokens } from './src/app/providers/lightTheme'
import { darkDesignTokens } from './src/app/providers/darkTheme'

export default defineConfig({

  presets: [
    presetWind4({
      dark: 'class',
      theme: {
        // 把颜色指向 CSS 变量
        colors: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          background: 'var(--color-background)',
          text: 'var(--color-text)',
        },
        // 也可以在这里扩展 spacing / borderRadius 等
      },
    }), // 默认原子化工具  
    presetAttributify(),
    presetAnimations()
  ],
  // // 2. 预定义快捷方式（可选）
  // shortcuts: [
  //   ['btn-primary', 'bg-primary text-white px-4 py-2 rounded hover:bg-primary/90'],
  //   ['btn-secondary', 'bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90'],
  // ],

  // // 3. preflights：注入根、.dark 下的 CSS 变量
  // preflights: [
  //   {
  //     getCSS: () => `
  //       :root {
  //         --color-primary: ${lightDesignTokens.colors.primary};
  //         --color-secondary: ${lightDesignTokens.colors.secondary};
  //         --color-background: ${lightDesignTokens.colors.background};
  //         --color-text: ${lightDesignTokens.colors.text};
  //       }
  //       .dark {
  //         --color-primary: ${darkDesignTokens.colors.primary};
  //         --color-secondary: ${darkDesignTokens.colors.secondary};
  //         --color-background: ${darkDesignTokens.colors.background};
  //         --color-text: ${darkDesignTokens.colors.text};
  //       }
  //     `,
  //   },
  // ]
});
