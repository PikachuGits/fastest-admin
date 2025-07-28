/// <reference types="vite/client" />

// 导入组件库的主题类型扩展
import type {} from '@fastest/components/src/theme/extend-theme-types';

// 应用层特定的主题扩展
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
    };
  }

  interface ThemeOptions {
    customLayout?: Partial<{
      headerHeight: number;
      sidebarWidth: number;
      sidebarCollapsedWidth: number;
      footerHeight: number;
      contentPadding: number;
      showSidebar: boolean;
      sidebarCollapsed: boolean;
      showFooter: boolean;
    }>;
  }
}
