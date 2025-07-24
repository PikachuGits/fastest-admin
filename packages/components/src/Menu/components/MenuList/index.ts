/**
 * MenuList 组件模块导出
 * MenuList component module exports
 * 
 * 统一导出所有拆分后的模块，包括：
 * - 主组件 MenuList
 * - 类型定义
 * - 工具函数
 * - 自定义 Hook
 * - 子组件
 */

// 主组件
export { default } from './index.tsx';

// 类型定义
export type {
  NavItem,
  NavSection,
  NavData,
  BadgeColor,
  OpenStatesRecord,
  MenuListProps
} from './types';

// 工具函数
export {
  parseInfoBadge,
  getBadgeColor,
  generateItemPath,
  hasChildren
} from './utils';

// 自定义 Hook
export { useMenuState } from './useMenuState';

// 子组件
export { MenuItemRenderer } from './MenuItemRenderer';
export { MenuSectionRenderer } from './MenuSectionRenderer';

// 重新导出类型（用于向后兼容）
export type { MenuItemRendererProps } from './MenuItemRenderer';
export type { MenuSectionRendererProps } from './MenuSectionRenderer';