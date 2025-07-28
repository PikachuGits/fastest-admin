/**
 * Menu 模块统一导出文件
 * Menu module unified export file
 * 
 * 提供菜单相关的所有组件、Hooks、工具函数、配置和类型定义的统一导出
 * Provides unified exports for all menu-related components, hooks, utilities, configurations, and type definitions
 */

// ==================== 组件导出 Component Exports ====================

/**
 * 菜单组件
 * Menu components
 */
export { default as MenuList } from "./components/MenuList";
export { MenuItem } from "./components/MenuItem";
export { NumberChip } from "./components/NumberChip";
export { GroupHeader } from "./components/GroupHeader";

/**
 * 示例组件
 * Example components
 */
export { MenuExamples } from "./examples/MenuExamples";

// ==================== Hooks 导出 Hooks Exports ====================

/**
 * 菜单状态管理 Hook
 * Menu state management hook
 */
export { useMenuState } from "./hooks/useMenuState";

// ==================== 工具函数导出 Utility Functions Exports ====================

/**
 * 菜单相关工具函数
 * Menu-related utility functions
 */
export {
  parseInfoBadge,
  getBadgeColor,
  parseIcon,
  hasPermission,
  generateItemPath,
  findMenuItem,
} from "./utils/menuHelpers";

// ==================== 配置导出 Configuration Exports ====================

/**
 * 菜单配置和样式变体
 * Menu configurations and style variants
 */
export {
  getMenuConfig,
  getMenuStyle,
  defaultMenuConfig,
  collapsedMenuConfig,
  doubleColumnConfig,
  adminMenuConfig,
  guestMenuConfig,
  standardStyle,
  collapsedStyle,
  doubleColumnStyle,
  gridStyle,
} from "./config/menuVariants";

// ==================== 类型导出 Type Exports ====================

/**
 * 组件属性类型
 * Component props types
 */
export type { MenuItemProps } from "./components/MenuItem";
export type { NumberChipProps, NumberChipColor } from "./components/NumberChip";
export type { GroupHeaderProps } from "./components/GroupHeader";

/**
 * 菜单相关类型定义
 * Menu-related type definitions
 */
export type {
  NavItem,
  NavSection,
  NavData,
  IconMapKey,
  IconMap,
  MenuItemState,
  MenuConfig,
  MenuStyleVariant,
  MenuVariant,
  MenuStyleVariantType,
  MenuListProps,
} from "./types/index";
