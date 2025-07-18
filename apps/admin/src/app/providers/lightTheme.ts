// src/app/providers/theme/lightTheme.ts
import { createTheme } from "@mui/material/styles"

export const lightDesignTokens = {
    colors: {
        primary: "#2563eb",
        secondary: '#637381',
        background: "#f9fafb",
        text: "#111827",
    },
    layout: {
        headerHeight: 64,
    },
}

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: lightDesignTokens.colors.primary,
        },
        background: {
            default: lightDesignTokens.colors.background,
        },
        text: {
            primary: lightDesignTokens.colors.text,
        },
    },
    customLayout: lightDesignTokens.layout,
})