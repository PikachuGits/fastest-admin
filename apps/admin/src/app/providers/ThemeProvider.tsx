// src/app/providers/ThemeProvider.tsx
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme"; // 你定义的主题
import type { Theme } from "@mui/material/styles";

// 定义上下文类型
interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
}

// 创建上下文
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// 导出 Hook 用于消费
export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used within AppThemeProvider");
  return ctx;
};

// Provider 组件
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  // const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);
  const theme = useMemo(() => {
    const base = isDarkMode ? darkTheme : lightTheme;
    return {
      ...base,
      customLayout: {
        ...base.customLayout,
        headerHeight,
      },
    };
  }, [isDarkMode, headerHeight]); // <- headerHeight 变化时，生成新的 theme

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, theme, headerHeight, setHeaderHeight }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
