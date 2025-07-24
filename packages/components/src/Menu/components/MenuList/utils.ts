/**
 * MenuList 组件相关的工具函数
 * Utility functions for MenuList component
 */

import type { BadgeColor } from './types';

/**
 * 解析 info 数组，返回数字标记
 * Parse info array and return numeric badge
 * 
 * @param info - 信息数组 [信息键, 徽章]
 * @returns 解析后的数字徽章，如果无法解析则返回 undefined
 * 
 * @example
 * parseInfoBadge(['info.landing', '+3']) // returns 3
 * parseInfoBadge(['info.landing', 'text']) // returns undefined
 */
export const parseInfoBadge = (info?: [string, string]): number | undefined => {
  if (!info || !info[1]) return undefined;
  
  const badge = info[1];
  if (badge.startsWith("+")) {
    const num = parseInt(badge.substring(1));
    return isNaN(num) ? undefined : num;
  }
  
  return undefined;
};

/**
 * 根据徽章数字获取对应的颜色
 * Get badge color based on numeric value
 * 
 * @param badge - 徽章数字
 * @returns 徽章颜色类型
 * 
 * @example
 * getBadgeColor(1) // returns 'primary'
 * getBadgeColor(5) // returns 'success'
 * getBadgeColor(undefined) // returns 'default'
 */
export const getBadgeColor = (badge?: number): BadgeColor => {
  if (!badge) return "default";
  if (badge <= 2) return "primary";
  return "success";
};

/**
 * 生成菜单项的唯一路径键
 * Generate unique path key for menu item
 * 
 * @param sectionIndex - 分组索引
 * @param itemIndex - 项目索引
 * @param childPath - 子路径（可选）
 * @returns 生成的路径键
 * 
 * @example
 * generateItemPath(0, 1) // returns 'section-0.1'
 * generateItemPath(0, 1, '2.3') // returns 'section-0.1.2.3'
 */
export const generateItemPath = (
  sectionIndex: number,
  itemIndex: number,
  childPath?: string
): string => {
  const basePath = `section-${sectionIndex}.${itemIndex}`;
  return childPath ? `${basePath}.${childPath}` : basePath;
};

/**
 * 检查菜单项是否有子项
 * Check if menu item has children
 * 
 * @param item - 菜单项
 * @returns 是否有子项
 */
export const hasChildren = (item: { children?: any[] }): boolean => {
  return Boolean(item.children && item.children.length > 0);
};