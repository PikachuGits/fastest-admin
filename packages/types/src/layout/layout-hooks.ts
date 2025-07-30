import type { LayoutConfig, LayoutConfigUpdater, LayoutConfigSetter } from './layout-config';

/**
 * 布局配置 Hook 返回值类型
 */
export interface UseLayoutConfigReturn {
  /** 当前布局配置 */
  layoutConfig: LayoutConfig;
  /** 更新布局配置 */
  updateLayoutConfig: LayoutConfigUpdater;
  /** 重置布局配置 */
  resetLayoutConfig: LayoutConfigSetter;
}

/**
 * 应用布局 Hook 返回值类型
 */
export interface UseAppLayoutReturn extends UseLayoutConfigReturn {
  /** 头部高度 */
  headerHeight: number;
  /** 侧边栏宽度 */
  sidebarWidth: number;
  /** 侧边栏收起时的宽度 */
  sidebarCollapsedWidth: number;
  /** 页脚高度 */
  footerHeight: number;
  /** 内容区域内边距 */
  contentPadding: number;
  /** 是否显示侧边栏 */
  showSidebar: boolean;
  /** 侧边栏是否收起 */
  sidebarCollapsed: boolean;
  /** 是否显示页脚 */
  showFooter: boolean;

  /** 当前侧边栏宽度（考虑收起状态） */
  currentSidebarWidth: number;
  /** 内容区域左边距 */
  contentMarginLeft: number;
  /** 内容区域上边距 */
  contentMarginTop: number;
  /** 内容区域下边距 */
  contentMarginBottom: number;

  /** 设置头部高度 */
  setHeaderHeight: (height: number) => void;
  /** 设置侧边栏宽度 */
  setSidebarWidth: (width: number) => void;
  /** 切换侧边栏收起状态 */
  toggleSidebar: () => void;
  /** 设置页脚高度 */
  setFooterHeight: (height: number) => void;
  /** 切换侧边栏显示状态 */
  toggleSidebarVisibility: () => void;
  /** 切换页脚显示状态 */
  toggleFooterVisibility: () => void;
  /** 设置内容区域内边距 */
  setContentPadding: (padding: number) => void;
}