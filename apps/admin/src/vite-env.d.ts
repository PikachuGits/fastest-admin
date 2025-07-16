/// <reference types="vite/client" />

// src/types/theme.d.ts
import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customLayout: {
      headerHeight: number;
      footerHeight?: number;
    };
  }

  interface ThemeOptions {
    customLayout?: {
      headerHeight?: number;
      footerHeight?: number;
    };
  }
}
