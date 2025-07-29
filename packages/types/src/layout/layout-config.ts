// 布局配置类型定义

/**
 * 布局配置接口
 */
export interface LayoutConfig {
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
}

/**
 * 布局配置更新函数类型
 */
export type LayoutConfigUpdater = (updates: Partial<LayoutConfig>) => void;

/**
 * 布局配置重置函数类型
 */
export type LayoutConfigResetter = () => void;