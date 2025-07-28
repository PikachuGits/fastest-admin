// packages/hook/src/layout/useLayoutConfig.ts
import { useState, useCallback, useMemo } from "react";
import type { LayoutConfig, UseLayoutConfigReturn } from "./types";

/**
 * 默认布局配置
 * Default layout configuration
 */
export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  headerHeight: 64,
  sidebarWidth: 280,
  sidebarCollapsedWidth: 80,
  footerHeight: 60,
  contentPadding: 24,
  showSidebar: true,
  sidebarCollapsed: false,
  showFooter: true,
};

/**
 * 布局配置管理 Hook
 * Layout configuration management hook
 * 
 * 提供统一的布局配置管理功能，包括：
 * - 状态管理
 * - 批量更新
 * - 重置功能
 * - 类型安全
 * 
 * @param initialConfig 初始布局配置
 * @returns 布局配置管理对象
 * 
 * @example
 * ```tsx
 * function App() {
 *   const {
 *     layoutConfig,
 *     updateLayoutConfig,
 *     setHeaderHeight,
 *     toggleSidebar
 *   } = useLayoutConfig({
 *     headerHeight: 80,
 *     sidebarWidth: 300
 *   });
 * 
 *   return (
 *     <div style={{ marginTop: layoutConfig.headerHeight }}>
 *       <button onClick={() => setHeaderHeight(100)}>
 *         Set Header Height
 *       </button>
 *       <button onClick={toggleSidebar}>
 *         Toggle Sidebar
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLayoutConfig(initialConfig?: Partial<LayoutConfig>): UseLayoutConfigReturn {
  // 合并初始配置
  const mergedInitialConfig = useMemo(() => ({
    ...DEFAULT_LAYOUT_CONFIG,
    ...initialConfig,
  }), [initialConfig]);

  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(mergedInitialConfig);

  /**
   * 更新布局配置
   * Update layout configuration
   */
  const updateLayoutConfig = useCallback((updates: Partial<LayoutConfig>) => {
    setLayoutConfig(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  /**
   * 重置布局配置
   * Reset layout configuration
   */
  const resetLayoutConfig = useCallback(() => {
    setLayoutConfig(mergedInitialConfig);
  }, [mergedInitialConfig]);

  /**
   * 便捷的更新函数
   * Convenient update functions
   */
  const setHeaderHeight = useCallback((height: number) => {
    updateLayoutConfig({ headerHeight: height });
  }, [updateLayoutConfig]);

  const setSidebarWidth = useCallback((width: number) => {
    updateLayoutConfig({ sidebarWidth: width });
  }, [updateLayoutConfig]);

  const toggleSidebar = useCallback(() => {
    setLayoutConfig(prev => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  const setFooterHeight = useCallback((height: number) => {
    updateLayoutConfig({ footerHeight: height });
  }, [updateLayoutConfig]);

  return {
    layoutConfig,
    updateLayoutConfig,
    resetLayoutConfig,
    // 便捷函数
    setHeaderHeight,
    setSidebarWidth,
    toggleSidebar,
    setFooterHeight,
  };
}