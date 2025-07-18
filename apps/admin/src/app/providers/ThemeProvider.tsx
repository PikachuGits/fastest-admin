// src/app/providers/ThemeProvider.tsx
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme"; // 你定义的主题
import type { Theme } from "@mui/material/styles";

// 定义上下文类型
interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: (e: any) => void;
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

import { useCallback } from 'react';

/**
 * 一个用于处理原生 View Transitions API 的 React Hook。
 * @returns {{startViewTransition: Function}} 一个包含 startViewTransition函数的对象。
 */
export const useViewTransition = () => {
  /**
   * 启动一个视图转换。
   * @param {React.MouseEvent} event - 来自点击事件的 event 对象，用于获取坐标。
   * @param {Function} updateStateCallback - 一个用于更新 React 状态的回调函数。
   *                                         这个函数将在 startViewTransition 内部被调用。
   */
  const startViewTransition = useCallback((event: any, updateStateCallback: any) => {
    // 1. 检查浏览器是否支持
    if (!document.startViewTransition) {
      // 如果不支持，直接执行状态更新，不带动画
      updateStateCallback();
      return;
    }

    // 2. 从事件中获取坐标
    const x = event.clientX;
    const y = event.clientY;

    // 3. 调用 View Transition API
    const transition = document.startViewTransition(() => {
      // 在这里执行传入的状态更新函数
      updateStateCallback();
    });

    // 4. 在过渡准备好后，设置 CSS 变量以供动画使用
    transition.ready.then(() => {
      document.documentElement.style.setProperty('--click-x', `${x}px`);
      document.documentElement.style.setProperty('--click-y', `${y}px`);
    });
  }, []); // 空依赖数组，因为这个函数本身不依赖任何 props 或 state

  return { startViewTransition };
};

// Provider 组件
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const { startViewTransition } = useViewTransition();
  // 在 useEffect 中同步 html class
  useEffect(() => {
    startViewTransition
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDarkMode])


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

  const toggleTheme = (event: any) => {
    startViewTransition(event, () => {
      setIsDarkMode((prev) => !prev);
    });
  };

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
