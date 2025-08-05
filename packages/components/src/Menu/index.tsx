/**
 * Menu 模块统一导出文件
 * Menu module unified export file
 * 
 * 重构完成 - 第三阶段：提供简化API接口，保持100%向后兼容
 * Refactoring completed - Phase 3: Provides simplified API interface while maintaining 100% backward compatibility
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
  MenuItem,
  MenuProps,
  UseMenuOptions,
  UseMenuReturn,
  MenuVariant,
  MenuTheme,
  MenuSize,
} from "./types/public";

// ==================== 原有组件导出 Original Component Exports ====================

/**
 * 原有菜单组件（保持兼容性）
 * Original menu components (for compatibility)
 */
export { default as MenuList } from "./components/internal/MenuList";
export { MenuItem as MenuItemComponent } from "./components/internal/MenuItem";
export { NumberChip } from "./components/internal/NumberChip";
export { GroupHeader } from "./components/internal/GroupHeader";

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
 * 原有类型定义（保持兼容性）
 * Original type definitions (for compatibility)
 */
export type {
  // 菜单相关类型
  NavItem,
  NavSection,
  NavData,
  IconMapKey,
  IconMap,
  MenuItemState,
  MenuConfig,
  MenuStyleVariant,
  MenuStyleVariantType,
  MenuListProps,
} from "./types/index";

// 组件属性类型（从组件文件直接导出）
export type { NumberChipProps, NumberChipColor } from "./components/internal/NumberChip";

// 避免类型名称冲突，原有MenuVariant重命名导出
export type { MenuVariant as LegacyMenuVariant } from "./types/index";
