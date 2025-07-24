// src/app/providers/types.ts
import type { Theme } from "@mui/material/styles";
import type { LayoutConfig } from "@fastest/hook";

/**
 * 主题上下文属性接口
 * Theme context properties interface
 */
export interface ThemeContextProps {
  /** 是否为暗色模式 */
  isDarkMode: boolean;
  /** 切换主题函数 */
  toggleTheme: (e: any) => void;
  /** MUI 主题对象 */
  theme: Theme;
  /** 更新布局配置 */
  updateLayoutConfig: (updates: Partial<LayoutConfig>) => void;
  /** 重置布局配置 */
  resetLayoutConfig: () => void;
}

/**
 * 主题提供者属性接口
 * Theme provider props interface
 */
export interface AppThemeProviderProps {
  /** 子组件 */
  children: React.ReactNode;
  /** 初始布局配置 */
  initialLayoutConfig?: Partial<LayoutConfig>;
}