/**
 * UnoCSS 主题配置
 * UnoCSS Theme Configuration
 * 
 * 这个模块将设计令牌转换为 UnoCSS 可以使用的主题配置，
 * 确保 UnoCSS 和 MUI 主题系统使用相同的设计令牌。
 * 
 * @module unocss-theme
 * @version 1.0.0
 * @author Trae AI
 */

import {
  colorTokens,
  darkColorTokens,
  spacingTokens,
  typographyTokens,
  shadowTokens,
  borderRadiusTokens,
  breakpointTokens,
  zIndexTokens,
  transitionTokens,
} from './design-tokens';

// ----------------------------------------------------------------------

/**
 * 将颜色令牌转换为 UnoCSS 格式
 * Convert color tokens to UnoCSS format
 */
function convertColorsToUnoCSS(colors: typeof colorTokens) {
  const result: Record<string, any> = {};

  // 处理主色系
  Object.entries(colors.primary as Record<string, any>).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[`primary-${key}`] = value;
    }
  });

  // 处理辅助色系
  Object.entries(colors.secondary as Record<string, any>).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[`secondary-${key}`] = value;
    }
  });

  // 处理成功色系
  Object.entries(colors.success as Record<string, any>).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[`success-${key}`] = value;
    }
  });

  // 处理警告色系
  Object.entries(colors.warning as Record<string, any>).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[`warning-${key}`] = value;
    }
  });

  // 处理错误色系
  Object.entries(colors.error as Record<string, any>).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[`error-${key}`] = value;
    }
  });

  // 处理信息色系
  Object.entries(colors.info as Record<string, any>).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[`info-${key}`] = value;
    }
  });

  // 处理灰度色系
  Object.entries(colors.gray as Record<string, any>).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[`gray-${key}`] = value;
    }
  });

  // 处理通用色彩
  result.black = colors.common.black;
  result.white = colors.common.white;

  // 处理背景色
  result['bg-default'] = colors.background.default;
  result['bg-paper'] = colors.background.paper;
  result['bg-neutral'] = colors.background.neutral;

  // 处理文本色
  result['text-primary'] = colors.text.primary;
  result['text-secondary'] = colors.text.secondary;
  result['text-disabled'] = colors.text.disabled;

  // 处理分割线色
  result.divider = colors.divider;

  return result;
}

/**
 * 将间距令牌转换为 UnoCSS 格式
 * Convert spacing tokens to UnoCSS format
 */
function convertSpacingToUnoCSS(spacing: typeof spacingTokens) {
  const result: Record<string, string> = {};

  Object.entries(spacing).forEach(([key, value]) => {
    result[key] = value;
  });

  return result;
}

/**
 * 将字体令牌转换为 UnoCSS 格式
 * Convert typography tokens to UnoCSS format
 */
function convertTypographyToUnoCSS(typography: typeof typographyTokens) {
  return {
    fontFamily: {
      sans: typography.fontFamily.sans,
      serif: typography.fontFamily.serif,
      mono: typography.fontFamily.mono,
    },
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeight,
    lineHeight: typography.lineHeight,
    letterSpacing: typography.letterSpacing,
  };
}

/**
 * 将阴影令牌转换为 UnoCSS 格式
 * Convert shadow tokens to UnoCSS format
 */
function convertShadowsToUnoCSS(shadows: typeof shadowTokens) {
  return shadows;
}

/**
 * 将圆角令牌转换为 UnoCSS 格式
 * Convert border radius tokens to UnoCSS format
 */
function convertBorderRadiusToUnoCSS(borderRadius: typeof borderRadiusTokens) {
  return borderRadius;
}

/**
 * 将断点令牌转换为 UnoCSS 格式
 * Convert breakpoint tokens to UnoCSS format
 */
function convertBreakpointsToUnoCSS(breakpoints: typeof breakpointTokens) {
  return breakpoints;
}

// ----------------------------------------------------------------------

/**
 * UnoCSS 亮色主题配置
 * UnoCSS Light Theme Configuration
 */
export const unocssLightTheme = {
  colors: convertColorsToUnoCSS(colorTokens),
  spacing: convertSpacingToUnoCSS(spacingTokens),
  ...convertTypographyToUnoCSS(typographyTokens),
  boxShadow: convertShadowsToUnoCSS(shadowTokens),
  borderRadius: convertBorderRadiusToUnoCSS(borderRadiusTokens),
  screens: convertBreakpointsToUnoCSS(breakpointTokens),
  zIndex: zIndexTokens,
  transitionDuration: transitionTokens.duration,
  transitionTimingFunction: transitionTokens.easing,
};

/**
 * UnoCSS 暗色主题配置
 * UnoCSS Dark Theme Configuration
 */
export const unocssDarkTheme = {
  colors: convertColorsToUnoCSS(darkColorTokens as any),
  spacing: convertSpacingToUnoCSS(spacingTokens),
  ...convertTypographyToUnoCSS(typographyTokens),
  boxShadow: convertShadowsToUnoCSS(shadowTokens),
  borderRadius: convertBorderRadiusToUnoCSS(borderRadiusTokens),
  screens: convertBreakpointsToUnoCSS(breakpointTokens),
  zIndex: zIndexTokens,
  transitionDuration: transitionTokens.duration,
  transitionTimingFunction: transitionTokens.easing,
};

/**
 * UnoCSS 主题配置
 * UnoCSS Theme Configuration
 * 
 * 提供完整的 UnoCSS 主题配置，包括亮色和暗色主题
 */
export const unocssTheme = {
  // 默认使用亮色主题
  ...unocssLightTheme,

  // 暗色主题配置
  dark: unocssDarkTheme,
};

// ----------------------------------------------------------------------

/**
 * UnoCSS 自定义规则
 * UnoCSS Custom Rules
 * 
 * 定义一些基于设计令牌的自定义 UnoCSS 规则
 */
export const unocssCustomRules = [
  // 主题色背景规则
  [/^bg-theme-(.+)$/, ([, color]: string[]) => {
    const colorValue = color ? ((unocssTheme.colors as any)[`primary-${color}`] || (unocssTheme.colors as any)[color]) : undefined;
    return colorValue ? { 'background-color': colorValue } : undefined;
  }],

  // 主题色文本规则
  [/^text-theme-(.+)$/, ([, color]: string[]) => {
    const colorValue = color ? ((unocssTheme.colors as any)[`primary-${color}`] || (unocssTheme.colors as any)[color]) : undefined;
    return colorValue ? { color: colorValue } : undefined;
  }],

  // 主题色边框规则
  [/^border-theme-(.+)$/, ([, color]: string[]) => {
    const colorValue = color ? ((unocssTheme.colors as any)[`primary-${color}`] || (unocssTheme.colors as any)[color]) : undefined;
    return colorValue ? { 'border-color': colorValue } : undefined;
  }],

  // 语义色背景规则
  [/^bg-semantic-(.+)$/, ([, semantic]: string[]) => {
    const colorValue = (unocssTheme.colors as any)[`${semantic}-main`];
    return colorValue ? { 'background-color': colorValue } : undefined;
  }],

  // 语义色文本规则
  [/^text-semantic-(.+)$/, ([, semantic]: string[]) => {
    const colorValue = (unocssTheme.colors as any)[`${semantic}-main`];
    return colorValue ? { color: colorValue } : undefined;
  }],
] as any[];

// ----------------------------------------------------------------------

/**
 * UnoCSS 自定义快捷方式
 * UnoCSS Custom Shortcuts
 * 
 * 定义一些常用的样式组合快捷方式
 */
export const unocssShortcuts = {
  // 按钮样式
  'btn-primary': '!bg-primary-main !text-white px-4 py-2 rounded-md hover:!bg-primary-dark transition-colors',
  'btn-secondary': '!bg-secondary-main !text-white px-4 py-2 rounded-md hover:!bg-secondary-dark transition-colors',
  'btn-success': 'bg-success-main text-white px-4 py-2 rounded-md hover:bg-success-dark transition-colors',
  'btn-warning': 'bg-warning-main text-black px-4 py-2 rounded-md hover:bg-warning-dark transition-colors',
  'btn-error': 'bg-error-main text-white px-4 py-2 rounded-md hover:bg-error-dark transition-colors',
  'btn-outline': 'border border-primary-main text-primary-main px-4 py-2 rounded-md hover:bg-primary-main hover:text-white transition-colors',

  // 卡片样式
  'card': 'bg-white rounded-lg shadow-md p-6',
  'card-hover': 'card hover:shadow-lg transition-shadow',

  // 输入框样式
  'input': 'border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent',
  'input-error': 'input border-error-main focus:ring-error-main',

  // 文本样式
  'text-heading': 'text-2xl font-bold text-gray-900',
  'text-subheading': 'text-lg font-semibold text-gray-700',
  'text-body': 'text-base text-gray-600',
  'text-caption': 'text-sm text-gray-500',

  // 布局样式
  'container-center': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  'flex-center': 'flex items-center justify-center',
  'flex-between': 'flex items-center justify-between',

  // 响应式间距
  'spacing-section': 'py-12 md:py-16 lg:py-20',
  'spacing-component': 'py-6 md:py-8',
} as const;

// ----------------------------------------------------------------------

/**
 * 获取 UnoCSS 完整配置
 * Get Complete UnoCSS Configuration
 * 
 * @param isDark - 是否为暗色主题
 * @returns UnoCSS 配置对象
 * 
 * @example
 * ```typescript
 * import { getUnocssConfig } from '@fastest/components/theme';
 * 
 * // 在 uno.config.ts 中使用
 * export default defineConfig({
 *   theme: getUnocssConfig().theme,
 *   rules: getUnocssConfig().rules,
 *   shortcuts: getUnocssConfig().shortcuts,
 * });
 * ```
 */
export function getUnocssConfig(isDark = false) {
  return {
    theme: isDark ? unocssDarkTheme : unocssLightTheme,
    rules: unocssCustomRules,
    shortcuts: unocssShortcuts,
  };
}

/**
 * 创建响应式 UnoCSS 配置
 * Create Responsive UnoCSS Configuration
 * 
 * @returns 包含响应式主题切换的 UnoCSS 配置
 * 
 * @example
 * ```typescript
 * import { createResponsiveUnocssConfig } from '@fastest/components/theme';
 * 
 * // 在 uno.config.ts 中使用
 * export default defineConfig({
 *   ...createResponsiveUnocssConfig(),
 * });
 * ```
 */
export function createResponsiveUnocssConfig() {
  return {
    theme: unocssTheme,
    rules: [
      ...unocssCustomRules,
      // 暗色主题规则
      [/^dark:(.+)$/, ([, selector]: string[]) => {
        return {
          [`@media (prefers-color-scheme: dark)`]: {
            [`.${selector}`]: {},
          },
        };
      }],
    ] as any[],
    shortcuts: unocssShortcuts,
    variants: [
      // 暗色主题变体
      (matcher: string): any => {
        if (!matcher.startsWith('dark:')) return matcher;
        return {
          matcher: matcher.slice(5),
          selector: (s: string) => `@media (prefers-color-scheme: dark) { ${s} }`,
        };
      },
    ],
  };
}

// ----------------------------------------------------------------------

/**
 * 导出类型定义
 * Export Type Definitions
 */
export type UnocssTheme = typeof unocssTheme;
export type UnocssLightTheme = typeof unocssLightTheme;
export type UnocssDarkTheme = typeof unocssDarkTheme;
export type UnocssCustomRules = typeof unocssCustomRules;
export type UnocssShortcuts = typeof unocssShortcuts;