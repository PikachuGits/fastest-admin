/**
 * MenuList 组件相关的类型定义
 * Type definitions for MenuList component
 */

/**
 * 导航项接口
 * Navigation item interface
 */
export interface NavItem {
  /** 菜单项标题 */
  title: string;
  /** 菜单项路径 */
  path: string;
  /** 图标名称（可选） */
  icon?: string;
  /** 信息标记 [信息键, 徽章] */
  info?: [string, string];
  /** 角色权限（可选） */
  roles?: string[];
  /** 说明文字（可选） */
  caption?: string;
  /** 子菜单项（可选） */
  children?: NavItem[];
}

/**
 * 导航分组接口
 * Navigation section interface
 */
export interface NavSection {
  /** 分组标题（可选） */
  subheader?: string;
  /** 分组内的菜单项列表 */
  items: NavItem[];
}

/**
 * 导航数据根接口
 * Navigation data root interface
 */
export interface NavData {
  /** 导航项分组列表 */
  navItems: NavSection[];
}

/**
 * 徽章颜色类型
 * Badge color type
 */
export type BadgeColor = "default" | "primary" | "success";

/**
 * 菜单项展开状态记录
 * Menu item open states record
 */
export type OpenStatesRecord = Record<string, boolean>;

/**
 * MenuList 组件属性接口
 * MenuList component props interface
 */
export interface MenuListProps {
  /** 其他传递给 List 组件的属性 */
  [key: string]: any;
}