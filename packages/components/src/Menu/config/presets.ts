/**
 * Menu 预设配置
 * Menu Preset Configurations
 * 
 * 提供常用的菜单配置预设，简化用户的配置工作
 * Provide common menu configuration presets to simplify user configuration work
 * 
 * 设计原则：
 * - 提供开箱即用的配置预设
 * - 覆盖常见的使用场景
 * - 保持配置的一致性和可预测性
 * - 支持配置的组合和扩展
 * 
 * Design principles:
 * - Provide out-of-the-box configuration presets
 * - Cover common use cases
 * - Maintain configuration consistency and predictability
 * - Support configuration combination and extension
 */

import type { MenuProps, MenuVariant, MenuTheme, MenuSize } from '../types/public';

// ==================== 基础预设 Basic Presets ====================

/**
 * 侧边栏菜单预设
 * Sidebar menu preset
 */
export const sidebarPreset: Partial<MenuProps> = {
  variant: 'sidebar',
  theme: 'light',
  size: 'medium',
  collapsible: true,
  accordion: false,
};

/**
 * 折叠侧边栏菜单预设
 * Collapsed sidebar menu preset
 */
export const collapsedSidebarPreset: Partial<MenuProps> = {
  variant: 'collapsed',
  theme: 'light',
  size: 'medium',
  collapsible: false,
  accordion: false,
};

/**
 * 水平菜单预设
 * Horizontal menu preset
 */
export const horizontalPreset: Partial<MenuProps> = {
  variant: 'horizontal',
  theme: 'light',
  size: 'medium',
  collapsible: false,
  accordion: false,
};

/**
 * 下拉菜单预设
 * Dropdown menu preset
 */
export const dropdownPreset: Partial<MenuProps> = {
  variant: 'horizontal',
  theme: 'light',
  size: 'medium',
  collapsible: false,
  accordion: false,
};

// ==================== 主题预设 Theme Presets ====================

/**
 * 深色主题预设
 * Dark theme preset
 */
export const darkThemePreset: Partial<MenuProps> = {
  theme: 'dark',
};

/**
 * 浅色主题预设
 * Light theme preset
 */
export const lightThemePreset: Partial<MenuProps> = {
  theme: 'light',
};

/**
 * 主色调主题预设
 * Primary theme preset
 */
export const primaryThemePreset: Partial<MenuProps> = {
  theme: 'dark',
};

// ==================== 尺寸预设 Size Presets ====================

/**
 * 小尺寸预设
 * Small size preset
 */
export const smallSizePreset: Partial<MenuProps> = {
  size: 'small',
};

/**
 * 中等尺寸预设
 * Medium size preset
 */
export const mediumSizePreset: Partial<MenuProps> = {
  size: 'medium',
};

/**
 * 大尺寸预设
 * Large size preset
 */
export const largeSizePreset: Partial<MenuProps> = {
  size: 'large',
};

// ==================== 行为预设 Behavior Presets ====================

/**
 * 手风琴模式预设
 * Accordion mode preset
 */
export const accordionPreset: Partial<MenuProps> = {
  accordion: true,
};

/**
 * 可折叠预设
 * Collapsible preset
 */
export const collapsiblePreset: Partial<MenuProps> = {
  collapsible: true,
};

/**
 * 静态预设（不可折叠，非手风琴）
 * Static preset (non-collapsible, non-accordion)
 */
export const staticPreset: Partial<MenuProps> = {
  collapsible: false,
  accordion: false,
};

// ==================== 组合预设 Combined Presets ====================

/**
 * 管理后台菜单预设
 * Admin dashboard menu preset
 */
export const adminDashboardPreset: Partial<MenuProps> = {
  variant: 'sidebar',
  theme: 'light',
  size: 'medium',
  collapsible: true,
  accordion: true,
};

/**
 * 移动端菜单预设
 * Mobile menu preset
 */
export const mobilePreset: Partial<MenuProps> = {
  variant: 'collapsed',
  theme: 'light',
  size: 'small',
  collapsible: false,
  accordion: true,
};

/**
 * 桌面端菜单预设
 * Desktop menu preset
 */
export const desktopPreset: Partial<MenuProps> = {
  variant: 'sidebar',
  theme: 'light',
  size: 'medium',
  collapsible: true,
  accordion: false,
};

/**
 * 紧凑型菜单预设
 * Compact menu preset
 */
export const compactPreset: Partial<MenuProps> = {
  variant: 'collapsed',
  theme: 'light',
  size: 'small',
  collapsible: false,
  accordion: false,
};

/**
 * 导航栏菜单预设
 * Navigation bar menu preset
 */
export const navbarPreset: Partial<MenuProps> = {
  variant: 'horizontal',
  theme: 'light',
  size: 'medium',
  collapsible: false,
  accordion: false,
};

// ==================== 预设映射 Preset Mapping ====================

/**
 * 所有预设的映射表
 * Mapping table of all presets
 */
export const presets = {
  // 基础预设 Basic presets
  sidebar: sidebarPreset,
  collapsedSidebar: collapsedSidebarPreset,
  horizontal: horizontalPreset,
  dropdown: dropdownPreset,
  
  // 主题预设 Theme presets
  darkTheme: darkThemePreset,
  lightTheme: lightThemePreset,
  primaryTheme: primaryThemePreset,
  
  // 尺寸预设 Size presets
  smallSize: smallSizePreset,
  mediumSize: mediumSizePreset,
  largeSize: largeSizePreset,
  
  // 行为预设 Behavior presets
  accordion: accordionPreset,
  collapsible: collapsiblePreset,
  static: staticPreset,
  
  // 组合预设 Combined presets
  adminDashboard: adminDashboardPreset,
  mobile: mobilePreset,
  desktop: desktopPreset,
  compact: compactPreset,
  navbar: navbarPreset,
} as const;

/**
 * 预设名称类型
 * Preset name type
 */
export type PresetName = keyof typeof presets;

// ==================== 工具函数 Utility Functions ====================

/**
 * 获取指定预设配置
 * Get specified preset configuration
 * 
 * @param presetName - 预设名称 Preset name
 * @returns 预设配置 Preset configuration
 */
export const getPreset = (presetName: PresetName): Partial<MenuProps> => {
  return presets[presetName];
};

/**
 * 合并多个预设配置
 * Merge multiple preset configurations
 * 
 * @param presetNames - 预设名称数组 Array of preset names
 * @returns 合并后的配置 Merged configuration
 */
export const mergePresets = (...presetNames: PresetName[]): Partial<MenuProps> => {
  return presetNames.reduce((merged, presetName) => {
    return { ...merged, ...getPreset(presetName) };
  }, {} as Partial<MenuProps>);
};

/**
 * 应用预设配置到现有配置
 * Apply preset configuration to existing configuration
 * 
 * @param baseConfig - 基础配置 Base configuration
 * @param presetName - 预设名称 Preset name
 * @returns 应用预设后的配置 Configuration after applying preset
 */
export const applyPreset = (
  baseConfig: Partial<MenuProps>,
  presetName: PresetName
): Partial<MenuProps> => {
  return { ...getPreset(presetName), ...baseConfig };
};

/**
 * 创建自定义预设
 * Create custom preset
 * 
 * @param config - 自定义配置 Custom configuration
 * @returns 自定义预设配置 Custom preset configuration
 */
export const createCustomPreset = (config: Partial<MenuProps>): Partial<MenuProps> => {
  return { ...config };
};

/**
 * 获取所有可用的预设名称
 * Get all available preset names
 * 
 * @returns 预设名称数组 Array of preset names
 */
export const getAvailablePresets = (): PresetName[] => {
  return Object.keys(presets) as PresetName[];
};

/**
 * 检查是否为有效的预设名称
 * Check if it's a valid preset name
 * 
 * @param name - 要检查的名称 Name to check
 * @returns 是否为有效预设名称 Whether it's a valid preset name
 */
export const isValidPresetName = (name: string): name is PresetName => {
  return name in presets;
};

// ==================== 快捷方法 Shortcut Methods ====================

/**
 * 快速创建管理后台菜单配置
 * Quickly create admin dashboard menu configuration
 */
export const createAdminMenuConfig = (overrides?: Partial<MenuProps>): Partial<MenuProps> => {
  return { ...adminDashboardPreset, ...overrides };
};

/**
 * 快速创建移动端菜单配置
 * Quickly create mobile menu configuration
 */
export const createMobileMenuConfig = (overrides?: Partial<MenuProps>): Partial<MenuProps> => {
  return { ...mobilePreset, ...overrides };
};

/**
 * 快速创建桌面端菜单配置
 * Quickly create desktop menu configuration
 */
export const createDesktopMenuConfig = (overrides?: Partial<MenuProps>): Partial<MenuProps> => {
  return { ...desktopPreset, ...overrides };
};

/**
 * 快速创建导航栏菜单配置
 * Quickly create navbar menu configuration
 */
export const createNavbarMenuConfig = (overrides?: Partial<MenuProps>): Partial<MenuProps> => {
  return { ...navbarPreset, ...overrides };
};

// ==================== 默认导出 Default Export ====================

export default {
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
};