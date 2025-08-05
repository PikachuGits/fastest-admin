/**
 * Menu 模块统一导出文件
 * Menu module unified export file
 * 
 * 提供菜单相关的所有组件、Hooks、工具函数、配置和类型定义的统一导出
 * Provides unified exports for all menu-related components, hooks, utilities, configurations, and type definitions
 * 
 * 重构说明：
 * - 新增简化的Menu组件和useMenu Hook，提供更直观的API
 * - 保持所有现有导出，确保100%向后兼容
 * - 新接口作为现有复杂组件的封装层
 * 
 * Refactoring notes:
 * - Added simplified Menu component and useMenu hook for more intuitive API
 * - Maintain all existing exports to ensure 100% backward compatibility
 * - New interfaces serve as wrapper layers for existing complex components
 */

// ==================== 新简化接口导出 New Simplified Interface Exports ====================

/**
 * 简化的菜单组件（推荐使用）
 * Simplified menu component (recommended)
 */
export { Menu } from "./Menu";
export { default } from "./Menu";

/**
 * 简化的菜单Hook（推荐使用）
 * Simplified menu hook (recommended)
 */
export { useMenu } from "./hooks/useMenu";

/**
 * 预设配置
 * Preset configurations
 */
export {
  presets,
  getPreset,
  mergePresets,
  applyPreset,
  createCustomPreset,
  getAvailablePresets,
  isValidPresetName,
  createAdminMenuConfig,
  createMobileMenuConfig,
  createDesktopMenuConfig,
  createNavbarMenuConfig,
} from "./config/presets";

/**
 * 简化的类型定义（推荐使用）
 * Simplified type definitions (recommended)
 */
export type {
  MenuItem as MenuItemType,
  MenuProps,
  UseMenuOptions,
  UseMenuReturn,
  MenuVariant as MenuVariantType,
  MenuTheme,
  MenuSize,
} from "./types/public";

// ==================== 原有组件导出 Original Component Exports ====================

/**
 * 原有菜单组件（保持兼容性）
 * Original menu components (for compatibility)
 */
export { default as MenuList } from "./components/internal/MenuList";
export { MenuItem } from "./components/internal/MenuItem";
export { NumberChip } from "./components/internal/NumberChip";
export { GroupHeader } from "./components/internal/GroupHeader";

/**
 * 示例组件
 * Example components
 */

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
export type { NumberChipProps, NumberChipColor } from "./components/internal/NumberChip";

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
