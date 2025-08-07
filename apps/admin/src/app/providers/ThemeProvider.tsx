// src/app/providers/ThemeProvider.tsx
import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme"; // 你定义的主题
import { useViewTransitionToggle } from "@fastest/hook";
import { useLayoutConfig } from "@fastest/hook";
import type { ThemeContextProps, AppThemeProviderProps } from "./types";

// 创建上下文
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// 导出 Hook 用于消费
export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used within AppThemeProvider");
  return ctx;
};

// Provider 组件
export function AppThemeProvider({
  children,
  initialLayoutConfig,
}: AppThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { layoutConfig, updateLayoutConfig, resetLayoutConfig } =
    useLayoutConfig(initialLayoutConfig);

  const toggleTheme = useViewTransitionToggle(isDarkMode, setIsDarkMode);
  // useViewTransitionToggle hook 内部已经处理了类名切换逻辑

  // 生成包含布局配置的主题
  const theme = useMemo(() => {
    const base = isDarkMode ? darkTheme : lightTheme;
    return {
      ...base,
      customLayout: {
        ...base.customLayout,
        ...layoutConfig,
      },
    };
  }, [isDarkMode, layoutConfig]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        theme,
        layoutConfig,
        updateLayoutConfig,
        resetLayoutConfig,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
