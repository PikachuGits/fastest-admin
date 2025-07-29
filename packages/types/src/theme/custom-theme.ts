// 自定义主题配置类型

/**
 * 主题模式类型
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * 主题配置选项
 */
export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  fontFamily: string;
  borderRadius: number;
  compactMode: boolean;
}

/**
 * 主题上下文类型
 */
export interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  config: ThemeConfig;
  updateConfig: (config: Partial<ThemeConfig>) => void;
  resetConfig: () => void;
}

/**
 * 主题提供者属性
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  defaultConfig?: Partial<ThemeConfig>;
}