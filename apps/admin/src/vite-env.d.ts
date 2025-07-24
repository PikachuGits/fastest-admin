/// <reference types="vite/client" />

// src/types/theme.d.ts
import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@mui/material/styles';

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
    customLayout?: {
      headerHeight?: number;
      sidebarWidth?: number;
      sidebarCollapsedWidth?: number;
      footerHeight?: number;
      contentPadding?: number;
      showSidebar?: boolean;
      sidebarCollapsed?: boolean;
      showFooter?: boolean;
    };
  }
}
