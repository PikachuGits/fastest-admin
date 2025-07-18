// src/app/providers/theme/darkTheme.ts
import { createTheme } from "@mui/material/styles"

export const darkDesignTokens = {
    colors: {
        primary: "#3b82f6",
        secondary: '#637381',
        background: "#0f172a",
        text: "#f1f5f9",
    },
    layout: {
        headerHeight: 64,
    },
}

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: darkDesignTokens.colors.primary,
        },
        background: {
            default: darkDesignTokens.colors.background,
        },
        text: {
            primary: darkDesignTokens.colors.text,
        },
    },
    customLayout: darkDesignTokens.layout,
})