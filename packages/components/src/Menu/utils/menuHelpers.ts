import type { NumberChipColor } from '../components/NumberChip';

/**
 * 菜单相关的工具函数
 */

// 图标映射，将JSON中的图标键映射到实际的图标名称
export const iconMap: Record<string, string> = {
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

/**
 * 解析info数组，返回数字标记
 * @param info - 信息数组 [infoKey, badge]
 * @returns 解析后的数字或undefined
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
 * 获取标记颜色
 * @param badge - 数字标记
 * @returns 标记颜色
 */
export const getBadgeColor = (badge?: number): NumberChipColor => {
  if (!badge) return "default";
  if (badge <= 2) return "primary";
  return "success";
};

/**
 * 解析图标名称
 * @param iconKey - 图标键名
 * @returns 实际的图标名称
 */
export const parseIcon = (iconKey?: string): string | undefined => {
  if (!iconKey) return undefined;
  return iconMap[iconKey] || iconKey;
};

/**
 * 检查用户是否有访问权限
 * @param itemRoles - 菜单项所需角色
 * @param userRoles - 用户角色
 * @returns 是否有权限
 */
export const hasPermission = (itemRoles?: string[], userRoles?: string[]): boolean => {
  if (!itemRoles || itemRoles.length === 0) return true;
  if (!userRoles || userRoles.length === 0) return false;
  return itemRoles.some(role => userRoles.includes(role));
};

/**
 * 生成菜单项的唯一路径
 * @param sectionIndex - 分组索引
 * @param itemIndex - 项目索引
 * @param parentPath - 父级路径
 * @returns 唯一路径
 */
export const generateItemPath = (
  sectionIndex: number,
  itemIndex: number,
  parentPath?: string
): string => {
  const basePath = `section-${sectionIndex}.${itemIndex}`;
  return parentPath ? `${parentPath}.${itemIndex}` : basePath;
};

/**
 * 递归查找菜单项
 * @param items - 菜单项数组
 * @param predicate - 查找条件
 * @returns 找到的菜单项和路径
 */
export const findMenuItem = (
  items: any[],
  predicate: (item: any) => boolean,
  basePath = ""
): { item: any; path: string } | null => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const currentPath = basePath ? `${basePath}.${i}` : `${i}`;
    
    if (predicate(item)) {
      return { item, path: currentPath };
    }
    
    if (item.children && item.children.length > 0) {
      const found = findMenuItem(item.children, predicate, currentPath);
      if (found) return found;
    }
  }
  
  return null;
};