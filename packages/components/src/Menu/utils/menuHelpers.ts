/**
 * Menu 组件工具函数文件
 * Menu component utility functions
 * 
 * 提供菜单组件相关的工具函数和常量
 * Provides utility functions and constants related to menu components
 */

import type { NumberChipColor, NavItem, IconMap } from '../types';

// ==================== 常量定义 Constants ====================

/**
 * 图标映射表
 * Icon mapping table
 * 
 * 将JSON配置中的图标键映射到实际的图标名称
 * Maps icon keys from JSON configuration to actual icon names
 */
export const iconMap: IconMap = {
  "icon.landing": "solar:home-angle-bold-duotone",
  "icon.services": "solar:settings-bold-duotone",
  "icon.blog": "solar:pen-bold",
  "icon.about": "solar:shield-keyhole-bold-duotone",
  "icon.tour": "eva:arrow-ios-forward-fill",
  "icon.menu": "eva:more-vertical-fill",
  "icon.level2a": "solar:cart-3-bold",
  "icon.level2b": "solar:cart-3-bold",
  "icon.level2c": "solar:cart-3-bold",
};

// ==================== 徽章相关函数 Badge Related Functions ====================

/**
 * 解析信息徽章
 * Parse information badge
 * 
 * 从菜单项的info数组中解析出数字徽章
 * Parses numeric badge from menu item's info array
 * 
 * @param info - 信息数组 [信息键, 徽章值] Information array [info key, badge value]
 * @returns 解析后的数字或undefined Parsed number or undefined
 * 
 * @example
 * parseInfoBadge(["notifications", "+5"]) // returns 5
 * parseInfoBadge(["status", "active"]) // returns undefined
 */
export const parseInfoBadge = (info?: [string, string]): number | undefined => {
  if (!info || !info[1]) return undefined;
  
  const badge = info[1];
  // 检查是否为数字格式的徽章（以+开头）
  // Check if it's a numeric badge format (starts with +)
  if (badge.startsWith("+")) {
    const num = parseInt(badge.substring(1), 10);
    return isNaN(num) ? undefined : num;
  }
  
  return undefined;
};

/**
 * 获取徽章颜色
 * Get badge color
 * 
 * 根据徽章数字返回对应的颜色主题
 * Returns corresponding color theme based on badge number
 * 
 * @param badge - 数字徽章 Numeric badge
 * @returns 徽章颜色主题 Badge color theme
 * 
 * @example
 * getBadgeColor(1) // returns "primary"
 * getBadgeColor(5) // returns "success"
 * getBadgeColor(undefined) // returns "default"
 */
export const getBadgeColor = (badge?: number): NumberChipColor => {
  if (!badge) return "default";
  if (badge <= 2) return "primary";
  return "success";
};

// ==================== 权限相关函数 Permission Related Functions ====================

/**
 * 解析图标名称
 * Parse icon name
 * 
 * 将图标键名转换为实际的图标名称
 * Converts icon key to actual icon name
 * 
 * @param iconKey - 图标键名 Icon key name
 * @returns 实际的图标名称或原始键名 Actual icon name or original key name
 */
export const parseIcon = (iconKey?: string): string | undefined => {
  if (!iconKey) return undefined;
  // 类型安全的图标映射查找
  // Type-safe icon mapping lookup
  return (iconMap as Record<string, string>)[iconKey] || iconKey;
};

/**
 * 检查用户访问权限
 * Check user access permission
 * 
 * 验证用户是否有权限访问特定菜单项
 * Verifies if user has permission to access specific menu item
 * 
 * @param itemRoles - 菜单项所需角色列表 Required roles for menu item
 * @param userRoles - 用户角色列表 User roles list
 * @returns 是否有访问权限 Whether has access permission
 * 
 * @example
 * hasPermission(["admin", "editor"], ["admin"]) // returns true
 * hasPermission(["admin"], ["user"]) // returns false
 * hasPermission(undefined, ["user"]) // returns true (no restrictions)
 */
export const hasPermission = (itemRoles?: string[], userRoles?: string[]): boolean => {
  // 如果菜单项没有角色限制，则允许所有用户访问
  // If menu item has no role restrictions, allow all users to access
  if (!itemRoles || itemRoles.length === 0) return true;
  
  // 如果用户没有角色，则拒绝访问有角色限制的菜单项
  // If user has no roles, deny access to role-restricted menu items
  if (!userRoles || userRoles.length === 0) return false;
  
  // 检查用户角色是否与菜单项所需角色有交集
  // Check if user roles intersect with required menu item roles
  return itemRoles.some(role => userRoles.includes(role));
};

// ==================== 路径相关函数 Path Related Functions ====================

/**
 * 生成菜单项唯一路径
 * Generate unique menu item path
 * 
 * 为菜单项生成唯一的标识路径，用于状态管理
 * Generates unique identifier path for menu items, used for state management
 * 
 * @param sectionIndex - 分组索引 Section index
 * @param itemIndex - 项目索引 Item index
 * @param parentPath - 父级路径（可选）Parent path (optional)
 * @returns 唯一路径标识符 Unique path identifier
 * 
 * @example
 * generateItemPath(0, 1) // returns "section-0.1"
 * generateItemPath(0, 2, "section-0.1") // returns "section-0.1.2"
 */
export const generateItemPath = (
  sectionIndex: number,
  itemIndex: number,
  parentPath?: string
): string => {
  const basePath = `section-${sectionIndex}.${itemIndex}`;
  return parentPath ? `${parentPath}.${itemIndex}` : basePath;
};

// ==================== 搜索相关函数 Search Related Functions ====================

/**
 * 递归查找菜单项
 * Recursively find menu item
 * 
 * 在菜单树中递归搜索满足条件的菜单项
 * Recursively searches for menu items that meet the criteria in the menu tree
 * 
 * @param items - 菜单项数组 Menu items array
 * @param predicate - 查找条件函数 Search condition function
 * @param basePath - 基础路径（可选）Base path (optional)
 * @returns 找到的菜单项和路径，未找到则返回null Found menu item and path, or null if not found
 * 
 * @example
 * findMenuItem(menuItems, item => item.title === "Dashboard")
 * findMenuItem(menuItems, item => item.path === "/settings")
 */
export const findMenuItem = (
  items: NavItem[],
  predicate: (item: NavItem) => boolean,
  basePath = ""
): { item: NavItem; path: string } | null => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // 添加空值检查
    // Add null check
    if (!item) continue;
    
    const currentPath = basePath ? `${basePath}.${i}` : `${i}`;
    
    // 检查当前项是否满足条件
    // Check if current item meets the criteria
    if (predicate(item)) {
      return { item, path: currentPath };
    }
    
    // 递归搜索子菜单项
    // Recursively search sub-menu items
    if (item.children && item.children.length > 0) {
      const found = findMenuItem(item.children, predicate, currentPath);
      if (found) return found;
    }
  }
  
  return null;
};

// ==================== 菜单项检查函数 Menu Item Check Functions ====================

/**
 * 检查菜单项是否有子项
 * Check if menu item has children
 * 
 * @param item - 菜单项 Menu item
 * @returns 是否有子菜单项 Whether has sub-menu items
 */
export const hasChildren = (item: NavItem): boolean => {
  return Boolean(item.children && item.children.length > 0);
};