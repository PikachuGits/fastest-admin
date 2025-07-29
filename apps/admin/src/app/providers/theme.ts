// src/app/providers/theme.ts
import { createTheme } from '@mui/material/styles';
import {
  BASE_SPACING_UNIT,
  lightPalette,
  darkPalette,
  sharedTokens
} from '@/theme/design-tokens';

// 定义一个基础配置，包含所有共享的规范
const baseThemeOptions = {
  spacing: BASE_SPACING_UNIT,
  breakpoints: sharedTokens.breakpoints,
  shape: sharedTokens.shape,
  typography: sharedTokens.typography,
  customLayout: {
    headerHeight: 64,
    sidebarWidth: 300,
    sidebarCollapsedWidth: 64,
    footerHeight: 48,
    contentPadding: 24,
    showSidebar: true,
    sidebarCollapsed: false,
    showFooter: true,
    outlined: {
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
  // 你可以在这里定义 components 的默认样式
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            // boxShadow: '0 0 0 2px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // textTransform: 'none' as const, // 例如，全局禁用按钮大写
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          // 默认状态
          backgroundColor: '#f5f5f5',
          color: '#333',
          // hover 状态
          '&:hover': {
            backgroundColor: '#000',
            boxShadow: '0 0 0 2px rgba(0,0,0,0.9)',
          },

          // 选中（active）状态
          '&.Mui-selected, &.MuiButton-contained:active': {
            backgroundColor: '#1976d2',
            color: '#fff',
          },

          // focus 状态
          '&:focus': {
            outline: '2px solid #000',
          },
        },
        containedPrimary: {
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        },
        outlined: {
          borderColor: '#ccc',
          '&:hover': {
            borderColor: '#1976d2',
          },
        },
      },
    },
  },
};

// 创建亮色主题
export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: lightPalette,
  // 可以在这里添加或覆盖只在亮色模式下生效的配置
});

// 创建暗色主题
export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: darkPalette,
  // 可以在这里添加或覆盖只在暗色模式下生效的配置
});