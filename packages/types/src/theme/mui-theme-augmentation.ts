// MUI 主题扩展类型定义
// 注意：这些导入在实际使用时需要确保 MUI 包已安装

import type { Theme, ThemeOptions } from '@mui/material/styles';
import type * as React from 'react';

// 自定义阴影类型
export interface CustomShadows {
  z1: string;
  z4: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  primary: string;
  secondary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
  card: string;
  dialog: string;
  dropdown: string;
}

// 扩展调色板类型
export interface GreyExtend {
  0: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface TypeTextExtend {
  primary: string;
  secondary: string;
  disabled: string;
}

export interface CommonColorsExtend {
  black: string;
  white: string;
}

export interface PaletteColorExtend {
  lighter: string;
  darker: string;
}

export interface TypeBackgroundExtend {
  paper: string;
  default: string;
  neutral: string;
}

// 扩展字体类型
export interface FontStyleExtend {
  fontWeightSemiBold: number;
  h1: React.CSSProperties;
  h2: React.CSSProperties;
  h3: React.CSSProperties;
  h4: React.CSSProperties;
  h5: React.CSSProperties;
  h6: React.CSSProperties;
  subtitle1: React.CSSProperties;
  subtitle2: React.CSSProperties;
  body1: React.CSSProperties;
  body2: React.CSSProperties;
  caption: React.CSSProperties;
  overline: React.CSSProperties;
  button: React.CSSProperties;
}

// ----------------------------------------------------------------------

// MUI 主题扩展声明
declare module '@mui/material/styles' {
  interface Theme {
    customLayout: {
      headerHeight: number;
      sidebarWidth: number;
      sidebarCollapsedWidth: number;
      footerHeight: number;
      contentPadding: number;
      showSidebar: boolean;
      sidebarCollapsed: boolean;
      showFooter: boolean;
      outlined?: {
        borderColor: string;
      };
    };
    customShadows: CustomShadows;
  }

  interface ThemeOptions {
    customLayout?: {
      headerHeight?: number;
      sidebarWidth?: number;
      sidebarCollapsedWidth?: number;
      footerHeight?: number;
      contentPadding?: number;
      showSidebar?: boolean;
      sidebarCollapsed?: boolean;
      showFooter?: boolean;
      outlined?: {
        borderColor?: string;
      };
    };
    customShadows?: Partial<CustomShadows>;
  }
}