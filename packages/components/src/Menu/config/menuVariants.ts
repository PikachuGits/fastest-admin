import type { MenuConfig } from '../types';

/**
 * 菜单变体配置
 * 定义不同状态下的菜单配置
 */

// 默认展开状态配置
export const defaultMenuConfig: MenuConfig = {
  defaultOpenItems: [],
  defaultSelectedItem: "section-0.0",
  enableRoleBasedAccess: false,
  userRoles: [],
};

// 收起状态配置
export const collapsedMenuConfig: MenuConfig = {
  defaultOpenItems: [], // 收起状态下不展开任何项
  defaultSelectedItem: "section-0.0",
  enableRoleBasedAccess: false,
  userRoles: [],
};

// 双列布局配置
export const doubleColumnConfig: MenuConfig = {
  defaultOpenItems: ["section-0.0", "section-1.0"], // 双列时可以展开更多项
  defaultSelectedItem: "section-0.0",
  enableRoleBasedAccess: false,
  userRoles: [],
};

// 管理员配置（展开所有权限相关项）
export const adminMenuConfig: MenuConfig = {
  defaultOpenItems: ["section-0.0", "section-1.0", "section-2.0"],
  defaultSelectedItem: "section-0.0",
  enableRoleBasedAccess: true,
  userRoles: ["admin", "super_admin"],
};

// 访客配置（限制访问）
export const guestMenuConfig: MenuConfig = {
  defaultOpenItems: [],
  defaultSelectedItem: "section-0.0",
  enableRoleBasedAccess: true,
  userRoles: ["guest"],
};

/**
 * 菜单样式变体
 */
export interface MenuStyleVariant {
  width: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  layout: 'single' | 'double' | 'grid';
  itemHeight: number;
  spacing: number;
  showIcons: boolean;
  showBadges: boolean;
  collapsible: boolean;
}

// 标准单列样式
export const standardStyle: MenuStyleVariant = {
  width: '100%',
  minWidth: 300,
  maxWidth: 300,
  layout: 'single',
  itemHeight: 44,
  spacing: 8,
  showIcons: true,
  showBadges: true,
  collapsible: true,
};

// 收起状态样式
export const collapsedStyle: MenuStyleVariant = {
  width: 64,
  maxWidth: 64,
  layout: 'single',
  itemHeight: 44,
  spacing: 4,
  showIcons: true,
  showBadges: false, // 收起时不显示徽章
  collapsible: false,
};

// 双列样式
export const doubleColumnStyle: MenuStyleVariant = {
  width: '100%',
  maxWidth: 720,
  layout: 'double',
  itemHeight: 40,
  spacing: 6,
  showIcons: true,
  showBadges: true,
  collapsible: true,
};

// 网格样式
export const gridStyle: MenuStyleVariant = {
  width: '100%',
  maxWidth: 800,
  layout: 'grid',
  itemHeight: 80,
  spacing: 12,
  showIcons: true,
  showBadges: true,
  collapsible: false,
};

/**
 * 获取菜单配置
 * @param variant - 菜单变体类型
 * @returns 对应的配置
 */
export const getMenuConfig = (variant: 'default' | 'collapsed' | 'double' | 'admin' | 'guest'): MenuConfig => {
  switch (variant) {
    case 'collapsed':
      return collapsedMenuConfig;
    case 'double':
      return doubleColumnConfig;
    case 'admin':
      return adminMenuConfig;
    case 'guest':
      return guestMenuConfig;
    default:
      return defaultMenuConfig;
  }
};

/**
 * 获取菜单样式
 * @param variant - 样式变体类型
 * @returns 对应的样式配置
 */
export const getMenuStyle = (variant: 'standard' | 'collapsed' | 'double' | 'grid'): MenuStyleVariant => {
  switch (variant) {
    case 'collapsed':
      return collapsedStyle;
    case 'double':
      return doubleColumnStyle;
    case 'grid':
      return gridStyle;
    default:
      return standardStyle;
  }
};