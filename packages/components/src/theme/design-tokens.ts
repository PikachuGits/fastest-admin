/**
 * 设计令牌系统
 * Design Tokens System
 * 
 * 这个模块定义了应用的核心设计令牌，用于在 MUI 主题和 UnoCSS 之间共享一致的设计系统。
 * 通过统一的设计令牌，确保整个应用的视觉一致性和可维护性。
 * 
 * @module design-tokens
 * @version 1.0.0
 * @author Trae AI
 */

// ----------------------------------------------------------------------

/**
 * 颜色令牌
 * Color Tokens
 * 
 * 定义应用中使用的所有颜色值，包括主色、辅助色、语义色等
 */
export const colorTokens = {
  // 主色系 Primary Colors
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // 主色
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  
  // 辅助色系 Secondary Colors
  secondary: {
    50: '#fce4ec',
    100: '#f8bbd9',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63', // 辅助色
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
    main: '#e91e63',
    light: '#ec407a',
    dark: '#ad1457',
    contrastText: '#ffffff',
  },
  
  // 成功色系 Success Colors
  success: {
    50: '#e8f5e8',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50', // 成功色
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
    main: '#4caf50',
    light: '#66bb6a',
    dark: '#2e7d32',
    contrastText: '#ffffff',
  },
  
  // 警告色系 Warning Colors
  warning: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107', // 警告色
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
    main: '#ffc107',
    light: '#ffca28',
    dark: '#ff8f00',
    contrastText: '#000000',
  },
  
  // 错误色系 Error Colors
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336', // 错误色
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
    main: '#f44336',
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#ffffff',
  },
  
  // 信息色系 Info Colors
  info: {
    50: '#e1f5fe',
    100: '#b3e5fc',
    200: '#81d4fa',
    300: '#4fc3f7',
    400: '#29b6f6',
    500: '#03a9f4', // 信息色
    600: '#039be5',
    700: '#0288d1',
    800: '#0277bd',
    900: '#01579b',
    main: '#03a9f4',
    light: '#29b6f6',
    dark: '#0277bd',
    contrastText: '#ffffff',
  },
  
  // 灰度色系 Gray Colors
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // 通用色彩 Common Colors
  common: {
    black: '#000000',
    white: '#ffffff',
  },
  
  // 背景色系 Background Colors
  background: {
    default: '#ffffff',
    paper: '#ffffff',
    neutral: '#f8f9fa',
  },
  
  // 文本色系 Text Colors
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  
  // 分割线色系 Divider Colors
  divider: 'rgba(0, 0, 0, 0.12)',
  
  // 动作色系 Action Colors
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    focus: 'rgba(0, 0, 0, 0.12)',
  },
} as const;

/**
 * 暗色主题颜色令牌
 * Dark Theme Color Tokens
 */
export const darkColorTokens = {
  ...colorTokens,
  
  // 背景色系 Background Colors (Dark)
  background: {
    default: '#121212',
    paper: '#1e1e1e',
    neutral: '#2a2a2a',
  },
  
  // 文本色系 Text Colors (Dark)
  text: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.6)',
    disabled: 'rgba(255, 255, 255, 0.38)',
  },
  
  // 分割线色系 Divider Colors (Dark)
  divider: 'rgba(255, 255, 255, 0.12)',
  
  // 动作色系 Action Colors (Dark)
  action: {
    active: 'rgba(255, 255, 255, 0.54)',
    hover: 'rgba(255, 255, 255, 0.04)',
    selected: 'rgba(255, 255, 255, 0.08)',
    disabled: 'rgba(255, 255, 255, 0.26)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(255, 255, 255, 0.12)',
  },
} as const;

// ----------------------------------------------------------------------

/**
 * 间距令牌
 * Spacing Tokens
 * 
 * 定义应用中使用的所有间距值
 */
export const spacingTokens = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
} as const;

// ----------------------------------------------------------------------

/**
 * 字体令牌
 * Typography Tokens
 * 
 * 定义应用中使用的所有字体相关值
 */
export const typographyTokens = {
  // 字体家族 Font Families
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
  },
  
  // 字体大小 Font Sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem',    // 128px
  },
  
  // 字体粗细 Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // 行高 Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // 字母间距 Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ----------------------------------------------------------------------

/**
 * 阴影令牌
 * Shadow Tokens
 * 
 * 定义应用中使用的所有阴影效果
 */
export const shadowTokens = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// ----------------------------------------------------------------------

/**
 * 圆角令牌
 * Border Radius Tokens
 * 
 * 定义应用中使用的所有圆角值
 */
export const borderRadiusTokens = {
  none: '0px',
  sm: '2px',
  base: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
} as const;

// ----------------------------------------------------------------------

/**
 * 断点令牌
 * Breakpoint Tokens
 * 
 * 定义应用中使用的所有响应式断点
 */
export const breakpointTokens = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
} as const;

// ----------------------------------------------------------------------

/**
 * Z-Index 令牌
 * Z-Index Tokens
 * 
 * 定义应用中使用的所有层级值
 */
export const zIndexTokens = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// ----------------------------------------------------------------------

/**
 * 过渡动画令牌
 * Transition Tokens
 * 
 * 定义应用中使用的所有过渡动画
 */
export const transitionTokens = {
  // 持续时间 Duration
  duration: {
    fastest: '75ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '1000ms',
  },
  
  // 缓动函数 Easing
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // 常用过渡 Common Transitions
  common: {
    fade: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slide: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    scale: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ----------------------------------------------------------------------

/**
 * 设计令牌集合
 * Design Tokens Collection
 * 
 * 导出所有设计令牌的集合，方便统一管理和使用
 */
export const designTokens = {
  colors: colorTokens,
  darkColors: darkColorTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
  shadows: shadowTokens,
  borderRadius: borderRadiusTokens,
  breakpoints: breakpointTokens,
  zIndex: zIndexTokens,
  transitions: transitionTokens,
} as const;

// ----------------------------------------------------------------------

/**
 * 设计令牌类型
 * Design Tokens Types
 */
export type ColorTokens = typeof colorTokens;
export type DarkColorTokens = typeof darkColorTokens;
export type SpacingTokens = typeof spacingTokens;
export type TypographyTokens = typeof typographyTokens;
export type ShadowTokens = typeof shadowTokens;
export type BorderRadiusTokens = typeof borderRadiusTokens;
export type BreakpointTokens = typeof breakpointTokens;
export type ZIndexTokens = typeof zIndexTokens;
export type TransitionTokens = typeof transitionTokens;
export type DesignTokens = typeof designTokens;

// ----------------------------------------------------------------------

/**
 * 获取颜色令牌值
 * Get Color Token Value
 * 
 * @param path - 颜色路径，如 'primary.main' 或 'gray.500'
 * @param isDark - 是否为暗色主题
 * @returns 颜色值
 * 
 * @example
 * ```typescript
 * const primaryColor = getColorToken('primary.main'); // '#1976d2'
 * const grayColor = getColorToken('gray.500', true); // '#9e9e9e'
 * ```
 */
export function getColorToken(path: string, isDark = false): string {
  const tokens = isDark ? darkColorTokens : colorTokens;
  const keys = path.split('.');
  
  let value: any = tokens;
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      console.warn(`Color token not found: ${path}`);
      return '';
    }
  }
  
  return typeof value === 'string' ? value : '';
}

/**
 * 获取间距令牌值
 * Get Spacing Token Value
 * 
 * @param key - 间距键值
 * @returns 间距值
 * 
 * @example
 * ```typescript
 * const spacing = getSpacingToken(4); // '16px'
 * ```
 */
export function getSpacingToken(key: keyof SpacingTokens): string {
  return spacingTokens[key] || '0px';
}

/**
 * 获取字体令牌值
 * Get Typography Token Value
 * 
 * @param category - 字体类别
 * @param key - 字体键值
 * @returns 字体值
 * 
 * @example
 * ```typescript
 * const fontSize = getTypographyToken('fontSize', 'lg'); // '1.125rem'
 * const fontWeight = getTypographyToken('fontWeight', 'bold'); // '700'
 * ```
 */
export function getTypographyToken(
  category: keyof TypographyTokens,
  key: string
): string | string[] {
  const categoryTokens = typographyTokens[category] as any;
  return categoryTokens?.[key] || '';
}