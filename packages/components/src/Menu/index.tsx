/**
 * Menu 模块统一导出文件
 * Menu module unified export file
 * 
 * 简化API - 只导出新的简化接口
 * Simplified API - Only exports new simplified interfaces
 */

// ==================== 主要组件导出 Main Component Exports ====================

/**
 * 简化的菜单组件（推荐使用）
 * Simplified menu component (recommended)
 */
export { Menu } from "./Menu";
export { default } from "./Menu";

// ==================== Hooks 导出 Hooks Exports ====================

/**
 * 简化的菜单Hook（推荐使用）
 * Simplified menu hook (recommended)
 */
export { useMenu } from "./hooks/useMenu";

// ==================== 配置导出 Configuration Exports ====================

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

// ==================== 类型导出 Type Exports ====================

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
