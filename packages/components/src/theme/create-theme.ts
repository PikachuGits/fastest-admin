import type { Theme } from '@mui/material/styles';
import { createTheme as createMuiTheme } from '@mui/material/styles';

import { shadows } from './core/shadows';
import { palette } from './core/palette';
import { themeConfig } from './theme-config';
import { components } from './core/components';
import { typography } from './core/typography';
import { customShadows } from './core/custom-shadows';
import { designTokens, colorTokens, darkColorTokens } from './design-tokens';

import type { ThemeOptions } from './types';

// ----------------------------------------------------------------------

/**
 * 基础主题配置
 * Base Theme Configuration
 * 
 * 这是应用的基础主题配置，包含了所有核心的主题设置：
 * - 🎨 调色板配置（主色、辅助色、语义色等）
 * - 📝 排版系统（字体、字号、行高等）
 * - 🌑 阴影系统（标准阴影和自定义阴影）
 * - 🧩 组件样式覆盖
 * - 📐 自定义布局配置（头部高度、侧边栏宽度等）
 * - 🎛️ CSS 变量支持
 * - 🔗 设计令牌集成（与 UnoCSS 共享相同的设计系统）
 * 
 * 基础主题提供了一套完整的设计系统，可以直接使用，
 * 也可以通过 createTheme 函数进行进一步的自定义。
 * 
 * @constant baseTheme
 * @type {ThemeOptions}
 */
export const baseTheme: ThemeOptions = {
  colorSchemes: {
    light: {
      palette: {
        ...palette.light,
        // 集成设计令牌中的颜色
        primary: {
          main: colorTokens.primary.main,
          light: colorTokens.primary.light,
          dark: colorTokens.primary.dark,
          contrastText: colorTokens.primary.contrastText,
        },
        secondary: {
          main: colorTokens.secondary.main,
          light: colorTokens.secondary.light,
          dark: colorTokens.secondary.dark,
          contrastText: colorTokens.secondary.contrastText,
        },
        success: {
          main: colorTokens.success.main,
          light: colorTokens.success.light,
          dark: colorTokens.success.dark,
          contrastText: colorTokens.success.contrastText,
        },
        warning: {
          main: colorTokens.warning.main,
          light: colorTokens.warning.light,
          dark: colorTokens.warning.dark,
          contrastText: colorTokens.warning.contrastText,
        },
        error: {
          main: colorTokens.error.main,
          light: colorTokens.error.light,
          dark: colorTokens.error.dark,
          contrastText: colorTokens.error.contrastText,
        },
        info: {
          main: colorTokens.info.main,
          light: colorTokens.info.light,
          dark: colorTokens.info.dark,
          contrastText: colorTokens.info.contrastText,
        },
        background: {
          default: colorTokens.background.default,
          paper: colorTokens.background.paper,
        },
        text: {
          primary: colorTokens.text.primary,
          secondary: colorTokens.text.secondary,
          disabled: colorTokens.text.disabled,
        },
        divider: colorTokens.divider,
      },
      shadows: shadows.light,
      customShadows: customShadows.light,
    },
    dark: {
      palette: {
        ...palette.light,
        // 集成设计令牌中的暗色主题颜色
        primary: {
          main: darkColorTokens.primary.main,
          light: darkColorTokens.primary.light,
          dark: darkColorTokens.primary.dark,
          contrastText: darkColorTokens.primary.contrastText,
        },
        secondary: {
          main: darkColorTokens.secondary.main,
          light: darkColorTokens.secondary.light,
          dark: darkColorTokens.secondary.dark,
          contrastText: darkColorTokens.secondary.contrastText,
        },
        success: {
          main: darkColorTokens.success.main,
          light: darkColorTokens.success.light,
          dark: darkColorTokens.success.dark,
          contrastText: darkColorTokens.success.contrastText,
        },
        warning: {
          main: darkColorTokens.warning.main,
          light: darkColorTokens.warning.light,
          dark: darkColorTokens.warning.dark,
          contrastText: darkColorTokens.warning.contrastText,
        },
        error: {
          main: darkColorTokens.error.main,
          light: darkColorTokens.error.light,
          dark: darkColorTokens.error.dark,
          contrastText: darkColorTokens.error.contrastText,
        },
        info: {
          main: darkColorTokens.info.main,
          light: darkColorTokens.info.light,
          dark: darkColorTokens.info.dark,
          contrastText: darkColorTokens.info.contrastText,
        },
        background: {
          default: darkColorTokens.background.default,
          paper: darkColorTokens.background.paper,
        },
        text: {
          primary: darkColorTokens.text.primary,
          secondary: darkColorTokens.text.secondary,
          disabled: darkColorTokens.text.disabled,
        },
        divider: darkColorTokens.divider,
      },
      shadows: shadows.light,
      customShadows: customShadows.light,
    },
  },
  components,
  typography: {
    ...typography,
    // 集成设计令牌中的字体配置
    fontFamily: designTokens.typography.fontFamily.sans.join(', '),
  },
  shape: {
    borderRadius: parseInt(designTokens.borderRadius.base),
  },
  cssVariables: themeConfig.cssVariables,
};

// ----------------------------------------------------------------------

/**
 * 创建主题函数的参数类型
 * 
 * @interface CreateThemeProps
 * @property {ThemeOptions} [themeOverrides] - 可选的主题覆盖配置，用于自定义特定的主题属性
 */
type CreateThemeProps = {
  themeOverrides?: ThemeOptions;
};

/**
 * 创建完整主题
 * 
 * 基于基础主题配置，创建一个完整的 MUI 主题对象。
 * 支持传入自定义配置来覆盖默认设置。
 * 
 * @param props - 主题创建参数
 * @param props.themeOverrides - 可选的主题覆盖配置
 * @returns 完整的 MUI 主题对象
 * 
 * @example
 * ```tsx
 * // 使用默认配置
 * const defaultTheme = createTheme();
 * 
 * // 自定义主色调
 * const customTheme = createTheme({
 *   themeOverrides: {
 *     colorSchemes: {
 *       light: {
 *         palette: {
 *           primary: {
 *             main: '#1976d2',
 *           },
 *         },
 *       },
 *     },
 *   },
 * });
 * 
 * // 自定义布局配置
 * const layoutTheme = createTheme({
 *   themeOverrides: {
 *     customLayout: {
 *       headerHeight: 80,
 *       sidebarWidth: 300,
 *     },
 *   },
 * });
 * ```
 */
export function createTheme({ themeOverrides = {} }: CreateThemeProps = {}): Theme {
  return createMuiTheme(baseTheme, themeOverrides);
}
