// 布局相关类型定义

/**
 * 基础布局配置接口
 */
export interface BaseLayoutConfig {
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
}

/**
 * 应用层布局配置接口
 */
export interface AppLayoutConfig extends BaseLayoutConfig {
  /** 是否显示侧边栏 */
  showSidebar: boolean;
  /** 侧边栏是否收起 */
  sidebarCollapsed: boolean;
  /** 是否显示页脚 */
  showFooter: boolean;
  /** 边框样式配置 */
  outlined?: {
    borderColor: string;
  };
}