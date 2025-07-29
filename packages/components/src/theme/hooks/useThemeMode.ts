/**
 * 主题模式管理 Hook
 * Theme Mode Management Hook
 * 
 * 这个模块提供了完整的主题模式和布局配置管理功能，包括：
 * - 🌓 明暗主题模式切换
 * - 📐 动态布局配置管理
 * - 💾 本地存储持久化
 * - 🎛️ 预设配置支持
 * - 🔄 状态同步和恢复
 * - 🎨 主题覆盖和自定义
 * 
 * @module useThemeMode
 * @version 1.0.0
 * @author Trae AI
 */

import { useState, useMemo, useCallback } from 'react';
import type { Theme } from '@mui/material/styles';

import { createTheme } from '../create-theme';
import { themeConfig } from '../theme-config';
import type { ThemeOptions } from '../types';

// ----------------------------------------------------------------------

/**
 * 主题模式类型
 * Theme mode types
 * 
 * 定义了支持的主题模式，目前支持亮色和暗色两种模式。
 * 未来可以扩展支持更多主题模式，如高对比度、护眼模式等。
 * 
 * @type ThemeMode
 */
export type ThemeMode = 'light' | 'dark';

/**
 * 布局配置类型
 * Layout configuration type
 * 
 * 定义了应用布局的所有可配置参数，包括各个组件的尺寸。
 * 这些参数可以动态调整以适应不同的设计需求和用户偏好。
 * 
 * @interface LayoutConfig
 */
export type LayoutConfig = {
  /** 头部导航栏高度（像素） */
  headerHeight: number;
  /** 侧边栏展开时的宽度（像素） */
  sidebarWidth: number;
  /** 侧边栏收起时的宽度（像素） */
  sidebarCollapsedWidth: number;
  /** 页脚高度（像素） */
  footerHeight: number;
  /** 内容区域的内边距（像素） */
  contentPadding: number;
};

/**
 * 主题模式 Hook 返回类型
 * Theme mode hook return type
 * 
 * 定义了 useThemeMode Hook 返回的所有功能和状态，
 * 提供了完整的主题和布局控制能力。
 * 
 * @interface UseThemeModeReturn
 */
export interface UseThemeModeReturn {
  /** 
   * 当前主题模式
   * 
   * 返回当前激活的主题模式，可以是 'light' 或 'dark'。
   */
  mode: ThemeMode;
  
  /** 
   * 是否为暗色模式
   * 
   * 便捷的布尔值，用于快速判断当前是否为暗色模式。
   * 等价于 mode === 'dark'。
   */
  isDarkMode: boolean;
  
  /** 
   * 切换主题模式
   * 
   * 在亮色和暗色模式之间切换。
   * 如果启用了持久化，新的模式会自动保存到本地存储。
   */
  toggleTheme: () => void;
  
  /** 
   * 设置特定的主题模式
   * 
   * 直接设置为指定的主题模式。
   * 如果启用了持久化，新的模式会自动保存到本地存储。
   * 
   * @param mode - 要设置的主题模式
   */
  setThemeMode: (mode: ThemeMode) => void;
  
  /** 
   * 当前主题对象
   * 
   * 返回完整的 Material-UI 主题对象，包含所有样式配置。
   * 这个对象可以直接传递给 ThemeProvider。
   */
  theme: Theme;
  
  /** 
   * 当前布局配置
   * 
   * 返回当前的布局配置对象，包含所有布局相关的尺寸参数。
   */
  layoutConfig: LayoutConfig;
  
  /** 
   * 更新布局配置
   * 
   * 更新部分或全部布局配置。新的配置会与现有配置合并。
   * 如果启用了持久化，新的配置会自动保存到本地存储。
   * 
   * @param config - 要更新的布局配置（部分）
   */
  updateLayoutConfig: (config: Partial<LayoutConfig>) => void;
  
  /** 
   * 重置布局配置为默认值
   * 
   * 将布局配置重置为默认值和初始配置的合并结果。
   * 如果启用了持久化，重置后的配置会保存到本地存储。
   */
  resetLayoutConfig: () => void;
}

/**
 * Hook 配置选项
 * Hook configuration options
 * 
 * 定义了 useThemeMode Hook 的所有可配置选项，
 * 提供了灵活的初始化和持久化配置。
 * 
 * @interface UseThemeModeOptions
 */
export interface UseThemeModeOptions {
  /** 
   * 初始主题模式，默认为 'light'
   * 
   * 设置 Hook 初始化时的主题模式。
   * 如果启用了持久化且本地存储中有保存的模式，则会优先使用保存的模式。
   * 
   * @default 'light'
   */
  initialMode?: ThemeMode;
  
  /** 
   * 初始布局配置，默认使用 themeConfig.layout
   * 
   * 设置 Hook 初始化时的布局参数。
   * 可以只设置部分配置，未设置的将使用默认值。
   * 如果启用了持久化且本地存储中有保存的配置，则会与保存的配置合并。
   * 
   * @example
   * ```tsx
   * initialLayoutConfig: {
   *   headerHeight: 80,
   *   sidebarWidth: 300,
   * }
   * ```
   */
  initialLayoutConfig?: Partial<LayoutConfig>;
  
  /** 
   * 主题覆盖配置
   * 
   * 允许覆盖或扩展默认的主题配置。
   * 这些配置会与默认主题配置合并，用户配置具有更高优先级。
   * 
   * @example
   * ```tsx
   * themeOverrides: {
   *   shape: { borderRadius: 12 },
   *   typography: { fontFamily: 'Inter' }
   * }
   * ```
   */
  themeOverrides?: ThemeOptions;
  
  /** 
   * 是否启用本地存储持久化，默认为 true
   * 
   * 启用后，主题模式和布局配置会自动保存到本地存储中，
   * 下次访问时会自动恢复用户的设置。
   * 
   * @default true
   */
  enablePersistence?: boolean;
  
  /** 
   * 本地存储的键名
   * 
   * 用于在 localStorage 中存储主题配置的基础键名。
   * 实际存储时会使用以下键名：
   * - 主题模式：{storageKey}
   * - 布局配置：{storageKey}-layout
   * 
   * @default 'theme-mode'
   */
  storageKey?: string;
}

// ----------------------------------------------------------------------

/**
 * 从本地存储获取主题模式
 * Get theme mode from localStorage
 * 
 * 这个函数会尝试从 localStorage 中读取之前保存的主题模式。
 * 它会验证存储的值是否为有效的主题模式，如果无效则返回 null。
 * 
 * @param storageKey - 存储键名
 * @returns 有效的主题模式或 null
 * 
 * @example
 * ```tsx
 * const mode = getStoredThemeMode('my-theme');
 * if (mode) {
 *   console.log('Found stored theme mode:', mode);
 * }
 * ```
 */
function getStoredThemeMode(storageKey: string): ThemeMode | null {
  // 服务端渲染环境下无法访问 localStorage
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(storageKey);
    // 验证存储的值是否为有效的主题模式
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    // localStorage 访问失败（可能是隐私模式或存储被禁用）
    return null;
  }
}

/**
 * 保存主题模式到本地存储
 * Save theme mode to localStorage
 * 
 * 这个函数会将主题模式保存到 localStorage 中。
 * 如果保存失败（如存储空间不足或隐私模式），会静默处理错误。
 * 
 * @param storageKey - 存储键名
 * @param mode - 要保存的主题模式
 * 
 * @example
 * ```tsx
 * setStoredThemeMode('my-theme', 'dark');
 * ```
 */
function setStoredThemeMode(storageKey: string, mode: ThemeMode): void {
  // 服务端渲染环境下无法访问 localStorage
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(storageKey, mode);
  } catch {
    // 存储失败时静默处理，不影响应用正常运行
    // 可能的原因：存储空间不足、隐私模式、存储被禁用等
    console.warn('Failed to save theme mode to localStorage');
  }
}

/**
 * 创建暗色主题配置
 * Create dark theme configuration
 * 
 * 这个函数创建暗色主题的配置覆盖。
 * 它定义了暗色模式下的调色板、背景色和文本颜色。
 * 
 * @returns 暗色主题的配置对象
 * 
 * @example
 * ```tsx
 * const darkConfig = createDarkThemeOverrides();
 * const theme = createTheme(darkConfig);
 * ```
 */
function createDarkThemeOverrides(): ThemeOptions {
  return {
    colorSchemes: {
      dark: {
        palette: {
          mode: 'dark',
          // 主色调 - 使用更柔和的蓝色系
          primary: {
            main: '#90caf9',     // 主蓝色
            light: '#bbdefb',    // 浅蓝色
            dark: '#42a5f5',     // 深蓝色
          },
          // 背景色 - 深色系背景
          background: {
            default: '#121212',  // 主背景色
            paper: '#1e1e1e',    // 卡片/纸张背景色
          },
          // 文本颜色 - 高对比度文本
          text: {
            primary: '#ffffff',                    // 主文本色
            secondary: 'rgba(255, 255, 255, 0.7)', // 次要文本色
          },
        },
      },
    },
  };
}

// ----------------------------------------------------------------------

/**
 * 主题模式管理 Hook
 * 
 * 这是一个功能完整的主题管理 Hook，提供了主题模式切换、
 * 布局配置管理、本地存储持久化等功能。
 * 
 * 主要特性：
 * - 🌓 支持亮色/暗色主题切换
 * - 📐 动态布局配置管理
 * - 💾 自动本地存储持久化
 * - 🎨 主题覆盖和自定义
 * - 🔄 状态同步和恢复
 * - 🛡️ 错误处理和降级
 * 
 * @param options - Hook 配置选项
 * @returns 主题控制对象
 * 
 * @example
 * ```tsx
 * // 基础使用
 * function MyComponent() {
 *   const { theme, isDarkMode, toggleTheme } = useThemeMode();
 *   
 *   return (
 *     <ThemeProvider theme={theme}>
 *       <button onClick={toggleTheme}>
 *         切换到 {isDarkMode ? '亮色' : '暗色'} 主题
 *       </button>
 *     </ThemeProvider>
 *   );
 * }
 * 
 * // 高级配置
 * function MyApp() {
 *   const themeMode = useThemeMode({
 *     initialMode: 'dark',
 *     initialLayoutConfig: {
 *       headerHeight: 80,
 *       sidebarWidth: 300,
 *     },
 *     themeOverrides: {
 *       shape: { borderRadius: 12 },
 *       typography: { fontFamily: 'Inter' }
 *     },
 *     enablePersistence: true,
 *     storageKey: 'my-app-theme',
 *   });
 *   
 *   return (
 *     <ThemeProvider theme={themeMode.theme}>
 *       <div style={{ height: themeMode.layoutConfig.headerHeight }}>
 *         <button onClick={themeMode.toggleTheme}>
 *           当前模式: {themeMode.mode}
 *         </button>
 *         <button onClick={() => themeMode.updateLayoutConfig({ headerHeight: 72 })}>
 *           调整头部高度
 *         </button>
 *       </div>
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function useThemeMode(options: UseThemeModeOptions = {}): UseThemeModeReturn {
  // 解构配置选项，设置默认值
  const {
    initialMode = 'light',
    initialLayoutConfig = {},
    themeOverrides = {},
    enablePersistence = true,
    storageKey = 'theme-mode',
  } = options;

  // 初始化主题模式（优先从本地存储读取）
  const [mode, setMode] = useState<ThemeMode>(() => {
    // 如果启用了持久化，尝试从本地存储读取保存的模式
    if (enablePersistence) {
      const stored = getStoredThemeMode(storageKey);
      if (stored) return stored;
    }
    // 否则使用初始模式
    return initialMode;
  });

  // 初始化布局配置（合并默认配置和用户配置）
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(() => ({
    ...themeConfig.layout,  // 默认布局配置
    ...initialLayoutConfig, // 用户提供的初始配置
  }));

  // 计算当前主题（使用 useMemo 优化性能）
  const theme = useMemo(() => {
    // 如果是暗色模式，应用暗色主题覆盖
    const darkOverrides = mode === 'dark' ? createDarkThemeOverrides() : {};
    
    // 创建完整的主题对象
    return createTheme({
      themeOverrides: {
        ...darkOverrides,        // 暗色模式覆盖（如果适用）
        ...themeOverrides,       // 用户提供的主题覆盖
      },
    });
  }, [mode, layoutConfig, themeOverrides]); // 依赖项：模式、布局配置、主题覆盖

  // 切换主题模式（在亮色和暗色之间切换）
  const toggleTheme = useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    
    // 如果启用了持久化，保存新模式到本地存储
    if (enablePersistence) {
      setStoredThemeMode(storageKey, newMode);
    }
  }, [mode, enablePersistence, storageKey]);

  // 设置特定的主题模式
  const setThemeMode = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
    
    // 如果启用了持久化，保存新模式到本地存储
    if (enablePersistence) {
      setStoredThemeMode(storageKey, newMode);
    }
  }, [enablePersistence, storageKey]);

  // 更新布局配置（部分更新，与现有配置合并）
  const updateLayoutConfig = useCallback((config: Partial<LayoutConfig>) => {
    setLayoutConfig(prev => ({ ...prev, ...config }));
  }, []);

  // 重置布局配置为默认值
  const resetLayoutConfig = useCallback(() => {
    // 重置为默认配置和初始配置的合并结果
    setLayoutConfig({ ...themeConfig.layout, ...initialLayoutConfig });
  }, [initialLayoutConfig]);

  return {
    mode,
    isDarkMode: mode === 'dark',
    toggleTheme,
    setThemeMode,
    theme,
    layoutConfig,
    updateLayoutConfig,
    resetLayoutConfig,
  };
}

// ----------------------------------------------------------------------

/**
 * 预设的布局配置
 * Preset layout configurations
 * 
 * 提供了几种常用的布局预设，用户可以快速应用这些预设
 * 而不需要手动配置每个参数。每个预设都针对特定的使用场景进行了优化。
 * 
 * @constant
 */
export const layoutPresets = {
  /** 
   * 默认布局
   * 
   * 标准的布局配置，平衡了空间利用率和用户体验，
   * 适合大多数桌面应用场景。
   */
  default: {
    headerHeight: 64,           // 标准头部高度
    sidebarWidth: 280,          // 标准侧边栏宽度
    sidebarCollapsedWidth: 64,  // 收起时显示图标
    footerHeight: 48,           // 适中的页脚高度
    contentPadding: 24,         // 舒适的内容间距
  },
  
  /** 
   * 紧凑布局
   * 
   * 适合屏幕空间有限的场景，所有尺寸都相对较小，
   * 最大化内容显示区域，提高空间利用率。
   */
  compact: {
    headerHeight: 56,           // 较小的头部高度
    sidebarWidth: 240,          // 较窄的侧边栏
    sidebarCollapsedWidth: 56,  // 最小的收起宽度
    footerHeight: 40,           // 较小的页脚高度
    contentPadding: 16,         // 较小的内容间距
  },
  
  /** 
   * 宽松布局
   * 
   * 适合大屏幕和桌面应用，提供更宽松的空间布局，
   * 提升用户体验和视觉舒适度，适合长时间使用。
   */
  spacious: {
    headerHeight: 72,           // 较大的头部高度
    sidebarWidth: 320,          // 较宽的侧边栏
    sidebarCollapsedWidth: 72,  // 较大的收起宽度
    footerHeight: 56,           // 较大的页脚高度
    contentPadding: 32,         // 较大的内容间距
  },
  
  /** 
   * 移动端布局
   * 
   * 专为移动设备优化的布局配置，考虑了触摸操作和小屏幕的特点。
   * 侧边栏收起时完全隐藏，页脚也被隐藏以节省空间。
   */
  mobile: {
    headerHeight: 56,           // 移动端标准头部高度
    sidebarWidth: 280,          // 全屏侧边栏宽度
    sidebarCollapsedWidth: 0,   // 完全隐藏侧边栏
    footerHeight: 0,            // 隐藏页脚节省空间
    contentPadding: 16,         // 适合移动端的间距
  },
} as const;

/**
 * 布局预设类型
 * Layout preset type
 * 
 * 定义了所有可用的布局预设名称类型。
 * 这确保了类型安全，防止使用不存在的预设名称。
 * 
 * @type LayoutPreset
 */
export type LayoutPreset = keyof typeof layoutPresets;

/**
 * 应用布局预设
 * Apply layout preset
 * 
 * 提供一个便捷的方式来应用预设的布局配置。
 * 这个函数会调用 updateLayoutConfig 来应用选定的预设。
 * 
 * @param updateLayoutConfig - 更新布局配置的函数
 * @param preset - 预设配置的名称
 * 
 * @example
 * ```tsx
 * const { updateLayoutConfig } = useThemeMode();
 * 
 * // 应用紧凑布局
 * applyLayoutPreset(updateLayoutConfig, 'compact');
 * 
 * // 应用宽松布局
 * applyLayoutPreset(updateLayoutConfig, 'spacious');
 * 
 * // 应用移动端布局
 * applyLayoutPreset(updateLayoutConfig, 'mobile');
 * ```
 */
export function applyLayoutPreset(
  updateLayoutConfig: (config: Partial<LayoutConfig>) => void,
  preset: LayoutPreset
): void {
  updateLayoutConfig(layoutPresets[preset]);
}