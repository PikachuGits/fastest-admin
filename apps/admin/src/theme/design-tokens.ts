// src/theme/tokens.ts (保持不变，或根据需要扩展)
import type { PaletteOptions, TypographyVariantsOptions } from '@mui/material/styles';

export const BASE_SPACING_UNIT = 8;

// 为亮色和暗色模式分别定义调色板
export const lightPalette: PaletteOptions = {
    mode: 'light',
    primary: { main: '#1976d2' },
    // rgba(244, 240, 234, 1)
    background: { default: 'rgba(244, 240, 234, 1)', paper: '#f5f5f5' },
    // background: { default: '#ffffff', paper: '#f5f5f5' },
    text: {
        primary: '#212B36',
        secondary: '#637381',
        disabled: '#919EAB'
    },
    action: {
        hover: 'rgba(145, 158, 171, 0.08)',
        selected: 'rgba(145, 158, 171, 0.12)',
        selectedOpacity: 0.12
    },
    // ...
};

export const darkPalette: PaletteOptions = {
    mode: 'dark',
    primary: { main: '#42a5f5' },
    background: { default: 'rgba(18, 18, 18, 0.8)', paper: '#212B36' },
    // background: { default: '#161C24', paper: '#212B36' },
    text: {
        primary: '#ffffff',
        secondary: '#919EAB',
        disabled: '#637381'
    },
    action: {
        hover: 'rgba(255, 255, 255, 0.08)',
        selected: 'rgba(255, 255, 255, 0.12)',
        selectedOpacity: 0.12
    },
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
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.125rem',
            fontWeight: 300,
            lineHeight: 1.167,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 400,
            lineHeight: 1.2,
        },
        h3: {
            fontSize: '1.25rem',
            fontWeight: 400,
            lineHeight: 1.167,
        },
        h4: {
            fontSize: '1.125rem',
            fontWeight: 400,
            lineHeight: 1.235,
        },
        h5: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.334,
        },
        h6: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.6,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.43,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.75,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.57,
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.66,
        },
        overline: {
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 2.66,
            textTransform: 'uppercase' as const,
        },
        button: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.75,
            textTransform: 'uppercase' as const,
        },
    } as TypographyVariantsOptions,
};