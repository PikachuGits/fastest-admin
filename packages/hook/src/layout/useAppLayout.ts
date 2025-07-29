// packages/hook/src/layout/useAppLayout.ts
import { useMemo } from "react";
import { useLayoutConfig } from "./useLayoutConfig";
import type { LayoutConfig, UseAppLayoutReturn } from "./types";

/**
 * 应用布局管理 Hook
 * Application layout management hook
 * 
 * 提供便捷的布局配置访问和操作功能，包括：
 * - 布局配置状态访问
 * - 常用布局操作函数
 * - 计算属性（如当前侧边栏宽度、内容边距等）
 * - 类型安全的接口
 * 
 * 这是一个独立的 Hook，不依赖任何主题提供者或上下文。
 * 如果需要与主题系统集成，请在应用层进行组合。
 * 
 * @param initialConfig 初始布局配置
 * @returns 应用布局管理对象
 * 
 * @example
 * ```tsx
 * function Layout() {
 *   const { 
 *     headerHeight, 
 *     sidebarWidth, 
 *     currentSidebarWidth,
 *     contentMarginLeft,
 *     setHeaderHeight, 
 *     toggleSidebar,
 *     updateLayoutConfig 
 *   } = useAppLayout({
 *     headerHeight: 80,
 *     sidebarWidth: 300
 *   });
 *   
 *   return (
 *     <div>
 *       <header style={{ height: headerHeight }}>
 *         Header
 *       </header>
 *       <aside style={{ width: currentSidebarWidth }}>
 *         Sidebar
 *       </aside>
 *       <main style={{ marginLeft: contentMarginLeft, marginTop: headerHeight }}>
 *         Content
 *       </main>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAppLayout(initialConfig?: Partial<LayoutConfig>): UseAppLayoutReturn {
  const {
    layoutConfig,
    updateLayoutConfig,
    resetLayoutConfig,
    setHeaderHeight,
    setSidebarWidth,
    toggleSidebar,
    setFooterHeight,
  } = useLayoutConfig(initialConfig);

  // 解构布局配置，提供便捷访问
  const {
    headerHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    footerHeight,
    contentPadding,
    showSidebar,
    sidebarCollapsed,
    showFooter,
  } = layoutConfig;

  // 额外的便捷更新函数
  const toggleSidebarVisibility = () => {
    updateLayoutConfig({ showSidebar: !showSidebar });
  };

  const toggleFooterVisibility = () => {
    updateLayoutConfig({ showFooter: !showFooter });
  };

  const setContentPadding = (padding: number) => {
    updateLayoutConfig({ contentPadding: padding });
  };

  // 计算属性
  const computedValues = useMemo(() => {
    const currentSidebarWidth = sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth;
    const contentMarginLeft = showSidebar ? currentSidebarWidth : 0;
    const contentMarginTop = headerHeight;
    const contentMarginBottom = showFooter ? footerHeight : 0;

    return {
      currentSidebarWidth,
      contentMarginLeft,
      contentMarginTop,
      contentMarginBottom,
    };
  }, [sidebarCollapsed, sidebarCollapsedWidth, sidebarWidth, showSidebar, headerHeight, showFooter, footerHeight]);

  return {
    // 布局配置状态
    layoutConfig,
    headerHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    footerHeight,
    contentPadding,
    showSidebar,
    sidebarCollapsed,
    showFooter,

    // 计算属性
    ...computedValues,

    // 更新函数
    updateLayoutConfig,
    resetLayoutConfig,
    setHeaderHeight,
    setSidebarWidth,
    toggleSidebar,
    setFooterHeight,
    toggleSidebarVisibility,
    toggleFooterVisibility,
    setContentPadding,
  };
}