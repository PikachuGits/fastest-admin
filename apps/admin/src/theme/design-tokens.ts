// src/theme/tokens.ts (保持不变，或根据需要扩展)
import type { PaletteOptions } from '@mui/material/styles';

export const BASE_SPACING_UNIT = 8;

// 为亮色和暗色模式分别定义调色板
export const lightPalette: PaletteOptions = {
    mode: 'light',
    primary: { main: '#1976d2' },
    background: { default: '#ffffff', paper: '#f5f5f5' },
    text: { primary: '#212B36', secondary: '#637381' },
    // ...
};

export const darkPalette: PaletteOptions = {
    mode: 'dark',
    primary: { main: '#42a5f5' },
    background: { default: '#161C24', paper: '#212B36' },
    text: { primary: '#ffffff', secondary: '#919EAB' },
    // ...
};

// 共享的、与模式无关的规范
export const sharedTokens = {
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
    shape: { borderRadius: 8 },
    typography: { /* ... */ },
};